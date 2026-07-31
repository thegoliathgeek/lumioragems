import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata = pageMetadata({
  title: "Design Enquiry",
  description:
    "Tell us about the piece you have in mind — colour, carat, setting and budget. Our gemmologists reply with options within days, with no obligation.",
  path: "/custom/enquiry",
});

const prompts = [
  "The occasion, and who will wear the piece",
  "A colour or stone you are drawn to",
  "Approximate carat weight, if you have one in mind",
  "Metal — yellow, white, rose, or platinum",
  "Your budget range, honestly stated",
  "The date you need it by",
];

export default function CustomEnquiryPage() {
  return (
    <>
      <PageHeader
        eyebrow="Bespoke"
        script="Begin an"
        title="Enquiry"
        intro="The more you can tell us, the better our first set of options will be. Nothing here commits you to anything."
        crumbs={[{ name: "Home", path: "/" }, { name: "Custom", path: "/custom" }, { name: "Enquiry", path: "/custom/enquiry" }]}
      />

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
              If you are unsure about any of it, say so. Half of our commissions begin with someone
              who knows only the occasion and the budget.
            </p>
          </aside>

          <div className="border border-rose-200 bg-ivory-50 p-8 sm:p-12">
            <EnquiryForm enquiryType="custom" heading="Your commission" />
          </div>
        </div>
      </Container>
    </>
  );
}
