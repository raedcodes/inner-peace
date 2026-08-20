export default function ToolCard({ title, description, icon, children }) {
  return (
    <div className="rounded-2xl bg-white/80 border border-ink/5 shadow-soft-lg p-6 md:p-8">
      <div className="flex items-start gap-4 mb-6">
        {icon && (
          <div className="w-12 h-12 shrink-0 rounded-xl bg-dusk-light flex items-center justify-center text-2xl" aria-hidden="true">
            {icon}
          </div>
        )}
        <div>
          <h3 className="text-xl font-medium text-ink font-serif">{title}</h3>
          {description && <p className="text-ink-soft text-sm mt-1 leading-relaxed">{description}</p>}
        </div>
      </div>
      {children}
    </div>
  )
}
