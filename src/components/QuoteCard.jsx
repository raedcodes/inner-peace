import { useLanguage } from '../i18n/LanguageContext'

const copy = {
  en: { paraphrased: 'Paraphrased insight' },
  ar: { paraphrased: 'رؤية موجزة' },
}

export default function QuoteCard({ quote }) {
  const { lang } = useLanguage()
  const t = copy[lang]

  return (
    <figure className="rounded-2xl bg-white/70 border border-ink/5 shadow-soft p-6 md:p-7 h-full flex flex-col">
      <blockquote className="font-serif text-lg md:text-xl text-ink leading-snug text-balance flex-1">
        “{quote.text}”
      </blockquote>
      <figcaption className="mt-5 pt-4 border-t border-ink/10">
        <p className="text-sm font-medium text-ink">{quote.author}</p>
        <p className="text-xs text-ink-soft mt-0.5">{quote.role}</p>
        {quote.type === 'insight' && (
          <span className="inline-block mt-2 text-[0.7rem] font-semibold uppercase tracking-wide text-dusk-dark bg-dusk-light rounded-full px-2.5 py-1">
            {t.paraphrased}
          </span>
        )}
      </figcaption>
    </figure>
  )
}
