import type { Metadata, Viewport } from "next";
import { Playfair_Display, Jost, Pinyon_Script, Bodoni_Moda } from "next/font/google";
import { CurrencyProvider } from "@/components/currency/CurrencyProvider";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { JsonLd } from "@/components/seo/JsonLd";
import { organisationJsonLd, websiteJsonLd } from "@/lib/seo/metadata";
import { site } from "@/data/site";
import { COMING_SOON } from "@/lib/flags";
import "./globals.css";

/* Fonts are self-hosted by next/font at build time — no render-blocking
   request to Google, no layout shift, and one less third-party origin in the
   Content Security Policy. */
const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
  weight: ["400", "500", "600"],
});

const jost = Jost({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jost",
  weight: ["300", "400", "500"],
});

/* Bodoni Moda is variable on both weight and optical size, so no weight list —
   the wordmark asks for the display optical size via font-variation-settings. */
const bodoni = Bodoni_Moda({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-bodoni",
});

const pinyon = Pinyon_Script({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-pinyon",
  weight: "400",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name }],
  creator: site.name,
  keywords: [
    "natural sapphires", "unheated sapphire", "Ceylon sapphire", "padparadscha",
    "teal sapphire", "loose gemstones India", "certified sapphire", "bespoke jewellery",
  ],
  formatDetection: { telephone: false, address: false, email: false },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#fbfaf7",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const fonts = `${playfair.variable} ${jost.variable} ${pinyon.variable} ${bodoni.variable}`;

  // While the site is held back there is nothing to navigate to, so the header
  // and footer are left out — the holding page brings its own <main> and footer
  // line. The currency provider stays mounted either way: it renders no markup,
  // and the shop pages it feeds are still prerendered at build time even when
  // middleware is rewriting every request to the holding page.
  return (
    <html lang="en-IN" className={fonts}>
      <body className="min-h-dvh antialiased">
        <JsonLd data={organisationJsonLd()} />
        {!COMING_SOON && <JsonLd data={websiteJsonLd()} />}
        <CurrencyProvider>
          {COMING_SOON ? (
            children
          ) : (
            <>
              <Header />
              <main id="main">{children}</main>
              <Footer />
            </>
          )}
        </CurrencyProvider>
      </body>
    </html>
  );
}
