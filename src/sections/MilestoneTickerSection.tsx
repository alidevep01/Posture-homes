import { useEffect, useRef, useState } from "react";
import {
  LuClipboardCheck as ClipboardCheck,
  LuMapPin as MapPin,
  LuSparkles as Sparkles,
  LuThumbsUp as ThumbsUp,
  LuUsers as Users,
} from "react-icons/lu";

import SectionReveal from "../components/SectionReveal";

const milestones = [
  {
    value: 90,
    label: "Projects Delivered",
    detail: "Across homes, offices, and sourcing-led fit-outs.",
    icon: ClipboardCheck,
    featured: true,
  },
  {
    value: 5,
    label: "Cities",
    detail: "Serving clients through citywide project support.",
    icon: MapPin,
    featured: false,
  },
  {
    value: 150,
    label: "Trusted Clients",
    detail: "Long-term relationships with homeowners and teams.",
    icon: Users,
    featured: false,
  },
  {
    value: 10,
    label: "Years of Experience",
    detail: "Furniture, ergonomics, sourcing, and execution insight.",
    icon: ThumbsUp,
    featured: false,
  },
] as const;

function CountUpValue({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [display, setDisplay] = useState(0);
  const [start, setStart] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setStart(true);
          obs.disconnect();
        }
      },
      { threshold: 0.5 },
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!start) return;
    const t0 = performance.now();
    const duration = 1800;
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min((now - t0) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(Math.round(value * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [start, value]);

  return (
    <span ref={ref} className="tabular-nums">
      {display}
      <span className="text-amber-600">+</span>
    </span>
  );
}

export default function MilestoneTickerSection({
  revealMode,
}: {
  revealMode?: "default" | "footer";
}) {
  return (
    <SectionReveal
      revealMode={revealMode}
      className="overflow-hidden border-y border-stone-200/70 bg-[#f7f2ea] text-slate-950"
    >
      <div className="relative isolate py-20 sm:py-28">
        {/* Background */}
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_12%_-10%,#ffffff_0%,rgba(255,255,255,0)_42%),radial-gradient(circle_at_92%_110%,rgba(180,83,9,0.10)_0%,rgba(180,83,9,0)_45%),linear-gradient(135deg,#faf7f1_0%,#f3ebdc_100%)]"
        />
        {/* Soft grain dots */}
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 opacity-[0.35] [background-image:radial-gradient(rgba(120,85,40,0.10)_1px,transparent_1px)] [background-size:22px_22px]"
        />

        <div className="mx-auto grid max-w-7xl gap-14 px-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-16">
          {/* Left intro */}
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2.5 rounded-full border border-amber-700/20 bg-white/80 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-amber-800 shadow-[0_10px_30px_-20px_rgba(120,53,15,0.35)] backdrop-blur">
              <Sparkles className="h-3.5 w-3.5" />
              Milestone
            </div>

            <h2 className="mt-6 font-serif text-4xl leading-[1.1] text-slate-950 sm:text-5xl lg:text-[3.4rem]">
              Built through delivered spaces and{" "}
              <span className="italic text-amber-800">lasting trust.</span>
            </h2>

            <p className="mt-6 text-base leading-8 text-slate-600 sm:text-[17px]">
              Posture brings together residential furniture, workplace
              solutions, and sourcing capability for projects that need both
              design judgment and dependable execution.
            </p>

            <div className="mt-9 inline-flex overflow-hidden rounded-full border border-stone-300/80 bg-white/70 p-1 backdrop-blur">
              {["Homes", "Offices", "Sourcing"].map((item, i) => (
                <div
                  key={item}
                  className={`rounded-full px-5 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] transition ${
                    i === 0
                      ? "bg-slate-950 text-white shadow-sm"
                      : "text-slate-700 hover:bg-stone-100"
                  }`}
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* Right grid */}
          <div
            className="grid gap-5 sm:grid-cols-2"
            aria-label="Posture milestones"
          >
            {milestones.map((item, index) => {
              const Icon = item.icon;
              const isFeatured = item.featured;

              return (
                <article
                  key={item.label}
                  style={{ animationDelay: `${index * 110}ms` }}
                  className={`milestone-card group relative isolate flex min-h-[260px] flex-col justify-between overflow-hidden rounded-2xl border px-7 py-7 transition-all duration-500 hover:-translate-y-1.5 ${
                    isFeatured
                      ? "border-slate-800/60 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white shadow-[0_30px_80px_-40px_rgba(15,23,42,0.65)]"
                      : "border-stone-200 bg-white/85 text-slate-950 shadow-[0_24px_70px_-50px_rgba(15,23,42,0.35)] backdrop-blur hover:border-amber-700/30 hover:shadow-[0_30px_90px_-45px_rgba(180,83,9,0.35)]"
                  }`}
                >
                  {/* top accent line */}
                  <div
                    aria-hidden="true"
                    className={`absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 transition-transform duration-700 ease-out group-hover:scale-x-100 ${
                      isFeatured
                        ? "bg-gradient-to-r from-amber-400 via-amber-300 to-transparent"
                        : "bg-gradient-to-r from-amber-700 via-amber-500 to-transparent"
                    }`}
                  />

                  {/* glow blob */}
                  <div
                    aria-hidden="true"
                    className={`absolute -right-16 -top-16 h-44 w-44 rounded-full blur-3xl transition-opacity duration-500 ${
                      isFeatured
                        ? "bg-amber-500/20 opacity-60"
                        : "bg-amber-700/10 opacity-0 group-hover:opacity-100"
                    }`}
                  />

                  <div className="flex items-start justify-between gap-4">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-xl border transition-transform duration-500 group-hover:scale-110 group-hover:rotate-[-4deg] ${
                        isFeatured
                          ? "border-white/15 bg-white/10 text-amber-300"
                          : "border-stone-200 bg-[#faf6ef] text-amber-800"
                      }`}
                    >
                      <Icon className="h-5 w-5 stroke-[1.7]" />
                    </div>
                  </div>

                  <div className="mt-6">
                    <div
                      className={`font-serif text-6xl font-medium leading-none tracking-tight sm:text-[4rem] ${
                        isFeatured ? "text-white" : "text-slate-950"
                      }`}
                    >
                      <CountUpValue value={item.value} />
                    </div>

                    <h3
                      className={`mt-5 text-lg font-semibold tracking-tight ${
                        isFeatured ? "text-white" : "text-slate-950"
                      }`}
                    >
                      {item.label}
                    </h3>
                    <p
                      className={`mt-2 text-sm leading-6 ${
                        isFeatured ? "text-white/65" : "text-slate-600"
                      }`}
                    >
                      {item.detail}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>

      <style>{`
        .milestone-card {
          opacity: 0;
          transform: translateY(24px);
          animation: milestoneIn 0.8s ease-out forwards;
        }
        @keyframes milestoneIn {
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </SectionReveal>
  );
}
