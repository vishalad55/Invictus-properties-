import type { Metadata } from "next";
import { DiscoveryCallForm } from "@/components/DiscoveryCallForm";
import { JsonLd } from "@/components/JsonLd";
import { Placeholder } from "@/components/Placeholder";
import { Reveal } from "@/components/Reveal";
import { Container, Section } from "@/components/Section";
import { breadcrumbSchema, faqSchema } from "@/lib/schema";
import { contact, site, whatsappLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Book a discovery call",
  description:
    "Book a 30-minute discovery call with Invictus Properties. Bring your current campaign numbers and we will tell you what we would change first.",
  alternates: { canonical: "/contact" },
};

const faqs = [
  {
    q: "What happens on the call?",
    a: "Thirty minutes. You describe the project and what is not working. We ask for your current numbers and tell you what we would change first. There is no deck.",
  },
  {
    q: "Is it free?",
    a: "Yes. The call costs you half an hour. A paid audit only follows if you want one.",
  },
  {
    q: "Do you work outside Hyderabad?",
    a: "We work with developers in Hyderabad and Bangalore. For another city, ask on the call and we will tell you honestly whether we know the market.",
  },
  {
    q: "What do you need from us beforehand?",
    a: "Nothing formal. If you have campaign data or CRM exports to hand, the call is more useful.",
  },
];

export default function ContactPage() {
  const wa = whatsappLink("Hi Invictus, I'd like to book a discovery call about a project.");

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", href: "/" },
          { name: "Contact", href: "/contact" },
        ])}
      />
      <JsonLd data={faqSchema(faqs)} />

      <section className="bg-carbon pb-[var(--section-y)] pt-28 text-paper">
        <Container>
          <div className="grid gap-16 lg:grid-cols-[1fr_1.15fr]">
            <Reveal>
              <p className="eyebrow text-accent">Contact</p>
              {/* {{CONFIRM}} */}
              <h1 className="display mt-6 text-[clamp(2.5rem,8vw,4.5rem)]">
                Book a
                <br />
                discovery call
              </h1>
              <p className="copy prose-measure mt-8 text-paper-muted">
                Thirty minutes with the people who would actually run your account. Bring your
                current numbers. If we are not the right agency for your project, you will hear
                that on the call rather than after an invoice.
              </p>

              <div className="mt-12 space-y-6 text-sm">
                {wa ? (
                  <a
                    href={wa}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-12 items-center border border-paper-muted px-6 font-semibold uppercase tracking-[0.12em]"
                  >
                    Message us on WhatsApp
                  </a>
                ) : (
                  <Placeholder label="WhatsApp number not supplied.">
                    Set NEXT_PUBLIC_WHATSAPP_NUMBER to switch on the WhatsApp button and the
                    prefilled message after form submission.
                  </Placeholder>
                )}

                <dl className="space-y-4 text-paper-muted">
                  {contact.email ? (
                    <div>
                      <dt className="eyebrow">Email</dt>
                      <dd className="mt-1">
                        <a href={`mailto:${contact.email}`} className="hover:text-accent">
                          {contact.email}
                        </a>
                      </dd>
                    </div>
                  ) : null}
                  {contact.phone ? (
                    <div>
                      <dt className="eyebrow">Phone</dt>
                      <dd className="mt-1">
                        <a
                          href={`tel:${contact.phone.replace(/\s/g, "")}`}
                          className="hover:text-accent"
                        >
                          {contact.phone}
                        </a>
                      </dd>
                    </div>
                  ) : null}
                  <div>
                    <dt className="eyebrow">Office</dt>
                    <dd className="mt-1">
                      {site.locality}, {site.region}
                    </dd>
                  </div>
                </dl>

                {!contact.email && !contact.phone ? (
                  <Placeholder label="No public email or phone supplied.">
                    Nothing is shown until NEXT_PUBLIC_CONTACT_EMAIL and
                    NEXT_PUBLIC_CONTACT_PHONE are set. The form still works.
                  </Placeholder>
                ) : null}
              </div>
            </Reveal>

            <Reveal delay={80} className="bg-carbon-raised p-6 sm:p-10">
              <h2 className="display text-xl">Tell us about the project</h2>
              <p className="copy mt-3 text-sm text-paper-muted">
                We reply within one working day.
              </p>
              <div className="mt-8">
                <DiscoveryCallForm />
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <Section tone="light">
        <Reveal>
          <h2 className="display text-[clamp(1.75rem,5vw,2.75rem)]">Before you book</h2>
        </Reveal>
        <dl className="mt-10 divide-y divide-offwhite-line">
          {faqs.map((f) => (
            <Reveal key={f.q} className="border-t border-offwhite-line py-6">
              <dt className="display text-lg">{f.q}</dt>
              <dd className="copy prose-measure mt-3 text-ink-muted">{f.a}</dd>
            </Reveal>
          ))}
        </dl>
      </Section>
    </>
  );
}
