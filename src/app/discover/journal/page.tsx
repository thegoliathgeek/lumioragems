import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { pageMetadata } from "@/lib/seo/metadata";
import { journalPosts } from "@/data/journal";
import { formatDate } from "@/lib/utils";

export const metadata = pageMetadata({
  title: "Journal",
  description:
    "The Lumiora Journal: choosing a sapphire, the colours of sapphire, from earth to gem, heated or unheated, creating your own piece, and caring for your gemstones.",
  path: "/discover/journal",
});

export default function JournalPage() {
  return (
    <>
      <PageHeader
        eyebrow="Discover"
        script="The Lumiora"
        title="Journal"
        intro="Stories of natural sapphires — where they come from, how to choose one, and how to care for it."
        crumbs={[{ name: "Home", path: "/" }, { name: "Discover", path: "/discover" }, { name: "Journal", path: "/discover/journal" }]}
      />

      <Container width="narrow" className="py-(--spacing-section-sm)">
        <div className="divide-y divide-rose-200">
          {journalPosts.map((post, index) => (
            <Reveal key={post.slug} delay={index * 70}>
              <article className="py-10 first:pt-0">
                <Link href={`/discover/journal/${post.slug}`} className="group grid gap-7 sm:grid-cols-[0.8fr_1.2fr] sm:items-center">
                  {post.image ? (
                    <div className="relative aspect-4/3 overflow-hidden rounded-(--radius-image) bg-rose-100">
                      <Image
                        src={post.image}
                        alt=""
                        fill
                        sizes="(max-width: 640px) 100vw, 300px"
                        className="object-cover transition-transform duration-[1100ms] ease-[var(--ease-luxe)] group-hover:scale-105"
                      />
                    </div>
                  ) : null}
                  <div>
                    <p className="eyebrow mb-3 text-ink-400">
                      {formatDate(post.publishedAt)} · {post.readingMinutes} min read
                    </p>
                    <h2 className="text-(length:--text-display-sm) leading-tight transition-colors duration-500 group-hover:text-gold-600">
                      {post.title}
                    </h2>
                    {post.subtitle ? (
                      <p className="mt-1.5 font-display italic text-ink-500">{post.subtitle}</p>
                    ) : null}
                    <p className="mt-4 line-clamp-2 leading-relaxed text-ink-500">{post.excerpt}</p>
                    <span className="mt-5 inline-block text-[0.68rem] uppercase tracking-[0.22em] text-gold-600">
                      Explore <span aria-hidden>→</span>
                    </span>
                  </div>
                </Link>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </>
  );
}
