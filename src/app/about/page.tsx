import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata = pageMetadata({
  title: "The Lumiora Story",
  description:
    "Lumiora's story begins in Ratnapura, Sri Lanka, with more than three decades of cutting and selecting natural gemstones — now carried from Sri Lanka to Melbourne and beyond.",
  path: "/about",
});

const chapters = [
  {
    eyebrow: "Chapter one",
    script: "Raised",
    title: "Among Gems",
    image: "/studio/workshop-bench.jpg",
    alt: "Natural gemstones being sorted at the bench",
    body: [
      "Long before Lumiora had a name, gemstones were already part of everyday life.",
      "Growing up surrounded by natural sapphires and coloured gemstones created an appreciation that went beyond their beauty—an understanding of their origins, individuality and the extraordinary ways nature gives each stone its own character.",
      "One of the earliest pieces in this story is a blue sapphire pendant, handmade and gifted at birth. It remains treasured today—a small piece of jewellery carrying a much greater story of craftsmanship, love and heritage.",
      "That connection eventually became knowledge. Today, gemstones for Lumiora are selected through three qualified gemologists, including an FGA gemologist, combining generations of experience with modern gemological expertise.",
    ],
  },
  {
    eyebrow: "Chapter two",
    script: "From Sri Lanka",
    title: "to Melbourne",
    image: "/studio/start-with-a-stone.jpg",
    alt: "A natural sapphire examined under a loupe",
    body: [
      "Lumiora was created to carry this heritage into a new chapter—connecting the remarkable natural gemstones of Sri Lanka with Melbourne and beyond.",
      "Through long-standing relationships with trusted miners and gemstone partners in Ratnapura, natural Ceylon sapphires and coloured gemstones are carefully sourced and individually selected for their colour, brilliance, rarity, quality and character. Every gemstone is accompanied by certification, giving you confidence in the stone you choose.",
      "At Lumiora, we're dedicated to providing more than just exceptional gemstones—we offer a personalised experience tailored to each customer.",
    ],
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="The Lumiora Story"
        script="A legacy shaped"
        title="by gemstones"
        crumbs={[{ name: "Home", path: "/" }, { name: "Our Story", path: "/about" }]}
      />

      <Container width="narrow" className="py-(--spacing-section-sm)">
        <div className="space-y-7 text-lg leading-relaxed text-ink-500">
          <p>
            Lumiora&rsquo;s story begins in Ratnapura, Sri Lanka, a land renowned for its extraordinary
            natural gemstones.
          </p>
          <p>
            More than three decades ago, a passion for gemstones began with a single gem-cutting
            machine. Rough stones were carefully selected, cut and polished by hand, transforming what
            nature had created beneath the earth into gemstones of remarkable beauty. What began as a
            craft grew over the years into a successful gemstone business, built on knowledge,
            experience and lasting relationships with trusted local miners.
          </p>
          <p className="text-ink-700">Gemstones have been part of Lumiora&rsquo;s story ever since.</p>
        </div>
      </Container>

      {chapters.map((chapter, index) => (
        <section
          key={chapter.title}
          className={index % 2 === 0 ? "border-y border-rose-200 bg-rose-100 py-(--spacing-section)" : "py-(--spacing-section)"}
        >
          <Container>
            <div className="grid items-center gap-16 lg:grid-cols-2">
              <Reveal className={index % 2 === 1 ? "lg:order-2" : undefined}>
                <div className="relative aspect-4/3 overflow-hidden rounded-(--radius-image) bg-rose-100">
                  <Image
                    src={chapter.image}
                    alt={chapter.alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
              </Reveal>

              <Reveal delay={120}>
                <SectionHeading
                  align="left"
                  eyebrow={chapter.eyebrow}
                  script={chapter.script}
                  title={chapter.title}
                  as="h2"
                />
                <div className="mt-7 space-y-5 leading-relaxed text-ink-500">
                  {chapter.body.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </Reveal>
            </div>
          </Container>
        </section>
      ))}

      <section className="border-t border-rose-200 bg-rose-100 py-(--spacing-section)">
        <Container width="narrow" className="text-center">
          <SectionHeading eyebrow="Chapter three" script="Your Stone." title="Your Story." />

          <div className="mt-10 space-y-5 leading-relaxed text-ink-500">
            <p>
              Nature never creates two gemstones exactly alike, and Lumiora believes jewellery should
              feel just as individual.
            </p>
            <p>
              Explore a natural gemstone that speaks to you and make it your own—whether transformed
              into a ring, pendant, earrings or another meaningful piece. Alongside ready-to-wear
              jewellery, Create with Lumiora gives you the opportunity to begin with the gemstone itself
              and shape a piece around your own vision.
            </p>
            <p>
              For an engagement, a milestone, a meaningful gift or simply something chosen for yourself,
              every Lumiora piece is intended to carry something personal.
            </p>
            <p className="pt-2 text-lg italic text-ink-700">
              Born from heritage. Shaped by nature. Made part of your story.
            </p>
          </div>

          <div className="mt-14 border-t border-rose-300 pt-10">
            <p className="font-display text-2xl tracking-[0.3em] text-ink-900">LUMIORA</p>
            <p className="script-accent mt-2 text-[clamp(1.6rem,3vw,2.2rem)]">Light that shines with elegance.</p>
          </div>

          <div className="mt-12 flex flex-wrap justify-center gap-4">
            <Link
              href="/shop/all-sapphires"
              className="rounded-[2px] bg-ink-800 px-9 py-4 text-[0.72rem] uppercase tracking-[0.22em] text-ivory-50 transition-all duration-500 hover:bg-gold-500"
            >
              Explore loose sapphires
            </Link>
            <Link
              href="/about/sourcing"
              className="rounded-[2px] border border-ink-800/25 px-9 py-4 text-[0.72rem] uppercase tracking-[0.22em] text-ink-800 transition-all duration-500 hover:bg-ink-800 hover:text-ivory-50"
            >
              From mine to masterpiece
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
