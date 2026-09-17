import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { JsonLd } from "@/components/seo/JsonLd";
import { pageMetadata, faqJsonLd } from "@/lib/seo/metadata";
import { faqs, faqGroups, faqAnswerText } from "@/data/faq";

export const metadata = pageMetadata({
  title: "Frequently Asked Questions",
  description:
    "Answers on our natural gemstones, custom jewellery, consultations, shipping, returns, care and gemstone investment at Lumiora.",
  path: "/faq",
});

export default function FaqPage() {
  return (
    <>
      <JsonLd data={faqJsonLd(faqs.map((faq) => ({ question: faq.question, answer: faqAnswerText(faq) })))} />

      <PageHeader
        eyebrow="Help"
        script="Frequent"
        title="Questions"
        intro="If your question isn't covered here, please contact our team — we'll be delighted to assist."
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
                  <div className="mt-4 max-w-prose space-y-3 leading-relaxed text-ink-500">
                    <p>{faq.answer}</p>
                    {faq.list ? (
                      <ul className="grid gap-x-8 gap-y-1.5 sm:grid-cols-2">
                        {faq.list.map((item) => (
                          <li key={item} className="flex gap-3">
                            <span aria-hidden className="mt-[0.7em] size-1 shrink-0 rounded-full bg-gold-400" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    ) : null}
                    {faq.after ? <p>{faq.after}</p> : null}
                  </div>
                </details>
              ))}
            </div>
          </section>
        ))}
      </Container>
    </>
  );
}
