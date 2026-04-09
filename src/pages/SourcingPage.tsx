import {
  ArrowRight,
  BadgeCheck,
  Globe2,
  PackageSearch,
  Ship,
  Truck,
} from 'lucide-react'
import { Link } from 'react-router'
import ContactForm from '../components/ContactForm'
import SectionReveal from '../components/SectionReveal'

const sourcingSteps = [
  {
    title: 'Industry experience',
    description:
      'Over 70 years of industry experience, including 30 years specifically focused on importing from China and navigating Chinese manufacturing.',
    icon: PackageSearch,
  },
  {
    title: 'Sourcing expertise',
    description:
      'Practical guidance through the full sourcing process, helping teams navigate challenges and keep project execution smooth.',
    icon: Globe2,
  },
  {
    title: 'Quality assurance',
    description:
      'Factory vetting, complete compliance documentation, regular status updates, and on-site quality checks before shipment.',
    icon: BadgeCheck,
  },
  {
    title: 'Service delivery',
    description:
      'Last-mile delivery, installation, damage resolution, and project management support designed to exceed expectations.',
    icon: Ship,
  },
] as const

const efficiencyPoints = [
  'Streamlined processes refined over decades of industry experience.',
  'Technically advanced systems that support smoother operations.',
  'Punctual delivery that helps keep projects on schedule.',
  'Proven methods that bring efficiency and reliability to every project.',
] as const

const sourcingGalleryCategories = [
  {
    title: 'Sofas',
    files: [
      'sofa01.jpg',
      'sofa02.jpg',
      'sofa03.jpg',
      'sofa04.jpg',
      'sofa05.jpg',
      'sofa06.jpg',
      'sofa07.jpg',
      'sofa08.jpg',
      'sofa09.jpg',
      'sofa10.jpg',
      'sofa11.jpg',
      'sofa13.jpg',
      'sofa14.jpg',
      'sofa15.jpg',
      'sofa16.jpg',
      'sofa17.jpg',
      'sofa19.jpg',
    ],
  },
  {
    title: 'Beds',
    files: ['bed01.jpg', 'bed02.jpg', 'bed03.jpg', 'Kids-bed.jpg'],
  },
  {
    title: 'Dining',
    files: ['dinnig01.jpg', 'dinning02.jpg', 'dinning03.jpg'],
  },
  {
    title: 'Center Tables',
    files: ['center-table.jpg', 'center-table01.jpg', 'center-table03.jpg'],
  },
  {
    title: 'Art',
    files: ['art01.jpg', 'art02.jpg', 'art03.jpg', 'art04.jpg'],
  },
  {
    title: 'Wall Decor',
    files: ['wall01.jpg'],
  },
] as const

