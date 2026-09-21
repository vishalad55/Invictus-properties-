import type { Metadata } from "next";
import { site } from "./site";

/**
 * Page metadata.
 *
 * Next shallow-merges the `openGraph` key, so a page that sets it must set the
 * whole object. This helper keeps every page canonical to itself and stops the
 * root layout's URL leaking onto child pages.
 */
export function pageMetadata(input: {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
  publishedTime?: string;
  noindex?: boolean;
}): Metadata {
  const ogType = input.type ?? "website";
  return {
    title: input.title,
    description: input.description,
    alternates: { canonical: input.path },
    robots: input.noindex ? { index: false, follow: false } : undefined,
    openGraph: {
      type: ogType,
      siteName: site.name,
      locale: "en_IN",
      url: input.path,
      title: `${input.title} — ${site.name}`,
      description: input.description,
      images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: site.name }],
      ...(ogType === "article" && input.publishedTime
        ? { publishedTime: input.publishedTime }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: `${input.title} — ${site.name}`,
      description: input.description,
    },
  };
}
