import { Suspense, lazy } from 'react'
import HeroSection from '../sections/HeroSection'

const CategorySection = lazy(() => import('../sections/CategorySection'))
const ProductSection = lazy(() => import('../sections/ProductSection'))
const ProcessSection = lazy(() => import('../sections/ProcessSection'))
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
        <ProcessSection />
        <ContactSection />
      </Suspense>
    </main>
  )
}

export default HomePage
