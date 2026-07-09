import Link from "next/link";
import { Camera, Mail, MapPin, MessageCircle, Phone, Video } from "lucide-react";
import { footerLinks, siteInfo } from "@/data/placeholder/site";

export function Footer() {
  return (
    <footer className="bg-organic-green-dark text-cream">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <span className="font-heading text-2xl font-semibold text-white">
              {siteInfo.name}
            </span>
            <p className="mt-4 max-w-sm font-sans text-sm leading-relaxed text-cream/80">
              {siteInfo.tagline}. Farm-to-home organic dairy and groceries,
              grown with care in Khammam District, Telangana.
            </p>
            <div className="mt-6 flex gap-3">
              {[
                { icon: Camera, href: siteInfo.socials.instagram, label: "Instagram" },
                { icon: MessageCircle, href: siteInfo.socials.facebook, label: "Facebook" },
                { icon: Video, href: siteInfo.socials.youtube, label: "YouTube" },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex size-9 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-gold hover:text-organic-green-dark"
                >
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </div>

          <FooterColumn title="Explore" links={footerLinks.explore} />
          <FooterColumn title="Shop" links={footerLinks.shop} />
          <FooterColumn title="Company" links={footerLinks.company} />
        </div>

        <div className="mt-12 grid gap-4 border-t border-white/10 pt-8 text-sm text-cream/80 sm:grid-cols-3">
          <div className="flex items-start gap-2">
            <MapPin className="mt-0.5 size-4 shrink-0 text-gold" />
            <span>
              {siteInfo.address.line1}, {siteInfo.address.line2},{" "}
              {siteInfo.address.city}, {siteInfo.address.state} –{" "}
              {siteInfo.address.pincode}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="size-4 shrink-0 text-gold" />
            <a href={`tel:${siteInfo.phone}`}>{siteInfo.phone}</a>
          </div>
          <div className="flex items-center gap-2">
            <Mail className="size-4 shrink-0 text-gold" />
            <a href={`mailto:${siteInfo.email}`}>{siteInfo.email}</a>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs text-cream/60 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {siteInfo.name}. All rights reserved.
          </p>
          <p>Open {siteInfo.hours}</p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <h3 className="font-heading text-sm font-semibold uppercase tracking-wide text-gold">
        {title}
      </h3>
      <ul className="mt-4 space-y-2">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="font-sans text-sm text-cream/80 transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
