import { useState } from 'react'
import { Link, Navigate, useParams, useSearchParams } from 'react-router'
import {
  LuChevronLeft as ChevronLeft,
  LuChevronRight as ChevronRight,
  LuX as X,
} from 'react-icons/lu'
import ImageWithLoader from '../components/ImageWithLoader'
import Seo from '../components/Seo'
import SectionReveal from '../components/SectionReveal'
import ContactForm from '../components/ContactForm'
import { getItem, getCategory, sectionFromCategorySlug } from '../data/productsData'

function formatPrice(price: number | null): string {
  if (price === null) return 'Price on request'
  return `₹${price.toLocaleString('en-IN')}`
}

function encodeImagePath(path: string): string {
  return encodeURI(path)
}

function ImageGallery({ images, name }: { images: string[]; name: string }) {
  const [activeIndex, setActiveIndex] = useState(0)

  const prev = () => setActiveIndex((i) => (i === 0 ? images.length - 1 : i - 1))
  const next = () => setActiveIndex((i) => (i === images.length - 1 ? 0 : i + 1))

  return (
    <div className="space-y-3">
      {/* Main image */}
      <div className="relative aspect-[5/3] overflow-hidden rounded-[1.5rem] border border-stone-100 bg-white">
        <ImageWithLoader
          src={encodeImagePath(images[activeIndex] ?? '')}
          alt={`${name} - view ${activeIndex + 1}`}
          wrapperClassName="h-full w-full"
          className="h-full w-full object-contain p-2 sm:p-3"
        />
        {images.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-3 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-slate-800 shadow backdrop-blur-sm transition hover:bg-white"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={next}
              className="absolute right-3 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-slate-800 shadow backdrop-blur-sm transition hover:bg-white"
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
              className={`h-16 w-20 flex-shrink-0 overflow-hidden rounded-xl border-2 bg-white transition ${
                i === activeIndex ? 'border-slate-900' : 'border-transparent'
              }`}
              aria-label={`View image ${i + 1}`}
            >
              <ImageWithLoader
                src={encodeImagePath(img)}
                alt=""
                aria-hidden="true"
                wrapperClassName="h-full w-full"
                spinnerClassName="h-4 w-4 text-slate-300"
                className="h-full w-full object-contain p-1"
                loading="lazy"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

function EnquiryModal({
  itemName,
  categoryLabel,
  quantity,
  onClose,
}: {
  itemName: string
  categoryLabel: string
  quantity: number
  onClose: () => void
}) {
  const defaultMessage = `Hi, I'm interested in the following product:\n\nProduct: ${itemName}\nCategory: ${categoryLabel}\nQuantity: ${quantity}\n\nPlease share availability and pricing details.`

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center p-4">
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="relative z-10 w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-t-3xl sm:rounded-3xl bg-white shadow-2xl">
        <div className="sticky top-0 flex items-center justify-between border-b border-stone-100 bg-white px-6 py-4 rounded-t-3xl sm:rounded-t-3xl">
          <p className="text-sm font-semibold text-slate-900">Send Enquiry</p>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-stone-200 text-slate-500 transition hover:bg-stone-100"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="p-6">
          <ContactForm
            key={`${itemName}-${quantity}`}
            title={`Enquiry: ${itemName}`}
            description="Product and quantity are pre-filled. Add any additional notes below."
            submitLabel="Send Enquiry"
            defaultMessage={defaultMessage}
          />
        </div>
      </div>
    </div>
  )
}

function ProductDetailPage() {
  const { categorySlug, subCategorySlug, itemSlug } = useParams()
  const [searchParams] = useSearchParams()
  const [quantity, setQuantity] = useState(1)
  const [showEnquiry, setShowEnquiry] = useState(false)

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

  // Preserve page/search params when going back
  const backQuery = searchParams.toString()
  const backPath = `/products/${categorySlug}/${subCategorySlug}${backQuery ? `?${backQuery}` : ''}`

  // Related: up to 4 items from same category, excluding current
  const relatedItems = category.items.filter((i) => i.slug !== item.slug).slice(0, 4)

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
        <div className="mx-auto max-w-[92rem] px-6 py-12">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.25fr)_minmax(340px,0.75fr)]">
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

              {/* CTA */}
              <button
                onClick={() => setShowEnquiry(true)}
                className="mt-4 inline-flex items-center justify-center rounded-full bg-slate-900 px-8 py-3.5 text-sm font-semibold text-white transition hover:bg-slate-700"
              >
                Send Enquiry
              </button>
            </div>
          </div>
        </div>
      </SectionReveal>

      {/* Related products */}
      {relatedItems.length > 0 && (
        <SectionReveal className="border-t border-slate-200 bg-white">
          <div className="mx-auto max-w-none px-3 py-14 sm:px-4 lg:px-6">
            <h2 className="text-xl font-semibold text-slate-900">More from {category.label}</h2>
            <div className="mt-8 grid grid-cols-2 gap-x-3 gap-y-12 md:grid-cols-4">
              {relatedItems.map((related) => (
                <Link
                  key={`${related.slug}-${related.images[0] ?? related.name}`}
                  to={`/products/${categorySlug}/${subCategorySlug}/${related.slug}`}
                  className="group block text-center"
                >
                  <div className="relative flex aspect-square items-center justify-center overflow-hidden bg-white">
                    {related.images[0] ? (
                      <ImageWithLoader
                        src={encodeImagePath(related.images[0])}
                        alt={related.name}
                        loading="lazy"
                        wrapperClassName="h-full w-full"
                        spinnerClassName="h-6 w-6 text-slate-300"
                        className="h-full w-full object-contain p-2 transition duration-500 group-hover:scale-[1.035] sm:p-3"
                      />
                    ) : null}
                  </div>
                  <div className="px-3 pt-5">
                    <p className="truncate text-base font-semibold tracking-wide text-slate-950 transition group-hover:text-amber-800">
                      {related.name}
                    </p>
                    <p
                      className={`mt-2 text-sm tracking-wide ${
                        related.price === null ? 'text-slate-400' : 'text-amber-700'
                      }`}
                    >
                      {formatPrice(related.price)}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </SectionReveal>
      )}

      {/* Enquiry modal */}
      {showEnquiry && (
        <EnquiryModal
          itemName={item.name}
          categoryLabel={category.label}
          quantity={quantity}
          onClose={() => setShowEnquiry(false)}
        />
      )}
    </main>
  )
}

export default ProductDetailPage
