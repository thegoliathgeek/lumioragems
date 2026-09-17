import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { JsonLd } from "@/components/seo/JsonLd";
import { RichText } from "@/components/ui/RichText";
import { allArticles, articlesBySlug } from "@/data/journal";
import { pageMetadata, articleJsonLd, breadcrumbJsonLd } from "@/lib/seo/metadata";
import { formatDate } from "@/lib/utils";

export const revalidate = 3600;

export function generateStaticParams() {
  return allArticles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = articlesBySlug.get(slug);

  if (!article) {
    return pageMetadata({ title: "Article not found", description: "", path: `/discover/journal/${slug}`, index: false });
  }

  return pageMetadata({
    title: article.title,
    description: article.excerpt,
    path: `/discover/journal/${article.slug}`,
    type: "article",
    publishedTime: article.publishedAt,
  });
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = articlesBySlug.get(slug);

  if (!article) notFound();

  const hubPath = article.category === "Gem Cyclopedia" ? "/discover/gem-cyclopedia" : "/discover/journal";

  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Discover", path: "/discover" },
    { name: article.category, path: hubPath },
    { name: article.title, path: `/discover/journal/${article.slug}` },
  ];

  const others = allArticles.filter((item) => item.slug !== article.slug).slice(0, 2);

  return (
    <>
      <JsonLd
        data={articleJsonLd({
          title: article.title,
          description: article.excerpt,
          slug: article.slug,
          publishedAt: article.publishedAt,
          author: article.author,
        })}
      />
      <JsonLd data={breadcrumbJsonLd(crumbs)} />

      <article className="pt-36 lg:pt-44">
        <Container width="narrow">
          <nav aria-label="Breadcrumb" className="mb-9">
            <Link href={hubPath} className="text-[0.65rem] uppercase tracking-[0.2em] text-gold-600 link-underline">
              ← {article.category}
            </Link>
          </nav>

          <p className="eyebrow mb-5">
            {formatDate(article.publishedAt)} · {article.readingMinutes} min read
          </p>

          <h1 className="text-(length:--text-display-lg)">{article.title}</h1>

          {article.subtitle ? (
            <p className="mt-3 font-display text-xl italic text-ink-500">{article.subtitle}</p>
          ) : null}

          {article.image ? (
            <div className="relative mt-10 aspect-16/9 overflow-hidden rounded-(--radius-image) bg-rose-100">
              <Image src={article.image} alt="" fill priority sizes="(max-width: 768px) 100vw, 720px" className="object-cover" />
            </div>
          ) : null}

          <p className="mt-7 border-l-2 border-gold-400 pl-6 text-lg leading-relaxed text-ink-500">
            {article.excerpt}
          </p>

          <RichText
            blocks={article.body}
            className="mt-14 space-y-7"
            paragraphClassName="text-lg leading-[1.85] text-ink-600"
          />

          {article.cta ? (
            <Link
              href={article.cta.href}
              className="mt-14 inline-block rounded-[2px] bg-ink-800 px-9 py-4 text-[0.72rem] uppercase tracking-[0.22em] text-ivory-50 transition-all duration-500 hover:bg-gold-500"
            >
              {article.cta.label} <span aria-hidden>→</span>
            </Link>
          ) : null}

          <footer className="mt-16 border-t border-rose-200 pt-8">
            <p className="text-sm text-ink-400">Written by {article.author}</p>
          </footer>
        </Container>
      </article>

      <section className="border-t border-rose-200 py-(--spacing-section)">
        <Container width="narrow">
          <h2 className="eyebrow mb-9">Read next</h2>
          <div className="grid gap-10 sm:grid-cols-2">
            {others.map((item) => (
              <Link key={item.slug} href={`/discover/journal/${item.slug}`} className="group block">
                <p className="eyebrow mb-2 text-ink-400">{item.category}</p>
                <h3 className="text-xl leading-snug transition-colors duration-500 group-hover:text-gold-600">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-500">{item.excerpt}</p>
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
