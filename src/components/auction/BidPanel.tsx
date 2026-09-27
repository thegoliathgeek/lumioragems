"use client";

import { useCallback, useEffect, useState } from "react";
import { Check, Gavel, Loader2, TriangleAlert } from "lucide-react";
import { Price } from "@/components/currency/Price";
import { AuctionClock } from "./AuctionClock";
import { LotStatusPill } from "./LotStatusPill";
import { BidHistory } from "./BidHistory";
import { bidLadder } from "@/lib/auctions/bidding";
import { bidSchema } from "@/lib/validation/schemas";
import { cn } from "@/lib/utils";
import type { AuctionStatus, LotState, LotView } from "@/types";

type Phase = "idle" | "sending" | "placed" | "error";
type Errors = Partial<Record<"amount" | "maxBid" | "name" | "email" | "consent" | "form", string>>;

/** How often an open lot re-reads the book. */
const POLL_MS = 8_000;
const BIDDER_KEY = "lumiora.bidder";

interface Bidder {
  name: string;
  email: string;
}

/**
 * Reads the saved bidder once, on the client.
 *
 * Storage is a per-viewer convenience only — it holds who is bidding so the
 * second bid is one tap rather than a form. It is never the record of a bid:
 * that lives in the book on the server. Every access is guarded because a
 * private window, blocked site data or a thumbnail capture can each make this
 * throw or come back empty, and the panel has to work regardless.
 */
