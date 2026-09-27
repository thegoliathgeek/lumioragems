"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { LotCard } from "./LotCard";
import type { AuctionStatus, LotView } from "@/types";

type SortKey = "lot" | "bid-asc" | "bid-desc" | "closing";

const SORTS: { key: SortKey; label: string }[] = [
  { key: "lot", label: "Lot order" },
  { key: "closing", label: "Closing soonest" },
  { key: "bid-asc", label: "Bid, low to high" },
  { key: "bid-desc", label: "Bid, high to low" },
];

const FILTERS: { key: "all" | "open" | "settled"; label: string }[] = [
  { key: "all", label: "All lots" },
  { key: "open", label: "Still open" },
  { key: "settled", label: "Settled" },
];

/** How often a live board asks the server for fresh prices. */
const POLL_MS = 20_000;

/**
 * The lot board.
 *
 * Sorting and filtering are client-side because the whole session — nine lots
 * — arrives with the page; a round trip to reorder nine cards would be theatre.
 * Prices are a different matter: while the room is live the board re-fetches
 * on a slow interval so a card is never more than twenty seconds stale.
 */
export function SessionBoard({
  lots,
  status,
}: {
  lots: LotView[];
  status: AuctionStatus;
}) {
  const router = useRouter();
  const [sort, setSort] = useState<SortKey>("lot");
  const [filter, setFilter] = useState<"all" | "open" | "settled">("all");

  useEffect(() => {
    if (status !== "live") return;

    const id = window.setInterval(() => {
      // Only while the tab is in front. A backgrounded board does not need
      // the network, and the refresh on return is immediate anyway.
      if (document.visibilityState === "visible") router.refresh();
    }, POLL_MS);

    return () => window.clearInterval(id);
  }, [status, router]);

  const shown = useMemo(() => {
    const settled = (lot: LotView) => lot.status === "sold" || lot.status === "passed";

    const filtered = lots.filter((lot) => {
      if (filter === "open") return !settled(lot);
      if (filter === "settled") return settled(lot);
      return true;
    });

    const sorted = [...filtered];
    switch (sort) {
      case "bid-asc":
        sorted.sort((a, b) => a.currentBid - b.currentBid);
        break;
      case "bid-desc":
        sorted.sort((a, b) => b.currentBid - a.currentBid);
        break;
      case "closing":
        sorted.sort((a, b) => Date.parse(a.closesAt) - Date.parse(b.closesAt));
        break;
      default:
        sorted.sort((a, b) => a.lotNumber - b.lotNumber);
    }
    return sorted;
  }, [lots, sort, filter]);

  return (
    <div>
      <div className="flex flex-wrap items-center gap-x-6 gap-y-3 border-y border-rose-200 py-4">
        <div className="flex flex-wrap items-center gap-2">
          {FILTERS.map((option) => (
            <button
              key={option.key}
              type="button"
              aria-pressed={filter === option.key}
              onClick={() => setFilter(option.key)}
              className={
                filter === option.key
                  ? "border border-gold-500 bg-gold-500 px-3.5 py-1.5 text-[0.62rem] uppercase tracking-[0.2em] text-ivory-50"
                  : "border border-rose-300 px-3.5 py-1.5 text-[0.62rem] uppercase tracking-[0.2em] text-ink-600 transition-colors duration-300 hover:border-gold-400"
              }
            >
              {option.label}
            </button>
          ))}
        </div>

        <div className="ml-auto flex items-center gap-2.5">
          <label htmlFor="lot-sort" className="eyebrow">Sort</label>
          <select
            id="lot-sort"
            value={sort}
            onChange={(event) => setSort(event.target.value as SortKey)}
            className="border border-rose-300 bg-transparent px-3 py-2 text-[0.68rem] uppercase tracking-[0.16em] text-ink-600 focus:outline-none"
          >
            {SORTS.map((option) => (
              <option key={option.key} value={option.key}>{option.label}</option>
            ))}
          </select>
        </div>
      </div>

      <p aria-live="polite" className="py-6 text-sm text-ink-400">
        {shown.length === 0
          ? "No lots in this view."
          : `${shown.length} ${shown.length === 1 ? "lot" : "lots"}`}
      </p>

      {shown.length ? (
        <div className="grid grid-cols-1 gap-x-7 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((lot, index) => (
            <LotCard key={lot.id} lot={lot} priority={index < 3} />
          ))}
        </div>
      ) : (
        <div className="border border-dashed border-rose-300 px-8 py-20 text-center">
          <p className="font-display text-2xl text-ink-800">Nothing in this view</p>
          <button
            type="button"
            onClick={() => setFilter("all")}
            className="mt-5 text-[0.68rem] uppercase tracking-[0.22em] text-gold-600 link-underline"
          >
            Show every lot
          </button>
        </div>
      )}
    </div>
  );
}
