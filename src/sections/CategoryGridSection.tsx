import {
  LuArrowRight as ArrowRight,
  LuBuilding2 as Building2,
  LuHouse as Home,
  LuPackageSearch as PackageSearch,
} from "react-icons/lu";
import { Link } from "react-router";
import SectionReveal from "../components/SectionReveal";

const categoryCards = [
  {
    title: "Office",
    eyebrow: "Office Furniture",
    description:
      "Workplace furniture for executive cabins, open offices, meeting rooms, and loose furniture.",
    image: "/office-furniture.jpg",
    href: "/products/office-furniture",
    icon: Building2,
    ctaLabel: "Explore Office Furniture",
  },
  {
    title: "Home",
    eyebrow: "Home Furniture",
    description:
      "Premium furniture collections for living, dining, bedroom, and decor-led residential spaces.",
    image: "/home-furniture-hero.jpg",
    href: "/products/home-furniture",
    icon: Home,
    ctaLabel: "Explore Home Furniture",
  },
  {
    title: "Sourcing",
    eyebrow: "Project Support",
    description:
      "End-to-end sourcing support covering supplier selection, quality checks, logistics, and delivery coordination.",
    image: "/custom-furniture.jpeg",
    href: "/sourcing",
    icon: PackageSearch,
    ctaLabel: "Explore Sourcing",
  },
] as const;

function CategoryGridSection({
  revealMode,
}: {
  revealMode?: "default" | "footer";
}) {
  return (
    <SectionReveal
      id="collections"
      revealMode={revealMode}
      className="border-b border-slate-200 bg-[#f7f2ea]"
    >
      <div className="grid min-h-[calc(100svh-81px)] gap-px bg-white/40 lg:grid-cols-3">
        {categoryCards.map((card) => {
          return (
            <article
              key={card.title}
              className="group relative isolate min-h-[32rem] overflow-hidden bg-slate-950"
            >
              <img
                src={card.image}
                alt={card.eyebrow}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,23,42,0.28)_0%,rgba(15,23,42,0.34)_38%,rgba(15,23,42,0.82)_100%)]" />
              <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(15,23,42,0.68)_0%,rgba(15,23,42,0.18)_55%,rgba(15,23,42,0.58)_100%)] opacity-85 transition duration-500 group-hover:opacity-100" />

              <div className="relative flex h-full flex-col justify-between p-8 sm:p-10">
                {/* Top Content */}
                <div>
                  <h2 className="text-5xl leading-none text-white sm:text-6xl lg:text-[5rem]">
                    {card.title}
                  </h2>

                  <p className="mt-5 max-w-sm text-sm leading-7 text-white/80 sm:text-base">
                    {card.description}
                  </p>
                </div>

                {/* Bottom CTA */}
                <Link
                  to={card.href}
                  className="inline-flex w-fit items-center gap-2 rounded-full border border-white/18 bg-white/12 px-5 py-3 text-sm font-semibold text-white backdrop-blur-md transition duration-300 hover:bg-white/20"
                >
                  {card.ctaLabel}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </article>
          );
        })}
      </div>
    </SectionReveal>
  );
}

export default CategoryGridSection;
