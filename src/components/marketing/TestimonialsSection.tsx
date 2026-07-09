import { db } from "@/lib/db";
import { TestimonialsCarousel } from "./TestimonialsCarousel";

export async function TestimonialsSection() {
  const testimonials = await db.testimonial.findMany({
    where: { isFeatured: true },
    take: 6,
  });

  if (testimonials.length === 0) return null;

  return (
    <section className="bg-organic-green-dark py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="font-button text-sm font-semibold uppercase tracking-widest text-gold">
            Farmer Stories, Customer Love
          </span>
          <h2 className="mt-3 font-heading text-3xl font-bold text-white sm:text-4xl">
            What Our Families Say
          </h2>
        </div>
        <div className="mt-12">
          <TestimonialsCarousel testimonials={testimonials} />
        </div>
      </div>
    </section>
  );
}
