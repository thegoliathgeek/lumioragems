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
