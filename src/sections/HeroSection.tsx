import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router";

const buttonGlowVariants = {
  rest: { x: "-140%", opacity: 0 },
  hover: { x: "140%", opacity: 1 },
};

type HeroButtonProps = {
  href: string;
  label: string;
  primary?: boolean;
};

function HeroButton({ href, label, primary = false }: HeroButtonProps) {
  return (
    <motion.a
      href={href}
      initial="rest"
      whileHover="hover"
      whileTap={{ scale: 0.99 }}
      transition={{ duration: 0.22, ease: "easeOut" }}
      className={`group relative inline-flex overflow-hidden rounded-full border px-6 py-3 text-sm font-semibold transition duration-300 ${
        primary
          ? "border-white/20 bg-white text-slate-950 shadow-[0_16px_50px_-24px_rgba(255,255,255,0.8)]"
          : "border-white/20 bg-white/8 text-white backdrop-blur-md"
      }`}
    >
      <motion.span
        variants={buttonGlowVariants}
        transition={{ duration: 0.55, ease: "easeOut" }}
        className={`absolute inset-y-0 left-0 w-20 -skew-x-12 blur-xl ${
          primary ? "bg-amber-300/70" : "bg-white/40"
        }`}
      />
      <motion.span
        whileHover={{ y: -1 }}
        className="relative z-10 inline-flex items-center gap-2"
      >
        {label}
        {primary ? <ArrowRight className="h-4 w-4" /> : null}
      </motion.span>
    </motion.a>
  );
}

function HeroSection() {
  return (
    <section
      id="home"
      className="relative overflow-hidden border-b border-slate-900 bg-[linear-gradient(180deg,#0b111b_0%,#111827_100%)]"
    >
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0, scale: 1.02 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url(/home-furniture-hero.jpg)" }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,10,18,0.14)_0%,rgba(6,10,18,0.04)_22%,rgba(6,10,18,0.06)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(15,23,42,0.82)_5%,rgba(15,23,42,0.48)_42%,rgba(15,23,42,0.18)_100%)]" />

      <div className="relative mx-auto flex min-h-[calc(100svh-81px)] max-w-6xl flex-col justify-center px-6 py-18 sm:py-24 lg:py-28">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.42, ease: "easeOut" }}
          className="max-w-4xl text-white"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-amber-200">
            Posture Homes
          </p>
          <h1 className="mt-5 max-w-4xl text-[2.5rem] font-semibold leading-tight tracking-tight text-white sm:text-[3.6rem] lg:text-[4.6rem]">
            Premium furniture for homes, offices, and sourcing-led projects.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-slate-200 sm:text-lg">
            Discover refined residential collections, workplace furniture, and
            sourcing support built around quality, craftsmanship, and project
            clarity.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <HeroButton
              href="#collections"
              label="Explore categories"
              primary
            />
            <HeroButton href="#contact" label="Contact us" />
          </div>

          <div className="mt-10 flex flex-wrap gap-3 text-sm text-slate-200/90">
            <Link
              to="/products/office-furniture"
              className="rounded-full border border-white/16 bg-white/10 px-4 py-2 backdrop-blur-md transition duration-300 hover:bg-white/16"
            >
              Office furniture
            </Link>
            <Link
              to="/products/home-furniture"
              className="rounded-full border border-white/16 bg-white/10 px-4 py-2 backdrop-blur-md transition duration-300 hover:bg-white/16"
            >
              Home furniture
            </Link>
            <Link
              to="/sourcing"
              className="rounded-full border border-white/16 bg-white/10 px-4 py-2 backdrop-blur-md transition duration-300 hover:bg-white/16"
            >
              Sourcing
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default HeroSection;
