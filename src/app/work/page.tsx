import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import Link from "next/link";
import { Button } from "@/components/Button";
import { JsonLd } from "@/components/JsonLd";
import { ImageSlot } from "@/components/ImageSlot";
import { Placeholder } from "@/components/Placeholder";
import { Reveal } from "@/components/Reveal";
import { Container, Section } from "@/components/Section";
import { caseStudies, isVisible } from "@/lib/case-studies";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = pageMetadata({
  title: "Work",
  description:
    "Case studies from Invictus Properties. Context, problem, what we did, what changed, what we learned. Figures appear only with client approval.",
  path: "/work",
});

export default function WorkPage() {
  const shown = caseStudies.filter(isVisible);

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", href: "/" },
          { name: "Work", href: "/work" },
        ])}
      />

      <section className="bg-carbon py-[var(--section-y)] pt-28 text-paper">
        <Container>
          <Reveal>
            <p className="eyebrow text-accent">Work</p>
            {/* {{CONFIRM}} */}
            <h1 className="display mt-6 text-[clamp(2.5rem,9vw,5.5rem)]">
              The work, and
              <br />
              what it changed
            </h1>
            <p className="copy prose-measure mt-8 text-paper-muted">
              Each case study follows the same five parts: context, problem, what we did, what
              changed, what we learned. Where a figure is missing, it is because the client has
              not cleared it for publication.
            </p>
          </Reveal>
        </Container>
      </section>

      <Section tone="light">
        {shown.length === 0 ? (
          <>
            {/* Honest empty state. Shown to a visitor when nothing is cleared
                for publication, so the page never reads as broken. */}
            <Reveal className="max-w-2xl">
              <h2 className="display text-[clamp(1.5rem,4vw,2.25rem)]">
                Nothing published here yet
              </h2>
              <p className="copy prose-measure mt-6 text-ink-muted">
                We publish a case study once the client has approved the figures in it, and not
                before. Until then, ask us on a call and we will take you through the work and
                the numbers directly.
              </p>
              <div className="mt-8">
                <Button href="/contact">Book a discovery call</Button>
              </div>
            </Reveal>
            <Placeholder label="No case study is cleared for display in this environment.">
              Supply client data for Allure Avani and Urban Greens, and written approval plus
              SHOW_SHANGRILA=true for Shangrila Infracon.
            </Placeholder>
          </>
        ) : (
          <div className="grid gap-12 md:grid-cols-2">
            {shown.map((cs, i) => (
              <Reveal key={cs.slug} delay={i * 70}>
                <Link href={`/work/${cs.slug}`} className="group block">
                  <ImageSlot
                    src={cs.hero.src}
                    alt={cs.hero.alt}
                    className="aspect-[3/2] w-full"
                    sizes="(min-width: 768px) 50vw, 100vw"
                  />
                  <div className="mt-6">
                    <p className="eyebrow text-ink-muted">
                      {cs.location} · {cs.sector}
                    </p>
                    <h2 className="display mt-3 text-[clamp(1.5rem,4vw,2.25rem)] group-hover:text-accent-strong">
                      {cs.project}
                    </h2>
                    <p className="copy mt-3 max-w-xl text-ink-muted">{cs.summary}</p>
                    {cs.status !== "live" ? (
                      <p className="eyebrow mt-4 text-accent-strong">
                        {cs.status === "draft" ? "Draft — not for production" : "Restricted"}
                      </p>
                    ) : null}
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        )}
      </Section>

      <Section tone="dark">
        <Reveal className="max-w-3xl">
          <h2 className="display text-[clamp(1.75rem,6vw,3.25rem)]">
            Your project could be the next one here
          </h2>
          <p className="copy prose-measure mt-6 text-paper-muted">
            Tell us what you are launching and where. We will tell you on the call whether we
            are the right team for it.
          </p>
          <div className="mt-10">
            <Button href="/contact">Book a discovery call</Button>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
