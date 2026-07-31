import Link from "next/link";
import { BookOpen, Library, PlayCircle } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { pageMetadata } from "@/lib/seo/metadata";
import { journalPosts, cyclopediaEntries, videos } from "@/data/journal";
import { formatDate } from "@/lib/utils";

export const metadata = pageMetadata({
  title: "Discover",
  description:
    "Learn to buy coloured stones well — the Lumiora journal, our gem cyclopedia of reference articles, and a video library of stones filmed under real light.",
  path: "/discover",
});

const hubs = [
  { title: "Journal", href: "/discover/journal", icon: BookOpen, body: "Essays on buying, provenance and the trade — written by the people who do the buying.", count: `${journalPosts.length} articles` },
  { title: "Gem Cyclopedia", href: "/discover/gem-cyclopedia", icon: Library, body: "Reference material: the four Cs adapted for coloured stones, origins explained, and care.", count: `${cyclopediaEntries.length} entries` },
  { title: "Video Library", href: "/discover/video-library", icon: PlayCircle, body: "Stones filmed under daylight and incandescent light, with no colour correction applied.", count: `${videos.length} films` },
];

export default function DiscoverPage() {
  return (
    <>
      <PageHeader
        eyebrow="Learn"
        script="Discover"
        title="coloured stones"
        intro="Everything we know about buying well, given away freely. A better-informed buyer is a better customer, and asks harder questions."
        crumbs={[{ name: "Home", path: "/" }, { name: "Discover", path: "/discover" }]}
      />

      <Container className="py-(--spacing-section-sm)">
        <div className="grid gap-x-10 gap-y-12 md:grid-cols-3">
          {hubs.map((hub, index) => {
            const Icon = hub.icon;
            return (
              <Reveal key={hub.href} delay={index * 90}>
                <Link href={hub.href} className="group flex h-full flex-col border-t border-gold-400/40 pt-7">
                  <Icon aria-hidden className="size-5 text-gold-500" />
                  <h2 className="mt-5 text-2xl transition-colors duration-500 group-hover:text-gold-600">{hub.title}</h2>
                  <p className="mt-3 grow leading-relaxed text-ink-500">{hub.body}</p>
                  <span className="mt-6 text-[0.65rem] uppercase tracking-[0.2em] text-ink-400">{hub.count}</span>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </Container>

      <section className="border-t border-rose-200 py-(--spacing-section)">
        <Container>
          <h2 className="eyebrow mb-10 border-b border-rose-200 pb-4">Most recent</h2>
          <div className="grid gap-x-8 gap-y-12 md:grid-cols-3">
            {journalPosts.map((post, index) => (
              <Reveal key={post.slug} delay={index * 80}>
                <Link href={`/discover/journal/${post.slug}`} className="group block">
                  <p className="eyebrow mb-3 text-ink-400">{formatDate(post.publishedAt)}</p>
                  <h3 className="text-xl leading-snug transition-colors duration-500 group-hover:text-gold-600">{post.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink-500">{post.excerpt}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
