import Image from "next/image";
import { GemFigure } from "./GemFigure";
import type { Collection } from "@/types";
import { cn } from "@/lib/utils";

/**
 * Collection tile artwork. Mirrors `ProductImage`: real photography when the
 * record carries it, the generated gem figure when it does not — so a new
 * collection can be added without an image and still look finished.
 *
 * The caller owns the aspect ratio; this only fills whatever box it is given.
 */
export function CollectionImage({
  collection,
  className,
  gemSize = 92,
  sizes = "(max-width: 768px) 50vw, 25vw",
}: {
  collection: Collection;
  className?: string;
  gemSize?: number;
  sizes?: string;
}) {
  const src = collection.image;

  return (
    <div
      className={cn(
        "relative flex items-center justify-center overflow-hidden rounded-(--radius-image) bg-rose-100",
        className,
      )}
    >
      {src ? (
        <Image
          src={src}
          alt=""
          fill
          sizes={sizes}
          className="object-cover transition-transform duration-[1100ms] ease-[var(--ease-luxe)] group-hover:scale-[1.06]"
        />
      ) : (
        <GemFigure
          hue={collection.hue}
          size={gemSize}
          className="transition-transform duration-[1100ms] ease-[var(--ease-luxe)] group-hover:scale-110"
        />
      )}
    </div>
  );
}
