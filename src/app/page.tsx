import Image from "next/image";
import Link from "next/link";
import { Gem, PenTool } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Hero } from "@/components/layout/Hero";
import { ProductCard } from "@/components/shop/ProductCard";
import { CollectionImage } from "@/components/gem/CollectionImage";
import { getFeaturedProducts } from "@/lib/api/products";
import { sapphireCollections, gemstoneCollections } from "@/data/collections";
import { homeJournalPosts } from "@/data/journal";
import { galleryPieces } from "@/data/gallery";
import { pageMetadata } from "@/lib/seo/metadata";
import { site } from "@/data/site";

export const metadata = pageMetadata({
  title: `${site.name} — ${site.tagline}`,
  description: site.description,
  path: "/",
});

export const revalidate = 3600;

/* Sapphire rings are left out until there are rings to sell. */
const pathways = [
  { label: "Loose Gems", href: "/shop/all-sapphires", icon: Gem },
  { label: "Custom Jewellery", href: "/custom", icon: PenTool },
];

const textLink =
  "inline-flex items-center gap-3 border-b border-gold-400/60 pb-1.5 text-[0.7rem] uppercase tracking-[0.22em] text-gold-600 transition-colors duration-500 hover:border-gold-600";

const outlineButton =
  "inline-block rounded-[2px] border border-ink-800/25 px-9 py-4 text-[0.72rem] uppercase tracking-[0.22em] text-ink-800 transition-all duration-500 hover:bg-ink-800 hover:text-ivory-50";

