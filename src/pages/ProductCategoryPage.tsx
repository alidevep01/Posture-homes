import { useMemo } from 'react'
import { Link, Navigate, useParams } from 'react-router'
import {
  ArrowRight,
  BadgeCheck,
  PackageCheck,
  Sofa,
  Truck,
} from 'lucide-react'
import SectionReveal from '../components/SectionReveal'
import ContactForm from '../components/ContactForm'
import ProcessSection from '../sections/ProcessSection'
import ProjectsSection from '../sections/ProjectsSection'
import TestimonialsSection from '../sections/TestimonialsSection'
import { productCategories } from '../utils/productCategories'

type ProductCategory = (typeof productCategories)[number]
type ProductCategorySlug = ProductCategory['slug']

const categoryHeroImages: Record<ProductCategorySlug, string> = {
  'home-furniture': '/home-background-1.jpg',
  'office-furniture': '/office-background-1.jpg',
}

const officeProjectCategories = [
  {
    title: 'Executive Cabins',
    description:
      'Executive desks, premium storage, and leadership seating designed for high-function private workspaces.',
    image: '/office-furniture1.jpg',
  },
  {
    title: 'Workstations',
    description:
      'Open office workstation layouts that support team productivity, movement, and daily utility.',
    image: '/office-furniture2.jpg',
  },
  {
    title: 'Conference Rooms',
    description:
      'Conference tables, meeting chairs, and collaboration setups for formal discussions and client-facing spaces.',
    image: '/office-furniture4.jpg',
  },
  {
    title: 'Reception Areas',
    description:
      'Reception desks, waiting lounge seating, and front-of-house furniture that define first impressions.',
    image: '/office-furniture5.jpg',
  },
  {
    title: 'Breakout and Cafeteria',
    description:
      'Loose furniture for cafeteria zones, breakout corners, and informal interaction spaces inside the workplace.',
    image: '/office-furniture.jpg',
  },
  {
    title: 'Custom Office Solutions',
    description:
      'Project-led sourcing support for custom dimensions, finish selections, and office-specific furniture requirements.',
    image: '/custom-furniture1.jpg',
  },
] as const

const officeClienteleLogos = [
  'sattva.png',
  'apple.png',
  'servicenow.png',
  'hyundai.png',
  'chubb.png',
  'phonepe.svg',
  'polycab.png',
  'curia.png',
  'citizens-specialty-hospital.png',
  'msn-labs.png',
  'hitex-hyderabad.png',
  'CBIT-LOGO.png',
  'isb.png',
  'care-health-insurance.png',
  'divis-laboratories.svg',
  'lawrence-and-mayo.png',
  'devx.svg',
  'concrete-infra.png',
  'code-astra.png',
  'panzer-technologies.png',
  'muzigal.svg',
  'nest-makers.svg',
  'oremus.png',
  'proclink.png',
  'samashti-international-school.png',
  'aakruthi-hospitals.jpg',
  'elegans-group.svg',
  'futura.jpg',
  'hetero.png',
  'jito-hyderabad.jpg',
  'mirrors-luxury-salons.png',
  'cokarma.png',
  'shubha-fertility.jpg',
  'sln-projects.jpg',
  'us-consulate-general-hyderabad.svg',
  'vinati-jewellers.jpg',
] as const

type ClienteleLogoFile = (typeof officeClienteleLogos)[number]

const clienteleLogoDisplay: Partial<
  Record<
    ClienteleLogoFile,
    {
      label?: string
      cardClassName?: string
      imageClassName?: string
    }
  >
