import { useLanguage } from '../i18n/LanguageContext'

const labels = {
  en: 'Illustration of soft hills under a rising sun, with a bird gliding overhead',
  ar: 'رسم توضيحي لتلال ناعمة تحت شمس مشرقة، وطائر يحلّق في الأعلى',
}

export default function HeroIllustration() {
  const { lang } = useLanguage()

  return (
    <svg
      viewBox="0 0 1200 340"
      className="w-full h-auto"
      role="img"
      aria-label={labels[lang]}
    >
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#e6edf2" />
          <stop offset="100%" stopColor="#faf7f2" />
        </linearGradient>
        <linearGradient id="hillBack" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#e4ebe1" />
          <stop offset="100%" stopColor="#cfe0ca" />
        </linearGradient>
        <linearGradient id="hillFront" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#9ab594" />
          <stop offset="100%" stopColor="#7a9b76" />
        </linearGradient>
      </defs>

      <rect x="0" y="0" width="1200" height="340" rx="28" fill="url(#sky)" />

      <circle cx="600" cy="150" r="72" fill="#e8ddc9" opacity="0.9" />
      <circle cx="600" cy="150" r="52" fill="#f3ead6" />

      <path
        d="M0 220 C 180 160, 340 260, 520 200 C 700 145, 860 235, 1050 190 C 1120 175, 1170 185, 1200 200 L1200 340 L0 340 Z"
        fill="url(#hillBack)"
      />

      <path
        d="M0 260 C 200 210, 360 290, 560 250 C 760 210, 920 280, 1120 240 C 1160 232, 1180 235, 1200 240 L1200 340 L0 340 Z"
        fill="url(#hillFront)"
      />

      <g opacity="0.5" stroke="#4f6b80" strokeWidth="4" strokeLinecap="round" fill="none">
        <path d="M220 96 Q234 84 248 96" />
        <path d="M760 60 Q774 48 788 60" />
      </g>

      <g fill="#587055">
        <path d="M120 300 C110 280 120 260 135 250 C 140 270 135 288 120 300 Z" />
        <path d="M1080 300 C1090 278 1082 258 1066 248 C 1060 270 1066 288 1080 300 Z" />
      </g>
    </svg>
  )
}
