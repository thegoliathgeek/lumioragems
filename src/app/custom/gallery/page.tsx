import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { GemFigure } from "@/components/gem/GemFigure";
import { pageMetadata } from "@/lib/seo/metadata";
import type { GemHue } from "@/types";

export const metadata = pageMetadata({
  title: "Design Gallery",
  description:
    "An archive of past bespoke commissions from the Lumiora workshop — the stone, the brief, and what was made.",
  path: "/custom/gallery",
});

const pieces: { title: string; brief: string; hue: GemHue; shape: string; year: string }[] = [
  { title: "The Kolar Solitaire", brief: "A 3.2 ct unheated Ceylon blue in an East–West setting, 18k white gold, knife-edge band.", hue: "blue", shape: "emerald", year: "2026" },
  { title: "Padma Three-Stone", brief: "Padparadscha centre flanked by peach sapphires, rose gold, hand-engraved gallery.", hue: "padparadscha", shape: "oval", year: "2026" },
  { title: "The Teal Hexagon", brief: "A parti-coloured Australian teal in a bezel with a hidden halo, yellow gold.", hue: "teal", shape: "hexagon", year: "2025" },
  { title: "Grandmother's Reset", brief: "An inherited 2.4 ct yellow sapphire reset into a low-profile daily band.", hue: "yellow", shape: "cushion", year: "2025" },
  { title: "Violet Pendant", brief: "Pear-cut violet sapphire, diamond-set bail, on a fine platinum chain.", hue: "violet", shape: "pear", year: "2025" },
  { title: "The Matched Drops", brief: "A matched pair of Ceylon blues as detachable drops on diamond studs.", hue: "blue", shape: "oval", year: "2024" },
];

export default function GalleryPage() {
  return (
    <>
      <PageHeader
        eyebrow="Bespoke"
        script="Design"
        title="Gallery"
        intro="A selection of past commissions. Every piece here began as a conversation and a single stone."
        crumbs={[{ name: "Home", path: "/" }, { name: "Custom", path: "/custom" }, { name: "Gallery", path: "/custom/gallery" }]}
      />

      <Container className="py-(--spacing-section-sm)">
        <div className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {pieces.map((piece, index) => (
            <Reveal key={piece.title} delay={index * 70}>
              <figure className="group">
                <div className="flex aspect-square items-center justify-center rounded-(--radius-image) bg-rose-100 transition-colors duration-700 group-hover:bg-rose-200">
                  <GemFigure
                    hue={piece.hue}
                    shape={piece.shape}
                    size={118}
                    className="transition-transform duration-[1100ms] ease-[var(--ease-luxe)] group-hover:scale-105"
                  />
                </div>
                <figcaption className="pt-5">
                  <p className="eyebrow mb-2 text-ink-400">{piece.year}</p>
                  <h2 className="text-lg">{piece.title}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-ink-500">{piece.brief}</p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </Container>
    </>
  );
}
