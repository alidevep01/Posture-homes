import { useCurrentYear } from '../hooks/useCurrentYear'

function Footer() {
  const year = useCurrentYear()

  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-8 text-sm text-slate-600 sm:flex-row sm:items-center sm:justify-between">
        <p>&copy; {year} Posture Homes. Crafted for calm living.</p>
        <a href="#contact" className="transition hover:text-slate-900">
          Contact us
        </a>
      </div>
    </footer>
  )
}

export default Footer
