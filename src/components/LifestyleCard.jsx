import { useState } from 'react'

export default function LifestyleCard({ id, title, icon, summary, points }) {
  const [open, setOpen] = useState(false)

  return (
    <div id={id} className="rounded-2xl bg-white/70 border border-ink/5 shadow-soft p-6 md:p-7 scroll-mt-24">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="w-full flex items-center gap-4 text-start sm:pointer-events-none"
      >
        {icon && (
          <div
            className="w-11 h-11 shrink-0 rounded-xl bg-sage-light flex items-center justify-center text-xl"
            aria-hidden="true"
          >
            {icon}
          </div>
        )}
        <h3 className="flex-1 text-lg font-medium text-ink font-serif">{title}</h3>
        <span
          className="sm:hidden shrink-0 w-7 h-7 rounded-full border border-ink/10 flex items-center justify-center text-ink-soft transition-transform duration-200"
          style={{ transform: open ? 'rotate(45deg)' : 'rotate(0deg)' }}
          aria-hidden="true"
        >
          +
        </span>
      </button>

      <div className={`${open ? 'block' : 'hidden'} sm:block mt-4 text-ink-soft leading-relaxed text-[0.975rem]`}>
        <p className="mb-3">{summary}</p>
        <ul className="space-y-1.5">
          {points.map((point) => (
            <li key={point} className="flex gap-2 text-sm">
              <span className="text-sage-dark shrink-0" aria-hidden="true">•</span>
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
