import { BASE_CURRENCY, getCurrency, type CurrencyCode } from "./currencies";
import { fallbackRates } from "./rates";

/**
 * Rounds a converted amount to a figure that looks deliberate rather than
 * machine-generated. A luxury listing should read "A$7,400", never
 * "A$7,392.16" — the precision is spurious once a rate is involved.
 */
export function roundForDisplay(value: number): number {
  const magnitude = Math.abs(value);
  if (magnitude >= 1_000_000) return Math.round(value / 10_000) * 10_000;
  if (magnitude >= 100_000) return Math.round(value / 1_000) * 1_000;
  if (magnitude >= 10_000) return Math.round(value / 100) * 100;
  if (magnitude >= 1_000) return Math.round(value / 10) * 10;
  return Math.round(value);
}

/** Convert an amount held in the base currency into the target currency. */
export function convert(
  amountInBase: number,
  target: CurrencyCode,
  rates: Record<CurrencyCode, number> = fallbackRates,
): number {
  if (target === BASE_CURRENCY) return amountInBase;
  const rate = rates[target] ?? fallbackRates[target];
  if (!rate || !Number.isFinite(rate)) return amountInBase;
  return amountInBase * rate;
}

/**
 * Format an amount already expressed in `code`.
 * `Intl` handles minor units per currency, so JPY and KRW correctly show no
 * decimals while AUD and EUR do — we simply suppress the cents, since no price
 * here is meaningful below the whole unit.
 */
export function formatMoney(amount: number, code: CurrencyCode): string {
  const currency = getCurrency(code);

  try {
    return new Intl.NumberFormat(currency.locale, {
      style: "currency",
      currency: currency.code,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  } catch {
    // Unknown locale or currency on an older runtime — degrade legibly.
    return `${currency.symbol}${Math.round(amount).toLocaleString("en-US")}`;
  }
}

/** Convert, round, and format in one step. */
export function convertAndFormat(
  amountInBase: number,
  target: CurrencyCode,
  rates?: Record<CurrencyCode, number>,
): string {
  return formatMoney(roundForDisplay(convert(amountInBase, target, rates)), target);
}
