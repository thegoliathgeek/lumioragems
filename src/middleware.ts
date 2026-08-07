import { NextResponse, type NextRequest } from "next/server";
import { currencyForCountry, GEO_CURRENCY_COOKIE, CURRENCY_COOKIE } from "@/lib/currency/currencies";
import { COMING_SOON, COMING_SOON_PATH } from "@/lib/flags";

/**
 * Edge middleware.
 *
 * 0. Coming-soon hold: while the flag is on, every page is rewritten to the
 *    holding page and the API is closed. See src/lib/flags.ts.
 * 1. Cross-origin write protection for /api (defence in depth alongside SameSite).
 * 2. Geo hint: derives a likely currency from the CDN's country header and
 *    stores it as a *hint* cookie. An explicit choice by the visitor is stored
 *    separately and always wins — the hint is never allowed to overwrite it.
 * 3. Request id so server logs can be correlated.
 */
const MUTATING = new Set(["POST", "PUT", "PATCH", "DELETE"]);

const ONE_YEAR = 60 * 60 * 24 * 365;

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ---- 0. Coming soon ------------------------------------------------------
  // A rewrite, not a redirect: the visitor keeps the URL they asked for, so
  // links and bookmarks still resolve once the site opens.
  if (COMING_SOON) {
    if (pathname.startsWith("/api")) {
      return NextResponse.json(
        { ok: false, error: "Lumiora Gems is opening shortly. Please try again soon." },
        { status: 503, headers: { "Cache-Control": "no-store", "Retry-After": "86400" } },
      );
    }

    if (pathname !== COMING_SOON_PATH) {
      const url = request.nextUrl.clone();
      url.pathname = COMING_SOON_PATH;
      url.search = "";
      return NextResponse.rewrite(url);
    }

    return NextResponse.next();
  }

  if (pathname.startsWith("/api") && MUTATING.has(request.method)) {
    const origin = request.headers.get("origin");
    const host = request.headers.get("host");

    // Same-origin requests from browsers always send Origin on writes.
    if (!origin || (host && new URL(origin).host !== host)) {
      return NextResponse.json(
        { ok: false, error: "Request blocked: cross-origin write not permitted." },
        { status: 403 },
      );
    }
  }

  const response = NextResponse.next();
  response.headers.set("x-request-id", crypto.randomUUID());

  // Geo hint — only for page requests, and only when the visitor has not
  // already chosen a currency for themselves.
  if (!pathname.startsWith("/api") && !request.cookies.has(CURRENCY_COOKIE)) {
    const country =
      request.headers.get("x-vercel-ip-country") ??
      request.headers.get("cf-ipcountry") ??
      request.headers.get("x-country-code");

    if (country) {
      const suggested = currencyForCountry(country);
      if (request.cookies.get(GEO_CURRENCY_COOKIE)?.value !== suggested) {
        response.cookies.set(GEO_CURRENCY_COOKIE, suggested, {
          path: "/",
          maxAge: ONE_YEAR,
          sameSite: "lax",
          httpOnly: false, // read by the client provider
          secure: process.env.NODE_ENV === "production",
        });
      }
    }
  }

  return response;
}

export const config = {
  matcher: [
    // Everything except static assets and image optimisation output.
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|avif|ico|txt|xml)$).*)",
  ],
};
