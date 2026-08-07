"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Reveals children once they scroll into view.
 *
 * The hidden state is opt-in rather than the default: the server render and the
 * first client render are both fully visible, and JS only hides an element once
 * it has confirmed the element is off-screen and that it holds an observer able
 * to show it again. A hydration failure, a blocked bundle or a reader without
 * JS therefore costs the animation — never the content.
 */
type Phase = "static" | "hidden" | "shown";

export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<Phase>("static");

  useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === "undefined") return;

    // Already on screen at load — leave it alone rather than hiding it just to
    // fade it back in, which would read as a flash.
    if (node.getBoundingClientRect().top < window.innerHeight) return;

    setPhase("hidden");

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setPhase("shown");
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={cn(
        "transition-all duration-[900ms] ease-[var(--ease-luxe)] motion-reduce:transition-none",
        phase === "hidden" ? "opacity-0 translate-y-7" : "opacity-100 translate-y-0",
        className,
      )}
    >
      {children}
    </div>
  );
}
