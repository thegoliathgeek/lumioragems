import type { Lot } from "@/types";

/**
 * The weekly timed session.
 *
 * Every figure here is in the base currency (AUD — see
 * `src/lib/currency/currencies.ts`), like the catalogue. A lot carries only
 * what the sale adds: a lot number, an opening bid, an estimate, a reserve and
 * a place on the closing ladder. The stone itself is the catalogue record
 * named by `productSlug`, so photography, weight, origin and certificate are
 * authored once and never drift between the shop and the sale room.
 *
 * Times are relative rather than absolute. `closesAfterMinutes` and each seed
 * bid's `atMinute` are offsets from the session opening, which
 * `sessionWindow()` resolves to the coming Sunday. That keeps the fixture
 * honest whichever week it is read in; a backend supplies real timestamps and
 * the shape is unchanged.
 */

export const auctionCopy = {
  id: "LGA-2026-W39",
  slug: "sunday-session",
  title: "The Sunday Session",
  subtitle: "Nine stones, one hour, no buyer's premium",
  timeLabel: "7:00 pm AEST · 2:30 pm IST",
  intro:
    "A short, curated session of stones from the same vaults that supply the shop — each one certified, photographed unset, and sent on approval before you pay. Lots close two minutes apart on a ladder, and a bid in the final two minutes carries the lot another two, so nothing is won on the clock alone.",
  terms: [
    "Your winning bid is the price of the lot. There is no buyer's premium.",
    "Bids are binding. A registered bid cannot be withdrawn once the lot closes.",
    "Lots close on a ladder, two minutes apart. A bid inside the last two minutes extends that lot by two minutes.",
    "A lot marked no reserve sells to the highest bid, whatever it is. Where a reserve is set, the lot is passed if bidding stops short of it.",
    "Every stone ships insured and arrives with its certificate. The 14-day assurance applies to auction lots exactly as it does to the shop.",
  ],
} as const;

