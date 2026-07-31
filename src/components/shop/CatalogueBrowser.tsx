"use client";

import { useDeferredValue, useMemo, useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { ProductCard } from "./ProductCard";
import { formatCarat } from "@/lib/utils";
import { cn } from "@/lib/utils";
import type { Product } from "@/types";

type SortKey = "newest" | "price-asc" | "price-desc" | "carat-desc";

const SORTS: { key: SortKey; label: string }[] = [
  { key: "newest", label: "Newest" },
  { key: "price-asc", label: "Price, low to high" },
  { key: "price-desc", label: "Price, high to low" },
  { key: "carat-desc", label: "Carat, high to low" },
];

/**
 * Client-side catalogue search and filtering.
 *
 * The full collection is delivered with the server-rendered page, so filtering
 * is instant with no network round trip — the right trade at Phase 1 catalogue
 * size. `useDeferredValue` keeps typing responsive while the grid re-renders.
 * When the catalogue outgrows this, the same props are satisfied by a paged
 * `/api/products` response with no change to the markup.
 */
export function CatalogueBrowser({ products }: { products: Product[] }) {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortKey>("newest");
  const [shapes, setShapes] = useState<string[]>([]);
  const [treatments, setTreatments] = useState<string[]>([]);
  const [availableOnly, setAvailableOnly] = useState(false);
  const [panelOpen, setPanelOpen] = useState(false);

  const deferredQuery = useDeferredValue(query);

  const facets = useMemo(() => {
    const uniq = (values: string[]) => Array.from(new Set(values)).sort();
    return {
      shapes: uniq(products.map((p) => p.shape)),
      treatments: uniq(products.map((p) => p.treatment)),
    };
  }, [products]);

  const results = useMemo(() => {
    const needle = deferredQuery.trim().toLowerCase();

    const filtered = products.filter((product) => {
      if (availableOnly && product.availability !== "available") return false;
      if (shapes.length && !shapes.includes(product.shape)) return false;
      if (treatments.length && !treatments.includes(product.treatment)) return false;

      if (!needle) return true;
      const haystack = [
        product.name, product.colour, product.origin, product.gemType,
        product.shape, product.treatment, product.certificate,
      ].join(" ").toLowerCase();
      return needle.split(/\s+/).every((term) => haystack.includes(term));
    });

    const sorted = [...filtered];
    switch (sort) {
      case "price-asc": sorted.sort((a, b) => a.price - b.price); break;
      case "price-desc": sorted.sort((a, b) => b.price - a.price); break;
      case "carat-desc": sorted.sort((a, b) => b.carat - a.carat); break;
      default: sorted.sort((a, b) => Date.parse(b.listedAt) - Date.parse(a.listedAt));
    }
    return sorted;
  }, [products, deferredQuery, sort, shapes, treatments, availableOnly]);

  const toggle = (list: string[], setList: (v: string[]) => void, value: string) =>
    setList(list.includes(value) ? list.filter((v) => v !== value) : [...list, value]);

  const activeCount = shapes.length + treatments.length + (availableOnly ? 1 : 0);

  const clearAll = () => {
    setShapes([]); setTreatments([]); setAvailableOnly(false); setQuery("");
  };

  const caratRange = useMemo(() => {
    if (!results.length) return null;
    const weights = results.map((p) => p.carat);
    return { min: Math.min(...weights), max: Math.max(...weights) };
  }, [results]);

  return (
    <div>
      {/* ---- controls ---- */}
      <div className="flex flex-wrap items-center gap-3 border-y border-rose-200 py-4">
        <div className="relative min-w-0 flex-1">
          <Search aria-hidden className="pointer-events-none absolute left-0 top-1/2 size-4 -translate-y-1/2 text-ink-400" />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by colour, origin, cut…"
            aria-label="Search the collection"
            className="w-full border-0 bg-transparent py-2 pl-7 text-sm text-ink-800 placeholder:text-ink-400 focus:outline-none focus-visible:ring-0"
          />
        </div>

        <button
          type="button"
          onClick={() => setPanelOpen((open) => !open)}
          aria-expanded={panelOpen}
          className="inline-flex items-center gap-2 border border-rose-300 px-4 py-2 text-[0.68rem] uppercase tracking-[0.2em] text-ink-600 transition-colors hover:border-gold-400 hover:text-ink-800"
        >
          <SlidersHorizontal aria-hidden className="size-3.5" />
          Refine
          {activeCount ? <span className="text-gold-600">({activeCount})</span> : null}
        </button>

        <label className="sr-only" htmlFor="sort">Sort by</label>
        <select
          id="sort"
          value={sort}
          onChange={(event) => setSort(event.target.value as SortKey)}
          className="border border-rose-300 bg-transparent px-3 py-2 text-[0.68rem] uppercase tracking-[0.16em] text-ink-600 focus:outline-none"
        >
          {SORTS.map((option) => (
            <option key={option.key} value={option.key}>{option.label}</option>
          ))}
        </select>
      </div>

      {/* ---- facet panel ---- */}
      {panelOpen ? (
        <div className="grid gap-8 border-b border-rose-200 bg-rose-50/60 px-5 py-7 sm:grid-cols-3">
          <FacetGroup
            legend="Cut"
            options={facets.shapes}
            selected={shapes}
            onToggle={(value) => toggle(shapes, setShapes, value)}
          />
          <FacetGroup
            legend="Treatment"
            options={facets.treatments}
            selected={treatments}
            onToggle={(value) => toggle(treatments, setTreatments, value)}
          />
          <fieldset>
            <legend className="eyebrow mb-3">Availability</legend>
            <label className="flex cursor-pointer items-center gap-2.5 text-sm text-ink-600">
              <input
                type="checkbox"
                checked={availableOnly}
                onChange={(event) => setAvailableOnly(event.target.checked)}
                className="size-3.5 accent-[var(--color-gold-500)]"
              />
              Available stones only
            </label>

            {activeCount ? (
              <button
                type="button"
                onClick={clearAll}
                className="mt-5 inline-flex items-center gap-1.5 text-[0.68rem] uppercase tracking-[0.2em] text-gold-600 hover:text-ink-800"
              >
                <X aria-hidden className="size-3" /> Clear all
              </button>
            ) : null}
          </fieldset>
        </div>
      ) : null}

      {/* ---- result meta ---- */}
      <p aria-live="polite" className="py-6 text-sm text-ink-400">
        {results.length === 0
          ? "No stones match these filters."
          : `${results.length} ${results.length === 1 ? "stone" : "stones"}${
              caratRange ? ` · ${formatCarat(caratRange.min)}–${formatCarat(caratRange.max)}` : ""
            }`}
      </p>

      {/* ---- grid ---- */}
      {results.length ? (
        <div className="grid grid-cols-1 gap-x-7 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((product, index) => (
            <ProductCard key={product.id} product={product} priority={index < 3} />
          ))}
        </div>
      ) : (
        <div className="border border-dashed border-rose-300 px-8 py-20 text-center">
          <p className="font-display text-2xl text-ink-800">Nothing here yet</p>
          <p className="mx-auto mt-3 max-w-sm text-sm text-ink-500">
            Loosen a filter, or tell us what you are looking for and we will source it.
          </p>
          <button
            type="button"
            onClick={clearAll}
            className="mt-6 text-[0.68rem] uppercase tracking-[0.22em] text-gold-600 link-underline"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
}

function FacetGroup({
  legend, options, selected, onToggle,
}: {
  legend: string; options: string[]; selected: string[]; onToggle: (value: string) => void;
}) {
  return (
    <fieldset>
      <legend className="eyebrow mb-3">{legend}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const active = selected.includes(option);
          return (
            <button
              key={option}
              type="button"
              aria-pressed={active}
              onClick={() => onToggle(option)}
              className={cn(
                "border px-3 py-1.5 text-xs transition-colors duration-300",
                active
                  ? "border-gold-500 bg-gold-500 text-ivory-50"
                  : "border-rose-300 text-ink-600 hover:border-gold-400",
              )}
            >
              {option}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}
