import type { Metadata } from "next";
import { Button } from "@/components/Button";
import { JsonLd } from "@/components/JsonLd";
import { Placeholder } from "@/components/Placeholder";
import { Reveal } from "@/components/Reveal";
import { Container, Section } from "@/components/Section";
import { breadcrumbSchema } from "@/lib/schema";
import { flags, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Invictus Premium Properties is a real estate branding and growth agency based in Khanamet, Hyderabad, working with developers in Hyderabad and Bangalore.",
  alternates: { canonical: "/about" },
};

const beliefs = [
  {
    // {{CONFIRM}}
    title: "Facts before adjectives",
    body: "Survey numbers, approvals, zone, distance to the exit. A buyer who is given the facts early becomes a buyer who does not walk away late.",
  },
  {
    title: "Qualified before counted",
    body: "A lead that cannot buy is a cost, not an asset. We would rather report a smaller number and have it be real.",
  },
  {
    title: "Reporting you can audit",
    body: "If a number in our report looks wrong, ask, and we will show the raw data behind it in the same meeting.",
  },
  {
    title: "Only what the filing supports",
    body: "Advertised particulars match the RERA registration. If a claim is not in the filing, it does not go in the ad.",
  },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", href: "/" },
          { name: "About", href: "/about" },
        ])}
      />

      <section className="bg-carbon py-[var(--section-y)] pt-28 text-paper">
        <Container>
          <Reveal>
            <p className="eyebrow text-accent">About</p>
            {/* {{CONFIRM}} */}
            <h1 className="display mt-6 text-[clamp(2.5rem,9vw,5.5rem)]">
              A marketing
              <br />
              agency that
              <br />
              reads the file
            </h1>
            <p className="copy prose-measure mt-8 text-paper-muted">
              {site.legalEntity} is a {site.entityType.toLowerCase()} based in {site.locality}.
              We build brands and run growth for real estate developers, and we sell and market
              projects as a channel partner.
            </p>
          </Reveal>
        </Container>
      </section>

      <Section tone="light">
        <div className="grid gap-14 md:grid-cols-2">
          <Reveal>
            <h2 className="display text-[clamp(1.75rem,5vw,2.75rem)]">Why we started</h2>
            {/* {{CONFIRM}} — this is the founding story in draft. Replace it with
                the real one, or cut it. It must not describe history we cannot
                stand behind. */}
            <div className="copy prose-measure mt-6 space-y-5 text-ink-muted">
              <p>
                Property marketing in this city has settled into a pattern. Agencies compete on
                cost per lead, promoters compete on renders, and the sales team is handed a list
                of numbers that never wanted the project.
              </p>
              <p>
                We think the work is more useful the other way round. Establish what a project
                genuinely is, market that, and qualify hard enough that a site visit means
                something. It produces fewer leads and more bookings.
              </p>
              <p>
                The same discipline runs through the Insights we publish. Land near the Outer
                Ring Road carries questions of zone, classification, patta and ancestral history
                that decide whether a project can be built at all. Knowing those questions is
                part of marketing the answer.
              </p>
            </div>
          </Reveal>

          <Reveal delay={80}>
            <h2 className="display text-[clamp(1.75rem,5vw,2.75rem)]">What we hold to</h2>
            <ul className="mt-6 space-y-8">
              {beliefs.map((b) => (
                <li key={b.title}>
                  <h3 className="display text-lg">{b.title}</h3>
                  <p className="copy prose-measure mt-2 text-ink-muted">{b.body}</p>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Section>

      <Section tone="raised">
        <Reveal>
          <h2 className="display text-[clamp(1.75rem,5vw,2.75rem)]">The team</h2>
        </Reveal>
        {flags.showTeam ? (
          <Placeholder label="Team grid is switched on but no member data exists yet.">
            Add members to this page once headshots and bios are supplied.
          </Placeholder>
        ) : (
          <Placeholder label="Team section is switched off.">
            {"{{PROVIDE}}"} headshots and bios. No stock photography and no invented roles. Set
            NEXT_PUBLIC_SHOW_TEAM=true once the real material is in.
          </Placeholder>
        )}
      </Section>

      <Section tone="dark">
        <Reveal className="max-w-3xl">
          <h2 className="display text-[clamp(1.75rem,6vw,3.25rem)]">
            Talk to the people who do the work
          </h2>
          <p className="copy prose-measure mt-6 text-paper-muted">
            No account manager layer. The call is with whoever would run your project.
          </p>
          <div className="mt-10">
            <Button href="/contact">Book a discovery call</Button>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
