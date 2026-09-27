import Link from "next/link";
import { ProductImage } from "@/components/gem/ProductImage";
import { Price } from "@/components/currency/Price";
import { AuctionClock } from "./AuctionClock";
import { LotStatusPill } from "./LotStatusPill";
import { formatCarat } from "@/lib/utils";
import type { LotView } from "@/types";

export function LotCard({ lot, priority = false }: { lot: LotView; priority?: boolean }) {
  const settled = lot.status === "sold" || lot.status === "passed";

  return (
    <Link
      href={`/auctions/${lot.slug}`}
      className="group block focus:outline-none"
      aria-label={`Lot ${lot.lotNumber}, ${lot.stone.name}, ${formatCarat(lot.stone.carat)}`}
    >
      <div className="relative">
        <ProductImage product={lot.stone} priority={priority} />

        <span className="absolute left-4 top-4 bg-ivory-50/95 px-3 py-1.5 text-[0.6rem] uppercase tracking-[0.24em] text-ink-600">
          Lot {lot.lotNumber}
        </span>

        <LotStatusPill status={lot.status} className="absolute right-4 top-4 bg-ivory-50/95" />
      </div>

      <div className="pt-5">
        <p className="eyebrow mb-2 text-ink-400">
          {lot.reserve === undefined ? "No reserve" : lot.reserveMet ? "Reserve met" : "Reserve not met"}
          {" · "}
          {lot.stone.origin.split("(")[0]?.trim()}
        </p>

        <h3 className="text-lg leading-snug transition-colors duration-500 group-hover:text-gold-600">
          {lot.stone.name}
        </h3>

        <p className="mt-1 text-sm text-ink-500">
          {formatCarat(lot.stone.carat)} · {lot.stone.shape} · {lot.stone.treatment}
        </p>

        <div className="mt-3 flex items-baseline justify-between gap-3 border-t border-rose-200 pt-3">
          <span className="text-[0.65rem] uppercase tracking-[0.18em] text-ink-400">
            {settled
              ? lot.status === "sold"
                ? "Sold for"
                : "Bidding reached"
              : lot.bidCount === 0
                ? "Opening bid"
                : "Current bid"}
          </span>
          <span className="font-display text-base text-ink-800">
            <Price amountInBase={lot.currentBid} />
          </span>
        </div>

        <div className="mt-2 flex items-baseline justify-between gap-3 text-xs text-ink-400">
          <span>
            {lot.bidCount} {lot.bidCount === 1 ? "bid" : "bids"}
            {lot.status === "upcoming" ? null : ` · est. ${lot.estimate[0].toLocaleString()}–${lot.estimate[1].toLocaleString()}`}
          </span>
          {settled ? null : (
            <AuctionClock target={lot.closesAt} label="Closes in" refreshOnExpiry className="text-ink-500" />
          )}
        </div>
      </div>
    </Link>
  );
}
