import type { Metadata } from "next";
import Link from "next/link";
import {
  Award,
  Droplet,
  Heart,
  Leaf,
  Recycle,
  ShieldCheck,
  Sprout,
  Sun,
  Users,
  Thermometer,
  PackageCheck,
  Truck,
  FlaskConical,
  ClipboardCheck,
  Home as HomeIcon,
  Wheat,
  Snowflake,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SmartImage } from "@/components/shared/SmartImage";
import { siteInfo } from "@/data/placeholder/site";

export const metadata: Metadata = {
  title: "About Us | Firoz Farms",
  description:
    "The story, cows, farming practices, and organic process behind Firoz Farms — chemical-free dairy from Khammam District, Telangana.",
};

const values = [
  {
    icon: Users,
    title: "Farmer First",
    description:
      "Every decision starts with the wellbeing of the farmers and workers who make Firoz Farms possible.",
  },
  {
    icon: ShieldCheck,
    title: "Chemical Free",
    description:
      "No synthetic pesticides, hormones, or antibiotics — ever. Purity is non-negotiable on our farm.",
  },
  {
    icon: Recycle,
    title: "Sustainable",
    description:
      "Rainwater harvesting, solar power, and biogas keep our footprint as light as our produce is wholesome.",
  },
  {
    icon: Heart,
    title: "Healthy Lifestyle",
    description:
      "We believe real dairy, grown honestly, is the foundation of a healthier family table.",
  },
];

const herd = [
  {
    seed: "our-cows-gir",
    breed: "Gir Cattle",
    description:
      "Native to Gujarat, our Gir cows are prized for their heat tolerance and rich, naturally A2 milk. They graze freely across our open pastures every day.",
  },
  {
    seed: "our-cows-sahiwal",
    breed: "Sahiwal Cattle",
    description:
      "A hardy indigenous breed from the Punjab region, Sahiwal cows are gentle, disease-resistant, and produce creamy, high-fat milk prized for ghee.",
  },
];

const farmingPractices = [
  {
    icon: Wheat,
    title: "Organic Feed",
    description: "Home-grown fodder and grain, free of chemical fertilisers and pesticides, grown right on our farmland.",
  },
  {
    icon: Sprout,
    title: "Sustainable Farming",
    description: "Crop rotation and natural composting keep our soil fertile without synthetic inputs, season after season.",
  },
  {
    icon: Droplet,
    title: "Rainwater Harvesting",
    description: "Farm ponds and recharge pits capture monsoon rainfall, reducing our dependence on groundwater year-round.",
  },
  {
    icon: Sun,
    title: "Solar Energy",
    description: "Rooftop solar panels power our chilling units and dairy equipment, cutting emissions at every step.",
  },
  {
    icon: Recycle,
    title: "Biogas",
    description: "Cattle waste is converted into biogas that fuels our farm kitchen and generators — nothing goes to waste.",
  },
  {
    icon: Leaf,
    title: "Open Pastures",
    description: "Our herd roams freely across shaded, grassy pastures instead of being confined — happier cows, better milk.",
  },
];

const organicSteps = [
  {
    icon: Wheat,
    title: "Feed Preparation",
    description: "Fresh, organic fodder is harvested and mixed daily from our own fields — no chemical additives.",
  },
  {
    icon: Heart,
    title: "Cow Care",
    description: "Each cow is checked for health, given open grazing time, and cared for with zero antibiotics or hormones.",
  },
  {
    icon: Droplet,
    title: "Milking",
    description: "Hygienic hand and machine milking every morning and evening, following strict cleanliness protocols.",
  },
  {
    icon: FlaskConical,
    title: "Quality Testing",
    description: "Every batch is lab-tested for purity, fat content, and adulteration before it moves any further.",
  },
  {
    icon: Snowflake,
    title: "Cooling",
    description: "Milk is chilled within 30 minutes of milking to lock in freshness and halt bacterial growth.",
  },
  {
    icon: PackageCheck,
    title: "Packaging",
    description: "Sealed in food-grade, tamper-proof packaging in a clean, hygienic packing area on the farm.",
  },
  {
    icon: Thermometer,
    title: "Cold Storage",
    description: "Packed products rest in temperature-controlled cold storage, never breaking the chill chain.",
  },
  {
    icon: Truck,
    title: "Transportation",
    description: "Refrigerated vehicles carry every order from our farm gate to your neighbourhood without delay.",
  },
  {
    icon: HomeIcon,
    title: "Delivery",
    description: "Delivered fresh to your doorstep every morning — from our farm to your family, within hours.",
  },
];

