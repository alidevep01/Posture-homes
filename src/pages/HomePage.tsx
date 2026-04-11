import CategoryGridSection from "../sections/CategoryGridSection";
import ContactSection from "../sections/ContactSection";
import AboutSection from "../sections/AboutSection";

function HomePage() {
  return (
    <main>
      <CategoryGridSection revealMode="footer" />
      <ContactSection revealMode="footer" />
      <AboutSection revealMode="footer" />
    </main>
  );
}

export default HomePage;
