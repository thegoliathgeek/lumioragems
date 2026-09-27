import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SessionBoard } from "@/components/auction/SessionBoard";
import { AuctionClock } from "@/components/auction/AuctionClock";
import { JsonLd } from "@/components/seo/JsonLd";
import { auctionStatus, getAuction, getLotViews, sessionSummary } from "@/lib/api/auctions";
import { pageMetadata, breadcrumbJsonLd } from "@/lib/seo/metadata";
import { site } from "@/data/site";

/**
 * Prices here change by the minute while the room is open, so the page is
 * rendered per request rather than cached. The lot board then keeps itself
 * current with a slow refresh; nothing on this page is ever served from a
 * snapshot of a price that has since been beaten.
 */
export const dynamic = "force-dynamic";

export const metadata = pageMetadata({
  title: "The Sunday Session",
  description:
    "A weekly timed auction of certified Ceylon sapphires and fine gemstones. Nine lots, one hour, no buyer's premium — your winning bid is the price of the stone.",
  path: "/auctions",
});

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Auctions", path: "/auctions" },
];

export default async function AuctionsPage() {
  const now = new Date();
  const auction = await getAuction(now);
  const lots = await getLotViews(now);
  const status = auctionStatus(auction, now);
  const summary = sessionSummary(lots);

  const opens = new Date(auction.opensAt).toLocaleDateString("en-AU", {
    weekday: "long",
    day: "numeric",
    month: "long",
    timeZone: "Australia/Sydney",
  });

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />

      <section className="border-b border-rose-200 pt-36 pb-14 lg:pt-44">
        <Container>
          <nav aria-label="Breadcrumb" className="mb-8 flex justify-center">
            <ol className="flex flex-wrap items-center gap-2 text-[0.65rem] uppercase tracking-[0.18em] text-ink-400">
              <li>
                <Link href="/" className="transition-colors hover:text-gold-600">Home</Link>
              </li>
              <li className="flex items-center gap-2">
                <span aria-hidden>·</span>
                <span aria-current="page" className="text-ink-600">Auctions</span>
              </li>
            </ol>
          </nav>

          <SectionHeading
            as="h1"
            size="lg"
            eyebrow={`${opens} · ${auction.timeLabel}`}
            script="The"
            title={auction.title.replace(/^The\s/, "")}
            intro={auction.intro}
          />
        </Container>
      </section>

      {/* ---- status band ---- */}
      <section className="border-b border-rose-200 bg-rose-50">
        <Container>
          <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-3 py-5">
            <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.68rem] uppercase tracking-[0.18em] text-ink-600">
              {status === "live" ? (
                <span className="flex items-center gap-2 text-gold-600">
                  <span aria-hidden className="size-1.5 rounded-full bg-gold-500 motion-safe:animate-pulse" />
                  Session live
                </span>
              ) : status === "upcoming" ? (
                <span className="text-gold-600">Catalogue open for commission bids</span>
              ) : (
                <span className="text-ink-500">Session complete</span>
              )}

              <span aria-hidden className="text-ink-400">·</span>
              <span>{summary.total} lots</span>
              {status === "upcoming" ? null : (
                <>
                  <span aria-hidden className="text-ink-400">·</span>
                  <span>{summary.open} open</span>
                  <span aria-hidden className="text-ink-400">·</span>
                  <span>{summary.sold} sold</span>
                  {summary.passed ? (
                    <>
                      <span aria-hidden className="text-ink-400">·</span>
                      <span>{summary.passed} passed</span>
                    </>
                  ) : null}
                </>
              )}
            </p>

            <AuctionClock
              target={status === "upcoming" ? auction.opensAt : auction.closesAt}
              label={status === "upcoming" ? "Opens in" : status === "live" ? "Room closes in" : undefined}
              refreshOnExpiry
              className="text-[0.68rem] uppercase tracking-[0.18em] text-ink-500"
            />
          </div>
        </Container>
      </section>

      <Container className="py-14">
        <SessionBoard lots={lots} status={status} />
      </Container>

      {/* ---- conditions ---- */}
      <section className="border-t border-rose-200 bg-rose-50 py-(--spacing-section-sm)">
        <Container width="narrow">
          <Reveal>
            <SectionHeading
              script="How"
              title="Bidding works"
              align="left"
              size="sm"
            />

            <ol className="mt-9 space-y-5">
              {auction.terms.map((term, index) => (
                <li key={term} className="flex gap-5 border-b border-rose-200 pb-5 last:border-0">
                  <span className="font-display text-lg text-gold-500 tabular-nums">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="text-sm leading-relaxed text-ink-500">{term}</p>
                </li>
              ))}
            </ol>

            <p className="mt-9 text-sm text-ink-500">
              Questions before you bid?{" "}
              <Link href="/contact" className="text-gold-600 link-underline">
                Speak to a gemmologist
              </Link>{" "}
              or call {site.phone}. We would far rather answer a question than take a bid
              someone regrets.
            </p>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
