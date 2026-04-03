import { navigationLinks } from '../utils/navigation'

function Navbar() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <nav
        aria-label="Primary"
        className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4"
      >
        <a href="#home" className="text-lg font-semibold text-slate-900">
          Posture Homes
        </a>
        <ul className="flex items-center gap-6 text-sm text-slate-600">
          {navigationLinks.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="transition hover:text-slate-900">
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}

export default Navbar
