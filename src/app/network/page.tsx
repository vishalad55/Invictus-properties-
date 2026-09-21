import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { JsonLd } from "@/components/JsonLd";
import { NetworkForm } from "@/components/NetworkForm";
import { Reveal } from "@/components/Reveal";
import { Container, Section } from "@/components/Section";
import { breadcrumbSchema } from "@/lib/schema";
import { rera } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Network",
  description:
    "Channel partners, investors and vendors working with Invictus Properties in Hyderabad and Bangalore. Tell us your role and city.",
  path: "/network",
});

const roles = [
  {
    // {{CONFIRM}}
    title: "Channel partners",
    body: "You sell projects and want inventory worth your time, with marketing support that does not leave you explaining a render. We work with partners on projects we market and on projects we sell as a channel partner ourselves.",
  },
  {
    title: "Investors",
    body: "You want early sight of projects in Hyderabad and around the ORR and Regional Ring Road corridors. We share what we know about the land and the approvals, including the parts that are unresolved.",
  },
  {
    title: "Vendors",
    body: "Photographers, film crews, 3D studios, printers, event teams and media buyers. If you are good and you deliver on date, we want you on the list.",
  },
];

export default function NetworkPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", href: "/" },
          { name: "Network", href: "/network" },
        ])}
      />

      <section className="bg-carbon py-[var(--section-y)] pt-28 text-paper">
        <Container>
          <Reveal>
            <p className="eyebrow text-accent">Network</p>
            {/* {{CONFIRM}} */}
            <h1 className="display mt-6 text-[clamp(2.5rem,9vw,5.5rem)]">
              Work with
              <br />
              us on the
              <br />
              sell side
            </h1>
            <p className="copy prose-measure mt-8 text-paper-muted">
              Alongside the agency work we sell and market projects as a channel partner. That
              means a network of partners, investors and vendors we actually call, rather than a
              mailing list.
            </p>
          </Reveal>
        </Container>
      </section>

      <Section tone="light">
        <div className="grid gap-px border border-offwhite-line bg-offwhite-line md:grid-cols-3">
          {roles.map((r, i) => (
            <Reveal key={r.title} delay={i * 70} className="bg-offwhite p-8">
              <h2 className="display text-xl">{r.title}</h2>
              <p className="copy mt-4 text-ink-muted">{r.body}</p>
            </Reveal>
          ))}
        </div>

        {/* A channel partner marketing or selling projects generally needs a RERA
            agent registration, and must state it. We show ours or we show nothing. */}
        <Reveal className="mt-12 max-w-3xl">
          <p className="copy text-sm text-ink-muted">
            {rera.agentNumber ? (
              <>
                Invictus Premium Properties holds RERA agent registration{" "}
                <strong>{rera.agentNumber}</strong>.
              </>
            ) : (
              <>
                Where a project requires it, work is carried out under the applicable RERA
                registrations held by us or by the promoter. Ask us for the registration
                covering any specific project before you act on anything we send you.
              </>
            )}
          </p>
        </Reveal>
      </Section>

      <Section tone="raised">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.1fr]">
          <Reveal>
            <h2 className="display text-[clamp(1.75rem,5vw,3rem)]">Tell us who you are</h2>
            <p className="copy prose-measure mt-6 text-ink-muted">
              Role, city and a line about what you work on. We contact you when something fits,
              and not otherwise.
            </p>
          </Reveal>
          <Reveal delay={80}>
            <NetworkForm />
          </Reveal>
        </div>
      </Section>
    </>
  );
}
