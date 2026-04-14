import CategoryGridSection from "../sections/CategoryGridSection";
import ContactSection from "../sections/ContactSection";
import AboutSection from "../sections/AboutSection";
import Seo from "../components/Seo";

function HomePage() {
  return (
    <main>
      <Seo
        title="Posture India | Furniture in Hyderabad and China Sourcing"
        description="Posture India serves homeowners, office teams, builders, architects, and PMCs with residential furniture, office furniture, and sourcing support in Hyderabad."
        canonicalPath="/"
        image="/home-furniture-hero.jpg"
        imageAlt="Posture India furniture and sourcing"
        keywords={[
          "furniture in Hyderabad",
          "office furniture suppliers India",
          "custom furniture India",
          "import furniture from China India",
        ]}
      />
      <CategoryGridSection revealMode="footer" />
      <ContactSection revealMode="footer" />
      <AboutSection revealMode="footer" />
    </main>
  );
}

export default HomePage;
