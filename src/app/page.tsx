import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Hero } from "@/components/layout/Hero";
import { ProductCard } from "@/components/shop/ProductCard";
import { CollectionImage } from "@/components/gem/CollectionImage";
import { getFeaturedProducts } from "@/lib/api/products";
import { sapphireCollections } from "@/data/collections";
import { journalPosts } from "@/data/journal";
import { pageMetadata } from "@/lib/seo/metadata";
import { formatDate } from "@/lib/utils";
import { site } from "@/data/site";

export const metadata = pageMetadata({
  title: `${site.name} — ${site.tagline}`,
  description: site.description,
  path: "/",
});

export const revalidate = 3600;

export default async function HomePage() {
  const featured = await getFeaturedProducts(3);
  const colourStories = sapphireCollections.slice(0, 6);

  return (
    <>
      <Hero />

      {/* ---------- Shop by colour ---------- */}
      <section className="py-(--spacing-section)">
        <Container>
          <SectionHeading
            eyebrow="Shop by colour"
            script="A spectrum,"
            title="ethically drawn"
            intro="From the deep of a Ceylon blue to the first blush of a padparadscha — explore by the shade that speaks to you."
          />

          <div className="mt-16 grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-3">
            {colourStories.map((collection, index) => (
              <Reveal key={collection.slug} delay={index * 80}>
                <Link href={`/shop/${collection.slug}`} className="group block text-center">
                  <CollectionImage
                    collection={collection}
                    className="aspect-4/3"
                    gemSize={92}
                    sizes="(max-width: 768px) 50vw, 33vw"
                  />
                  <h3 className="mt-5 text-lg transition-colors duration-500 group-hover:text-gold-600">
                    {collection.name}
                  </h3>
                  <p className="mt-1 text-xs text-ink-400">{collection.tagline}</p>
                </Link>
              </Reveal>
            ))}
          </div>

          <div className="mt-14 text-center">
            <Link href="/shop" className="eyebrow link-underline text-gold-600">
              View every collection
            </Link>
          </div>
        </Container>
      </section>

      {/* ---------- The Vault ---------- */}
      <section className="bg-rose-200 py-(--spacing-section)">
        <Container>
          <SectionHeading eyebrow="The Vault" script="Recently" title="acquired" />

          <div className="mt-16 grid grid-cols-1 gap-x-7 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((product, index) => (
              <Reveal key={product.id} delay={index * 90}>
                <ProductCard product={product} priority={index === 0} />
              </Reveal>
            ))}
          </div>

          <div className="mt-14 text-center">
            <Link
              href="/shop/newly-listed"
              className="inline-block rounded-[2px] border border-ink-800/25 px-9 py-4 text-[0.72rem] uppercase tracking-[0.22em] text-ink-800 transition-all duration-500 hover:bg-ink-800 hover:text-ivory-50"
            >
              See everything newly listed
            </Link>
          </div>
        </Container>
      </section>

      {/* ---------- Bespoke ---------- */}
      <section className="py-(--spacing-section)">
        <Container>
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <Reveal>
              <div className="relative aspect-4/5 overflow-hidden rounded-(--radius-image) bg-rose-100">
                <Image
                  src="/studio/bespoke-panel.jpg"
                  alt="A pear-cut peach sapphire set in rose gold, from a past commission"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </Reveal>

            <Reveal delay={120}>
              <SectionHeading
                align="left"
                eyebrow="Bespoke"
                script="Made for"
                title="one person"
                as="h2"
              />
              <p className="mt-7 leading-relaxed text-ink-500">
                Some stones arrive looking for a setting; some people arrive with a setting in mind
                and no stone to fill it. We work from either direction — sourcing to a brief, or
                designing around a stone you have already chosen.
              </p>
              <p className="mt-5 leading-relaxed text-ink-500">
                The process is unhurried and entirely without obligation. Most pieces take six to
                ten weeks from approved design to finished jewel.
              </p>

              <div className="mt-10 flex flex-wrap gap-4">
                <Link
                  href="/custom/enquiry"
                  className="rounded-[2px] bg-ink-800 px-9 py-4 text-[0.72rem] uppercase tracking-[0.22em] text-ivory-50 transition-all duration-500 hover:bg-gold-500"
                >
                  Begin an enquiry
                </Link>
                <Link
                  href="/custom/process"
                  className="rounded-[2px] border border-gold-400/60 px-9 py-4 text-[0.72rem] uppercase tracking-[0.22em] text-ink-800 transition-all duration-500 hover:bg-gold-500 hover:text-ivory-50"
                >
                  See the process
                </Link>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ---------- Journal ---------- */}
      <section className="border-t border-rose-200 py-(--spacing-section)">
        <Container>
          <SectionHeading eyebrow="Discover" script="From the" title="Journal" />

          <div className="mt-16 grid gap-x-8 gap-y-12 md:grid-cols-3">
            {journalPosts.map((post, index) => (
              <Reveal key={post.slug} delay={index * 90}>
                <article>
                  <Link href={`/discover/journal/${post.slug}`} className="group block">
                    <p className="eyebrow mb-3 text-ink-400">
                      {formatDate(post.publishedAt)} · {post.readingMinutes} min
                    </p>
                    <h3 className="text-xl leading-snug transition-colors duration-500 group-hover:text-gold-600">
                      {post.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-ink-500">{post.excerpt}</p>
                    <span className="mt-5 inline-block text-[0.68rem] uppercase tracking-[0.22em] text-gold-600">
                      Read
                    </span>
                  </Link>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
