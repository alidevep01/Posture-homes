const steps = [
  'Choose the room, style, and furniture pieces you want to focus on first.',
  'Review curated recommendations that fit your layout and everyday routine.',
  'Place your order and coordinate delivery for a smooth setup experience.',
]

function ProcessSection() {
  return (
    <section id="process" className="border-b border-slate-200 bg-white">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <header className="max-w-2xl">
          <h2 className="text-2xl font-semibold text-slate-900">
            How it works
          </h2>
          <p className="mt-3 text-slate-600">
            Keep the buying journey clear and easy to scan.
          </p>
        </header>
        <ol className="mt-8 grid gap-4 lg:grid-cols-3">
          {steps.map((step, index) => (
            <li
              key={step}
              className="rounded-2xl border border-slate-200 p-6"
            >
              <p className="text-sm font-medium text-slate-500">
                Step {index + 1}
              </p>
              <p className="mt-3 text-base leading-7 text-slate-900">{step}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

export default ProcessSection
