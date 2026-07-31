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
    description:
      "A velvety cornflower blue with the soft, slightly sleepy saturation that Ceylon is prized for. Unheated, eye clean, and cut to hold colour evenly from every angle.",
  },
  {
    id: "LG-1002", slug: "padparadscha-lotus-2-18ct", name: "Padparadscha Sapphire",
    hue: "padparadscha", gemType: "Sapphire", collections: ["all-sapphires", "padparadscha-sapphires", "newly-listed"],
    carat: 2.18, shape: "Oval", colour: "Pink-Orange", clarity: "Eye Clean",
    origin: "Sri Lanka (Ceylon)", treatment: "Unheated", dimensions: "8.44 × 6.71 × 4.32 mm",
    certificate: "GIA Certified", price: 20500, availability: "available", listedAt: "2026-07-22",
    description:
      "The rarest expression of corundum — a true lotus-and-sunrise blend of pink and orange, holding both hues simultaneously rather than shifting between them.",
  },
  {
    id: "LG-1003", slug: "teal-parti-sapphire-2-64ct", name: "Teal Parti Sapphire",
    hue: "teal", gemType: "Sapphire", collections: ["all-sapphires", "teal-green-sapphires"],
    carat: 2.64, shape: "Hexagon", colour: "Teal / Blue-Green", clarity: "Eye Clean",
    origin: "Australia", treatment: "Unheated", dimensions: "8.90 × 7.85 × 4.95 mm",
    certificate: "In-house Certified", price: 4650, availability: "available", listedAt: "2026-06-30",
    description:
      "A hexagonal step cut that plays the stone's natural blue and green zoning against each other. A modern collector's stone, and unusually flattering on the hand.",
  },
  {
    id: "LG-1004", slug: "royal-blue-madagascar-4-05ct", name: "Royal Blue Sapphire",
    hue: "blue", gemType: "Sapphire", collections: ["all-sapphires", "blue-sapphires"],
    carat: 4.05, shape: "Emerald", colour: "Royal Blue", clarity: "Slightly Included",
    origin: "Madagascar", treatment: "Heated", dimensions: "10.02 × 8.11 × 5.44 mm",
    certificate: "GRS Certified", price: 10700, availability: "reserved", listedAt: "2026-06-12",
    description:
      "Deep, even royal blue in a classic emerald cut. The step facets favour colour over sparkle, which is exactly what a stone of this saturation calls for.",
  },
  {
    id: "LG-1005", slug: "golden-yellow-sapphire-5-11ct", name: "Golden Yellow Sapphire",
    hue: "yellow", gemType: "Sapphire", collections: ["all-sapphires", "yellow-sapphires"],
    carat: 5.11, shape: "Cushion", colour: "Golden Yellow", clarity: "Eye Clean",
    origin: "Sri Lanka (Ceylon)", treatment: "Heated", dimensions: "10.44 × 9.20 × 6.02 mm",
    certificate: "IGI Certified", price: 5900, availability: "available", listedAt: "2026-05-28",
    description:
      "A generous golden yellow with warmth rather than lemon sharpness. Frequently sought as a Pukhraj stone, and equally at home in a contemporary setting.",
  },
  {
    id: "LG-1006", slug: "hot-pink-sapphire-1-88ct", name: "Vivid Pink Sapphire",
    hue: "pink", gemType: "Sapphire", collections: ["all-sapphires", "pink-sapphires", "newly-listed"],
    carat: 1.88, shape: "Round", colour: "Vivid Pink", clarity: "Eye Clean",
    origin: "Madagascar", treatment: "Heated", dimensions: "7.42 × 7.40 × 4.66 mm",
    certificate: "In-house Certified", price: 3400, availability: "available", listedAt: "2026-07-25",
    description:
      "Saturated, slightly purplish pink in a brilliant round cut. Bright under almost any lighting, which makes it an unusually easy stone to wear daily.",
  },
  {
    id: "LG-1007", slug: "peach-sapphire-2-32ct", name: "Peach Sapphire",
    hue: "peach", gemType: "Sapphire", collections: ["all-sapphires", "peach-champagne-sapphires"],
    carat: 2.32, shape: "Oval", colour: "Soft Peach", clarity: "Eye Clean",
    origin: "Sri Lanka (Ceylon)", treatment: "Unheated", dimensions: "8.60 × 6.90 × 4.51 mm",
    certificate: "In-house Certified", price: 3900, availability: "available", listedAt: "2026-06-05",
    description:
      "A gentle peach with a whisper of pink at the edges. Particularly beautiful in rose gold, where the metal echoes rather than competes with the stone.",
  },
  {
    id: "LG-1008", slug: "white-sapphire-3-01ct", name: "White Sapphire",
    hue: "white", gemType: "Sapphire", collections: ["all-sapphires", "white-sapphires"],
    carat: 3.01, shape: "Round", colour: "Colourless", clarity: "Eye Clean",
    origin: "Sri Lanka (Ceylon)", treatment: "Unheated", dimensions: "8.85 × 8.83 × 5.70 mm",
    certificate: "IGI Certified", price: 2470, availability: "available", listedAt: "2026-05-14",
    description:
      "Bright and entirely colourless, cut to modern proportions for maximum return of light. A natural, fully traceable alternative to a diamond centre stone.",
  },
  {
    id: "LG-1009", slug: "violet-sapphire-2-07ct", name: "Violet Sapphire",
    hue: "violet", gemType: "Sapphire", collections: ["all-sapphires", "violet-purple-sapphires"],
    carat: 2.07, shape: "Pear", colour: "Violet", clarity: "Eye Clean",
    origin: "Sri Lanka (Ceylon)", treatment: "Unheated", dimensions: "9.80 × 6.55 × 4.20 mm",
    certificate: "In-house Certified", price: 4150, availability: "available", listedAt: "2026-06-21",
    description:
      "A clean violet that leans blue in daylight and plum indoors. Cut as a pear to lengthen the stone's natural crystal shape without sacrificing weight.",
  },
  {
    id: "LG-1010", slug: "colour-change-sapphire-2-55ct", name: "Colour-Change Sapphire",
    hue: "violet", gemType: "Sapphire", collections: ["all-sapphires", "colour-change-sapphires", "unique-colours"],
    carat: 2.55, shape: "Cushion", colour: "Blue to Plum", clarity: "Slightly Included",
    origin: "Tanzania", treatment: "Unheated", dimensions: "8.20 × 7.60 × 5.10 mm",
    certificate: "GRS Certified", price: 8900, availability: "available", listedAt: "2026-07-02",
    description:
      "Steel blue under daylight, shifting to a warm plum under incandescent light. The change is complete and repeatable rather than a subtle tonal drift.",
  },
  {
    id: "LG-1011", slug: "pigeons-blood-ruby-1-64ct", name: "Pigeon's Blood Ruby",
    hue: "ruby", gemType: "Ruby", collections: ["ruby", "newly-listed"],
    carat: 1.64, shape: "Cushion", colour: "Pigeon's Blood Red", clarity: "Slightly Included",
    origin: "Mozambique", treatment: "Unheated", dimensions: "7.10 × 6.45 × 4.02 mm",
    certificate: "GRS Certified", price: 25200, availability: "available", listedAt: "2026-07-27",
    description:
      "The red that gives ruby its reputation — deeply saturated with a faint fluorescent glow that lifts the stone in daylight. Unheated, with GRS confirmation of origin.",
  },
  {
    id: "LG-1012", slug: "santa-maria-aquamarine-6-40ct", name: "Santa Maria Aquamarine",
    hue: "aquamarine", gemType: "Aquamarine", collections: ["aquamarine"],
    carat: 6.4, shape: "Emerald", colour: "Deep Sea Blue", clarity: "Loupe Clean",
    origin: "Brazil", treatment: "Heated", dimensions: "13.20 × 9.80 × 6.90 mm",
    certificate: "In-house Certified", price: 6700, availability: "available", listedAt: "2026-04-30",
    description:
      "A Santa Maria blue with none of the green that lesser aquamarine carries. Loupe clean, and large enough to make the colour read across a room.",
  },
  {
    id: "LG-1013", slug: "matched-blue-sapphire-pair-3-20ctw", name: "Matched Blue Sapphire Pair",
    hue: "blue", gemType: "Sapphire", collections: ["all-sapphires", "blue-sapphires", "pairs"],
    carat: 3.2, shape: "Oval", colour: "Medium Blue", clarity: "Eye Clean",
    origin: "Sri Lanka (Ceylon)", treatment: "Heated", dimensions: "7.60 × 5.80 mm (each)",
    certificate: "In-house Certified", price: 5150, availability: "available", listedAt: "2026-05-02",
    description:
      "A true matched pair — cut from the same rough, aligned for tone, saturation and outline. Total weight 3.20 ct across the two stones.",
  },
  {
    id: "LG-1014", slug: "mint-green-sapphire-1-95ct", name: "Mint Green Sapphire",
    hue: "green", gemType: "Sapphire", collections: ["all-sapphires", "teal-green-sapphires"],
    carat: 1.95, shape: "Round", colour: "Mint Green", clarity: "Eye Clean",
    origin: "Montana, USA", treatment: "Unheated", dimensions: "7.55 × 7.52 × 4.80 mm",
    certificate: "In-house Certified", price: 2920, availability: "sold", listedAt: "2026-03-18",
    description:
      "A pale, cool mint with excellent transparency. Montana sapphires of this clarity in a fully traceable supply chain are increasingly difficult to source.",
  },
  {
    id: "LG-1015", slug: "champagne-sapphire-3-77ct", name: "Champagne Sapphire",
    hue: "champagne", gemType: "Sapphire", collections: ["all-sapphires", "peach-champagne-sapphires", "unique-colours"],
    carat: 3.77, shape: "Radiant", colour: "Champagne", clarity: "Eye Clean",
    origin: "Sri Lanka (Ceylon)", treatment: "Unheated", dimensions: "9.40 × 7.90 × 5.30 mm",
    certificate: "In-house Certified", price: 4500, availability: "available", listedAt: "2026-06-16",
    description:
      "A warm, softly golden champagne with hints of rose. The radiant cut adds brilliance without pushing the colour towards yellow.",
  },
  {
    id: "LG-1016", slug: "bicolour-parti-sapphire-3-08ct", name: "Bi-Colour Parti Sapphire",
    hue: "teal", gemType: "Sapphire", collections: ["all-sapphires", "unique-colours", "teal-green-sapphires"],
    carat: 3.08, shape: "Kite", colour: "Blue / Yellow Parti", clarity: "Eye Clean",
    origin: "Australia", treatment: "Unheated", dimensions: "11.20 × 8.10 × 5.00 mm",
    certificate: "In-house Certified", price: 5080, availability: "available", listedAt: "2026-07-09",
    description:
      "Two distinct colour zones — a cool blue and a warm yellow — divided cleanly across a kite cut. Genuinely unrepeatable, as all parti sapphires are.",
  },
  {
    id: "LG-1017", slug: "cobalt-spinel-1-42ct", name: "Cobalt Spinel",
    hue: "blue", gemType: "Spinel", collections: ["other-gemstones", "newly-listed"],
    carat: 1.42, shape: "Cushion", colour: "Cobalt Blue", clarity: "Eye Clean",
    origin: "Vietnam", treatment: "Unheated", dimensions: "6.40 × 6.05 × 4.10 mm",
    certificate: "GRS Certified", price: 15500, availability: "available", listedAt: "2026-07-29",
    description:
      "An electric cobalt blue that no sapphire quite reproduces. Cobalt spinel is rarer than fine sapphire and, among collectors, considerably more sought after.",
  },
  {
    id: "LG-1018", slug: "rubellite-tourmaline-4-88ct", name: "Rubellite Tourmaline",
    hue: "pink", gemType: "Tourmaline", collections: ["other-gemstones"],
    carat: 4.88, shape: "Oval", colour: "Raspberry Pink", clarity: "Slightly Included",
    origin: "Mozambique", treatment: "Unheated", dimensions: "12.10 × 9.05 × 6.20 mm",
    certificate: "In-house Certified", price: 3060, availability: "available", listedAt: "2026-04-11",
    description:
      "A saturated raspberry rubellite that holds its colour under artificial light — the quality that separates true rubellite from ordinary pink tourmaline.",
  },
];

export const productsBySlug = new Map(products.map((p) => [p.slug, p]));
