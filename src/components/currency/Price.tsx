"use client";

import { useCurrency } from "./CurrencyProvider";
import { BASE_CURRENCY } from "@/lib/currency/currencies";
import { cn } from "@/lib/utils";

/**
 * Renders an amount held in the base currency, converted to the visitor's
 * selection. Wrapped in a `<data>` element so the underlying base-currency
 * figure stays machine-readable regardless of what is displayed.
 */
export function Price({
  amountInBase,
  className,
  showCode = false,
}: {
  amountInBase: number;
  className?: string;
  showCode?: boolean;
}) {
  const { format, code } = useCurrency();

  return (
    <data value={`${BASE_CURRENCY} ${amountInBase}`} className={cn("tabular-nums", className)}>
      {format(amountInBase)}
      {showCode ? <span className="ml-1.5 text-[0.7em] text-ink-400">{code}</span> : null}
    </data>
  );
}

/**
 * The conversion disclosure shown beside a headline price. Says nothing at all
 * when the visitor is already viewing the base currency, because there is
 * nothing to disclose.
 */
export function ConversionNote({ className }: { className?: string }) {
  const { code, baseCurrency, currency } = useCurrency();

  if (code === baseCurrency) return null;

  return (
    <p className={cn("text-xs leading-relaxed text-ink-400", className)}>
      Shown in {currency.name} ({code}) as an indicative conversion. Stones are
      invoiced in {baseCurrency}, and the amount charged will follow your bank&rsquo;s
      rate on the day.
    </p>
  );
}
