import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { site } from "@/data/site";

/**
 * The hero reproduces the brand deck's title lockup: an oversized serif word
 * with a gold copperplate line riding across it, set against an ivory field
 * with a single muted-rose panel holding the stone. The overlap is the point —
 * it is the one moment on the page where two type systems cross.
 */
export function Hero() {
  return (
    <section className="relative overflow-hidden pt-32 pb-(--spacing-section-sm) lg:pt-40">
      {/* muted-rose panel, right-hand side, echoing the deck */}
      <div
        aria-hidden
        className="absolute right-0 top-0 hidden h-[76%] w-[38%] bg-rose-200 lg:block"
      />

      <Container width="wide" className="relative">
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="animate-(--animate-rise)">
            <p className="eyebrow mb-8">Ceylon &amp; Beyond · Unheated Natural Sapphires</p>

            <h1 className="relative">
              <span
                aria-hidden
                className="script-accent block text-[clamp(3rem,8.5vw,6.2rem)] -mb-[0.34em] translate-x-2"
              >
                Luminous
              </span>
              <span className="sr-only">Luminous </span>
              <span className="block text-(length:--text-display-xl) tracking-[-0.02em]">
                SAPPHIRE
              </span>
            </h1>

            <p className="mt-10 max-w-md leading-relaxed text-ink-500">
              A quietly curated house of natural, ethically sourced gemstones. Every stone
              independently certified, every treatment disclosed — chosen for a life measured in
              generations rather than seasons.
            </p>

            <div className="mt-11 flex flex-wrap items-center gap-4">
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

          {/* Feature stone — drawn, not photographed, so Phase 1 ships without
              waiting on the photography shoot. */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative animate-(--animate-fade)">
              <svg
                viewBox="-110 -110 220 220"
                className="h-[clamp(17rem,38vw,25rem)] w-[clamp(17rem,38vw,25rem)]"
                role="img"
                aria-label="An illustrated cushion-cut sapphire"
              >
                <defs>
                  <radialGradient id="hero-halo" cx="50%" cy="45%" r="55%">
                    <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
                    <stop offset="60%" stopColor="#dbd0ca" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="#dbd0ca" stopOpacity="0" />
                  </radialGradient>
                  <radialGradient id="hero-stone" cx="38%" cy="30%" r="72%">
                    <stop offset="0%" stopColor="#a8c8f0" />
                    <stop offset="48%" stopColor="#3a66b0" />
                    <stop offset="100%" stopColor="#16305e" />
                  </radialGradient>
                  <linearGradient id="hero-sheen" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#ffffff" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                  </linearGradient>
                </defs>

                <circle cx="0" cy="0" r="105" fill="url(#hero-halo)" />
                <g>
                  <path
                    d="M0,-78 L55,-55 L78,0 L55,55 L0,78 L-55,55 L-78,0 L-55,-55 Z"
                    fill="url(#hero-stone)" stroke="#b08f5e" strokeWidth="1" strokeOpacity="0.55"
                  />
                  <path
                    d="M0,-42 L30,-30 L42,0 L30,30 L0,42 L-30,30 L-42,0 L-30,-30 Z"
                    fill="#8fb4e8" fillOpacity="0.3" stroke="#ffffff" strokeOpacity="0.32" strokeWidth="1"
                  />
                  <path
                    d="M0,-78 L0,-42 M55,-55 L30,-30 M78,0 L42,0 M55,55 L30,30 M0,78 L0,42 M-55,55 L-30,30 M-78,0 L-42,0 M-55,-55 L-30,-30"
                    stroke="#ffffff" strokeOpacity="0.22" strokeWidth="0.8"
                  />
                  <ellipse cx="-26" cy="-32" rx="15" ry="24" fill="url(#hero-sheen)" transform="rotate(-30 -26 -32)" />
                </g>
              </svg>
            </div>
          </div>
        </div>

        {/* assurance strip */}
        <ul className="mt-(--spacing-section-sm) grid grid-cols-2 gap-6 border-t border-rose-300 pt-8 sm:grid-cols-4">
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
