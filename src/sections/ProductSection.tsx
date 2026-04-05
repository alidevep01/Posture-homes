import SectionReveal from '../components/SectionReveal'

const products = [
  {
    name: 'Cloudline Sofa',
    palette: 'from-stone-200 via-stone-100 to-white',
  },
  {
    name: 'Harbor Bed',
    palette: 'from-neutral-200 via-stone-100 to-white',
  },
  {
    name: 'Aster Lounge Chair',
    palette: 'from-amber-100 via-stone-50 to-white',
  },
  {
    name: 'Foundry Dining Table',
    palette: 'from-slate-200 via-slate-100 to-white',
  },
  {
    name: 'Arc Console',
    palette: 'from-zinc-200 via-stone-100 to-white',
  },
  {
    name: 'Frame Storage Unit',
    palette: 'from-rose-100 via-stone-50 to-white',
  },
]

function ProductSection() {
  return (
    <SectionReveal
      id="products"
      className="border-b border-slate-200 bg-[#fafafa]"
    >
      <div className="mx-auto max-w-6xl px-6 py-16">
        <header className="max-w-2xl">
          <h2 className="text-2xl font-semibold text-slate-900">
            Featured products
          </h2>
          <p className="mt-3 text-slate-600">
            A clean preview of signature pieces across living, dining, bedroom,
            and workspace collections.
          </p>
        </header>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {products.map((product) => (
            <article
              key={product.name}
              className="group overflow-hidden rounded-[1.75rem] border border-stone-200 bg-white shadow-sm transition-shadow duration-300 hover:shadow-[0_24px_60px_-32px_rgba(15,23,42,0.35)]"
            >
              <div className="overflow-hidden">
                <div
                  role="img"
                  aria-label={`${product.name} preview placeholder`}
                  className={`aspect-[4/3] transform-gpu bg-gradient-to-br ${product.palette} p-5 transition duration-500 group-hover:scale-105`}
                >
                  <div className="flex h-full items-end rounded-[1.25rem] border border-white/70 bg-white/35 p-4 backdrop-blur-sm">
                    <div className="w-full rounded-2xl bg-white/80 p-4 shadow-sm">
                      <p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-500">
                        Image Placeholder
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-slate-900">
                  {product.name}
                </h3>
              </div>
            </article>
          ))}
        </div>
      </div>
    </SectionReveal>
  )
}

export default ProductSection
