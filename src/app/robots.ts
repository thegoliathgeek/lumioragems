import type { MetadataRoute } from "next";
import { site } from "@/data/site";
import { COMING_SOON } from "@/lib/flags";

export default function robots(): MetadataRoute.Robots {
  // Held back: every path serves the same holding page, so only the home page
  // is worth crawling. "/$" anchors the rule to the root exactly.
  if (COMING_SOON) {
    return {
      rules: [{ userAgent: "*", allow: "/$", disallow: "/" }],
      sitemap: `${site.url}/sitemap.xml`,
      host: site.url,
    };
  }

  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/api/"] }],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
