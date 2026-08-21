import { useState } from 'react'
import { useLanguage } from '../i18n/LanguageContext'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { todaysReframe } from '../data/reframes'

const copy = {
  en: {
    eyebrow: "Today's Reframe",
    reveal: 'Reveal today’s reframe',
    tapTag: 'Tap to reveal',
    flipBack: 'Tap to flip back',
  },
  ar: {
    eyebrow: 'تأمل اليوم',
    reveal: 'اكشف تأمل اليوم',
    tapTag: 'اضغط للكشف',
    flipBack: 'اضغط للعودة',
  },
}

export default function DailyReframe() {
  const { lang } = useLanguage()
  const t = copy[lang]
  const prefersReduced = useReducedMotion()
  const [flipped, setFlipped] = useState(false)
  const message = todaysReframe(lang)

  return (
    <div className="max-w-6xl mx-auto px-5 md:px-8 -mt-6 md:-mt-8 mb-2 md:mb-4">
      <button
        type="button"
        onClick={() => setFlipped((v) => !v)}
        aria-label={flipped ? t.flipBack : t.reveal}
        className="group block w-full max-w-md mx-auto cursor-pointer"
        style={{ perspective: '1200px' }}
      >
        <div
          className="relative h-40 rounded-2xl shadow-soft-lg"
          style={{
            transformStyle: 'preserve-3d',
            transition: `transform ${prefersReduced ? '0s' : '0.6s'} ease`,
            transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
            willChange: 'transform',
          }}
        >
          <div
            className="absolute inset-0 rounded-2xl bg-ink text-cream flex flex-col items-center justify-center gap-2 px-6 ring-0 ring-sage/0 transition-shadow group-hover:ring-2 group-hover:ring-sage/50"
            style={{ backfaceVisibility: 'hidden', willChange: 'transform' }}
          >
            <span className="text-2xl" aria-hidden="true">🍃</span>
            <p className="text-xs uppercase tracking-wide text-cream/60">{t.eyebrow}</p>
            <p className="text-sm font-medium">{t.reveal}</p>
            <span
              className={`inline-flex items-center gap-1.5 text-xs rounded-full border border-cream/30 px-3 py-1 text-cream/80 group-hover:bg-cream/10 transition-colors ${
                prefersReduced ? '' : 'animate-pulse'
              }`}
              aria-hidden="true"
            >
              🔄 {t.tapTag}
            </span>
          </div>

          <div
            className="absolute inset-0 rounded-2xl bg-white border border-sage/30 flex items-center justify-center px-6 text-center"
            style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)', willChange: 'transform' }}
          >
            <p className="font-serif italic text-lg text-ink leading-snug text-balance">{message}</p>
          </div>
        </div>
      </button>
    </div>
  )
}
