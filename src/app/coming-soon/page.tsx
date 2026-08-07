import type { Metadata } from "next";
import { Instagram, Facebook, Youtube, Mail, Phone } from "lucide-react";
import { site } from "@/data/site";

/**
 * The holding page.
 *
 * Deliberately self-contained: no header, no footer, no currency provider, no
 * data or API dependency — middleware serves this for every route while
 * COMING_SOON is on, so it must stand on its own.
 *
 * The lockup follows the brand deck: a gold copperplate word riding above a
 * wide-tracked serif, on the ivory ground with a rose wash behind it.
 */

export const metadata: Metadata = {
  title: `${site.name} — Coming Soon`,
  description: `${site.name}. ${site.tagline}. Our new home is being prepared — enquiries are welcome in the meantime.`,
  alternates: { canonical: "/" },
  openGraph: {
    title: `${site.name} — Coming Soon`,
    description: `${site.tagline}. Opening shortly.`,
    type: "website",
    url: site.url,
  },
};

const socials = [
  { label: "Instagram", href: site.socials.instagram, Icon: Instagram },
  { label: "Facebook", href: site.socials.facebook, Icon: Facebook },
  { label: "YouTube", href: site.socials.youtube, Icon: Youtube },
];

export default function ComingSoonPage() {
  return (
    <div className="relative flex min-h-dvh flex-col overflow-hidden">
      {/* ---- Ground: rose wash, with a soft gold bloom behind the lockup. --- */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b from-rose-100 via-ivory-100 to-rose-100"
      />
      <div
        aria-hidden
        className="absolute left-1/2 top-1/2 size-[min(120vw,60rem)] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-70 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(216,195,155,0.38) 0%, rgba(216,195,155,0.10) 45%, transparent 70%)",
        }}
      />

      <main
        id="main"
        className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 py-16 text-center"
      >
        <div className="animate-(--animate-rise) w-full max-w-2xl">
          {/* ---- Ornament ------------------------------------------------- */}
          <Sapphire className="mx-auto mb-9 h-11 w-auto" />

          {/* ---- Wordmark -------------------------------------------------- */}
          <p className="eyebrow mb-5">
            Est. {site.established} · {site.address.locality}
          </p>

          <h1 className="font-wordmark text-[clamp(2.1rem,8vw,3.6rem)] leading-none tracking-[0.34em] text-ink-900">
            <span className="ml-[0.34em]">LUMIORA</span>
          </h1>

          <p className="mt-5 text-[0.7rem] uppercase tracking-[0.42em] text-ink-500">
            {site.tagline}
          </p>

          <div aria-hidden className="rule-gold mx-auto my-10 w-40" />

          {/* ---- The message ---------------------------------------------- */}
          <p className="script-accent text-[clamp(2.6rem,9vw,4.25rem)]">Coming</p>
          <p className="mt-1 font-display text-display-sm uppercase tracking-[0.3em] text-ink-800">
            Soon
          </p>

          <p className="mx-auto mt-8 max-w-md text-[0.95rem] leading-relaxed text-ink-500">
            Our new home is being prepared with the same care we give every stone.
            Until then, we would be glad to hear from you directly.
          </p>

          {/* ---- Direct contact -------------------------------------------- */}
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-8">
            <a
              href={`mailto:${site.email}`}
              className="link-underline inline-flex items-center gap-2.5 text-[0.8rem] tracking-[0.12em] text-ink-700 transition-colors duration-300 hover:text-ink-900"
            >
              <Mail aria-hidden className="size-4 text-gold-600" />
              {site.email}
            </a>
            <a
              href={`tel:${site.phone.replace(/\s+/g, "")}`}
              className="link-underline inline-flex items-center gap-2.5 text-[0.8rem] tracking-[0.12em] text-ink-700 transition-colors duration-300 hover:text-ink-900"
            >
              <Phone aria-hidden className="size-4 text-gold-600" />
              {site.phone}
            </a>
          </div>

          {/* ---- Socials ---------------------------------------------------- */}
          <div className="mt-9 flex items-center justify-center gap-5">
            {socials.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={label}
                className="flex size-10 items-center justify-center rounded-full border border-rose-300 text-ink-500 transition-colors duration-300 hover:border-gold-400 hover:text-gold-600"
              >
                <Icon aria-hidden className="size-4" />
              </a>
            ))}
          </div>
        </div>
      </main>

      <footer className="relative z-10 px-6 pb-8 text-center">
        <p className="text-[0.68rem] uppercase tracking-[0.28em] text-ink-400">
          © {new Date().getFullYear()} {site.legalName}
        </p>
      </footer>
    </div>
  );
}

/** A line-drawn cushion sapphire — the only decoration on the page. */
function Sapphire({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 56"
      fill="none"
      aria-hidden
      className={className}
      stroke="var(--color-gold-500)"
      strokeWidth="1"
      strokeLinejoin="round"
    >
      <path d="M16 4h32l14 16-30 32L2 20 16 4Z" />
      <path d="M2 20h60" />
      <path d="M16 4l6 16-6 32M48 4l-6 16 6 32" />
      <path d="M22 20h20l-10 32-10-32Z" />
    </svg>
  );
}
