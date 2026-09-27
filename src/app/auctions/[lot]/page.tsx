import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { ProductImage } from "@/components/gem/ProductImage";
import { ConversionNote } from "@/components/currency/Price";
import { BidPanel } from "@/components/auction/BidPanel";
import { LotCard } from "@/components/auction/LotCard";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  auctionStatus,
  getAuction,
  getLotView,
  getLotViews,
  lotCount,
  lotNeighbours,
} from "@/lib/api/auctions";
import { pageMetadata, breadcrumbJsonLd } from "@/lib/seo/metadata";
import { site } from "@/data/site";
import { formatCarat } from "@/lib/utils";

/** Live prices, so never a cached one. See the note on the session page. */
export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ lot: string }> }) {
  const { lot: slug } = await params;
  const lot = await getLotView(slug);

  if (!lot) {
    return pageMetadata({ title: "Lot not found", description: "", path: `/auctions/${slug}`, index: false });
  }

  return pageMetadata({
    title: `Lot ${lot.lotNumber} · ${lot.stone.name}`,
    description: `${formatCarat(lot.stone.carat)} ${lot.stone.colour} ${lot.stone.gemType.toLowerCase()}, ${lot.stone.treatment.toLowerCase()}, ${lot.stone.certificate}. Opening bid ${lot.openingBid.toLocaleString()} AUD in The Sunday Session — no buyer's premium.`,
    path: `/auctions/${lot.slug}`,
  });
}

