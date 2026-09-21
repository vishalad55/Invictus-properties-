import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/Button";
import { Faq } from "@/components/Faq";
import { JsonLd } from "@/components/JsonLd";
import { Reveal } from "@/components/Reveal";
import { Container, Section } from "@/components/Section";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbSchema, faqSchema, serviceSchema } from "@/lib/schema";
import { getService, services } from "@/lib/services";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return pageMetadata({
    title: service.title,
    description: service.answer,
    path: `/services/${service.slug}`,
  });
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const index = services.findIndex((s) => s.slug === service.slug);
  const next = services[(index + 1) % services.length];
  const faq = faqSchema(service.faqs);

  return (
    <>
      <JsonLd data={serviceSchema(service.slug, service.title, service.answer)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", href: "/" },
          { name: "Services", href: "/services" },
          { name: service.title, href: `/services/${service.slug}` },
        ])}
      />
      <JsonLd data={faq} />

      {/* Answer-first. The opening paragraph is written to be quoted verbatim
          by a search engine or an AI assistant, so it must stay self-contained. */}
      <section className="bg-carbon py-[var(--section-y)] pt-28 text-paper">
        <Container>
          <Reveal>
            <nav aria-label="Breadcrumb" className="eyebrow text-paper-muted">
              <Link href="/services" className="hover:text-accent">
                Services
              </Link>
            </nav>
            <h1 className="display mt-6 text-[clamp(2.5rem,9vw,5rem)]">{service.title}</h1>
            <p className="copy prose-measure mt-8 text-[1.15rem] text-paper">{service.answer}</p>
          </Reveal>
        </Container>
      </section>

      <Section tone="light">
        <div className="grid gap-14 md:grid-cols-2">
          <Reveal>
            <h2 className="display text-[clamp(1.5rem,4vw,2.25rem)]">What the engagement includes</h2>
            <ul className="copy mt-6 space-y-3 text-ink-muted">
              {service.includes.map((item) => (
                <li key={item} className="flex gap-3">
                  <span aria-hidden="true" className="mt-2 h-px w-4 shrink-0 bg-accent" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="display text-[clamp(1.5rem,4vw,2.25rem)]">What we report on</h2>
            <ul className="copy mt-6 space-y-3 text-ink-muted">
              {service.measures.map((item) => (
                <li key={item} className="flex gap-3">
                  <span aria-hidden="true" className="mt-2 h-px w-4 shrink-0 bg-accent" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="copy mt-8 text-sm text-ink-muted">
              These are the metrics, not the results. We publish a number only once a client
              has approved it for publication.
            </p>
          </Reveal>
        </div>
      </Section>

      <Section tone="raised">
        <Reveal>
          <h2 className="display text-[clamp(1.75rem,5vw,2.75rem)]">Questions we get asked</h2>
        </Reveal>
        <Reveal delay={60}>
          <Faq items={service.faqs} />
        </Reveal>
      </Section>

      <Section tone="dark">
        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <Reveal className="max-w-2xl">
            <h2 className="display text-[clamp(1.75rem,6vw,3.25rem)]">
              Want this run properly?
            </h2>
            <p className="copy prose-measure mt-6 text-paper-muted">
              Book a thirty-minute call. Bring your current numbers and we will tell you what
              we would change first.
            </p>
            <div className="mt-8">
              <Button href="/contact">Book a discovery call</Button>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <Link href={`/services/${next.slug}`} className="group block">
              <p className="eyebrow text-paper-muted">Next service</p>
              <p className="display mt-2 text-2xl group-hover:text-accent">{next.title}</p>
            </Link>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
