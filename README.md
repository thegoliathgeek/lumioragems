# Lumiora Gems

A luxury catalogue and enquiry website for natural sapphires and fine gemstones.
Built with Next.js App Router, TypeScript and Tailwind CSS v4.

Phase 1 is an enquiry-led catalogue: browse, search, and enquire. There is no
cart or checkout — high-value coloured stones are sold by conversation, and the
site is built around that.

---

## Quick start

```bash
npm install
cp .env.example .env.local     # fill in what you need; all of it is optional in dev
npm run dev                    # http://localhost:3000
```

```bash
npm run build && npm start     # production build
npm run typecheck              # tsc --noEmit
npm run lint
```

Node 18.18+ is required (Node 20 LTS or newer recommended).

---

## Stack

| Concern | Choice | Why |
|---|---|---|
| Framework | Next.js 15 (App Router) | Server components, static generation per route, built-in metadata and image pipeline |
| Language | TypeScript 5 (strict) | |
| Styling | Tailwind CSS v4 | Design tokens live in CSS via `@theme` — one source of truth |
| Validation | Zod | Same schema runs on client and server |
| Icons | lucide-react | |
| Email | Resend REST API | Called over `fetch`, so swapping to SES or Postmark is one file |
| Currency | Custom, built on `Intl.NumberFormat` | 61 currencies, live rates, no dependency |
| Fonts | `next/font` (self-hosted) | No render-blocking third-party request, no layout shift |

Product photography is optional. Every listing renders a faceted SVG gem
generated from the stone's own hue and cut, so the catalogue looks complete
before the photography shoot. Add an `images` array to a product and the
component prefers the real photograph automatically.

---

## Project structure

```
src/
├── app/                      routes (App Router)
│   ├── api/                  route handlers — enquiry, newsletter, products, rates
│   ├── shop/[collection]/    collection listing
│   ├── shop/product/[slug]/  product detail
│   ├── discover/journal/     articles and cyclopedia entries
│   ├── policies/[slug]/      legal pages
│   ├── sitemap.ts robots.ts  generated SEO files
│   └── layout.tsx            fonts, header, footer, org JSON-LD
├── components/
│   ├── ui/                   Container, Button, SectionHeading, Reveal, PageHeader
│   ├── layout/               Header, Footer, Hero
│   ├── gem/                  GemFigure (SVG renderer), ProductImage
│   ├── shop/                 ProductCard, CatalogueBrowser
│   ├── currency/             CurrencyProvider, CurrencySwitcher, Price
│   ├── forms/                EnquiryForm, NewsletterForm
│   └── seo/                  JsonLd
├── lib/
│   ├── api/                  backend client + typed data accessors
│   ├── currency/             registry, live rates, conversion + formatting
│   ├── design/tokens.ts      palette mirrored for non-CSS consumers
│   ├── security/             rate limiting, HTML/header sanitising
│   ├── validation/schemas.ts Zod schemas
│   ├── email/send.ts         transactional email
│   └── seo/metadata.ts       page metadata + JSON-LD builders
├── data/                     Phase 1 content (products, collections, journal, FAQ, policies)
└── types/                    shared TypeScript contracts
```

---

## Routes

| Route | Page |
|---|---|
| `/` | Home |
| `/shop` | Shop Gems landing |
| `/shop/all-sapphires` | Full sapphire catalogue |
| `/shop/newly-listed` | Recent additions |
| `/shop/{colour}-sapphires` | Colour collections (blue, yellow, pink, teal-green, padparadscha, peach-champagne, white, violet-purple, colour-change, unique-colours) |
| `/shop/ruby` · `/aquamarine` · `/pairs` · `/other-gemstones` | Other collections |
| `/shop/product/{slug}` | Product detail + enquiry |
| `/custom` · `/process` · `/gallery` · `/enquiry` | Custom jewellery |
| `/discover` · `/journal` · `/journal/{slug}` · `/gem-cyclopedia` · `/video-library` | Discover |
| `/about` · `/contact` · `/faq` | |
| `/policies/shipping` · `/refund` · `/privacy` · `/terms` | Legal |
| `/api/enquiry` · `/api/newsletter` · `/api/products` · `/api/rates` | Route handlers |

Legacy Shopify-style URLs (`/collections/*`, `/products/*`, `/blogs/*`) are
301-redirected in `next.config.ts` so existing inbound links and search rankings
survive a migration.

---

## Backend integration

Phase 1 reads from `src/data/`. Nothing else needs to change to go live.

Setting `API_BASE_URL` switches every data accessor to the live backend:

```
GET /v1/products
GET /v1/products/{slug}
GET /v1/collections
```

