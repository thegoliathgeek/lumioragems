/**
 * Currency registry.
 *
 * `BASE_CURRENCY` is the currency every price in `src/data/products.ts` is
 * stored in. Prices displayed in the base currency are exact; everything else
 * is a live conversion, rounded for presentation.
 */
export const BASE_CURRENCY = "AUD" as const;

export type CurrencyCode = string;

export interface Currency {
  code: CurrencyCode;
  name: string;
  /** Short symbol for the compact switcher label. */
  symbol: string;
  /** BCP-47 locale used for grouping and separators. */
  locale: string;
  region: Region;
}

export type Region =
  | "Oceania" | "Americas" | "Europe" | "Asia"
  | "Middle East" | "Africa";

export const REGION_ORDER: Region[] = [
  "Oceania", "Asia", "Europe", "Americas", "Middle East", "Africa",
];

/**
 * MOCK currency list — deliberately limited to the three markets we ship to
 * today. Swap this out (or hydrate it from the pricing API) when the live feed
 * lands; the rest of the currency stack already handles an arbitrary list.
 */
export const currencies: Currency[] = [
  // ---- Oceania -------------------------------------------------------------
  { code: "AUD", name: "Australian Dollar", symbol: "A$", locale: "en-AU", region: "Oceania" },

  // ---- Asia ----------------------------------------------------------------
  { code: "INR", name: "Indian Rupee", symbol: "₹", locale: "en-IN", region: "Asia" },
  { code: "LKR", name: "Sri Lankan Rupee", symbol: "Rs", locale: "si-LK", region: "Asia" },
];

export const currencyByCode = new Map(currencies.map((c) => [c.code, c]));

export function isSupportedCurrency(code: string | undefined | null): code is CurrencyCode {
  return Boolean(code && currencyByCode.has(code.toUpperCase()));
}

export function getCurrency(code: string): Currency {
  return currencyByCode.get(code.toUpperCase()) ?? currencyByCode.get(BASE_CURRENCY)!;
}

/**
 * ISO 3166-1 alpha-2 country → currency.
 * Used only to pre-select a sensible default from the CDN's geo header; an
 * explicit choice by the visitor always wins.
 */
export const countryToCurrency: Record<string, CurrencyCode> = {
  AU: "AUD", IN: "INR", LK: "LKR",
};

export function currencyForCountry(country: string | undefined | null): CurrencyCode {
  if (!country) return BASE_CURRENCY;
  return countryToCurrency[country.toUpperCase()] ?? BASE_CURRENCY;
}

export const CURRENCY_COOKIE = "lumiora_currency";
export const GEO_CURRENCY_COOKIE = "lumiora_geo_currency";
