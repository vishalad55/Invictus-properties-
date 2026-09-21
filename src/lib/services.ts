export type Faq = { q: string; a: string };

export type Service = {
  slug: string;
  title: string;
  /** One line for the home grid. */
  oneLiner: string;
  /**
   * The quotable answer. 2-3 sentences, direct, no preamble. This is what a
   * search engine or an assistant should be able to lift verbatim.
   */
  answer: string;
  /** What the engagement actually contains. Plain nouns, no adjectives. */
  includes: string[];
  /** What we report on. Named metrics only — no invented numbers. */
  measures: string[];
  faqs: Faq[];
};

/* {{CONFIRM}} — all service copy below is a first draft written by Claude.
   Read every answer line: it is what we will be quoted on. */

export const services: Service[] = [
  {
    slug: "brand-strategy",
    title: "Brand strategy",
    oneLiner: "Positioning, name, identity and the story a project can defend.",
    answer:
      "Brand strategy for a real estate project decides what the project claims, who it claims it to, and what evidence backs the claim. Invictus builds positioning from the land, the approvals and the buyer, not from mood boards. The output is a positioning line, a naming and identity system, and a message hierarchy your sales team can repeat without embellishing.",
    includes: [
      "Market and competitor read for the micro-market",
      "Buyer segments and the objection each one raises",
      "Positioning statement and message hierarchy",
      "Name, logo and identity system, or a refresh of an existing one",
      "Brand guideline and asset kit for site, print and digital",
    ],
    measures: [
      "Message recall in sales calls",
      "Share of qualified enquiries citing the positioning",
      "Consistency audit across channels",
    ],
    faqs: [
      {
        q: "Do you rebrand an existing project mid-launch?",
        a: "Yes, when the current positioning is costing lead quality. We audit first and tell you if a rebrand is not the fix.",
      },
      {
        q: "Who owns the identity files?",
        a: "You do. Source files are handed over at the end of the engagement.",
      },
      {
        q: "How long does a brand engagement take?",
        a: "{{CONFIRM}} typical timeline before publishing. State a real range from our own delivery history, not an industry average.",
      },
    ],
  },
  {
    slug: "performance-marketing",
    title: "Performance marketing",
    oneLiner: "Meta and Google campaigns judged on qualified leads, not clicks.",
    answer:
      "Performance marketing for real estate works when the campaign is built around lead qualification, not lead volume. Invictus runs Meta and Google campaigns with qualification built into the form, the follow-up and the reporting, so the cost you track is cost per qualified site visit rather than cost per lead. Budgets, creatives and audiences are reviewed on a fixed weekly cycle.",
    includes: [
      "Campaign architecture across Meta and Google",
      "Creative testing plan and production cadence",
      "Instant Form and landing page qualification flows",
      "WhatsApp qualification and routing to the sales team",
      "Budget pacing and weekly optimisation",
    ],
    measures: [
      "Cost per qualified lead",
      "Lead to site visit rate",
      "Site visit to booking rate",
      "Duplicate and junk lead share",
    ],
    faqs: [
      {
        q: "What budget do you need to start?",
        a: "{{CONFIRM}} minimum monthly media budget we will take on. Do not publish a number until we have agreed it.",
      },
      {
        q: "Do you guarantee a lead count?",
        a: "No. Anyone guaranteeing a lead count is guaranteeing volume, and volume is the easy part. We commit to a qualification standard and report against it.",
      },
      {
        q: "Who holds the ad accounts?",
        a: "You do. We work inside your Business Manager and Google Ads account so the data and the audiences stay yours.",
      },
    ],
  },
  {
    slug: "content-and-social",
    title: "Content and social",
    oneLiner: "Project films, site updates and a social calendar that keeps pace.",
    answer:
      "Content for a real estate project has one job: show what is actually on the ground. Invictus plans and produces site progress films, walkthroughs, location explainers and social posts on a fixed calendar, so buyers see construction reality rather than only renders. Every asset is reusable across ads, sales decks and WhatsApp follow-up.",
    includes: [
      "Monthly content calendar per project",
      "Site progress shoots and edit",
      "Location, connectivity and approval explainers",
      "Short-form video for Instagram and YouTube",
      "Community management and response guidelines",
    ],
    measures: [
      "Content published against calendar",
      "Saves, shares and profile visits",
      "Assets reused in paid campaigns",
    ],
    faqs: [
      {
        q: "Do you shoot on site?",
        a: "Yes. Site progress content is shot on a scheduled cycle so buyers can track the build.",
      },
      {
        q: "Can we use renders at all?",
        a: "Yes, labelled as renders. A render presented as a photograph is the fastest way to lose a buyer's trust.",
      },
    ],
  },
  {
    slug: "search-and-ai-visibility",
    title: "Search and AI visibility",
    oneLiner: "Rank in search, and get quoted correctly by AI assistants.",
    answer:
      "Search and AI visibility means being findable in Google and being summarised accurately by assistants like ChatGPT, Gemini and AI Overviews. Invictus structures your site so each page opens with a direct, quotable answer, marks it up with schema, and publishes the supporting detail an assistant needs to cite you. This site is built the same way, so you can see the method before you buy it.",
    includes: [
      "Technical SEO audit and fixes",
      "Answer-first page structure and FAQ schema",
      "Schema.org markup for organisation, service, article and FAQ",
      "An llms.txt file and clean crawl paths for AI crawlers",
      "Local search and Google Business Profile for the sales gallery",
    ],
    measures: [
      "Non-branded impressions and clicks",
      "Queries where the site is cited in AI answers",
      "Indexed pages and crawl errors",
    ],
    faqs: [
      {
        q: "What is AEO?",
        a: "Answer Engine Optimisation: structuring content so an AI assistant can lift a correct, attributable answer from it. It does not replace SEO, it sits on top of it.",
      },
      {
        q: "Can you guarantee a first page ranking?",
        a: "No. We commit to the work and report the movement.",
      },
      {
        q: "How long before search work shows?",
        a: "{{CONFIRM}} the range we state, based on our own projects rather than a generic three-to-six-months claim.",
      },
    ],
  },
  {
    slug: "pr-and-influence",
    title: "PR and influence",
    oneLiner: "Earned coverage and creator partnerships that survive scrutiny.",
    answer:
      "PR for a developer is credibility, not column inches. Invictus builds a story the press can verify, places it with property and business media, and works with creators whose audience actually buys in your micro-market. Every claim we place is one we can evidence, because a retracted claim costs more than the coverage was worth.",
    includes: [
      "Story development and press material",
      "Media relations across property and business press",
      "Creator and micro-influencer partnerships with disclosure",
      "Launch and milestone announcements",
      "Issue response guidance",
    ],
    measures: [
      "Placements and their audience quality",
      "Branded search lift after coverage",
      "Referral traffic and enquiries from earned media",
    ],
    faqs: [
      {
        q: "Do you buy coverage?",
        a: "Paid placements are labelled as paid. We will tell you which is which on every invoice.",
      },
      {
        q: "Do creators have to disclose?",
        a: "Yes. Partnerships are disclosed as advertising. Undisclosed promotion is a compliance risk we will not take with your brand.",
      },
    ],
  },
  {
    slug: "nri-marketing",
    title: "NRI marketing",
    oneLiner: "Reach buyers in the Gulf, the US and Singapore, in their timezone.",
    answer:
      "NRI buyers need the same facts as local buyers plus answers on repatriation, power of attorney and remote registration. Invictus runs geo-targeted campaigns, timezone-aware follow-up and a document-led sales flow so an overseas buyer can progress without flying in. Calls, site visits by video and paperwork are sequenced around the buyer's working week.",
    includes: [
      "Geo-targeted Meta and Google campaigns by corridor",
      "Timezone-aware call and WhatsApp routing",
      "Video site visits and remote documentation flow",
      "Content answering repatriation, PoA and tax questions",
      "Diaspora community and event partnerships",
    ],
    measures: [
      "Qualified NRI enquiries by corridor",
      "Video site visit completion rate",
      "Time from enquiry to token",
    ],
    faqs: [
      {
        q: "Which markets do you cover?",
        a: "{{CONFIRM}} the corridors we actually have delivery experience in before listing them. Do not list markets we have not worked.",
      },
      {
        q: "Do you advise on NRI taxation or FEMA rules?",
        a: "No. We market the project and sequence the paperwork. Tax and foreign exchange questions go to the buyer's own chartered accountant or legal adviser.",
      },
    ],
  },
  {
    slug: "sales-enablement",
    title: "Sales enablement",
    oneLiner: "CRM, scripts, dashboards and a follow-up cycle that holds.",
    answer:
      "Most real estate leads are lost in follow-up, not in acquisition. Invictus sets up the CRM, deduplicates incoming leads, writes the qualification script and builds the dashboard your sales head checks each morning. The result is a single view of every enquiry and a follow-up cadence that does not depend on who remembered to call.",
    includes: [
      "CRM setup, stages and lead routing",
      "Deduplication across sources",
      "Qualification script and objection handling",
      "Site visit booking and reminder flow",
      "Sales dashboard and weekly review format",
    ],
    measures: [
      "Response time to a new lead",
      "Follow-up completion rate",
      "Stage conversion from enquiry to booking",
    ],
    faqs: [
      {
        q: "Which CRM do you work with?",
        a: "{{CONFIRM}} the CRMs we support. Name only the ones we have configured before.",
      },
      {
        q: "Do you take over our sales calls?",
        a: "No. Your team sells. We build the system around them and train on it.",
      },
    ],
  },
  {
    slug: "reporting",
    title: "Reporting",
    oneLiner: "One dashboard, one weekly review, numbers you can challenge.",
    answer:
      "A marketing report is only useful if the person reading it can act on it and audit it. Invictus reports on a fixed weekly cycle with a live dashboard covering spend, qualified leads, site visits and bookings, tied back to source. Where a number looks wrong, we show the raw data behind it rather than restating the summary.",
    includes: [
      "Live dashboard across paid, organic and offline sources",
      "Weekly review with actions, not a slide read-out",
      "Lead quality audit against your own sales feedback",
      "Monthly spend reconciliation",
      "Quarterly plan reset",
    ],
    measures: [
      "Spend against plan",
      "Cost per qualified lead by source",
      "Pipeline movement week on week",
    ],
    faqs: [
      {
        q: "Do we get access to the dashboard?",
        a: "Yes, directly. It is not a PDF we email you once a month.",
      },
      {
        q: "What happens when the numbers are bad?",
        a: "You hear it in that week's review, with what we are changing. A bad week reported late becomes a bad quarter.",
      },
    ],
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

/** The six shown on the home grid. The full list lives on /services. */
export const homeServiceSlugs = [
  "brand-strategy",
  "performance-marketing",
  "content-and-social",
  "search-and-ai-visibility",
  "nri-marketing",
  "reporting",
] as const;
