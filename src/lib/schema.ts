import { contact, rera, site } from "./site";
import { services } from "./services";

type Json = Record<string, unknown>;

const strip = (obj: Json): Json =>
  Object.fromEntries(
    Object.entries(obj).filter(([, v]) => v !== undefined && v !== null && v !== ""),
  );

export function organizationSchema(): Json {
  return strip({
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${site.url}/#organization`,
    name: site.name,
    legalName: site.legalEntity,
    url: site.url,
    description: site.description,
    email: contact.email || undefined,
    telephone: contact.phone || undefined,
    address: {
      "@type": "PostalAddress",
      addressLocality: site.locality,
      addressRegion: site.region,
      addressCountry: site.country,
    },
    // Identifiers are only emitted when supplied. Never fabricate a registration.
    identifier: rera.agentNumber
      ? { "@type": "PropertyValue", name: "RERA agent registration", value: rera.agentNumber }
      : undefined,
  });
}

export function professionalServiceSchema(): Json {
  return strip({
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${site.url}/#professionalservice`,
    name: site.name,
    url: site.url,
    description: site.description,
    parentOrganization: { "@id": `${site.url}/#organization` },
    areaServed: [
      { "@type": "City", name: "Hyderabad" },
      { "@type": "City", name: "Bangalore" },
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: site.locality,
      addressRegion: site.region,
      addressCountry: site.country,
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Real estate marketing services",
      itemListElement: services.map((s) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: s.title, url: `${site.url}/services/${s.slug}` },
      })),
    },
  });
}

export function serviceSchema(slug: string, name: string, description: string): Json {
  return strip({
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url: `${site.url}/services/${slug}`,
    serviceType: name,
    provider: { "@id": `${site.url}/#organization` },
    areaServed: [
      { "@type": "City", name: "Hyderabad" },
      { "@type": "City", name: "Bangalore" },
    ],
  });
}

export function faqSchema(faqs: { q: string; a: string }[]): Json | null {
  // A question whose answer is still a marker must not be published as an answer.
  const usable = faqs.filter((f) => !f.a.includes("{{"));
  if (usable.length === 0) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: usable.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function articleSchema(input: {
  title: string;
  description: string;
  slug: string;
  datePublished?: string;
  dateModified?: string;
}): Json {
  return strip({
    "@context": "https://schema.org",
    "@type": "Article",
    headline: input.title,
    description: input.description,
    url: `${site.url}/insights/${input.slug}`,
    mainEntityOfPage: `${site.url}/insights/${input.slug}`,
    datePublished: input.datePublished,
    dateModified: input.dateModified ?? input.datePublished,
    publisher: { "@id": `${site.url}/#organization` },
    author: { "@type": "Organization", name: site.name },
  });
}

export function breadcrumbSchema(trail: { name: string; href: string }[]): Json {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${site.url}${item.href}`,
    })),
  };
}
