import "server-only";
import { apiRequest, withFallback } from "./client";
import { products as localProducts, productsBySlug } from "@/data/products";
import { collections as localCollections, collectionsBySlug } from "@/data/collections";
import type { Collection, Product } from "@/types";

export async function getProducts(): Promise<Product[]> {
  return withFallback(
    () => apiRequest<Product[]>("/v1/products", { tags: ["products"], revalidate: 300 }),
    () => localProducts,
    "getProducts",
  );
}

export async function getProduct(slug: string): Promise<Product | null> {
  return withFallback(
    () => apiRequest<Product>(`/v1/products/${encodeURIComponent(slug)}`, { tags: ["products", `product:${slug}`] }),
    () => productsBySlug.get(slug) ?? null,
    `getProduct(${slug})`,
  );
}

export async function getCollections(): Promise<Collection[]> {
  return withFallback(
    () => apiRequest<Collection[]>("/v1/collections", { tags: ["collections"], revalidate: 900 }),
    () => localCollections,
    "getCollections",
  );
}

export async function getCollection(slug: string): Promise<Collection | null> {
  const all = await getCollections();
  return all.find((c) => c.slug === slug) ?? collectionsBySlug.get(slug) ?? null;
}

/**
 * Stones in stock for a collection. "All Sapphires" totals the sapphire colour
 * collections; other curated collections have no stock of their own.
 */
export function collectionStock(collection: Collection, all: Collection[]): number | undefined {
  if (collection.slug === "all-sapphires") {
    return all.filter((c) => c.group === "sapphire").reduce((sum, c) => sum + (c.stock ?? 0), 0);
  }
  return collection.stock;
}

/** Products belonging to a collection, honouring the two curated virtual collections. */
export async function getProductsInCollection(slug: string): Promise<Product[]> {
  const all = await getProducts();

  if (slug === "all-sapphires") {
    return all.filter((p) => p.gemType === "Sapphire");
  }
  if (slug === "newly-listed") {
    return [...all]
      .sort((a, b) => Date.parse(b.listedAt) - Date.parse(a.listedAt))
      .slice(0, 8);
  }
  return all.filter((p) => p.collections.includes(slug));
}

export async function getFeaturedProducts(limit = 4): Promise<Product[]> {
  const all = await getProducts();
  return all
    .filter((p) => p.availability === "available")
    .sort((a, b) => Date.parse(b.listedAt) - Date.parse(a.listedAt))
    .slice(0, limit);
}

export async function getRelatedProducts(product: Product, limit = 3): Promise<Product[]> {
  const all = await getProducts();
  return all
    .filter((p) => p.slug !== product.slug && p.collections.some((c) => product.collections.includes(c)))
    .slice(0, limit);
}
