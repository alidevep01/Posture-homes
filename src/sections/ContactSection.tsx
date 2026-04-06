import { MapPin, Phone } from "lucide-react";
import { FaInstagram } from "react-icons/fa";
import SectionReveal from "../components/SectionReveal";

const locations = [
  {
    name: "Posture Homes Banjara Hills",
    specialty: "Home furniture",
    mapQuery: "Posture Homes Banjara Hills, Hyderabad",
    directionsUrl:
      "https://www.google.com/maps/search/?api=1&query=Posture+Homes+Banjara+Hills+Hyderabad",
  },
  {
    name: "Posture Furniture Gachibowli",
    specialty: "Office furniture",
    mapQuery: "Posture Furniture Gachibowli, Hyderabad",
    directionsUrl:
      "https://www.google.com/maps/search/?api=1&query=Posture+Furniture+Gachibowli+Hyderabad",
  },
];

function ContactSection() {
  return (
    <SectionReveal id="contact" className="bg-[#fafafa]">
      <div className="mx-auto max-w-5xl px-6 py-16">
        {/* Header */}
        <header className="text-center">
          <h2 className="text-2xl font-semibold text-slate-900">Contact us</h2>
          <p className="mt-3 text-slate-600">
            Reach out to us directly or visit our stores in Hyderabad.
          </p>
        </header>

        {/* Contact Info */}
        <div className="mt-8 flex flex-col items-center gap-4 text-center">
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="tel:+919903889394"
              className="flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium"
            >
              <Phone className="h-4 w-4" />
              Mr Aditya Dugar - 9903889394
            </a>

            <a
              href="tel:+919748545956"
              className="flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium"
            >
              <Phone className="h-4 w-4" />
              Mrs Namraja Dugar - 9748545956
            </a>
          </div>

          <div className="flex gap-4">
            <a
              href="https://www.instagram.com/posturehomes/"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-sm font-medium text-pink-600 hover:underline"
            >
              <FaInstagram className="h-4 w-4" />
              @posturehomes
            </a>

            <a
              href="https://www.instagram.com/posturefurniture/"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-sm font-medium text-pink-600 hover:underline"
            >
              <FaInstagram className="h-4 w-4" />
              @postureFurniture
            </a>
          </div>
        </div>

        {/* Locations */}
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {locations.map((location) => (
            <article
              key={location.name}
              className="overflow-hidden rounded-2xl border bg-white shadow-sm"
            >
              {/* Smaller Map */}
              <div className="h-48 w-full">
                <iframe
                  title={location.name}
                  src={`https://www.google.com/maps?q=${encodeURIComponent(
                    location.mapQuery,
                  )}&z=15&output=embed`}
                  className="h-full w-full"
                  loading="lazy"
                />
              </div>

              {/* Info */}
              <div className="p-5">
                <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-amber-700">
                  <MapPin className="h-4 w-4" />
                  {location.specialty}
                </div>

                <h3 className="mt-2 text-lg font-semibold text-slate-900">
                  {location.name}
                </h3>

                <a
                  href={location.directionsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-block text-sm font-medium text-slate-900 underline"
                >
                  Get directions →
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
