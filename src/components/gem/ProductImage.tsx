import Image from "next/image";
import { GemFigure } from "./GemFigure";
import type { Product } from "@/types";
import { cn } from "@/lib/utils";

/**
 * Prefers real photography when the record carries it, and falls back to the
 * generated gem figure when it does not. This is what lets the client add
 * images later without a single component change.
 */
export function ProductImage({
  product,
  priority = false,
  className,
  gemSize = 150,
}: {
  product: Product;
  priority?: boolean;
  className?: string;
  gemSize?: number;
}) {
  const src = product.images?.[0];

  return (
    <div
      className={cn(
        "relative flex aspect-square items-center justify-center overflow-hidden rounded-(--radius-image) bg-rose-100",
        className,
      )}
    >
      {src ? (
        <Image
          src={src}
          alt={product.name}
          fill
          priority={priority}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-[1200ms] ease-[var(--ease-luxe)] group-hover:scale-[1.04]"
        />
      ) : (
        <>
          <div
            aria-hidden
            className="absolute inset-0 opacity-70"
            style={{
              background:
                "radial-gradient(ellipse 55% 45% at 50% 42%, rgba(255,255,255,0.85), transparent 70%)",
            }}
          />
          <GemFigure
            hue={product.hue}
            shape={product.shape}
            size={gemSize}
            className="relative transition-transform duration-[1200ms] ease-[var(--ease-luxe)] group-hover:scale-[1.06]"
          />
        </>
      )}
    </div>
  );
}
