import type { MetadataRoute } from "next";
import { site } from "@/data/site";
import { collections } from "@/data/collections";
import { products } from "@/data/products";
import { journalPosts, cyclopediaEntries } from "@/data/journal";
import { policies } from "@/data/policies";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url;
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/shop`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
    { url: `${base}/custom`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/custom/process`, lastModified: now, changeFrequency: "yearly", priority: 0.6 },
    { url: `${base}/custom/gallery`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/custom/enquiry`, lastModified: now, changeFrequency: "yearly", priority: 0.7 },
    { url: `${base}/discover`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${base}/discover/journal`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${base}/discover/gem-cyclopedia`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/discover/video-library`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${base}/about`, lastModified: now, changeFrequency: "yearly", priority: 0.6 },
    { url: `${base}/contact`, lastModified: now, changeFrequency: "yearly", priority: 0.7 },
    { url: `${base}/faq`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
  ];

  const collectionRoutes: MetadataRoute.Sitemap = collections.map((collection) => ({
    url: `${base}/shop/${collection.slug}`,
    lastModified: now,
    changeFrequency: "daily",
    priority: 0.8,
  }));

  const productRoutes: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${base}/shop/product/${product.slug}`,
    lastModified: new Date(product.listedAt),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const articleRoutes: MetadataRoute.Sitemap = [...journalPosts, ...cyclopediaEntries].map((article) => ({
    url: `${base}/discover/journal/${article.slug}`,
    lastModified: new Date(article.publishedAt),
    changeFrequency: "yearly",
    priority: 0.5,
  }));

  const policyRoutes: MetadataRoute.Sitemap = policies.map((policy) => ({
    url: `${base}/policies/${policy.slug}`,
    lastModified: new Date(policy.updatedAt),
    changeFrequency: "yearly",
    priority: 0.3,
  }));

  return [...staticRoutes, ...collectionRoutes, ...productRoutes, ...articleRoutes, ...policyRoutes];
}
