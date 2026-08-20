import { useLanguage } from '../i18n/LanguageContext'

const copy = {
  en: {
    label: 'A note on this website: ',
    text: 'Inner Peace provides educational and wellness information only. It is not a substitute for professional medical, psychological, or psychiatric care. If you are struggling, please reach out to a qualified healthcare professional.',
  },
  ar: {
    label: 'ملاحظة حول هذا الموقع: ',
    text: 'يقدم موقع "إنر بيس" معلومات تثقيفية وصحية فقط، وهو ليس بديلاً عن الرعاية الطبية أو النفسية أو النفسية المتخصصة. إذا كنت تمر بضيق، يُرجى التواصل مع أخصائي رعاية صحية مؤهل.',
  },
}

export default function Disclaimer({ variant = 'block', className = '' }) {
  const { lang } = useLanguage()
  const t = copy[lang]

  if (variant === 'inline') {
    return <p className={`text-xs leading-relaxed ${className || 'text-ink-soft/80'}`}>{t.text}</p>
  }

  return (
    <div className="rounded-2xl bg-sand/40 border border-sand text-ink-soft text-sm leading-relaxed px-6 py-5">
      <p>
        <span className="font-medium text-ink">{t.label}</span>
        {t.text}
      </p>
    </div>
  )
}
