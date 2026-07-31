import { NextResponse } from "next/server";
import { enquirySchema } from "@/lib/validation/schemas";
import { rateLimit, clientIp } from "@/lib/security/rate-limit";
import { sendEnquiryNotification, sendEnquiryAcknowledgement } from "@/lib/email/send";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_BODY_BYTES = 12_000;

export async function POST(request: Request) {
  // 1 — Throttle before doing any work.
  const ip = clientIp(request.headers);
  const limit = rateLimit(`enquiry:${ip}`, 5, 60_000);

  if (!limit.success) {
    return NextResponse.json(
      { ok: false, error: "Too many enquiries in a short time. Please try again shortly." },
      { status: 429, headers: { "Retry-After": String(limit.retryAfterSeconds) } },
    );
  }

  // 2 — Reject oversized payloads before parsing.
  const declaredLength = Number(request.headers.get("content-length") ?? 0);
  if (declaredLength > MAX_BODY_BYTES) {
    return NextResponse.json({ ok: false, error: "That message is too long." }, { status: 413 });
  }

  // 3 — Parse defensively.
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Malformed request." }, { status: 400 });
  }

  // 4 — Validate. This is the boundary that counts; client validation is a courtesy.
  const parsed = enquirySchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: parsed.error.issues[0]?.message ?? "Please check the form and try again." },
      { status: 422 },
    );
  }

  const data = parsed.data;

  // 5 — Honeypot. Answer 200 so bots learn nothing from the response.
  if (data.company) {
    return NextResponse.json({ ok: true });
  }

  // 6 — Dispatch. The customer's acknowledgement must never block the
  //      internal notification, so failures are logged rather than surfaced.
  try {
    const [notified] = await Promise.all([
      sendEnquiryNotification(data),
      sendEnquiryAcknowledgement(data).catch((error) => {
        console.error("[enquiry] acknowledgement failed:", error);
        return false;
      }),
    ]);

    if (!notified) {
      return NextResponse.json(
        { ok: false, error: "We could not send your enquiry. Please email us directly." },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[enquiry] unhandled failure:", error);
    return NextResponse.json(
      { ok: false, error: "Something went wrong at our end. Please try again." },
      { status: 500 },
    );
  }
}
