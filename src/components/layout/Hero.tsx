import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { site } from "@/data/site";

/**
 * The hero reproduces the brand deck's title lockup: a gold copperplate word
 * riding across a wide-tracked serif wordmark.
 *
 * A full-bleed photograph runs behind both the lockup and the supporting copy,
 * down to the divider above the assurance strip, with the brand rose laid over
 * it as a tint rather than under it. The banner is deliberately held to about a
 * quarter of the viewport: the type is sized off `vh` as well as `vw` so a
 * short laptop screen shrinks the wordmark instead of pushing the copy below
 * the fold.
 *
 * The panel stays light on purpose. The script word is gold-500, which is a
 * low-contrast decorative accent by design — it disappears entirely on
 * anything as deep as rose-300 (1.6:1).
 */

export function Hero() {
  return (
    <section className="relative pt-(--spacing-header)">
      {/* ---- The panel: photograph + rose tint, running behind the lockup
           and the supporting copy, ending at the divider. ------------------ */}
      <div className="relative overflow-hidden">
        {/* 1. Base rose. Only ever seen where no photograph covers it, and
              while one is still loading. */}
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-r from-rose-100 via-rose-50 to-rose-100"
        />

        {/* 2. THE IMAGE PANEL — spans the lockup and the copy alike, so the
              photograph has no edge to seam against and runs down to the
              divider. Swap the file; nothing above this layer needs touching. */}
        <div aria-hidden className="absolute inset-0">
          <Image
            src="/hero-diamonds.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>

        {/* ---- Banner: the lockup, over the panel ------------------------ */}
        <div className="relative flex min-h-[20vh] items-end">
          <Container
            width="wide"
            className="relative z-10 pb-5 pt-6 lg:pt-8"
          >
            <div className="animate-(--animate-rise)">
              <p className="eyebrow mb-3">Ceylon &amp; Beyond · Unheated Natural Sapphires</p>

              <h1 className="relative">
                {/* The script word is decorative — repeated in an sr-only span
                    so the phrase reads as one line to a screen reader. */}
                <span
                  aria-hidden
                  className="script-accent block -mb-[0.28em] translate-x-1 text-[clamp(1.4rem,min(3.4vw,4.2vh),2.75rem)]"
                >
                  Luminous
                </span>
                <span className="sr-only">Luminous </span>
                <span className="block font-wordmark text-[clamp(1.9rem,min(7.4vw,8vh),5.5rem)] font-medium leading-[0.9] tracking-[0.04em] [font-variation-settings:'opsz'_96]">
                  SAPPHIRE
                </span>
              </h1>
            </div>
          </Container>
        </div>

        {/* ---- Supporting copy, still on the panel ----------------------- */}
        <Container width="wide" className="relative z-10 pb-7 pt-7 lg:pb-8 lg:pt-8">
          <div className="flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between lg:gap-16">
            <p className="max-w-2xl leading-relaxed text-ink-500">
              A quietly curated house of natural, ethically sourced gemstones. Every stone
              independently certified, every treatment disclosed — chosen for a life measured in
              generations rather than seasons.
            </p>

            <div className="flex flex-wrap items-center gap-4 lg:shrink-0">
              <Link
                href="/shop/all-sapphires"
                className="rounded-[2px] bg-ink-800 px-9 py-4 text-[0.72rem] uppercase tracking-[0.22em] text-ivory-50 transition-all duration-500 hover:-translate-y-px hover:bg-gold-500"
              >
                Explore the collection
              </Link>
              <Link
                href="/custom/enquiry"
                className="rounded-[2px] border border-gold-400/60 px-9 py-4 text-[0.72rem] uppercase tracking-[0.22em] text-ink-800 transition-all duration-500 hover:bg-gold-500 hover:text-ivory-50"
              >
                Bespoke enquiry
              </Link>
            </div>
          </div>
        </Container>

        {/* 3. Legibility gradient, left only. Neutral rather than rose so the
              photograph keeps its own colour — it exists purely to lift the
              lockup and the paragraph off whatever the shot is doing behind
              them. Fully transparent by 65%, so the stones on the right are
              untouched. Sits above the image and below the type; the two
              Containers carry z-10. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-r from-ivory-50/90 from-0% via-ivory-50/50 via-30% to-transparent to-65%"
        />

        {/* 4. Bottom landing. Short on purpose — the photo now runs to the
              divider, so this only softens the last inch rather than
              dissolving the bottom third of the shot. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-b from-transparent to-ivory-100"
        />
      </div>

      {/* ---- Assurance strip, back on the page ground -------------------- */}
      <Container width="wide" className="pb-12">
        <ul className="grid grid-cols-2 gap-x-6 gap-y-4 border-t border-rose-300 pt-6 sm:grid-cols-4">
          {site.assurances.map((item) => (
            <li key={item.label} className="text-[0.68rem] uppercase tracking-[0.18em] text-ink-400">
              <span className="text-gold-600">{item.label}</span>{" "}
              <span className="block sm:inline">{item.detail}</span>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
