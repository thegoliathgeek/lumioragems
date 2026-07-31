import Link from "next/link";
import { ProductImage } from "@/components/gem/ProductImage";
import { Price } from "@/components/currency/Price";
import { formatCarat } from "@/lib/utils";
import type { Product } from "@/types";

const AVAILABILITY_LABEL: Record<Product["availability"], string> = {
  available: "",
  reserved: "Reserved",
  sold: "Sold",
};

export function ProductCard({ product, priority = false }: { product: Product; priority?: boolean }) {
  const badge = AVAILABILITY_LABEL[product.availability];

  return (
    <Link
      href={`/shop/product/${product.slug}`}
      className="group block focus:outline-none"
      aria-label={`${product.name}, ${formatCarat(product.carat)}`}
    >
      <div className="relative">
        <ProductImage product={product} priority={priority} />

        {badge ? (
          <span className="absolute left-4 top-4 bg-ivory-50/95 px-3 py-1.5 text-[0.6rem] uppercase tracking-[0.24em] text-ink-600">
            {badge}
          </span>
        ) : null}
      </div>

      <div className="pt-5">
        <p className="eyebrow mb-2 text-ink-400">
          {product.origin.split("(")[0]?.trim()} · {product.treatment}
        </p>

        <h3 className="text-lg leading-snug transition-colors duration-500 group-hover:text-gold-600">
          {product.name}
        </h3>

        <div className="mt-3 flex items-baseline justify-between gap-3 border-t border-rose-200 pt-3">
          <span className="text-sm text-ink-500">
            {formatCarat(product.carat)} · {product.shape}
          </span>
          <span className="font-display text-base text-ink-800">
            {product.availability === "sold" ? "—" : <Price amountInBase={product.price} />}
          </span>
        </div>
      </div>
    </Link>
  );
}
