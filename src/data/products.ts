import type { Product } from "@/types";

/**
 * Phase 1 catalogue.
 *
 * `price` is always expressed in the base currency (AUD — see
 * `src/lib/currency/currencies.ts`). Every other currency shown on the site is
 * a live conversion of this figure, so this is the only place a price is ever
 * authored.
 *
 * This file is the fallback data source. When `API_BASE_URL` is configured the
 * catalogue is served from the backend instead (see `src/lib/api/products.ts`),
 * so the shape here intentionally matches the backend contract exactly.
 */
export const products: Product[] = [
  {
    id: "LG-1001", slug: "ceylon-cornflower-blue-3-42ct", name: "Ceylon Cornflower Blue Sapphire",
    hue: "blue", gemType: "Sapphire", collections: ["all-sapphires", "blue-sapphires", "newly-listed"],
    carat: 3.42, shape: "Cushion", colour: "Cornflower Blue", clarity: "Eye Clean",
    origin: "Sri Lanka (Ceylon)", treatment: "Unheated", dimensions: "9.12 × 8.04 × 5.61 mm",
    certificate: "GRS Certified", price: 7400, availability: "available", listedAt: "2026-07-18",
    images: ["/gems/ceylon-cornflower-blue-3-42ct.jpg"],
    description:
      "A velvety cornflower blue with the soft, slightly sleepy saturation that Ceylon is prized for. Unheated, eye clean, and cut to hold colour evenly from every angle.",
  },
  {
    id: "LG-1004", slug: "royal-blue-madagascar-4-05ct", name: "Royal Blue Sapphire",
    hue: "blue", gemType: "Sapphire", collections: ["all-sapphires", "blue-sapphires"],
    carat: 4.05, shape: "Emerald", colour: "Royal Blue", clarity: "Slightly Included",
    origin: "Madagascar", treatment: "Heated", dimensions: "10.02 × 8.11 × 5.44 mm",
    certificate: "GRS Certified", price: 10700, availability: "reserved", listedAt: "2026-06-12",
    images: ["/gems/royal-blue-madagascar-4-05ct.jpg"],
    description:
      "Deep, even royal blue in a classic emerald cut. The step facets favour colour over sparkle, which is exactly what a stone of this saturation calls for.",
  },
  {
    id: "LG-1005", slug: "golden-yellow-sapphire-5-11ct", name: "Golden Yellow Sapphire",
    hue: "yellow", gemType: "Sapphire", collections: ["all-sapphires", "yellow-sapphires"],
    carat: 5.11, shape: "Cushion", colour: "Golden Yellow", clarity: "Eye Clean",
    origin: "Sri Lanka (Ceylon)", treatment: "Heated", dimensions: "10.44 × 9.20 × 6.02 mm",
    certificate: "IGI Certified", price: 5900, availability: "available", listedAt: "2026-05-28",
    images: ["/gems/golden-yellow-sapphire-5-11ct.jpg"],
    description:
      "A generous golden yellow with warmth rather than lemon sharpness. Frequently sought as a Pukhraj stone, and equally at home in a contemporary setting.",
  },
  {
    id: "LG-1006", slug: "hot-pink-sapphire-1-88ct", name: "Vivid Pink Sapphire",
    hue: "pink", gemType: "Sapphire", collections: ["all-sapphires", "pink-sapphires", "newly-listed"],
    carat: 1.88, shape: "Round", colour: "Vivid Pink", clarity: "Eye Clean",
    origin: "Madagascar", treatment: "Heated", dimensions: "7.42 × 7.40 × 4.66 mm",
    certificate: "In-house Certified", price: 3400, availability: "available", listedAt: "2026-07-25",
    images: ["/gems/hot-pink-sapphire-1-88ct.jpg"],
    description:
      "Saturated, slightly purplish pink in a brilliant round cut. Bright under almost any lighting, which makes it an unusually easy stone to wear daily.",
  },
  {
    id: "LG-1008", slug: "white-sapphire-3-01ct", name: "White Sapphire",
    hue: "white", gemType: "Sapphire", collections: ["all-sapphires", "white-sapphires"],
    carat: 3.01, shape: "Round", colour: "Colourless", clarity: "Eye Clean",
    origin: "Sri Lanka (Ceylon)", treatment: "Unheated", dimensions: "8.85 × 8.83 × 5.70 mm",
    certificate: "IGI Certified", price: 2470, availability: "available", listedAt: "2026-05-14",
    images: ["/gems/white-sapphire-3-01ct.jpg"],
    description:
      "Bright and entirely colourless, cut to modern proportions for maximum return of light. A natural, fully traceable alternative to a diamond centre stone.",
  },
  {
    id: "LG-1012", slug: "santa-maria-aquamarine-6-40ct", name: "Santa Maria Aquamarine",
    hue: "aquamarine", gemType: "Aquamarine", collections: ["aquamarine"],
    carat: 6.4, shape: "Emerald", colour: "Deep Sea Blue", clarity: "Loupe Clean",
    origin: "Brazil", treatment: "Heated", dimensions: "13.20 × 9.80 × 6.90 mm",
    certificate: "In-house Certified", price: 6700, availability: "available", listedAt: "2026-04-30",
    images: ["/gems/santa-maria-aquamarine-6-40ct.jpg"],
    description:
      "A Santa Maria blue with none of the green that lesser aquamarine carries. Loupe clean, and large enough to make the colour read across a room.",
  },
  {
    id: "LG-1013", slug: "matched-blue-sapphire-pair-3-20ctw", name: "Matched Blue Sapphire Pair",
    hue: "blue", gemType: "Sapphire", collections: ["all-sapphires", "blue-sapphires"],
    carat: 3.2, shape: "Oval", colour: "Medium Blue", clarity: "Eye Clean",
    origin: "Sri Lanka (Ceylon)", treatment: "Heated", dimensions: "7.60 × 5.80 mm (each)",
    certificate: "In-house Certified", price: 5150, availability: "available", listedAt: "2026-05-02",
    images: ["/gems/matched-blue-sapphire-pair-3-20ctw.jpg"],
    description:
      "A true matched pair — cut from the same rough, aligned for tone, saturation and outline. Total weight 3.20 ct across the two stones.",
  },
  {
    id: "LG-1017", slug: "cobalt-spinel-1-42ct", name: "Cobalt Spinel",
    hue: "blue", gemType: "Spinel", collections: ["spinel", "newly-listed"],
    carat: 1.42, shape: "Cushion", colour: "Cobalt Blue", clarity: "Eye Clean",
    origin: "Vietnam", treatment: "Unheated", dimensions: "6.40 × 6.05 × 4.10 mm",
    certificate: "GRS Certified", price: 15500, availability: "available", listedAt: "2026-07-29",
    images: ["/gems/cobalt-spinel-1-42ct.jpg"],
    description:
      "An electric cobalt blue that no sapphire quite reproduces. Cobalt spinel is rarer than fine sapphire and, among collectors, considerably more sought after.",
  },
  {
    id: "LG-1018", slug: "rubellite-tourmaline-4-88ct", name: "Rubellite Tourmaline",
    hue: "pink", gemType: "Tourmaline", collections: ["pink-tourmaline"],
    carat: 4.88, shape: "Oval", colour: "Raspberry Pink", clarity: "Slightly Included",
    origin: "Mozambique", treatment: "Unheated", dimensions: "12.10 × 9.05 × 6.20 mm",
    certificate: "In-house Certified", price: 3060, availability: "available", listedAt: "2026-04-11",
    images: ["/gems/rubellite-tourmaline-4-88ct.jpg"],
    description:
      "A saturated raspberry rubellite that holds its colour under artificial light — the quality that separates true rubellite from ordinary pink tourmaline.",
  },
];

export const productsBySlug = new Map(products.map((p) => [p.slug, p]));
