export type GemHue =
  | "blue" | "teal" | "green" | "yellow" | "pink" | "padparadscha"
  | "peach" | "champagne" | "white" | "violet" | "purple"
  | "ruby" | "aquamarine" | "citrine" | "hessonite" | "garnet" | "zircon" | "default";

export type Availability = "available" | "reserved" | "sold";

export interface Product {
  id: string;
  slug: string;
  name: string;
  hue: GemHue;
  gemType: string;
  collections: string[];
  carat: number;
  shape: string;
  colour: string;
  clarity: string;
  origin: string;
  treatment: string;
  dimensions: string;
  certificate: string;
  price: number;
  availability: Availability;
  listedAt: string;
  description: string;
  images?: string[];
}

export interface Collection {
  slug: string;
  name: string;
  hue: GemHue;
  tagline: string;
  description: string;
  group: "sapphire" | "gemstone" | "curated";
  /** Tile photography. Falls back to the generated gem figure when absent. */
  image?: string;
  /** Stones held for this gem type. Absent on curated collections. */
  stock?: number;
}

/**
 * A block of long-form copy. Plain strings are paragraphs; the object forms
 * cover the sub-headings, lists and tables that policies and guides need.
 */
export type ContentBlock =
  | string
  | { heading: string }
  | { lead: string }
  | { list: string[] }
  | { table: { head: string[]; rows: string[][] } };

export interface JournalPost {
  slug: string;
  title: string;
  /** The italic line under the title. */
  subtitle?: string;
  excerpt: string;
  image?: string;
  cta?: { label: string; href: string };
  category: "Journal" | "Gem Cyclopedia";
  author: string;
  publishedAt: string;
  readingMinutes: number;
  body: ContentBlock[];
}

export interface VideoItem {
  id: string;
  title: string;
  description: string;
  youtubeId: string;
  durationLabel: string;
}

export interface FaqItem {
  question: string;
  answer: string;
  list?: string[];
  after?: string;
  group: string;
}

export interface PolicyDoc {
  slug: string;
  title: string;
  updatedAt: string;
  intro?: string;
  sections: { heading: string; body: ContentBlock[] }[];
  closing?: string;
}

export interface ApiResult<T> {
  ok: boolean;
  data?: T;
  error?: string;
}

/* ---------------------------------------------------------------------------
   Auctions
   ------------------------------------------------------------------------ */

export type AuctionStatus = "upcoming" | "live" | "closed";
export type LotStatus = "upcoming" | "open" | "closing" | "sold" | "passed";

export interface Bid {
  id: string;
  /**
   * Masked bidder handle. Bidder names are never published — the paddle
   * number is the only identity a lot page ever shows.
   */
  paddle: string;
  amount: number;
  placedAt: string;
  /** Raised by a standing maximum rather than typed by hand. */
  auto?: boolean;
}

/**
 * A bid in the seeded catalogue, timed relative to the session opening rather
 * than to a wall clock, so the fixture reads correctly whichever week it runs.
 */
export interface BidSeed {
  paddle: string;
  amount: number;
  /** Minutes after the session opens. */
  atMinute: number;
  auto?: boolean;
}

export interface Lot {
  id: string;
  slug: string;
  lotNumber: number;
  /** The catalogue stone under the hammer. Specs and photography come from it. */
  productSlug: string;
  openingBid: number;
  /** Low and high estimate, in the base currency. */
  estimate: [number, number];
  /** Absent means the lot sells to the highest bid, whatever it is. */
  reserve?: number;
  /** Minutes after the session opens that this lot closes. */
  closesAfterMinutes: number;
  /** Opening book. Live bids are appended by the bid store on top of these. */
  seedBids: BidSeed[];
}

export interface Auction {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  intro: string;
  /** e.g. "7:00 pm AEST / 5:00 pm AWST" — shown, never parsed. */
  timeLabel: string;
  opensAt: string;
  closesAt: string;
  terms: string[];
  lots: Lot[];
}

/** A lot joined to its catalogue stone and to its live bidding state. */
export interface LotView extends Lot {
  stone: Product;
  status: LotStatus;
  /** The opening bid until someone bids; the highest bid thereafter. */
  currentBid: number;
  bidCount: number;
  /** What the next bid must be at least. */
  nextBid: number;
  increment: number;
  /** Resolved close, including any soft-close extension. Newest bid first. */
  closesAt: string;
  history: Bid[];
  leadPaddle?: string;
  reserveMet: boolean;
}

/** The slice of lot state the bid endpoint returns to the panel. */
export interface LotState {
  slug: string;
  status: LotStatus;
  currentBid: number;
  bidCount: number;
  nextBid: number;
  increment: number;
  closesAt: string;
  history: Bid[];
  leadPaddle?: string;
  reserveMet: boolean;
}
