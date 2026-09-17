import Image from "next/image";
import Link from "next/link";
import { Check } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata = pageMetadata({
  title: "The Lumiora Bespoke Experience",
  description:
    "Create a piece that's uniquely yours. Bespoke jewellery designed around a natural gemstone you choose, handcrafted by experienced jewellers — most pieces completed within 6 to 10 weeks.",
  path: "/custom",
});

const pieces = [
  "Engagement Rings",
  "Wedding Bands",
  "Pendants",
  "Earrings",
  "Bracelets",
  "Necklaces",
  "Men's Jewellery",
  "Family Heirloom Pieces",
  "One-of-a-Kind Bespoke Creations",
];

const reasons = [
  "Mine-to-market expertise",
  "Expert gemstone cutting and polishing",
  "Premium natural gemstones",
  "Bespoke jewellery handcrafted to your vision",
  "Personalised design consultations",
  "Worldwide insured shipping",
  "Exceptional craftsmanship",
  "Transparent communication throughout the process",
];

export default function CustomPage() {
  return (
    <>
      <PageHeader
        eyebrow="The Lumiora Bespoke Experience"
        script="Create a piece"
        title="that's uniquely yours"
        intro="At Lumiora, we believe your jewellery should be as unique as the story behind it."
        crumbs={[{ name: "Home", path: "/" }, { name: "Custom", path: "/custom" }]}
      />

      <Container width="narrow" className="py-(--spacing-section-sm)">
        <div className="space-y-7 text-lg leading-relaxed text-ink-500">
          <p>
            Whether you&rsquo;re celebrating an engagement, anniversary, birthday, milestone, or simply
            creating something meaningful, we work with you to design a bespoke piece that will be
            treasured for generations.
          </p>
          <p>
            Every custom creation begins with an exceptional gemstone. Because we are involved in the
            journey from mining and sourcing through to cutting, polishing, and craftsmanship, we can
            offer a truly personalised experience from start to finish.
          </p>
        </div>
      </Container>

      {/* ---------- Discover your gemstone ---------- */}
      <section className="border-y border-rose-200 bg-rose-100 py-(--spacing-section)">
        <Container>
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <Reveal>
              <div className="relative aspect-4/3 overflow-hidden rounded-(--radius-image) bg-rose-100">
                <Image
                  src="/studio/start-with-a-stone.jpg"
                  alt="A loose natural gemstone examined under a loupe"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </Reveal>

            <Reveal delay={120}>
              <SectionHeading align="left" eyebrow="Step into colour" script="Discover your" title="perfect gemstone" />
              <div className="mt-7 space-y-5 leading-relaxed text-ink-500">
                <p>Choosing a gemstone is one of the most exciting parts of creating custom jewellery.</p>
                <p>
                  Our collection features an exceptional range of natural gemstones, including sapphires,
                  rubies, emeralds, spinels, tourmalines, garnets, aquamarines, topaz, opals, and many
                  other precious and semi-precious gemstones.
                </p>
                <p>
                  Each gemstone is unique in colour, brilliance, shape, and character. Our experienced
                  team will guide you in selecting a gemstone that complements your style, budget, and
                  the significance of the occasion.
                </p>
                <p>
                  Whether you are drawn to timeless elegance, vibrant colours, or rare collector
                  gemstones, we&rsquo;ll help you find the perfect centrepiece for your design.
                </p>
              </div>
              <Link href="/shop/all-sapphires" className="mt-8 inline-block text-[0.68rem] uppercase tracking-[0.22em] text-gold-600 link-underline">
                Explore loose gemstones →
              </Link>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ---------- Designed around your vision ---------- */}
      <section className="py-(--spacing-section)">
        <Container>
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <Reveal className="lg:order-2">
              <div className="relative aspect-4/3 overflow-hidden rounded-(--radius-image) bg-rose-100">
                <Image
                  src="/studio/bespoke-panel.jpg"
                  alt="A pear-cut sapphire set in rose gold, from a past commission"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </Reveal>

            <Reveal delay={120}>
              <SectionHeading align="left" eyebrow="Made for you" script="Jewellery designed" title="around your vision" />
              <p className="mt-7 leading-relaxed text-ink-500">
                Once you&rsquo;ve selected your gemstone, we&rsquo;ll collaborate with you to create a piece
                that reflects your individual style. From timeless classics to contemporary designs,
                every detail is carefully considered, including:
              </p>
              <ul className="mt-6 grid gap-x-8 gap-y-2 sm:grid-cols-2">
                {pieces.map((piece) => (
                  <li key={piece} className="flex gap-3 text-ink-500">
                    <span aria-hidden className="mt-[0.7em] size-1 shrink-0 rounded-full bg-gold-400" />
                    {piece}
                  </li>
                ))}
              </ul>
              <p className="mt-6 leading-relaxed text-ink-500">
                Choose from premium precious metals including yellow gold, white gold, rose gold,
                platinum, and combinations of metals. You may also incorporate diamonds or additional
                coloured gemstones to create a truly distinctive design.
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ---------- Why Lumiora ---------- */}
      <section className="border-y border-rose-200 bg-rose-100 py-(--spacing-section)">
        <Container>
          <SectionHeading eyebrow="The Lumiora difference" script="Why choose" title="Lumiora?" />
          <ul className="mx-auto mt-14 grid max-w-4xl gap-x-12 gap-y-5 sm:grid-cols-2">
            {reasons.map((reason, index) => (
              <Reveal key={reason} delay={index * 50}>
                <li className="flex items-start gap-4 border-t border-gold-400/40 pt-5 text-ink-600">
                  <Check aria-hidden className="mt-0.5 size-4 shrink-0 text-gold-500" />
                  {reason}
                </li>
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>

      {/* ---------- Begin ---------- */}
      <section className="py-(--spacing-section)">
        <Container width="narrow" className="text-center">
          <SectionHeading script="Begin your" title="custom jewellery journey" />
          <p className="mt-6 leading-relaxed text-ink-500">
            Whether you&rsquo;ve already found the perfect gemstone or are just beginning your search,
            we&rsquo;d love to help bring your vision to life.
          </p>
          <p className="mt-4 leading-relaxed text-ink-700">
            Book a consultation or contact our team today to start designing your one-of-a-kind
            jewellery piece.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link href="/custom/enquiry" className="rounded-[2px] bg-ink-800 px-9 py-4 text-[0.72rem] uppercase tracking-[0.22em] text-ivory-50 transition-all duration-500 hover:bg-gold-500">
              Begin your bespoke journey
            </Link>
            <Link href="/custom/process" className="rounded-[2px] border border-ink-800/25 px-9 py-4 text-[0.72rem] uppercase tracking-[0.22em] text-ink-800 transition-all duration-500 hover:bg-ink-800 hover:text-ivory-50">
              Our custom process
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
