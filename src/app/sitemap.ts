import type { MetadataRoute } from "next";
import { caseStudies, isVisible } from "@/lib/case-studies";
import { listInsights } from "@/lib/insights";
import { services } from "@/lib/services";
import { site } from "@/lib/site";

/**
 * Only pages that are actually public appear here. A draft case study or
 * article is excluded, because listing a URL that returns 404 wastes crawl
 * budget and teaches a crawler to distrust the file.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages = [
    { path: "/", priority: 1 },
    { path: "/services", priority: 0.9 },
    { path: "/work", priority: 0.8 },
    { path: "/insights", priority: 0.8 },
    { path: "/network", priority: 0.6 },
    { path: "/about", priority: 0.6 },
    { path: "/contact", priority: 0.9 },
    { path: "/privacy", priority: 0.2 },
  ].map((p) => ({
    url: `${site.url}${p.path}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: p.priority,
  }));

  const servicePages = services.map((s) => ({
    url: `${site.url}/services/${s.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const workPages = caseStudies
    .filter((cs) => isVisible(cs) && cs.status === "live")
    .map((cs) => ({
      url: `${site.url}/work/${cs.slug}`,
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.7,
    }));

  const insightPages = listInsights()
    .filter((a) => !a.draft)
    .map((a) => ({
      url: `${site.url}/insights/${a.slug}`,
      lastModified: a.date ? new Date(a.date) : now,
      changeFrequency: "yearly" as const,
      priority: 0.7,
    }));

  return [...staticPages, ...servicePages, ...workPages, ...insightPages];
}
