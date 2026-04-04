import { useMemo } from 'react'
import { Link, Navigate, useParams } from 'react-router'
import { ArrowRight, BadgeCheck, PackageCheck, Sofa, Truck } from 'lucide-react'
import SectionReveal from '../components/SectionReveal'
import { productCategories } from '../utils/productCategories'

function ProductCategoryPage() {
  const { categorySlug } = useParams()

  const category = useMemo(
    () =>
      productCategories.find(
        (entry) => entry.slug === categorySlug,
      ),
    [categorySlug],
  )

  if (!category) {
    return <Navigate to="/" replace />
  }

  return (
    <main className="bg-white">
      <section className="border-b border-slate-200 bg-[linear-gradient(180deg,#faf8f4_0%,#ffffff_100%)]">
        <div className="mx-auto max-w-6xl px-6 py-16 lg:py-20">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-slate-900"
          >
            <ArrowRight className="h-4 w-4 rotate-180" />
            Back to home
          </Link>
          <p className="mt-8 text-sm font-medium uppercase tracking-[0.24em] text-slate-500">
            {category.label}
          </p>
          <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
            {category.pageTitle}
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-8 text-slate-600 sm:text-lg">
            {category.pageDescription}
          </p>
        </div>
      </section>

      <SectionReveal className="border-b border-slate-200 bg-white">
        <div className="mx-auto grid max-w-6xl gap-6 px-6 py-16 lg:grid-cols-3">
          {category.highlights.map((highlight) => (
            <article
              key={highlight.title}
              className="rounded-[1.75rem] border border-stone-200 bg-[#fbf7f1] p-6 shadow-sm"
            >
              <div
                role="img"
                aria-label={`${highlight.title} preview placeholder`}
                className={`aspect-[4/3] rounded-[1.25rem] bg-gradient-to-br ${highlight.palette}`}
              />
              <h2 className="mt-6 text-xl font-semibold text-slate-900">
                {highlight.title}
              </h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                {highlight.description}
              </p>
            </article>
          ))}
        </div>
      </SectionReveal>

      <SectionReveal className="border-b border-slate-200 bg-slate-50/60">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <h2 className="text-2xl font-semibold text-slate-900">
            What we cover in this category
          </h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {category.coverage.map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-stone-200 bg-[#fbf7f1] px-5 py-4 text-sm font-medium text-slate-700"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </SectionReveal>

      <SectionReveal className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <h2 className="text-2xl font-semibold text-slate-900">
            How we deliver
          </h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <article className="rounded-[1.5rem] border border-stone-200 bg-[#fbf7f1] p-5">
              <Sofa className="h-6 w-6 text-slate-900" />
              <h3 className="mt-4 text-lg font-semibold text-slate-900">
                Category expertise
              </h3>
              <p className="mt-2 text-sm leading-7 text-slate-600">
                We shortlist pieces and suppliers specific to {category.label.toLowerCase()} requirements.
              </p>
            </article>
            <article className="rounded-[1.5rem] border border-stone-200 bg-[#fbf7f1] p-5">
              <BadgeCheck className="h-6 w-6 text-slate-900" />
              <h3 className="mt-4 text-lg font-semibold text-slate-900">
                Verified factories
              </h3>
              <p className="mt-2 text-sm leading-7 text-slate-600">
                We work only with factories that match your quality and finishing expectations.
              </p>
            </article>
            <article className="rounded-[1.5rem] border border-stone-200 bg-[#fbf7f1] p-5">
              <PackageCheck className="h-6 w-6 text-slate-900" />
              <h3 className="mt-4 text-lg font-semibold text-slate-900">
                Quality checks
              </h3>
              <p className="mt-2 text-sm leading-7 text-slate-600">
                Every order is reviewed before dispatch to reduce quality surprises.
              </p>
            </article>
            <article className="rounded-[1.5rem] border border-stone-200 bg-[#fbf7f1] p-5">
              <Truck className="h-6 w-6 text-slate-900" />
              <h3 className="mt-4 text-lg font-semibold text-slate-900">
                Delivery support
              </h3>
              <p className="mt-2 text-sm leading-7 text-slate-600">
                We coordinate sourcing, shipping, and delivery updates through to completion.
              </p>
            </article>
          </div>
        </div>
      </SectionReveal>
    </main>
  )
}

export default ProductCategoryPage
