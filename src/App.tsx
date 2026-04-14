import { Suspense, lazy } from 'react'
import { Route, Routes } from 'react-router'
import Navbar from './components/Navbar'
import ScrollToTop from './components/ScrollToTop'
import WhatsAppFloat from './components/WhatsAppFloat'
const Footer = lazy(() => import('./components/Footer'))
const AboutPage = lazy(() => import('./pages/AboutPage'))
const BlogDetailPage = lazy(() => import('./pages/BlogDetailPage'))
const BlogListingPage = lazy(() => import('./pages/BlogListingPage'))
const HomePage = lazy(() => import('./pages/HomePage'))
const ProductCategoryPage = lazy(() => import('./pages/ProductCategoryPage'))
const SourcingPage = lazy(() => import('./pages/SourcingPage'))

function SectionFallback() {
  return <div className="min-h-24" aria-hidden="true" />
}

function App() {
  return (
    <div className="min-h-screen bg-[#fafafa] text-slate-900">
      <ScrollToTop />
      <Navbar />
      <WhatsAppFloat />
      <Suspense fallback={<SectionFallback />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/blog" element={<BlogListingPage />} />
          <Route path="/blog/:slug" element={<BlogDetailPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/sourcing" element={<SourcingPage />} />
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
