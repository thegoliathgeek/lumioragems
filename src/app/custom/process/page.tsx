import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { RichText } from "@/components/ui/RichText";
import { pageMetadata } from "@/lib/seo/metadata";
import type { ContentBlock } from "@/types";

export const metadata = pageMetadata({
  title: "Our Custom Jewellery Process",
  description:
    "Six steps from choosing your gemstone to final inspection and delivery: consultation, quotation, 3D design preview and handcrafting. Most pieces are completed within 6 to 10 weeks.",
  path: "/custom/process",
});

/* Numbered markers earn their place here — this genuinely is a sequence, and
   the order carries information the reader needs. */
const steps: { title: string; body: ContentBlock[] }[] = [
  {
    title: "Choose Your Gemstone",
    body: [
      "Browse our collection of natural loose gemstones or contact us if you're looking for a specific gemstone.",
      "If you already own a gemstone, we'll gladly assess whether it is suitable for your custom jewellery design.",
    ],
  },
  {
    title: "Personal Design Consultation",
    body: [
      "Meet with our team to discuss your ideas, inspiration, and budget. Consultations are available:",
      { list: ["In person (by appointment)", "Video consultation", "Telephone", "Email"] },
      "During your consultation we'll discuss:",
      { list: [
        "Design style",
        "Gemstone selection",
        "Metal preference",
        "Ring or jewellery dimensions",
        "Accent gemstones or diamonds",
        "Lifestyle considerations",
        "Budget",
        "Estimated completion time",
      ] },
      "If required, we can also incorporate guidance from our optional aura reading or astrology consultation services for customers who wish to explore a more personalised approach to gemstone selection.",
    ],
  },
  {
    title: "Design Proposal & Quotation",
    body: [
      "Once the design has been finalised, we'll prepare a detailed quotation outlining the design, materials, production timeframe, and pricing.",
      "Production begins once the quotation has been approved and the deposit has been received.",
    ],
  },
  {
    title: "3D Design Preview",
    body: [
      "Before manufacturing begins, you'll receive a detailed 3D computer model of your jewellery.",
      "This allows you to visualise your piece and request any minor adjustments before production commences.",
    ],
  },
  {
    title: "Handcrafting Your Jewellery",
    body: [
      "Our experienced jewellers carefully craft your jewellery using exceptional workmanship and premium materials.",
      "Every piece undergoes multiple quality inspections to ensure it meets Lumiora's high standards before leaving our workshop.",
    ],
  },
  {
    title: "Final Inspection & Delivery",
    body: [
      "Once your jewellery has been completed, we'll provide photographs for your approval before arranging collection or secure insured delivery.",
      "Each piece is beautifully presented and carefully packaged for its journey to its new home.",
    ],
  },
];

export default function ProcessPage() {
  return (
    <>
      <PageHeader
        eyebrow="Bespoke"
        script="Our Custom"
        title="Jewellery Process"
        intro="From the gemstone you choose to the finished piece in your hands — six considered steps."
        crumbs={[{ name: "Home", path: "/" }, { name: "Custom", path: "/custom" }, { name: "Process", path: "/custom/process" }]}
      />

      <Container width="narrow" className="py-(--spacing-section-sm)">
        <ol className="space-y-14">
          {steps.map((step, index) => (
            <Reveal key={step.title} delay={index * 80}>
              <li className="grid gap-6 sm:grid-cols-[auto_1fr] sm:gap-10">
                <div className="flex items-start gap-4 sm:flex-col sm:items-end sm:text-right">
                  <span className="font-display text-3xl text-gold-400">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[0.65rem] uppercase tracking-[0.18em] text-ink-400 sm:mt-1">
                    Step {index + 1}
                  </span>
                </div>
                <div className="border-t border-rose-200 pt-5 sm:pt-2">
                  <h2 className="text-2xl">{step.title}</h2>
                  <RichText blocks={step.body} className="mt-3" />
                </div>
              </li>
            </Reveal>
          ))}
        </ol>

        <section className="mt-20 border border-rose-200 bg-rose-100 p-8 text-center sm:p-12">
          <h2 className="eyebrow mb-5">Production Time</h2>
          <p className="leading-relaxed text-ink-500">Production time varies depending on the complexity of the design.</p>
          <p className="mt-4 text-lg leading-relaxed text-ink-700">
            Most custom jewellery pieces are completed within 6 to 10 weeks, although more intricate
            designs may require additional time.
          </p>
          <p className="mt-4 leading-relaxed text-ink-500">
            If your jewellery is required for a special occasion, please let us know during your
            consultation and we&rsquo;ll do our best to accommodate your timeline.
          </p>
        </section>

        <div className="mt-16 text-center">
          <p className="leading-relaxed text-ink-500">
            Book a consultation or contact our team today to start designing your one-of-a-kind jewellery piece.
          </p>
          <Link href="/custom/enquiry" className="mt-7 inline-block rounded-[2px] bg-ink-800 px-9 py-4 text-[0.72rem] uppercase tracking-[0.22em] text-ivory-50 transition-all duration-500 hover:bg-gold-500">
            Begin your bespoke journey
          </Link>
        </div>
      </Container>
    </>
  );
}
