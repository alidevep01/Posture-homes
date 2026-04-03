import { motion } from 'framer-motion'

function HeroSection() {
  return (
    <section
      id="home"
      className="border-b border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8f6f1_100%)]"
    >
      <div className="mx-auto grid max-w-6xl gap-14 px-6 py-20 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:py-24">
        <motion.div
          initial={{ opacity: 0, x: -32 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.65, ease: 'easeOut' }}
        >
          <p className="text-sm font-medium uppercase tracking-[0.24em] text-slate-500">
            Global sourcing for premium spaces
          </p>
          <h1 className="mt-5 max-w-3xl text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
            Premium Furniture Sourcing from China
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
            We help you source high-quality office and home furniture at
            factory prices.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <motion.a
              href="#contact"
              whileHover={{ y: -2, scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="inline-flex items-center justify-center rounded-full bg-slate-900 px-6 py-3 text-sm font-medium text-white transition duration-300 hover:bg-slate-700"
            >
              Get Free Consultation
            </motion.a>
            <motion.a
              href="#products"
              whileHover={{ y: -2, scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-medium text-slate-900 transition duration-300 hover:border-slate-900"
            >
              Explore Products
            </motion.a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 32 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.65, delay: 0.12, ease: 'easeOut' }}
          className="relative"
        >
          <div className="absolute -left-4 -top-4 h-28 w-28 rounded-full bg-stone-200/70 blur-2xl" />
          <div className="absolute -bottom-8 -right-4 h-32 w-32 rounded-full bg-amber-100/70 blur-2xl" />
          <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-5 shadow-[0_24px_60px_-30px_rgba(15,23,42,0.35)]">
            <div
              role="img"
              aria-label="Furniture sourcing visual placeholder"
              className="aspect-[4/5] rounded-[1.5rem] bg-[linear-gradient(160deg,#d6c7b2_0%,#f7f2ea_45%,#efe7da_100%)] p-6"
            >
              <div className="flex h-full flex-col justify-between rounded-[1.25rem] border border-white/60 bg-white/40 p-6 backdrop-blur-sm">
                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.24em] text-slate-500">
                    Image Placeholder
                  </p>
                  <h2 className="mt-4 max-w-xs text-2xl font-semibold tracking-tight text-slate-900">
                    Curated collections for office and home projects.
                  </h2>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-2xl bg-white/70 p-4">
                    <p className="text-xs uppercase tracking-[0.18em] text-slate-500">
                      Home
                    </p>
                    <p className="mt-2 text-sm font-medium text-slate-900">
                      Sofas, beds, dining
                    </p>
                  </div>
                  <div className="rounded-2xl bg-white/70 p-4">
                    <p className="text-xs uppercase tracking-[0.18em] text-slate-500">
                      Office
                    </p>
                    <p className="mt-2 text-sm font-medium text-slate-900">
                      Desks, chairs, storage
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default HeroSection
