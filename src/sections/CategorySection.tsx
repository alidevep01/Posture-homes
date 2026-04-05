import { motion } from 'framer-motion'
import SectionReveal from '../components/SectionReveal'

const categories = [
  {
    title: 'Office Furniture',
    description:
      'Desks, seating, storage, and meeting essentials for efficient workspaces.',
    palette: 'from-stone-200 via-stone-100 to-white',
  },
  {
    title: 'Home Furniture',
    description:
      'Living, dining, and bedroom collections designed for elevated everyday living.',
    palette: 'from-amber-100 via-stone-50 to-white',
  },
  {
    title: 'Custom Furniture',
    description:
      'Tailored sourcing for project-specific dimensions, finishes, and large-volume needs.',
    palette: 'from-slate-200 via-slate-100 to-white',
  },
]

function CategorySection() {
  return (
    <SectionReveal
      id="categories"
      className="border-b border-slate-200 bg-[#fafafa]"
    >
      <div className="mx-auto max-w-6xl px-6 py-16">
        <header className="max-w-2xl">
          <h2 className="text-2xl font-semibold text-slate-900">
            Shop by category
          </h2>
          <p className="mt-3 text-slate-600">
            Choose the sourcing path that matches your project requirements.
          </p>
        </header>
        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {categories.map((category, index) => (
            <motion.article
              key={category.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.45, delay: index * 0.08, ease: 'easeOut' }}
              whileHover={{ scale: 1.02, y: -4 }}
                className="overflow-hidden rounded-[1.75rem] border border-stone-200 bg-white shadow-sm transition-shadow hover:shadow-[0_24px_60px_-32px_rgba(15,23,42,0.35)]"
            >
              <div
                role="img"
                aria-label={`${category.title} preview placeholder`}
                className={`aspect-[4/3] transform-gpu bg-gradient-to-br ${category.palette} p-5 transition duration-500`}
              >
                <div className="flex h-full items-end rounded-[1.25rem] border border-white/70 bg-white/40 p-4 backdrop-blur-sm">
                  <div className="w-full rounded-2xl bg-white/80 p-4 shadow-sm">
                    <p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-500">
                      Image Placeholder
                    </p>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-slate-900">
                  {category.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  {category.description}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </SectionReveal>
  )
}

export default CategorySection
