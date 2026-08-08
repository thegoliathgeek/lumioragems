import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { CollectionImage } from "@/components/gem/CollectionImage";
import { JsonLd } from "@/components/seo/JsonLd";
import { getCollections, getProducts } from "@/lib/api/products";
import { pageMetadata, breadcrumbJsonLd } from "@/lib/seo/metadata";

export const metadata = pageMetadata({
  title: "Shop Gems",
  description:
    "Browse every Lumiora collection — natural sapphires by colour, ruby, aquamarine, matched pairs and other fine coloured stones. All certified, all treatments disclosed.",
  path: "/shop",
});

export const revalidate = 1800;

export default async function ShopPage() {
  const [collections, products] = await Promise.all([getCollections(), getProducts()]);

  const counts = new Map<string, number>();
  for (const collection of collections) {
    if (collection.slug === "all-sapphires") {
      counts.set(collection.slug, products.filter((p) => p.gemType === "Sapphire").length);
    } else if (collection.slug === "newly-listed") {
      counts.set(collection.slug, Math.min(8, products.length));
    } else {
      counts.set(collection.slug, products.filter((p) => p.collections.includes(collection.slug)).length);
    }
  }

  const groups = [
    { key: "curated" as const, label: "Curated" },
    { key: "sapphire" as const, label: "Sapphires by Colour" },
    { key: "gemstone" as const, label: "Other Gemstones" },
  ];

  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Shop Gems", path: "/shop" }])} />

      <PageHeader
        eyebrow="The Collection"
        script="Shop"
        title="Gems"
        intro="Every stone is one of a kind. Choose a colour to begin, or search the full collection."
        crumbs={[{ name: "Home", path: "/" }, { name: "Shop Gems", path: "/shop" }]}
      />

      <Container className="py-(--spacing-section-sm)">
        {groups.map((group) => {
          const items = collections.filter((c) => c.group === group.key);
          if (!items.length) return null;

          return (
            <section key={group.key} className="mb-20 last:mb-0">
              <h2 className="eyebrow mb-9 border-b border-rose-200 pb-4">{group.label}</h2>

              <div className="grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-3 lg:grid-cols-4">
                {items.map((collection, index) => (
                  <Reveal key={collection.slug} delay={index * 60}>
                    <Link href={`/shop/${collection.slug}`} className="group block text-center">
                      <CollectionImage
                        collection={collection}
                        className="aspect-square"
                        gemSize={80}
                        sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      />
                      <h3 className="mt-4 text-base leading-snug transition-colors duration-500 group-hover:text-gold-600">
                        {collection.name}
                      </h3>
                      <p className="mt-1 text-[0.68rem] uppercase tracking-[0.18em] text-ink-400">
                        {counts.get(collection.slug) ?? 0} stones
                      </p>
                    </Link>
                  </Reveal>
                ))}
              </div>
            </section>
          );
        })}
      </Container>
    </>
  );
}
