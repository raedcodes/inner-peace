import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from '../hooks/useReducedMotion'

const PHASES = [
  { key: 'in', label: 'Breathe in', seconds: 4, scale: 1.15 },
  { key: 'hold', label: 'Hold', seconds: 4, scale: 1.15 },
  { key: 'out', label: 'Breathe out', seconds: 6, scale: 0.85 },
]

export default function BreathingExercise() {
  const [running, setRunning] = useState(false)
  const [cycle, setCycle] = useState({ phaseIndex: 0, secondsLeft: PHASES[0].seconds })
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
        const nextPhaseIndex = (prev.phaseIndex + 1) % PHASES.length
        return { phaseIndex: nextPhaseIndex, secondsLeft: PHASES[nextPhaseIndex].seconds }
      })
    }, 1000)

    return () => clearInterval(intervalRef.current)
  }, [running])

  const phase = PHASES[cycle.phaseIndex]

  const toggle = () => {
    if (!running) {
      setCycle({ phaseIndex: 0, secondsLeft: PHASES[0].seconds })
    }
    setRunning((v) => !v)
  }

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
          <p className="text-ink font-medium">{running ? phase.label : 'Ready?'}</p>
          {running && <p className="text-ink-soft text-sm mt-1">{cycle.secondsLeft}s</p>}
        </div>
      </div>

      <button
        type="button"
        onClick={toggle}
        className="rounded-full bg-dusk-dark text-white px-6 py-2.5 text-sm font-medium hover:bg-dusk-dark/90 transition-colors"
        aria-live="polite"
      >
        {running ? 'Stop' : 'Start breathing exercise'}
      </button>

      <p className="text-xs text-ink-soft/80 mt-4 max-w-xs leading-relaxed">
        A gentle breathing rhythm may help you feel a bit steadier in the moment — it is not a treatment for every
        anxiety symptom.
      </p>
    </div>
  )
}
