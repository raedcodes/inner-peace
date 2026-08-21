import { useState } from 'react'
import { startTool } from '../lib/startTool'
import Button from './Button'
import Panel from './Panel'

const copy = {
  en: {
    loading: 'Finding a few gentle suggestions...',
    errorTitle: 'Something went wrong.',
    retry: 'Try again',
    resourcesTitle: 'On this site',
    tryThis: 'Try this',
    startNow: (label) => `▶ Start ${label} now`,
    disclaimer:
      'This is general, educational support — not a diagnosis or a treatment plan. If this feels urgent or serious, please reach out to a doctor or mental-health professional.',
    checkInPrompt: 'Did that help, even a little?',
    yes: 'Yes',
    no: 'Not really',
    yesResponse: "Good. Take your time — you can always come back to this whenever you need to.",
    noResponse:
      "That's okay, not everything lands the same for everyone. If this keeps coming up, it may be worth talking it through with a professional.",
    pickAnother: 'Pick a different situation',
    seeTherapy: 'When therapy may help',
    patternAlert: (count, title) =>
      `This is the ${count}${count === 1 ? 'st' : count === 2 ? 'nd' : count === 3 ? 'rd' : 'th'} time this week you've checked in about "${title}" — that's worth more than a quick tip. It may be worth talking to a professional about this pattern.`,
  },
  ar: {
    loading: 'جارٍ إيجاد بعض الاقتراحات اللطيفة...',
    errorTitle: 'حدث خطأ ما.',
    retry: 'حاول مرة أخرى',
    resourcesTitle: 'على هذا الموقع',
    tryThis: 'جرّب هذا',
    startNow: (label) => `▶ ابدأ ${label} الآن`,
    disclaimer:
      'هذا دعم تثقيفي عام — وليس تشخيصًا أو خطة علاج. إذا شعرت أن الأمر عاجل أو خطير، يُرجى التواصل مع طبيب أو أخصائي صحة نفسية.',
    checkInPrompt: 'هل ساعدك هذا، ولو قليلاً؟',
    yes: 'نعم',
    no: 'ليس فعلاً',
    yesResponse: 'جيد. خذ وقتك — يمكنك دائمًا العودة إلى هذا كلما احتجت.',
    noResponse: 'لا بأس، ليس كل شيء يناسب الجميع بالطريقة نفسها. إذا استمر هذا معك، قد يكون من المفيد التحدث عنه مع مختص.',
    pickAnother: 'اختر موقفًا مختلفًا',
    seeTherapy: 'متى قد يساعد العلاج النفسي',
    patternAlert: (count, title) =>
      `سجّلت "${title}" ${count} مرات هذا الأسبوع — وهذا يستحق أكثر من نصيحة سريعة. قد يكون من المفيد التحدث عن هذا النمط مع مختص.`,
  },
}

export default function RecommendationPanel({
  lang,
  status,
  data,
  error,
  resources,
  onRetry,
  onPickAnother,
  patternCount = 0,
  patternTitle,
}) {
  const t = copy[lang]
  const [feedback, setFeedback] = useState(null)

  if (status === 'loading') {
    return (
      <Panel bg={70} shadow className="p-6 md:p-7 flex items-center justify-center gap-3" aria-live="polite">
        <span className="relative flex h-3 w-3" aria-hidden="true">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sage opacity-60" />
          <span className="relative inline-flex h-3 w-3 rounded-full bg-sage-dark" />
        </span>
        <p className="text-sm text-ink-soft">{t.loading}</p>
      </Panel>
    )
  }

  if (status === 'error') {
    return (
      <Panel bg={70} shadow className="p-6 md:p-7 text-center" role="alert">
        <p className="text-sm text-ink mb-4">{t.errorTitle} {error}</p>
        <Button variant="dusk" onClick={onRetry} className="px-5 py-2 text-sm">
          {t.retry}
        </Button>
      </Panel>
    )
  }

  if (status === 'success' && data) {
    return (
      <Panel bg={70} shadow className="p-6 md:p-7" aria-live="polite">
        {patternCount > 0 && patternTitle && (
          <div className="rounded-xl bg-clay/10 border border-clay/30 px-4 py-3 mb-4">
            <p className="text-sm text-ink leading-relaxed">{t.patternAlert(patternCount, patternTitle)}</p>
          </div>
        )}

        <p className="text-ink leading-relaxed mb-4">{data.acknowledgment}</p>

        <p className="text-xs font-semibold uppercase tracking-wide text-sage-dark mb-2">{t.tryThis}</p>
        <ul className="space-y-2 mb-5">
          {data.suggestions.map((suggestion) => (
            <li key={suggestion} className="flex gap-2 text-sm text-ink-soft">
              <span className="text-sage-dark shrink-0" aria-hidden="true">•</span>
              <span>{suggestion}</span>
            </li>
          ))}
        </ul>

        {resources && resources.length > 0 && (
          <div className="mb-5">
            {resources
              .filter((r) => r.href.startsWith('#tool-'))
              .map((resource) => (
                <Button
                  key={resource.href}
                  onClick={() => startTool(resource.href)}
                  className="block w-full sm:w-auto mb-2 px-4 py-2 text-sm"
                >
                  {t.startNow(resource.label)}
                </Button>
              ))}

            <p className="text-xs font-semibold uppercase tracking-wide text-sage-dark mb-2 mt-1">{t.resourcesTitle}</p>
            <div className="flex flex-wrap gap-2">
              {resources
                .filter((r) => !r.href.startsWith('#tool-'))
                .map((resource) => (
                  <Button key={resource.href} href={resource.href} variant="tag" className="text-sm px-3.5 py-1.5">
                    {resource.label}
                  </Button>
                ))}
            </div>
          </div>
        )}

        <div className="border-t border-ink/10 pt-4 mb-4">
          {feedback === null ? (
            <div className="flex items-center gap-3">
              <p className="text-sm text-ink-soft">{t.checkInPrompt}</p>
              <Button variant="tag" onClick={() => setFeedback('yes')} className="text-sm px-3.5 py-1.5">
                {t.yes}
              </Button>
              <Button variant="tag-neutral" onClick={() => setFeedback('no')} className="text-sm px-3.5 py-1.5">
                {t.no}
              </Button>
            </div>
          ) : (
            <div>
              <p className="text-sm text-ink-soft mb-3">{feedback === 'yes' ? t.yesResponse : t.noResponse}</p>
              <div className="flex flex-wrap gap-2">
                {onPickAnother && (
                  <Button variant="tag" onClick={onPickAnother} className="text-sm px-3.5 py-1.5">
                    {t.pickAnother}
                  </Button>
                )}
                {feedback === 'no' && (
                  <Button href="#therapy" variant="tag-neutral" className="text-sm px-3.5 py-1.5">
                    {t.seeTherapy}
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>

        <p className="text-xs text-ink-soft/70 leading-relaxed pt-3 border-t border-ink/10">{t.disclaimer}</p>
      </Panel>
    )
  }

  return null
}
