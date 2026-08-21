import { useState } from 'react'
import { useLanguage } from '../i18n/LanguageContext'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { playPopSound } from '../lib/popSound'

const BUBBLE_COUNT = 20

const copy = {
  en: {
    hint: 'Pop a few bubbles — no reason needed.',
    reset: 'Refill bubbles',
  },
  ar: {
    hint: 'افرقع بعض الفقاعات — دون داعٍ لسبب.',
    reset: 'أعد تعبئة الفقاعات',
  },
}

export default function FidgetPad() {
  const { lang } = useLanguage()
  const t = copy[lang]
  const prefersReduced = useReducedMotion()
  const [popped, setPopped] = useState(() => new Set())

  const pop = (index) => {
    if (popped.has(index)) return
    setPopped((prev) => new Set(prev).add(index))
    navigator.vibrate?.(12)
    playPopSound()
  }

  const reset = () => setPopped(new Set())

  return (
    <div className="text-center">
      <p className="text-sm text-ink-soft mb-4">{t.hint}</p>

      <div className="grid grid-cols-5 gap-2.5 max-w-xs mx-auto mb-5">
        {Array.from({ length: BUBBLE_COUNT }).map((_, i) => {
          const isPopped = popped.has(i)
          return (
            <button
              key={i}
              type="button"
              onClick={() => pop(i)}
              aria-pressed={isPopped}
              aria-label="bubble"
              className={`aspect-square rounded-full border-2 transition-all ${
                prefersReduced ? '' : 'duration-200'
              } ${
                isPopped
                  ? 'bg-cream border-dashed border-ink/15 scale-[0.45]'
                  : 'bg-dusk-light border-transparent shadow-[inset_-2px_-2px_4px_rgba(255,255,255,0.6),inset_2px_2px_4px_rgba(123,147,168,0.35)] hover:scale-105 active:scale-90'
              }`}
            />
          )
        })}
      </div>

      {popped.size > 0 && (
        <button
          type="button"
          onClick={reset}
          className="text-sm rounded-full bg-sage-light text-sage-dark px-4 py-2 hover:bg-sage/20 transition-colors"
        >
          {t.reset}
        </button>
      )}
    </div>
  )
}
