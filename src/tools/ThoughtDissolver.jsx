import { useEffect, useRef, useState } from 'react'
import { useLanguage } from '../i18n/LanguageContext'
import { useReducedMotion } from '../hooks/useReducedMotion'
import Button from '../components/Button'

const copy = {
  en: {
    label: 'Write down a worry',
    placeholder: 'Type whatever is weighing on you...',
    dissolve: 'Let it dissolve',
    privacy: 'This is never saved, not even in your browser — it just disappears.',
  },
  ar: {
    label: 'اكتب قلقًا يشغل بالك',
    placeholder: 'اكتب أي شيء يثقل عليك...',
    dissolve: 'دعه يذوب',
    privacy: 'هذا لا يُحفظ أبدًا، ولا حتى في متصفحك — إنه يختفي فحسب.',
  },
}

const DURATION = 2200

export default function ThoughtDissolver() {
  const { lang } = useLanguage()
  const t = copy[lang]
  const prefersReduced = useReducedMotion()
  const [text, setText] = useState('')
  const [dissolving, setDissolving] = useState(false)
  const canvasRef = useRef(null)
  const rafRef = useRef(null)

  const dissolve = () => {
    if (!text.trim() || dissolving) return
    setDissolving(true)
  }

  useEffect(() => {
    if (!dissolving) return
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const dpr = window.devicePixelRatio || 1
    const width = canvas.clientWidth
    const height = canvas.clientHeight
    canvas.width = width * dpr
    canvas.height = height * dpr
    ctx.scale(dpr, dpr)

    const words = text.trim().split(/\s+/)
    const fontSize = 16
    ctx.font = `${fontSize}px Inter, sans-serif`

    let x = 8
    let y = 24
    const particles = words.map((word) => {
      const w = ctx.measureText(word + ' ').width
      if (x + w > width - 8) {
        x = 8
        y += fontSize * 1.6
      }
      const particle = {
        word,
        x,
        y,
        dy: 24 + Math.random() * 30, // sinks downward, like ink settling into water
        wave: 10 + Math.random() * 10, // sideways sway amplitude
        phase: Math.random() * Math.PI * 2,
      }
      x += w
      return particle
    })

    const lerpColor = (from, to, amount) => {
      const f = parseInt(from.slice(1), 16)
      const tCol = parseInt(to.slice(1), 16)
      const r = Math.round(((f >> 16) & 255) + (((tCol >> 16) & 255) - ((f >> 16) & 255)) * amount)
      const g = Math.round(((f >> 8) & 255) + (((tCol >> 8) & 255) - ((f >> 8) & 255)) * amount)
      const b = Math.round((f & 255) + ((tCol & 255) - (f & 255)) * amount)
      return `rgb(${r}, ${g}, ${b})`
    }

    if (prefersReduced) {
      setText('')
      setDissolving(false)
      return
    }

    const start = performance.now()

    const frame = (now) => {
      const elapsed = now - start
      const progress = Math.min(elapsed / DURATION, 1)
      ctx.clearRect(0, 0, width, height)
      ctx.font = `${fontSize}px Inter, sans-serif`
      particles.forEach((p) => {
        const sway = Math.sin(progress * Math.PI * 2.2 + p.phase) * p.wave * progress
        const px = p.x + sway
        const py = p.y + p.dy * progress
        ctx.save()
        ctx.globalAlpha = 1 - progress
        ctx.translate(px, py)
        ctx.filter = `blur(${progress * 4}px)`
        ctx.fillStyle = lerpColor('#5c574e', '#4f6b80', progress)
        ctx.fillText(p.word, 0, 0)
        ctx.restore()
      })

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(frame)
      } else {
        ctx.clearRect(0, 0, width, height)
        setText('')
        setDissolving(false)
      }
    }

    rafRef.current = requestAnimationFrame(frame)
    return () => cancelAnimationFrame(rafRef.current)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dissolving])

  return (
    <div>
      <label htmlFor="dissolver-input" className="block text-sm text-ink-soft mb-2">
        {t.label}
      </label>

      <div className="relative">
        <textarea
          id="dissolver-input"
          rows={3}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={t.placeholder}
          disabled={dissolving}
          className={`w-full rounded-xl border border-ink/10 bg-white/70 px-4 py-2.5 text-sm text-ink placeholder:text-ink-soft/40 focus:border-sage resize-none transition-opacity ${
            dissolving ? 'opacity-0' : 'opacity-100'
          }`}
        />
        <canvas
          ref={canvasRef}
          className={`absolute inset-0 w-full h-full pointer-events-none ${dissolving ? 'block' : 'hidden'}`}
        />
      </div>

      <Button onClick={dissolve} disabled={!text.trim() || dissolving} className="mt-3 px-5 py-2 text-sm">
        {t.dissolve}
      </Button>

      <p className="text-xs text-ink-soft/70 mt-3">{t.privacy}</p>
    </div>
  )
}