`src/lib/api/client.ts` adds a bearer token, an 8-second timeout, normalised
errors, and Next.js cache tags. If the backend is unreachable the site falls
back to local data rather than failing the render — so a backend outage
degrades the catalogue's freshness, not its availability.

---

## Currency

Prices are authored **once**, in `src/data/products.ts`, always in the base
currency — **AUD**. Everything else is a conversion, so no price is ever
duplicated across the codebase.

- **61 currencies** across six regions, chosen from a searchable panel in the
  header (and inside the mobile drawer).
- **Default is AUD.** Because AUD is also the base, the default price is exact
  rather than a rounded conversion.
- **Live rates** are fetched server-side from `open.er-api.com` (no API key) and
  cached for six hours. The browser only ever calls `/api/rates` on our own
  origin, which keeps `connect-src 'self'` intact in the CSP and collapses all
  visitor traffic into a single upstream call per refresh window.
- **Graceful degradation.** If the feed is unreachable, indicative fallback
  rates in `src/lib/currency/rates.ts` are used and prices still render. Set
  `DISABLE_LIVE_RATES=true` to skip the feed entirely.
- **Geo pre-selection.** Middleware reads the CDN country header
  (`x-vercel-ip-country` / `cf-ipcountry`) and pre-selects a sensible currency
  from a 90-country map. An explicit choice by the visitor is stored separately
  and always wins.
- **Presentation rounding.** Converted amounts are rounded to deliberate
  figures — `A$7,400`, never `A$7,392.16`. `Intl` handles minor units per
  currency, so JPY and KRW correctly show no decimals.
- **Persistence** via a one-year `lumiora_currency` cookie.

### Adding or changing a currency

Add an entry to `currencies` in `src/lib/currency/currencies.ts` and a fallback
rate in `rates.ts`. To change the base currency, update `BASE_CURRENCY` and
re-author the `price` fields in `src/data/products.ts` in that currency.

### A note on the first paint

Pages are statically generated, so the HTML ships with base-currency prices and
the stored preference is applied on hydration. A visitor who has chosen a
non-default currency sees a brief swap on first load — the trade-off any static
site makes for a per-visitor preference. If zero-flash pricing matters more than
static generation, read the cookie in a Server Component and drop
`generateStaticParams`; the currency modules already support that.

---

## Security

- **Headers** — CSP, HSTS, `X-Frame-Options: DENY`, `nosniff`, Referrer-Policy and Permissions-Policy set in `next.config.ts`
- **Cross-origin writes** — blocked in `middleware.ts` for all mutating `/api` requests
- **Validation** — every payload parsed with Zod server-side; client validation is a courtesy only
- **Rate limiting** — 5 enquiries/min, 3 newsletter signups/min, 60 catalogue reads/min, 30 rate lookups/min per IP
- **Bot defence** — hidden honeypot field; bots get a `200` so they learn nothing
- **Injection** — user input HTML-escaped before entering emails; CR/LF stripped from header values
- **Payload limits** — oversized request bodies rejected before parsing
- **Secrets** — API keys read server-side only, never in a client bundle

The rate limiter is in-process. On a multi-instance or serverless host, move it
to Redis (Upstash) — the call signature is designed to survive that swap.

---

## SEO

- Per-page metadata, canonical URLs, Open Graph and Twitter cards via `lib/seo/metadata.ts`
- JSON-LD: `JewelryStore`, `WebSite` + SearchAction, `Product` with offers, `Article`, `FAQPage`, `BreadcrumbList`
- Generated `sitemap.xml` (every collection, product, article and policy) and `robots.txt`
- Static generation with ISR — collections and products revalidate every 15 minutes
- Semantic headings, real breadcrumbs, descriptive alt text

## Accessibility

Skip link, visible focus rings, labelled inputs with `aria-invalid` and inline
errors, `aria-live` result counts, keyboard-operable menus and filters, and
`prefers-reduced-motion` honoured globally.

---

## Phase 2

The codebase is arranged so these land without restructuring:

- **Admin dashboard** — point `API_BASE_URL` at the backend and add authenticated CRUD; the frontend already consumes that contract
- **WhatsApp** — `site.whatsapp` is already in the config; add a click-to-chat button and route enquiries through the Business API
- **1-to-1 demo booking** — add a `/book` route and a calendar provider; the enquiry email module already handles confirmations

---

## Deployment

Works on any Node host. Vercel needs no configuration. Set the environment
variables from `.env.example` in the host's dashboard — particularly
`NEXT_PUBLIC_SITE_URL`, which drives canonical URLs, the sitemap and JSON-LD.
