import type { Metadata } from "next";
import { GalleryGrid, type GalleryItem } from "@/components/marketing/GalleryGrid";
import { siteInfo } from "@/data/placeholder/site";

export const metadata: Metadata = {
  title: "Gallery | Firoz Farms",
  description:
    "A visual tour of Firoz Farms — drone views, open pastures, our herd, harvest days, products, and the families we serve in Khammam District, Telangana.",
};

const galleryItems: GalleryItem[] = [
  { seed: "gallery-drone-farm-overview", alt: "Aerial drone view of Firoz Farms", category: "Drone Views", size: "large" },
  { seed: "gallery-farm-gate-sunrise", alt: "Sunrise over the Firoz Farms gate", category: "Farm Photos" },
  { seed: "gallery-cow-grazing-1", alt: "Gir cow grazing in open pasture", category: "Animals" },
  { seed: "gallery-green-fields-1", alt: "Rows of green fodder crops", category: "Green Fields", size: "wide" },
  { seed: "gallery-herd-walking", alt: "Herd walking home at dusk", category: "Animals" },
  { seed: "gallery-milking-shed", alt: "Morning milking at the dairy shed", category: "Farm Photos" },
  { seed: "gallery-harvest-hands", alt: "Farmhands harvesting fresh fodder", category: "Harvest" },
  { seed: "gallery-drone-pastures", alt: "Drone view of the grazing pastures", category: "Drone Views" },
  { seed: "gallery-milk-bottles", alt: "Freshly packed bottles of milk", category: "Products", size: "wide" },
  { seed: "gallery-ghee-jars", alt: "Jars of farm-made ghee", category: "Products" },
  { seed: "gallery-calf-closeup", alt: "A young calf resting in the shade", category: "Animals" },
  { seed: "gallery-farm-pond", alt: "Rainwater harvesting pond on the farm", category: "Green Fields" },
  { seed: "gallery-harvest-cart", alt: "Cart loaded with harvested fodder", category: "Harvest", size: "wide" },
  { seed: "gallery-family-delivery", alt: "Delivering fresh milk to a family doorstep", category: "Customers" },
  { seed: "gallery-happy-customer", alt: "A happy customer with their weekly order", category: "Customers" },
  { seed: "gallery-farm-open-day", alt: "Visitors touring the farm on open day", category: "Events", size: "large" },
  { seed: "gallery-festival-stall", alt: "Firoz Farms stall at a local food festival", category: "Events" },
  { seed: "gallery-paneer-block", alt: "Freshly cut blocks of paneer", category: "Products" },
  { seed: "gallery-sunset-fields", alt: "Sunset over the Firoz Farms fields", category: "Green Fields" },
  { seed: "gallery-drone-herd-aerial", alt: "Aerial view of the herd grazing at dusk", category: "Drone Views" },
];

export default function GalleryPage() {
  return (
    <>
      <section className="bg-organic-green-dark py-20 text-white sm:py-24">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <span className="font-button text-sm font-semibold uppercase tracking-widest text-gold">
            Behind the Scenes
          </span>
          <h1 className="mt-4 font-heading text-4xl font-bold leading-tight sm:text-5xl">
            Life at Firoz Farms
          </h1>
          <p className="mt-5 font-sans text-lg text-white/85">
            From drone views of our pastures to the families we deliver to every
            morning — take a visual tour of the farm in {siteInfo.address.city},{" "}
            {siteInfo.address.state}.
          </p>
        </div>
      </section>

      <section className="bg-cream py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <GalleryGrid items={galleryItems} />
        </div>
      </section>
    </>
  );
}
