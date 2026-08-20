import { situationIds, situations } from '../../src/data/situations.js'

const MODEL = process.env.GEMINI_MODEL || 'gemini-3.5-flash-lite'
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`

const MAX_CUSTOM_TEXT_LENGTH = 500
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000
const RATE_LIMIT_MAX_REQUESTS = 10

// In-memory, per-instance rate limiting — resets on cold start. Fine for
// low-traffic use; a real cross-invocation limit would need an external
// store (e.g. Upstash Redis) if abuse becomes a concern.
const requestLog = new Map()

function isRateLimited(ip) {
  const now = Date.now()
  const timestamps = (requestLog.get(ip) || []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS)
  timestamps.push(now)
  requestLog.set(ip, timestamps)
  return timestamps.length > RATE_LIMIT_MAX_REQUESTS
}

const SITUATION_TITLES = situations.en.map((s) => `${s.id}: ${s.title}`).join('\n')

function buildSystemInstruction() {
  return `You are a calm, careful assistant embedded in a mental-wellness educational website called Inner Peace.
A visitor has described a specific situation they're dealing with right now.

Your response must:
- Briefly and warmly acknowledge what they described, in one sentence.
- Offer exactly 2 or 3 short, practical, low-risk suggestions (grounding, breathing, gentle reframing, reaching out to someone, small manageable steps).
- Never diagnose the person or claim a physical symptom is definitely caused by anxiety — other causes are always possible.
- Never recommend starting, stopping, or changing any medication, and never give dosing information for any medication, even over-the-counter ones.
- If the description sounds urgent, severe, or involves safety concerns (self-harm, harming others, a medical emergency), your acknowledgment must gently but clearly encourage seeking immediate professional or emergency help, instead of the usual suggestions.
- Keep the tone warm, non-judgmental, and concise.
- Do not mention that you are an AI or a language model.
- Do not include any links, URLs, or references to specific pages or resources — those are added separately by the website, not by you.

Anti-spiral rule for physical symptoms (this matters a lot): never list multiple possible causes or conditions, even mild ones — that pattern is exactly what makes people Googling symptoms feel worse, not better. Instead, lead with what's reassuring and commonly true (e.g. "this is a common sensation and often not a sign of anything serious"), and give at most one single, clear, concrete signal for when to actually seek medical care (e.g. "if it's sudden, severe, or unlike anything you've felt before"). Never enumerate a list of red-flag symptoms or possible diagnoses.`
}

function buildClassificationInstruction() {
  return `Additionally, classify the visitor's description into the single closest matching category from this fixed list of ids:
${SITUATION_TITLES}

Respond with the exact id string in matchedSituationId. If nothing fits well, choose the closest reasonable match — never invent a new id.`
}

function jsonResponse(status, body) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  })
}

export default async (req, context) => {
  if (req.method !== 'POST') {
    return jsonResponse(405, { error: 'Method not allowed' })
  }

  const ip = context.ip || 'unknown'
  if (isRateLimited(ip)) {
    return jsonResponse(429, { error: 'Too many requests. Please wait a moment and try again.' })
  }

  let payload
  try {
    payload = await req.json()
  } catch {
    return jsonResponse(400, { error: 'Invalid request body.' })
  }

  const { situationId, customText, lang } = payload || {}
  const responseLang = lang === 'ar' ? 'ar' : 'en'

  let userPrompt
  let responseSchema
  let situation = null

  if (situationId) {
    situation = situations.en.find((s) => s.id === situationId)
    if (!situationIds.includes(situationId) || !situation) {
      return jsonResponse(400, { error: 'Unknown situation.' })
    }
    userPrompt = `The visitor selected the predefined situation: "${situation.title}".`
    responseSchema = {
      type: 'OBJECT',
      properties: {
        acknowledgment: { type: 'STRING' },
        suggestions: { type: 'ARRAY', items: { type: 'STRING' }, minItems: 2, maxItems: 3 },
      },
      required: ['acknowledgment', 'suggestions'],
    }
  } else if (typeof customText === 'string' && customText.trim()) {
    const trimmed = customText.trim()
    if (trimmed.length > MAX_CUSTOM_TEXT_LENGTH) {
      return jsonResponse(400, { error: 'Description is too long.' })
    }
    userPrompt = `The visitor described their situation in their own words: "${trimmed}"\n\n${buildClassificationInstruction()}`
    responseSchema = {
      type: 'OBJECT',
      properties: {
        acknowledgment: { type: 'STRING' },
        suggestions: { type: 'ARRAY', items: { type: 'STRING' }, minItems: 2, maxItems: 3 },
        matchedSituationId: { type: 'STRING', enum: situationIds },
      },
      required: ['acknowledgment', 'suggestions', 'matchedSituationId'],
    }
  } else {
    return jsonResponse(400, { error: 'Provide a situationId or customText.' })
  }

  if (responseLang === 'ar') {
    userPrompt += '\n\nRespond in Arabic.'
  }

  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey) {
    return jsonResponse(500, { error: 'Server is not configured yet. Please try again later.' })
  }

  try {
    const geminiResponse = await fetch(GEMINI_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': apiKey,
      },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: buildSystemInstruction() }] },
        contents: [{ role: 'user', parts: [{ text: userPrompt }] }],
        generationConfig: {
          responseMimeType: 'application/json',
          responseSchema,
          temperature: 0.6,
          maxOutputTokens: 1024,
        },
      }),
    })

    if (!geminiResponse.ok) {
      const errorBody = await geminiResponse.text().catch(() => '')
      console.error('Gemini API error', geminiResponse.status, errorBody)
      return jsonResponse(502, { error: 'Could not reach the assistant right now.' })
    }

    const geminiBody = await geminiResponse.json()
    const text = geminiBody?.candidates?.[0]?.content?.parts?.[0]?.text
    if (!text) {
      return jsonResponse(502, { error: 'Received an empty response.' })
    }

    let parsed
    try {
      parsed = JSON.parse(text)
    } catch (parseErr) {
      console.error('Failed to parse Gemini response as JSON:', parseErr.message, 'Raw text:', text)
      return jsonResponse(502, { error: 'Received a malformed response.' })
    }

    if (!parsed.acknowledgment || !Array.isArray(parsed.suggestions) || parsed.suggestions.length === 0) {
      return jsonResponse(502, { error: 'Received an unexpected response shape.' })
    }

    const result = {
      acknowledgment: String(parsed.acknowledgment),
      suggestions: parsed.suggestions.slice(0, 3).map(String),
    }

    if (!situationId) {
      result.matchedSituationId = situationIds.includes(parsed.matchedSituationId)
        ? parsed.matchedSituationId
        : situationIds[0]
    }

    return jsonResponse(200, result)
  } catch (err) {
    console.error('situation-support function error:', err)
    return jsonResponse(500, { error: 'Something went wrong. Please try again.' })
  }
}
