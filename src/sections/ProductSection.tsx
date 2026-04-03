const products = [
  {
    name: 'Luna Lounge Chair',
    description:
      'Soft curves and supportive comfort for reading corners and living spaces.',
  },
  {
    name: 'Oakline Dining Table',
    description:
      'A natural wood centerpiece designed for daily meals and shared gatherings.',
  },
  {
    name: 'Mod Shelf Unit',
    description:
      'Open storage that keeps books, decor, and essentials visually light and accessible.',
  },
]

function ProductSection() {
  return (
    <section id="products" className="border-b border-slate-200 bg-white">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <header className="max-w-2xl">
          <h2 className="text-2xl font-semibold text-slate-900">
            Featured products
          </h2>
          <p className="mt-3 text-slate-600">
            A simple starter selection for the homepage product grid.
          </p>
        </header>
        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          {products.map((product) => (
            <article
              key={product.name}
              className="rounded-2xl border border-slate-200 p-6"
            >
              <h3 className="text-lg font-medium text-slate-900">
                {product.name}
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                {product.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProductSection
