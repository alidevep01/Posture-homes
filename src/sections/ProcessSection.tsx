import { motion } from 'framer-motion'
import {
  BadgeCheck,
  Factory,
  PhoneCall,
  Plane,
  Truck,
} from 'lucide-react'
import SectionReveal from '../components/SectionReveal'

const steps = [
  {
    title: 'Consultation',
    description:
      'We understand your space, budget, furniture scope, and sourcing priorities before shortlisting options.',
    icon: PhoneCall,
  },
  {
    title: 'Visit China (optional)',
    description:
      'You can travel with us to review collections, materials, and finishes directly at the source.',
    icon: Plane,
  },
  {
    title: 'Factory Selection',
    description:
      'We compare manufacturers and identify factories that match your quality, lead-time, and pricing goals.',
    icon: Factory,
  },
  {
    title: 'Quality Check',
    description:
      'Every order is checked for specifications, finish quality, and readiness before dispatch.',
    icon: BadgeCheck,
  },
  {
    title: 'Delivery',
    description:
      'Your shipment is coordinated from factory to destination with updates through the final handover.',
    icon: Truck,
  },
]

function ProcessSection() {
  return (
    <SectionReveal
      id="process"
      className="border-b border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8f5ef_100%)]"
    >
      <div className="mx-auto max-w-6xl px-6 py-16">
        <header className="max-w-2xl">
          <h2 className="text-2xl font-semibold text-slate-900">
            Our sourcing process
          </h2>
          <p className="mt-3 text-slate-600">
            A structured workflow that keeps sourcing transparent from first
            conversation to final delivery.
          </p>
        </header>
        <div className="relative mt-10">
          <div
            aria-hidden="true"
            className="absolute left-7 top-0 h-full w-px bg-slate-200 lg:left-0 lg:right-0 lg:top-7 lg:h-px lg:w-full"
          />
          <ol className="flex flex-col gap-5 lg:flex-row lg:gap-0">
            {steps.map((step, index) => {
              const Icon = step.icon

              return (
                <motion.li
                  key={step.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.35 }}
                  transition={{
                    duration: 0.45,
                    delay: index * 0.08,
                    ease: 'easeOut',
                  }}
                  whileHover={{ y: -4 }}
                  className="relative flex flex-1 pl-16 lg:pl-0 lg:pr-5"
                >
              <div className="relative flex h-full min-h-[22rem] w-full flex-col rounded-[1.75rem] border border-stone-200 bg-white p-6 shadow-[0_24px_60px_-36px_rgba(15,23,42,0.35)]">
                    <div className="absolute left-[-2.85rem] top-6 flex h-11 w-11 items-center justify-center rounded-full border border-stone-200 bg-[#f6efe5] text-slate-900 lg:left-6 lg:top-[-1.4rem]">
                      <Icon className="h-5 w-5" />
                    </div>
                    <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">
                      Step {index + 1}
                    </p>
                    <h3 className="mt-4 text-lg font-semibold text-slate-900">
                      {step.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-slate-600">
                      {step.description}
                    </p>
                  </div>
                </motion.li>
              )
            })}
          </ol>
        </div>
      </div>
    </SectionReveal>
  )
}

export default ProcessSection
