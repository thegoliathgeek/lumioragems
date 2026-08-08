import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { pageMetadata } from "@/lib/seo/metadata";
import { site } from "@/data/site";

export const metadata = pageMetadata({
  title: "About Us",
  description:
    "Lumiora Gems has dealt in natural, ethically sourced coloured stones since 1990. How we buy, what we disclose, and why we sell by enquiry rather than by cart.",
  path: "/about",
});

const principles = [
  {
    title: "Every treatment disclosed",
    body: "Heated, unheated, or anything else — it is stated on the listing, not buried in a footnote. A stone that needs its treatment hidden is a stone we would not buy.",
  },
  {
    title: "Bought with our own eyes",
    body: "We do not buy from photographs, and we do not ask you to. Every stone in the collection has been examined in hand before it reaches the vault.",
  },
  {
    title: "Traceable where it matters",
    body: "For origins that support it — Australia, Montana, and increasingly Sri Lanka — we work with the same small-scale suppliers year after year, and we can tell you who cut a stone.",
  },
  {
    title: "Sold by conversation",
    body: "There is no cart. A stone of consequence deserves a conversation, an approval period, and the chance to be seen under your own light before anything is decided.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow={`Since ${site.established}`}
        script="About"
        title="Lumiora"
        intro="Three decades of buying coloured stones, and one unchanging rule: never sell a stone we would not be happy to keep."
        crumbs={[{ name: "Home", path: "/" }, { name: "About Us", path: "/about" }]}
      />

      <Container width="narrow" className="py-(--spacing-section-sm)">
        <div className="space-y-7 text-lg leading-relaxed text-ink-500">
          <p>
            Lumiora began in 1990 as a single desk in Bengaluru, buying Ceylon rough on trips that
            took a fortnight and produced, on a good visit, four stones worth keeping. The desk is
            larger now and the trips are shorter, but the arithmetic has not really changed. Most of
            what we see, we decline.
          </p>
          <p>
            What we look for is not complicated to state and very difficult to find: colour that
            holds its saturation as the stone turns, a cut that serves the colour rather than the
            carat weight, and a chain of custody we can actually describe. A stone that satisfies all
            three is rare enough that we are content to wait for it.
          </p>
          <p>
            We sell by enquiry rather than by checkout. This is deliberate. It means every purchase
            begins with a conversation about what you are actually trying to achieve, and it means no
            stone leaves us without the buyer having held it first.
          </p>
        </div>
      </Container>

      <section className="border-y border-rose-200 bg-rose-100 py-(--spacing-section)">
        <Container>
          <SectionHeading eyebrow="How we work" script="Four" title="principles" />

          <div className="mt-16 grid gap-x-12 gap-y-12 md:grid-cols-2">
            {principles.map((principle, index) => (
              <Reveal key={principle.title} delay={index * 90}>
                <div className="border-t border-gold-400/40 pt-6">
                  <h3 className="text-xl">{principle.title}</h3>
                  <p className="mt-3 leading-relaxed text-ink-500">{principle.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <Container className="py-(--spacing-section)">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <Reveal>
            <SectionHeading
              align="left"
              eyebrow="The workshop"
              script="Set by"
              title="hand"
              as="h2"
            />
            <p className="mt-7 leading-relaxed text-ink-500">
              Our setting work is done in a small Bengaluru workshop we have used for nineteen years.
              Four benches, no production line, and the same setter on a piece from wax to polish.
            </p>
            <p className="mt-5 leading-relaxed text-ink-500">
              It is slower than sending work out, and occasionally more expensive. It also means that
              when something needs adjusting, the person who made it is the person who fixes it.
            </p>
          </Reveal>

          <Reveal delay={120}>
            <div className="relative aspect-4/3 overflow-hidden rounded-(--radius-image) bg-rose-100">
              <Image
                src="/studio/workshop-bench.jpg"
                alt="A setter sorting stones at the bench in the Bengaluru workshop"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </Container>
    </>
  );
}
