"use client";

import { useEffect } from "react";
import { Container } from "@/components/ui/Container";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Phase 2: forward to Sentry or the platform's error reporter.
    console.error("[app] unhandled error:", error);
  }, [error]);

  return (
    <Container width="narrow" className="flex min-h-dvh flex-col items-center justify-center py-32 text-center">
      <p className="eyebrow mb-5">Something went wrong</p>
      <h1 className="text-(length:--text-display-md)">We could not load that</h1>
      <p className="mx-auto mt-5 max-w-md leading-relaxed text-ink-500">
        The fault is at our end, not yours. Try again — and if it persists, write to us and we will
        look into it.
      </p>

      <button
        type="button"
        onClick={reset}
        className="mt-10 rounded-[2px] bg-ink-800 px-9 py-4 text-[0.72rem] uppercase tracking-[0.22em] text-ivory-50 transition-all duration-500 hover:bg-gold-500"
      >
        Try again
      </button>

      {error.digest ? (
        <p className="mt-8 text-xs text-ink-400">Reference: {error.digest}</p>
      ) : null}
    </Container>
  );
}