> = {
  'apple.png': {
    label: 'Apple',
    imageClassName: 'max-h-16',
  },
  'aakruthi-hospitals.jpg': {
    label: 'Aakruthi Hospitals',
    imageClassName: 'max-h-16',
  },
  'care-health-insurance.png': {
    label: 'Care Health Insurance',
    imageClassName: 'max-h-14',
  },
  'CBIT-LOGO.png': {
    label: 'Chaitanya Bharathi Institute of Technology',
    imageClassName: 'max-h-14',
  },
  'chubb.png': {
    label: 'Chubb',
    imageClassName: 'max-h-12',
  },
  'citizens-specialty-hospital.png': {
    label: 'Citizens Specialty Hospital',
    imageClassName: 'max-h-14',
  },
  'cokarma.png': {
    label: 'CoKarma',
    imageClassName: 'max-h-14',
  },
  'code-astra.png': {
    label: 'Code Astra',
    cardClassName: 'border-slate-800 bg-slate-900',
    imageClassName: 'max-h-10 brightness-110 contrast-125',
  },
  'concrete-infra.png': {
    label: 'Concrete Infra',
    imageClassName: 'max-h-14',
  },
  'curia.png': {
    label: 'Curia',
    imageClassName: 'max-h-14',
  },
  'devx.svg': {
    label: 'DEVX',
    cardClassName: 'border-slate-800 bg-slate-900',
    imageClassName: 'max-h-12',
  },
  'divis-laboratories.svg': {
    label: "Divi's Laboratories",
    imageClassName: 'max-h-14',
  },
  'futura.jpg': {
    label: 'Futura',
    imageClassName: 'max-h-14',
  },
  'hitex-hyderabad.png': {
    label: 'HITEX Hyderabad',
    imageClassName: 'max-h-14',
  },
  'hyundai.png': {
    label: 'Hyundai',
    cardClassName: 'border-slate-800 bg-slate-900',
    imageClassName: 'max-h-12 brightness-110 contrast-125',
  },
  'isb.png': {
    label: 'Indian School of Business',
    imageClassName: 'max-h-16',
  },
  'jito-hyderabad.jpg': {
    label: 'JITO Hyderabad',
    imageClassName: 'max-h-14',
  },
  'lawrence-and-mayo.png': {
    label: 'Lawrence and Mayo',
    imageClassName: 'max-h-14',
  },
  'mirrors-luxury-salons.png': {
    label: 'Mirrors Luxury Salons',
    cardClassName: 'border-zinc-800 bg-zinc-950',
    imageClassName: 'max-h-12 brightness-110',
  },
  'msn-labs.png': {
    label: 'MSN',
    imageClassName: 'max-h-14',
  },
  'phonepe.svg': {
    label: 'PhonePe',
    imageClassName: 'max-h-12',
  },
  'polycab.png': {
    label: 'Polycab',
    imageClassName: 'max-h-12',
  },
  'nest-makers.svg': {
    label: 'Nest Makers',
    imageClassName: 'max-h-12',
  },
  'panzer-technologies.png': {
    label: 'Panzer Technologies',
    imageClassName: 'max-h-14',
  },
  'samashti-international-school.png': {
    label: 'Samashti International School',
    imageClassName: 'max-h-14',
  },
  'sattva.png': {
    label: 'Sattva',
    cardClassName: 'border-slate-800 bg-slate-900',
    imageClassName: 'max-h-14 brightness-125 contrast-125',
  },
  'servicenow.png': {
    label: 'ServiceNow',
    imageClassName: 'max-h-12',
  },
  'shubha-fertility.jpg': {
    label: 'Shubha Fertility',
    imageClassName: 'max-h-14',
  },
  'us-consulate-general-hyderabad.svg': {
    label: 'U.S. Consulate General Hyderabad',
    imageClassName: 'max-h-16',
  },
  'vinati-jewellers.jpg': {
    label: 'Vinati Jewellers',
    imageClassName: 'max-h-14',
  },
}

