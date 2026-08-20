import SectionHeading from '../components/SectionHeading'
import { medicationPoints } from '../data/help'
import { useLanguage } from '../i18n/LanguageContext'

const copy = {
  en: {
    eyebrow: 'Medication',
    title: 'What about medication?',
    description: 'Medication is a personal, medical decision — one made with a qualified doctor, not a website.',
  },
  ar: {
    eyebrow: 'الأدوية',
    title: 'ماذا عن الأدوية؟',
    description: 'قرار الدواء شخصي وطبي — يُتَّخذ مع طبيب مؤهل، لا مع موقع إلكتروني.',
  },
}

export default function Medication() {
  const { lang } = useLanguage()
  const t = copy[lang]
  const points = medicationPoints[lang]

  return (
    <section id="medication" className="max-w-6xl mx-auto px-5 md:px-8 py-16 md:py-24 scroll-mt-20">
      <SectionHeading eyebrow={t.eyebrow} title={t.title} description={t.description} />

      <div className="rounded-2xl bg-white/60 border border-ink/5 shadow-soft p-6 md:p-8 max-w-3xl">
        <ul className="space-y-3">
          {points.map((point) => (
            <li key={point} className="flex gap-3 text-sm text-ink-soft leading-relaxed">
              <span className="text-dusk-dark shrink-0" aria-hidden="true">•</span>
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
