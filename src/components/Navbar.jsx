import { useEffect, useState } from 'react'
import { useLanguage } from '../i18n/LanguageContext'

const copy = {
  en: {
    links: [
      { href: '#understanding', label: 'Understanding Anxiety' },
      { href: '#symptoms', label: 'Symptoms' },
      { href: '#psychosomatic', label: 'Mind-Body' },
      { href: '#lifestyle', label: 'Lifestyle' },
      { href: '#therapy', label: 'Therapy' },
      { href: '#tools', label: 'Tools' },
      { href: '#quotes', label: 'Insights' },
      { href: '#contact', label: 'Contact' },
    ],
    cta: 'Feel Better',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
  },
  ar: {
    links: [
      { href: '#understanding', label: 'فهم القلق' },
      { href: '#symptoms', label: 'الأعراض' },
      { href: '#psychosomatic', label: 'الجسد والعقل' },
      { href: '#lifestyle', label: 'نمط الحياة' },
      { href: '#therapy', label: 'العلاج' },
      { href: '#tools', label: 'أدوات' },
      { href: '#quotes', label: 'رؤى' },
      { href: '#contact', label: 'تواصل' },
    ],
    cta: 'ابدأ التحسن',
    openMenu: 'فتح القائمة',
    closeMenu: 'إغلاق القائمة',
  },
}

function LanguageSwitch({ lang, setLang, className = '' }) {
  return (
    <div className={`inline-flex items-center rounded-full bg-ink/5 p-1 text-xs font-medium ${className}`}>
      <button
        type="button"
        onClick={() => setLang('en')}
        aria-pressed={lang === 'en'}
        className={`px-2.5 py-1 rounded-full transition-colors ${
          lang === 'en' ? 'bg-white text-ink shadow-soft' : 'text-ink-soft'
        }`}
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => setLang('ar')}
        aria-pressed={lang === 'ar'}
        className={`px-2.5 py-1 rounded-full transition-colors ${
          lang === 'ar' ? 'bg-white text-ink shadow-soft' : 'text-ink-soft'
        }`}
      >
        AR
      </button>
    </div>
  )
}

export default function Navbar() {
  const { lang, setLang } = useLanguage()
  const t = copy[lang]
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  return (
    <header
      className={`sticky top-0 z-30 transition-colors duration-300 ${
        scrolled ? 'bg-cream/90 backdrop-blur-md shadow-sm' : 'bg-transparent'
      }`}
    >
      <nav className="max-w-6xl mx-auto flex items-center justify-between gap-4 px-5 md:px-8 py-4" aria-label="Primary">
        <a href="#top" className="flex items-center gap-2 text-ink font-serif text-lg font-medium shrink-0">
          <span aria-hidden="true">🌿</span>
          Inner Peace
        </a>

        <ul className="hidden xl:flex items-center gap-4 xl:gap-6 min-w-0">
          {t.links.map((link) => (
            <li key={link.href} className="shrink-0">
              <a href={link.href} className="text-sm text-ink-soft hover:text-ink transition-colors whitespace-nowrap">
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden xl:flex items-center gap-3 shrink-0">
          <LanguageSwitch lang={lang} setLang={setLang} />
          <a
            href="#tools"
            className="inline-flex items-center rounded-full bg-sage text-white px-4 py-2.5 text-sm font-medium hover:bg-sage-dark transition-colors shadow-soft whitespace-nowrap"
          >
            {t.cta}
          </a>
        </div>

        <div className="flex items-center gap-2 xl:hidden">
          <a
            href="#tools"
            className="inline-flex items-center rounded-full bg-sage text-white px-4 py-2 text-sm font-medium hover:bg-sage-dark transition-colors shadow-soft whitespace-nowrap"
          >
            {t.cta}
          </a>
          <LanguageSwitch lang={lang} setLang={setLang} />
          <button
            type="button"
            className="w-10 h-10 shrink-0 flex items-center justify-center rounded-full text-ink"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? t.closeMenu : t.openMenu}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span aria-hidden="true" className="text-xl">
              {menuOpen ? '✕' : '☰'}
            </span>
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div
          id="mobile-menu"
          className="xl:hidden fixed inset-x-0 top-[64px] bottom-0 bg-cream z-20 overflow-y-auto"
        >
          <ul className="flex flex-col px-6 py-6 gap-1">
            {t.links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={closeMenu}
                  className="block py-3 text-lg text-ink border-b border-ink/5"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  )
}
