import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { pageMetadata } from "@/lib/seo/metadata";
import { site } from "@/data/site";

export const metadata = pageMetadata({
  title: "Contact Us",
  description:
    "Speak to a Lumiora gemmologist about a stone, a bespoke commission, or a valuation. We reply to every enquiry within one working day.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Get in touch"
        script="Contact"
        title="Us"
        intro="Tell us what you are looking for. Every enquiry is answered by a gemmologist, usually within one working day."
        crumbs={[{ name: "Home", path: "/" }, { name: "Contact", path: "/contact" }]}
      />

      <Container className="py-(--spacing-section-sm)">
        <div className="grid gap-16 lg:grid-cols-[0.85fr_1.15fr] lg:gap-24">
          <div>
            <h2 className="eyebrow mb-8 border-b border-rose-200 pb-4">The gallery</h2>

            <ul className="space-y-7">
              <li className="flex gap-4">
                <Mail aria-hidden className="mt-1 size-4 shrink-0 text-gold-500" />
                <div>
                  <p className="text-[0.68rem] uppercase tracking-[0.18em] text-ink-400">Email</p>
                  <a href={`mailto:${site.email}`} className="text-ink-800 link-underline">{site.email}</a>
                </div>
              </li>
              <li className="flex gap-4">
                <Phone aria-hidden className="mt-1 size-4 shrink-0 text-gold-500" />
                <div>
                  <p className="text-[0.68rem] uppercase tracking-[0.18em] text-ink-400">Telephone</p>
                  <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="text-ink-800 link-underline">{site.phone}</a>
                </div>
              </li>
              <li className="flex gap-4">
                <MapPin aria-hidden className="mt-1 size-4 shrink-0 text-gold-500" />
                <div>
                  <p className="text-[0.68rem] uppercase tracking-[0.18em] text-ink-400">By appointment</p>
                  <p className="text-ink-800">
                    {site.address.street}<br />
                    {site.address.locality} {site.address.postalCode}<br />
                    {site.address.region}, India
                  </p>
                </div>
              </li>
              <li className="flex gap-4">
                <Clock aria-hidden className="mt-1 size-4 shrink-0 text-gold-500" />
                <div>
                  <p className="text-[0.68rem] uppercase tracking-[0.18em] text-ink-400">Hours</p>
                  <p className="text-ink-800">Monday to Saturday, 10.30 – 18.30 IST</p>
                </div>
              </li>
            </ul>

            <p className="mt-10 border-t border-rose-200 pt-7 text-sm leading-relaxed text-ink-500">
              Viewings are by appointment so that the stones you have asked about are out of the safe
              and under good light before you arrive.
            </p>
          </div>

          <div className="border border-rose-200 bg-ivory-50 p-8 sm:p-12">
            <EnquiryForm heading="Send us a note" enquiryType="general" />
          </div>
        </div>
      </Container>
    </>
  );
}
