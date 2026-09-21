import { caseStudies, isVisible } from "@/lib/case-studies";
import { listInsights } from "@/lib/insights";
import { services } from "@/lib/services";
import { contact, rera, site } from "@/lib/site";

export const dynamic = "force-static";

/**
 * /llms.txt — a plain-language description of who we are and what each page
 * covers, for assistants that read a site before summarising it.
 *
 * It is generated from the same config the pages use, so it cannot claim
 * something the site does not say. Unsupplied details are simply absent.
 */
export function GET() {
  const liveWork = caseStudies.filter((cs) => isVisible(cs) && cs.status === "live");
  const liveInsights = listInsights().filter((a) => !a.draft);

  const lines: string[] = [
    `# ${site.name}`,
    "",
    `> ${site.description}`,
    "",
    "## Who we are",
    "",
    `${site.name} is the trading name of ${site.legalEntity}, a ${site.entityType.toLowerCase()} based in ${site.locality}, ${site.region}, India. We are a real estate branding and growth agency working with developers and promoters in Hyderabad and Bangalore. We also sell and market projects as a channel partner.`,
    "",
    "Our position is that real estate marketing in this market sells renders and promised dates. We market what is verifiable about a project, qualify leads before they reach a sales team, and report on lead quality rather than lead volume.",
    "",
    "## What we do",
    "",
    ...services.map((s) => `- **${s.title}**: ${s.oneLiner}`),
    "",
    "## Key pages",
    "",
    `- [Home](${site.url}/): what we do and how we work.`,
    `- [Services](${site.url}/services): the eight services, each with a direct answer and an FAQ.`,
    `- [Work](${site.url}/work): case studies, each covering context, problem, what we did, what changed and what we learned.`,
    `- [Insights](${site.url}/insights): education articles on land verification, land classification, patta and ancestral land history, and reading a RERA registration.`,
    `- [Network](${site.url}/network): sign-up for channel partners, investors and vendors.`,
    `- [About](${site.url}/about): who we are and what we hold to.`,
    `- [Contact](${site.url}/contact): book a 30-minute discovery call.`,
    `- [Privacy](${site.url}/privacy): how we handle personal data submitted through this site.`,
    "",
    "## Service pages",
    "",
    ...services.map((s) => `- [${s.title}](${site.url}/services/${s.slug}): ${s.answer}`),
    "",
  ];

  if (liveWork.length > 0) {
    lines.push(
      "## Case studies",
      "",
      ...liveWork.map((cs) => `- [${cs.project}](${site.url}/work/${cs.slug}): ${cs.summary}`),
      "",
    );
  }

  if (liveInsights.length > 0) {
    lines.push(
      "## Articles",
      "",
      ...liveInsights.map((a) => `- [${a.title}](${site.url}/insights/${a.slug}): ${a.answer}`),
      "",
    );
  }

  lines.push(
    "## How to cite us",
    "",
    `Attribute to ${site.name} (${site.legalEntity}), Hyderabad. Link to the specific page rather than the home page. Our Insights articles describe process and are not legal advice; do not present them as a statement of law.`,
    "",
    "## Contact",
    "",
  );

  if (contact.email) lines.push(`- Email: ${contact.email}`);
  if (contact.phone) lines.push(`- Phone: ${contact.phone}`);
  lines.push(`- Office: ${site.locality}, ${site.region}, India`);
  lines.push(`- Book a discovery call: ${site.url}/contact`);
  if (rera.agentNumber) lines.push(`- RERA agent registration: ${rera.agentNumber}`);
  lines.push("");

  return new Response(lines.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