export default async function LotPage({ params }: { params: Promise<{ lot: string }> }) {
  const { lot: slug } = await params;

  const now = new Date();
  const lot = await getLotView(slug, now);
  if (!lot) notFound();

  const auction = await getAuction(now);
  const sessionStatus = auctionStatus(auction, now);
  const { previous, next } = lotNeighbours(lot.lotNumber);

  const others = (await getLotViews(now))
    .filter((other) => other.slug !== lot.slug)
    .slice(0, 3);

  const specs = [
    { label: "Weight", value: formatCarat(lot.stone.carat) },
    { label: "Cut", value: lot.stone.shape },
    { label: "Colour", value: lot.stone.colour },
    { label: "Clarity", value: lot.stone.clarity },
    { label: "Origin", value: lot.stone.origin },
    { label: "Treatment", value: lot.stone.treatment },
    { label: "Dimensions", value: lot.stone.dimensions },
    { label: "Certificate", value: lot.stone.certificate },
    { label: "Lot reference", value: lot.id },
  ];

  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Auctions", path: "/auctions" },
    { name: `Lot ${lot.lotNumber}`, path: `/auctions/${lot.slug}` },
  ];

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Product",
          name: lot.stone.name,
          description: lot.stone.description,
          sku: lot.id,
          category: lot.stone.gemType,
          brand: { "@type": "Brand", name: site.name },
          ...(lot.stone.images?.length ? { image: lot.stone.images } : {}),
          offers: {
            "@type": "Offer",
            "@id": `${site.url}/auctions/${lot.slug}`,
            url: `${site.url}/auctions/${lot.slug}`,
            priceCurrency: "AUD",
            price: lot.currentBid,
            priceValidUntil: lot.closesAt,
            availability:
              lot.status === "sold" || lot.status === "passed"
                ? "https://schema.org/SoldOut"
                : "https://schema.org/InStock",
            seller: { "@type": "Organization", name: site.name },
          },
        }}
      />

      <div className="pt-32 lg:pt-40">
        <Container>
          {/* ---- lot navigation ---- */}
          <div className="mb-10 flex flex-wrap items-center justify-between gap-4 border-b border-rose-200 pb-5">
            <Link
              href="/auctions"
              className="inline-flex items-center gap-2 text-[0.65rem] uppercase tracking-[0.18em] text-ink-500 transition-colors hover:text-gold-600"
            >
              <ArrowLeft aria-hidden className="size-3.5" />
              The Sunday Session
            </Link>

            <nav aria-label="Lot navigation" className="flex items-center gap-5 text-[0.65rem] uppercase tracking-[0.18em]">
              {previous ? (
                <Link href={`/auctions/${previous.slug}`} className="inline-flex items-center gap-1.5 text-ink-500 transition-colors hover:text-gold-600">
                  <ArrowLeft aria-hidden className="size-3" />
                  Lot {previous.lotNumber}
                </Link>
              ) : (
                <span className="text-ink-400/50">First lot</span>
              )}

              <span className="text-ink-600 tabular-nums">
                {lot.lotNumber} <span className="text-ink-400">/ {lotCount}</span>
              </span>

              {next ? (
                <Link href={`/auctions/${next.slug}`} className="inline-flex items-center gap-1.5 text-ink-500 transition-colors hover:text-gold-600">
                  Lot {next.lotNumber}
                  <ArrowRight aria-hidden className="size-3" />
                </Link>
              ) : (
                <span className="text-ink-400/50">Last lot</span>
              )}
            </nav>
          </div>

          <div className="grid gap-14 lg:grid-cols-2 lg:gap-16">
            {/* ---- stone ---- */}
            <div className="group lg:sticky lg:top-28 lg:self-start">
              <ProductImage product={lot.stone} priority gemSize={230} className="aspect-square" />

              <p className="mt-4 text-xs leading-relaxed text-ink-400">
                Photographed unset in daylight, unretouched. Colour on a screen is a guide,
                never a substitute — every lot is sent on approval before you pay.
              </p>
            </div>

            {/* ---- lot ---- */}
            <div>
              <p className="eyebrow mb-4">
                Lot {lot.lotNumber} · {lot.reserve === undefined ? "No reserve" : "Reserve set"} ·{" "}
                {lot.stone.gemType}
              </p>

              <h1 className="text-(length:--text-display-md)">{lot.stone.name}</h1>

              <p className="mt-5 max-w-lg leading-relaxed text-ink-500">{lot.stone.description}</p>

              <div className="mt-9">
                <BidPanel lot={lot} sessionStatus={sessionStatus} />
              </div>

              <ConversionNote className="mt-4" />

              <h2 className="eyebrow mt-12 border-b border-rose-200 pb-3">Item details</h2>
              <dl className="grid grid-cols-1 gap-x-10 sm:grid-cols-2">
                {specs.map((spec) => (
                  <div key={spec.label} className="flex justify-between gap-4 border-b border-rose-200 py-3">
                    <dt className="text-[0.68rem] uppercase tracking-[0.16em] text-ink-400">{spec.label}</dt>
                    <dd className="text-right text-sm text-ink-800">{spec.value}</dd>
                  </div>
                ))}
              </dl>

              <p className="mt-8 text-xs leading-relaxed text-ink-400">
                The hammer price is the price. There is no buyer&rsquo;s premium and no lot fee;
                insured shipping and the certificate are included. The 14-day assurance applies
                to auction lots exactly as it does to the shop.
              </p>

              <p className="mt-5 text-sm text-ink-500">
                Something you want to know before you bid?{" "}
                <Link
                  href={`/contact?lot=${encodeURIComponent(lot.slug)}`}
                  className="text-gold-600 link-underline"
                >
                  Ask about this lot
                </Link>
                {" "}— we answer within the hour while the room is open.
              </p>
            </div>
          </div>
        </Container>
      </div>

      {others.length ? (
        <Container className="py-(--spacing-section)">
          <div className="mb-10 flex items-baseline justify-between gap-4 border-b border-rose-200 pb-4">
            <h2 className="eyebrow">More in this session</h2>
            <Link href="/auctions" className="text-[0.65rem] uppercase tracking-[0.18em] text-gold-600 link-underline">
              See all {lotCount}
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-x-7 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((other, index) => (
              <Reveal key={other.id} delay={index * 80}>
                <LotCard lot={other} />
              </Reveal>
            ))}
          </div>
        </Container>
      ) : null}
    </>
  );
}
