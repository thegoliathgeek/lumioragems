"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Check, ChevronDown, Search } from "lucide-react";
import { useCurrency } from "./CurrencyProvider";
import { currencies, REGION_ORDER, type Region } from "@/lib/currency/currencies";
import { cn } from "@/lib/utils";

/**
 * Currency selector.
 *
 * Sixty-odd currencies is too many for a plain <select>, so this is a searchable
 * panel grouped by region. It is still fully keyboard-operable: Escape closes,
 * focus moves to the search field on open, and focus returns to the trigger on
 * close.
 */
export function CurrencySwitcher({ variant = "header" }: { variant?: "header" | "inline" }) {
  const { code, currency, setCurrency } = useCurrency();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  // Close on outside click and on Escape.
  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  useEffect(() => {
    if (open) {
      setQuery("");
      // Focus after the panel paints.
      requestAnimationFrame(() => searchRef.current?.focus());
    }
  }, [open]);

  const grouped = useMemo(() => {
    const needle = query.trim().toLowerCase();

    const matches = needle
      ? currencies.filter((item) =>
          item.code.toLowerCase().includes(needle) ||
          item.name.toLowerCase().includes(needle) ||
          item.region.toLowerCase().includes(needle))
      : currencies;

    const buckets = new Map<Region, typeof currencies>();
    for (const item of matches) {
      const bucket = buckets.get(item.region) ?? [];
      bucket.push(item);
      buckets.set(item.region, bucket);
    }

    return REGION_ORDER
      .map((region) => ({ region, items: buckets.get(region) ?? [] }))
      .filter((group) => group.items.length > 0);
  }, [query]);

  const choose = (next: string) => {
    setCurrency(next);
    setOpen(false);
    triggerRef.current?.focus();
  };

  return (
    <div ref={containerRef} className={cn("relative", variant === "inline" && "w-full")}>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label={`Currency: ${currency.name}. Change currency`}
        className={cn(
          "inline-flex items-center gap-1.5 text-[0.66rem] uppercase tracking-[0.18em] text-ink-600",
          "transition-colors duration-300 hover:text-ink-900",
          variant === "inline" && "w-full justify-between border border-rose-300 px-4 py-3",
        )}
      >
        <span aria-hidden className="text-gold-600">{currency.symbol}</span>
        {code}
        <ChevronDown
          aria-hidden
          className={cn("size-3 opacity-60 transition-transform duration-300", open && "rotate-180")}
        />
      </button>

      {open ? (
        <div
          role="listbox"
          aria-label="Select a currency"
          className={cn(
            "absolute z-50 mt-3 w-72 border border-rose-200 bg-ivory-50 shadow-(--shadow-lift)",
            variant === "header" ? "right-0" : "left-0 w-full",
          )}
        >
          <div className="flex items-center gap-2 border-b border-rose-200 px-4 py-3">
            <Search aria-hidden className="size-3.5 shrink-0 text-ink-400" />
            <label htmlFor="currency-search" className="sr-only">Search currencies</label>
            <input
              ref={searchRef}
              id="currency-search"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search currency or region"
              className="w-full bg-transparent text-sm text-ink-800 placeholder:text-ink-400 focus:outline-none"
            />
          </div>

          <div className="max-h-80 overflow-y-auto overscroll-contain py-1">
            {grouped.length === 0 ? (
              <p className="px-4 py-6 text-center text-sm text-ink-400">No currency matches that.</p>
            ) : (
              grouped.map((group) => (
                <div key={group.region}>
                  <p className="eyebrow sticky top-0 bg-ivory-50 px-4 py-2 text-ink-400">
                    {group.region}
                  </p>
                  {group.items.map((item) => {
                    const active = item.code === code;
                    return (
                      <button
                        key={item.code}
                        type="button"
                        role="option"
                        aria-selected={active}
                        onClick={() => choose(item.code)}
                        className={cn(
                          "flex w-full items-center justify-between gap-3 px-4 py-2.5 text-left transition-colors duration-200",
                          active ? "bg-rose-100 text-ink-900" : "text-ink-600 hover:bg-rose-50",
                        )}
                      >
                        <span className="flex min-w-0 items-baseline gap-2.5">
                          <span className="w-9 shrink-0 text-xs tracking-wider text-gold-600">
                            {item.code}
                          </span>
                          <span className="truncate text-sm">{item.name}</span>
                        </span>
                        {active ? (
                          <Check aria-hidden className="size-3.5 shrink-0 text-gold-500" />
                        ) : (
                          <span aria-hidden className="shrink-0 text-xs text-ink-400">{item.symbol}</span>
                        )}
                      </button>
                    );
                  })}
                </div>
              ))
            )}
          </div>

          <p className="border-t border-rose-200 px-4 py-3 text-[0.68rem] leading-relaxed text-ink-400">
            Conversions are indicative. Stones are invoiced in AUD.
          </p>
        </div>
      ) : null}
    </div>
  );
}
