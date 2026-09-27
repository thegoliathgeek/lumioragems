import "server-only";

import { incrementFor, softClose } from "./bidding";
import type { Bid } from "@/types";

/**
 * The live bid book, held in process memory.
 *
 * This is the Phase 1 counterpart to `src/lib/security/rate-limit.ts`: correct
 * for a single instance, and deliberately shaped so that moving it to Postgres
 * or Redis is a change of body, not of signature. A real book needs a
 * transaction around `place()` — two bids arriving in the same millisecond
 * must not both be accepted as the leader — which is the main reason this
 * cannot stay in memory past a single node.
 */

export interface LiveBid extends Bid {
  /** Left before the session opened, and withheld from the public book. */
  commission?: boolean;
}

interface Book {
  bids: LiveBid[];
  /** Standing maxima, keyed by paddle. The engine bids these out for you. */
  maxima: Map<string, number>;
  /** Close pushed back by the soft-close rule, as epoch milliseconds. */
  extendedTo?: number;
}

const books = new Map<string, Book>();

/** A lot that attracts more than this is being hammered, not bid on. */
const MAX_BIDS_PER_LOT = 500;

function bookFor(lotSlug: string): Book {
  let book = books.get(lotSlug);
  if (!book) {
    book = { bids: [], maxima: new Map() };
    books.set(lotSlug, book);
  }
  return book;
}

export function readBook(lotSlug: string): { bids: LiveBid[]; extendedTo?: number } {
  const book = books.get(lotSlug);
  if (!book) return { bids: [] };
  return { bids: book.bids, extendedTo: book.extendedTo };
}

/** The standing maximum a paddle holds on a lot, if any. */
export function maximumFor(lotSlug: string, paddle: string): number | undefined {
  return books.get(lotSlug)?.maxima.get(paddle);
}

export interface PlaceResult {
  ok: boolean;
  error?: string;
  /** Bids written by this call, the bidder's own first. */
  placed: LiveBid[];
}

export interface PlaceInput {
  lotSlug: string;
  paddle: string;
  amount: number;
  /** A ceiling the engine may bid up to on the bidder's behalf. */
  maxBid?: number;
  /** The highest bid already showing, from seeds and earlier live bids. */
  standingBid: number;
  standingBidCount: number;
  /** What the bid must at least be, computed by the caller from the rules. */
  nextBid: number;
  /** The lot's scheduled close, before any extension. */
  closesAt: Date;
  /** True while the session has not yet opened. */
  commission: boolean;
  now: Date;
}

/**
 * Record a bid, then let any standing maximum answer it.
 *
 * The counter-bidding below is the ordinary proxy rule: a bidder who left a
 * maximum keeps the lot until it is exhausted, and pays one increment over the
 * under-bidder rather than their whole maximum.
 */
export function place(input: PlaceInput): PlaceResult {
  const book = bookFor(input.lotSlug);

  if (book.bids.length >= MAX_BIDS_PER_LOT) {
    return { ok: false, error: "This lot has taken as many bids as it can hold.", placed: [] };
  }

  if (input.amount < input.nextBid) {
    return {
      ok: false,
      error: `The next bid on this lot is A$${input.nextBid.toLocaleString("en-AU")}.`,
      placed: [],
    };
  }

  if (input.maxBid !== undefined && input.maxBid < input.amount) {
    return { ok: false, error: "Your maximum cannot be below the bid you are placing.", placed: [] };
  }

  const placed: LiveBid[] = [];
  const stamp = input.now.toISOString();

  const own: LiveBid = {
    id: `${input.lotSlug}-${input.now.getTime()}-${book.bids.length}`,
    paddle: input.paddle,
    amount: input.amount,
    placedAt: stamp,
    ...(input.commission ? { commission: true } : {}),
  };
  book.bids.push(own);
  placed.push(own);

  if (input.maxBid !== undefined) {
    book.maxima.set(input.paddle, input.maxBid);
  }

  // A commission bid is held, not contested — the room has not opened yet.
  if (!input.commission) {
    let leader = input.paddle;
    let price = input.amount;

    // Answer with the strongest rival maximum, one increment at a time, until
    // it can no longer beat the leader. Bounded by MAX_BIDS_PER_LOT above.
    for (let round = 0; round < 24; round += 1) {
      const rival = strongestRival(book, leader, price);
      if (!rival) break;

      const counter = Math.min(rival.maximum, price + incrementFor(price));
      if (counter <= price) break;

      const bid: LiveBid = {
        id: `${input.lotSlug}-${input.now.getTime()}-${book.bids.length}`,
        paddle: rival.paddle,
        amount: counter,
        placedAt: stamp,
        auto: true,
      };
      book.bids.push(bid);
      placed.push(bid);

      leader = rival.paddle;
      price = counter;
    }
  }

  // Soft close. Measured against the extension already in force, so repeated
  // late bids keep pushing the lot rather than resetting it.
  const scheduled = new Date(Math.max(input.closesAt.getTime(), book.extendedTo ?? 0));
  const extended = softClose(scheduled, input.now);
  if (extended.getTime() > scheduled.getTime()) {
    book.extendedTo = extended.getTime();
  }

  return { ok: true, placed };
}

function strongestRival(book: Book, leader: string, price: number) {
  let best: { paddle: string; maximum: number } | undefined;

  for (const [paddle, maximum] of book.maxima) {
    if (paddle === leader || maximum <= price) continue;
    if (!best || maximum > best.maximum) best = { paddle, maximum };
  }
  return best;
}

/** Test and development only — the book is otherwise append-only. */
export function resetBook(lotSlug?: string) {
  if (lotSlug) books.delete(lotSlug);
  else books.clear();
}
