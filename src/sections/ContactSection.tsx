const locations = [
  {
    name: 'Posture Homes Banjara Hills',
    type: 'Furniture store',
    specialty: 'Home furniture',
    reviews: 'Google rating 5.0 from 16 reviews',
    address:
      '833/64, 8-3, Kamalapuri Colony Road, Srinagar Colony Ext, Banjara Hills, Hyderabad, Telangana 500073',
    mapQuery:
      '833/64, 8-3, Kamalapuri Colony Rd, Srinagar Colony Ext, Banjara Hills, Hyderabad, Telangana 500073',
  },
  {
    name: 'Posture Furniture Gachibowli',
    type: 'Office furniture store',
    specialty: 'Office furniture',
    reviews: 'Google rating 5.0 from 144 reviews',
    address:
      'Plot No: 25, 2nd Floor, PNR Square, 01, beside Jeep Showroom, Gachibowli, Serilingampalle, Hyderabad, Telangana 500032',
    mapQuery:
      'Plot No: 25, 2nd Floor, PNR Square, beside Jeep Showroom, Gachibowli, Hyderabad, Telangana 500032',
  },
]

function ContactSection() {
  return (
    <section id="contact" className="bg-white">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <header className="max-w-2xl">
          <h2 className="text-2xl font-semibold text-slate-900">
            Visit or call our stores
          </h2>
          <p className="mt-3 text-slate-600">
            Reach out for product guidance, delivery information, or showroom
            visits in Hyderabad.
          </p>
        </header>
        <div className="mt-8 grid gap-4 lg:grid-cols-2">
          {locations.map((location) => (
            <article
              key={location.name}
              className="overflow-hidden rounded-2xl border border-slate-200"
            >
              <div className="aspect-[4/3] w-full border-b border-slate-200 bg-slate-100">
                <iframe
                  title={`${location.name} map`}
                  src={`https://www.google.com/maps?q=${encodeURIComponent(location.mapQuery)}&z=16&output=embed`}
                  className="h-full w-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              <address className="p-6 not-italic text-slate-600">
                <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">
                  {location.specialty}
                </p>
                <h3 className="mt-3 text-lg font-medium text-slate-900">
                  {location.name}
                </h3>
                <p className="mt-2 text-sm leading-6">{location.type}</p>
                <p className="mt-2 text-sm leading-6">{location.reviews}</p>
                <p className="mt-4 text-sm leading-6">{location.address}</p>
                <p className="mt-4 text-sm leading-6">
                  Phone: <a href="tel:+919903889394">+91 99038 89394</a>
                </p>
                <p className="mt-2 text-sm leading-6">
                  Service options: Same-day delivery
                </p>
                <p className="mt-2 text-sm leading-6">
                  Hours listed: Open until 8:00 PM
                </p>
              </address>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ContactSection
