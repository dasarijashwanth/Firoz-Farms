import { Leaf, ShieldCheck, HeartHandshake, Sparkles } from "lucide-react";

const promises = [
  {
    icon: Leaf,
    title: "100% Natural",
    description: "No synthetic additives, ever — just what nature intended.",
  },
  {
    icon: Sparkles,
    title: "Farm Fresh",
    description: "Delivered within hours of harvest and milking, every single day.",
  },
  {
    icon: ShieldCheck,
    title: "No Chemicals",
    description: "Zero pesticides, hormones, or antibiotics across our farm.",
  },
  {
    icon: HeartHandshake,
    title: "Healthy Cows",
    description: "Open pastures, natural feed, and genuine animal welfare.",
  },
];

export function WhyChooseUs() {
  return (
    <section className="bg-cream py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="font-button text-sm font-semibold uppercase tracking-widest text-gold">
            Our Promise
          </span>
          <h2 className="mt-3 font-heading text-3xl font-bold text-organic-green-dark sm:text-4xl">
            Why Families Choose Firoz Farms
          </h2>
        </div>
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {promises.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="flex flex-col items-center rounded-2xl border border-border bg-card p-6 text-center transition-transform hover:-translate-y-1"
            >
              <div className="flex size-14 items-center justify-center rounded-full bg-organic-green/10 text-organic-green">
                <Icon className="size-7" />
              </div>
              <h3 className="mt-4 font-heading text-lg font-semibold text-foreground">
                {title}
              </h3>
              <p className="mt-2 font-sans text-sm text-muted-foreground">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
