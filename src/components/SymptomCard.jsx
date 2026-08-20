const tintClasses = {
  sage: 'bg-sage-light text-sage-dark border-sage/20',
  dusk: 'bg-dusk-light text-dusk-dark border-dusk/20',
  clay: 'bg-[#f5e6dc] text-[#a3603f] border-clay/20',
  sand: 'bg-[#f3ead6] text-[#8a6d3b] border-sand/40',
}

export default function SymptomCard({ category, isOpen, onToggle }) {
  const tint = tintClasses[category.tint] ?? tintClasses.sage
  const panelId = `symptom-panel-${category.id}`

  return (
    <div className={`rounded-2xl border ${tint} bg-white/60 shadow-soft overflow-hidden`}>
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={panelId}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-start"
      >
        <div>
          <span className="text-xs font-semibold uppercase tracking-wide">{category.label}</span>
          <p className="text-ink-soft text-sm mt-1 max-w-md">{category.description}</p>
        </div>
        <span
          className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center border ${tint} transition-transform duration-200`}
          style={{ transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)' }}
          aria-hidden="true"
        >
          +
        </span>
      </button>

      {isOpen && (
        <div id={panelId} className="px-6 pb-6">
          <ul className="grid sm:grid-cols-2 gap-3">
            {category.items.map((item) => (
              <li key={item.name} className="rounded-xl bg-white/80 border border-ink/5 px-4 py-3">
                <p className="font-medium text-ink text-sm">{item.name}</p>
                <p className="text-ink-soft text-sm mt-1">{item.note}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
