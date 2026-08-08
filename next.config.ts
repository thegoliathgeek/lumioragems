import type { NextConfig } from "next";

/**
 * Content Security Policy.
 * Kept strict; loosened only where a required third party needs it.
 */
const csp = [
  "default-src 'self'",
  // Next.js injects inline bootstrap scripts; 'unsafe-inline' is required for those
  // in the absence of a nonce-based middleware pipeline.
  "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com data:",
  "img-src 'self' data: blob: https:",
  "connect-src 'self' https://www.google-analytics.com",
  "frame-src 'self' https://www.youtube-nocookie.com",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), interest-cohort=()" },
  { key: "X-DNS-Prefetch-Control", value: "on" },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,

  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "images.lumioragems.com" },
      { protocol: "https", hostname: "res.cloudinary.com" },
    ],
  },

  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      // Only the write endpoints are marked no-store. The read endpoints
      // (/api/products, /api/rates) set their own cache headers, and a blanket
      // no-store here would silently defeat them.
      {
        source: "/api/enquiry",
        headers: [{ key: "Cache-Control", value: "no-store, max-age=0" }, ...securityHeaders],
      },
      {
        source: "/api/newsletter",
        headers: [{ key: "Cache-Control", value: "no-store, max-age=0" }, ...securityHeaders],
      },
    ];
  },

  async redirects() {
    return [
      { source: "/collections/all-sapphires", destination: "/shop/all-sapphires", permanent: true },
      // `[^.]+` keeps this legacy redirect off the static assets in
      // public/collections/ — without it, /collections/blue-sapphires.jpg is
      // 308'd to /shop/blue-sapphires.jpg and the image optimizer sees a 404.
      // Real collection slugs never contain a dot; asset requests always do.
      { source: "/collections/:slug([^.]+)", destination: "/shop/:slug", permanent: true },
      { source: "/products/:slug", destination: "/shop/product/:slug", permanent: true },
      { source: "/blog", destination: "/discover/journal", permanent: true },
      { source: "/blogs/:slug", destination: "/discover/journal/:slug", permanent: true },
    ];
  },
};

export default nextConfig;
