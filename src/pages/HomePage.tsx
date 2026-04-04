import { Suspense, lazy } from 'react'
import HeroSection from '../sections/HeroSection'

const CategorySection = lazy(() => import('../sections/CategorySection'))
const ProductSection = lazy(() => import('../sections/ProductSection'))
const ProjectsSection = lazy(() => import('../sections/ProjectsSection'))
const ProcessSection = lazy(() => import('../sections/ProcessSection'))
const TestimonialsSection = lazy(() => import('../sections/TestimonialsSection'))
const ContactSection = lazy(() => import('../sections/ContactSection'))

function SectionFallback() {
  return <div className="min-h-24" aria-hidden="true" />
}

function HomePage() {
  return (
    <main>
      <HeroSection />
      <Suspense fallback={<SectionFallback />}>
        <CategorySection />
        <ProductSection />
        <ProjectsSection />
        <ProcessSection />
        <TestimonialsSection />
        <ContactSection />
      </Suspense>
    </main>
  )
}

export default HomePage
