import type { Metadata } from "next";
import { site } from "@/data/site";

const BASE = site.url;

interface PageMetaArgs {
  title: string;
  description: string;
  path: string;
  /** Set false on thin, duplicated or transactional pages. */
  index?: boolean;
  type?: "website" | "article";
  publishedTime?: string;
}

/** Single source of page-level metadata so no route hand-rolls its own tags. */
export function pageMetadata({
  title,
  description,
  path,
  index = true,
  type = "website",
  publishedTime,
}: PageMetaArgs): Metadata {
  const url = `${BASE}${path}`;
  const fullTitle = path === "/" ? title : `${title} — ${site.name}`;

  return {
    title: fullTitle,
    description,
    alternates: { canonical: url },
    robots: index
      ? { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 }
      : { index: false, follow: true },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: site.name,
      locale: "en_IN",
      type,
      ...(publishedTime ? { publishedTime } : {}),
    },
    twitter: { card: "summary_large_image", title: fullTitle, description },
  };
}

/* ---------------------------------------------------------------------------
   JSON-LD builders. Structured data is what earns rich results for a
   catalogue site, so every product, article and FAQ page emits it.
   ------------------------------------------------------------------------ */

export function organisationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "JewelryStore",
    name: site.name,
    description: site.description,
    url: BASE,
    email: site.email,
    telephone: site.phone,
    foundingDate: String(site.established),
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.locality,
      addressRegion: site.address.region,
      postalCode: site.address.postalCode,
      addressCountry: site.address.country,
    },
    sameAs: Object.values(site.socials),
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name,
    url: BASE,
    potentialAction: {
      "@type": "SearchAction",
      target: { "@type": "EntryPoint", urlTemplate: `${BASE}/shop/all-sapphires?q={search_term_string}` },
      "query-input": "required name=search_term_string",
    },
  };
}

export function productJsonLd(input: {
  name: string; description: string; sku: string; slug: string;
  price: number; availability: string; gemType: string; images?: string[];
}) {
  const availabilityUrl =
    input.availability === "available"
      ? "https://schema.org/InStock"
      : input.availability === "reserved"
        ? "https://schema.org/PreOrder"
        : "https://schema.org/SoldOut";

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: input.name,
    description: input.description,
    sku: input.sku,
    category: input.gemType,
    brand: { "@type": "Brand", name: site.name },
    ...(input.images?.length ? { image: input.images } : {}),
    offers: {
      "@type": "Offer",
      url: `${BASE}/shop/product/${input.slug}`,
      priceCurrency: "INR",
      price: input.price,
      availability: availabilityUrl,
      seller: { "@type": "Organization", name: site.name },
    },
  };
}

export function articleJsonLd(input: {
  title: string; description: string; slug: string; publishedAt: string; author: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: input.title,
    description: input.description,
    datePublished: input.publishedAt,
    author: { "@type": "Organization", name: input.author },
    publisher: { "@type": "Organization", name: site.name },
    mainEntityOfPage: `${BASE}/discover/journal/${input.slug}`,
  };
}

export function faqJsonLd(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

export function breadcrumbJsonLd(crumbs: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: `${BASE}${crumb.path}`,
    })),
  };
}
