import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
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
        <div className="space-y-12">
          {policy.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="text-2xl">{section.heading}</h2>
              <div className="mt-4 space-y-4">
                {section.body.map((paragraph, index) => (
                  <p key={index} className="leading-relaxed text-ink-500">{paragraph}</p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </Container>
    </>
  );
}
