import { BASE_CURRENCY, type CurrencyCode } from "./currencies";

/**
 * Exchange rates expressed as: units of the given currency per 1 AUD.
 *
 * These are a FALLBACK ONLY — used when the live rate feed is unreachable, and
 * as the server-render seed so prices never appear blank. They are indicative
 * and will drift. Production traffic is served from the live feed via
 * `/api/rates`, which refreshes every six hours.
 */
export const fallbackRates: Record<CurrencyCode, number> = {
  AUD: 1,
  NZD: 1.09, FJD: 1.47, PGK: 2.6,

  INR: 57.5, SGD: 0.88, HKD: 5.15, JPY: 101, CNY: 4.75, KRW: 890,
  TWD: 21, THB: 23.5, MYR: 3.0, IDR: 10500, PHP: 37, VND: 16500,
  LKR: 195, BDT: 78, PKR: 185, NPR: 92, KZT: 320,

  EUR: 0.61, GBP: 0.52, CHF: 0.57, SEK: 6.9, NOK: 7.0, DKK: 4.55,
  ISK: 90, PLN: 2.6, CZK: 15.3, HUF: 240, RON: 3.05, BGN: 1.19,
  RSD: 71, TRY: 22.5, UAH: 27,

  USD: 0.66, CAD: 0.90, MXN: 12.5, BRL: 3.6, ARS: 650, CLP: 620,
  COP: 2700, PEN: 2.45, UYU: 26,

  AED: 2.42, SAR: 2.47, QAR: 2.40, KWD: 0.20, BHD: 0.25, OMR: 0.25,
  JOD: 0.47, ILS: 2.45,

  ZAR: 12.2, NGN: 1000, KES: 85, EGP: 32, GHS: 9.5, MAD: 6.5,
  TZS: 1700, MUR: 30,
};

export interface RatePayload {
  base: CurrencyCode;
  rates: Record<CurrencyCode, number>;
  /** ISO timestamp of the source data. */
  updatedAt: string;
  /** True when served from `fallbackRates` rather than the live feed. */
  stale: boolean;
}

const FEED_URL = `https://open.er-api.com/v6/latest/${BASE_CURRENCY}`;

/**
 * Fetches live rates. Server-side only — never called from the browser, so the
 * upstream provider sees one request per revalidation window rather than one
 * per visitor, and the browser only ever talks to our own origin.
 */
export async function fetchLiveRates(): Promise<RatePayload> {
  const fallback: RatePayload = {
    base: BASE_CURRENCY,
    rates: fallbackRates,
    updatedAt: new Date().toISOString(),
    stale: true,
  };

  // Allow the deployment to opt out of the third-party feed entirely.
  if (process.env.DISABLE_LIVE_RATES === "true") return fallback;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5_000);

  try {
    const response = await fetch(FEED_URL, {
      signal: controller.signal,
      next: { revalidate: 21_600, tags: ["rates"] }, // six hours
    });

    if (!response.ok) return fallback;

    const payload = (await response.json()) as {
      result?: string;
      rates?: Record<string, number>;
      time_last_update_utc?: string;
    };

    if (payload.result !== "success" || !payload.rates) return fallback;

    // Keep the fallback as a floor so a currency missing upstream still renders.
    const merged: Record<CurrencyCode, number> = { ...fallbackRates };
    for (const [code, rate] of Object.entries(payload.rates)) {
      if (typeof rate === "number" && Number.isFinite(rate) && rate > 0) {
        merged[code] = rate;
      }
    }

    return {
      base: BASE_CURRENCY,
      rates: merged,
      updatedAt: payload.time_last_update_utc
        ? new Date(payload.time_last_update_utc).toISOString()
        : new Date().toISOString(),
      stale: false,
    };
  } catch {
    return fallback;
  } finally {
    clearTimeout(timeout);
  }
}
