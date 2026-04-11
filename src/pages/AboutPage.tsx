import { useState } from "react";
import {
  ArrowRight,
  Building2,
  Home,
  MapPin,
  Sparkles,
  Users,
} from "lucide-react";
import { Link } from "react-router";
import SectionReveal from "../components/SectionReveal";

const brandSections = [
  {
    name: "Posture Homes",
    eyebrow: "Luxury Residential Furniture",
    image: "/home-furniture-hero.jpg",
    icon: Home,
    description:
      "Posture Homes was built for homeowners who want more than standard furniture. The brand focuses on bespoke home collections, curated artifacts, mix media art, and custom-made rugs that bring craftsmanship, individuality, and calm luxury into each space.",
    bullets: [
      "Bespoke furniture for living, dining, bedroom, and outdoor spaces",
      "Curated artifacts, mix media art, and custom rug offerings",
      "A design language built around craftsmanship, refinement, and personalization",
    ],
    highlight:
      "The residential side of Posture is centered on timeless design, elevated materials, and a highly tailored client experience.",
  },
  {
    name: "Posture Furniture",
    eyebrow: "Ergonomic Office Solutions",
    image: "/office-furniture.jpg",
    icon: Building2,
    description:
      "Posture Furniture extends the same founder-led vision into workplaces. It is focused on ergonomic, robust, and aesthetically strong office furniture designed to improve comfort, productivity, and the everyday work experience for teams across India.",
    bullets: [
      "Executive desks, ergonomic chairs, and conference furniture",
      "Modular workstations, loose furniture, and cafeteria solutions",
      "Execution built around efficient delivery, skilled production, and on-time handovers",
    ],
    highlight:
      "The office vertical combines design, ergonomics, and project execution to create workspaces that perform as well as they look.",
  },
] as const;

