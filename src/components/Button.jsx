const variants = {
  primary: 'bg-sage text-white hover:bg-sage-dark',
  dusk: 'bg-dusk-dark text-white hover:bg-dusk-dark/90',
  ink: 'bg-ink text-cream hover:bg-ink/90',
  outline: 'border border-ink/20 text-ink hover:bg-white/60',
  tag: 'bg-sage-light text-sage-dark hover:bg-sage/20',
  'tag-neutral': 'bg-ink/5 text-ink-soft hover:bg-ink/10',
}

// Centralizes the color/hover treatment shared by every pill-shaped
// action across the site. Padding, text size, shadow, and width are
// intentionally left to `className` (not baked into the variant) since
// those vary per call site and Tailwind utilities of equal specificity
// don't reliably override by attribute order.
export default function Button({ href, variant = 'primary', className = '', type, children, ...rest }) {
  const Tag = href ? 'a' : 'button'
  const base = 'inline-flex items-center justify-center rounded-full font-medium transition-colors disabled:opacity-40'

  return (
    <Tag
      href={href}
      type={Tag === 'button' ? type || 'button' : undefined}
      className={`${base} ${variants[variant]} ${className}`}
      {...rest}
    >
      {children}
    </Tag>
  )
}
