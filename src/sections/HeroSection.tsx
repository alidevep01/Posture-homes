import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const heroSlides = [
  {
    image: "/home-furniture-hero.jpg",
    title: "Premium Home Furniture",
    buttonLabel: "Explore Home Furniture",
  },
  {
    image: "/office-furniture.jpg",
    title: "Premium Office Furniture for Modern Workspaces",
    buttonLabel: "Explore Office Furniture",
  },
  {
    image: "/custom-furniture.jpg",
    title: "Custom Furniture Built Around Your Vision",
    buttonLabel: "Explore Custom Furniture",
  },
] as const;

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
      className={`group relative inline-flex overflow-hidden rounded-full border px-6 py-3 text-sm font-medium transition duration-300 ${
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
      </motion.span>
    </motion.a>
  );
}

function HeroSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % heroSlides.length);
    }, 5000);

    return () => window.clearInterval(intervalId);
  }, []);

  const currentSlide = heroSlides[activeIndex];

  const goToSlide = (index: number) => setActiveIndex(index);
  const goToPrevious = () =>
    setActiveIndex(
      (current) => (current - 1 + heroSlides.length) % heroSlides.length,
    );
  const goToNext = () =>
    setActiveIndex((current) => (current + 1) % heroSlides.length);

  return (
    <section
      id="home"
      className="relative overflow-hidden border-b border-slate-900 bg-[linear-gradient(180deg,#0b111b_0%,#111827_100%)]"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide.image}
          aria-hidden="true"
          initial={{ opacity: 0, scale: 1.03 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.01 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${currentSlide.image})` }}
        />
      </AnimatePresence>
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,10,18,0.14)_0%,rgba(6,10,18,0.04)_22%,rgba(6,10,18,0.06)_100%)]" />

      <div className="relative mx-auto flex min-h-[calc(100svh-81px)] max-w-7xl flex-col justify-between px-6 py-10 sm:py-12 lg:py-14">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide.title}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -18 }}
            transition={{ duration: 0.42, ease: "easeOut" }}
            className="mx-auto mt-8 flex max-w-5xl flex-col items-center text-center text-white"
          >
            <h1 className="max-w-5xl text-[2rem] font-semibold leading-tight tracking-tight text-white sm:text-[3rem] lg:text-[4rem]">
              {currentSlide.title}
            </h1>
            <div className="mt-6">
              <HeroButton
                href="#products"
                label={currentSlide.buttonLabel}
                primary
              />
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="mt-auto flex flex-col items-end gap-4 self-end">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={goToPrevious}
              aria-label="Previous hero slide"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/16 bg-slate-950/44 text-white backdrop-blur-md transition duration-300 hover:bg-white/14"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={goToNext}
              aria-label="Next hero slide"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/16 bg-slate-950/44 text-white backdrop-blur-md transition duration-300 hover:bg-white/14"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          <div className="flex items-center justify-center gap-2">
            {heroSlides.map((slide, index) => (
              <button
                key={slide.image}
                type="button"
                aria-label={`Go to hero slide ${index + 1}`}
                aria-pressed={activeIndex === index}
                onClick={() => goToSlide(index)}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  activeIndex === index
                    ? "w-10 bg-white"
                    : "w-2.5 bg-white/32 hover:bg-white/55"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
