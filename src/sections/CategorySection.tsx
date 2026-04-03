const categories = [
  {
    title: 'Living Room',
    type: 'Relaxed essentials',
    description:
      'Explore sofas, accent chairs, coffee tables, and storage for your main gathering space.',
  },
  {
    title: 'Bedroom',
    type: 'Restful comfort',
    description:
      'Build restful rooms with beds, side tables, wardrobes, and soft supporting pieces.',
  },
  {
    title: 'Dining',
    type: 'Shared moments',
    description:
      'Find dining tables, chairs, and storage pieces that support everyday meals and hosting.',
  },
  {
    title: 'Workspace',
    type: 'Focused productivity',
    description:
      'Create functional work areas with desks, ergonomic seating, and organized storage.',
  },
]

function CategorySection() {
  return (
    <section id="categories" className="border-b border-slate-200 bg-white">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <header className="max-w-2xl">
          <h2 className="text-2xl font-semibold text-slate-900">
            Shop by category
          </h2>
          <p className="mt-3 text-slate-600">
            Start with the room you want to refine first.
          </p>
        </header>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <article
              key={category.title}
              className="rounded-2xl border border-slate-200 p-6"
            >
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">
                {category.type}
              </p>
              <h3 className="mt-3 text-lg font-medium text-slate-900">
                {category.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                {category.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CategorySection