function readBidder(): Bidder | null {
  try {
    const raw = window.localStorage.getItem(BIDDER_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<Bidder>;
    if (typeof parsed.name === "string" && typeof parsed.email === "string") {
      return { name: parsed.name, email: parsed.email };
    }
  } catch {
    /* no saved bidder, or storage is unavailable — ask for the details again */
  }
  return null;
}

export function BidPanel({
  lot,
  sessionStatus,
}: {
  lot: LotView;
  sessionStatus: AuctionStatus;
}) {
  const [state, setState] = useState<LotState>(lot);
  const [bidder, setBidder] = useState<Bidder | null>(null);
  const [editingBidder, setEditingBidder] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", consent: false, company: "" });

  const [customAmount, setCustomAmount] = useState<number | null>(null);
  const [maxBid, setMaxBid] = useState("");
  const [useMax, setUseMax] = useState(false);

  const [phase, setPhase] = useState<Phase>("idle");
  const [errors, setErrors] = useState<Errors>({});
  const [receipt, setReceipt] = useState<{ paddle: string; amount: number; outbid: boolean; commission: boolean } | null>(null);

  const commission = sessionStatus === "upcoming";
  const settled = state.status === "sold" || state.status === "passed";
  const amount = customAmount !== null && customAmount >= state.nextBid ? customAmount : state.nextBid;

  useEffect(() => {
    const saved = readBidder();
    if (saved) setBidder(saved);
    else setEditingBidder(true);
  }, []);

  /* ---- keep the book fresh ------------------------------------------- */

  const refresh = useCallback(async () => {
    try {
      const response = await fetch(`/api/bids?lot=${encodeURIComponent(lot.slug)}`, {
        cache: "no-store",
      });
      const result = await response.json();
      if (response.ok && result.ok) setState(result.data as LotState);
    } catch {
      /* a dropped poll is not worth reporting — the next one will land */
    }
  }, [lot.slug]);

  useEffect(() => {
    if (settled) return;

    const id = window.setInterval(() => {
      if (document.visibilityState === "visible") void refresh();
    }, POLL_MS);

    return () => window.clearInterval(id);
  }, [settled, refresh]);

  // A bid that has been overtaken stops being the bid on the button.
  useEffect(() => {
    if (customAmount !== null && customAmount < state.nextBid) setCustomAmount(null);
  }, [customAmount, state.nextBid]);

  /* ---- placing --------------------------------------------------------- */

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setErrors({});

    const identity = editingBidder || !bidder
      ? { name: form.name, email: form.email, consent: form.consent }
      : { name: bidder.name, email: bidder.email, consent: true };

    const payload = {
      lotSlug: lot.slug,
      amount,
      ...(useMax && maxBid.trim() ? { maxBid: Number(maxBid) } : {}),
      ...identity,
      company: form.company,
    };

    // Parsed here for instant feedback; the endpoint parses again, and that
    // is the parse that decides whether a bid stands.
    const parsed = bidSchema.safeParse(payload);
    if (!parsed.success) {
      const next: Errors = {};
      for (const issue of parsed.error.issues) {
        const field = issue.path[0] as keyof Errors;
        if (field && !next[field]) next[field] = issue.message;
      }
      setErrors(next);
      return;
    }

    setPhase("sending");
    try {
      const response = await fetch("/api/bids", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      const result = await response.json();

      if (result.data) setState(result.data as LotState);

      if (response.ok && result.ok) {
        const saved = { name: parsed.data.name, email: parsed.data.email };
        setBidder(saved);
        setEditingBidder(false);
        try {
          window.localStorage.setItem(BIDDER_KEY, JSON.stringify(saved));
        } catch {
          /* bidding works without it; the next bid just asks again */
        }

        setReceipt({
          paddle: result.paddle,
          amount: parsed.data.amount,
          outbid: Boolean(result.outbid),
          commission: Boolean(result.commission),
        });
        setCustomAmount(null);
        setMaxBid("");
        setUseMax(false);
        setPhase("placed");
      } else {
        setPhase("error");
        setErrors({ form: result.error ?? "That bid was not accepted. Please try again." });
      }
    } catch {
      setPhase("error");
      setErrors({ form: "We could not reach the sale room. Please try again in a moment." });
    }
  }

  /* ---- panel ----------------------------------------------------------- */

  const ladder = bidLadder(state.nextBid);

  return (
    <div className="border border-rose-200 bg-ivory-50">
      {/* ---- price head ---- */}
      <div className="border-b border-rose-200 px-6 py-7 sm:px-8">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <LotStatusPill status={state.status} />
          {settled ? null : (
            <AuctionClock
              target={state.closesAt}
              label={state.status === "upcoming" ? "Opens in" : "Closes in"}
              refreshOnExpiry
              className={cn(
                "text-[0.7rem] uppercase tracking-[0.18em]",
                state.status === "closing" ? "text-error" : "text-ink-500",
              )}
            />
          )}
        </div>

        <p className="eyebrow mb-2">
          {settled
            ? state.status === "sold" ? "Sold for" : "Bidding reached"
            : state.bidCount === 0 ? "Opening bid" : "Current bid"}
        </p>

        <p className="font-display text-(length:--text-display-sm) text-ink-900">
          <Price amountInBase={state.currentBid} showCode />
        </p>

        <p className="mt-3 text-xs text-ink-400">
          {state.bidCount} {state.bidCount === 1 ? "bid" : "bids"} ·{" "}
          {lot.reserve === undefined
            ? "No reserve"
            : state.reserveMet ? "Reserve met" : "Reserve not yet met"} ·{" "}
          <Price amountInBase={state.increment} /> increments · no buyer&rsquo;s premium
        </p>

        <p className="mt-1 text-xs text-ink-400">
          Estimate <Price amountInBase={lot.estimate[0]} />–<Price amountInBase={lot.estimate[1]} />
        </p>
      </div>

      {/* ---- bidding ---- */}
      {settled ? (
        <div className="px-6 py-7 sm:px-8">
          <p className="text-sm leading-relaxed text-ink-500">
            {state.status === "sold"
              ? "This lot has closed and is a permanent record of the sale. The winning bidder has been contacted; the stone ships insured once payment clears."
              : "Bidding on this lot stopped short of the reserve, so it was passed. It may return in a later session — or tell us what you were looking for and we will find it."}
          </p>
        </div>
      ) : phase === "placed" && receipt ? (
        <Receipt
          receipt={receipt}
          onContinue={() => { setPhase("idle"); setReceipt(null); }}
        />
      ) : (
        <form onSubmit={onSubmit} noValidate className="space-y-6 px-6 py-7 sm:px-8">
          {commission ? (
            <p className="border-l-2 border-gold-400 bg-rose-50 px-4 py-3 text-xs leading-relaxed text-ink-500">
              The room opens Sunday. Until then you can leave a commission bid — it is held
              sealed, is not shown in the book, and is executed for you at the lowest price
              that wins, never more than your maximum.
            </p>
          ) : null}

          <fieldset>
            <legend className="eyebrow mb-3">
              {commission ? "Your commission bid" : "Your bid"}
            </legend>

            <div className="flex flex-wrap gap-2">
              {ladder.map((rung, index) => (
                <button
                  key={rung}
                  type="button"
                  aria-pressed={amount === rung}
                  onClick={() => setCustomAmount(rung)}
                  className={cn(
                    "border px-4 py-2.5 text-sm tabular-nums transition-colors duration-300",
                    amount === rung
                      ? "border-gold-500 bg-gold-500 text-ivory-50"
                      : "border-rose-300 text-ink-600 hover:border-gold-400",
                  )}
                >
                  <Price amountInBase={rung} />
                  {index === 0 ? (
                    <span className="ml-2 text-[0.6rem] uppercase tracking-[0.16em] opacity-70">
                      Next
                    </span>
                  ) : null}
                </button>
              ))}
            </div>

            <label htmlFor="bid-amount" className="mt-5 mb-1.5 block text-[0.65rem] uppercase tracking-[0.18em] text-ink-400">
              Or another amount
            </label>
            <input
              id="bid-amount"
              type="number"
              inputMode="numeric"
              min={state.nextBid}
              step={state.increment}
              value={customAmount ?? ""}
              placeholder={String(state.nextBid)}
              onChange={(event) => {
                const value = event.target.value;
                setCustomAmount(value === "" ? null : Number(value));
                setErrors((previous) => ({ ...previous, amount: undefined, form: undefined }));
              }}
              aria-describedby="bid-amount-hint"
              aria-invalid={Boolean(errors.amount)}
              className={fieldClass(Boolean(errors.amount))}
            />
            <p id="bid-amount-hint" className="mt-2 text-xs text-ink-400">
              Minimum <Price amountInBase={state.nextBid} />. Bids are in AUD and binding once placed.
            </p>
            {errors.amount ? <p className="mt-2 text-xs text-error">{errors.amount}</p> : null}
          </fieldset>

          {/* ---- proxy ---- */}
          <div>
            <label className="flex cursor-pointer items-start gap-3 text-sm text-ink-600">
              <input
                type="checkbox"
                checked={useMax}
                onChange={(event) => setUseMax(event.target.checked)}
                className="mt-1.5 size-3.5 shrink-0 accent-[var(--color-gold-500)]"
              />
              <span>
                Bid for me up to a maximum
                <span className="block text-xs text-ink-400">
                  We raise you one increment at a time only as far as we must. You pay the
                  lowest price that wins, not your maximum.
                </span>
              </span>
            </label>

            {useMax ? (
              <div className="mt-3 pl-6">
                <label htmlFor="max-bid" className="sr-only">Maximum bid</label>
                <input
                  id="max-bid"
                  type="number"
                  inputMode="numeric"
                  min={amount}
                  step={state.increment}
                  value={maxBid}
                  onChange={(event) => setMaxBid(event.target.value)}
                  placeholder="Your ceiling, kept private"
                  aria-invalid={Boolean(errors.maxBid)}
                  className={fieldClass(Boolean(errors.maxBid))}
                />
                {errors.maxBid ? <p className="mt-2 text-xs text-error">{errors.maxBid}</p> : null}
              </div>
            ) : null}
          </div>

          {/* ---- who is bidding ---- */}
          {bidder && !editingBidder ? (
            <p className="flex flex-wrap items-center gap-x-2 gap-y-1 border-t border-rose-200 pt-5 text-xs text-ink-400">
              <span>Bidding as {bidder.name}</span>
              <span aria-hidden>·</span>
              <button
                type="button"
                onClick={() => { setEditingBidder(true); setForm((f) => ({ ...f, name: bidder.name, email: bidder.email })); }}
                className="text-gold-600 link-underline"
              >
                Not you?
              </button>
            </p>
          ) : (
            <fieldset className="space-y-5 border-t border-rose-200 pt-6">
              <legend className="eyebrow">Register to bid</legend>

              <div>
                <label htmlFor="bidder-name" className="mb-1.5 block text-[0.65rem] uppercase tracking-[0.18em] text-ink-400">
                  Your name
                </label>
                <input
                  id="bidder-name"
                  type="text"
                  autoComplete="name"
                  value={form.name}
                  onChange={(event) => setForm((f) => ({ ...f, name: event.target.value }))}
                  aria-invalid={Boolean(errors.name)}
                  className={fieldClass(Boolean(errors.name))}
                />
                {errors.name ? <p className="mt-2 text-xs text-error">{errors.name}</p> : null}
              </div>

              <div>
                <label htmlFor="bidder-email" className="mb-1.5 block text-[0.65rem] uppercase tracking-[0.18em] text-ink-400">
                  Email address
                </label>
                <input
                  id="bidder-email"
                  type="email"
                  autoComplete="email"
                  value={form.email}
                  onChange={(event) => setForm((f) => ({ ...f, email: event.target.value }))}
                  aria-describedby="bidder-email-hint"
                  aria-invalid={Boolean(errors.email)}
                  className={fieldClass(Boolean(errors.email))}
                />
                <p id="bidder-email-hint" className="mt-2 text-xs text-ink-400">
                  Your paddle number is derived from this. Your name is never published —
                  the book shows paddle numbers only.
                </p>
                {errors.email ? <p className="mt-2 text-xs text-error">{errors.email}</p> : null}
              </div>

              <div>
                <label className="flex cursor-pointer items-start gap-3 text-sm text-ink-500">
                  <input
                    type="checkbox"
                    checked={form.consent}
                    onChange={(event) => setForm((f) => ({ ...f, consent: event.target.checked }))}
                    aria-invalid={Boolean(errors.consent)}
                    className="mt-1 size-3.5 shrink-0 accent-[var(--color-gold-500)]"
                  />
                  <span>
                    I accept the{" "}
                    <a href="/policies/terms" className="text-gold-600 link-underline">conditions of sale</a>{" "}
                    and understand that a bid, once placed, is binding.
                  </span>
                </label>
                {errors.consent ? <p className="mt-2 text-xs text-error">{errors.consent}</p> : null}
              </div>
            </fieldset>
          )}

          {/* Honeypot */}
          <div aria-hidden className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
            <label htmlFor="bid-company">Company</label>
            <input
              id="bid-company" name="company" type="text" tabIndex={-1} autoComplete="off"
              value={form.company}
              onChange={(event) => setForm((f) => ({ ...f, company: event.target.value }))}
            />
          </div>

          {errors.form ? (
            <p role="alert" className="flex items-start gap-2.5 border border-error/30 bg-error/5 px-4 py-3 text-sm text-error">
              <TriangleAlert aria-hidden className="mt-0.5 size-4 shrink-0" />
              {errors.form}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={phase === "sending"}
            className="inline-flex w-full items-center justify-center gap-2.5 rounded-[2px] bg-ink-800 px-8 py-4 text-[0.72rem] uppercase tracking-[0.22em] text-ivory-50 transition-all duration-500 ease-[var(--ease-luxe)] hover:bg-gold-500 disabled:opacity-60"
          >
            {phase === "sending"
              ? <Loader2 aria-hidden className="size-3.5 animate-spin" />
              : <Gavel aria-hidden className="size-3.5" />}
            {phase === "sending"
              ? "Placing"
              : commission ? "Leave commission bid" : "Place bid"}
          </button>

          <p aria-live="polite" className="sr-only">
            {`Current bid ${state.currentBid} Australian dollars, ${state.bidCount} bids.`}
          </p>
        </form>
      )}

      {/* ---- book ---- */}
      <details className="border-t border-rose-200 px-6 py-5 sm:px-8" open={state.bidCount > 0 && !commission}>
        <summary className="cursor-pointer list-none text-[0.65rem] uppercase tracking-[0.2em] text-ink-500 transition-colors hover:text-gold-600">
          Bid history ({state.bidCount})
        </summary>
        <div className="pt-4">
          <BidHistory history={state.history} yourPaddle={receipt?.paddle} />
        </div>
      </details>
    </div>
  );
}

function Receipt({
  receipt,
  onContinue,
}: {
  receipt: { paddle: string; amount: number; outbid: boolean; commission: boolean };
  onContinue: () => void;
}) {
  return (
    <div className="px-6 py-8 sm:px-8">
      <span
        className={cn(
          "flex size-10 items-center justify-center rounded-full text-ivory-50",
          receipt.outbid ? "bg-error" : "bg-gold-500",
        )}
      >
        {receipt.outbid ? <TriangleAlert className="size-4" /> : <Check className="size-4" />}
      </span>

      <h3 className="mt-5 text-(length:--text-display-sm)">
        {receipt.commission
          ? "Commission bid registered"
          : receipt.outbid ? "You have been outbid" : "Your bid stands"}
      </h3>

      <p className="mt-3 text-sm leading-relaxed text-ink-500">
        {receipt.commission ? (
          <>
            Your bid of <Price amountInBase={receipt.amount} /> is held as{" "}
            {receipt.paddle} and will be executed when the room opens on Sunday. We will
            email you a confirmation, and again the moment the lot closes.
          </>
        ) : receipt.outbid ? (
          <>
            Your bid of <Price amountInBase={receipt.amount} /> was answered immediately by a
            standing maximum from another paddle. Bid again to take the lot back.
          </>
        ) : (
          <>
            You are the leading bidder as {receipt.paddle}. We will email you if you are
            outbid, and again when the lot closes. Nothing is owed until it does.
          </>
        )}
      </p>

      <button
        type="button"
        onClick={onContinue}
        className="mt-6 text-[0.68rem] uppercase tracking-[0.22em] text-gold-600 link-underline"
      >
        {receipt.outbid ? "Bid again" : "Place another bid"}
      </button>
    </div>
  );
}

function fieldClass(invalid: boolean) {
  return cn(
    "w-full border-b bg-transparent py-2.5 text-sm text-ink-800 transition-colors duration-300",
    "placeholder:text-ink-400 focus:outline-none",
    invalid ? "border-error focus:border-error" : "border-rose-300 focus:border-gold-500",
  );
}
