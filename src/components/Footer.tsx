import { useRef } from "react";
import { ArrowRight, Mail, MapPin } from "lucide-react";
import { FiInstagram } from "react-icons/fi";
import { Link } from "react-router";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useCurrentYear } from "../hooks/useCurrentYear";
import { primaryContactPhoneHref } from "../utils/contact";

type ContactBlock = {
  label: string;
  value: string;
  href?: string;
};

const footerLinks = [
  { label: "Home Furniture", href: "/products/home-furniture" },
  { label: "Office Furniture", href: "/products/office-furniture" },
  { label: "Sourcing", href: "/sourcing" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
] as const;

const contactBlocks: ContactBlock[] = [
  {
    label: "Address",
    value:
      "833/64, 8-3, Kamalapuri Colony Road, Srinagar Colony Ext, Banjara Hills, Hyderabad",
  },
  {
    label: "Email",
    value: "info@postureindia.com",
    href: "mailto:info@postureindia.com",
  },
] as const;

const socialLinks = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/posturehomes/",
    icon: FiInstagram,
  },
  {
    label: "Email",
    href: "mailto:info@postureindia.com",
    icon: Mail,
  },
] as const;

function Footer() {
  const year = useCurrentYear();
  const footerRef = useRef<HTMLElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ["start end", "end end"],
  });

  const revealProgress = useSpring(scrollYProgress, {
    stiffness: 130,
    damping: 26,
    mass: 0.6,
  });

  const scale = useTransform(revealProgress, [0, 1], [0.94, 1]);
  const opacity = useTransform(revealProgress, [0, 0.25, 1], [0, 0.72, 1]);
  const y = useTransform(revealProgress, [0, 1], [88, 0]);

  return (
    <footer ref={footerRef} className="relative z-10 -mt-8 bg-transparent sm:-mt-10">
      <motion.div
        style={{ scale, opacity, y, transformOrigin: "center bottom" }}
        className="w-full overflow-hidden rounded-t-[28px] bg-slate-800 text-white sm:rounded-t-[32px]"
      >
        <div className="mx-auto max-w-[1400px] px-8 py-10 sm:px-10 sm:py-12 lg:px-14 lg:py-16">
          <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <h2 className="max-w-[7ch] text-[3.25rem] leading-[0.9] text-[#f5efe4] sm:text-[4.5rem] lg:text-[6.5rem]">
                Have a project in mind?
              </h2>

              <a
                href={primaryContactPhoneHref}
                className="mt-8 inline-flex items-center gap-2 rounded-[8px] bg-amber-600 px-6 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-white transition duration-300 hover:bg-amber-500"
              >
                Book a consultation
                <ArrowRight className="h-4 w-4" />
              </a>

              <div className="mt-12 grid gap-8 sm:max-w-xl sm:grid-cols-2">
                {contactBlocks.map((item) => (
                  <div key={item.label}>
                    <p className="text-[0.68rem] font-semibold uppercase tracking-[0.26em] text-slate-400">
                      {item.label}
                    </p>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="mt-3 block text-lg leading-8 text-slate-100 transition duration-300 hover:text-white"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="mt-3 text-lg leading-8 text-slate-100">
                        {item.value}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col justify-between gap-12 lg:items-end">
              <nav aria-label="Footer" className="lg:text-right">
                <ul className="space-y-5">
                  {footerLinks.map((link) => (
                    <li key={link.href}>
                      <Link
                        to={link.href}
                        className="text-2xl font-semibold text-slate-100 transition duration-300 hover:text-amber-300"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>

              <div className="lg:text-right">
                <p className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-slate-400">
                  Connect with us
                </p>
                <div className="mt-4 flex items-center gap-3 lg:justify-end">
                  {socialLinks.map((item) => {
                    const Icon = item.icon;

                    return (
                      <a
                        key={item.label}
                        href={item.href}
                        target={item.href.startsWith("http") ? "_blank" : undefined}
                        rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                        aria-label={item.label}
                        className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-amber-600 text-white transition duration-300 hover:bg-amber-500"
                      >
                        <Icon className="h-5 w-5" />
                      </a>
                    );
                  })}
                </div>

             
              </div>
            </div>
          </div>

          <div className="mt-12 border-t border-slate-700 pt-6 text-sm text-slate-400">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p>&copy; {year} Posture. All rights reserved.</p>
              <p>Terms & Privacy</p>
            </div>
          </div>
        </div>
      </motion.div>
    </footer>
  );
}

export default Footer;
