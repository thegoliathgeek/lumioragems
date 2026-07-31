import { NextResponse } from "next/server";
import { newsletterSchema } from "@/lib/validation/schemas";
import { rateLimit, clientIp } from "@/lib/security/rate-limit";
import { sendNewsletterWelcome } from "@/lib/email/send";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const ip = clientIp(request.headers);
  const limit = rateLimit(`newsletter:${ip}`, 3, 60_000);

  if (!limit.success) {
    return NextResponse.json(
      { ok: false, error: "Please wait a moment before trying again." },
      { status: 429, headers: { "Retry-After": String(limit.retryAfterSeconds) } },
    );
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Malformed request." }, { status: 400 });
  }

  const parsed = newsletterSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: parsed.error.issues[0]?.message ?? "Please check your email address." },
      { status: 422 },
    );
  }

  if (parsed.data.company) {
    return NextResponse.json({ ok: true });
  }

  try {
    // Phase 2: also persist to the subscriber list on the backend.
    await sendNewsletterWelcome(parsed.data.email);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[newsletter] failed:", error);
    return NextResponse.json({ ok: false, error: "We could not add you just now." }, { status: 500 });
  }
}