export default async function HomePage() {
  const featured = await getFeaturedProducts(3);
  const colourStories = [...sapphireCollections, ...gemstoneCollections]
    .filter((c) => (c.stock ?? 0) > 0)
    .slice(0, 6);

  return (
    <>
      <Hero />

      {/* ---------- Crafted by nature ---------- */}
      <section className="pb-(--spacing-section) pt-(--spacing-section-sm)">
        <Container>
          <div className="grid overflow-hidden border border-rose-200 bg-ivory-50 lg:grid-cols-[1fr_1.1fr]">
            <div className="relative aspect-4/3 bg-rose-100 lg:aspect-auto">
              <Image
                src="/gems/ceylon-cornflower-blue-3-42ct.jpg"
                alt="A natural Ceylon sapphire photographed in natural light"
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
              />
            </div>

            <div className="flex flex-col">
              <Reveal className="grow px-8 py-12 sm:px-14 lg:py-16">
                <p className="eyebrow mb-5">Lumiora Gemstones</p>
                <h2 className="text-(length:--text-display-md) leading-tight">
                  Rare by nature.
                  <br />
                  Timeless by design.
                </h2>
                <div aria-hidden className="my-8 h-px w-16 bg-gold-400/60" />
                <div className="space-y-5 leading-relaxed text-ink-500">
                  <p>
                    Formed over thousands of years beneath the earth, each sapphire possesses its own
                    distinctive beauty and character. Our collection is carefully selected for its
                    rarity, brilliance and exceptional quality.
                  </p>
                  <p>
                    Renowned for their remarkable durability, sapphires are beautifully suited to a
                    variety of fine jewellery pieces, creating designs intended to be treasured for
                    generations.
                  </p>
                  <p>
                    Each sapphire is presented in natural light with detailed close-up imagery,
                    allowing its true colour, brilliance and individual character to be appreciated as
                    closely as possible to viewing it in person.
                  </p>
                </div>
                <Link href="/shop/all-sapphires" className={`mt-9 ${textLink}`}>
                  Explore loose sapphires <span aria-hidden>→</span>
                </Link>
              </Reveal>

              <ul className="grid grid-cols-2 border-t border-rose-200">
                {pathways.map(({ label, href, icon: Icon }) => (
                  <li key={href} className="border-rose-200 even:border-l">
                    <Link
                      href={href}
                      className="group flex flex-col items-center gap-3 px-4 py-7 text-center transition-colors duration-500 hover:bg-rose-50"
                    >
                      <Icon aria-hidden strokeWidth={1.2} className="size-6 text-gold-500" />
                      <span className="text-[0.66rem] uppercase tracking-[0.24em] text-ink-600 transition-colors group-hover:text-gold-600">
                        {label}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* ---------- Create with Lumiora ---------- */}
      <section className="border-t border-rose-200 py-(--spacing-section)">
        <Container>
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <Reveal>
              <SectionHeading align="left" eyebrow="Bespoke" script="Create with" title="Lumiora" as="h2" />
              <div className="mt-7 space-y-5 leading-relaxed text-ink-500">
                <p>
                  Discover the beauty of creating a ring that is uniquely yours. Begin with a natural
                  sapphire selected for its colour, brilliance, character and exceptional quality, then
                  bring it to life through a design created around you.
                </p>
                <p>
                  From the choice of sapphire to the finest design details, create with Lumiora a ring
                  thoughtfully personalised to complement both your individual style and the unique
                  character of your chosen stone.
                </p>
                <p className="text-ink-700">
                  Created to celebrate your story today and to be treasured for generations.
                </p>
              </div>
              <Link href="/custom" className={`mt-9 ${textLink}`}>
                Create with Lumiora <span aria-hidden>→</span>
              </Link>
            </Reveal>

            <Reveal delay={120}>
              <div className="relative aspect-4/5 overflow-hidden rounded-(--radius-image) bg-rose-100">
                <Image
                  src="/studio/bespoke-panel.jpg"
                  alt="A pear-cut sapphire set in rose gold, created around the client's chosen stone"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ---------- Assurances ---------- */}
      <Container width="wide" className="pb-(--spacing-section-sm)">
        <ul className="grid grid-cols-2 gap-x-6 gap-y-6 border-t border-rose-300 pt-8 sm:grid-cols-4">
          {site.assurances.map((item) => (
            <li key={item.label} className="text-[0.68rem] uppercase tracking-[0.18em] text-ink-400">
              <span className="text-gold-600">{item.label}</span>{" "}
              <span className="block sm:inline">{item.detail}</span>
            </li>
          ))}
        </ul>
      </Container>

      {/* ---------- Legacy in gems ---------- */}
      <section className="bg-rose-100 py-(--spacing-section)">
        <Container>
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <Reveal>
              <div className="relative aspect-4/3 overflow-hidden rounded-(--radius-image) bg-rose-200">
                <Image
                  src="/studio/workshop-bench.jpg"
                  alt="Natural gemstones hand-selected at the bench"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </Reveal>

            <Reveal delay={120}>
              <SectionHeading align="left" eyebrow="Our heritage" script="Legacy" title="in gems" as="h2" />
              <div className="mt-7 space-y-5 leading-relaxed text-ink-500">
                <p>
                  Rooted in Sri Lanka&rsquo;s celebrated gemstone heritage, Lumiora carries forward more
                  than three decades of experience in the world of fine gemstones.
                </p>
                <p>
                  Through long-standing partnerships with trusted Sri Lankan miners, Lumiora sources
                  natural gemstones directly from those who uncover them. Each stone is carefully
                  hand-selected for its colour, rarity, brilliance and exceptional quality.
                </p>
                <p>
                  From Sri Lanka to Melbourne, this enduring connection brings together heritage,
                  authenticity and timeless beauty, with every gemstone thoughtfully chosen to become
                  something truly meaningful.
                </p>
              </div>
              <Link href="/about" className={`mt-9 ${textLink}`}>
                Discover the story <span aria-hidden>→</span>
              </Link>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ---------- Shop by colour ---------- */}
      <section className="py-(--spacing-section)">
        <Container>
          <SectionHeading
            eyebrow="Shop by colour"
            script="A spectrum,"
            title="ethically drawn"
            intro="From the deep of a Ceylon blue to the first blush of a pink tourmaline — explore by the shade that speaks to you."
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
              View all
            </Link>
          </div>
        </Container>
      </section>

      {/* ---------- Custom made jewellery ---------- */}
      <section className="border-t border-rose-200 py-(--spacing-section)">
        <Container>
          <SectionHeading
            eyebrow="Custom made jewellery"
            script="Uniquely"
            title="yours"
            intro="Every custom creation begins with an exceptional gemstone. From engagement rings and pendants to family heirloom pieces, each design is created around your chosen stone and handcrafted to be treasured for generations."
          />

          <div className="mt-16 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {galleryPieces.slice(0, 3).map((piece, index) => (
              <Reveal key={piece.title} delay={index * 90}>
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
                  <figcaption className="pt-5 text-center">
                    <h3 className="text-lg">{piece.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-500">{piece.brief}</p>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>

          <div className="mt-14 flex flex-wrap justify-center gap-4">
            <Link href="/custom" className={outlineButton}>
              The bespoke experience
            </Link>
            <Link href="/custom/gallery" className={outlineButton}>
              View the gallery
            </Link>
          </div>
        </Container>
      </section>

      {/* ---------- Newly listed ---------- */}
      <section className="bg-rose-200 py-(--spacing-section)">
        <Container>
          <SectionHeading eyebrow="Newly listed" script="Recently" title="acquired" />

          <div className="mt-16 grid grid-cols-1 gap-x-7 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((product, index) => (
              <Reveal key={product.id} delay={index * 90}>
                <ProductCard product={product} priority={index === 0} />
              </Reveal>
            ))}
          </div>

          <div className="mt-14 text-center">
            <Link href="/shop/newly-listed" className={outlineButton}>
              View all
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
                  src="/studio/start-with-an-heirloom.jpg"
                  alt="A ring worn on the hand at the workbench, from a past commission"
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

      {/* ---------- The Lumiora Journal ---------- */}
      <section className="border-t border-rose-200 py-(--spacing-section)">
        <Container>
          <SectionHeading eyebrow="Discover" script="The Lumiora" title="Journal" />

          <div className="mt-16 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {homeJournalPosts.map((post, index) => (
              <Reveal key={post.slug} delay={(index % 3) * 90}>
                <article>
                  <Link href={`/discover/journal/${post.slug}`} className="group block">
                    {post.image ? (
                      <div className="relative mb-6 aspect-4/3 overflow-hidden rounded-(--radius-image) bg-rose-100">
                        <Image
                          src={post.image}
                          alt=""
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover transition-transform duration-[1100ms] ease-[var(--ease-luxe)] group-hover:scale-105"
                        />
                      </div>
                    ) : null}
                    <h3 className="text-xl leading-snug transition-colors duration-500 group-hover:text-gold-600">
                      {post.title}
                    </h3>
                    {post.subtitle ? (
                      <p className="mt-1.5 font-display italic text-ink-500">{post.subtitle}</p>
                    ) : null}
                    <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-ink-500">{post.excerpt}</p>
                    <span className="mt-5 inline-block text-[0.68rem] uppercase tracking-[0.22em] text-gold-600">
                      Explore <span aria-hidden>→</span>
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
