import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { ProductImage } from "@/components/gem/ProductImage";
import { ProductCard } from "@/components/shop/ProductCard";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { JsonLd } from "@/components/seo/JsonLd";
import { getProduct, getProducts, getRelatedProducts } from "@/lib/api/products";
import { pageMetadata, productJsonLd, breadcrumbJsonLd } from "@/lib/seo/metadata";
import { Price, ConversionNote } from "@/components/currency/Price";
import { formatCarat } from "@/lib/utils";
import { site } from "@/data/site";

export const revalidate = 900;

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    return pageMetadata({ title: "Stone not found", description: "", path: `/shop/product/${slug}`, index: false });
  }

  return pageMetadata({
    title: `${product.name} · ${formatCarat(product.carat)}`,
    description: product.description,
    path: `/shop/product/${product.slug}`,
  });
}

const AVAILABILITY_COPY: Record<string, string> = {
  available: "Available",
  reserved: "Reserved — enquire for the waiting list",
  sold: "Sold — we can source something comparable",
};

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) notFound();

  const related = await getRelatedProducts(product);

  const specs = [
    { label: "Weight", value: formatCarat(product.carat) },
    { label: "Cut", value: product.shape },
    { label: "Colour", value: product.colour },
    { label: "Clarity", value: product.clarity },
    { label: "Origin", value: product.origin },
    { label: "Treatment", value: product.treatment },
    { label: "Dimensions", value: product.dimensions },
    { label: "Certificate", value: product.certificate },
    { label: "Reference", value: product.id },
  ];

  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Shop Gems", path: "/shop" },
    { name: product.name, path: `/shop/product/${product.slug}` },
  ];

  return (
    <>
      <JsonLd
        data={productJsonLd({
          name: product.name,
          description: product.description,
          sku: product.id,
          slug: product.slug,
          price: product.price,
          availability: product.availability,
          gemType: product.gemType,
          images: product.images,
        })}
      />
      <JsonLd data={breadcrumbJsonLd(crumbs)} />

      <div className="pt-32 lg:pt-40">
        <Container>
          <nav aria-label="Breadcrumb" className="mb-10">
            <ol className="flex flex-wrap items-center gap-2 text-[0.65rem] uppercase tracking-[0.18em] text-ink-400">
              {crumbs.map((crumb, index) => (
                <li key={crumb.path} className="flex items-center gap-2">
                  {index > 0 ? <span aria-hidden>·</span> : null}
                  {index === crumbs.length - 1 ? (
                    <span aria-current="page" className="text-ink-600">{crumb.name}</span>
                  ) : (
                    <Link href={crumb.path} className="transition-colors hover:text-gold-600">{crumb.name}</Link>
                  )}
                </li>
              ))}
            </ol>
          </nav>

          <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
            {/* ---- stone ---- */}
            <div className="group lg:sticky lg:top-28 lg:self-start">
              <ProductImage product={product} priority gemSize={230} className="aspect-square" />
            </div>

            {/* ---- detail ---- */}
            <div>
              <p className="eyebrow mb-4">
                {product.gemType} · {product.treatment}
              </p>

              <h1 className="text-(length:--text-display-md)">{product.name}</h1>

              <p className="mt-6 max-w-lg leading-relaxed text-ink-500">{product.description}</p>

              <div className="mt-9 flex flex-wrap items-baseline gap-x-6 gap-y-2 border-y border-rose-200 py-6">
                <span className="font-display text-3xl text-ink-900">
                  {product.availability === "sold"
                    ? "Sold"
                    : <Price amountInBase={product.price} showCode />}
                </span>
                <span className="text-[0.68rem] uppercase tracking-[0.2em] text-gold-600">
                  {AVAILABILITY_COPY[product.availability]}
                </span>
              </div>

              <dl className="mt-9 grid grid-cols-1 gap-x-10 sm:grid-cols-2">
                {specs.map((spec) => (
                  <div key={spec.label} className="flex justify-between gap-4 border-b border-rose-200 py-3">
                    <dt className="text-[0.68rem] uppercase tracking-[0.16em] text-ink-400">{spec.label}</dt>
                    <dd className="text-right text-sm text-ink-800">{spec.value}</dd>
                  </div>
                ))}
              </dl>

              <ConversionNote className="mt-4 max-w-md" />

              <p className="mt-8 text-xs leading-relaxed text-ink-400">
                Prices are exclusive of tax and quoted for the loose stone. Setting is quoted
                separately. Every stone is sent on approval before purchase — no stone should be
                bought from a photograph alone.
              </p>

              <div className="mt-12 border-t border-rose-200 pt-12">
                <EnquiryForm
                  enquiryType="product"
                  productSlug={product.slug}
                  productName={product.name}
                  heading="Enquire about this stone"
                  intro={`A gemmologist will reply within one working day. You are also welcome to call us on ${site.phone}.`}
                />
              </div>
            </div>
          </div>
        </Container>
      </div>

      {related.length ? (
        <Container className="py-(--spacing-section)">
          <h2 className="eyebrow mb-10 border-b border-rose-200 pb-4">You may also consider</h2>
          <div className="grid grid-cols-1 gap-x-7 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((item, index) => (
              <Reveal key={item.id} delay={index * 80}>
                <ProductCard product={item} />
              </Reveal>
            ))}
          </div>
        </Container>
      ) : null}
    </>
  );
}
