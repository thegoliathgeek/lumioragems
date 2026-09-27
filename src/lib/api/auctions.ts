import "server-only";

import { auctionCopy, auctionLots, lotsBySlug } from "@/data/auctions";
import { readBook } from "@/lib/auctions/store";
import {
  SESSION_MINUTES,
  incrementFor,
  lotStatus,
  nextBidFor,
  sessionWindow,
} from "@/lib/auctions/bidding";
import { getProduct } from "./products";
import type { Auction, AuctionStatus, Bid, Lot, LotState, LotView } from "@/types";

/**
 * The sale-room read model.
 *
 * A lot on its own is only the terms of sale. Everything a page renders — the
 * stone, the price, whether the lot is still open — is assembled here, so no
 * component has to know that the book lives in one place and the catalogue in
 * another. `getProduct` already falls back from the backend to local data, and
 * the lots inherit that for free.
 */

export async function getAuction(now: Date = new Date()): Promise<Auction> {
  const { opensAt, closesAt } = sessionWindow(now);

  return {
    ...auctionCopy,
    terms: [...auctionCopy.terms],
    opensAt: opensAt.toISOString(),
    closesAt: closesAt.toISOString(),
    lots: auctionLots,
  };
}

export function auctionStatus(auction: Auction, now: Date = new Date()): AuctionStatus {
  const time = now.getTime();
  if (time < Date.parse(auction.opensAt)) return "upcoming";
  if (time >= Date.parse(auction.closesAt)) return "closed";
  return "live";
}

/** Whole session, joined and priced. Ordered by lot number. */
export async function getLotViews(now: Date = new Date()): Promise<LotView[]> {
  const { opensAt } = sessionWindow(now);

  const views = await Promise.all(
    auctionLots.map((lot) => resolveLot(lot, opensAt, now)),
  );
  return views.filter((view): view is LotView => view !== null);
}

export async function getLotView(slug: string, now: Date = new Date()): Promise<LotView | null> {
  const lot = lotsBySlug.get(slug);
  if (!lot) return null;

  const { opensAt } = sessionWindow(now);
  return resolveLot(lot, opensAt, now);
}

/** The neighbouring lots, for the previous/next control on a lot page. */
export function lotNeighbours(lotNumber: number): { previous?: Lot; next?: Lot } {
  return {
    previous: auctionLots.find((lot) => lot.lotNumber === lotNumber - 1),
    next: auctionLots.find((lot) => lot.lotNumber === lotNumber + 1),
  };
}

export const lotCount = auctionLots.length;

/* ------------------------------------------------------------------------ */

async function resolveLot(lot: Lot, opensAt: Date, now: Date): Promise<LotView | null> {
  const stone = await getProduct(lot.productSlug);
  if (!stone) {
    // A lot whose stone has left the catalogue is a data fault, not a 404 for
    // the visitor — drop it from the session and say so in the log.
    console.error(`[auctions] lot ${lot.id} references missing stone ${lot.productSlug}`);
    return null;
  }

  return { ...lot, ...lotState(lot, opensAt, now), stone };
}

/**
 * The live figures for one lot: the seeded book up to the current minute,
 * plus anything bid since, plus what that means for the next bid and the clock.
 */
export function lotState(lot: Lot, opensAt: Date, now: Date): LotState {
  const elapsedMinutes = (now.getTime() - opensAt.getTime()) / 60_000;

  const seeded: Bid[] = lot.seedBids
    .filter((seed) => seed.atMinute <= elapsedMinutes)
    .map((seed, index) => ({
      id: `${lot.slug}-seed-${index}`,
      paddle: seed.paddle,
      amount: seed.amount,
      placedAt: new Date(opensAt.getTime() + seed.atMinute * 60_000).toISOString(),
      ...(seed.auto ? { auto: true } : {}),
    }));

  const { bids: live, extendedTo } = readBook(lot.slug);

  const scheduledClose = opensAt.getTime() + lot.closesAfterMinutes * 60_000;
  const closesAt = new Date(Math.max(scheduledClose, extendedTo ?? 0));

  // Commission bids are held back until the room opens, exactly as they would
  // be on the rostrum — publishing them early would give the book away.
  const sessionOpen = now.getTime() >= opensAt.getTime();
  const published = sessionOpen ? live : live.filter((bid) => !bid.commission);

  const all = [...seeded, ...published].sort(
    (a, b) => Date.parse(a.placedAt) - Date.parse(b.placedAt) || a.amount - b.amount,
  );

  const leading = all.reduce<Bid | undefined>(
    (best, bid) => (!best || bid.amount > best.amount ? bid : best),
    undefined,
  );

  const currentBid = leading?.amount ?? lot.openingBid;
  const bidCount = all.length;
  const reserveMet = lot.reserve === undefined || currentBid >= lot.reserve;

  return {
    slug: lot.slug,
    status: lotStatus({ now, opensAt, closesAt, reserveMet, bidCount }),
    currentBid,
    bidCount,
    nextBid: nextBidFor(currentBid, bidCount),
    increment: incrementFor(currentBid),
    closesAt: closesAt.toISOString(),
    history: all.reverse(),
    leadPaddle: leading?.paddle,
    reserveMet,
  };
}

/** Summary line for the session banner. */
export function sessionSummary(views: LotView[]) {
  return {
    total: views.length,
    open: views.filter((view) => view.status === "open" || view.status === "closing").length,
    sold: views.filter((view) => view.status === "sold").length,
    passed: views.filter((view) => view.status === "passed").length,
    minutes: SESSION_MINUTES,
  };
}
