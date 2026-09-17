import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { RichText } from "@/components/ui/RichText";
import { policies, policiesBySlug } from "@/data/policies";
import { pageMetadata } from "@/lib/seo/metadata";
import { formatDate } from "@/lib/utils";

export function generateStaticParams() {
  return policies.map((policy) => ({ slug: policy.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const policy = policiesBySlug.get(slug);

  if (!policy) {
    return pageMetadata({ title: "Policy not found", description: "", path: `/policies/${slug}`, index: false });
  }

  return pageMetadata({
    title: policy.title,
    description: `${policy.title} for Lumiora Gems. Last updated ${formatDate(policy.updatedAt)}.`,
    path: `/policies/${policy.slug}`,
  });
}

export default async function PolicyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const policy = policiesBySlug.get(slug);

  if (!policy) notFound();

  return (
    <>
      <PageHeader
        eyebrow={`Last updated ${formatDate(policy.updatedAt)}`}
        title={policy.title}
        crumbs={[{ name: "Home", path: "/" }, { name: policy.title, path: `/policies/${policy.slug}` }]}
      />

      <Container width="narrow" className="py-(--spacing-section-sm)">
        {policy.intro ? (
          <p className="mb-14 border-l-2 border-gold-400 pl-6 text-lg leading-relaxed text-ink-500">{policy.intro}</p>
        ) : null}

        <div className="space-y-12">
          {policy.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="text-2xl">{section.heading}</h2>
              <RichText blocks={section.body} className="mt-4" />
            </section>
          ))}
        </div>

        {policy.closing ? (
          <p className="mt-16 border-t border-rose-200 pt-8 text-center leading-relaxed text-ink-600">{policy.closing}</p>
        ) : null}
      </Container>
    </>
  );
}
