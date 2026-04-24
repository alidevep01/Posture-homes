import {
  LuArrowRight as ArrowRight,
  LuFileText as FileText,
  LuGlobe as Globe2,
  LuLockKeyhole as LockKeyhole,
  LuMail as Mail,
  LuMapPin as MapPin,
  LuShieldCheck as ShieldCheck,
  LuUsers as Users,
} from "react-icons/lu";
import { Link } from "react-router";
import SectionReveal from "../components/SectionReveal";
import Seo from "../components/Seo";
import { primaryContactPhoneHref } from "../utils/contact";

const termsItems = [
  "This website is provided for general information about Posture India, its furniture offerings, sourcing support, and contact channels.",
  "Product descriptions, images, service details, showroom information, and availability may change without notice as projects and collections evolve.",
  "Any estimate or quote shared through the website, phone, email, or WhatsApp is indicative until scope, quantities, finishes, timelines, and delivery conditions are confirmed.",
  "Any purchase order, invoice, or written agreement for a project will govern the final commercial and service terms for that engagement.",
  "All text, photos, graphics, logos, and page layouts on this site are owned by Posture India or used with permission and may not be reused without consent.",
  "Do not misuse forms, try to interfere with the website, or use the site for unlawful, harmful, or misleading activity.",
] as const;

const privacyItems = [
  "We collect only the information you choose to share with us, such as your name, phone number, email address, message, and project details submitted through forms or direct communication.",
  "We use that information to respond to enquiries, prepare quotes, coordinate meetings or site discussions, and provide service updates related to your request.",
  "Your information may be shared with trusted service providers that help us operate the website or communicate with you, such as email delivery services and embedded third-party tools.",
  "If you interact with external services linked from our site, including Google Maps, Instagram, WhatsApp, or other third-party platforms, their own privacy policies and cookie practices apply.",
  "We keep enquiry records for as long as needed to respond to your request, maintain business records, or meet legal and operational requirements.",
  "This website is not intended for children under 13, and we do not knowingly collect personal information from children.",
] as const;

const dataPoints = [
  {
    icon: Users,
    title: "Information you provide",
    description:
      "Name, phone number, email address, message content, and project details from our contact forms or direct messages.",
  },
  {
    icon: Globe2,
    title: "Third-party services",
    description:
      "EmailJS for form delivery, plus external platforms such as Google Maps, Instagram, and WhatsApp when you open or use them.",
  },
  {
    icon: LockKeyhole,
    title: "Security and retention",
    description:
      "We use reasonable safeguards and keep enquiries only as long as needed for business, service, or legal purposes.",
  },
  {
    icon: ShieldCheck,
    title: "Your choices",
    description:
      "You can contact us to ask about the information we hold or to request corrections or removal where appropriate.",
  },
] as const;

