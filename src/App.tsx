import { Suspense, lazy } from 'react'
import Navbar from './components/Navbar'
import HeroSection from './sections/HeroSection'

const CategorySection = lazy(() => import('./sections/CategorySection'))
const ProductSection = lazy(() => import('./sections/ProductSection'))
const ProcessSection = lazy(() => import('./sections/ProcessSection'))
const ContactSection = lazy(() => import('./sections/ContactSection'))
const Footer = lazy(() => import('./components/Footer'))

function SectionFallback() {
  return <div className="min-h-24" aria-hidden="true" />
}

function App() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Navbar />
      <main>
        <HeroSection />
        <Suspense fallback={<SectionFallback />}>
          <CategorySection />
          <ProductSection />
          <ProcessSection />
          <ContactSection />
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  )
}

export default App
