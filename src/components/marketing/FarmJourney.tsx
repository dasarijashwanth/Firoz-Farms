const steps = [
  { title: "Feed Preparation", description: "Natural, farm-grown feed prepared fresh daily." },
  { title: "Cow Care", description: "Open pastures, regular checkups, stress-free living." },
  { title: "Milking", description: "Hygienic milking by hand and machine, every morning." },
  { title: "Quality Testing", description: "Every batch tested for purity before packaging." },
  { title: "Cooling & Packaging", description: "Chilled within 30 minutes to lock in freshness." },
  { title: "Delivery", description: "On your doorstep within hours, not days." },
];

export function FarmJourney() {
  return (
    <section className="bg-beige py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="font-button text-sm font-semibold uppercase tracking-widest text-earth-brown">
            How We Deliver
          </span>
          <h2 className="mt-3 font-heading text-3xl font-bold text-organic-green-dark sm:text-4xl">
            Our Farm-to-Home Journey
          </h2>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-6">
          {steps.map((step, i) => (
            <div key={step.title} className="relative flex flex-col items-center text-center">
              <div className="flex size-12 items-center justify-center rounded-full bg-organic-green font-heading text-lg font-semibold text-white">
                {i + 1}
              </div>
              <h3 className="mt-4 font-heading text-base font-semibold text-foreground">
                {step.title}
              </h3>
              <p className="mt-1.5 font-sans text-sm text-muted-foreground">
                {step.description}
              </p>
              {i < steps.length - 1 && (
                <div className="absolute right-[-12px] top-6 hidden h-px w-6 bg-earth-brown/40 lg:block" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
