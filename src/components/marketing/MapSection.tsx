import { MapPin, Phone, Clock } from "lucide-react";
import { siteInfo } from "@/data/placeholder/site";

export function MapSection() {
  const address = `${siteInfo.address.line1}, ${siteInfo.address.line2}, ${siteInfo.address.city}, ${siteInfo.address.state} ${siteInfo.address.pincode}`;
  const mapQuery = encodeURIComponent(address);

  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 overflow-hidden rounded-3xl border border-border lg:grid-cols-2">
          <div className="min-h-[320px]">
            <iframe
              title="Firoz Farms location"
              src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
              className="h-full w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <div className="flex flex-col justify-center gap-6 bg-cream p-8 sm:p-10">
            <span className="font-button text-sm font-semibold uppercase tracking-widest text-gold">
              Visit the Farm
            </span>
            <h2 className="font-heading text-3xl font-bold text-organic-green-dark">
              Come See Where Your Food Grows
            </h2>
            <div className="flex items-start gap-3">
              <MapPin className="mt-0.5 size-5 shrink-0 text-organic-green" />
              <p className="font-sans text-sm text-foreground">{address}</p>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="size-5 shrink-0 text-organic-green" />
              <p className="font-sans text-sm text-foreground">{siteInfo.hours}</p>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="size-5 shrink-0 text-organic-green" />
              <a href={`tel:${siteInfo.phone}`} className="font-sans text-sm text-foreground">
                {siteInfo.phone}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
