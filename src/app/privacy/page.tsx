import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { Placeholder } from "@/components/Placeholder";
import { Container, Section } from "@/components/Section";
import { contact, site } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Privacy policy",
  description:
    "How Invictus Properties handles the personal data submitted through this website.",
  path: "/privacy",
});

/**
 * {{CONFIRM}} THE WHOLE OF THIS PAGE WITH OUR OWN LEGAL ADVISER.
 *
 * Drafted with India's Digital Personal Data Protection Act, 2023 in mind, and
 * written to describe only what this site actually does. It has not been
 * reviewed by a lawyer and states no legal conclusions. Do not publish it as
 * final until it has been checked, and until the grievance contact details
 * below are supplied.
 */
export default function PrivacyPage() {
  /* Set NEXT_PUBLIC_PRIVACY_UPDATED once this text has been reviewed by our
     adviser. Until then the page states plainly that it is not final rather
     than showing a review date we cannot stand behind. */
  const reviewed = process.env.NEXT_PUBLIC_PRIVACY_UPDATED ?? "";

  return (
    <>
      <section className="bg-carbon pb-16 pt-28 text-paper">
        <Container width="narrow">
          <p className="eyebrow text-accent">Legal</p>
          <h1 className="display mt-6 text-[clamp(2.25rem,7vw,3.75rem)]">Privacy policy</h1>
          <p className="copy mt-6 text-paper-muted">
            {reviewed ? `Last reviewed: ${reviewed}` : "Draft. Not yet reviewed by our legal adviser."}
          </p>
        </Container>
      </section>

      <Section tone="light" width="narrow">
        <Placeholder label="Draft legal text — needs review by our own adviser">
          This page describes what the site does today. The wording, and whether it is
          sufficient under the Digital Personal Data Protection Act, 2023, must be confirmed by
          a lawyer before launch. Supply the grievance officer name and contact details, and
          confirm the retention period stated below.
        </Placeholder>

        <div className="copy mt-10">
          <h2>Who we are</h2>
          <p>
            {site.legalEntity} ({site.entityType}), {site.locality}, {site.region}, India. In
            this policy, &ldquo;we&rdquo; means {site.legalEntity}, trading as {site.name}.
          </p>

          <h2>What we collect</h2>
          <p>We collect personal data in two places on this site, both of them forms.</p>
          <ul>
            <li>
              <strong>Discovery call form:</strong> your name, company, email address, phone
              number if you give one, project type, city, budget range and your message.
            </li>
            <li>
              <strong>Network form:</strong> your name, role, city, email address, phone number
              if you give one, and your note.
            </li>
          </ul>
          <p>
            We do not ask for identity documents, financial details or any sensitive category of
            personal data through this website. Please do not send them to us through these
            forms.
          </p>

          <h2>Why we use it</h2>
          <p>
            To reply to you about the enquiry you submitted, and to have the conversation you
            asked for. We do not use these details for unrelated marketing, and we do not sell,
            rent or trade them.
          </p>

          <h2>How it is handled</h2>
          <p>
            A form submission is sent to us by email and is not written to any database on this
            site. It then sits in our email system and, if the conversation continues, in our
            customer records. If you choose to continue on WhatsApp, that conversation is
            handled by WhatsApp under its own terms.
          </p>

          <h2>How long we keep it</h2>
          <Placeholder label="Retention period not confirmed">
            {"{{CONFIRM}}"} the actual retention period we will honour, and confirm it is one we
            can operationally meet. Do not publish a period we do not follow. This block is
            hidden in production until the period is set, so no unkept promise is published.
          </Placeholder>

          <h2>Analytics and cookies</h2>
          <p>
            This site uses Google Analytics 4 and the Meta Pixel to measure how the site
            performs. Neither loads until you accept them in the banner shown on your first
            visit. If you decline, they are not loaded and no analytics cookie or identifier is
            set. Your choice is stored in your own browser, and you can change it by clearing
            this site&apos;s data in your browser settings.
          </p>
          <p>
            Where analytics are accepted, those services process data under their own privacy
            terms and may transfer it outside India.
          </p>

          <h2>Who else sees your data</h2>
          <p>
            Our email provider, which delivers the notification message. Our analytics
            providers, only if you accepted analytics. Hosting is provided by Vercel, which
            processes request data in order to serve the site. We do not share your enquiry with
            a developer or any other client unless you have asked us to introduce you.
          </p>

          <h2>Your choices</h2>
          <p>
            You can ask us what personal data of yours we hold, ask us to correct it, or ask us
            to erase it. You can withdraw your consent to analytics at any time using the
            method described above. To make any of these requests, write to us.
          </p>

          <h2>Grievance contact</h2>
          {contact.email ? (
            <p>
              Write to <a href={`mailto:${contact.email}`}>{contact.email}</a>, marking your
              message for the attention of the grievance officer.
            </p>
          ) : (
            <Placeholder label="Grievance contact not supplied">
              {"{{PROVIDE}}"} the name and contact address of the person who will answer data
              requests. A privacy policy without a working contact route is not usable.
            </Placeholder>
          )}

          <h2>Changes</h2>
          <p>
            If we change how this site handles personal data, we will update this page and the
            review date at the top.
          </p>
        </div>
      </Section>
    </>
  );
}
