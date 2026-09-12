import type { Collection } from "@/types";

/**
 * `stock` is the number of stones held for each gem type, from the vault stock
 * sheet. It is independent of how many of those stones have an individual
 * listing in `products.ts`. Curated collections carry no stock of their own.
 */
export const collections: Collection[] = [
  { slug: "all-sapphires", name: "All Sapphires", hue: "blue", group: "curated",
    tagline: "The complete collection",
    image: "/collections/all-sapphires.jpg",
    description: "Every natural sapphire currently in the Lumiora vault, across the full spectrum of colour, cut and origin." },
  { slug: "newly-listed", name: "Newly Listed", hue: "champagne", group: "curated",
    tagline: "Fresh from the vault",
    image: "/collections/newly-listed.jpg",
    description: "The most recent additions — stones newly certified, photographed and released to the collection." },

  { slug: "blue-sapphires", name: "Blue Sapphires", hue: "blue", group: "sapphire", stock: 6,
    tagline: "The classical blue",
    image: "/collections/blue-sapphires.jpg",
    description: "From the velvety cornflower of Ceylon to the deep royal blues of Madagascar — the colour that made sapphire a byword for rarity." },
  { slug: "yellow-sapphires", name: "Yellow Sapphires", hue: "yellow", group: "sapphire", stock: 4,
    tagline: "Sunlight, held still",
    image: "/collections/yellow-sapphires.jpg",
    description: "Canary through golden honey. Prized both as a jewel and, in Vedic tradition, as the stone of Jupiter." },
  { slug: "pink-sapphires", name: "Pink Sapphires", hue: "pink", group: "sapphire", stock: 4,
    tagline: "Between rose and ruby",
    image: "/collections/pink-sapphires.jpg",
    description: "Delicate blush to vivid hot pink — corundum in its most romantic register." },
  { slug: "white-sapphires", name: "White Sapphires", hue: "white", group: "sapphire", stock: 6,
    tagline: "Clarity without colour",
    image: "/collections/white-sapphires.jpg",
    description: "Bright, brilliant and entirely colourless — an enduring natural alternative to the diamond." },

  { slug: "green-tourmaline", name: "Green Tourmaline", hue: "green", group: "gemstone", stock: 10,
    tagline: "Mint to forest",
    description: "Verdelite in every green from pale mint to deep forest. Tourmaline darkens along the length of the crystal, so each stone is cut to show its best green face-up." },
  { slug: "pink-tourmaline", name: "Pink Tourmaline", hue: "pink", group: "gemstone", stock: 10,
    tagline: "Blush to rubellite",
    description: "From the softest shell pink to saturated raspberry rubellite — a tourmaline whose colour holds steady from daylight to candlelight." },
  // Blank on the stock sheet; shown as available on request.
  { slug: "aquamarine", name: "Aquamarine", hue: "aquamarine", group: "gemstone", stock: 0,
    tagline: "The colour of still water",
    image: "/collections/aquamarine.jpg",
    description: "Clean, glacial blue-green beryl, cut to maximise the stone's characteristic clarity." },
  { slug: "green-zircon", name: "Green Zircon", hue: "zircon", group: "gemstone", stock: 10,
    tagline: "Fire without the diamond",
    description: "A natural gem, not to be confused with synthetic cubic zirconia. Zircon's high dispersion gives it a fire close to diamond's, and green is among its rarer colours." },
  { slug: "amethyst", name: "Amethyst", hue: "purple", group: "gemstone", stock: 10,
    tagline: "Quartz in royal purple",
    description: "Soft lilac through deep, red-flashed violet — once reserved for royalty and bishops, and still one of the most wearable coloured stones." },
  { slug: "citrine", name: "Citrine", hue: "citrine", group: "gemstone", stock: 10,
    tagline: "Honey and sunlight",
    description: "The golden quartz, from pale lemon through deep Madeira orange. Bright, hard-wearing and generous in size." },
  { slug: "spinel", name: "Spinel", hue: "ruby", group: "gemstone", stock: 10,
    tagline: "The great impostor",
    description: "Mistaken for ruby for centuries — the Black Prince's Ruby in the Imperial State Crown is a spinel. Reds, pinks and the rare cobalt blues, almost always untreated." },
  { slug: "hessonite-garnet", name: "Hessonite Garnet", hue: "hessonite", group: "gemstone", stock: 10,
    tagline: "The cinnamon stone",
    description: "Honey to cinnamon orange garnet with a characteristic soft, treacly glow. Known in Vedic tradition as Gomed, the stone of Rahu." },
  { slug: "almandine-spessartine-garnet", name: "Almandine & Spessartine Garnet", hue: "garnet", group: "gemstone", stock: 10,
    tagline: "Wine and mandarin",
    description: "Two garnets from opposite ends of the warm spectrum: almandine in deep wine red, spessartine in vivid mandarin orange." },
];

export const collectionsBySlug = new Map(collections.map((c) => [c.slug, c]));

export const sapphireCollections = collections.filter((c) => c.group === "sapphire");
export const gemstoneCollections = collections.filter((c) => c.group === "gemstone");
