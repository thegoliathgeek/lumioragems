import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { pageMetadata } from "@/lib/seo/metadata";
import { videos } from "@/data/journal";

export const metadata = pageMetadata({
  title: "Video Library",
  description:
    "Stones filmed under daylight and incandescent light with no colour correction — the closest thing to seeing a gem in person before it reaches you.",
  path: "/discover/video-library",
});

export default function VideoLibraryPage() {
  return (
    <>
      <PageHeader
        eyebrow="Discover"
        script="Video"
        title="Library"
        intro="No colour correction, no ring lights, no filters. Stones as they actually look under daylight and under a lamp."
        crumbs={[{ name: "Home", path: "/" }, { name: "Discover", path: "/discover" }, { name: "Video Library", path: "/discover/video-library" }]}
      />

      <Container className="py-(--spacing-section-sm)">
        <div className="grid gap-x-8 gap-y-12 md:grid-cols-2">
          {videos.map((video, index) => (
            <Reveal key={video.id} delay={index * 80}>
              <figure>
                <div className="aspect-video overflow-hidden rounded-(--radius-image) bg-rose-100">
                  <iframe
                    src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}`}
                    title={video.title}
                    loading="lazy"
                    allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="size-full border-0"
                  />
                </div>
                <figcaption className="pt-5">
                  <p className="eyebrow mb-2 text-ink-400">{video.durationLabel}</p>
                  <h2 className="text-lg">{video.title}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-ink-500">{video.description}</p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </Container>
    </>
  );
}
