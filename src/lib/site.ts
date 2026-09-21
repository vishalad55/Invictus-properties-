/**
 * Single source of truth for brand facts, contact details and flags.
 *
 * NOTHING in here may be invented. Every value that is not yet supplied is
 * left empty and the UI hides or placeholders the block. See LAUNCH_CHECKLIST.md.
 */

export const site = {
  name: "Invictus Properties",
  legalEntity: "Invictus Premium Properties",
  entityType: "Partnership",
  /** Only the locality is public until a full address is supplied. */
  locality: "Khanamet, Hyderabad",
  region: "Telangana",
  country: "IN",
  /** {{PROVIDE}} final domain. Used for canonicals, sitemap and OG URLs. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://invictusproperties.in",
  tagline: "Real estate marketing built on facts, not renders.",
  description:
    "Invictus Properties is a real estate branding and growth agency in Hyderabad. We build brands, run performance marketing and report lead quality honestly for developers in Hyderabad and Bangalore.",
} as const;

/**
 * Contact details are env-driven and deliberately empty by default.
 * The footer and contact page render nothing for a missing value.
 * {{PROVIDE}} phone, email, WhatsApp number, GSTIN, full address.
 */
export const contact = {
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "",
  phone: process.env.NEXT_PUBLIC_CONTACT_PHONE ?? "",
  /** Digits only, with country code, e.g. 9198xxxxxxxx. */
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "",
  gstin: process.env.NEXT_PUBLIC_GSTIN ?? "",
  addressLine: process.env.NEXT_PUBLIC_ADDRESS_LINE ?? "",
} as const;

/**
 * RERA agent registration.
 *
 * A channel partner who markets or sells projects for a promoter is generally
 * required to hold a RERA agent registration in the state where it operates,
 * and to state that number in its advertising. {{CONFIRM}} whether Invictus
 * holds a TS RERA (and, for Bangalore work, a K-RERA) agent registration
 * before launch. If we hold one, set the env var; if we do not, the number
 * must not be fabricated and channel-partner activity should not be advertised
 * until it is in place. This is a legal question for our own counsel — the site
 * states no legal position of its own.
 */
export const rera = {
  agentNumber: process.env.NEXT_PUBLIC_RERA_AGENT_NUMBER ?? "",
} as const;

export const socials = {
  /** {{PROVIDE}} verified profile URLs. Empty links are not rendered. */
  instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL ?? "",
  linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL ?? "",
  youtube: process.env.NEXT_PUBLIC_YOUTUBE_URL ?? "",
} as const;

export const nav = [
  { href: "/work", label: "Work" },
  { href: "/services", label: "Services" },
  { href: "/insights", label: "Insights" },
  { href: "/network", label: "Network" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

export const isProduction = process.env.NODE_ENV === "production";

/** Feature flags. Anything unproven stays off in production. */
export const flags = {
  /**
   * Shangrila Infracon case study. MUST stay false until written client
   * approval is on file. See src/lib/case-studies.ts for the display rules.
   */
  showShangrila: process.env.NEXT_PUBLIC_SHOW_SHANGRILA === "true",
  /** Client logo wall. Off until logos are supplied and cleared in writing. */
  showClientLogos: process.env.NEXT_PUBLIC_SHOW_CLIENT_LOGOS === "true",
  /** Team photos and bios. Off until headshots and bios are supplied. */
  showTeam: process.env.NEXT_PUBLIC_SHOW_TEAM === "true",
} as const;

export const analytics = {
  ga4: process.env.NEXT_PUBLIC_GA4_ID ?? "",
  metaPixel: process.env.NEXT_PUBLIC_META_PIXEL_ID ?? "",
} as const;

export function whatsappLink(message: string): string {
  if (!contact.whatsapp) return "";
  return `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(message)}`;
}
