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
    "Essays on buying coloured stones well — certificates, treatment premiums, provenance and the shifting fashions of the trade.",
  path: "/discover/journal",
});

export default function JournalPage() {
  return (
    <>
      <PageHeader
        eyebrow="Discover"
        script="The"
        title="Journal"
        intro="Written by the people who do the buying, about the parts of the trade that are rarely explained plainly."
        crumbs={[{ name: "Home", path: "/" }, { name: "Discover", path: "/discover" }, { name: "Journal", path: "/discover/journal" }]}
      />

      <Container width="narrow" className="py-(--spacing-section-sm)">
        <div className="divide-y divide-rose-200">
          {journalPosts.map((post, index) => (
            <Reveal key={post.slug} delay={index * 70}>
              <article className="py-10 first:pt-0">
                <Link href={`/discover/journal/${post.slug}`} className="group block">
                  <p className="eyebrow mb-3 text-ink-400">
                    {formatDate(post.publishedAt)} · {post.readingMinutes} min read
                  </p>
                  <h2 className="text-(length:--text-display-sm) leading-tight transition-colors duration-500 group-hover:text-gold-600">
                    {post.title}
                  </h2>
                  <p className="mt-4 leading-relaxed text-ink-500">{post.excerpt}</p>
                  <span className="mt-5 inline-block text-[0.68rem] uppercase tracking-[0.22em] text-gold-600">
                    Continue reading
                  </span>
                </Link>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </>
  );
}
