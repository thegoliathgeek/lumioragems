import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { RichText } from "@/components/ui/RichText";
import { pageMetadata } from "@/lib/seo/metadata";
import type { ContentBlock } from "@/types";

export const metadata = pageMetadata({
  title: "From Mine to Masterpiece",
  description:
    "A commitment to people, quality and the earth: how Lumiora sources, cuts, polishes and crafts natural gemstones with integrity and transparency.",
  path: "/about/sourcing",
});

const sections: { heading: string; body: ContentBlock[] }[] = [
  {
    heading: "Responsibly Sourced Natural Gemstones",
    body: [
      "Lumiora sources natural gemstones from our own mining operations and through carefully selected, long-term partnerships with responsible miners and suppliers in renowned gemstone-producing regions.",
      "We prioritise suppliers who demonstrate:",
      { list: [
        "Ethical and responsible mining practices",
        "Respect for local communities",
        "Fair working conditions",
        "Environmentally conscious operations",
        "Transparency throughout the supply chain",
      ] },
      "Every gemstone is selected for its beauty, rarity, and quality before entering our collection.",
    ],
  },
  {
    heading: "Supporting Mining Communities",
    body: [
      "Behind every natural gemstone is the dedication of miners, craftspeople, and families whose knowledge has often been passed down through generations.",
      "At Lumiora, we believe that supporting these communities is just as important as producing exceptional gemstones.",
      "By maintaining long-term relationships with our mining partners, we help create sustainable opportunities while recognising the skill, experience, and commitment of the people who make this remarkable industry possible.",
    ],
  },
  {
    heading: "Mine • Cut • Polish",
    body: [
      "Unlike many gemstone retailers, Lumiora is involved in every stage of the gemstone journey. Where possible, our gemstones are:",
      { list: [
        "Mined through our own operations or trusted partners",
        "Carefully sorted and evaluated",
        "Expertly cut by skilled gemstone artisans",
        "Precisely polished to maximise their natural brilliance",
        "Individually inspected before being offered to our customers",
      ] },
      "Maintaining oversight throughout this process allows us to uphold the highest standards of quality while preserving the unique character of every gemstone.",
    ],
  },
  {
    heading: "Handcrafted Excellence",
    body: [
      "Every gemstone deserves to be cut with care rather than simply processed for maximum yield.",
      "Our experienced gemstone cutters combine traditional craftsmanship with modern precision to reveal each stone's natural beauty, colour, brilliance, and individuality.",
      "Because every natural gemstone is unique, each one is cut according to its own characteristics rather than following a standardised approach.",
      "This careful attention to detail ensures every Lumiora gemstone retains its distinctive beauty and personality.",
    ],
  },
  {
    heading: "From Gemstone to Jewellery",
    body: [
      "For customers seeking something truly personal, Lumiora also offers bespoke jewellery services.",
      "Our jewellery is designed around your chosen gemstone and handcrafted by experienced jewellers using premium precious metals and exceptional attention to detail.",
      "Each piece is individually created to celebrate life's most meaningful moments while showcasing the beauty of the gemstone at its centre.",
    ],
  },
];

export default function SourcingPage() {
  return (
    <>
      <PageHeader
        eyebrow="A Commitment to People, Quality, and the Earth"
        script="From Mine"
        title="to Masterpiece"
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Our Story", path: "/about" },
          { name: "From Mine to Masterpiece", path: "/about/sourcing" },
        ]}
      />

      <Container width="narrow" className="py-(--spacing-section-sm)">
        <div className="space-y-7 text-lg leading-relaxed text-ink-500">
          <p>
            At Lumiora, every gemstone has a story. We believe that exceptional gemstones should be
            sourced with integrity, crafted with care, and offered with complete transparency.
          </p>
          <p>
            Our commitment extends beyond beautiful gemstones. We are dedicated to building lasting
            relationships with mining communities, skilled gemstone artisans, and trusted partners who
            share our values of quality, responsibility, and respect.
          </p>
          <p>
            By remaining closely involved throughout the journey—from mining and sourcing to cutting,
            polishing, and the final creation—we are able to offer gemstones with confidence,
            authenticity, and exceptional craftsmanship.
          </p>
        </div>
      </Container>

      <section className="border-y border-rose-200 bg-rose-100 py-(--spacing-section)">
        <Container>
          <div className="grid gap-x-14 gap-y-14 md:grid-cols-2">
            {sections.map((section, index) => (
              <Reveal key={section.heading} delay={index * 80}>
                <div className="border-t border-gold-400/40 pt-6">
                  <h2 className="text-2xl">{section.heading}</h2>
                  <RichText blocks={section.body} className="mt-4" />
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <Container width="narrow" className="py-(--spacing-section) text-center">
        <p className="eyebrow mb-5">Our Promise</p>
        <div className="space-y-5 leading-relaxed text-ink-500">
          <p>At Lumiora, success is measured by more than the gemstones we sell.</p>
          <p>
            It is reflected in the relationships we build, the communities we support, the
            craftsmanship we preserve, and the confidence our customers place in us.
          </p>
          <p>
            Whether you are purchasing a loose gemstone, commissioning a custom jewellery piece, seeking
            guidance through a consultation, or exploring gemstones as part of an investment portfolio,
            our commitment remains the same:
          </p>
          <p className="text-lg text-ink-700">
            To deliver exceptional natural gemstones with honesty, integrity, and uncompromising quality.
          </p>
        </div>

        <p className="script-accent mt-12 text-[clamp(1.6rem,3vw,2.3rem)]">
          From the Earth, Crafted with Purpose, Treasured for Life.
        </p>

        <Link
          href="/custom"
          className="mt-12 inline-block rounded-[2px] bg-ink-800 px-9 py-4 text-[0.72rem] uppercase tracking-[0.22em] text-ivory-50 transition-all duration-500 hover:bg-gold-500"
        >
          Create with Lumiora
        </Link>
      </Container>
    </>
  );
}
