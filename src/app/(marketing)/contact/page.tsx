import { MapPin, Clock, Phone, Mail, MessageCircle, AlertCircle } from "lucide-react";
import { ContactForm } from "@/components/marketing/ContactForm";
import { siteInfo } from "@/data/placeholder/site";

export const metadata = {
  title: "Contact Us | Firoz Farms",
  description:
    "Get in touch with Firoz Farms for orders, subscriptions, and support. Find our address, business hours, phone, WhatsApp, and email.",
};

export default function ContactPage() {
  const address = `${siteInfo.address.line1}, ${siteInfo.address.line2}, ${siteInfo.address.city}, ${siteInfo.address.state} ${siteInfo.address.pincode}`;
  const mapQuery = encodeURIComponent(address);
  const whatsappDigits = siteInfo.whatsapp.replace(/\D/g, "");

  return (
    <>
      <section className="bg-cream py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <span className="font-button text-sm font-semibold uppercase tracking-widest text-gold">
            Get in Touch
          </span>
          <h1 className="mt-3 font-heading text-4xl font-bold text-organic-green-dark sm:text-5xl">
            We&apos;d Love to Hear From You
          </h1>
          <p className="mt-4 font-sans text-muted-foreground">
            Questions about an order, a subscription, or just want to say hello? Reach
            out and our team will respond within one business day.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
            <ContactForm />

            <div className="flex flex-col gap-6">
              <div className="rounded-2xl border border-border bg-card p-6 sm:p-8">
                <h2 className="font-heading text-xl font-bold text-organic-green-dark">
                  Contact Details
                </h2>
                <ul className="mt-5 flex flex-col gap-5">
                  <li className="flex items-start gap-3">
                    <MapPin className="mt-0.5 size-5 shrink-0 text-organic-green" />
                    <div>
                      <p className="font-sans text-sm font-semibold text-foreground">
                        Address
                      </p>
                      <p className="mt-0.5 font-sans text-sm text-muted-foreground">
                        {address}
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Clock className="mt-0.5 size-5 shrink-0 text-organic-green" />
                    <div>
                      <p className="font-sans text-sm font-semibold text-foreground">
                        Business Hours
                      </p>
                      <p className="mt-0.5 font-sans text-sm text-muted-foreground">
                        {siteInfo.hours}
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Phone className="mt-0.5 size-5 shrink-0 text-organic-green" />
                    <div>
                      <p className="font-sans text-sm font-semibold text-foreground">
                        Phone
                      </p>
                      <a
                        href={`tel:${siteInfo.phone}`}
                        className="mt-0.5 block font-sans text-sm text-muted-foreground hover:text-organic-green"
                      >
                        {siteInfo.phone}
                      </a>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <MessageCircle className="mt-0.5 size-5 shrink-0 text-organic-green" />
                    <div>
                      <p className="font-sans text-sm font-semibold text-foreground">
                        WhatsApp
                      </p>
                      <a
                        href={`https://wa.me/${whatsappDigits}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-0.5 block font-sans text-sm text-muted-foreground hover:text-organic-green"
                      >
                        {siteInfo.whatsapp}
                      </a>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Mail className="mt-0.5 size-5 shrink-0 text-organic-green" />
                    <div>
                      <p className="font-sans text-sm font-semibold text-foreground">
                        Email
                      </p>
                      <a
                        href={`mailto:${siteInfo.email}`}
                        className="mt-0.5 block font-sans text-sm text-muted-foreground hover:text-organic-green"
                      >
                        {siteInfo.email}
                      </a>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="flex items-start gap-3 rounded-2xl border border-gold/30 bg-gold/10 p-6">
                <AlertCircle className="mt-0.5 size-5 shrink-0 text-gold" />
                <div>
                  <p className="font-sans text-sm font-semibold text-foreground">
                    Emergency Contact
                  </p>
                  <p className="mt-0.5 font-sans text-sm text-muted-foreground">
                    For urgent delivery issues (missed, damaged, or delayed orders),
                    call or WhatsApp us directly on{" "}
                    <a
                      href={`tel:${siteInfo.phone}`}
                      className="font-semibold text-organic-green hover:underline"
                    >
                      {siteInfo.phone}
                    </a>{" "}
                    and we&apos;ll prioritise your request.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 overflow-hidden rounded-2xl border border-border">
            <iframe
              title="Firoz Farms location"
              src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
              className="h-[360px] w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </>
  );
}
