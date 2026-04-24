import { AnimatePresence, motion } from "framer-motion";
import { useRef, useState } from "react";
import {
  LuChevronDown as ChevronDown,
  LuMenu as Menu,
  LuX as X,
} from "react-icons/lu";
import { Link, useLocation } from "react-router";
import PostureHomesLogo from "./PostureHomesLogo";
import { navigationLinks } from "../utils/navigation";
import { productDropdownLinks } from "../utils/productCategories";
import { homeCategoryLinks, officeCategoryLinks } from "../data/productsData";
import { primaryContactPhoneHref } from "../utils/contact";

const desktopNavItemClassName =
  "rounded-full px-4 py-2 text-sm font-semibold text-slate-600 transition duration-300 hover:bg-[#efe3d2] hover:text-slate-900";

type NavigationLink = {
  href: string;
  label: string;
  type: "route" | "anchor";
};

const pageSectionNavigation: Record<string, NavigationLink[]> = {
  "/about": [
    { href: "#about", label: "About us", type: "anchor" },
    { href: "#founders", label: "Founders", type: "anchor" },
    { href: "#products", label: "Products", type: "anchor" },
    { href: "#mission", label: "Mission", type: "anchor" },
    { href: "#presence", label: "Presence", type: "anchor" },
  ],
  "/products/home-furniture": [
    { href: "#products", label: "Products", type: "anchor" },
    { href: "#process", label: "Process", type: "anchor" },
    { href: primaryContactPhoneHref, label: "Contact us", type: "anchor" },
  ],
  "/products/office-furniture": [
    { href: "#products", label: "Products", type: "anchor" },
    { href: "#process", label: "Process", type: "anchor" },
    { href: "#clientele", label: "Clientele", type: "anchor" },
    { href: primaryContactPhoneHref, label: "Contact us", type: "anchor" },
  ],
  "/sourcing": [
    { href: "#process", label: "Process", type: "anchor" },
    { href: "#support", label: "What we support", type: "anchor" },
    { href: "#gallery", label: "Gallery", type: "anchor" },
    { href: primaryContactPhoneHref, label: "Contact us", type: "anchor" },
  ],
};

// Which page-section links should get a subcategory dropdown
const sectionDropdownMap: Record<string, typeof homeCategoryLinks> = {
  "/products/home-furniture": homeCategoryLinks,
  "/products/office-furniture": officeCategoryLinks,
};

function SubcategoryDropdown({ links }: { links: typeof homeCategoryLinks }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 6 }}
      transition={{ duration: 0.16, ease: "easeOut" }}
      className="absolute left-1/2 top-full z-50 mt-2 w-64 -translate-x-1/2 overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-xl"
    >
      <div className="max-h-80 overflow-y-auto py-2">
        {links.map((link) => (
          <Link
            key={link.slug}
            to={link.href}
            className="flex items-center justify-between px-4 py-2.5 text-sm text-slate-700 transition hover:bg-[#f4ecdf] hover:text-slate-900"
          >
            <span>{link.label}</span>
            <span className="ml-2 text-xs text-slate-400">{link.itemCount}</span>
          </Link>
        ))}
      </div>
    </motion.div>
  );
}

