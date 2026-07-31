import "server-only";

/**
 * Fixed-window rate limiter held in process memory.
 *
 * Adequate for a single-instance Phase 1 deployment. On a multi-instance or
 * serverless host each instance keeps its own counter, so Phase 2 should move
 * this to Upstash Redis or the platform's own limiter — the call signature is
 * designed to survive that swap unchanged.
 */

interface Window {
  count: number;
  resetAt: number;
}

const store = new Map<string, Window>();
const MAX_KEYS = 10_000;

function sweep(now: number) {
  for (const [key, window] of store) {
    if (window.resetAt <= now) store.delete(key);
  }
  // Hard ceiling so a flood of unique keys cannot exhaust memory.
  if (store.size > MAX_KEYS) store.clear();
}

export interface RateLimitResult {
  success: boolean;
  remaining: number;
  retryAfterSeconds: number;
}

export function rateLimit(key: string, limit = 5, windowMs = 60_000): RateLimitResult {
  const now = Date.now();
  if (Math.random() < 0.02) sweep(now);

  const existing = store.get(key);

  if (!existing || existing.resetAt <= now) {
    store.set(key, { count: 1, resetAt: now + windowMs });
    return { success: true, remaining: limit - 1, retryAfterSeconds: 0 };
  }

  existing.count += 1;

  if (existing.count > limit) {
    return {
      success: false,
      remaining: 0,
      retryAfterSeconds: Math.ceil((existing.resetAt - now) / 1000),
    };
  }

  return { success: true, remaining: limit - existing.count, retryAfterSeconds: 0 };
}

/** Best-effort client IP behind a proxy or CDN. */
export function clientIp(headers: Headers): string {
  const forwarded = headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]!.trim();
  return headers.get("x-real-ip") ?? headers.get("cf-connecting-ip") ?? "unknown";
}
