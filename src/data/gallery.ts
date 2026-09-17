export interface GalleryPiece {
  title: string;
  brief: string;
  image: string;
  year: string;
}

/** Past bespoke commissions, newest first. */
export const galleryPieces: GalleryPiece[] = [
  { title: "The Kolar Solitaire", brief: "A 3.2 ct unheated Ceylon blue in an East–West setting, 18k white gold, knife-edge band.", image: "/gallery/kolar-solitaire.jpg", year: "2026" },
  { title: "Padma Three-Stone", brief: "Padparadscha centre flanked by peach sapphires, rose gold, hand-engraved gallery.", image: "/gallery/padma-three-stone.jpg", year: "2026" },
  { title: "The Teal Hexagon", brief: "A parti-coloured Australian teal in a bezel with a hidden halo, yellow gold.", image: "/gallery/teal-hexagon.jpg", year: "2025" },
  { title: "Grandmother's Reset", brief: "An inherited 2.4 ct yellow sapphire reset into a low-profile daily band.", image: "/gallery/grandmothers-reset.jpg", year: "2025" },
  { title: "Violet Pendant", brief: "Pear-cut violet sapphire, diamond-set bail, on a fine platinum chain.", image: "/gallery/violet-pendant.jpg", year: "2025" },
  { title: "The Matched Drops", brief: "A matched pair of Ceylon blues as detachable drops on diamond studs.", image: "/gallery/matched-drops.jpg", year: "2024" },
];
