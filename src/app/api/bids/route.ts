import { NextResponse } from "next/server";
import { bidSchema } from "@/lib/validation/schemas";
import { rateLimit, clientIp } from "@/lib/security/rate-limit";
import { auctionStatus, getAuction, lotState } from "@/lib/api/auctions";
import { lotsBySlug } from "@/data/auctions";
import { place } from "@/lib/auctions/store";
import { paddleFor, sessionWindow } from "@/lib/auctions/bidding";
import type { LotState } from "@/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_BODY_BYTES = 4_000;

/** Poll endpoint for the bid panel: the live state of one lot. */
export async function GET(request: Request) {
  const slug = new URL(request.url).searchParams.get("lot")?.trim() ?? "";
  const lot = lotsBySlug.get(slug);

  if (!lot) {
    return NextResponse.json({ ok: false, error: "No such lot." }, { status: 404 });
  }

  const now = new Date();
  const { opensAt } = sessionWindow(now);

  return NextResponse.json(
    { ok: true, data: lotState(lot, opensAt, now) },
    { headers: { "Cache-Control": "no-store" } },
  );
}

export async function POST(request: Request) {
  // 1 — Throttle. A bidder raising themselves in a loop is the failure mode
  //      worth guarding against, so this is tighter than the enquiry form.
  const ip = clientIp(request.headers);
  const limit = rateLimit(`bid:${ip}`, 12, 60_000);

  if (!limit.success) {
    return NextResponse.json(
      { ok: false, error: "Too many bids in a short time. Please wait a moment." },
      { status: 429, headers: { "Retry-After": String(limit.retryAfterSeconds) } },
    );
  }

  const declaredLength = Number(request.headers.get("content-length") ?? 0);
  if (declaredLength > MAX_BODY_BYTES) {
    return NextResponse.json({ ok: false, error: "That request is too large." }, { status: 413 });
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Malformed request." }, { status: 400 });
  }

  const parsed = bidSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: parsed.error.issues[0]?.message ?? "Please check the form and try again." },
      { status: 422 },
    );
  }

  const data = parsed.data;

  // Honeypot. A bot learns nothing: it is told the bid stood, and no bid is
  // recorded. The state returned is simply the current state of the lot.
  const lot = lotsBySlug.get(data.lotSlug);
  if (!lot) {
    return NextResponse.json({ ok: false, error: "No such lot." }, { status: 404 });
  }

  const now = new Date();
  const { opensAt } = sessionWindow(now);
  const before = lotState(lot, opensAt, now);

  if (data.company) {
    return NextResponse.json({ ok: true, data: before });
  }

  if (before.status === "sold" || before.status === "passed") {
    return NextResponse.json(
      { ok: false, error: "This lot has closed.", data: before },
      { status: 409 },
    );
  }

  const auction = await getAuction(now);
  const commission = auctionStatus(auction, now) === "upcoming";

  const result = place({
    lotSlug: lot.slug,
    paddle: paddleFor(data.email),
    amount: data.amount,
    maxBid: data.maxBid,
    standingBid: before.currentBid,
    standingBidCount: before.bidCount,
    nextBid: before.nextBid,
    closesAt: new Date(before.closesAt),
    commission,
    now,
  });

  if (!result.ok) {
    return NextResponse.json(
      { ok: false, error: result.error ?? "That bid was not accepted.", data: before },
      { status: 409 },
    );
  }

  const after = lotState(lot, opensAt, now);
  const paddle = paddleFor(data.email);

  return NextResponse.json(
    {
      ok: true,
      data: after satisfies LotState,
      paddle,
      commission,
      /** True when a rival's standing maximum has already answered this bid. */
      outbid: !commission && after.leadPaddle !== paddle,
    },
    { headers: { "Cache-Control": "no-store" } },
  );
}
