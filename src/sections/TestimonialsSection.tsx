import { useEffect } from 'react'
import { LuExternalLink as ExternalLink } from 'react-icons/lu'
import SectionReveal from '../components/SectionReveal'

const FEATURABLE_SCRIPT_ID = 'featurable-bundle-script'
const FEATURABLE_SCRIPT_SRC = 'https://featurable.com/assets/bundle.js'
const FEATURABLE_WIDGET_ID = 'featurable-c3a40964-6ef8-4324-86fe-47d2e0d72a1c'

const reviewLinks = {
  home: {
    label: 'Write a review for Posture Homes',
    href: 'https://g.page/r/CX5asPYk22d4EBM/review',
  },
  office: {
    label: 'Write a review for Posture Furniture',
    href: 'https://g.page/r/CeCfb7uKQAl-EBM/review',
  },
} as const

const reviewContent = {
  both: {
    heading: 'Verified Google reviews from Posture Homes and Posture Furniture.',
    description:
      'Browse the live review feed below, or leave a review directly for either showroom.',
  },
  home: {
    heading: 'Verified Google reviews for Posture Homes.',
    description:
      'Browse the live review feed below, or leave a review directly for Posture Homes.',
  },
  office: {
    heading: 'Verified Google reviews for Posture Furniture.',
    description:
      'Browse the live review feed below, or leave a review directly for Posture Furniture.',
  },
} as const

function TestimonialsSection({
  reviewMode = 'both',
}: {
  reviewMode?: 'home' | 'office' | 'both'
}) {
  useEffect(() => {
    const widgetElement = document.getElementById(FEATURABLE_WIDGET_ID)
    const existingScript = document.getElementById(FEATURABLE_SCRIPT_ID)

    if (widgetElement) {
      widgetElement.innerHTML = ''
    }

    existingScript?.remove()

    const script = document.createElement('script')
    script.id = FEATURABLE_SCRIPT_ID
    script.src = FEATURABLE_SCRIPT_SRC
    script.defer = true
    script.charset = 'UTF-8'
    document.body.appendChild(script)

    return () => {
      script.remove()
      if (widgetElement) {
        widgetElement.innerHTML = ''
      }
    }
  }, [])

  const visibleLinks =
    reviewMode === 'both'
      ? [reviewLinks.home, reviewLinks.office]
      : [reviewLinks[reviewMode]]
  const content = reviewContent[reviewMode]

  return (
    <SectionReveal
      id="testimonials"
      className="border-b border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#fcfaf7_100%)]"
    >
      <div className="mx-auto max-w-7xl px-6 py-16 sm:py-20">
        <header className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-amber-700">
            Testimonials
          </p>
          <h2 className="mt-4 text-3xl leading-tight text-slate-950 sm:text-4xl">
            {content.heading}
          </h2>
          <p className="mt-4 text-base leading-8 text-slate-600">
            {content.description}
          </p>
        </header>

        <div className="mt-12 rounded-[2rem] border border-stone-200 bg-white p-4 shadow-[0_24px_60px_-45px_rgba(15,23,42,0.22)] sm:p-6">
          <div
            id={FEATURABLE_WIDGET_ID}
            data-featurable-async=""
          />
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          {visibleLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition duration-300 hover:border-slate-900 hover:bg-slate-50"
            >
              {link.label}
              <ExternalLink className="h-4 w-4" />
            </a>
          ))}
        </div>
      </div>
    </SectionReveal>
  )
}

export default TestimonialsSection
