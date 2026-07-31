import Link from "next/link";
import { Instagram, Facebook, Youtube, Mail, Phone } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { NewsletterForm } from "@/components/forms/NewsletterForm";
import { site } from "@/data/site";
import { sapphireCollections, gemstoneCollections } from "@/data/collections";

const columns = [
  {
    title: "Sapphires",
    links: sapphireCollections.slice(0, 6).map((c) => ({ label: c.name, href: `/shop/${c.slug}` })),
  },
  {
    title: "Gemstones",
    links: gemstoneCollections.map((c) => ({ label: c.name, href: `/shop/${c.slug}` })),
  },
  {
    title: "Discover",
    links: [
      { label: "Journal", href: "/discover/journal" },
      { label: "Gem Cyclopedia", href: "/discover/gem-cyclopedia" },
      { label: "Video Library", href: "/discover/video-library" },
      { label: "Custom Jewellery", href: "/custom" },
      { label: "About Us", href: "/about" },
      { label: "FAQ", href: "/faq" },
    ],
  },
];

const policyLinks = [
  { label: "Shipping", href: "/policies/shipping" },
  { label: "Refunds", href: "/policies/refund" },
  { label: "Privacy", href: "/policies/privacy" },
  { label: "Terms", href: "/policies/terms" },
];

export function Footer() {
  return (
    <footer className="mt-(--spacing-section-sm) border-t border-rose-200 bg-rose-100">
      <Container className="py-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div>
            <p className="font-display text-xl tracking-[0.3em] text-ink-900">LUMIORA</p>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-500">{site.description}</p>

            <div className="mt-7">
              <p className="eyebrow mb-3">The Letter</p>
              <NewsletterForm />
            </div>
          </div>

          {columns.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <p className="eyebrow mb-4">{column.title}</p>
              <ul className="space-y-2.5">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-ink-500 transition-colors hover:text-gold-600">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-14 grid gap-8 border-t border-rose-300 pt-9 sm:grid-cols-2">
          <div className="space-y-2 text-sm text-ink-500">
            <a href={`mailto:${site.email}`} className="flex items-center gap-2.5 transition-colors hover:text-gold-600">
              <Mail aria-hidden className="size-3.5" /> {site.email}
            </a>
            <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="flex items-center gap-2.5 transition-colors hover:text-gold-600">
              <Phone aria-hidden className="size-3.5" /> {site.phone}
            </a>
            <p className="pt-1 text-xs text-ink-400">
              {site.address.street}, {site.address.locality} {site.address.postalCode}
            </p>
          </div>

          <div className="flex items-start gap-5 sm:justify-end">
            <a href={site.socials.instagram} aria-label="Instagram" rel="noopener noreferrer" target="_blank" className="text-ink-500 transition-colors hover:text-gold-600">
              <Instagram className="size-4" />
            </a>
            <a href={site.socials.facebook} aria-label="Facebook" rel="noopener noreferrer" target="_blank" className="text-ink-500 transition-colors hover:text-gold-600">
              <Facebook className="size-4" />
            </a>
            <a href={site.socials.youtube} aria-label="YouTube" rel="noopener noreferrer" target="_blank" className="text-ink-500 transition-colors hover:text-gold-600">
              <Youtube className="size-4" />
            </a>
          </div>
        </div>

        <div className="mt-9 flex flex-col gap-4 border-t border-rose-300 pt-7 text-xs text-ink-400 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {site.legalName}. All rights reserved.</p>
          <div className="flex flex-wrap gap-5">
            {policyLinks.map((link) => (
              <Link key={link.href} href={link.href} className="transition-colors hover:text-gold-600">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
