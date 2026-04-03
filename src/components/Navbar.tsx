import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { navigationLinks } from '../utils/navigation'

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const closeMenu = () => setIsOpen(false)

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
      <nav
        aria-label="Primary"
        className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4"
      >
        <a
          href="#home"
          onClick={closeMenu}
          className="text-lg font-semibold tracking-[0.18em] text-slate-900 uppercase"
        >
          Posture Homes
        </a>
        <ul className="hidden items-center gap-8 md:flex">
          {navigationLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm font-medium text-slate-600 transition hover:text-slate-900"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <button
          type="button"
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setIsOpen((open) => !open)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 text-slate-900 transition hover:bg-slate-50 md:hidden"
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>
      {isOpen && (
        <div id="mobile-menu" className="border-t border-slate-200 bg-white md:hidden">
          <ul className="mx-auto flex max-w-6xl flex-col px-6 py-4">
            {navigationLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={closeMenu}
                  className="block py-3 text-base font-medium text-slate-700 transition hover:text-slate-900"
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

export default Navbar