// Desktop nav item with optional subcategory hover dropdown
function DesktopNavLink({
  link,
  dropdownLinks,
}: {
  link: NavigationLink;
  dropdownLinks?: typeof homeCategoryLinks;
}) {
  const [open, setOpen] = useState(false);
  const leaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleEnter = () => {
    if (leaveTimer.current) clearTimeout(leaveTimer.current);
    setOpen(true);
  };
  const handleLeave = () => {
    leaveTimer.current = setTimeout(() => setOpen(false), 120);
  };

  const inner =
    link.type === "route" ? (
      <Link to={link.href} className={desktopNavItemClassName}>
        {link.label}
      </Link>
    ) : (
      <a href={link.href} className={desktopNavItemClassName}>
        {link.label}
      </a>
    );

  if (!dropdownLinks) {
    return <motion.div whileHover={{ y: -1, scale: 1.01 }}>{inner}</motion.div>;
  }

  return (
    <div
      className="relative"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <div className="flex items-center gap-0.5">
        {inner}
        <ChevronDown
          className={`h-3.5 w-3.5 text-slate-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </div>
      <AnimatePresence>
        {open && <SubcategoryDropdown links={dropdownLinks} />}
      </AnimatePresence>
    </div>
  );
}

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [isMobileSectionOpen, setIsMobileSectionOpen] = useState(false);
  const location = useLocation();

  const isHomePage = location.pathname === "/";
  const isBlogPage =
    location.pathname === "/blog" || location.pathname.startsWith("/blog/");
  const pageNavigationLinks = pageSectionNavigation[location.pathname];
  const sectionDropdownLinks = sectionDropdownMap[location.pathname];
  const shouldShowProductsDropdown = !pageNavigationLinks;

  const processedNavigationLinks =
    pageNavigationLinks ??
    navigationLinks.map((link) => ({
      ...link,
      href:
        link.type === "anchor" && link.href.startsWith("#") && !isHomePage
          ? `/${link.href}`
          : link.href,
    }));

  const closeMenus = () => {
    setIsMobileMenuOpen(false);
    setIsProductsOpen(false);
    setIsMobileSectionOpen(false);
  };

  const renderNavigationLink = (
    link: NavigationLink,
    className: string,
    onClick?: () => void
  ) =>
    link.type === "route" ? (
      <Link to={link.href} onClick={onClick} className={className}>
        {link.label}
      </Link>
    ) : (
      <a href={link.href} onClick={onClick} className={className}>
        {link.label}
      </a>
    );

  if (isHomePage || isBlogPage) {
    return (
      <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
        <nav
          aria-label="Primary"
          className="mx-auto flex max-w-6xl items-center justify-center px-6 py-4"
        >
          <Link
            to="/"
            onClick={closeMenus}
            aria-label="Posture Homes"
            className="transition duration-300 hover:opacity-80"
          >
            <PostureHomesLogo />
          </Link>
        </nav>
      </header>
    );
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

        {/* Desktop nav */}
        <ul className="hidden items-center gap-8 md:flex">
          {processedNavigationLinks.map((link) => (
            <li key={link.label}>
              <DesktopNavLink
                link={link}
                dropdownLinks={
                  link.label === "Products" && sectionDropdownLinks
                    ? sectionDropdownLinks
                    : undefined
                }
              />
            </li>
          ))}
        </ul>

        <button
          type="button"
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-menu"
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
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
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="overflow-hidden border-t border-slate-200 bg-white md:hidden"
          >
            <ul className="mx-auto flex max-w-6xl flex-col px-6 py-4">
              {processedNavigationLinks.map((link) => (
                <li key={link.label}>
                  {/* On product pages, "Products" nav link gets an expandable subcategory list */}
                  {link.label === "Products" && sectionDropdownLinks ? (
                    <>
                      <button
                        type="button"
                        onClick={() =>
                          setIsMobileSectionOpen((o) => !o)
                        }
                        className="flex w-full items-center justify-between rounded-2xl px-4 py-3 text-base font-semibold text-slate-700 transition hover:bg-[#f4ecdf]"
                      >
                        Products
                        <ChevronDown
                          className={`h-4 w-4 transition-transform duration-200 ${isMobileSectionOpen ? "rotate-180" : ""}`}
                        />
                      </button>
                      <AnimatePresence initial={false}>
                        {isMobileSectionOpen && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.18, ease: "easeOut" }}
                            className="overflow-hidden"
                          >
                            <div className="pb-2 pl-4">
                              {sectionDropdownLinks.map((item) => (
                                <Link
                                  key={item.slug}
                                  to={item.href}
                                  onClick={closeMenus}
                                  className="flex items-center justify-between rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-[#f4ecdf]"
                                >
                                  <span>{item.label}</span>
                                  <span className="text-xs text-slate-400">{item.itemCount}</span>
                                </Link>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    renderNavigationLink(
                      link,
                      "block rounded-2xl px-4 py-3 text-base font-semibold text-slate-700 transition duration-300 hover:bg-[#f4ecdf] hover:text-slate-900",
                      closeMenus
                    )
                  )}
                </li>
              ))}

              {shouldShowProductsDropdown ? (
                <li className="border-t border-slate-200 pt-3">
                  <button
                    type="button"
                    aria-expanded={isProductsOpen}
                    onClick={() => setIsProductsOpen((open) => !open)}
                    className="flex w-full items-center justify-between rounded-2xl px-4 py-3 text-base font-semibold text-slate-700 transition duration-300 hover:bg-[#f4ecdf] hover:text-slate-900"
                  >
                    Products
                    <ChevronDown
                      className={`h-4 w-4 transition duration-300 ${isProductsOpen ? "rotate-180" : ""}`}
                    />
                  </button>

                  <AnimatePresence initial={false}>
                    {isProductsOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="overflow-hidden"
                      >
                        <div className="pb-2 pl-4">
                          {productDropdownLinks.map((item) => (
                            <Link
                              key={item.href}
                              to={item.href}
                              onClick={closeMenus}
                              className="block rounded-xl px-4 py-3 text-sm font-semibold text-slate-600 transition duration-300 hover:bg-[#f4ecdf] hover:text-slate-900"
                            >
                              {item.label}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              ) : null}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Navbar;