function LegalPage() {
  return (
    <main className="bg-[#fafafa]">
      <Seo
        title="Terms & Privacy | Posture India"
        description="Read the terms of use and privacy policy for Posture India, including how we handle contact form data and third-party services."
        canonicalPath="/legal"
        image="/home-furniture-hero.jpg"
        imageAlt="Posture India legal policies"
        keywords={[
          "Posture India terms",
          "Posture India privacy policy",
          "furniture website policy",
          "Hyderabad furniture company",
        ]}
      />

      <SectionReveal className="border-b border-slate-200 bg-[radial-gradient(circle_at_top,#f6efe4_0%,#ffffff_52%,#ffffff_100%)]">
        <div className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
          <div className="max-w-4xl">
            <p className="text-sm font-semibold uppercase tracking-[0.26em] text-amber-700">
              Terms & Privacy
            </p>
            <h1 className="mt-6 max-w-4xl text-4xl leading-tight text-slate-950 sm:text-5xl lg:text-6xl">
              The rules for using our website and the way we handle information
              you share with us.
            </h1>
            <p className="mt-6 max-w-3xl text-base leading-8 text-slate-600 sm:text-lg">
              This page explains how the Posture India website works, what
              information we collect when you contact us, and how we use that
              information to respond to enquiries and support projects.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                to="/"
                className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition duration-300 hover:bg-slate-800"
              >
                Back to home
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href={primaryContactPhoneHref}
                className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition duration-300 hover:border-slate-900 hover:bg-slate-50"
              >
                Call us
              </a>
            </div>
          </div>
        </div>
      </SectionReveal>

      <SectionReveal className="border-b border-slate-200 bg-[#fafafa]">
        <div className="mx-auto max-w-6xl px-6 py-18 sm:py-20">
          <div className="grid gap-8 lg:grid-cols-2">
            <article className="rounded-[2rem] border border-stone-200 bg-white p-8 shadow-[0_30px_80px_-40px_rgba(15,23,42,0.22)]">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#f6efe4] text-slate-950">
                  <FileText className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.22em] text-amber-700">
                    Terms of use
                  </p>
                  <p className="text-sm text-slate-500">Website and enquiry rules</p>
                </div>
              </div>

              <ul className="mt-6 space-y-4">
                {termsItems.map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-7 text-slate-600">
                    <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-amber-600" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>

            <article className="rounded-[2rem] border border-stone-200 bg-white p-8 shadow-[0_30px_80px_-40px_rgba(15,23,42,0.22)]">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#f6efe4] text-slate-950">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.22em] text-amber-700">
                    Privacy policy
                  </p>
                  <p className="text-sm text-slate-500">How we handle personal information</p>
                </div>
              </div>

              <ul className="mt-6 space-y-4">
                {privacyItems.map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-7 text-slate-600">
                    <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-slate-900" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </div>
      </SectionReveal>

      <SectionReveal className="border-b border-slate-200 bg-[#fafafa]">
        <div className="mx-auto max-w-6xl px-6 py-18 sm:py-20">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">
              Data handling
            </p>
            <h2 className="mt-4 text-3xl leading-tight text-slate-950 sm:text-4xl">
              What we collect, why we collect it, and how we use it.
            </h2>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {dataPoints.map((point) => {
              const Icon = point.icon;

              return (
                <article
                  key={point.title}
                  className="rounded-[1.75rem] border border-stone-200 bg-white p-6 shadow-[0_24px_60px_-46px_rgba(15,23,42,0.25)]"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#f6efe4] text-slate-950">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 text-xl text-slate-950">{point.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    {point.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </SectionReveal>

      <SectionReveal className="bg-[#fafafa]">
        <div className="mx-auto max-w-6xl px-6 py-18 sm:py-20">
          <div className="rounded-[2rem] border border-stone-200 bg-white px-8 py-10 shadow-[0_30px_80px_-40px_rgba(15,23,42,0.22)] sm:px-10">
            <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">
                  Contact
                </p>
                <h2 className="mt-4 text-3xl leading-tight text-slate-950 sm:text-4xl">
                  Questions about these terms or your data?
                </h2>
                <p className="mt-4 max-w-2xl text-base leading-8 text-slate-600">
                  Reach out to us if you want to ask about a quote, a project,
                  or the information we keep after you contact us.
                </p>
              </div>

              <div className="space-y-4">
                <div className="rounded-[1.5rem] border border-stone-200 bg-white px-5 py-4">
                  <div className="flex items-center gap-2 text-sm font-semibold text-slate-950">
                    <Mail className="h-4 w-4 text-amber-700" />
                    Email
                  </div>
                  <a
                    href="mailto:info@postureindia.com"
                    className="mt-2 block text-sm leading-7 text-slate-600 transition duration-300 hover:text-slate-900"
                  >
                    info@postureindia.com
                  </a>
                </div>
                <div className="rounded-[1.5rem] border border-stone-200 bg-white px-5 py-4">
                  <div className="flex items-center gap-2 text-sm font-semibold text-slate-950">
                    <MapPin className="h-4 w-4 text-amber-700" />
                    Hyderabad
                  </div>
                  <p className="mt-2 text-sm leading-7 text-slate-600">
                    Banjara Hills and Gachibowli locations serving residential
                    and office projects.
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

export default LegalPage;