function AboutPage() {
  const [hasFounderImageError, setHasFounderImageError] = useState(false);

  return (
    <main className="bg-[#fafafa]">
      <SectionReveal className="border-b border-slate-200 bg-[radial-gradient(circle_at_top,#f6efe4_0%,#ffffff_52%,#ffffff_100%)]">
        <div className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
          <div className="max-w-4xl">
            <p className="text-sm font-semibold uppercase tracking-[0.26em] text-amber-700">
              About Posture
            </p>
            <h1 className="mt-6 max-w-4xl text-4xl leading-tight text-slate-950 sm:text-5xl lg:text-6xl">
              Luxury furniture for discerning homes and thoughtfully designed
              workspaces.
            </h1>
            <p className="mt-6 max-w-3xl text-base leading-8 text-slate-600 sm:text-lg">
              Posture Homes is built for homeowners seeking luxury furniture,
              curated artifacts, mix media art, and custom-made rugs that bring
              craftsmanship, creativity, and sophistication into every room.
              Posture Furniture extends that same commitment into offices with
              ergonomic, aesthetically appealing, and robust products designed
              for modern work environments.
            </p>
            <p className="mt-4 max-w-3xl text-base leading-8 text-slate-600 sm:text-lg">
              Across both brands, the focus remains the same: exceptional
              materials, reliable execution, and a personalized experience that
              helps clients shape spaces around the way they live and work.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                to="/products/home-furniture"
                className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition duration-300 hover:bg-slate-800"
              >
                Explore Home Furniture
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/products/office-furniture"
                className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition duration-300 hover:border-slate-900 hover:bg-slate-50"
              >
                Explore Office Furniture
              </Link>
            </div>
          </div>
        </div>
      </SectionReveal>

      <SectionReveal
        id="founders"
        className="border-b border-slate-200 bg-[#fafafa]"
      >
        <div className="mx-auto max-w-6xl px-6 py-18 sm:py-20">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div className="overflow-hidden rounded-[2rem] border border-stone-200 bg-white shadow-[0_30px_80px_-40px_rgba(15,23,42,0.22)]">
              {hasFounderImageError ? (
                <div className="flex aspect-[4/3] flex-col items-center justify-center gap-4 bg-[radial-gradient(circle_at_top,#f3e8d7_0%,#efe5d6_35%,#f8f5ef_100%)] px-8 text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-slate-950 shadow-sm">
                    <Users className="h-7 w-7" />
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-slate-950">
                      Mr. Aditya Dugar & Mrs. Namrata Jain
                    </p>
                    <p className="mt-2 text-sm leading-7 text-slate-600">
                      Add the founders image at{" "}
                      <span className="font-semibold text-slate-900">
                        public/founders.png
                      </span>{" "}
                      to display it here.
                    </p>
                  </div>
                </div>
              ) : (
                <img
                  src="/founders.png"
                  alt="Mr. Aditya Dugar and Mrs. Namrata Jain"
                  loading="lazy"
                  className="aspect-[4/3] w-full object-cover"
                  onError={() => setHasFounderImageError(true)}
                />
              )}
            </div>

            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-amber-700">
                Meet our founders
              </p>
              <h2 className="mt-4 text-3xl leading-tight text-slate-950 sm:text-4xl">
                Mr. Aditya Dugar and Mrs. Namrata Jain founded Posture with a
                vision rooted in timeless design, quality materials, and
                exceptional craftsmanship.
              </h2>
              <p className="mt-5 text-base leading-8 text-slate-600">
                Posture Homes was founded in 2021 by Mr. Aditya Dugar, a
                passionate entrepreneur with a background in interior design and
                expertise in furniture ergonomics, and Mrs. Namrata Jain, an
                engineer and IIM Indore alumna. Together, they built a brand
                that balances luxury, functionality, and long-term trust across
                both residential and office environments.
              </p>
              <p className="mt-4 text-base leading-8 text-slate-600">
                Their founder vision was clear from the beginning: create spaces
                that are refined, practical, and deeply personal, while
                maintaining a high standard of service, sustainability, and
                customer satisfaction in every project.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="rounded-[1.5rem] border border-stone-200 bg-white px-5 py-5">
                  <p className="text-sm font-semibold text-slate-950">
                    Design and ergonomics
                  </p>
                  <p className="mt-2 text-sm leading-7 text-slate-600">
                    A founder-led blend of interior design insight, furniture
                    ergonomics, engineering, and business discipline.
                  </p>
                </div>
                <div className="rounded-[1.5rem] border border-stone-200 bg-white px-5 py-5">
                  <p className="text-sm font-semibold text-slate-950">
                    Shared brand vision
                  </p>
                  <p className="mt-2 text-sm leading-7 text-slate-600">
                    Timeless design, high-quality materials, robust execution,
                    and a personalized client experience across both verticals.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SectionReveal>

      <SectionReveal
        id="brands"
        className="border-b border-slate-200 bg-[#fafafa]"
      >
        <div className="mx-auto max-w-6xl px-6 py-18 sm:py-20">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">
              About our brands
            </p>
            <h2 className="mt-4 text-3xl leading-tight text-slate-950 sm:text-4xl">
              Two distinct verticals shaped by the same commitment to quality,
              comfort, and design.
            </h2>
          </div>

          <div className="mt-12 grid gap-8 lg:grid-cols-2">
            {brandSections.map((section) => {
              const Icon = section.icon;

              return (
                <article
                  key={section.name}
                  className="overflow-hidden rounded-[2rem] border border-stone-200 bg-white shadow-[0_30px_80px_-40px_rgba(15,23,42,0.22)]"
                >
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={section.image}
                      alt={section.name}
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-slate-950/12 to-transparent" />
                    <div className="absolute left-6 top-6 inline-flex items-center gap-2 rounded-full bg-white/92 px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm backdrop-blur">
                      <Icon className="h-4 w-4" />
                      {section.eyebrow}
                    </div>
                  </div>

                  <div className="p-8">
                    <h3 className="text-3xl text-slate-950">{section.name}</h3>
                    <p className="mt-4 text-base leading-8 text-slate-600">
                      {section.description}
                    </p>

                    <ul className="mt-6 space-y-3">
                      {section.bullets.map((bullet) => (
                        <li
                          key={bullet}
                          className="flex items-start gap-3 text-sm leading-7 text-slate-700"
                        >
                          <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-amber-600" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-8 rounded-[1.5rem] bg-white px-5 py-5 text-sm leading-7 text-slate-700">
                      <div className="flex items-center gap-2 font-semibold text-slate-950">
                        <Sparkles className="h-4 w-4 text-amber-700" />
                        Brand focus
                      </div>
                      <p className="mt-2">{section.highlight}</p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </SectionReveal>

      <SectionReveal
        id="mission"
        className="border-b border-slate-200 bg-[#fafafa]"
      >
        <div className="mx-auto max-w-6xl px-6 py-18 sm:py-20">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">
              Mission & Vision
            </p>
            <h2 className="mt-4 text-3xl leading-tight text-slate-950 sm:text-4xl">
              A luxury furniture vision shaped by craftsmanship, design, and
              client experience.
            </h2>
          </div>

          <div className="mt-12 grid gap-8 lg:grid-cols-2">
            <article className="rounded-[2rem] border border-stone-200 bg-white p-8 shadow-[0_30px_80px_-40px_rgba(15,23,42,0.22)]">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-amber-700">
                Vision
              </p>
              <h3 className="mt-4 text-3xl leading-tight text-slate-950">
                To be a global leader in bespoke furniture, known for
                exceptional craftsmanship, innovative design, and an elevated
                customer experience.
              </h3>
              <p className="mt-5 text-base leading-8 text-slate-600">
                Posture Homes is built to create handcrafted pieces that elevate
                the art of living through timeless aesthetics, refined
                materials, and a deeply personalized approach.
              </p>
            </article>

            <article className="rounded-[2rem] border border-stone-200 bg-white p-8 shadow-[0_30px_80px_-40px_rgba(15,23,42,0.22)]">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-amber-700">
                Mission
              </p>
              <h3 className="mt-4 text-3xl leading-tight text-slate-950">
                To redefine luxury living through exquisite furniture, curated
                art, and bespoke rugs that reflect individual taste and inspire
                elegance at home.
              </h3>
              <p className="mt-5 text-base leading-8 text-slate-600">
                The mission is to deliver comfort, sophistication, and
                individuality in every corner of the home, while maintaining a
                strong commitment to quality, service, and long-term client
                trust.
              </p>
            </article>
          </div>
        </div>
      </SectionReveal>

      <SectionReveal id="locations" className="bg-[#fafafa]">
        <div className="mx-auto max-w-6xl px-6 py-18 sm:py-20">
          <div className="rounded-[2rem] border border-stone-200 bg-white px-8 py-10 text-slate-900 shadow-[0_30px_80px_-40px_rgba(15,23,42,0.22)] sm:px-10">
            <div className="grid gap-8 lg:grid-cols-[1.3fr_0.7fr] lg:items-end">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">
                  Hyderabad Presence
                </p>
                <h2 className="mt-4 text-3xl leading-tight text-slate-950 sm:text-4xl">
                  Two showrooms, one Posture standard.
                </h2>
                <p className="mt-4 max-w-2xl text-base leading-8 text-slate-600">
                  Posture Homes operates from Banjara Hills for premium
                  residential furniture, while Posture Furniture serves office
                  projects from Gachibowli. Both are built around the same
                  founder-driven approach to design quality, client service, and
                  execution.
                </p>
              </div>

              <div className="space-y-4">
                <div className="rounded-[1.5rem] border border-stone-200 bg-white px-5 py-4">
                  <div className="flex items-center gap-2 text-sm font-semibold text-slate-950">
                    <MapPin className="h-4 w-4 text-amber-700" />
                    Posture Homes
                  </div>
                  <p className="mt-2 text-sm leading-7 text-slate-600">
                    Banjara Hills, Hyderabad
                  </p>
                </div>
                <div className="rounded-[1.5rem] border border-stone-200 bg-white px-5 py-4">
                  <div className="flex items-center gap-2 text-sm font-semibold text-slate-950">
                    <MapPin className="h-4 w-4 text-amber-700" />
                    Posture Furniture
                  </div>
                  <p className="mt-2 text-sm leading-7 text-slate-600">
                    Gachibowli, Hyderabad
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SectionReveal>
    </main>
  );
}

export default AboutPage;
