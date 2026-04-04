import { motion } from 'framer-motion'
import SectionReveal from '../components/SectionReveal'

const projectCategories = [
  {
    title: 'Bedroom Furniture',
    description: 'Beds, bedside tables, ottomans, study tables, and chairs.',
    image: '/projects/Bedroom-Bed.png',
  },
  {
    title: 'Dining Area',
    description:
      'Dining tables, dining chairs, buffet and console tables, and bar furniture.',
    image: '/projects/dinning-area.jpg',
  },
  {
    title: 'Living and Drawing Room Furniture',
    description:
      'Sofas, recliners, armchairs, centre tables, side tables, and console tables.',
    image: '/projects/living-room.jpg',
  },
  {
    title: 'Exquisite Artifacts',
    description:
      'Curated accent pieces that add character, depth, and visual identity to a space.',
    image: '/projects/artifacts.jpg',
  },
  {
    title: 'Mix Media Arts',
    description:
      'Statement art selections that bring texture, emotion, and a bespoke finishing layer.',
    image: '/projects/mix-media.jpg',
  },
  {
    title: 'Custom-Made Rugs',
    description:
      'Tailored rug solutions designed to complete residential spaces with material warmth and proportion.',
    image: '/projects/rugs.jpg',
  },
] as const

function ProjectsSection() {
  return (
    <SectionReveal
      id="projects"
      className="border-b border-slate-200 bg-[#fcfaf7]"
    >
      <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
        <header className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-amber-700">
            Project Categories
          </p>
          <h2 className="mt-4 text-3xl leading-tight text-slate-950 sm:text-4xl">
            Explore the categories that shape the Posture Homes project portfolio.
          </h2>
          <p className="mt-4 text-base leading-8 text-slate-600">
            From complete living spaces to finishing layers like art, artifacts,
            and rugs, these categories reflect the type of residential projects
            we build around design-led sourcing and bespoke execution.
          </p>
        </header>

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {projectCategories.map((project, index) => (
            <motion.article
              key={project.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.45, delay: index * 0.06, ease: 'easeOut' }}
              whileHover={{ y: -6 }}
              className="group overflow-hidden rounded-[1.9rem] border border-stone-200 bg-[#fbf7f1] shadow-[0_24px_60px_-40px_rgba(15,23,42,0.25)] transition duration-300 hover:shadow-[0_30px_80px_-36px_rgba(15,23,42,0.32)]"
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
            </motion.article>
          ))}
        </div>
      </div>
    </SectionReveal>
  )
}

export default ProjectsSection
