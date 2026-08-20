import { useState } from 'react'
import { startTool } from '../lib/startTool'

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
  },
}

export default function RecommendationPanel({ lang, status, data, error, resources, onRetry, onPickAnother }) {
  const t = copy[lang]
  const [feedback, setFeedback] = useState(null)

  if (status === 'loading') {
    return (
      <div
        className="rounded-2xl bg-white/70 border border-ink/5 shadow-soft p-6 md:p-7 flex items-center justify-center gap-3"
        aria-live="polite"
      >
        <span className="relative flex h-3 w-3" aria-hidden="true">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sage opacity-60" />
          <span className="relative inline-flex h-3 w-3 rounded-full bg-sage-dark" />
        </span>
        <p className="text-sm text-ink-soft">{t.loading}</p>
      </div>
    )
  }

  if (status === 'error') {
    return (
      <div className="rounded-2xl bg-white/70 border border-ink/5 shadow-soft p-6 md:p-7 text-center" role="alert">
        <p className="text-sm text-ink mb-4">{t.errorTitle} {error}</p>
        <button
          type="button"
          onClick={onRetry}
          className="rounded-full bg-dusk-dark text-white px-5 py-2 text-sm font-medium hover:bg-dusk-dark/90 transition-colors"
        >
          {t.retry}
        </button>
      </div>
    )
  }

  if (status === 'success' && data) {
    return (
      <div className="rounded-2xl bg-white/70 border border-ink/5 shadow-soft p-6 md:p-7" aria-live="polite">
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
                <button
                  key={resource.href}
                  type="button"
                  onClick={() => startTool(resource.href)}
                  className="block w-full sm:w-auto mb-2 rounded-full bg-sage text-white px-4 py-2 text-sm font-medium hover:bg-sage-dark transition-colors"
                >
                  {t.startNow(resource.label)}
                </button>
              ))}

            <p className="text-xs font-semibold uppercase tracking-wide text-sage-dark mb-2 mt-1">{t.resourcesTitle}</p>
            <div className="flex flex-wrap gap-2">
              {resources
                .filter((r) => !r.href.startsWith('#tool-'))
                .map((resource) => (
                  <a
                    key={resource.href}
                    href={resource.href}
                    className="text-sm rounded-full bg-sage-light text-sage-dark px-3.5 py-1.5 hover:bg-sage/20 transition-colors"
                  >
                    {resource.label}
                  </a>
                ))}
            </div>
          </div>
        )}

        <div className="border-t border-ink/10 pt-4 mb-4">
          {feedback === null ? (
            <div className="flex items-center gap-3">
              <p className="text-sm text-ink-soft">{t.checkInPrompt}</p>
              <button
                type="button"
                onClick={() => setFeedback('yes')}
                className="text-sm rounded-full bg-sage-light text-sage-dark px-3.5 py-1.5 hover:bg-sage/20 transition-colors"
              >
                {t.yes}
              </button>
              <button
                type="button"
                onClick={() => setFeedback('no')}
                className="text-sm rounded-full bg-ink/5 text-ink-soft px-3.5 py-1.5 hover:bg-ink/10 transition-colors"
              >
                {t.no}
              </button>
            </div>
          ) : (
            <div>
              <p className="text-sm text-ink-soft mb-3">{feedback === 'yes' ? t.yesResponse : t.noResponse}</p>
              <div className="flex flex-wrap gap-2">
                {onPickAnother && (
                  <button
                    type="button"
                    onClick={onPickAnother}
                    className="text-sm rounded-full bg-sage-light text-sage-dark px-3.5 py-1.5 hover:bg-sage/20 transition-colors"
                  >
                    {t.pickAnother}
                  </button>
                )}
                {feedback === 'no' && (
                  <a
                    href="#therapy"
                    className="text-sm rounded-full bg-ink/5 text-ink-soft px-3.5 py-1.5 hover:bg-ink/10 transition-colors"
                  >
                    {t.seeTherapy}
                  </a>
                )}
              </div>
            </div>
          )}
        </div>

        <p className="text-xs text-ink-soft/70 leading-relaxed pt-3 border-t border-ink/10">{t.disclaimer}</p>
      </div>
    )
  }

  return null
}
