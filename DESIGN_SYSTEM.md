# Lumiora Gems — Design System

Derived from the brand deck: ivory ground, muted-rose panels, antique-gold
accents, soft-charcoal ink.

Tokens are declared once in `src/app/globals.css` under `@theme`, which makes
them available as Tailwind utilities (`bg-rose-200`, `text-gold-500`,
`font-display`). `src/lib/design/tokens.ts` mirrors the same values for
non-CSS consumers — the SVG gem renderer and the HTML email templates.

**No component hard-codes a hex value.**

---

## Colour

| Token | Hex | Used for |
|---|---|---|
| `ivory-50` | `#faf9f6` | Raised surfaces, cards, form panels |
| `ivory-100` | `#f4f3ef` | Page background |
| `ivory-200` | `#edebe4` | Subtle fills |
| `rose-50` | `#f2ece9` | Filter panel, quiet callouts |
| `rose-100` | `#e8ded9` | Image wells, footer |
| `rose-200` | `#dbd0ca` | Feature panels, section bands, hairline borders |
| `rose-300` | `#c9bbb3` | Input borders, dividers |
| `gold-400` | `#c4a574` | Rules, sparkle, decorative strokes |
| `gold-500` | `#b08f5e` | Primary accent, script type, hover states |
| `gold-600` | `#96774a` | Eyebrows, small accented text (contrast-safe) |
| `ink-400` | `#8a877f` | Meta text, captions |
| `ink-500` | `#6d6a63` | Body copy |
| `ink-800` | `#3a3936` | Headings, primary buttons |
| `ink-900` | `#2a2926` | Wordmark, prices |
| `error` | `#a2402f` | Form errors |

Semantic aliases (`--color-surface`, `--color-accent`, `--color-heading`) sit
over the ramps so a rebrand touches one block.

---

## Typography

Three faces, three jobs.

| Role | Face | Where |
|---|---|---|
| Display | **Playfair Display** | Headings — high-contrast serif, echoing the deck's DIAMOND lockup |
| Script | **Pinyon Script** | The gold accent word above each heading. Decorative only, always paired with a real heading and mirrored in an `sr-only` span for screen readers |
| Body / UI | **Jost** | Body copy, navigation, labels, buttons — geometric humanist sans at weight 300 |

Fluid scale, so nothing needs breakpoint-specific font sizes:

```
--text-display-xl   clamp(3rem,   8vw,   6.5rem)    hero
--text-display-lg   clamp(2.4rem, 5.5vw, 4.25rem)   page titles
--text-display-md   clamp(2rem,   4vw,   3.1rem)    section headings
--text-display-sm   clamp(1.6rem, 3vw,   2.25rem)   sub-headings
```

`.eyebrow` — 0.7rem, `0.38em` tracking, uppercase, gold-600. The recurring
label device throughout the site.

---

## The signature

The one memorable element, taken directly from the deck: a **gold copperplate
word riding across an oversized serif line**, the two overlapping by roughly a
third of an em. It appears in the hero and above every section heading via
`<SectionHeading script="…" title="…" />`.

The script word is `aria-hidden` and repeated in an `sr-only` span, so it reads
as one continuous phrase to a screen reader while remaining purely decorative
visually.

Everything else stays disciplined — flat surfaces, hairline rules, generous
whitespace, no shadows on content. The boldness is spent in one place.

---

## Layout & space

- `Container` — `narrow` (48rem, prose), `default` (72rem), `wide` (88rem, hero)
- `--spacing-section` 7.5rem · `--spacing-section-sm` 4.5rem
- Grids: 1 column on mobile, 2 at `sm`, 3–4 at `lg`
- Radii deliberately small — `--radius-card` 6px, `--radius-image` 12px. Luxury reads as square, not rounded.

## Motion

`--ease-luxe: cubic-bezier(0.22, 0.72, 0.24, 1)` — slow out, gentle settle.
Durations 500–1200ms; hovers are unhurried by design.

Three uses only: a page-load rise on the hero, a scroll reveal on grids
(`<Reveal>`, staggered 60–90ms), and hover micro-interactions (gem scale, link
underline sweep, button lift). `prefers-reduced-motion` collapses all of it
globally in `globals.css`.

---

## Components

| Component | Purpose |
|---|---|
| `Container` | Width and gutter control |
| `SectionHeading` | The script + serif lockup |
| `PageHeader` | Interior page opener with breadcrumbs |
| `Button` | `solid` / `outline` / `quiet` |
| `Reveal` | Scroll-triggered fade-and-rise; renders visible without JS |
| `GemFigure` | Faceted SVG gem drawn from hue + cut |
| `ProductImage` | Real photography when present, `GemFigure` when not |
| `ProductCard` | Catalogue tile |
| `CatalogueBrowser` | Search, facets, sort |
| `EnquiryForm` / `NewsletterForm` | Validated, honeypot-protected forms |
| `JsonLd` | Structured data emitter |
| `CurrencySwitcher` | Searchable, region-grouped currency panel |
| `Price` | Base-currency amount rendered in the visitor's currency |

## Currency in the interface

The switcher sits in the header beside the Enquire button, and repeats inside
the mobile drawer under a `Currency` label. It is deliberately quiet — symbol,
code, chevron, at eyebrow scale — because it is a utility, not a call to action.

Prices use `tabular-nums` so figures do not shift width as the currency changes,
and every price is wrapped in a `<data value="AUD 7400">` element so the base
amount stays machine-readable whatever is displayed.

Sixty-one options is past the point where a plain `<select>` is usable, so the
panel adds a search field and groups by region. It remains fully keyboard
operable: focus moves to the search field on open, Escape closes and returns
focus to the trigger, and each option is a real `role="option"` button.

## Accessibility floor

Contrast meets WCAG AA for body text. Focus rings are gold, 2px, 3px offset,
never removed. Every input is labelled, errors are `aria-invalid` plus inline
text, and result counts announce via `aria-live`. Full keyboard operation,
including the mobile drawer and filter panel.
