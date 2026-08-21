import { useCallback, useState } from 'react'

export function useSituationSupport() {
  const [status, setStatus] = useState('idle') // idle | loading | success | error
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const [lastRequest, setLastRequest] = useState(null)

  const run = useCallback(async (request) => {
    setStatus('loading')
    setError(null)
    setLastRequest(request)

    try {
      const response = await fetch('/.netlify/functions/situation-support', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(request),
      })

      const body = await response.json().catch(() => null)

      if (!response.ok || !body) {
        throw new Error(body?.error || `Request failed (${response.status})`)
      }

      setData(body)
      setStatus('success')
    } catch (err) {
      setError(err.message || 'Please try again.')
      setStatus('error')
    }
  }, [])

  const retry = useCallback(() => {
    if (lastRequest) run(lastRequest)
  }, [lastRequest, run])

  const resolveLocal = useCallback((localData) => {
    setError(null)
    setLastRequest(null)
    setData(localData)
    setStatus('success')
  }, [])

  const reset = useCallback(() => {
    setStatus('idle')
    setData(null)
    setError(null)
    setLastRequest(null)
  }, [])

  return { status, data, error, run, retry, resolveLocal, reset }
}
