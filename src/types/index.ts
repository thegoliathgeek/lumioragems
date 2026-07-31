export type GemHue =
  | "blue" | "teal" | "green" | "yellow" | "pink" | "padparadscha"
  | "peach" | "champagne" | "white" | "violet" | "purple"
  | "ruby" | "aquamarine" | "default";

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
}

export interface JournalPost {
  slug: string;
  title: string;
  excerpt: string;
  category: "Journal" | "Gem Cyclopedia";
  author: string;
  publishedAt: string;
  readingMinutes: number;
  body: string[];
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
  group: string;
}

export interface PolicyDoc {
  slug: string;
  title: string;
  updatedAt: string;
  sections: { heading: string; body: string[] }[];
}

export interface ApiResult<T> {
  ok: boolean;
  data?: T;
  error?: string;
}
