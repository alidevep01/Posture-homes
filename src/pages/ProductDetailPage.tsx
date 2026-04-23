import { useState } from 'react'
import { Link, Navigate, useParams } from 'react-router'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Seo from '../components/Seo'
import SectionReveal from '../components/SectionReveal'
import ContactForm from '../components/ContactForm'
import { getItem, getCategory, sectionFromCategorySlug } from '../data/productsData'

function formatPrice(price: number | null): string {
  if (price === null) return 'Price on request'
  return `₹${price.toLocaleString('en-IN')}`
}

function encodeImagePath(path: string): string {
  return path
    .split('/')
    .map((segment, i) => (i === 0 ? segment : encodeURIComponent(segment)))
    .join('/')
}

function ImageGallery({ images, name }: { images: string[]; name: string }) {
  const [activeIndex, setActiveIndex] = useState(0)

  const prev = () => setActiveIndex((i) => (i === 0 ? images.length - 1 : i - 1))
  const next = () => setActiveIndex((i) => (i === images.length - 1 ? 0 : i + 1))

  return (
    <div className="space-y-3">
      {/* Main image */}
      <div className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem] border border-stone-100 bg-white">
        <img
          src={encodeImagePath(images[activeIndex] ?? '')}
          alt={`${name} - view ${activeIndex + 1}`}
          className="h-full w-full object-contain p-6"
        />
        {images.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-3 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/85 text-slate-800 shadow backdrop-blur-sm transition hover:bg-white"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={next}
              className="absolute right-3 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/85 text-slate-800 shadow backdrop-blur-sm transition hover:bg-white"
              aria-label="Next image"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
            <span className="absolute bottom-3 right-4 rounded-full bg-black/50 px-2 py-0.5 text-xs text-white">
              {activeIndex + 1} / {images.length}
            </span>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`h-16 w-20 flex-shrink-0 overflow-hidden rounded-xl border-2 transition ${
                i === activeIndex ? 'border-slate-900' : 'border-transparent'
              }`}
              aria-label={`View image ${i + 1}`}
            >
              <img
                src={encodeImagePath(img)}
                alt=""
                aria-hidden="true"
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

function ProductDetailPage() {
  const { categorySlug, subCategorySlug, itemSlug } = useParams()
  const [quantity, setQuantity] = useState(1)

  const section = sectionFromCategorySlug(categorySlug ?? '')
  const category =
    section && subCategorySlug ? getCategory(section, subCategorySlug) : undefined
  const item =
    section && subCategorySlug && itemSlug
      ? getItem(section, subCategorySlug, itemSlug)
      : undefined

  if (!section || !category || !item) {
    return <Navigate to="/" replace />
  }

  const backPath = `/products/${categorySlug}/${subCategorySlug}`

  const defaultMessage = `Hi, I'm interested in the following product:\n\nProduct: ${item.name}\nCategory: ${category.label}\nQuantity: ${quantity}\n\nPlease share availability and pricing details.`

  return (
    <main className="bg-[#fafafa]">
      <Seo
        title={`${item.name} | ${category.label} | Posture India`}
        description={
          item.description ||
          `${item.name} — part of our ${category.label.toLowerCase()} collection. Premium quality furniture in Hyderabad.`
        }
        canonicalPath={`/products/${categorySlug}/${subCategorySlug}/${itemSlug}`}
        image={item.images[0]}
        imageAlt={item.name}
      />

      {/* Breadcrumb */}
      <div className="border-b border-slate-200 bg-white px-6 py-4">
        <div className="mx-auto max-w-6xl">
          <nav className="flex items-center gap-2 text-sm text-slate-500">
            <Link
              to={`/products/${categorySlug}`}
              className="transition hover:text-slate-900"
            >
              {categorySlug === 'home-furniture' ? 'Home Furniture' : 'Office Furniture'}
            </Link>
            <ChevronRight className="h-3.5 w-3.5 text-slate-300" />
            <Link to={backPath} className="transition hover:text-slate-900">
              {category.label}
            </Link>
            <ChevronRight className="h-3.5 w-3.5 text-slate-300" />
            <span className="text-slate-900">{item.name}</span>
          </nav>
        </div>
      </div>

      {/* Product detail */}
      <SectionReveal>
        <div className="mx-auto max-w-6xl px-6 py-12">
          <div className="grid gap-10 lg:grid-cols-2">
            {/* Gallery */}
            <div>
              {item.images.length > 0 ? (
                <ImageGallery images={item.images} name={item.name} />
              ) : (
                <div className="flex aspect-[4/3] items-center justify-center rounded-[1.5rem] bg-stone-100 text-slate-400">
                  No images available
                </div>
              )}
            </div>

            {/* Info */}
            <div className="flex flex-col">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-amber-700">
                {category.label}
              </p>
              <h1 className="mt-3 text-3xl font-semibold leading-tight text-slate-900 sm:text-4xl">
                {item.name}
              </h1>

              {/* Price */}
              <div className="mt-5">
                <p
                  className={`text-2xl font-semibold ${
                    item.price === null ? 'text-slate-500' : 'text-slate-900'
                  }`}
                >
                  {formatPrice(item.price)}
                </p>
                {item.price !== null && (
                  <p className="mt-1 text-xs text-slate-500">Exclusive of taxes and delivery</p>
                )}
              </div>

              {/* Colors */}
              {item.colors.length > 0 && (
                <div className="mt-6">
                  <p className="mb-2 text-sm font-medium text-slate-700">Available colors</p>
                  <div className="flex flex-wrap gap-2">
                    {item.colors.map((color) => (
                      <span
                        key={color}
                        className="rounded-full border border-stone-200 bg-white px-3 py-1 text-sm text-slate-700"
                      >
                        {color}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Description */}
              {item.description && (
                <div className="mt-6">
                  <p className="text-sm leading-7 text-slate-600">{item.description}</p>
                </div>
              )}

              {/* Quantity */}
              <div className="mt-8">
                <label
                  htmlFor="quantity"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Quantity
                </label>
                <select
                  id="quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-slate-900"
                >
                  {Array.from({ length: 20 }, (_, i) => i + 1).map((q) => (
                    <option key={q} value={q}>
                      {q}
                    </option>
                  ))}
                </select>
              </div>

              {/* Response time badge */}
              <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm text-emerald-700">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                We respond within 12 hours
              </div>

              {/* CTA anchor */}
              <a
                href="#enquiry"
                className="mt-4 inline-flex items-center justify-center rounded-full bg-slate-900 px-8 py-3.5 text-sm font-semibold text-white transition hover:bg-slate-700"
              >
                Send Enquiry
              </a>
            </div>
          </div>
        </div>
      </SectionReveal>

      {/* Enquiry form */}
      <SectionReveal id="enquiry" className="border-t border-slate-200">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <header className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-amber-700">
              Enquire now
            </p>
            <h2 className="mt-4 text-3xl font-semibold leading-tight text-slate-950">
              Interested in {item.name}?
            </h2>
            <p className="mt-3 text-base leading-7 text-slate-600">
              Send us your requirements and we'll get back to you within 12 hours with
              availability, pricing, and next steps.
            </p>
          </header>
          <div className="mt-8">
            <ContactForm
              title={`Enquiry: ${item.name}`}
              description={`Quantity and product details are pre-filled. Add any additional notes or questions below.`}
              submitLabel="Send Enquiry"
              defaultMessage={defaultMessage}
            />
          </div>
        </div>
      </SectionReveal>
    </main>
  )
}

export default ProductDetailPage
