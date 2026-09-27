import { Price } from "@/components/currency/Price";
import type { Bid } from "@/types";

/**
 * Times are formatted in the sale room's own zone, explicitly. Leaving the
 * zone implicit would render the server's clock on the first paint and the
 * reader's on the second, and hydration would rightly complain.
 */
const clock = new Intl.DateTimeFormat("en-AU", {
  hour: "numeric",
  minute: "2-digit",
  second: "2-digit",
  hour12: false,
  timeZone: "Australia/Sydney",
});

export function BidHistory({
  history,
  yourPaddle,
}: {
  history: Bid[];
  yourPaddle?: string;
}) {
  if (!history.length) {
    return (
      <p className="py-6 text-sm text-ink-400">
        No bids yet. The first bid takes the lot at its opening price.
      </p>
    );
  }

  return (
    <table className="w-full text-sm">
      <caption className="sr-only">Bid history for this lot, most recent first</caption>
      <thead>
        <tr className="border-b border-rose-200 text-[0.6rem] uppercase tracking-[0.2em] text-ink-400">
          <th scope="col" className="py-2.5 text-left font-normal">Bidder</th>
          <th scope="col" className="py-2.5 text-left font-normal">Time</th>
          <th scope="col" className="py-2.5 text-right font-normal">Bid</th>
        </tr>
      </thead>
      <tbody>
        {history.map((bid, index) => {
          const yours = yourPaddle !== undefined && bid.paddle === yourPaddle;

          return (
            <tr key={bid.id} className="border-b border-rose-200/70 last:border-0">
              <td className="py-2.5">
                <span className={yours ? "text-gold-600" : "text-ink-600"}>
                  {yours ? "You" : bid.paddle}
                </span>
                {bid.auto ? (
                  <span className="ml-2 text-[0.6rem] uppercase tracking-[0.18em] text-ink-400">
                    Auto
                  </span>
                ) : null}
                {index === 0 ? (
                  <span className="ml-2 text-[0.6rem] uppercase tracking-[0.18em] text-gold-600">
                    Leading
                  </span>
                ) : null}
              </td>
              <td className="py-2.5 tabular-nums text-ink-400">
                <time dateTime={bid.placedAt}>{clock.format(new Date(bid.placedAt))}</time>
              </td>
              <td className="py-2.5 text-right text-ink-800">
                <Price amountInBase={bid.amount} />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
