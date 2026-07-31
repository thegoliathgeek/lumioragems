import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { CatalogueBrowser } from "@/components/shop/CatalogueBrowser";
import { JsonLd } from "@/components/seo/JsonLd";
import { getCollection, getCollections, getProductsInCollection } from "@/lib/api/products";
import { pageMetadata, breadcrumbJsonLd } from "@/lib/seo/metadata";

export const revalidate = 900;

/** Pre-render every collection at build time. */
export async function generateStaticParams() {
  const collections = await getCollections();
  return collections.map((collection) => ({ collection: collection.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ collection: string }> }) {
  const { collection: slug } = await params;
  const collection = await getCollection(slug);

  if (!collection) {
    return pageMetadata({ title: "Collection not found", description: "", path: `/shop/${slug}`, index: false });
  }

  return pageMetadata({
    title: collection.name,
    description: collection.description,
    path: `/shop/${collection.slug}`,
  });
}

export default async function CollectionPage({ params }: { params: Promise<{ collection: string }> }) {
  const { collection: slug } = await params;
  const collection = await getCollection(slug);

  if (!collection) notFound();

  const products = await getProductsInCollection(slug);

  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Shop Gems", path: "/shop" },
    { name: collection.name, path: `/shop/${collection.slug}` },
  ];

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />

      <PageHeader
        eyebrow={collection.tagline}
        title={collection.name}
        intro={collection.description}
        crumbs={crumbs}
      />

      <Container className="py-14">
        <CatalogueBrowser products={products} />
      </Container>
    </>
  );
}
