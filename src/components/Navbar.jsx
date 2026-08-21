import { useEffect, useRef, useState } from 'react'
import { useLanguage } from '../i18n/LanguageContext'

const copy = {
  en: {
    aiGuide: { href: '#right-now', label: 'AI Guide' },
    toolsLink: { href: '#tools', label: 'Tools' },
    learnLabel: 'Learn',
    learnLinks: [
      { href: '#understanding', label: 'Understanding Anxiety' },
      { href: '#symptoms', label: 'Symptoms' },
      { href: '#psychosomatic', label: 'Mind-Body' },
      { href: '#lifestyle', label: 'Lifestyle' },
      { href: '#therapy', label: 'Therapy' },
      { href: '#quotes', label: 'Insights' },
    ],
    contactLink: { href: '#contact', label: 'Contact' },
    cta: 'Feel Better',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
  },
  ar: {
    aiGuide: { href: '#right-now', label: 'الدليل الذكي' },
    toolsLink: { href: '#tools', label: 'أدوات' },
    learnLabel: 'تعلّم',
    learnLinks: [
      { href: '#understanding', label: 'فهم القلق' },
      { href: '#symptoms', label: 'الأعراض' },
      { href: '#psychosomatic', label: 'الجسد والعقل' },
      { href: '#lifestyle', label: 'نمط الحياة' },
      { href: '#therapy', label: 'العلاج' },
      { href: '#quotes', label: 'رؤى' },
    ],
    contactLink: { href: '#contact', label: 'تواصل' },
    cta: 'ابدأ التحسن',
    openMenu: 'فتح القائمة',
    closeMenu: 'إغلاق القائمة',
  },
}

function LanguageSwitch({ lang, setLang, className = '' }) {
  return (
    <div className={`inline-flex items-center gap-1.5 text-sm font-medium ${className}`}>
      <button
        type="button"
        onClick={() => setLang('en')}
        aria-pressed={lang === 'en'}
        className={`transition-colors ${lang === 'en' ? 'text-ink' : 'text-ink-soft/50 hover:text-ink-soft'}`}
      >
        EN
      </button>
      <span className="text-ink-soft/30" aria-hidden="true">/</span>
      <button
        type="button"
        onClick={() => setLang('ar')}
        aria-pressed={lang === 'ar'}
        className={`transition-colors ${lang === 'ar' ? 'text-ink' : 'text-ink-soft/50 hover:text-ink-soft'}`}
      >
        AR
      </button>
    </div>
  )
}

function LearnDropdown({ label, links }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    if (!open) return
    const onDocClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('click', onDocClick)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('click', onDocClick)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  return (
    <div
      ref={ref}
      className="relative shrink-0"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="true"
        aria-expanded={open}
        className="flex items-center gap-1 text-sm text-ink-soft hover:text-ink transition-colors whitespace-nowrap"
      >
        {label}
        <span aria-hidden="true" className={`text-xs transition-transform ${open ? 'rotate-180' : ''}`}>▾</span>
      </button>

      {open && (
        <div className="absolute top-full start-0 pt-3 z-40">
          <ul className="min-w-48 rounded-xl bg-white border border-ink/5 shadow-soft-lg py-2">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block px-4 py-2 text-sm text-ink-soft hover:text-ink hover:bg-sage-light/40 transition-colors"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default function Navbar() {
  const { lang, setLang } = useLanguage()
  const t = copy[lang]
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [learnMobileOpen, setLearnMobileOpen] = useState(false)

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
    <>
    <header
      className={`sticky top-0 z-30 transition-colors duration-300 ${
        scrolled ? 'bg-cream/90 backdrop-blur-md shadow-sm' : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto flex items-center justify-between gap-6 px-5 md:px-8 py-4" aria-label="Primary">
        <a href="#top" className="flex items-center gap-2 text-ink font-serif text-lg font-medium shrink-0">
          <span aria-hidden="true">🌿</span>
          <span className="hidden min-[380px]:inline">Inner Peace</span>
          <span className="sr-only min-[380px]:hidden">Inner Peace</span>
        </a>

        <ul className="hidden lg:flex items-center gap-7 min-w-0">
          <li className="shrink-0">
            <a href={t.aiGuide.href} className="text-sm text-ink-soft hover:text-ink transition-colors whitespace-nowrap">
              {t.aiGuide.label}
            </a>
          </li>
          <li className="shrink-0">
            <a href={t.toolsLink.href} className="text-sm text-ink-soft hover:text-ink transition-colors whitespace-nowrap">
              {t.toolsLink.label}
            </a>
          </li>
          <li>
            <LearnDropdown label={t.learnLabel} links={t.learnLinks} />
          </li>
          <li className="shrink-0">
            <a href={t.contactLink.href} className="text-sm text-ink-soft hover:text-ink transition-colors whitespace-nowrap">
              {t.contactLink.label}
            </a>
          </li>
        </ul>

        <div className="hidden lg:flex items-center gap-5 shrink-0">
          <LanguageSwitch lang={lang} setLang={setLang} />
          <a
            href="#tools"
            className="inline-flex items-center rounded-full bg-sage text-white px-4 py-2.5 text-sm font-medium hover:bg-sage-dark transition-colors shadow-soft whitespace-nowrap"
          >
            {t.cta}
          </a>
        </div>

        <div className="flex items-center gap-1.5 min-[380px]:gap-2 lg:hidden">
          <a
            href="#tools"
            className="inline-flex items-center rounded-full bg-sage text-white px-3 py-1.5 min-[380px]:px-4 min-[380px]:py-2 text-xs min-[380px]:text-sm font-medium hover:bg-sage-dark transition-colors shadow-soft whitespace-nowrap"
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
    </header>

    {menuOpen && (
      <div
        id="mobile-menu"
        className="lg:hidden fixed inset-x-0 top-16 bottom-0 bg-cream z-20 overflow-y-auto"
      >
        <ul className="flex flex-col px-6 py-6 gap-1">
          <li>
            <a href={t.aiGuide.href} onClick={closeMenu} className="block py-3 text-lg text-ink border-b border-ink/5">
              {t.aiGuide.label}
            </a>
          </li>
          <li>
            <a href={t.toolsLink.href} onClick={closeMenu} className="block py-3 text-lg text-ink border-b border-ink/5">
              {t.toolsLink.label}
            </a>
          </li>
          <li>
            <button
              type="button"
              onClick={() => setLearnMobileOpen((v) => !v)}
              aria-expanded={learnMobileOpen}
              className="w-full flex items-center justify-between py-3 text-lg text-ink border-b border-ink/5"
            >
              {t.learnLabel}
              <span aria-hidden="true" className={`text-sm transition-transform ${learnMobileOpen ? 'rotate-180' : ''}`}>▾</span>
            </button>
            {learnMobileOpen && (
              <ul className="ps-4 pb-2">
                {t.learnLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={closeMenu}
                      className="block py-2.5 text-base text-ink-soft"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </li>
          <li>
            <a href={t.contactLink.href} onClick={closeMenu} className="block py-3 text-lg text-ink border-b border-ink/5">
              {t.contactLink.label}
            </a>
          </li>
        </ul>
      </div>
    )}
    </>
  )
}
