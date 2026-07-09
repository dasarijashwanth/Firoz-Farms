import type { Metadata } from "next";
import { Star, Users, CalendarClock } from "lucide-react";
import { db } from "@/lib/db";
import { TestimonialsGrid } from "@/components/marketing/TestimonialsGrid";

export const metadata: Metadata = {
  title: "Testimonials | Firoz Farms",
  description:
    "Read what families across Khammam District have to say about Firoz Farms' organic milk, ghee, curd, and paneer.",
};

const stats = [
  { icon: Users, value: "500+", label: "Happy Families" },
  { icon: Star, value: "4.8", label: "Average Rating" },
  { icon: CalendarClock, value: "6 Years", label: "Serving Khammam" },
];

export default async function TestimonialsPage() {
  const testimonials = await db.testimonial.findMany({
    orderBy: [{ isFeatured: "desc" }, { rating: "desc" }],
  });

  return (
    <>
      {/* Page intro */}
      <section className="bg-organic-green-dark py-20 text-white sm:py-24">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <span className="font-button text-sm font-semibold uppercase tracking-widest text-gold">
            Farmer Stories, Customer Love
          </span>
          <h1 className="mt-4 font-heading text-4xl font-bold leading-tight sm:text-5xl">
            What Our Families Say
          </h1>
          <p className="mt-5 font-sans text-lg text-white/85">
            Real words from real households across Khammam District who trust
            Firoz Farms for their daily dairy.
          </p>
        </div>
      </section>

      {/* Stats strip */}
      <section className="bg-organic-green-dark pb-16 text-white sm:pb-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-4 rounded-2xl bg-white/10 p-6 sm:grid-cols-3 sm:gap-0 sm:divide-x sm:divide-white/15 sm:p-8">
            {stats.map(({ icon: Icon, value, label }) => (
              <div key={label} className="flex flex-col items-center gap-2 text-center sm:px-6">
                <Icon className="size-6 text-gold" />
                <span className="font-heading text-2xl font-bold sm:text-3xl">{value}</span>
                <span className="font-sans text-xs uppercase tracking-wide text-white/75">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials grid */}
      <section className="bg-cream py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {testimonials.length === 0 ? (
            <p className="text-center font-sans text-sm text-muted-foreground">
              No testimonials yet — check back soon.
            </p>
          ) : (
            <TestimonialsGrid testimonials={testimonials} />
          )}
        </div>
      </section>
    </>
  );
}
