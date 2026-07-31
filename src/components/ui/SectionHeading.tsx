import { cn } from "@/lib/utils";

/**
 * The signature lockup, taken straight from the brand deck: a gold copperplate
 * word set over — and slightly overlapping — a high-contrast serif line.
 * Used for every section title so the page reads as one composed system.
 */
export function SectionHeading({
  script,
  title,
  eyebrow,
  intro,
  align = "center",
  size = "md",
  as: Tag = "h2",
  className,
}: {
  script?: string;
  title: string;
  eyebrow?: string;
  intro?: string;
  align?: "center" | "left";
  size?: "sm" | "md" | "lg";
  as?: "h1" | "h2" | "h3";
  className?: string;
}) {
  const scriptSize = {
    sm: "text-[clamp(1.9rem,3.4vw,2.7rem)]",
    md: "text-[clamp(2.4rem,4.6vw,3.9rem)]",
    lg: "text-[clamp(3rem,6vw,5rem)]",
  }[size];

  const titleSize = {
    sm: "text-(length:--text-display-sm)",
    md: "text-(length:--text-display-md)",
    lg: "text-(length:--text-display-lg)",
  }[size];

  return (
    <div className={cn(align === "center" ? "text-center mx-auto max-w-2xl" : "text-left", className)}>
      {eyebrow ? <p className="eyebrow mb-5">{eyebrow}</p> : null}

      {script ? (
        <span
          aria-hidden
          className={cn("script-accent block -mb-[0.32em] translate-x-1", scriptSize)}
        >
          {script}
        </span>
      ) : null}

      <Tag className={cn(titleSize, "relative")}>
        {script ? <span className="sr-only">{script} </span> : null}
        {title}
      </Tag>

      {intro ? (
        <p className={cn("mt-6 text-ink-500", align === "center" && "mx-auto max-w-xl")}>{intro}</p>
      ) : null}
    </div>
  );
}
