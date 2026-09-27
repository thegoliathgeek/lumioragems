import { LOT_STATUS_LABEL } from "@/lib/auctions/bidding";
import { cn } from "@/lib/utils";
import type { LotStatus } from "@/types";

/** The one place a lot's state is given a colour, so the board reads evenly. */
const TONE: Record<LotStatus, string> = {
  upcoming: "border-rose-300 text-ink-500",
  open: "border-gold-400 text-gold-600",
  closing: "border-error/50 bg-error/5 text-error",
  sold: "border-rose-300 bg-rose-50 text-ink-500",
  passed: "border-rose-300 text-ink-400",
};

export function LotStatusPill({
  status,
  className,
}: {
  status: LotStatus;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center border px-2.5 py-1 text-[0.58rem] uppercase tracking-[0.22em]",
        TONE[status],
        className,
      )}
    >
      {status === "closing" ? (
        <span aria-hidden className="mr-1.5 size-1.5 rounded-full bg-error motion-safe:animate-pulse" />
      ) : null}
      {LOT_STATUS_LABEL[status]}
    </span>
  );
}
