export default function SectionHeading({ eyebrow, title, description, align = 'left' }) {
  const alignment = align === 'center' ? 'text-center mx-auto' : 'text-start'

  return (
    <div className={`max-w-2xl ${alignment} mb-10 md:mb-14`}>
      {eyebrow && (
        <p className="text-sm font-semibold tracking-wide uppercase text-sage-dark mb-3">
          {eyebrow}
        </p>
      )}
      <h2 className="text-3xl md:text-4xl font-medium text-ink text-balance mb-4">{title}</h2>
      {description && (
        <p className="text-base md:text-lg text-ink-soft leading-relaxed text-balance">
          {description}
        </p>
      )}
    </div>
  )
}
