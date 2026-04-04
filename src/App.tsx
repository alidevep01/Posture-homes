import { Suspense, lazy } from 'react'
import { Route, Routes } from 'react-router'
import Navbar from './components/Navbar'
const Footer = lazy(() => import('./components/Footer'))
const AboutPage = lazy(() => import('./pages/AboutPage'))
const HomePage = lazy(() => import('./pages/HomePage'))
const ProductCategoryPage = lazy(() => import('./pages/ProductCategoryPage'))

function SectionFallback() {
  return <div className="min-h-24" aria-hidden="true" />
}

function App() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Navbar />
      <Suspense fallback={<SectionFallback />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route
            path="/products/:categorySlug"
            element={<ProductCategoryPage />}
          />
        </Routes>
      </Suspense>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  )
}

export default App
