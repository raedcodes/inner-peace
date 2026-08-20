export default function Disclaimer({ variant = 'block', className = '' }) {
  const text =
    'Inner Peace provides educational and wellness information only. It is not a substitute for professional medical, psychological, or psychiatric care. If you are struggling, please reach out to a qualified healthcare professional.'

  if (variant === 'inline') {
    return <p className={`text-xs leading-relaxed ${className || 'text-ink-soft/80'}`}>{text}</p>
  }

  return (
    <div className="rounded-2xl bg-sand/40 border border-sand text-ink-soft text-sm leading-relaxed px-6 py-5">
      <p>
        <span className="font-medium text-ink">A note on this website: </span>
        {text}
      </p>
    </div>
  )
}
