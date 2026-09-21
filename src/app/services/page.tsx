import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import Link from "next/link";
import { Button } from "@/components/Button";
import { JsonLd } from "@/components/JsonLd";
import { Reveal } from "@/components/Reveal";
import { Container, Section } from "@/components/Section";
import { breadcrumbSchema } from "@/lib/schema";
import { services } from "@/lib/services";

export const metadata: Metadata = pageMetadata({
  title: "Services",
  description:
    "Brand strategy, performance marketing, content, search and AI visibility, PR, NRI marketing, sales enablement and reporting for real estate developers in Hyderabad and Bangalore.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", href: "/" },
          { name: "Services", href: "/services" },
        ])}
      />

      <section className="bg-carbon py-[var(--section-y)] pt-28 text-paper">
        <Container>
          <Reveal>
            <p className="eyebrow text-accent">Services</p>
            {/* {{CONFIRM}} */}
            <h1 className="display mt-6 text-[clamp(2.5rem,9vw,5.5rem)]">
              Everything a project
              <br />
              needs to sell honestly
            </h1>
            <p className="copy prose-measure mt-8 text-paper-muted">
              Eight services. Take the full engagement or the one piece you are missing. The
              reporting standard does not change either way.
            </p>
          </Reveal>
        </Container>
      </section>

      <Section tone="light">
        <ol className="divide-y divide-offwhite-line">
          {services.map((s, i) => (
            <Reveal key={s.slug} as="li" delay={i * 40}>
              <Link
                href={`/services/${s.slug}`}
                className="group grid gap-4 py-10 md:grid-cols-[6rem_1fr_auto] md:items-baseline"
              >
                <span className="display text-accent-strong text-2xl">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span>
                  <span className="display block text-[clamp(1.5rem,4vw,2.25rem)] group-hover:text-accent-strong">
                    {s.title}
                  </span>
                  <span className="copy mt-3 block max-w-2xl text-ink-muted">{s.oneLiner}</span>
                </span>
                <span className="eyebrow text-ink-muted group-hover:text-accent-strong">
                  Read
                </span>
              </Link>
            </Reveal>
          ))}
        </ol>
      </Section>

      <Section tone="dark">
        <Reveal className="max-w-3xl">
          <h2 className="display text-[clamp(1.75rem,6vw,3.5rem)]">
            Not sure which of these you need?
          </h2>
          <p className="copy prose-measure mt-6 text-paper-muted">
            That is what the audit is for. Book a call and we will tell you where the money is
            leaking before we quote for anything.
          </p>
          <div className="mt-10">
            <Button href="/contact">Book a discovery call</Button>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
