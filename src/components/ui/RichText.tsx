import type { ContentBlock } from "@/types";
import { cn } from "@/lib/utils";

/** Renders long-form copy: paragraphs, sub-headings, lists and tables. */
export function RichText({
  blocks,
  className,
  paragraphClassName = "leading-relaxed text-ink-500",
}: {
  blocks: ContentBlock[];
  className?: string;
  paragraphClassName?: string;
}) {
  return (
    <div className={cn("space-y-4", className)}>
      {blocks.map((block, index) => {
        if (typeof block === "string") {
          return <p key={index} className={paragraphClassName}>{block}</p>;
        }

        if ("heading" in block) {
          return <h3 key={index} className="pt-4 text-xl text-ink-800">{block.heading}</h3>;
        }

        if ("lead" in block) {
          return <p key={index} className={cn(paragraphClassName, "font-medium text-ink-700")}>{block.lead}</p>;
        }

        if ("list" in block) {
          return (
            <ul key={index} className="space-y-2.5">
              {block.list.map((item) => (
                <li key={item} className={cn("flex gap-3", paragraphClassName)}>
                  <span aria-hidden className="mt-[0.7em] size-1 shrink-0 rounded-full bg-gold-400" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          );
        }

        return (
          <div key={index} className="overflow-x-auto">
            <table className="w-full border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-rose-300">
                  {block.table.head.map((cell) => (
                    <th key={cell} className="eyebrow py-3 pr-6 font-normal">{cell}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {block.table.rows.map((row) => (
                  <tr key={row.join("|")} className="border-b border-rose-200">
                    {row.map((cell, cellIndex) => (
                      <td key={cellIndex} className="py-3 pr-6 text-ink-500">{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      })}
    </div>
  );
}
