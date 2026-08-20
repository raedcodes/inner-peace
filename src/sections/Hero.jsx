import HeroIllustration from '../components/HeroIllustration'
import { useLanguage } from '../i18n/LanguageContext'

const copy = {
  en: {
    badge: 'A calm, educational space — not a clinic',
    title: 'A calmer mind starts with understanding.',
    slogan: 'Find your Calm.',
    description:
      'Inner Peace offers practical tools, clear information, and gentle guidance for people navigating anxiety, stress, and difficult moments — at your own pace, in your own time.',
    ctaPrimary: 'Explore Inner Peace',
    ctaSecondary: 'Start Feeling Better',
    footnote: 'Educational and wellness information only — not a substitute for professional care.',
  },
  ar: {
    badge: 'مساحة هادئة وتثقيفية — وليست عيادة',
    title: 'عقل أكثر هدوءًا يبدأ بالفهم.',
    slogan: 'اعثر على هدوئك.',
    description:
      'يقدّم "إنر بيس" أدوات عملية، ومعلومات واضحة، وإرشادًا لطيفًا لمن يمرّون بالقلق أو التوتر أو لحظات صعبة — بالوتيرة التي تناسبك، وفي وقتك الخاص.',
    ctaPrimary: 'استكشف إنر بيس',
    ctaSecondary: 'ابدأ الشعور بتحسن',
    footnote: 'معلومات تثقيفية وصحية فقط — وليست بديلاً عن الرعاية المتخصصة.',
  },
}

export default function Hero() {
  const { lang } = useLanguage()
  const t = copy[lang]

  return (
    <section id="top" className="relative overflow-hidden">
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(60% 50% at 20% 20%, rgba(122,155,118,0.16), transparent), radial-gradient(50% 40% at 85% 15%, rgba(123,147,168,0.16), transparent)',
        }}
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto px-5 md:px-8 pt-16 md:pt-24 pb-20 md:pb-28 text-center">
        <p className="inline-flex items-center gap-2 text-sm font-medium text-sage-dark bg-sage-light rounded-full px-4 py-1.5 mb-8">
          <span aria-hidden="true">🌿</span>
          {t.badge}
        </p>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-medium text-ink leading-[1.1] text-balance max-w-3xl mx-auto mb-4">
          {t.title}
        </h1>

        <p className="font-serif italic text-xl md:text-2xl text-sage-dark mb-6">{t.slogan}</p>

        <p className="text-lg text-ink-soft max-w-xl mx-auto leading-relaxed text-balance mb-10">
          {t.description}
        </p>

        <div className="max-w-3xl mx-auto mb-10 rounded-[28px] overflow-hidden shadow-soft-lg">
          <HeroIllustration />
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#understanding"
            className="w-full sm:w-auto rounded-full bg-ink text-cream px-7 py-3 text-sm font-medium hover:bg-ink/90 transition-colors shadow-soft"
          >
            {t.ctaPrimary}
          </a>
          <a
            href="#tools"
            className="w-full sm:w-auto rounded-full bg-white/80 border border-ink/10 text-ink px-7 py-3 text-sm font-medium hover:bg-white transition-colors"
          >
            {t.ctaSecondary}
          </a>
        </div>

        <p className="text-xs text-ink-soft/70 mt-8 max-w-md mx-auto">{t.footnote}</p>
      </div>
    </section>
  )
}
