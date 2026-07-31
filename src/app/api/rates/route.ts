import { NextResponse } from "next/server";
import { fetchLiveRates } from "@/lib/currency/rates";
import { rateLimit, clientIp } from "@/lib/security/rate-limit";

export const runtime = "nodejs";
export const revalidate = 21_600; // six hours

/**
 * Exchange rates for the client.
 *
 * The browser never contacts the rate provider directly: this endpoint proxies
 * it, which keeps `connect-src 'self'` intact in the CSP, hides the upstream
 * from visitors, and collapses thousands of visitor requests into one upstream
 * call per revalidation window.
 */
export async function GET(request: Request) {
  const limit = rateLimit(`rates:${clientIp(request.headers)}`, 30, 60_000);

  if (!limit.success) {
    return NextResponse.json({ ok: false, error: "Rate limit exceeded." }, { status: 429 });
  }

  const payload = await fetchLiveRates();

  return NextResponse.json(
    { ok: true, ...payload },
    {
      headers: {
        // Long shared cache; rates do not need to be fresher than this.
        "Cache-Control": "public, s-maxage=21600, stale-while-revalidate=86400",
      },
    },
  );
}
