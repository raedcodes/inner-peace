import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { useLanguage } from '../i18n/LanguageContext'
import { START_TOOL_EVENT } from '../lib/startTool'
import Button from '../components/Button'

const DURATIONS = {
  en: [
    { label: '5 min', seconds: 5 * 60 },
    { label: '10 min', seconds: 10 * 60 },
    { label: '15 min', seconds: 15 * 60 },
  ],
  ar: [
    { label: '٥ دقائق', seconds: 5 * 60 },
    { label: '١٠ دقائق', seconds: 10 * 60 },
    { label: '١٥ دقيقة', seconds: 15 * 60 },
  ],
}

const copy = {
  en: {
    instructions:
      'Get comfortable. Let your shoulders drop, soften your jaw, and let your breath settle into its own pace. There is nowhere else you need to be right now.',
    pause: 'Pause',
    restart: 'Restart',
    start: 'Start',
    playAudio: 'Play calm background sound',
  },
  ar: {
    instructions:
      'اجعل وضعيتك مريحة. أرخِ كتفيك، ولن فكّيك، ودع تنفسك يستقر على وتيرته الخاصة. لا مكان آخر تحتاج أن تكون فيه الآن.',
    pause: 'إيقاف مؤقت',
    restart: 'إعادة البدء',
    start: 'ابدأ',
    playAudio: 'تشغيل صوت خلفية هادئ',
  },
}

function formatTime(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60
  return `${minutes}:${seconds.toString().padStart(2, '0')}`
}

export default function RelaxationTimer() {
  const { lang } = useLanguage()
  const t = copy[lang]
  const durations = DURATIONS[lang]
  const [duration, setDuration] = useState(durations[0].seconds)
  const [secondsLeft, setSecondsLeft] = useState(durations[0].seconds)
  const [running, setRunning] = useState(false)
  const [playAudio, setPlayAudio] = useState(false)
  const prefersReduced = useReducedMotion()
  const audioRef = useRef(null)

  useEffect(() => {
    if (!running) return
    if (secondsLeft <= 0) {
      setRunning(false)
      return
    }
    const id = setTimeout(() => setSecondsLeft((s) => s - 1), 1000)
    return () => clearTimeout(id)
  }, [running, secondsLeft])

  useEffect(() => {
    if (!audioRef.current) return
    if (running && playAudio) {
      audioRef.current.play().catch(() => {})
    } else {
      audioRef.current.pause()
    }
  }, [running, playAudio])

  const selectDuration = (seconds) => {
    setDuration(seconds)
    setSecondsLeft(seconds)
    setRunning(false)
  }

  const toggle = () => {
    if (secondsLeft === 0) setSecondsLeft(duration)
    setRunning((v) => !v)
  }

  useEffect(() => {
    const onStartTool = (event) => {
      if (event.detail?.tool === 'relaxation-timer') {
        setSecondsLeft((s) => (s === 0 ? duration : s))
        setRunning(true)
      }
    }
    window.addEventListener(START_TOOL_EVENT, onStartTool)
    return () => window.removeEventListener(START_TOOL_EVENT, onStartTool)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [duration])

  const progress = 1 - secondsLeft / duration

  return (
    <div className="text-center">
      <div className="flex justify-center gap-2 mb-6">
        {durations.map((d) => (
          <button
            key={d.label}
            type="button"
            onClick={() => selectDuration(d.seconds)}
            aria-pressed={duration === d.seconds}
            className={`rounded-full px-4 py-1.5 text-sm border transition-colors ${
              duration === d.seconds
                ? 'bg-dusk-light border-dusk text-dusk-dark'
                : 'bg-white/60 border-ink/10 text-ink-soft'
            }`}
          >
            {d.label}
          </button>
        ))}
      </div>

      <div className="relative w-44 h-44 mx-auto mb-6 flex items-center justify-center">
        <svg viewBox="0 0 100 100" className="absolute inset-0 -rotate-90" aria-hidden="true">
          <circle cx="50" cy="50" r="45" fill="none" stroke="var(--color-dusk-light)" strokeWidth="6" />
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="var(--color-dusk)"
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={2 * Math.PI * 45}
            strokeDashoffset={2 * Math.PI * 45 * (1 - progress)}
            style={{ transition: prefersReduced ? 'none' : 'stroke-dashoffset 1s linear' }}
          />
        </svg>
        <span className="relative text-2xl font-serif text-ink" dir="ltr">
          {formatTime(secondsLeft)}
        </span>
      </div>

      <p className="text-sm text-ink-soft max-w-xs mx-auto mb-5 leading-relaxed">{t.instructions}</p>

      <div className="flex flex-col items-center gap-3">
        <Button variant="dusk" onClick={toggle} className="px-6 py-2.5 text-sm" aria-live="polite">
          {running ? t.pause : secondsLeft === 0 ? t.restart : t.start}
        </Button>

        <label className="flex items-center gap-2 text-xs text-ink-soft">
          <input
            type="checkbox"
            checked={playAudio}
            onChange={(e) => setPlayAudio(e.target.checked)}
            className="rounded border-ink/20"
          />
          {t.playAudio}
        </label>
      </div>

      <audio ref={audioRef} loop preload="none">
        <source src="/audio/calm-background.mp3" type="audio/mpeg" />
      </audio>
    </div>
  )
}
