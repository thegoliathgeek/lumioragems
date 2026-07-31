import { Container } from "@/components/ui/Container";

export default function Loading() {
  return (
    <Container className="flex min-h-[70dvh] items-center justify-center py-32">
      <div className="flex flex-col items-center gap-6">
        <span
          aria-hidden
          className="size-8 animate-spin rounded-full border border-rose-300 border-t-gold-500 motion-reduce:animate-none"
        />
        <p className="eyebrow text-ink-400">Loading</p>
      </div>
    </Container>
  );
}
