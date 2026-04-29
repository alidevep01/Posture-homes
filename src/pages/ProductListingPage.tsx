import { useMemo } from 'react'
import { Link, Navigate, useParams, useSearchParams } from 'react-router'
import {
  LuChevronLeft as ChevronLeft,
  LuChevronRight as ChevronRight,
  LuSearch as Search,
} from 'react-icons/lu'
import ImageWithLoader from '../components/ImageWithLoader'
import Seo from '../components/Seo'
import SectionReveal from '../components/SectionReveal'
import { getCategory, sectionFromCategorySlug } from '../data/productsData'

const PAGE_SIZE = 12

function formatPrice(price: number | null): string {
  if (price === null) return 'Price on request'
  return `₹${price.toLocaleString('en-IN')}`
}

function encodeImagePath(path: string): string {
  return encodeURI(path)
}

function ProductListingPage() {
  const { categorySlug, subCategorySlug } = useParams()
  const [searchParams, setSearchParams] = useSearchParams()

  const page = Math.max(1, parseInt(searchParams.get('page') ?? '1', 10))
  const query = searchParams.get('q') ?? ''

  const section = sectionFromCategorySlug(categorySlug ?? '')
  const category = section && subCategorySlug ? getCategory(section, subCategorySlug) : undefined

  const filteredItems = useMemo(() => {
    if (!category) return []
    if (!query.trim()) return category.items
    const lower = query.toLowerCase()
    return category.items.filter((item) => item.name.toLowerCase().includes(lower))
  }, [category, query])

  const totalPages = Math.ceil(filteredItems.length / PAGE_SIZE)
  const pageItems = filteredItems.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  function goToPage(p: number) {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev)
      next.set('page', String(p))
      return next
    })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function handleSearch(value: string) {
    setSearchParams(value.trim() ? { q: value } : {})
  }

  if (!section || !category) {
    return <Navigate to="/" replace />
  }

  const backPath = `/products/${categorySlug}`
  const basePath = `/products/${categorySlug}/${subCategorySlug}`

  return (
    <main className="bg-[#fafafa]">
      <Seo
        title={`${category.label} | Posture India`}
        description={`Browse our ${category.label.toLowerCase()} collection. Premium quality furniture for homes and offices in Hyderabad.`}
        canonicalPath={basePath}
      />

      {/* Catalog header */}
      <section className="border-b border-slate-200 bg-white py-10">
        <div className="mx-auto max-w-none px-3 sm:px-4 lg:px-6">
          <nav className="flex flex-wrap items-center gap-2 text-sm tracking-wide text-slate-500">
            <Link to="/" className="transition hover:text-slate-950">
              Home
            </Link>
            <ChevronRight className="h-3.5 w-3.5 text-slate-300" />
            <Link to={backPath} className="transition hover:text-slate-950">
              {categorySlug === 'home-furniture' ? 'Home Furniture' : 'Office Furniture'}
            </Link>
            <ChevronRight className="h-3.5 w-3.5 text-slate-300" />
            <span className="text-slate-950">{category.label}</span>
          </nav>
          <div className="mt-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-amber-700">
                Collection
              </p>
              <h1 className="mt-3 text-4xl font-semibold text-slate-950 sm:text-5xl">
                {category.label}
              </h1>
              <p className="mt-2 text-base text-slate-500">
                {filteredItems.length} item{filteredItems.length !== 1 ? 's' : ''}
                {query && ` matching "${query}"`}
              </p>
            </div>
            <Link
              to={backPath}
              className="inline-flex items-center gap-1 text-sm font-semibold text-slate-600 transition hover:text-slate-950"
            >
              <ChevronLeft className="h-4 w-4" />
              Back to categories
            </Link>
          </div>
        </div>
      </section>

      {/* Search */}
      <div className="border-b border-slate-200 bg-white px-6 py-4">
        <div className="mx-auto max-w-none">
          <div className="relative max-w-sm">
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="search"
              placeholder={`Search ${category.label.toLowerCase()}…`}
              value={query}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full rounded-full border border-slate-200 bg-[#fafafa] py-2.5 pl-10 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-900"
            />
          </div>
        </div>
      </div>

      {/* Grid */}
      <SectionReveal>
        <div className="mx-auto max-w-none px-2 py-8 sm:px-3 lg:px-4">
          {pageItems.length === 0 ? (
            <div className="py-20 text-center text-slate-500">
              No items found{query ? ` for "${query}"` : ''}.
            </div>
          ) : (
            <div className="grid auto-rows-fr grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-4">
              {pageItems.map((item) => (
                <Link
                  key={`${item.slug}-${item.images[0] ?? item.name}`}
                  to={`${basePath}/${item.slug}`}
                  className="group flex h-full flex-col bg-white text-center"
                >
                  <div className="relative flex aspect-[11/12] w-full shrink-0 items-center justify-center overflow-hidden bg-white">
                    {item.images[0] ? (
                      <ImageWithLoader
                        src={encodeImagePath(item.images[0])}
                        alt={item.name}
                        loading="lazy"
                        wrapperClassName="h-full w-full"
                        spinnerClassName="h-6 w-6 text-slate-300"
                        className="h-full w-full object-contain p-0 transition duration-500 group-hover:scale-[1.035]"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-slate-300 text-sm">
                        No image
                      </div>
                    )}
                  </div>
                  <div className="flex min-h-[86px] flex-col items-center px-2 pt-3">
                    <h2 className="line-clamp-2 max-w-full text-base font-semibold leading-snug tracking-wide text-slate-950 transition group-hover:text-amber-800">
                      {item.name}
                    </h2>
                    <p
                      className={`mt-2 text-sm tracking-wide ${
                        item.price === null ? 'text-slate-400' : 'text-amber-700'
                      }`}
                    >
                      {formatPrice(item.price)}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-12 flex items-center justify-center gap-2 flex-wrap">
              <button
                onClick={() => goToPage(page - 1)}
                disabled={page === 1}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-stone-200 bg-white text-slate-700 transition hover:border-slate-900 disabled:cursor-not-allowed disabled:opacity-40"
                aria-label="Previous page"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => goToPage(p)}
                  className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-medium transition ${
                    p === page
                      ? 'bg-slate-900 text-white'
                      : 'border border-stone-200 bg-white text-slate-700 hover:border-slate-900'
                  }`}
                >
                  {p}
                </button>
              ))}

              <button
                onClick={() => goToPage(page + 1)}
                disabled={page === totalPages}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-stone-200 bg-white text-slate-700 transition hover:border-slate-900 disabled:cursor-not-allowed disabled:opacity-40"
                aria-label="Next page"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      </SectionReveal>
    </main>
  )
}

export default ProductListingPage
