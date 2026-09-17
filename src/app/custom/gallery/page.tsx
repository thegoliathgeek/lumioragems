import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { pageMetadata } from "@/lib/seo/metadata";
import { galleryPieces as pieces } from "@/data/gallery";

export const metadata = pageMetadata({
  title: "Design Gallery",
  description:
    "An archive of past bespoke commissions from the Lumiora workshop — the stone, the brief, and what was made.",
  path: "/custom/gallery",
});

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
                <div className="relative aspect-square overflow-hidden rounded-(--radius-image) bg-rose-100">
                  <Image
                    src={piece.image}
                    alt={piece.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-[1100ms] ease-[var(--ease-luxe)] group-hover:scale-105"
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
