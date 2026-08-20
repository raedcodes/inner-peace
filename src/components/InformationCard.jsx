export default function InformationCard({ title, children, icon }) {
  return (
    <div className="rounded-2xl bg-white/70 border border-ink/5 shadow-soft p-6 md:p-7">
      {icon && (
        <div className="w-11 h-11 rounded-xl bg-sage-light flex items-center justify-center text-xl mb-4" aria-hidden="true">
          {icon}
        </div>
      )}
      <h3 className="text-lg font-medium text-ink mb-2 font-serif">{title}</h3>
      <div className="text-ink-soft leading-relaxed text-[0.975rem]">{children}</div>
    </div>
  )
}
