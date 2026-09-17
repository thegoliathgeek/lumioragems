export const site = {
  name: "Lumiora Gems",
  legalName: "Lumiora Gems",
  tagline: "Natural Sapphires & Fine Gemstones",
  established: 1990,
  description:
    "Natural Ceylon sapphires and fine gemstones, hand-selected through more than three decades of Sri Lankan gemstone heritage and brought from Sri Lanka to Melbourne — each stone certified and chosen to be treasured for generations.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://lumioragems.com",
  email: "enquiries@lumioragems.com",
  phone: "+91 80 4000 1990",
  whatsapp: "+919000000000",
  address: {
    street: "12 Vittal Mallya Road",
    locality: "Bengaluru",
    region: "Karnataka",
    postalCode: "560001",
    country: "IN",
  },
  socials: {
    instagram: "https://instagram.com/lumioragems",
    facebook: "https://facebook.com/lumioragems",
    youtube: "https://youtube.com/@lumioragems",
  },
  assurances: [
    { label: "Insured", detail: "Worldwide Shipping" },
    { label: "Independently", detail: "Certified" },
    { label: "Ethically", detail: "Sourced" },
    { label: "14-Day", detail: "Assurance" },
  ],
} as const;

export const navigation = [
  {
    label: "Shop Gems",
    href: "/shop",
    children: [
      { label: "All Sapphires", href: "/shop/all-sapphires" },
      { label: "Newly Listed", href: "/shop/newly-listed" },
      { label: "Blue Sapphires", href: "/shop/blue-sapphires" },
      { label: "Spinel", href: "/shop/spinel" },
      { label: "Hessonite Garnet", href: "/shop/hessonite-garnet" },
      { label: "Every Collection", href: "/shop" },
    ],
  },
  {
    label: "Custom",
    href: "/custom",
    children: [
      { label: "The Service", href: "/custom" },
      { label: "Our Process", href: "/custom/process" },
      { label: "Design Gallery", href: "/custom/gallery" },
      { label: "Begin an Enquiry", href: "/custom/enquiry" },
    ],
  },
  {
    label: "Discover",
    href: "/discover",
    children: [
      { label: "Journal", href: "/discover/journal" },
      { label: "Gem Cyclopedia", href: "/discover/gem-cyclopedia" },
      { label: "Video Library", href: "/discover/video-library" },
    ],
  },
  {
    label: "Our Story",
    href: "/about",
    children: [
      { label: "The Lumiora Story", href: "/about" },
      { label: "From Mine to Masterpiece", href: "/about/sourcing" },
      { label: "FAQ", href: "/faq" },
    ],
  },
  { label: "Contact", href: "/contact", children: [] },
] as const;
