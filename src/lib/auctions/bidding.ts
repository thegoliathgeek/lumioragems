/**
 * Bidding rules.
 *
 * Deliberately free of `server-only` and of any I/O: the bid panel and the
 * `/api/bids` endpoint must agree to the cent on what the next valid bid is,
 * and the only way to guarantee that is for both to call the same functions.
 * The server is still the authority — the client copy is a courtesy that
 * avoids a round trip to be told a bid was too low.
 */

import type { LotStatus } from "@/types";

/* ---------------------------------------------------------------------------
   Session window

   The seeded catalogue is a fixture, not a record of a sale that happened, so
   it is anchored to the coming Sunday rather than to a date that would quietly
   go stale. A backend replaces this with real timestamps and nothing else in
   the module changes.
   ------------------------------------------------------------------------ */

/** AEST, as a fixed offset. The venue does not observe the DST shift. */
const VENUE_OFFSET_MINUTES = 10 * 60;
const SESSION_OPEN_HOUR = 19;
/** The session runs an hour; lots close on a ladder inside it. */
export const SESSION_MINUTES = 60;
/** A bid inside this window pushes the lot's close back by the same amount. */
export const SOFT_CLOSE_MINUTES = 2;
/** How long before a lot closes it is called "closing". */
const CLOSING_SOON_MINUTES = 5;

export function sessionWindow(now: Date = new Date()): { opensAt: Date; closesAt: Date } {
  // Shift into a UTC-backed clock that reads as venue-local, so the calendar
  // parts below are the venue's day rather than the server's.
  const venue = new Date(now.getTime() + VENUE_OFFSET_MINUTES * 60_000);
  const daysUntilSunday = (7 - venue.getUTCDay()) % 7;

  let opensAtMs = Date.UTC(
    venue.getUTCFullYear(),
    venue.getUTCMonth(),
    venue.getUTCDate() + daysUntilSunday,
    SESSION_OPEN_HOUR - VENUE_OFFSET_MINUTES / 60,
  );

  // Today is Sunday but the session has already run its course — roll forward.
  if (now.getTime() > opensAtMs + SESSION_MINUTES * 60_000) {
    opensAtMs += 7 * 24 * 60 * 60_000;
  }

  return {
    opensAt: new Date(opensAtMs),
    closesAt: new Date(opensAtMs + SESSION_MINUTES * 60_000),
  };
}

/* ---------------------------------------------------------------------------
   Increments
   ------------------------------------------------------------------------ */

/**
 * The increment ladder, in the base currency. A bid must land on a rung: it
 * is the ladder, not the bidder, that decides what the next bid is worth.
 */
const LADDER: { upTo: number; step: number }[] = [
  { upTo: 1_000, step: 50 },
  { upTo: 3_000, step: 100 },
  { upTo: 10_000, step: 250 },
  { upTo: 25_000, step: 500 },
  { upTo: Number.POSITIVE_INFINITY, step: 1_000 },
];

export function incrementFor(amount: number): number {
  return LADDER.find((rung) => amount < rung.upTo)?.step ?? 1_000;
}

/**
 * The lowest acceptable next bid. The opening bid stands on its own — the
 * first bidder pays it exactly, and only from there does the ladder apply.
 */
export function nextBidFor(currentBid: number, bidCount: number): number {
  if (bidCount === 0) return currentBid;
  return currentBid + incrementFor(currentBid);
}

/** Successive rungs above the next bid, for the panel's quick-bid row. */
export function bidLadder(nextBid: number, rungs = 3): number[] {
  const steps: number[] = [];
  let amount = nextBid;
  for (let index = 0; index < rungs; index += 1) {
    steps.push(amount);
    amount += incrementFor(amount);
  }
  return steps;
}

/* ---------------------------------------------------------------------------
   State
   ------------------------------------------------------------------------ */

export function lotStatus(input: {
  now: Date;
  opensAt: Date;
  closesAt: Date;
  reserveMet: boolean;
  bidCount: number;
}): LotStatus {
  const now = input.now.getTime();

  if (now < input.opensAt.getTime()) return "upcoming";

  if (now >= input.closesAt.getTime()) {
    return input.bidCount > 0 && input.reserveMet ? "sold" : "passed";
  }

  const remaining = input.closesAt.getTime() - now;
  return remaining <= CLOSING_SOON_MINUTES * 60_000 ? "closing" : "open";
}

/**
 * A bid landing inside the soft-close window pushes the close back, so a lot
 * can never be won by arriving a second before the hammer.
 */
export function softClose(closesAt: Date, placedAt: Date): Date {
  const remaining = closesAt.getTime() - placedAt.getTime();
  if (remaining > SOFT_CLOSE_MINUTES * 60_000) return closesAt;
  return new Date(placedAt.getTime() + SOFT_CLOSE_MINUTES * 60_000);
}

export const LOT_STATUS_LABEL: Record<LotStatus, string> = {
  upcoming: "Opens Sunday",
  open: "Open",
  closing: "Closing",
  sold: "Sold",
  passed: "Passed",
};

/* ---------------------------------------------------------------------------
   Presentation
   ------------------------------------------------------------------------ */

/** "2h 04m 09s" — fixed width so the countdown does not jitter as it ticks. */
export function formatCountdown(milliseconds: number): string {
  const total = Math.max(0, Math.floor(milliseconds / 1000));
  const hours = Math.floor(total / 3600);
  const minutes = Math.floor((total % 3600) / 60);
  const seconds = total % 60;
  const pad = (value: number) => String(value).padStart(2, "0");

  if (total >= 24 * 3600) {
    const days = Math.floor(total / (24 * 3600));
    return `${days}d ${pad(hours % 24)}h ${pad(minutes)}m`;
  }
  return hours > 0 ? `${hours}h ${pad(minutes)}m ${pad(seconds)}s` : `${pad(minutes)}m ${pad(seconds)}s`;
}

/** A paddle number is derived from the bidder, never sequential or guessable. */
export function paddleFor(email: string): string {
  let hash = 0;
  for (let index = 0; index < email.length; index += 1) {
    hash = (hash * 31 + email.charCodeAt(index)) % 8_999;
  }
  return `Paddle ${hash + 1_000}`;
}
