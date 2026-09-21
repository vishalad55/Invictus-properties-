import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { Placeholder } from "@/components/Placeholder";
import { Reveal } from "@/components/Reveal";
import { Container, Section } from "@/components/Section";
import { listInsights } from "@/lib/insights";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = pageMetadata({
  title: "Insights",
  description:
    "Land zones, Government Orders, patta and ancestral land history, ORR and Regional Ring Road exits, legal verification and registration, explained for buyers and developers.",
  path: "/insights",
});

export default function InsightsPage() {
  const articles = listInsights();

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", href: "/" },
          { name: "Insights", href: "/insights" },
        ])}
      />

      <section className="bg-carbon py-[var(--section-y)] pt-28 text-paper">
        <Container>
          <Reveal>
            <p className="eyebrow text-accent">Insights</p>
            {/* {{CONFIRM}} */}
            <h1 className="display mt-6 text-[clamp(2.5rem,9vw,5.5rem)]">
              The part of a
              <br />
              deal nobody
              <br />
              explains
            </h1>
            <p className="copy prose-measure mt-8 text-paper-muted">
              Land classification and Government Orders. Patta and ancestral land history. ORR
              and Regional Ring Road exits. Verification, litigation and registration. We write
              these because the questions come up on every project we market.
            </p>
            <p className="copy prose-measure mt-6 text-sm text-paper-muted">
              These articles explain process. They are not legal advice, and we check every
              specific against a source document before publishing it.
            </p>
          </Reveal>
        </Container>
      </section>

      <Section tone="light">
        {articles.length === 0 ? (
          <>
            {/* Honest empty state rather than a blank page. */}
            <Reveal className="max-w-2xl">
              <h2 className="display text-[clamp(1.5rem,4vw,2.25rem)]">
                The first articles are being checked
              </h2>
              <p className="copy prose-measure mt-6 text-ink-muted">
                These pieces cover land classification, patta and ancestral land history, and
                reading a RERA registration. Every specific in them is checked against a source
                document before we publish, because a wrong detail here costs a reader money.
              </p>
            </Reveal>
            <Placeholder label="No Insights article has cleared its verification checks yet.">
              All three starter articles are drafts. They are visible in development and hidden
              in production until every {"{{VERIFY}}"} marker has been checked against a source
              document.
            </Placeholder>
          </>
        ) : (
          <ol className="divide-y divide-offwhite-line">
            {articles.map((a, i) => (
              <Reveal key={a.slug} as="li" delay={i * 50}>
                <Link href={`/insights/${a.slug}`} className="group block py-10">
                  <div className="flex flex-wrap items-center gap-4">
                    <span className="eyebrow text-accent-strong">{a.topic}</span>
                    {a.draft ? (
                      <span className="eyebrow border border-accent px-2 py-1 text-accent-strong">
                        Draft
                      </span>
                    ) : null}
                    <span className="text-xs text-ink-muted">{a.readingMinutes} min read</span>
                  </div>
                  <h2 className="display mt-4 text-[clamp(1.5rem,4.5vw,2.5rem)] group-hover:text-accent-strong">
                    {a.title}
                  </h2>
                  <p className="copy prose-measure mt-4 text-ink-muted">{a.answer}</p>
                </Link>
              </Reveal>
            ))}
          </ol>
        )}
      </Section>
    </>
  );
}
