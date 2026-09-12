export const site = {
  name: "Lumiora Gems",
  legalName: "Lumiora Gems",
  tagline: "Natural Sapphires & Fine Gemstones",
  established: 1990,
  description:
    "A quietly curated house of natural, ethically sourced sapphires and fine gemstones — each stone independently certified and chosen for a life measured in generations.",
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
  { label: "About Us", href: "/about", children: [] },
  { label: "Contact", href: "/contact", children: [] },
] as const;
