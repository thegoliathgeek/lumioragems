import "server-only";

/**
 * Typed HTTP client for the Lumiora backend.
 *
 * Phase 1 ships without a backend: `API_BASE_URL` is unset and every data
 * accessor falls back to the bundled catalogue. Phase 2 sets the variable and
 * the same accessors begin serving live data — no component changes required.
 *
 * Guarantees:
 *  - hard timeout so a slow upstream cannot hang a page render
 *  - credentials read server-side only, never serialised to the client
 *  - upstream errors normalised, never leaked verbatim to the browser
 *  - cache tags so Phase 2 can revalidate on demand
 */

const BASE_URL = process.env.API_BASE_URL?.replace(/\/$/, "") ?? "";
const API_KEY = process.env.API_KEY ?? "";
const TIMEOUT_MS = 8_000;

export const backendConfigured = () => BASE_URL.length > 0;

export class ApiError extends Error {
  constructor(message: string, readonly status: number) {
    super(message);
    this.name = "ApiError";
  }
}

interface RequestOptions {
  /** Seconds before the cached response is considered stale. */
  revalidate?: number;
  /** Cache tags for on-demand revalidation. */
  tags?: string[];
  method?: "GET" | "POST";
  body?: unknown;
  signal?: AbortSignal;
}

export async function apiRequest<T>(path: string, options: RequestOptions = {}): Promise<T> {
  if (!backendConfigured()) {
    throw new ApiError("Backend is not configured.", 503);
  }

  const { revalidate = 300, tags = [], method = "GET", body } = options;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const response = await fetch(`${BASE_URL}${path}`, {
      method,
      headers: {
        Accept: "application/json",
        ...(body ? { "Content-Type": "application/json" } : {}),
        ...(API_KEY ? { Authorization: `Bearer ${API_KEY}` } : {}),
      },
      body: body ? JSON.stringify(body) : undefined,
      signal: options.signal ?? controller.signal,
      next: method === "GET" ? { revalidate, tags } : undefined,
      cache: method === "GET" ? undefined : "no-store",
    });

    if (!response.ok) {
      // Deliberately generic: upstream error text may contain internal detail.
      throw new ApiError(`Upstream request failed for ${path}`, response.status);
    }

    return (await response.json()) as T;
  } catch (error) {
    if (error instanceof ApiError) throw error;
    if (error instanceof Error && error.name === "AbortError") {
      throw new ApiError(`Upstream request timed out for ${path}`, 504);
    }
    throw new ApiError(`Upstream request errored for ${path}`, 502);
  } finally {
    clearTimeout(timeout);
  }
}

/**
 * Runs the backend call, falling back to local data if the backend is absent
 * or unhealthy. Keeps the site fully functional in Phase 1 and resilient in
 * Phase 2.
 */
export async function withFallback<T>(
  fetcher: () => Promise<T>,
  fallback: () => T,
  label: string,
): Promise<T> {
  if (!backendConfigured()) return fallback();
  try {
    return await fetcher();
  } catch (error) {
    console.error(`[api] ${label} fell back to local data:`, (error as Error).message);
    return fallback();
  }
}
