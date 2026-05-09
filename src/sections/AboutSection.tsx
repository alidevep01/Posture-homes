import { useState } from "react";
import {
  LuArrowRight as ArrowRight,
  LuUsers as Users,
} from "react-icons/lu";
import { Link } from "react-router";
import SectionReveal from "../components/SectionReveal";

function AboutSection({
  revealMode,
}: {
  revealMode?: "default" | "footer";
}) {
  const [hasFounderImageError, setHasFounderImageError] = useState(false);

  return (
    <SectionReveal
      id="about"
      revealMode={revealMode}
      className="border-b border-slate-200 bg-[#fafafa]"
    >
      <div className="mx-auto max-w-6xl px-6 py-18 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
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
              About us
            </p>
            <h2 className="mt-4 text-3xl leading-tight text-slate-950 sm:text-4xl">
              Posture Homes and Posture Furniture, united by founder-led
              craftsmanship for refined spaces.
            </h2>
            <p className="mt-5 text-base leading-8 text-slate-600">
              Posture brings together the residential focus of Posture Homes
              and the workplace capability of Posture Furniture. Across both
              sides, the brand combines craftsmanship, creativity, ergonomics,
              and dependable execution to create spaces that feel personal,
              refined, and practical.
            </p>
            <p className="mt-4 text-base leading-8 text-slate-600">
              Posture Homes helps homeowners elevate living spaces through
              bespoke furniture, curated artifacts, mix media art, and
              custom-made rugs. Posture Furniture extends the same design
              discipline into offices with ergonomic chairs, executive desks,
              modular workstations, and workplace furniture built for comfort
              and performance.
            </p>
            <p className="mt-4 text-base leading-8 text-slate-600">
              Founded in 2021 by Mr. Aditya Dugar and Mrs. Namrata Jain,
              Posture brings together interior design insight, ergonomics,
              engineering, and a commitment to exceptional craftsmanship,
              sustainability, and customer satisfaction across both homes and
              workspaces.
            </p>

            <div className="mt-8 rounded-[1.75rem] border border-stone-200 bg-white px-6 py-6 shadow-[0_20px_50px_-42px_rgba(15,23,42,0.18)]">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
                Meet our founders
              </p>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                Mr. Aditya Dugar and Mrs. Namrata Jain founded Posture with a
                clear vision: create timeless designs using high-quality
                materials and exceptional craftsmanship, while delivering a
                thoughtful client experience across residential and office
                environments.
              </p>
            </div>

            <Link
              to="/about"
              className="mt-8 inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition duration-300 hover:border-slate-900 hover:bg-slate-50"
            >
              Read more about us
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </SectionReveal>
  );
}

export default AboutSection;
