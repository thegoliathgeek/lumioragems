import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { pageMetadata } from "@/lib/seo/metadata";
import { cyclopediaEntries } from "@/data/journal";

export const metadata = pageMetadata({
  title: "Gem Cyclopedia",
  description:
    "Reference articles on coloured stones — the four Cs adapted for sapphire, origins explained, treatments, and how to care for a stone you intend to wear daily.",
  path: "/discover/gem-cyclopedia",
});

export default function CyclopediaPage() {
  return (
    <>
      <PageHeader
        eyebrow="Discover"
        script="Gem"
        title="Cyclopedia"
        intro="The reference shelf. Longer, drier and more useful than the journal — start here if you are buying your first serious stone."
        crumbs={[{ name: "Home", path: "/" }, { name: "Discover", path: "/discover" }, { name: "Gem Cyclopedia", path: "/discover/gem-cyclopedia" }]}
      />

      <Container width="narrow" className="py-(--spacing-section-sm)">
        <div className="space-y-10">
          {cyclopediaEntries.map((entry, index) => (
            <Reveal key={entry.slug} delay={index * 70}>
              <Link
                href={`/discover/journal/${entry.slug}`}
                className="group block border border-rose-200 bg-ivory-50 p-8 transition-colors duration-500 hover:border-gold-400/60 sm:p-10"
              >
                <p className="eyebrow mb-3 text-ink-400">{entry.readingMinutes} min read</p>
                <h2 className="text-2xl transition-colors duration-500 group-hover:text-gold-600">{entry.title}</h2>
                <p className="mt-3 leading-relaxed text-ink-500">{entry.excerpt}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </>
  );
}
