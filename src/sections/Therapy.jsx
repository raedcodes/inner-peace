import SectionHeading from '../components/SectionHeading'
import Panel from '../components/Panel'
import { therapySignals, therapyApproaches } from '../data/help'
import { useLanguage } from '../i18n/LanguageContext'

const copy = {
  en: {
    eyebrow: 'Therapy & Professional Help',
    title: 'When should I consider therapy?',
    description: 'There’s no single threshold — but some signs suggest it may be time to talk with a professional.',
    signalsTitle: 'Consider reaching out if...',
    approachesTitle: 'Evidence-based approaches',
    approachesNote: 'A qualified mental-health professional can help determine which approach, if any, fits your situation.',
  },
  ar: {
    eyebrow: 'العلاج والمساعدة المتخصصة',
    title: 'متى يجب أن أفكر في العلاج النفسي؟',
    description: 'لا يوجد معيار واحد فاصل — لكن بعض العلامات قد تشير إلى أن الوقت مناسب للتحدث مع مختص.',
    signalsTitle: 'فكّر في طلب المساعدة إذا...',
    approachesTitle: 'أساليب علاجية قائمة على الأدلة',
    approachesNote: 'يمكن لأخصائي صحة نفسية مؤهل أن يساعدك في تحديد الأسلوب الأنسب لحالتك، إن وُجد.',
  },
}

export default function Therapy() {
  const { lang } = useLanguage()
  const t = copy[lang]
  const signals = therapySignals[lang]
  const approaches = therapyApproaches[lang]

  return (
    <section id="therapy" className="bg-dusk-light/40 scroll-mt-20">
      <div className="max-w-6xl mx-auto px-5 md:px-8 py-16 md:py-24">
        <SectionHeading eyebrow={t.eyebrow} title={t.title} description={t.description} />

        <div className="grid md:grid-cols-2 gap-10 md:gap-14">
          <div>
            <h3 className="text-lg font-medium text-ink font-serif mb-4">{t.signalsTitle}</h3>
            <ul className="space-y-3">
              {signals.map((signal) => (
                <Panel as="li" key={signal} bg={70} radius="xl" className="flex gap-3 px-4 py-3">
                  <span className="text-dusk-dark shrink-0" aria-hidden="true">✓</span>
                  <span className="text-sm text-ink-soft leading-relaxed">{signal}</span>
                </Panel>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-medium text-ink font-serif mb-4">{t.approachesTitle}</h3>
            <div className="space-y-4">
              {approaches.map((approach) => (
                <Panel key={approach.name} bg={70} radius="xl" className="px-5 py-4">
                  <p className="font-medium text-ink text-sm mb-1">{approach.name}</p>
                  <p className="text-sm text-ink-soft leading-relaxed">{approach.description}</p>
                </Panel>
              ))}
            </div>
            <p className="text-xs text-ink-soft/80 mt-4 leading-relaxed">{t.approachesNote}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
