import { useEffect, useState } from 'react'

const links = [
  { href: '#understanding', label: 'Understanding Anxiety' },
  { href: '#symptoms', label: 'Symptoms' },
  { href: '#lifestyle', label: 'What Can I Do?' },
  { href: '#therapy', label: 'Therapy & Help' },
  { href: '#tools', label: 'Tools' },
  { href: '#quotes', label: 'Insights' },
]

export default function Navbar() {
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
      <nav className="max-w-6xl mx-auto flex items-center justify-between px-5 md:px-8 py-4" aria-label="Primary">
        <a href="#top" className="flex items-center gap-2 text-ink font-serif text-lg font-medium">
          <span aria-hidden="true">🌿</span>
          Inner Peace
        </a>

        <ul className="hidden lg:flex items-center gap-7">
          {links.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="text-sm text-ink-soft hover:text-ink transition-colors">
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#tools"
          className="hidden lg:inline-flex items-center rounded-full bg-sage text-white px-5 py-2.5 text-sm font-medium hover:bg-sage-dark transition-colors shadow-soft"
        >
          Start Feeling Better
        </a>

        <button
          type="button"
          className="lg:hidden w-10 h-10 flex items-center justify-center rounded-full text-ink"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span aria-hidden="true" className="text-xl">
            {menuOpen ? '✕' : '☰'}
          </span>
        </button>
      </nav>

      {menuOpen && (
        <div
          id="mobile-menu"
          className="lg:hidden fixed inset-x-0 top-[64px] bottom-0 bg-cream z-20 overflow-y-auto"
        >
          <ul className="flex flex-col px-6 py-6 gap-1">
            {links.map((link) => (
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
          <div className="px-6">
            <a
              href="#tools"
              onClick={closeMenu}
              className="block text-center rounded-full bg-sage text-white px-5 py-3 text-base font-medium"
            >
              Start Feeling Better
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
