const bgMap = {
  60: 'bg-white/60',
  70: 'bg-white/70',
  80: 'bg-white/80',
}

const radiusMap = {
  xl: 'rounded-xl',
  '2xl': 'rounded-2xl',
}

// Centralizes the "translucent bordered box" pattern repeated ad hoc across
// the site (Medication, Therapy, Symptoms/Psychosomatic notes, Contact, the
// AI check-in, etc). bg/radius/shadow are enum props rather than className
// overrides — Tailwind utilities of equal specificity don't reliably
// override by attribute order, so each visual axis gets exactly one class.
export default function Panel({
  as: Tag = 'div',
  bg = 60,
  radius = '2xl',
  shadow = false,
  border = 'border-ink/5',
  className = '',
  children,
  ...rest
}) {
  return (
    <Tag
      className={`${bgMap[bg]} border ${border} ${radiusMap[radius]} ${shadow ? 'shadow-soft' : ''} ${className}`}
      {...rest}
    >
      {children}
    </Tag>
  )
}
