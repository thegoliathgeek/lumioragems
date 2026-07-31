import Link from "next/link";
import { Container } from "./Container";
import { SectionHeading } from "./SectionHeading";

/** Consistent opening block for every interior page. */
export function PageHeader({
  eyebrow,
  script,
  title,
  intro,
  crumbs = [],
}: {
  eyebrow?: string;
  script?: string;
  title: string;
  intro?: string;
  crumbs?: { name: string; path: string }[];
}) {
  return (
    <section className="border-b border-rose-200 pt-36 pb-16 lg:pt-44">
      <Container>
        {crumbs.length ? (
          <nav aria-label="Breadcrumb" className="mb-8 flex justify-center">
            <ol className="flex flex-wrap items-center gap-2 text-[0.65rem] uppercase tracking-[0.18em] text-ink-400">
              {crumbs.map((crumb, index) => (
                <li key={crumb.path} className="flex items-center gap-2">
                  {index > 0 ? <span aria-hidden>·</span> : null}
                  {index === crumbs.length - 1 ? (
                    <span aria-current="page" className="text-ink-600">{crumb.name}</span>
                  ) : (
                    <Link href={crumb.path} className="transition-colors hover:text-gold-600">
                      {crumb.name}
                    </Link>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        ) : null}

        <SectionHeading
          as="h1"
          size="lg"
          eyebrow={eyebrow}
          script={script}
          title={title}
          intro={intro}
        />
      </Container>
    </section>
  );
}
