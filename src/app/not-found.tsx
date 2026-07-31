import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { GemFigure } from "@/components/gem/GemFigure";

export default function NotFound() {
  return (
    <Container width="narrow" className="flex min-h-dvh flex-col items-center justify-center py-32 text-center">
      <GemFigure hue="champagne" shape="kite" size={110} />

      <p className="eyebrow mt-10 mb-5">Error 404</p>
      <h1 className="text-(length:--text-display-md)">This one is not in the vault</h1>
      <p className="mx-auto mt-5 max-w-md leading-relaxed text-ink-500">
        The page you were looking for has moved or never existed. The collection, however, is
        exactly where you left it.
      </p>

      <div className="mt-10 flex flex-wrap justify-center gap-4">
        <Link href="/shop/all-sapphires" className="rounded-[2px] bg-ink-800 px-9 py-4 text-[0.72rem] uppercase tracking-[0.22em] text-ivory-50 transition-all duration-500 hover:bg-gold-500">
          Browse the collection
        </Link>
        <Link href="/contact" className="rounded-[2px] border border-gold-400/60 px-9 py-4 text-[0.72rem] uppercase tracking-[0.22em] text-ink-800 transition-all duration-500 hover:bg-gold-500 hover:text-ivory-50">
          Ask us to find it
        </Link>
      </div>
    </Container>
  );
}
