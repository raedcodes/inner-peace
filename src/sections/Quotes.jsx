import SectionHeading from '../components/SectionHeading'
import QuoteCard from '../components/QuoteCard'
import { quotes } from '../data/quotes'
import { useLanguage } from '../i18n/LanguageContext'

const copy = {
  en: { eyebrow: 'Quotes & Expert Insights', title: 'Words worth sitting with' },
  ar: { eyebrow: 'اقتباسات ورؤى الخبراء', title: 'كلمات تستحق التأمل' },
}

export default function Quotes() {
  const { lang } = useLanguage()
  const t = copy[lang]

  return (
    <section id="quotes" className="max-w-6xl mx-auto px-5 md:px-8 py-16 md:py-24 scroll-mt-20">
      <SectionHeading eyebrow={t.eyebrow} title={t.title} align="center" />

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {quotes[lang].map((quote) => (
          <QuoteCard key={quote.text} quote={quote} />
        ))}
      </div>
    </section>
  )
}
