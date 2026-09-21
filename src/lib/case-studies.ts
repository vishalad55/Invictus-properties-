import { flags } from "./site";

/**
 * Case study template.
 *
 * Every case study is: context, problem, what we did, what changed, what we
 * learned. Figures, quotes and outcomes are placeholders until the client
 * supplies and approves them — see `outcomes` and the `status` field.
 */

export type Outcome = {
  label: string;
  /** Null until supplied and approved. Renders as a visible gap, never a guess. */
  value: string | null;
  note?: string;
};

export type CaseStudy = {
  slug: string;
  client: string;
  project: string;
  location: string;
  sector: string;
  /** Services applied, matching src/lib/services.ts slugs where possible. */
  scope: string[];
  /**
   * draft      — skeleton only, client data not supplied. Hidden in production.
   * restricted — content exists but needs written approval / flag. Hidden unless flagged.
   * live       — cleared for public display.
   */
  status: "draft" | "restricted" | "live";
  /** One line for the index card. */
  summary: string;
  context: string[];
  problem: string[];
  whatWeDid: string[];
  whatChanged: string[];
  whatWeLearned: string[];
  outcomes: Outcome[];
  /** Image slots. Files go in /public/assets/images. */
  hero: { src: string; alt: string };
  /** Hard display rules that must be honoured wherever this study appears. */
  displayRules?: string[];
  /** Client quote. Null until we hold it in writing. */
  quote: { text: string; attribution: string } | null;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "allure-avani",
    client: "Allure Avani",
    project: "Allure Avani",
    location: "North-East Bangalore",
    sector: "Luxury villas",
    scope: [
      "Marketing materials",
      "Meta Ads strategy",
      "HNI lead qualification",
      "Instant Form and WhatsApp flow",
      "Lead dashboard and CRM deduplication",
    ],
    status: "draft",
    summary:
      "A luxury villa project in North-East Bangalore where the work was qualification, not lead volume.",
    context: [
      "Luxury villa project in North-East Bangalore, sold to a high net worth buyer who compares a small set of projects carefully and slowly.",
      "{{PROVIDE}} project size, configuration, ticket band and launch stage. Do not publish price points without written approval.",
    ],
    problem: [
      "A high net worth buyer will not fill a long form and will not take a cold call from an unknown number.",
      "Volume-led campaigns were producing enquiries that the sales team could not separate from casual browsers.",
      "{{PROVIDE}} the specific numbers behind this. Until then this section stays qualitative.",
    ],
    whatWeDid: [
      "Built the marketing materials: project story, collateral and ad creative set.",
      "Structured the Meta Ads account around qualification rather than reach, with separate treatment for cold prospecting and retargeting.",
      "Designed an Instant Form that asks the qualifying questions early, so an unqualified lead self-selects out before it reaches the sales team.",
      "Routed qualified leads into a WhatsApp flow, so the first contact arrives on a channel an HNI buyer will actually answer.",
      "Built a lead dashboard and deduplicated the CRM, so the same buyer arriving through two sources stops counting twice.",
    ],
    whatChanged: [
      "{{CONFIRM}} before publishing any of this. No lead counts, cost per lead, site visit counts, booking numbers or price points appear on the live site until the client has approved them in writing.",
    ],
    whatWeLearned: [
      "Qualification questions asked before the form is submitted cost some volume and return the time back to the sales team.",
      "Deduplication changes the reported cost per lead, usually upward. Say so before the first report, not after.",
      "{{PROVIDE}} the lesson the client would agree with. This section should be honest enough to be uncomfortable.",
    ],
    outcomes: [
      { label: "Cost per qualified lead", value: null, note: "{{PROVIDE}}" },
      { label: "Lead to site visit rate", value: null, note: "{{PROVIDE}}" },
      { label: "Duplicate leads removed", value: null, note: "{{PROVIDE}}" },
    ],
    hero: {
      src: "/assets/images/work-allure-avani-hero.jpg",
      alt: "{{PROVIDE}} approved photography of the Allure Avani project",
    },
    displayRules: [
      "{{CONFIRM}} with the client before showing any lead numbers or price points.",
    ],
    quote: null,
  },
  {
    slug: "urban-greens",
    client: "Urban Greens",
    project: "Urban Greens",
    location: "{{PROVIDE}} location",
    sector: "{{PROVIDE}} sector",
    scope: ["{{PROVIDE}} scope"],
    status: "draft",
    summary: "{{PROVIDE}} scope, location and results before this page is published.",
    context: ["{{PROVIDE}} project context: location, sector, stage, buyer."],
    problem: ["{{PROVIDE}} the problem the client came to us with."],
    whatWeDid: ["{{PROVIDE}} the work actually delivered."],
    whatChanged: ["{{PROVIDE}} outcomes, with the client's approval to publish them."],
    whatWeLearned: ["{{PROVIDE}} what we would do differently."],
    outcomes: [],
    hero: {
      src: "/assets/images/work-urban-greens-hero.jpg",
      alt: "{{PROVIDE}} approved photography of the Urban Greens project",
    },
    quote: null,
  },
  {
    slug: "shangrila-infracon",
    client: "Shangrila Infracon",
    project: "Shangrila Infracon",
    location: "Hyderabad",
    sector: "Residential",
    scope: ["{{PROVIDE}} the retained scope, as the client agrees to describe it"],
    status: "restricted",
    summary:
      "Retained client. This page is behind a flag and does not appear until written approval is on file.",
    context: [
      "Retained engagement with a Hyderabad developer working across ongoing, completed and upcoming projects.",
      "{{PROVIDE}} the context the client is willing to have described in public.",
    ],
    problem: ["{{PROVIDE}} the problem, in language the client has approved."],
    whatWeDid: ["{{PROVIDE}} the retained scope, as the client agrees to describe it."],
    whatChanged: [
      "{{CONFIRM}} — nothing is published here without written client approval.",
    ],
    whatWeLearned: ["{{PROVIDE}}"],
    outcomes: [],
    hero: {
      src: "/assets/images/work-shangrila-hero.jpg",
      alt: "{{PROVIDE}} client-approved photography",
    },
    displayRules: [
      "Written client approval is required before this appears anywhere on the live site. Until then SHOW_SHANGRILA stays false.",
      "Never state or imply that Shangrila is part of, or continues, any other Bollineni-named company.",
      "Never show any project completion date or delivery promise.",
      "Never show project counts. Say 'ongoing, completed and upcoming projects'.",
      "Any advertised project particulars must match the RERA registration. If unsure, leave them out.",
    ],
    quote: null,
  },
];

/** Studies visible in the current environment. */
export function visibleCaseStudies(): CaseStudy[] {
  return caseStudies.filter((cs) => isVisible(cs));
}

export function isVisible(cs: CaseStudy): boolean {
  if (cs.slug === "shangrila-infracon" && !flags.showShangrila) return false;
  // Drafts are visible in development so we can review them, hidden in production.
  if (cs.status === "draft") return process.env.NODE_ENV !== "production";
  return true;
}

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((cs) => cs.slug === slug);
}

/** Order used for the home page "Selected work" section. */
export const featuredSlugs = ["allure-avani", "urban-greens", "shangrila-infracon"];