function CategoryProductsSection({
  title = 'Products',
  description,
  category,
}: {
  title?: string
  description?: string
  category: (typeof productCategories)[number]
}) {
  return (
    <SectionReveal
      id="products"
      className="border-b border-slate-200 bg-[#fafafa]"
    >
      <div className="mx-auto max-w-6xl px-6 py-16">
        <header className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-amber-700">
            {title}
          </p>
          {description ? (
            <p className="mt-4 text-base leading-8 text-slate-600">
              {description}
            </p>
          ) : null}
        </header>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {category.highlights.map((highlight) => (
            <article
              key={highlight.title}
              className="rounded-[1.75rem] border border-stone-200 bg-white p-6 shadow-sm"
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
      </div>
    </SectionReveal>
  )
}

function OfficeProjectsSection() {
  return (
    <SectionReveal
      id="projects"
      className="border-b border-slate-200 bg-[#fafafa]"
    >
      <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
        <header className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-amber-700">
            Projects
          </p>
          <h2 className="mt-4 text-3xl leading-tight text-slate-950 sm:text-4xl">
            Office environments we build through category-led sourcing.
          </h2>
          <p className="mt-4 text-base leading-8 text-slate-600">
            From executive rooms to collaborative work areas, these are the key
            project categories we support for modern office interiors.
          </p>
        </header>

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {officeProjectCategories.map((project) => (
            <article
              key={project.title}
              className="group overflow-hidden rounded-[1.9rem] border border-stone-200 bg-white shadow-[0_24px_60px_-40px_rgba(15,23,42,0.25)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_30px_80px_-36px_rgba(15,23,42,0.32)]"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/55 via-slate-950/8 to-transparent" />
              </div>

              <div className="p-6">
                <h3 className="text-2xl leading-tight text-slate-950">
                  {project.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  {project.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </SectionReveal>
  )
}

function ClienteleSection() {
  return (
    <SectionReveal
      id="clientele"
      className="border-b border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#fcfaf7_100%)]"
    >
      <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
        <header className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-amber-700">
            Clientele
          </p>
          <h2 className="mt-4 text-3xl leading-tight text-slate-950 sm:text-4xl">
            Brands and institutions that reflect the scale of office projects we support.
          </h2>
          <p className="mt-4 text-base leading-8 text-slate-600">
            A snapshot of the companies and organizations represented in our
            office furniture clientele.
          </p>
        </header>

        <div className="mt-12 rounded-[2rem] border border-stone-200 bg-white p-6 shadow-[0_24px_60px_-45px_rgba(15,23,42,0.22)] sm:p-8">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {officeClienteleLogos.map((logo) => (
              (() => {
                const logoDisplay = clienteleLogoDisplay[logo]
                const cardClassName = [
                  'flex min-h-28 items-center justify-center rounded-[1.5rem] border p-5 shadow-sm transition duration-300 hover:-translate-y-0.5',
                  logoDisplay?.cardClassName ?? 'border-stone-200 bg-[#fcfbf8]',
                ].join(' ')
                const imageClassName = [
                  'h-auto w-auto max-w-full object-contain drop-shadow-[0_2px_6px_rgba(15,23,42,0.08)]',
                  logoDisplay?.imageClassName ?? 'max-h-14',
                ].join(' ')
                const alt =
                  logoDisplay?.label ??
                  logo.replace(/\.[^.]+$/, '').replace(/[-_]/g, ' ')

                return (
                  <div
                    key={logo}
                    className={cardClassName}
                  >
                    <img
                      src={`/clientele/${logo}`}
                      alt={alt}
                      loading="lazy"
                      className={imageClassName}
                    />
                  </div>
                )
              })()
            ))}
          </div>
        </div>
      </div>
    </SectionReveal>
  )
}

function CategoryCoverageSection({
  category,
}: {
  category: (typeof productCategories)[number]
}) {
  return (
    <SectionReveal className="border-b border-slate-200 bg-slate-50/60">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="text-2xl font-semibold text-slate-900">
          What we cover in this category
        </h2>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {category.coverage.map((item) => (
            <div
              key={item}
              className="rounded-2xl border border-stone-200 bg-white px-5 py-4 text-sm font-medium text-slate-700"
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </SectionReveal>
  )
}

function DeliverySection({
  category,
}: {
  category: (typeof productCategories)[number]
}) {
  return (
    <SectionReveal className="border-b border-slate-200 bg-[#fafafa]">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="text-2xl font-semibold text-slate-900">
          How we deliver
        </h2>
        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <article className="rounded-[1.5rem] border border-stone-200 bg-white p-5">
            <Sofa className="h-6 w-6 text-slate-900" />
            <h3 className="mt-4 text-lg font-semibold text-slate-900">
              Category expertise
            </h3>
            <p className="mt-2 text-sm leading-7 text-slate-600">
              We shortlist pieces and suppliers specific to{' '}
              {category.label.toLowerCase()} requirements.
            </p>
          </article>
          <article className="rounded-[1.5rem] border border-stone-200 bg-white p-5">
            <BadgeCheck className="h-6 w-6 text-slate-900" />
            <h3 className="mt-4 text-lg font-semibold text-slate-900">
              Verified factories
            </h3>
            <p className="mt-2 text-sm leading-7 text-slate-600">
              We work only with factories that match your quality and finishing
              expectations.
            </p>
          </article>
          <article className="rounded-[1.5rem] border border-stone-200 bg-white p-5">
            <PackageCheck className="h-6 w-6 text-slate-900" />
            <h3 className="mt-4 text-lg font-semibold text-slate-900">
              Quality checks
            </h3>
            <p className="mt-2 text-sm leading-7 text-slate-600">
              Every order is reviewed before dispatch to reduce quality
              surprises.
            </p>
          </article>
          <article className="rounded-[1.5rem] border border-stone-200 bg-white p-5">
            <Truck className="h-6 w-6 text-slate-900" />
            <h3 className="mt-4 text-lg font-semibold text-slate-900">
              Delivery support
            </h3>
            <p className="mt-2 text-sm leading-7 text-slate-600">
              We coordinate sourcing, shipping, and delivery updates through to
              completion.
            </p>
          </article>
        </div>
      </div>
    </SectionReveal>
  )
}

function ContactFormSection({
  categoryLabel,
}: {
  categoryLabel: string
}) {
  return (
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
            Send us your {categoryLabel.toLowerCase()} requirement.
          </h2>
          <p className="mt-4 text-base leading-8 text-slate-600">
            Share your quantity, project scope, and preferred product
            categories. Our team will get back to you with the next steps.
          </p>
        </header>

        <div className="mt-10">
          <ContactForm />
        </div>
      </div>
    </SectionReveal>
  )
}

function CategoryHeroSection({
  category,
}: {
  category: ProductCategory
}) {
  return (
    <section className="relative overflow-hidden border-b border-slate-900 bg-slate-950 text-white">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${categoryHeroImages[category.slug]})` }}
      />
      <div className="absolute inset-0 bg-slate-950/35" />
      <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(15,23,42,0.88)_0%,rgba(15,23,42,0.58)_45%,rgba(15,23,42,0.2)_100%)]" />

      <div className="relative mx-auto flex min-h-[420px] max-w-6xl flex-col justify-center px-6 py-16 sm:min-h-[460px] lg:py-20">
        <Link
          to="/"
          className="inline-flex w-fit items-center gap-2 text-sm font-medium text-white/75 transition hover:text-white"
        >
          <ArrowRight className="h-4 w-4 rotate-180" />
          Back to home
        </Link>
        <p className="mt-8 text-sm font-medium uppercase tracking-[0.24em] text-amber-200">
          {category.label}
        </p>
        <h1 className="mt-4 max-w-4xl text-4xl font-semibold leading-tight text-white sm:text-5xl">
          {category.pageTitle}
        </h1>
        <p className="mt-6 max-w-3xl text-base leading-8 text-slate-100 sm:text-lg">
          {category.pageDescription}
        </p>
      </div>
    </section>
  )
}

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

  const isHomeFurniturePage = category.slug === 'home-furniture'
  const isOfficeFurniturePage = category.slug === 'office-furniture'

  return (
    <main className="bg-[#fafafa]">
      <CategoryHeroSection category={category} />

      {isHomeFurniturePage ? (
        <>
          <CategoryProductsSection
            category={category}
            description="Explore the core home furniture categories we source for refined residential spaces."
          />
          <ProjectsSection />
          <ProcessSection />
          <TestimonialsSection reviewMode="home" />
          <ContactFormSection categoryLabel={category.label} />
        </>
      ) : isOfficeFurniturePage ? (
        <>
          <CategoryProductsSection
            category={category}
            description="Explore the office furniture categories we source for productive, durable, and design-led workspaces."
          />
          <OfficeProjectsSection />
          <ProcessSection />
          <ClienteleSection />
          <TestimonialsSection reviewMode="office" />
          <ContactFormSection categoryLabel={category.label} />
        </>
      ) : (
        <>
          <CategoryProductsSection category={category} />
          <CategoryCoverageSection category={category} />
          <DeliverySection category={category} />
        </>
      )}
    </main>
  )
}

export default ProductCategoryPage