function SourcingPage() {
  return (
    <main className="bg-[#fafafa]">
      <section
        className="relative overflow-hidden border-b border-slate-200 bg-slate-950"
        style={{
          backgroundImage:
            "linear-gradient(90deg, rgba(15, 23, 42, 0.78) 0%, rgba(15, 23, 42, 0.56) 42%, rgba(15, 23, 42, 0.34) 100%), url('/china-background.jpg')",
          backgroundPosition: 'center',
          backgroundSize: 'cover',
        }}
      >
        <div className="mx-auto max-w-6xl px-6 py-16 lg:py-20">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-white/72 transition hover:text-white"
          >
            <ArrowRight className="h-4 w-4 rotate-180" />
            Back to home
          </Link>
          <p className="mt-8 text-sm font-medium uppercase tracking-[0.24em] text-amber-200/90">
            Sourcing
          </p>
          <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Premier interior sourcing solutions from China.
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-8 text-white/82 sm:text-lg">
            Complete sourcing for every interior need, from aluminum windows
            and bath fittings to furniture, kitchens, and wardrobes. Built for
            design teams that need clarity, reliability, and execution support.
          </p>
        </div>
      </section>

      <SectionReveal
        id="process"
        className="border-b border-slate-200 bg-[#fafafa]"
      >
        <div className="mx-auto max-w-6xl px-6 py-16">
          <header className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-amber-700">
              Why partner with us
            </p>
            <h2 className="mt-4 text-3xl leading-tight text-slate-950 sm:text-4xl">
              Experience, sourcing depth, and quality control at every stage.
            </h2>
            <p className="mt-4 text-base leading-8 text-slate-600">
              The sourcing model combines long-standing industry knowledge with
              structured project support for Chinese imports and manufacturing.
            </p>
          </header>

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

      <SectionReveal
        id="support"
        className="border-b border-slate-200 bg-slate-50/60"
      >
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-amber-700">
                Complete sourcing
              </p>
              <h2 className="text-2xl font-semibold text-slate-900">
                One-stop interior sourcing for products, execution, and support.
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-8 text-slate-600">
                The sourcing scope extends across furniture, kitchens,
                wardrobes, aluminum windows, bath fittings, and other
                interior-led requirements that need centralized coordination.
              </p>
              <p className="mt-4 max-w-2xl text-base leading-8 text-slate-600">
                Service delivery includes project management from selection to
                installation, budget-conscious solutions, last-mile delivery,
                installation support, and damage resolution.
              </p>
            </div>

            <div className="rounded-[2rem] border border-stone-200 bg-white p-7 shadow-[0_24px_60px_-46px_rgba(15,23,42,0.25)]">
              <div className="flex items-center gap-3 text-slate-900">
                <Truck className="h-5 w-5" />
                <h3 className="text-xl font-semibold">
                  Bringing efficiency to every project
                </h3>
              </div>
              <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-600">
                {efficiencyPoints.map((point) => (
                  <li key={point} className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-700" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
              <a
                href="#contact"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition duration-300 hover:bg-slate-800"
              >
                Contact us
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </SectionReveal>

      <section
        id="gallery"
        className="scroll-mt-28 border-b border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8f5ef_100%)]"
      >
        <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
          <header className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-amber-700">
              Gallery
            </p>
            <h2 className="mt-4 text-3xl leading-tight text-slate-950 sm:text-4xl">
              Browse the sourcing collection by furniture category.
            </h2>
            <p className="mt-4 text-base leading-8 text-slate-600">
              The gallery below groups the images you added into practical
              sourcing categories so visitors can scan the collection more
              easily.
            </p>
          </header>

          <div className="mt-12 space-y-12">
            {sourcingGalleryCategories.map((category) => (
              <section key={category.title}>
                <div className="flex items-end justify-between gap-4 border-b border-stone-200 pb-4">
                  <div>
                    <h3 className="text-2xl text-slate-950">{category.title}</h3>
                    <p className="mt-2 text-sm text-slate-500">
                      {category.files.length} image
                      {category.files.length > 1 ? 's' : ''}
                    </p>
                  </div>
                </div>

                <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                  {category.files.map((file) => (
                    <a
                      key={file}
                      href={`/sourcing-gallery/${file}`}
                      target="_blank"
                      rel="noreferrer"
                      className="group overflow-hidden rounded-[1.75rem] border border-stone-200 bg-white shadow-[0_24px_60px_-44px_rgba(15,23,42,0.24)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_28px_80px_-36px_rgba(15,23,42,0.3)]"
                    >
                      <div className="aspect-[4/3] overflow-hidden bg-[#f7f4ee]">
                        <img
                          src={`/sourcing-gallery/${file}`}
                          alt={`${category.title} sourcing reference`}
                          loading="lazy"
                          className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
                        />
                      </div>
                    </a>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </section>

      <SectionReveal
        id="contact"
        className="bg-[#fafafa]"
      >
        <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
          <header className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-amber-700">
              Contact us
            </p>
            <h2 className="mt-4 text-3xl leading-tight text-slate-950 sm:text-4xl">
              Transform your designs into reality with confidence.
            </h2>
            <p className="mt-4 text-base leading-8 text-slate-600">
              Share your sourcing requirement with our team and move forward
              with the reliability of seasoned industry experts focused on
              delivering exceptional results.
            </p>
          </header>

          <div className="mt-10">
            <ContactForm />
          </div>
        </div>
      </SectionReveal>
    </main>
  )
}

export default SourcingPage
