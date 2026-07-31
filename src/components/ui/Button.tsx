import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "solid" | "outline" | "quiet";

const base =
  "inline-flex items-center justify-center gap-2 rounded-[2px] text-[0.72rem] uppercase tracking-[0.22em] " +
  "transition-all duration-500 ease-[var(--ease-luxe)] disabled:opacity-50 disabled:pointer-events-none";

const variants: Record<Variant, string> = {
  solid:
    "bg-ink-800 text-ivory-50 px-9 py-4 hover:bg-gold-500 hover:text-ivory-50 hover:-translate-y-px",
  outline:
    "border border-gold-400/60 text-ink-800 px-9 py-4 hover:border-gold-500 hover:bg-gold-500 hover:text-ivory-50",
  quiet:
    "text-gold-600 hover:text-ink-800 px-0 py-1 link-underline",
};

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  href?: string;
  children: React.ReactNode;
}

export function Button({ variant = "solid", href, className, children, ...props }: Props) {
  const classes = cn(base, variants[variant], className);

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }
  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
