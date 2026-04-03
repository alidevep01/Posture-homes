import Footer from './components/Footer'
import Navbar from './components/Navbar'
import CategorySection from './sections/CategorySection'
import ContactSection from './sections/ContactSection'
import HeroSection from './sections/HeroSection'
import ProcessSection from './sections/ProcessSection'
import ProductSection from './sections/ProductSection'

function App() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Navbar />
      <main>
        <HeroSection />
        <CategorySection />
        <ProductSection />
        <ProcessSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  )
}

export default App
