import ContactForm from "../components/ContactForm";
import SectionReveal from "../components/SectionReveal";

const locations = [
  {
    name: "Posture Homes Banjara Hills",
    type: "Furniture store",
    specialty: "Home furniture",
    address:
      "833/64, 8-3, Kamalapuri Colony Road, Srinagar Colony Ext, Banjara Hills, Hyderabad, Telangana 500073",
    mapQuery:
      "833/64, 8-3, Kamalapuri Colony Rd, Srinagar Colony Ext, Banjara Hills, Hyderabad, Telangana 500073",
    directionsUrl:
      "https://www.google.com/maps/search/?api=1&query=833/64,+8-3,+Kamalapuri+Colony+Road,+Srinagar+Colony+Ext,+Banjara+Hills,+Hyderabad,+Telangana+500073",
  },
  {
    name: "Posture Furniture Gachibowli",
    type: "Office furniture store",
    specialty: "Office furniture",
    address:
      "Plot No: 25, 2nd Floor, PNR Square, 01, beside Jeep Showroom, Gachibowli, Serilingampalle, Hyderabad, Telangana 500032",
    mapQuery:
      "POSTURE FURNITURE Gachibowli, Plot No: 25, 2nd Floor, PNR Square, 01, beside Jeep Showroom, Gachibowli, Serilingampalle (M), Hyderabad, Telangana 500032",
    directionsUrl:
      "https://www.google.com/maps/search/?api=1&query=POSTURE+FURNITURE+Gachibowli,+Plot+No:+25,+2nd+Floor,+PNR+Square,+01,+beside+Jeep+Showroom,+Gachibowli,+Serilingampalle+(M),+Hyderabad,+Telangana+500032",
  },
];

function ContactSection() {
  return (
    <SectionReveal id="contact" className="bg-white">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <header className="max-w-2xl">
          <h2 className="text-2xl font-semibold text-slate-900">Contact us</h2>
          <p className="mt-3 text-slate-600">
            Send your sourcing requirement through the form or connect directly
            with our Hyderabad locations.
          </p>
        </header>
        <div className="mt-8">
          <ContactForm />
        </div>
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {locations.map((location) => (
            <article
              key={location.name}
              className="overflow-hidden rounded-[2rem] border border-stone-200 bg-[#fbf7f1] shadow-[0_24px_60px_-40px_rgba(15,23,42,0.24)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_30px_80px_-36px_rgba(15,23,42,0.28)]"
            >
              <div className="relative aspect-[5/4] w-full overflow-hidden border-b border-stone-200 bg-stone-100">
                <iframe
                  title={`${location.name} map`}
                  src={`https://www.google.com/maps?q=${encodeURIComponent(location.mapQuery)}&z=16&output=embed`}
                  className="h-full w-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-slate-950/18 to-transparent" />
              </div>
              <address className="p-7 not-italic text-slate-600">
                <div>
                  <h3 className="mt-2 text-[2rem] leading-tight text-slate-950">
                    {location.name}
                  </h3>
                </div>

                <p className="mt-5 text-base leading-8 text-slate-700">
                  {location.address}
                </p>

                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <a
                    href="tel:+919903889394"
                    className="inline-flex items-center rounded-full border border-stone-300 bg-white/70 px-4 py-2.5 text-sm font-semibold text-slate-900 transition duration-300 hover:border-slate-900 hover:bg-white"
                  >
                    +91 99038 89394
                  </a>
                  <a
                    href={location.directionsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center rounded-full bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white transition duration-300 hover:bg-slate-800"
                  >
                    Get directions
                  </a>
                </div>
              </address>
            </article>
          ))}
        </div>
      </div>
    </SectionReveal>
  );
}

export default ContactSection;
