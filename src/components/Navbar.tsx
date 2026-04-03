import { AnimatePresence, motion } from 'framer-motion'
import { useMemo, useState } from 'react'
import { ChevronDown, Menu, X } from 'lucide-react'
import { Link, useLocation } from 'react-router'
import PostureHomesLogo from './PostureHomesLogo'
import { navigationLinks } from '../utils/navigation'
import { productDropdownLinks } from '../utils/productCategories'

const desktopNavItemClassName =
  'rounded-full px-4 py-2 text-sm font-medium text-slate-600 transition duration-300 hover:bg-[#efe3d2] hover:text-slate-900'

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isProductsOpen, setIsProductsOpen] = useState(false)
  const location = useLocation()

  const isHomePage = location.pathname === '/'

  const processedNavigationLinks = useMemo(
    () =>
      navigationLinks.map((link) => ({
        ...link,
        href:
          link.type === 'anchor' && !isHomePage ? `/${link.href}` : link.href,
      })),
    [isHomePage],
  )

  const closeMenus = () => {
    setIsMobileMenuOpen(false)
    setIsProductsOpen(false)
  }

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
      <nav
        aria-label="Primary"
        className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4"
      >
        <Link
          to="/"
          onClick={closeMenus}
          aria-label="Posture Homes"
          className="transition duration-300 hover:opacity-80"
        >
          <PostureHomesLogo compact />
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {processedNavigationLinks.map((link) => (
            <li key={link.label}>
              {link.type === 'route' ? (
                <motion.div whileHover={{ y: -1, scale: 1.01 }}>
                  <Link
                    to={link.href}
                    className={desktopNavItemClassName}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ) : (
                <motion.div whileHover={{ y: -1, scale: 1.01 }}>
                  <a
                    href={link.href}
                    className={desktopNavItemClassName}
                  >
                    {link.label}
                  </a>
                </motion.div>
              )}
            </li>
          ))}

          <li
            className="relative"
            onMouseEnter={() => setIsProductsOpen(true)}
            onMouseLeave={() => setIsProductsOpen(false)}
          >
            <motion.button
              type="button"
              aria-expanded={isProductsOpen}
              whileHover={{ y: -1, scale: 1.01 }}
              onClick={() => setIsProductsOpen((open) => !open)}
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-slate-600 transition duration-300 hover:bg-[#efe3d2] hover:text-slate-900"
            >
              Products
              <ChevronDown
                className={`h-4 w-4 transition duration-300 ${
                  isProductsOpen ? 'rotate-180' : ''
                }`}
              />
            </motion.button>

            <AnimatePresence>
              {isProductsOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.18, ease: 'easeOut' }}
                  className="absolute right-0 top-full mt-4 min-w-56 rounded-2xl border border-slate-200 bg-white p-2 shadow-[0_24px_60px_-30px_rgba(15,23,42,0.25)]"
                >
                  {productDropdownLinks.map((item) => (
                    <Link
                      key={item.href}
                      to={item.href}
                      onClick={closeMenus}
                      className="block rounded-xl px-4 py-3 text-sm font-medium text-slate-700 transition duration-300 hover:bg-[#f4ecdf] hover:text-slate-900"
                    >
                      {item.label}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        </ul>

        <button
          type="button"
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-menu"
          aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setIsMobileMenuOpen((open) => !open)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 text-slate-900 transition hover:bg-[#efe3d2] md:hidden"
        >
          {isMobileMenuOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </button>
      </nav>

      <AnimatePresence initial={false}>
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="overflow-hidden border-t border-slate-200 bg-white md:hidden"
          >
            <ul className="mx-auto flex max-w-6xl flex-col px-6 py-4">
              {processedNavigationLinks.map((link) => (
                <li key={link.label}>
                  {link.type === 'route' ? (
                    <Link
                      to={link.href}
                      onClick={closeMenus}
                      className="block rounded-2xl px-4 py-3 text-base font-medium text-slate-700 transition duration-300 hover:bg-[#f4ecdf] hover:text-slate-900"
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <a
                      href={link.href}
                      onClick={closeMenus}
                      className="block rounded-2xl px-4 py-3 text-base font-medium text-slate-700 transition duration-300 hover:bg-[#f4ecdf] hover:text-slate-900"
                    >
                      {link.label}
                    </a>
                  )}
                </li>
              ))}

              <li className="border-t border-slate-200 pt-3">
                <button
                  type="button"
                  aria-expanded={isProductsOpen}
                  onClick={() => setIsProductsOpen((open) => !open)}
                  className="flex w-full items-center justify-between rounded-2xl px-4 py-3 text-base font-medium text-slate-700 transition duration-300 hover:bg-[#f4ecdf] hover:text-slate-900"
                >
                  Products
                  <ChevronDown
                    className={`h-4 w-4 transition duration-300 ${
                      isProductsOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isProductsOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2, ease: 'easeOut' }}
                      className="overflow-hidden"
                    >
                      <div className="pb-2 pl-4">
                        {productDropdownLinks.map((item) => (
                          <Link
                            key={item.href}
                            to={item.href}
                            onClick={closeMenus}
                            className="block rounded-xl px-4 py-3 text-sm font-medium text-slate-600 transition duration-300 hover:bg-[#f4ecdf] hover:text-slate-900"
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

export default Navbar
