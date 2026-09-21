import Link from "next/link";
import { Button } from "@/components/Button";
import { ImageSlot } from "@/components/ImageSlot";
import { Placeholder } from "@/components/Placeholder";
import { Reveal } from "@/components/Reveal";
import { Container, Section, SectionHead } from "@/components/Section";
import { caseStudies, featuredSlugs, isVisible } from "@/lib/case-studies";
import { listInsights } from "@/lib/insights";
import { homeServiceSlugs, services } from "@/lib/services";
import { flags } from "@/lib/site";

/* ---------------------------------------------------------------------------
   {{CONFIRM}} ALL HOME PAGE COPY.
   Every headline and paragraph below is a first draft. Read each one; these
   are the lines we will be judged on. Banned phrasing (redefining, elevated
   lifestyle, epitome of, world-class, cutting-edge, one-stop solution) is not
   used anywhere on this site.
--------------------------------------------------------------------------- */

const problems = [
  {
    // {{CONFIRM}}
    title: "Leads that never qualify",
    body: "A campaign optimised for volume delivers a spreadsheet of numbers that do not answer the phone. The cost per lead looks good and the cost per site visit is never calculated.",
  },
  {
    // {{CONFIRM}}
    title: "Promises the project cannot keep",
    body: "Renders shown as photographs, dates stated before approvals are in hand, particulars that do not match the RERA registration. Each one is a refund conversation waiting to happen.",
  },
  {
    // {{CONFIRM}}
    title: "Reports nobody trusts",
    body: "A monthly deck of impressions and reach, with no line connecting spend to bookings. When the sales head disputes a number, nobody can show the raw data behind it.",
  },
];

const steps = [
  {
    // {{CONFIRM}}
    n: "01",
    title: "Audit",
    body: "We read what you already have: campaign data, CRM, sales feedback, approvals and the competing projects in your micro-market. You get the findings whether or not you hire us.",
  },
  {
    n: "02",
    title: "Strategy",
    body: "Positioning, channel mix, budget and a qualification standard we agree on before a rupee is spent. Written down, so it can be checked later.",
  },
  {
    n: "03",
    title: "Execution",
    body: "Creative, campaigns, content and the sales systems behind them. One team, one calendar, one place where the leads land.",
  },
  {
    n: "04",
    title: "Reporting",
    body: "A live dashboard and a weekly review. Spend, qualified leads, site visits and bookings, tied to source. Bad weeks get reported in that week.",
  },
];