const farmers = [
  {
    seed: "farmer-ramulu-naik",
    name: "Ramulu Naik",
    role: "Herd Manager",
    bio: "Overseeing the health and happiness of every cow on the farm for over a decade.",
  },
  {
    seed: "farmer-lakshmi-devi",
    name: "Lakshmi Devi",
    role: "Dairy Operations Lead",
    bio: "Manages milking, chilling, and packaging to make sure every litre meets our purity standard.",
  },
  {
    seed: "farmer-venkat-reddy",
    name: "Venkat Reddy",
    role: "Organic Feed Cultivator",
    bio: "Grows the chemical-free fodder and grain that keeps our herd healthy and our milk clean.",
  },
  {
    seed: "farmer-anitha-rao",
    name: "Anitha Rao",
    role: "Quality Control Officer",
    bio: "Tests every batch for purity before it leaves the farm, so families can trust every drop.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Page intro */}
      <section className="bg-organic-green-dark py-20 text-white sm:py-24">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <span className="font-button text-sm font-semibold uppercase tracking-widest text-gold">
            About Firoz Farms
          </span>
          <h1 className="mt-4 font-heading text-4xl font-bold leading-tight sm:text-5xl">
            Real Dairy, Grown Honestly
          </h1>
          <p className="mt-5 font-sans text-lg text-white/85">
            From the fields of {siteInfo.address.city}, {siteInfo.address.state}, to your
            doorstep — this is the story of the farm, the family, and the herd behind
            every bottle of Firoz Farms milk.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section id="our-story" className="scroll-mt-24 bg-cream py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border">
              <SmartImage
                src="placeholder:our-story-founder"
                alt="Firoz Khan standing in the pastures of Firoz Farms"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <span className="font-button text-sm font-semibold uppercase tracking-widest text-earth-brown">
                Our Story
              </span>
              <h2 className="mt-3 font-heading text-3xl font-bold text-organic-green-dark sm:text-4xl">
                A Farm Built on a Simple Promise
              </h2>
              <div className="mt-5 space-y-4 font-sans text-base leading-relaxed text-muted-foreground">
                <p>
                  Firoz Farms began with one man&apos;s frustration: Firoz Khan, watching
                  the milk in local markets grow further and further removed from the
                  dairy he remembered as a child, decided to do something about it.
                  In {siteInfo.address.city}, he set out to bring back real,
                  chemical-free milk the way his grandparents once produced it — from
                  healthy cows, fed on honest feed, milked with care.
                </p>
                <p>
                  What started as a small herd on a modest patch of land in{" "}
                  {siteInfo.address.line1} has grown into a full working farm, but the
                  founding idea has never changed: families deserve dairy they can
                  trust, without asking what was added to it.
                </p>
                <p>
                  Today, Firoz Farms supplies fresh milk, curd, ghee, and paneer to
                  hundreds of households across the district — each product carrying
                  the same promise Firoz made on day one: nothing artificial, nothing
                  hidden, just pure farm-fresh goodness.
                </p>
              </div>
            </div>
          </div>

          {/* Vision & Mission */}
          <div className="mt-16 grid gap-6 sm:grid-cols-2">
            <div className="rounded-2xl border border-border bg-card p-8">
              <h3 className="font-heading text-xl font-semibold text-organic-green-dark">
                Our Vision
              </h3>
              <p className="mt-3 font-sans text-sm leading-relaxed text-muted-foreground">
                To become the most trusted name in organic dairy across Telangana, where
                every household knows exactly where its milk comes from and how it was
                made.
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-8">
              <h3 className="font-heading text-xl font-semibold text-organic-green-dark">
                Our Mission
              </h3>
              <p className="mt-3 font-sans text-sm leading-relaxed text-muted-foreground">
                To raise our herd with care, farm our land without chemicals, and
                deliver dairy so fresh and honest that families never have to
                second-guess what they&apos;re feeding their children.
              </p>
            </div>
          </div>

          {/* Values */}
          <div className="mt-16">
            <h3 className="text-center font-heading text-2xl font-semibold text-organic-green-dark">
              What We Stand For
            </h3>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {values.map(({ icon: Icon, title, description }) => (
                <div
                  key={title}
                  className="flex flex-col items-center rounded-2xl border border-border bg-card p-6 text-center transition-transform hover:-translate-y-1"
                >
                  <div className="flex size-14 items-center justify-center rounded-full bg-organic-green/10 text-organic-green">
                    <Icon className="size-7" />
                  </div>
                  <h4 className="mt-4 font-heading text-lg font-semibold text-foreground">
                    {title}
                  </h4>
                  <p className="mt-2 font-sans text-sm text-muted-foreground">
                    {description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Our Cows */}
      <section id="our-cows" className="scroll-mt-24 bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <span className="font-button text-sm font-semibold uppercase tracking-widest text-gold">
              Our Herd
            </span>
            <h2 className="mt-3 font-heading text-3xl font-bold text-organic-green-dark sm:text-4xl">
              Healthy Cows, Cared for Naturally
            </h2>
            <p className="mt-4 font-sans text-base text-muted-foreground">
              Our herd is made up entirely of indigenous breeds, chosen for their
              resilience and the quality of milk they naturally produce. No
              antibiotics, no growth hormones — just open pastures and genuine
              animal welfare.
            </p>
          </div>

          <div className="mt-12 grid gap-8 sm:grid-cols-2">
            {herd.map((cow) => (
              <div
                key={cow.breed}
                className="overflow-hidden rounded-2xl border border-border bg-card"
              >
                <div className="relative aspect-[16/10]">
                  <SmartImage
                    src={`placeholder:${cow.seed}`}
                    alt={`${cow.breed} grazing at Firoz Farms`}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-heading text-lg font-semibold text-foreground">
                    {cow.breed}
                  </h3>
                  <p className="mt-2 font-sans text-sm text-muted-foreground">
                    {cow.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 rounded-2xl border border-border bg-beige p-8 text-center sm:p-10">
            <h3 className="font-heading text-xl font-semibold text-organic-green-dark">
              Our Commitment to Animal Welfare
            </h3>
            <p className="mx-auto mt-3 max-w-2xl font-sans text-sm leading-relaxed text-muted-foreground">
              Every animal on our farm has room to graze, rest in the shade, and live
              free of unnecessary stress. Our veterinary team runs regular health
              checkups, and we never use antibiotics or synthetic hormones to force
              milk yield — a healthy, calm cow simply gives better milk.
            </p>
          </div>
        </div>
      </section>

      {/* Farming Practices */}
      <section id="farming-practices" className="scroll-mt-24 bg-beige py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <span className="font-button text-sm font-semibold uppercase tracking-widest text-earth-brown">
              Sustainability
            </span>
            <h2 className="mt-3 font-heading text-3xl font-bold text-organic-green-dark sm:text-4xl">
              Our Farming Practices
            </h2>
            <p className="mt-4 font-sans text-base text-muted-foreground">
              From the soil to the storage room, every part of Firoz Farms is designed
              to work in harmony with nature, not against it.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {farmingPractices.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="rounded-2xl border border-border bg-card p-6 transition-transform hover:-translate-y-1"
              >
                <div className="flex size-12 items-center justify-center rounded-full bg-organic-green/10 text-organic-green">
                  <Icon className="size-6" />
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

      {/* Organic Process — vertical timeline */}
      <section id="organic-process" className="scroll-mt-24 bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <span className="font-button text-sm font-semibold uppercase tracking-widest text-gold">
              Farm to Home
            </span>
            <h2 className="mt-3 font-heading text-3xl font-bold text-organic-green-dark sm:text-4xl">
              Our Organic Process, Step by Step
            </h2>
            <p className="mt-4 font-sans text-base text-muted-foreground">
              Nine careful steps stand between our pastures and your kitchen table —
              every one of them designed to protect freshness and purity.
            </p>
          </div>

          <ol className="mt-14 space-y-10">
            {organicSteps.map((step, i) => (
              <li key={step.title} className="relative flex gap-6 pl-2">
                <div className="flex flex-col items-center">
                  <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-organic-green text-white">
                    <step.icon className="size-6" />
                  </div>
                  {i < organicSteps.length - 1 && (
                    <div className="mt-2 w-px flex-1 bg-earth-brown/30" />
                  )}
                </div>
                <div className="pb-2">
                  <span className="font-button text-xs font-semibold uppercase tracking-widest text-gold">
                    Step {i + 1}
                  </span>
                  <h3 className="mt-1 font-heading text-xl font-semibold text-foreground">
                    {step.title}
                  </h3>
                  <p className="mt-2 max-w-xl font-sans text-sm leading-relaxed text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Quality Control & Cold Chain callout */}
      <section className="bg-organic-green-dark py-16 text-white sm:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 sm:grid-cols-2">
            <div className="flex items-start gap-4">
              <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-white/10 text-gold">
                <ClipboardCheck className="size-6" />
              </div>
              <div>
                <h3 className="font-heading text-xl font-semibold">
                  Quality Control
                </h3>
                <p className="mt-2 font-sans text-sm leading-relaxed text-white/80">
                  Every batch passes lab testing for purity, fat content, and
                  adulteration before it is cleared for packaging — no exceptions.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-white/10 text-gold">
                <Thermometer className="size-6" />
              </div>
              <div>
                <h3 className="font-heading text-xl font-semibold">
                  Unbroken Cold Chain
                </h3>
                <p className="mt-2 font-sans text-sm leading-relaxed text-white/80">
                  From chilling to refrigerated transport, our products never leave
                  a temperature-controlled environment between the farm and your door.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Meet Our Farmers */}
      <section className="bg-cream py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <span className="font-button text-sm font-semibold uppercase tracking-widest text-earth-brown">
              The People Behind the Farm
            </span>
            <h2 className="mt-3 font-heading text-3xl font-bold text-organic-green-dark sm:text-4xl">
              Meet Our Farmers
            </h2>
            <p className="mt-4 font-sans text-base text-muted-foreground">
              Firoz Farms runs on the daily dedication of a small, close-knit team who
              treat every cow and every customer like family.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {farmers.map((farmer) => (
              <div
                key={farmer.name}
                className="flex flex-col items-center rounded-2xl border border-border bg-card p-6 text-center"
              >
                <div className="relative size-20 overflow-hidden rounded-full border border-border">
                  <SmartImage
                    src={`placeholder:${farmer.seed}`}
                    alt={farmer.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="mt-4 font-heading text-base font-semibold text-foreground">
                  {farmer.name}
                </h3>
                <span className="mt-0.5 font-button text-xs font-semibold uppercase tracking-widest text-gold">
                  {farmer.role}
                </span>
                <p className="mt-2 font-sans text-sm text-muted-foreground">
                  {farmer.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="bg-beige py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <Award className="mx-auto size-10 text-gold" />
          <h2 className="mt-4 font-heading text-2xl font-bold text-organic-green-dark sm:text-3xl">
            Taste the Difference Honest Farming Makes
          </h2>
          <p className="mt-3 font-sans text-base text-muted-foreground">
            Explore our range of pure, farm-fresh dairy and grocery essentials —
            delivered fresh from {siteInfo.address.city} to your door.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Button
              render={<Link href="/products" />}
              size="lg"
              className="bg-organic-green font-button text-white hover:bg-organic-green-dark"
            >
              Shop Products
            </Button>
            <Button
              render={<Link href="/contact" />}
              size="lg"
              variant="outline"
              className="font-button"
            >
              Book Farm Visit
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
