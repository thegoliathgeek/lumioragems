"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import {
  BASE_CURRENCY, CURRENCY_COOKIE, GEO_CURRENCY_COOKIE,
  getCurrency, isSupportedCurrency, type Currency, type CurrencyCode,
} from "@/lib/currency/currencies";
import { fallbackRates } from "@/lib/currency/rates";
import { convertAndFormat } from "@/lib/currency/format";

interface CurrencyContextValue {
  currency: Currency;
  code: CurrencyCode;
  setCurrency: (code: CurrencyCode) => void;
  /** Convert an amount held in the base currency and format it for display. */
  format: (amountInBase: number) => string;
  /** False until live rates have loaded; useful for a subtle loading state. */
  ratesReady: boolean;
  /** True when displaying indicative fallback rates. */
  ratesStale: boolean;
  baseCurrency: CurrencyCode;
}

const CurrencyContext = createContext<CurrencyContextValue | null>(null);

const ONE_YEAR = 60 * 60 * 24 * 365;

function readCookie(name: string): string | undefined {
  if (typeof document === "undefined") return undefined;
  return document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${name}=`))
    ?.split("=")[1];
}

function writeCookie(name: string, value: string) {
  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${name}=${value}; path=/; max-age=${ONE_YEAR}; SameSite=Lax${secure}`;
}

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  /**
   * Initial state is deliberately the base currency, matching what was
   * server-rendered into the static HTML. Reading the cookie during the first
   * render would desynchronise server and client markup and trip a hydration
   * error, so the stored preference is applied in an effect immediately after
   * mount instead.
   */
  const [code, setCode] = useState<CurrencyCode>(BASE_CURRENCY);
  const [rates, setRates] = useState<Record<CurrencyCode, number>>(fallbackRates);
  const [ratesReady, setRatesReady] = useState(false);
  const [ratesStale, setRatesStale] = useState(true);

  // Apply the stored preference, falling back to the geo hint set by middleware.
  useEffect(() => {
    const explicit = readCookie(CURRENCY_COOKIE);
    if (isSupportedCurrency(explicit)) {
      setCode(explicit.toUpperCase());
      return;
    }
    const hint = readCookie(GEO_CURRENCY_COOKIE);
    if (isSupportedCurrency(hint)) setCode(hint.toUpperCase());
  }, []);

  // Live rates, proxied through our own origin.
  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const response = await fetch("/api/rates");
        if (!response.ok) return;
        const payload = await response.json();
        if (cancelled || !payload?.ok || !payload.rates) return;
        setRates(payload.rates);
        setRatesStale(Boolean(payload.stale));
      } catch {
        // Keep the fallback rates; prices stay correct to within a drift.
      } finally {
        if (!cancelled) setRatesReady(true);
      }
    })();

    return () => { cancelled = true; };
  }, []);

  const setCurrency = useCallback((next: CurrencyCode) => {
    if (!isSupportedCurrency(next)) return;
    const normalised = next.toUpperCase();
    setCode(normalised);
    writeCookie(CURRENCY_COOKIE, normalised);
  }, []);

  const value = useMemo<CurrencyContextValue>(() => ({
    code,
    currency: getCurrency(code),
    setCurrency,
    format: (amountInBase: number) => convertAndFormat(amountInBase, code, rates),
    ratesReady,
    ratesStale,
    baseCurrency: BASE_CURRENCY,
  }), [code, rates, ratesReady, ratesStale, setCurrency]);

  return <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>;
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error("useCurrency must be used within a CurrencyProvider.");
  }
  return context;
}
