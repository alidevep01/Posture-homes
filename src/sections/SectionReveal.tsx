import { useEffect, useRef, useState, type ReactNode } from "react";

interface SectionRevealProps {
  children: ReactNode;
  className?: string;
  revealMode?: "default" | "footer";
}

export default function SectionReveal({
  children,
  className = "",
  revealMode = "default",
}: SectionRevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: revealMode === "footer" ? 0.05 : 0.15 },
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, [revealMode]);

  return (
    <section
      ref={ref}
      className={`${className} transition-all duration-[900ms] ease-out ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      {children}
    </section>
  );
}
