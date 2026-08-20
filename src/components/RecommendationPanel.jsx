const copy = {
  en: {
    loading: 'Finding a few gentle suggestions...',
    errorTitle: "Something went wrong.",
    retry: 'Try again',
    resourcesTitle: 'On this site',
    disclaimer:
      'This is general, educational support — not a diagnosis or a treatment plan. If this feels urgent or serious, please reach out to a doctor or mental-health professional.',
  },
  ar: {
    loading: 'جارٍ إيجاد بعض الاقتراحات اللطيفة...',
    errorTitle: 'حدث خطأ ما.',
    retry: 'حاول مرة أخرى',
    resourcesTitle: 'على هذا الموقع',
    disclaimer:
      'هذا دعم تثقيفي عام — وليس تشخيصًا أو خطة علاج. إذا شعرت أن الأمر عاجل أو خطير، يُرجى التواصل مع طبيب أو أخصائي صحة نفسية.',
  },
}

export default function RecommendationPanel({ lang, status, data, error, resources, onRetry }) {
  const t = copy[lang]

  if (status === 'loading') {
    return (
      <div className="rounded-2xl bg-white/70 border border-ink/5 shadow-soft p-6 md:p-7 text-center" aria-live="polite">
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
            <p className="text-xs font-semibold uppercase tracking-wide text-sage-dark mb-2">{t.resourcesTitle}</p>
            <div className="flex flex-wrap gap-2">
              {resources.map((resource) => (
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

        <p className="text-xs text-ink-soft/70 leading-relaxed pt-3 border-t border-ink/10">{t.disclaimer}</p>
      </div>
    )
  }

  return null
}
