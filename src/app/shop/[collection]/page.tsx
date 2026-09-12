import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { CatalogueBrowser } from "@/components/shop/CatalogueBrowser";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { JsonLd } from "@/components/seo/JsonLd";
import { collectionStock, getCollection, getCollections, getProductsInCollection } from "@/lib/api/products";
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

/** Stock usually runs ahead of what has been listed individually. */
function stockLine(stock: number, listed: number) {
  if (stock === 0) return "Available on request";
  const held = `${stock} ${stock === 1 ? "stone" : "stones"} in stock`;
  return listed < stock ? `${held} · ${listed} listed below` : held;
}

export default async function CollectionPage({ params }: { params: Promise<{ collection: string }> }) {
  const { collection: slug } = await params;
  const collection = await getCollection(slug);

  if (!collection) notFound();

  const [products, collections] = await Promise.all([getProductsInCollection(slug), getCollections()]);
  const stock = collectionStock(collection, collections);

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
        {products.length ? (
          <>
            {stock !== undefined ? (
              <p className="mb-6 text-[0.68rem] uppercase tracking-[0.2em] text-gold-600">
                {stockLine(stock, products.length)}
              </p>
            ) : null}
            <CatalogueBrowser products={products} />
          </>
        ) : (
          <div className="mx-auto max-w-2xl">
            <EnquiryForm
              productName={collection.name}
              heading="Enquire about this collection"
              intro={
                stock
                  ? `We hold ${stock} ${stock === 1 ? "stone" : "stones"} in stock that are not yet listed individually. Tell us the size, cut and budget you have in mind and a gemmologist will send you the current selection within one working day.`
                  : "Nothing is listed here at the moment. Tell us what you are looking for and a gemmologist will reply within one working day — we can source to your brief."
              }
            />
          </div>
        )}
      </Container>
    </>
  );
}
