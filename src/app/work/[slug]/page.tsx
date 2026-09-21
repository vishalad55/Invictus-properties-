import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/Button";
import { JsonLd } from "@/components/JsonLd";
import { ImageSlot } from "@/components/ImageSlot";
import { Placeholder } from "@/components/Placeholder";
import { Reveal } from "@/components/Reveal";
import { Container, Section } from "@/components/Section";
import { caseStudies, getCaseStudy, isVisible, type CaseStudy } from "@/lib/case-studies";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbSchema } from "@/lib/schema";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return caseStudies.map((cs) => ({ slug: cs.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  if (!cs) return {};
  return pageMetadata({
    title: cs.project,
    description: cs.summary,
    path: `/work/${cs.slug}`,
    // A draft or restricted study must never be indexed, even if someone
    // reaches the URL directly.
    noindex: cs.status !== "live",
  });
}

/** One of the five template sections. */
function Chapter({
  n,
  title,
  items,
}: {
  n: string;
  title: string;
  items: string[];
}) {
  return (
    <Reveal as="section" className="border-t border-offwhite-line pt-8">
      <p className="display text-accent-strong text-2xl">{n}</p>
      <h2 className="display mt-3 text-[clamp(1.5rem,4vw,2.25rem)]">{title}</h2>
      <div className="copy prose-measure mt-6 space-y-5 text-ink-muted">
        {items.map((item) =>
          item.includes("{{") ? (
            <Placeholder key={item} label="Content not supplied or not approved">
              {item}
            </Placeholder>
          ) : (
            <p key={item}>{item}</p>
          ),
        )}
      </div>
    </Reveal>
  );
}

function Outcomes({ cs }: { cs: CaseStudy }) {
  const approved = cs.outcomes.filter((o) => o.value !== null);
  if (approved.length === 0) {
    return (
      <Placeholder label="No outcome figures are approved for publication.">
        Numbers appear here only once the client has confirmed them in writing. Until then the
        block is hidden in production rather than filled with an estimate.
      </Placeholder>
    );
  }
  return (
    <dl className="grid gap-px border border-offwhite-line bg-offwhite-line sm:grid-cols-3">
      {approved.map((o) => (
        <div key={o.label} className="bg-offwhite p-8">
          <dt className="eyebrow text-ink-muted">{o.label}</dt>
          <dd className="display mt-4 text-4xl text-accent-strong">{o.value}</dd>
        </div>
      ))}
    </dl>
  );
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  if (!cs) notFound();
  // Hidden studies 404 rather than render. This is what keeps Shangrila off the
  // live site until SHOW_SHANGRILA is set and approval is on file.
  if (!isVisible(cs)) notFound();

  const others = caseStudies.filter((c) => c.slug !== cs.slug && isVisible(c));

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", href: "/" },
          { name: "Work", href: "/work" },
          { name: cs.project, href: `/work/${cs.slug}` },
        ])}
      />

      <section className="relative isolate flex min-h-[70svh] items-end overflow-hidden bg-carbon text-paper">
        <ImageSlot
          src={cs.hero.src}
          alt={cs.hero.alt}
          className="absolute inset-0 -z-10 h-full w-full"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-[linear-gradient(to_top,var(--carbon)_12%,rgba(11,12,16,0.7)_60%,rgba(11,12,16,0.45))]"
        />
        <Container className="py-16 pt-32">
          <Reveal>
            <nav aria-label="Breadcrumb" className="eyebrow text-paper-muted">
              <Link href="/work" className="hover:text-accent">
                Work
              </Link>
            </nav>
            <h1 className="display mt-6 text-[clamp(2.5rem,9vw,5rem)]">{cs.project}</h1>
            <p className="copy prose-measure mt-6 text-paper-muted">{cs.summary}</p>
            <dl className="mt-10 flex flex-wrap gap-x-12 gap-y-6">
              <div>
                <dt className="eyebrow text-paper-muted">Location</dt>
                <dd className="mt-2 font-semibold">{cs.location}</dd>
              </div>
              <div>
                <dt className="eyebrow text-paper-muted">Sector</dt>
                <dd className="mt-2 font-semibold">{cs.sector}</dd>
              </div>
              <div className="min-w-56">
                <dt className="eyebrow text-paper-muted">Scope</dt>
                <dd className="mt-2 font-semibold">{cs.scope.join(" · ")}</dd>
              </div>
            </dl>
          </Reveal>
        </Container>
      </section>

      {cs.status !== "live" ? (
        <div className="bg-accent text-carbon">
          <Container>
            <p className="py-4 text-sm font-semibold">
              {cs.status === "draft"
                ? "Draft case study. Client data is not supplied yet, so this page is hidden in production."
                : "Restricted case study. This page is behind a feature flag and requires written client approval before it may appear on the live site."}
            </p>
          </Container>
        </div>
      ) : null}

      {cs.displayRules && cs.displayRules.length > 0 ? (
        <Section tone="light" width="narrow">
          <Placeholder label="Display rules for this case study — mandatory">
            <ul className="list-disc space-y-2 pl-5">
              {cs.displayRules.map((r) => (
                <li key={r}>{r}</li>
              ))}
            </ul>
          </Placeholder>
        </Section>
      ) : null}

      {/* The reusable template: five parts, always in this order. */}
      <Section tone="light" width="narrow">
        <div className="space-y-16">
          <Chapter n="01" title="Context" items={cs.context} />
          <Chapter n="02" title="The problem" items={cs.problem} />
          <Chapter n="03" title="What we did" items={cs.whatWeDid} />
          <Chapter n="04" title="What changed" items={cs.whatChanged} />
        </div>
      </Section>

      <Section tone="raised">
        <Reveal>
          <h2 className="display text-[clamp(1.5rem,4vw,2.25rem)]">The numbers</h2>
          <p className="copy prose-measure mt-4 text-ink-muted">
            Published only with the client&apos;s written approval.
          </p>
        </Reveal>
        <Reveal delay={60} className="mt-10">
          <Outcomes cs={cs} />
        </Reveal>

        {cs.quote ? (
          <Reveal delay={100} className="mt-14">
            <blockquote className="display max-w-3xl text-[clamp(1.25rem,3.5vw,2rem)] leading-tight">
              &ldquo;{cs.quote.text}&rdquo;
            </blockquote>
            <p className="eyebrow mt-6 text-ink-muted">{cs.quote.attribution}</p>
          </Reveal>
        ) : (
          <div className="mt-14">
            <Placeholder label="No client quote on file.">
              A testimonial appears only when we hold it in writing from the client. We do not
              write quotes on a client&apos;s behalf.
            </Placeholder>
          </div>
        )}
      </Section>

      <Section tone="light" width="narrow">
        <Chapter n="05" title="What we learned" items={cs.whatWeLearned} />
      </Section>

      <Section tone="dark">
        <div className="flex flex-col gap-12 md:flex-row md:items-end md:justify-between">
          <Reveal className="max-w-2xl">
            <h2 className="display text-[clamp(1.75rem,6vw,3.25rem)]">
              Same problem, different project?
            </h2>
            <p className="copy prose-measure mt-6 text-paper-muted">
              Book a call and bring the campaign data you already have.
            </p>
            <div className="mt-8">
              <Button href="/contact">Book a discovery call</Button>
            </div>
          </Reveal>
          {others.length > 0 ? (
            <Reveal delay={80}>
              <p className="eyebrow text-paper-muted">More work</p>
              <ul className="mt-3 space-y-2">
                {others.map((o) => (
                  <li key={o.slug}>
                    <Link href={`/work/${o.slug}`} className="display text-xl hover:text-accent">
                      {o.project}
                    </Link>
                  </li>
                ))}
              </ul>
            </Reveal>
          ) : null}
        </div>
      </Section>
    </>
  );
}
