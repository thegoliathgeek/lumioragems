import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { JsonLd } from "@/components/seo/JsonLd";
import { pageMetadata, faqJsonLd } from "@/lib/seo/metadata";
import { faqs, faqGroups } from "@/data/faq";

export const metadata = pageMetadata({
  title: "Frequently Asked Questions",
  description:
    "Answers on buying, certification, treatment, bespoke commissions, shipping and returns at Lumiora Gems.",
  path: "/faq",
});

export default function FaqPage() {
  return (
    <>
      <JsonLd data={faqJsonLd(faqs)} />

      <PageHeader
        eyebrow="Help"
        script="Frequent"
        title="Questions"
        intro="If your question is not here, write to us — we answer everything, including the awkward ones."
        crumbs={[{ name: "Home", path: "/" }, { name: "FAQ", path: "/faq" }]}
      />

      <Container width="narrow" className="py-(--spacing-section-sm)">
        {faqGroups.map((group) => (
          <section key={group} className="mb-14 last:mb-0">
            <h2 className="eyebrow mb-6 border-b border-rose-200 pb-4">{group}</h2>

            <div className="divide-y divide-rose-200">
              {faqs.filter((faq) => faq.group === group).map((faq) => (
                <details key={faq.question} className="group py-5">
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-6 text-lg text-ink-800 marker:content-none">
                    {faq.question}
                    <span
                      aria-hidden
                      className="mt-2 shrink-0 text-gold-500 transition-transform duration-500 group-open:rotate-45"
                    >
                      +
                    </span>
                  </summary>
                  <p className="mt-4 max-w-prose leading-relaxed text-ink-500">{faq.answer}</p>
                </details>
              ))}
            </div>
          </section>
        ))}
      </Container>
    </>
  );
}
