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

      <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-2 -mx-5 px-5 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-5 sm:overflow-visible">
        {quotes[lang].map((quote) => (
          <div key={quote.text} className="w-[80%] shrink-0 snap-start sm:w-auto sm:shrink">
            <QuoteCard quote={quote} />
          </div>
        ))}
      </div>
    </section>
  )
}
