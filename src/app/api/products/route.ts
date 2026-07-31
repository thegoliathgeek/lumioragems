import { NextResponse } from "next/server";
import { productQuerySchema } from "@/lib/validation/schemas";
import { getProducts, getProductsInCollection } from "@/lib/api/products";
import { rateLimit, clientIp } from "@/lib/security/rate-limit";

export const runtime = "nodejs";

/**
 * Read-only catalogue endpoint.
 *
 * The site itself renders the catalogue on the server, so nothing here is on
 * the critical path. It exists so the Phase 2 admin dashboard, a native app,
 * or a partner integration has a stable contract to build against.
 */
export async function GET(request: Request) {
  const ip = clientIp(request.headers);
  const limit = rateLimit(`products:${ip}`, 60, 60_000);

  if (!limit.success) {
    return NextResponse.json({ ok: false, error: "Rate limit exceeded." }, { status: 429 });
  }

  const url = new URL(request.url);
  const parsed = productQuerySchema.safeParse(Object.fromEntries(url.searchParams));

  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "Invalid query parameters." }, { status: 422 });
  }

  const { collection, q, minCarat, maxCarat, limit: take } = parsed.data;

  try {
    let items = collection ? await getProductsInCollection(collection) : await getProducts();

    if (q) {
      const needle = q.toLowerCase();
      items = items.filter((product) =>
        [product.name, product.colour, product.origin, product.gemType, product.shape]
          .join(" ")
          .toLowerCase()
          .includes(needle),
      );
    }
    if (minCarat !== undefined) items = items.filter((p) => p.carat >= minCarat);
    if (maxCarat !== undefined) items = items.filter((p) => p.carat <= maxCarat);

    return NextResponse.json(
      { ok: true, count: items.length, data: items.slice(0, take) },
      { headers: { "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600" } },
    );
  } catch (error) {
    console.error("[api/products] failed:", error);
    return NextResponse.json({ ok: false, error: "Could not load the catalogue." }, { status: 500 });
  }
}
