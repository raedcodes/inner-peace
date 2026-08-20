import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { useLanguage } from '../i18n/LanguageContext'
import { START_TOOL_EVENT } from '../lib/startTool'

const PHASES = {
  en: [
    { key: 'in', label: 'Breathe in', seconds: 4, scale: 1.15 },
    { key: 'hold', label: 'Hold', seconds: 4, scale: 1.15 },
    { key: 'out', label: 'Breathe out', seconds: 6, scale: 0.85 },
  ],
  ar: [
    { key: 'in', label: 'شهيق', seconds: 4, scale: 1.15 },
    { key: 'hold', label: 'احبس', seconds: 4, scale: 1.15 },
    { key: 'out', label: 'زفير', seconds: 6, scale: 0.85 },
  ],
}

const copy = {
  en: {
    ready: 'Ready?',
    start: 'Start breathing exercise',
    stop: 'Stop',
    seconds: (n) => `${n}s`,
    note: 'A gentle breathing rhythm may help you feel a bit steadier in the moment — it is not a treatment for every anxiety symptom.',
  },
  ar: {
    ready: 'مستعد؟',
    start: 'ابدأ تمرين التنفس',
    stop: 'إيقاف',
    seconds: (n) => `${n} ث`,
    note: 'إيقاع تنفس لطيف قد يساعدك على الشعور بثبات أكبر في اللحظة — لكنه ليس علاجًا لكل أعراض القلق.',
  },
}

export default function BreathingExercise() {
  const { lang } = useLanguage()
  const t = copy[lang]
  const phases = PHASES[lang]
  const [running, setRunning] = useState(false)
  const [cycle, setCycle] = useState({ phaseIndex: 0, secondsLeft: phases[0].seconds })
  const prefersReduced = useReducedMotion()
  const intervalRef = useRef(null)

  useEffect(() => {
    if (!running) {
      clearInterval(intervalRef.current)
      return
    }

    intervalRef.current = setInterval(() => {
      setCycle((prev) => {
        if (prev.secondsLeft > 1) {
          return { ...prev, secondsLeft: prev.secondsLeft - 1 }
        }
        const nextPhaseIndex = (prev.phaseIndex + 1) % phases.length
        return { phaseIndex: nextPhaseIndex, secondsLeft: phases[nextPhaseIndex].seconds }
      })
    }, 1000)

    return () => clearInterval(intervalRef.current)
  }, [running, phases])

  const phase = phases[cycle.phaseIndex]

  const start = () => {
    setCycle({ phaseIndex: 0, secondsLeft: phases[0].seconds })
    setRunning(true)
  }

  const toggle = () => {
    if (running) {
      setRunning(false)
    } else {
      start()
    }
  }

  useEffect(() => {
    const onStartTool = (event) => {
      if (event.detail?.tool === 'breathing') start()
    }
    window.addEventListener(START_TOOL_EVENT, onStartTool)
    return () => window.removeEventListener(START_TOOL_EVENT, onStartTool)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const circleScale = running ? phase.scale : 1

  return (
    <div className="flex flex-col items-center text-center">
      <div className="relative w-52 h-52 flex items-center justify-center mb-6">
        <div
          className="absolute inset-0 rounded-full bg-dusk-light"
          style={{
            transform: `scale(${circleScale})`,
            transition: prefersReduced ? 'none' : `transform ${running ? phase.seconds : 0.4}s ease-in-out`,
          }}
          aria-hidden="true"
        />
        <div
          className="absolute inset-6 rounded-full bg-dusk/40"
          style={{
            transform: `scale(${circleScale})`,
            transition: prefersReduced ? 'none' : `transform ${running ? phase.seconds : 0.4}s ease-in-out`,
          }}
          aria-hidden="true"
        />
        <div className="relative z-10 text-center">
          <p className="text-ink font-medium">{running ? phase.label : t.ready}</p>
          {running && <p className="text-ink-soft text-sm mt-1">{t.seconds(cycle.secondsLeft)}</p>}
        </div>
      </div>

      <button
        type="button"
        onClick={toggle}
        className="rounded-full bg-dusk-dark text-white px-6 py-2.5 text-sm font-medium hover:bg-dusk-dark/90 transition-colors"
        aria-live="polite"
      >
        {running ? t.stop : t.start}
      </button>

      <p className="text-xs text-ink-soft/80 mt-4 max-w-xs leading-relaxed">{t.note}</p>
    </div>
  )
}
