import Disclaimer from './Disclaimer'
import { useLanguage } from '../i18n/LanguageContext'

const copy = {
  en: {
    blurb: 'A calm corner of the internet for understanding anxiety, building healthier habits, and knowing when to reach out for support.',
    explore: 'Explore',
    exploreLinks: [
      { href: '#understanding', label: 'Understanding Anxiety' },
      { href: '#symptoms', label: 'Symptoms' },
      { href: '#psychosomatic', label: 'Mind-Body Connection' },
      { href: '#lifestyle', label: 'What Can I Do?' },
      { href: '#therapy', label: 'Therapy & Professional Help' },
      { href: '#tools', label: 'Wellness Tools' },
    ],
    support: 'Support',
    supportLinks: [
      { href: '#medication', label: 'About medication' },
      { href: '#spirituality', label: 'Spiritual comfort' },
      { href: '#contact', label: 'Contact us' },
    ],
    rights: 'Educational content only.',
  },
  ar: {
    blurb: 'ركن هادئ على الإنترنت لفهم القلق، وبناء عادات أكثر صحة، ومعرفة متى تطلب الدعم.',
    explore: 'استكشف',
    exploreLinks: [
      { href: '#understanding', label: 'فهم القلق' },
      { href: '#symptoms', label: 'الأعراض' },
      { href: '#psychosomatic', label: 'رابط الجسد والعقل' },
      { href: '#lifestyle', label: 'ماذا يمكنني أن أفعل؟' },
      { href: '#therapy', label: 'العلاج والمساعدة المتخصصة' },
      { href: '#tools', label: 'أدوات العافية' },
    ],
    support: 'الدعم',
    supportLinks: [
      { href: '#medication', label: 'عن الأدوية' },
      { href: '#spirituality', label: 'راحة روحية' },
      { href: '#contact', label: 'تواصل معنا' },
    ],
    rights: 'محتوى تثقيفي فقط.',
  },
}

export default function Footer() {
  const { lang } = useLanguage()
  const t = copy[lang]
  const year = new Date().getFullYear()

  return (
    <footer className="bg-ink text-cream/80 mt-20">
      <div className="max-w-6xl mx-auto px-5 md:px-8 py-14">
        <div className="grid md:grid-cols-3 gap-10 mb-10">
          <div>
            <p className="flex items-center gap-2 text-cream font-serif text-lg mb-3">
              <span aria-hidden="true">🌿</span>
              Inner Peace
            </p>
            <p className="text-sm leading-relaxed text-cream/70">{t.blurb}</p>
          </div>

          <div>
            <p className="text-sm font-semibold text-cream mb-3">{t.explore}</p>
            <ul className="space-y-2 text-sm text-cream/70">
              {t.exploreLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="hover:text-cream">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold text-cream mb-3">{t.support}</p>
            <ul className="space-y-2 text-sm text-cream/70">
              {t.supportLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="hover:text-cream">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-cream/10 pt-6">
          <Disclaimer variant="inline" className="text-cream/60" />
          <p className="text-xs text-cream/50 mt-4">© {year} Inner Peace. {t.rights}</p>
        </div>
      </div>
    </footer>
  )
}
