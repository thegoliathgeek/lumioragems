import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata = pageMetadata({
  title: "Our Process",
  description:
    "Five stages from first conversation to finished piece: brief, stone selection, design, approval, and the bench. Typically six to ten weeks.",
  path: "/custom/process",
});

/* Numbered markers earn their place here — this genuinely is a sequence, and
   the order carries information the reader needs. */
const stages = [
  { week: "Week 1", title: "The conversation", body: "We establish what the piece is for, who will wear it, the budget you are working to, and the date it needs to exist by. Nothing is sketched yet." },
  { week: "Weeks 1–2", title: "Stone selection", body: "We present options — from the collection or sourced to your brief — with photographs, video under two lighting conditions, and certification. Stones can be sent on approval." },
  { week: "Weeks 2–3", title: "Design", body: "Hand sketches first, then a rendered drawing once a direction is settled. Two rounds of revision are included; most commissions use one." },
  { week: "Week 3", title: "Approval and quotation", body: "A fixed written quotation covering stone, metal, labour and timeline. Nothing goes to the bench until you have signed it off." },
  { week: "Weeks 4–10", title: "The bench", body: "Wax, casting, setting, finishing — all at our own workshop, one setter per piece. We send progress photographs at casting and at setting." },
];

export default function ProcessPage() {
  return (
    <>
      <PageHeader
        eyebrow="Bespoke"
        script="Our"
        title="Process"
        intro="Deliberately unhurried, and entirely without obligation until you approve a written quotation."
        crumbs={[{ name: "Home", path: "/" }, { name: "Custom", path: "/custom" }, { name: "Process", path: "/custom/process" }]}
      />

      <Container width="narrow" className="py-(--spacing-section-sm)">
        <ol className="space-y-14">
          {stages.map((stage, index) => (
            <Reveal key={stage.title} delay={index * 80}>
              <li className="grid gap-6 sm:grid-cols-[auto_1fr] sm:gap-10">
                <div className="flex items-start gap-4 sm:flex-col sm:items-end sm:text-right">
                  <span className="font-display text-3xl text-gold-400">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[0.65rem] uppercase tracking-[0.18em] text-ink-400 sm:mt-1">
                    {stage.week}
                  </span>
                </div>
                <div className="border-t border-rose-200 pt-5 sm:pt-2">
                  <h2 className="text-2xl">{stage.title}</h2>
                  <p className="mt-3 leading-relaxed text-ink-500">{stage.body}</p>
                </div>
              </li>
            </Reveal>
          ))}
        </ol>

        <div className="mt-20 border-t border-rose-200 pt-12 text-center">
          <p className="leading-relaxed text-ink-500">
            Every commission begins the same way — with a conversation and no commitment.
          </p>
          <Link href="/custom/enquiry" className="mt-7 inline-block rounded-[2px] bg-ink-800 px-9 py-4 text-[0.72rem] uppercase tracking-[0.22em] text-ivory-50 transition-all duration-500 hover:bg-gold-500">
            Begin an enquiry
          </Link>
        </div>
      </Container>
    </>
  );
}
