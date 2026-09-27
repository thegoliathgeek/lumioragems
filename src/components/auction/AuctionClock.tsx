"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { formatCountdown } from "@/lib/auctions/bidding";
import { cn } from "@/lib/utils";

/**
 * The sale room's own clock, zone named explicitly. Left implicit, the first
 * paint would carry whatever zone the server happens to run in — which is
 * neither the room's nor the reader's, and differs from the times in the book.
 */
const ROOM_CLOCK = new Intl.DateTimeFormat("en-AU", {
  weekday: "short",
  day: "numeric",
  month: "short",
  hour: "numeric",
  minute: "2-digit",
  timeZone: "Australia/Sydney",
  timeZoneName: "short",
});

/**
 * A ticking countdown to a fixed instant.
 *
 * The server cannot know the reader's clock, so the first paint is the
 * absolute time — correct, cacheable, and identical on both sides of
 * hydration. Only once mounted does it become a countdown. When the target
 * passes, the component asks the server for fresh state rather than deciding
 * on its own that a lot has closed; the book is the authority, not the tab.
 */
export function AuctionClock({
  target,
  label,
  refreshOnExpiry = false,
  className,
}: {
  target: string;
  /** Word before the figure, e.g. "Closes in". */
  label?: string;
  refreshOnExpiry?: boolean;
  className?: string;
}) {
  const router = useRouter();
  const [remaining, setRemaining] = useState<number | null>(null);

  useEffect(() => {
    const deadline = Date.parse(target);
    let expired = false;

    const tick = () => {
      const left = deadline - Date.now();
      setRemaining(left);

      if (left <= 0 && !expired) {
        expired = true;
        if (refreshOnExpiry) router.refresh();
      }
    };

    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [target, refreshOnExpiry, router]);

  const absolute = ROOM_CLOCK.format(new Date(target));

  return (
    <time
      dateTime={target}
      title={absolute}
      className={cn("tabular-nums", className)}
      // The text legitimately differs between server and client: one is a
      // date, the other a countdown from a clock the server cannot read.
      suppressHydrationWarning
    >
      {remaining === null ? (
        absolute
      ) : remaining <= 0 ? (
        "Closed"
      ) : (
        <>
          {label ? <span className="mr-1.5">{label}</span> : null}
          {formatCountdown(remaining)}
        </>
      )}
    </time>
  );
}
