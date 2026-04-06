import { ArrowRight, BadgeCheck, Globe2, PackageSearch, Ship, Truck } from 'lucide-react'
import { Link } from 'react-router'
import SectionReveal from '../components/SectionReveal'

const sourcingSteps = [
  {
    title: 'Requirement mapping',
    description:
      'We define the furniture scope, quality expectations, materials, timelines, and budget before supplier shortlisting begins.',
    icon: PackageSearch,
  },
  {
    title: 'Supplier coordination',
    description:
      'Factories are shortlisted against category fit, production strength, finishing standards, and commercial viability.',
    icon: Globe2,
  },
  {
    title: 'Quality and dispatch checks',
    description:
      'Orders are reviewed before shipment to reduce quality surprises and improve delivery confidence.',
    icon: BadgeCheck,
  },
  {
    title: 'Shipping support',
    description:
      'We coordinate timelines, shipment progress, and delivery updates through completion.',
    icon: Ship,
  },
] as const

function SourcingPage() {
  return (
    <main className="bg-[#fafafa]">
      <section className="border-b border-slate-200 bg-[linear-gradient(180deg,#f6efe4_0%,#ffffff_100%)]">
        <div className="mx-auto max-w-6xl px-6 py-16 lg:py-20">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-slate-900"
          >
            <ArrowRight className="h-4 w-4 rotate-180" />
            Back to home
          </Link>
          <p className="mt-8 text-sm font-medium uppercase tracking-[0.24em] text-slate-500">
            Sourcing
          </p>
          <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
            Furniture sourcing support built for clarity, quality, and reliable execution.
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-8 text-slate-600 sm:text-lg">
            Posture supports sourcing-led furniture projects with supplier
            selection, quality reviews, logistics coordination, and delivery
            follow-through for both residential and office requirements.
          </p>
        </div>
      </section>

      <SectionReveal className="border-b border-slate-200 bg-[#fafafa]">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {sourcingSteps.map((step) => {
              const Icon = step.icon

              return (
                <article
                  key={step.title}
                  className="rounded-[1.75rem] border border-stone-200 bg-white p-6 shadow-[0_24px_60px_-46px_rgba(15,23,42,0.25)]"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#f6efe4] text-slate-950">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h2 className="mt-5 text-2xl text-slate-950">{step.title}</h2>
                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    {step.description}
                  </p>
                </article>
              )
            })}
          </div>
        </div>
      </SectionReveal>

      <SectionReveal className="border-b border-slate-200 bg-slate-50/60">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <h2 className="text-2xl font-semibold text-slate-900">
                What we support
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-8 text-slate-600">
                Sourcing support is available for home furniture, office
                furniture, custom requirements, and larger project-led orders
                where supplier vetting and execution discipline matter.
              </p>
            </div>

            <div className="rounded-[2rem] border border-stone-200 bg-white p-7 shadow-[0_24px_60px_-46px_rgba(15,23,42,0.25)]">
              <div className="flex items-center gap-3 text-slate-900">
                <Truck className="h-5 w-5" />
                <h3 className="text-xl font-semibold">Execution focus</h3>
              </div>
              <p className="mt-4 text-sm leading-7 text-slate-600">
                The sourcing workflow is structured to reduce surprises and keep
                every stage visible, from requirement capture to final delivery
                updates.
              </p>
              <a
                href="/#contact"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition duration-300 hover:bg-slate-800"
              >
                Contact us
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </SectionReveal>
    </main>
  )
}

export default SourcingPage
