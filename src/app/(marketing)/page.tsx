import { Hero } from "@/components/marketing/Hero";
import { WhyChooseUs } from "@/components/marketing/WhyChooseUs";
import { ProductsShowcase } from "@/components/marketing/ProductsShowcase";
import { FarmJourney } from "@/components/marketing/FarmJourney";
import { TestimonialsSection } from "@/components/marketing/TestimonialsSection";
import { NewsletterSection } from "@/components/marketing/NewsletterSection";
import { MapSection } from "@/components/marketing/MapSection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <WhyChooseUs />
      <ProductsShowcase
        eyebrow="Featured"
        title="This Week's Featured Picks"
        subtitle="Hand-picked favourites from our farm, fresh for your table."
        filter="featured"
      />
      <FarmJourney />
      <ProductsShowcase
        eyebrow="Customer Favourites"
        title="Our Best Sellers"
        subtitle="The dairy and grocery staples our families order again and again."
        filter="bestSeller"
      />
      <TestimonialsSection />
      <NewsletterSection />
      <MapSection />
    </>
  );
}
