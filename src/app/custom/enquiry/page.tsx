import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata = pageMetadata({
  title: "Start Your Custom Jewellery Journey",
  description:
    "Tell us about your ideas, preferred gemstone, design inspiration, precious metal and budget, and we will guide you through every step of creating your bespoke piece.",
  path: "/custom/enquiry",
});

const prompts = [
  "Your ideas, and the occasion you are celebrating",
  "Your preferred gemstone, if you have one in mind",
  "Any design inspiration",
  "Precious metal — yellow gold, white gold, rose gold or platinum",
  "Your budget",
  "The date you need it by",
];

export default function CustomEnquiryPage() {
  return (
    <>
      <PageHeader
        eyebrow="Bespoke"
        script="Start your"
        title="Custom Jewellery Journey"
        intro="Every remarkable piece of jewellery begins with a vision."
        crumbs={[{ name: "Home", path: "/" }, { name: "Custom", path: "/custom" }, { name: "Enquiry", path: "/custom/enquiry" }]}
      />

      <Container width="narrow" className="pt-(--spacing-section-sm) text-center">
        <div className="space-y-5 leading-relaxed text-ink-500">
          <p>
            At Lumiora, we specialise in creating bespoke jewellery that is designed around your chosen
            gemstone and handcrafted to reflect your individual style and story. Whether you&rsquo;re
            celebrating an engagement, anniversary, birthday, milestone, or creating a future family
            heirloom, our team will guide you through every step of the design process.
          </p>
          <p>
            Complete the enquiry form below and tell us about your ideas, preferred gemstone, design
            inspiration, precious metal, and budget. If you haven&rsquo;t selected a gemstone yet,
            we&rsquo;ll help you find the perfect one from our collection of natural gemstones or source a
            rare gemstone tailored to your requirements.
          </p>
          <p>
            From the careful selection of your gemstone to the final handcrafted piece, we&rsquo;re
            committed to creating jewellery that is as meaningful as it is beautiful.
          </p>
          <p className="text-ink-700">We look forward to bringing your vision to life.</p>
        </div>
      </Container>

      <Container className="py-(--spacing-section-sm)">
        <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <aside>
            <h2 className="eyebrow mb-7 border-b border-rose-200 pb-4">Helpful to include</h2>
            <ul className="space-y-3.5">
              {prompts.map((prompt) => (
                <li key={prompt} className="flex gap-3 text-sm leading-relaxed text-ink-500">
                  <span aria-hidden className="mt-2 size-1 shrink-0 rounded-full bg-gold-400" />
                  {prompt}
                </li>
              ))}
            </ul>
            <p className="mt-9 border-t border-rose-200 pt-6 text-sm leading-relaxed text-ink-500">
              If you already own a gemstone, let us know — we&rsquo;ll gladly assess whether it is
              suitable for your custom jewellery design.
            </p>
          </aside>

          <div className="border border-rose-200 bg-ivory-50 p-8 sm:p-12">
            <EnquiryForm enquiryType="custom" heading="Begin your bespoke jewellery journey" />
          </div>
        </div>
      </Container>
    </>
  );
}
