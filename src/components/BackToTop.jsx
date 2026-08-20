import { useEffect, useState } from 'react'
import { useLanguage } from '../i18n/LanguageContext'

const copy = {
  en: 'Back to top',
  ar: 'العودة إلى الأعلى',
}

export default function BackToTop() {
  const { lang } = useLanguage()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 700)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <a
      href="#top"
      aria-label={copy[lang]}
      className={`fixed bottom-5 end-5 z-40 w-11 h-11 rounded-full bg-white/90 backdrop-blur border border-ink/10 shadow-soft-lg flex items-center justify-center text-ink hover:bg-white transition-all ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3 pointer-events-none'
      }`}
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path d="M8 13V3M8 3L3 8M8 3l5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </a>
  )
}
