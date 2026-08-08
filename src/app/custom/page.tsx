import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata = pageMetadata({
  title: "Custom Jewellery",
  description:
    "Bespoke jewellery built around a stone you choose — or a stone we source to your brief. Designed in Bengaluru, set by hand, typically six to ten weeks.",
  path: "/custom",
});

const routes = [
  { title: "Start with a stone", body: "Choose something from the collection and we design the piece around it. The stone leads; the setting follows.", href: "/shop/all-sapphires", cta: "Browse the collection", image: "/studio/start-with-a-stone.jpg", alt: "A loose stone examined under a loupe" },
  { title: "Start with an idea", body: "Describe the piece and we source stones to match — colour, carat, budget and timeline. Options within days, no obligation.", href: "/custom/enquiry", cta: "Begin an enquiry", image: "/studio/start-with-an-idea.jpg", alt: "A stone being measured against a grading chart" },
  { title: "Start with an heirloom", body: "Reset an inherited stone into something that will actually be worn. We assess the stone and the metal, and tell you honestly what is worth reusing.", href: "/contact", cta: "Talk to us", image: "/studio/start-with-an-heirloom.jpg", alt: "An inherited ring worn on the hand at the workbench" },
];

export default function CustomPage() {
  return (
    <>
      <PageHeader
        eyebrow="Bespoke"
        script="Custom"
        title="Jewellery"
        intro="Three ways in, one process, and no obligation at any point until you approve the design."
        crumbs={[{ name: "Home", path: "/" }, { name: "Custom", path: "/custom" }]}
      />

      <Container className="py-(--spacing-section-sm)">
        <div className="grid gap-x-10 gap-y-14 md:grid-cols-3">
          {routes.map((route, index) => (
            <Reveal key={route.title} delay={index * 90}>
              <div className="flex h-full flex-col">
                <div className="relative mb-7 aspect-4/3 overflow-hidden rounded-(--radius-image) bg-rose-100">
                  <Image
                    src={route.image}
                    alt={route.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                  />
                </div>
                <h2 className="text-xl">{route.title}</h2>
                <p className="mt-3 grow leading-relaxed text-ink-500">{route.body}</p>
                <Link href={route.href} className="mt-6 text-[0.68rem] uppercase tracking-[0.22em] text-gold-600 link-underline self-start">
                  {route.cta}
                </Link>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>

      <section className="border-t border-rose-200 bg-rose-100 py-(--spacing-section)">
        <Container width="narrow" className="text-center">
          <h2 className="text-(length:--text-display-md)">Six to ten weeks, typically</h2>
          <p className="mt-6 leading-relaxed text-ink-500">
            From approved design to finished piece. Complex settings and unusual metals can extend
            that, and we confirm a date in writing before any work begins.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link href="/custom/process" className="rounded-[2px] border border-ink-800/25 px-9 py-4 text-[0.72rem] uppercase tracking-[0.22em] text-ink-800 transition-all duration-500 hover:bg-ink-800 hover:text-ivory-50">
              See the process
            </Link>
            <Link href="/custom/gallery" className="rounded-[2px] border border-ink-800/25 px-9 py-4 text-[0.72rem] uppercase tracking-[0.22em] text-ink-800 transition-all duration-500 hover:bg-ink-800 hover:text-ivory-50">
              View past pieces
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
