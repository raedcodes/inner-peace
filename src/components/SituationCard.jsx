export default function SituationCard({ icon, title, selected, onSelect }) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={`flex flex-col items-center text-center gap-2 rounded-2xl border p-4 transition-colors ${
        selected
          ? 'bg-sage-light border-sage shadow-soft'
          : 'bg-white/70 border-ink/5 shadow-soft hover:bg-white hover:border-sage/40'
      }`}
    >
      <span className="text-2xl" aria-hidden="true">
        {icon}
      </span>
      <span className={`text-sm font-medium leading-snug ${selected ? 'text-sage-dark' : 'text-ink'}`}>{title}</span>
    </button>
  )
}
