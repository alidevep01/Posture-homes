import { FiInstagram, FiLinkedin } from "react-icons/fi";
import {
  LuArrowRight as ArrowRight,
  LuMapPin as MapPin,
  LuPhone as Phone,
} from "react-icons/lu";
import SectionReveal from "../components/SectionReveal";

const contactPeople = [
  {
    name: "Posture Homes",
    phoneLabel: "+91 7815819394",
    phoneHref: "tel:+917815819394",
  },
  {
    name: "Posture Office Furniture",
    phoneLabel: "+91 7003746544",
    phoneHref: "tel:+917003746544",
  },
] as const;

const socialLinks = [
  {
    label: "@posturehomes",
    href: "https://www.instagram.com/posturehomes/",
    platform: "instagram",
  },
  {
    label: "@postureFurniture",
    href: "https://www.instagram.com/posturefurniture/",
    platform: "instagram",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/posture-home-office/",
    platform: "linkedin",
  },
] as const;

const locations = [
  {
    name: "Posture Homes(Banjara Hills)",
    specialty: "Home Furniture",
    address:
      "833/64, 8-3, Kamalapuri Colony Road, Srinagar Colony Ext, Banjara Hills, Hyderabad, Telangana 500073",
    mapQuery:
      "Posture Homes Banjara Hills, 833/64, 8-3, Kamalapuri Colony Road, Banjara Hills, Hyderabad",
    directionsUrl:
      "https://www.google.com/maps/search/?api=1&query=Posture+Homes+Banjara+Hills,+833/64,+8-3,+Kamalapuri+Colony+Road,+Banjara+Hills,+Hyderabad",
  },
  {
    name: "Posture Furniture(Gachibowli)",
    specialty: "Office Furniture",
    address:
      "Plot No: 25, 2nd Floor, PNR Square, 01, beside Jeep Showroom, Gachibowli, Serilingampalle, Hyderabad, Telangana 500032",
    mapQuery:
      "Posture Furniture Gachibowli, Plot No 25, PNR Square, Gachibowli, Hyderabad",
    directionsUrl:
      "https://www.google.com/maps/search/?api=1&query=Posture+Furniture+Gachibowli,+Plot+No+25,+PNR+Square,+Gachibowli,+Hyderabad",
  },
] as const;

function ContactSection({
  revealMode,
}: {
  revealMode?: "default" | "footer";
}) {
  return (
    <SectionReveal
      id="contact"
      revealMode={revealMode}
      className="bg-[#fafafa]"
    >
      <div className="mx-auto max-w-7xl px-6 py-18 sm:py-20">
        <header className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl leading-tight text-slate-950 sm:text-4xl">
            Contact us
          </h2>
          <p className="mt-4 text-base leading-8 text-slate-600 sm:text-lg">
            Reach out to us directly or visit our stores in Hyderabad.
          </p>
        </header>

        <div className="mt-10 flex flex-col items-center gap-5">
          <div className="flex flex-wrap items-center justify-center gap-4">
            {contactPeople.map((person) => (
              <a
                key={person.phoneHref}
                href={person.phoneHref}
                className="inline-flex items-center gap-3 rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900 shadow-[0_10px_30px_-22px_rgba(15,23,42,0.45)] transition duration-300 hover:-translate-y-0.5 hover:border-slate-900 hover:bg-slate-50"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f7f2ea] text-slate-900">
                  <Phone className="h-4 w-4" />
                </span>
                <span>
                  {person.name} - {person.phoneLabel}
                </span>
              </a>
            ))}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            {socialLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className={`inline-flex items-center gap-2 text-base font-semibold transition duration-300 ${
                  link.platform === "linkedin"
                    ? "text-[#0a66c2] hover:text-[#084d93]"
                    : "text-[#ff0f7b] hover:text-[#d60c67]"
                }`}
              >
                {link.platform === "linkedin" ? (
                  <FiLinkedin className="h-4 w-4" />
                ) : (
                  <FiInstagram className="h-4 w-4" />
                )}
                {link.label}
              </a>
            ))}
          </div>
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-2">
          {locations.map((location) => (
            <article
              key={location.name}
              className="overflow-hidden rounded-[2rem] border border-slate-300 bg-white shadow-[0_20px_60px_-35px_rgba(15,23,42,0.3)]"
            >
              <div className="relative overflow-hidden border-b border-slate-200">
                <div className="absolute left-5 top-5 z-10"></div>
                <iframe
                  title={`${location.name} map`}
                  src={`https://www.google.com/maps?q=${encodeURIComponent(location.mapQuery)}&z=15&output=embed`}
                  className="h-64 w-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              <div className="p-7 sm:p-8">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-amber-700">
                  <MapPin className="h-4 w-4" />
                  {location.specialty}
                </div>

                <h3 className="mt-4 text-3xl leading-tight text-slate-950">
                  {location.name}
                </h3>

                <p className="mt-4 max-w-xl text-sm leading-7 text-slate-600 sm:text-base">
                  {location.address}
                </p>

                <a
                  href={location.directionsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-6 inline-flex items-center gap-2 text-base font-semibold text-slate-900 underline decoration-slate-300 underline-offset-4 transition duration-300 hover:text-slate-700"
                >
                  Get directions
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </SectionReveal>
  );
}

export default ContactSection;