export const auctionLots: Lot[] = [
  {
    id: "LGA-L01",
    slug: "lot-1-white-sapphire-3-01ct",
    lotNumber: 1,
    productSlug: "white-sapphire-3-01ct",
    openingBid: 1_200,
    estimate: [1_800, 2_400],
    closesAfterMinutes: 8,
    seedBids: [
      { paddle: "Paddle 2184", amount: 1_200, atMinute: 1 },
      { paddle: "Paddle 3071", amount: 1_300, atMinute: 2 },
      { paddle: "Paddle 2184", amount: 1_400, atMinute: 4, auto: true },
      { paddle: "Paddle 5920", amount: 1_500, atMinute: 6 },
    ],
  },
  {
    id: "LGA-L02",
    slug: "lot-2-rubellite-tourmaline-4-88ct",
    lotNumber: 2,
    productSlug: "rubellite-tourmaline-4-88ct",
    openingBid: 1_400,
    estimate: [2_200, 2_900],
    closesAfterMinutes: 14,
    seedBids: [
      { paddle: "Paddle 1466", amount: 1_400, atMinute: 2 },
      { paddle: "Paddle 4432", amount: 1_500, atMinute: 5 },
      { paddle: "Paddle 1466", amount: 1_600, atMinute: 8, auto: true },
      { paddle: "Paddle 7318", amount: 1_800, atMinute: 11 },
      { paddle: "Paddle 1466", amount: 1_900, atMinute: 13, auto: true },
    ],
  },
  {
    id: "LGA-L03",
    slug: "lot-3-vivid-pink-sapphire-1-88ct",
    lotNumber: 3,
    productSlug: "hot-pink-sapphire-1-88ct",
    openingBid: 1_600,
    estimate: [2_500, 3_200],
    reserve: 2_300,
    closesAfterMinutes: 20,
    seedBids: [
      { paddle: "Paddle 5920", amount: 1_600, atMinute: 3 },
      { paddle: "Paddle 3071", amount: 1_700, atMinute: 6 },
      { paddle: "Paddle 5920", amount: 1_900, atMinute: 9, auto: true },
      { paddle: "Paddle 2184", amount: 2_100, atMinute: 12 },
      { paddle: "Paddle 5920", amount: 2_200, atMinute: 15, auto: true },
      { paddle: "Paddle 2184", amount: 2_400, atMinute: 18 },
    ],
  },
  {
    id: "LGA-L04",
    slug: "lot-4-matched-blue-sapphire-pair-3-20ctw",
    lotNumber: 4,
    productSlug: "matched-blue-sapphire-pair-3-20ctw",
    openingBid: 2_400,
    estimate: [3_800, 4_900],
    reserve: 3_600,
    closesAfterMinutes: 26,
    seedBids: [
      { paddle: "Paddle 7318", amount: 2_400, atMinute: 4 },
      { paddle: "Paddle 1466", amount: 2_600, atMinute: 9 },
      { paddle: "Paddle 7318", amount: 2_800, atMinute: 13, auto: true },
      { paddle: "Paddle 4432", amount: 3_000, atMinute: 17 },
      { paddle: "Paddle 7318", amount: 3_250, atMinute: 20, auto: true },
      { paddle: "Paddle 4432", amount: 3_500, atMinute: 22 },
      { paddle: "Paddle 7318", amount: 3_750, atMinute: 24, auto: true },
    ],
  },
  {
    id: "LGA-L05",
    slug: "lot-5-golden-yellow-sapphire-5-11ct",
    lotNumber: 5,
    productSlug: "golden-yellow-sapphire-5-11ct",
    openingBid: 2_800,
    estimate: [4_400, 5_600],
    reserve: 4_200,
    closesAfterMinutes: 32,
    seedBids: [
      { paddle: "Paddle 3071", amount: 2_800, atMinute: 6 },
      { paddle: "Paddle 2184", amount: 3_000, atMinute: 11 },
      { paddle: "Paddle 3071", amount: 3_250, atMinute: 16, auto: true },
      { paddle: "Paddle 5920", amount: 3_500, atMinute: 20 },
      { paddle: "Paddle 3071", amount: 3_750, atMinute: 24, auto: true },
      { paddle: "Paddle 5920", amount: 4_000, atMinute: 27 },
      { paddle: "Paddle 3071", amount: 4_250, atMinute: 30, auto: true },
    ],
  },
  {
    id: "LGA-L06",
    slug: "lot-6-santa-maria-aquamarine-6-40ct",
    lotNumber: 6,
    productSlug: "santa-maria-aquamarine-6-40ct",
    openingBid: 3_200,
    estimate: [5_000, 6_400],
    reserve: 4_800,
    closesAfterMinutes: 38,
    seedBids: [
      { paddle: "Paddle 4432", amount: 3_200, atMinute: 8 },
      { paddle: "Paddle 1466", amount: 3_450, atMinute: 14 },
      { paddle: "Paddle 4432", amount: 3_700, atMinute: 19, auto: true },
      { paddle: "Paddle 7318", amount: 4_000, atMinute: 24 },
      { paddle: "Paddle 4432", amount: 4_250, atMinute: 28, auto: true },
      { paddle: "Paddle 7318", amount: 4_500, atMinute: 32 },
      { paddle: "Paddle 4432", amount: 4_750, atMinute: 35, auto: true },
    ],
  },
  {
    id: "LGA-L07",
    slug: "lot-7-ceylon-cornflower-blue-3-42ct",
    lotNumber: 7,
    productSlug: "ceylon-cornflower-blue-3-42ct",
    openingBid: 3_600,
    estimate: [5_500, 7_000],
    reserve: 5_200,
    closesAfterMinutes: 44,
    seedBids: [
      { paddle: "Paddle 2184", amount: 3_600, atMinute: 10 },
      { paddle: "Paddle 5920", amount: 3_850, atMinute: 16 },
      { paddle: "Paddle 2184", amount: 4_100, atMinute: 22, auto: true },
      { paddle: "Paddle 3071", amount: 4_400, atMinute: 27 },
      { paddle: "Paddle 2184", amount: 4_750, atMinute: 31, auto: true },
      { paddle: "Paddle 3071", amount: 5_000, atMinute: 36 },
      { paddle: "Paddle 2184", amount: 5_250, atMinute: 40, auto: true },
      { paddle: "Paddle 3071", amount: 5_500, atMinute: 43 },
    ],
  },
  {
    id: "LGA-L08",
    slug: "lot-8-royal-blue-sapphire-4-05ct",
    lotNumber: 8,
    productSlug: "royal-blue-madagascar-4-05ct",
    openingBid: 5_000,
    estimate: [8_000, 10_200],
    reserve: 7_600,
    closesAfterMinutes: 50,
    seedBids: [
      { paddle: "Paddle 1466", amount: 5_000, atMinute: 12 },
      { paddle: "Paddle 7318", amount: 5_250, atMinute: 20 },
      { paddle: "Paddle 1466", amount: 5_750, atMinute: 26, auto: true },
      { paddle: "Paddle 4432", amount: 6_250, atMinute: 32 },
      { paddle: "Paddle 1466", amount: 6_750, atMinute: 38, auto: true },
      { paddle: "Paddle 4432", amount: 7_250, atMinute: 43 },
      { paddle: "Paddle 1466", amount: 7_750, atMinute: 47, auto: true },
      { paddle: "Paddle 4432", amount: 8_000, atMinute: 49 },
    ],
  },
  {
    id: "LGA-L09",
    slug: "lot-9-cobalt-spinel-1-42ct",
    lotNumber: 9,
    productSlug: "cobalt-spinel-1-42ct",
    openingBid: 7_500,
    estimate: [12_000, 15_000],
    reserve: 11_000,
    closesAfterMinutes: 56,
    seedBids: [
      { paddle: "Paddle 5920", amount: 7_500, atMinute: 15 },
      { paddle: "Paddle 2184", amount: 7_750, atMinute: 24 },
      { paddle: "Paddle 5920", amount: 8_250, atMinute: 31, auto: true },
      { paddle: "Paddle 3071", amount: 8_750, atMinute: 37 },
      { paddle: "Paddle 5920", amount: 9_250, atMinute: 42, auto: true },
      { paddle: "Paddle 3071", amount: 9_750, atMinute: 46 },
      { paddle: "Paddle 5920", amount: 10_250, atMinute: 50, auto: true },
      { paddle: "Paddle 3071", amount: 10_750, atMinute: 53 },
      { paddle: "Paddle 5920", amount: 11_250, atMinute: 55, auto: true },
    ],
  },
];

export const lotsBySlug = new Map(auctionLots.map((lot) => [lot.slug, lot]));