export default function HomePage() {
  const homeServices = homeServiceSlugs
    .map((slug) => services.find((s) => s.slug === slug))
    .filter((s): s is (typeof services)[number] => Boolean(s));

  const featured = featuredSlugs
    .map((slug) => caseStudies.find((cs) => cs.slug === slug))
    .filter((cs): cs is (typeof caseStudies)[number] => Boolean(cs) && isVisible(cs!));

  const insights = listInsights().slice(0, 3);

  /* A section with a heading and nothing under it reads as a broken page. In
     production, where drafts and unapproved figures are hidden, these two
     sections are dropped entirely rather than left standing empty. They still
     render in development so the placeholders are visible during review. */
  const isDev = process.env.NODE_ENV !== "production";
  const showWork = featured.length > 0 || isDev;
  const showInsights = insights.length > 0 || isDev;

  return (
    <>
      {/* 1. HERO ------------------------------------------------------- */}
      <section className="relative isolate flex min-h-[88svh] items-end overflow-hidden bg-carbon text-paper">
        {/* Full-bleed image slot. {{PROVIDE}} approved hero photography or a
            muted 8-second loop of a Hyderabad site at dawn. */}
        <ImageSlot
          src="/assets/images/home-hero.jpg"
          alt="Hyderabad skyline at dawn from a project site"
          fill
          priority
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-[linear-gradient(to_top,var(--carbon)_10%,rgba(11,12,16,0.72)_55%,rgba(11,12,16,0.5))]"
        />
        <Container className="py-20 pt-32">
          <Reveal>
            <p className="eyebrow text-accent">Real estate marketing · Hyderabad</p>
            {/* {{CONFIRM}} hero headline */}
            <h1 className="display mt-6 text-[clamp(2.75rem,10vw,6.5rem)]">
              We sell the
              <br />
              facts of a
              <br />
              <span className="text-accent">project.</span>
            </h1>
            {/* {{CONFIRM}} hero sub-line */}
            <p className="copy prose-measure mt-8 text-paper-muted">
              A branding and growth agency for developers in Hyderabad and Bangalore. We
              market what is on the ground, qualify every lead before it reaches your sales
              team, and report numbers you are free to challenge.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Button href="/contact">Book a discovery call</Button>
              <Button href="/work" variant="secondary">
                See the work
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* 2. THE PROBLEM ------------------------------------------------- */}
      <Section tone="light">
        <Reveal>
          <SectionHead
            eyebrow="The problem"
            title="Most property marketing sells a render"
            // {{CONFIRM}}
            lead="Hyderabad has no shortage of agencies that can spend a media budget. What is scarce is one that will tell a promoter which of those leads were worth the money."
          />
        </Reveal>
        <div className="mt-14 grid gap-px border border-offwhite-line bg-offwhite-line sm:grid-cols-3">
          {problems.map((p, i) => (
            <Reveal key={p.title} delay={i * 80} className="bg-offwhite p-8">
              <h3 className="display text-xl">{p.title}</h3>
              <p className="copy mt-4 text-ink-muted">{p.body}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* 3. WHAT WE DO -------------------------------------------------- */}
      <Section tone="dark">
        <Reveal>
          <SectionHead
            tone="dark"
            eyebrow="What we do"
            title="Eight services, one accountable team"
            // {{CONFIRM}}
            lead="Take the whole engagement or the part you are missing. Either way the reporting standard is the same."
          />
        </Reveal>
        <div className="mt-14 grid gap-px border border-carbon-line bg-carbon-line sm:grid-cols-2 lg:grid-cols-3">
          {homeServices.map((s, i) => (
            <Reveal key={s.slug} delay={i * 60} className="bg-carbon">
              <Link
                href={`/services/${s.slug}`}
                className="group block h-full p-8 transition-colors hover:bg-carbon-raised"
              >
                <h3 className="display text-lg group-hover:text-accent">{s.title}</h3>
                <p className="copy mt-3 text-paper-muted">{s.oneLiner}</p>
              </Link>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-10">
          <Button href="/services" variant="secondary">
            All services
          </Button>
        </Reveal>
      </Section>

      {/* 4. SELECTED WORK ----------------------------------------------- */}
      {showWork ? (
        <Section tone="light">
          <Reveal>
            <SectionHead
              eyebrow="Selected work"
              title="Projects, and what actually changed"
              // {{CONFIRM}}
              lead="Every figure on these pages is one the client has approved for publication. Where a number is missing, it is because we do not yet have permission to show it."
            />
          </Reveal>

          {featured.length === 0 ? (
            <Placeholder label="No case study is cleared for display in this environment.">
              Allure Avani and Urban Greens need client data. Shangrila Infracon needs written
              approval and SHOW_SHANGRILA=true.
            </Placeholder>
          ) : (
            <div className="mt-14 grid gap-8 md:grid-cols-3">
              {featured.map((cs, i) => (
                <Reveal key={cs.slug} delay={i * 80}>
                  <Link href={`/work/${cs.slug}`} className="group block">
                    <ImageSlot
                      src={cs.hero.src}
                      alt={cs.hero.alt}
                      className="aspect-[4/5] w-full"
                      sizes="(min-width: 768px) 33vw, 100vw"
                    />
                    <p className="eyebrow mt-5 text-ink-muted">{cs.location}</p>
                    <h3 className="display mt-2 text-xl group-hover:text-accent-strong">
                      {cs.project}
                    </h3>
                    <p className="copy mt-3 text-ink-muted">{cs.summary}</p>
                    {cs.status !== "live" ? (
                      <p className="eyebrow mt-4 text-accent-strong">Draft — not for production</p>
                    ) : null}
                  </Link>
                </Reveal>
              ))}
            </div>
          )}

          {!flags.showClientLogos ? (
            <Placeholder label="Client logo wall is switched off.">
              Only logos supplied and cleared in writing may appear. Set
              NEXT_PUBLIC_SHOW_CLIENT_LOGOS=true once we hold that permission.
            </Placeholder>
          ) : null}
        </Section>
      ) : null}

      {/* 5. HOW WE WORK -------------------------------------------------- */}
      <Section tone="raised">
        <Reveal>
          <SectionHead
            eyebrow="How we work"
            title="Four steps, in this order"
            // {{CONFIRM}}
            lead="No engagement starts with a campaign. It starts with reading what you already have."
          />
        </Reveal>
        <ol className="mt-14 grid gap-10 sm:grid-cols-2">
          {steps.map((s, i) => (
            <Reveal key={s.n} as="li" delay={i * 70} className="border-t border-ink/15 pt-6">
              <p className="display text-accent-strong text-3xl">{s.n}</p>
              <h3 className="display mt-3 text-xl">{s.title}</h3>
              <p className="copy prose-measure mt-3 text-ink-muted">{s.body}</p>
            </Reveal>
          ))}
        </ol>
      </Section>

      {/* 6. INSIGHTS PREVIEW --------------------------------------------- */}
      {showInsights ? (
        <Section tone="dark">
          <Reveal>
            <SectionHead
              tone="dark"
              eyebrow="Insights"
              title="What we know about land in this market"
              // {{CONFIRM}}
              lead="Zones, GOs, patta and ancestral history, ORR and Regional Ring Road exits, verification and registration. We publish the detail because it is the part buyers get wrong."
            />
          </Reveal>
          {insights.length === 0 ? (
            <Placeholder label="No published Insights articles yet." />
          ) : (
            <div className="mt-14 grid gap-px border border-carbon-line bg-carbon-line md:grid-cols-3">
              {insights.map((a, i) => (
                <Reveal key={a.slug} delay={i * 70} className="bg-carbon">
                  <Link
                    href={`/insights/${a.slug}`}
                    className="group flex h-full flex-col p-8 transition-colors hover:bg-carbon-raised"
                  >
                    <p className="eyebrow text-accent">{a.topic}</p>
                    <h3 className="display mt-3 text-lg group-hover:text-accent">{a.title}</h3>
                    <p className="copy mt-3 flex-1 text-paper-muted">{a.answer}</p>
                    <p className="mt-5 text-xs text-paper-muted">
                      {a.draft ? "Draft · " : null}
                      {a.readingMinutes} min read
                    </p>
                  </Link>
                </Reveal>
              ))}
            </div>
          )}
          <Reveal className="mt-10">
            <Button href="/insights" variant="secondary">
              All insights
            </Button>
          </Reveal>
        </Section>
      ) : null}

      {/* 7. CLOSING CTA --------------------------------------------------- */}
      <Section tone="light">
        <Reveal className="max-w-3xl">
          {/* {{CONFIRM}} closing copy */}
          <h2 className="display text-[clamp(2rem,7vw,4.25rem)]">
            Thirty minutes. Bring your numbers.
          </h2>
          <p className="copy prose-measure mt-6 text-ink-muted">
            A discovery call is a read of your current marketing, not a pitch. If the honest
            answer is that you do not need an agency yet, you will hear that on the call.
          </p>
          <div className="mt-10">
            <Button href="/contact">Book a discovery call</Button>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
