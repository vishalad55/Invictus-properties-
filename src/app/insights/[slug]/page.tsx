import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { Button } from "@/components/Button";
import { JsonLd } from "@/components/JsonLd";
import { Reveal } from "@/components/Reveal";
import { Container, Section } from "@/components/Section";
import { allInsightSlugs, getInsight, listInsights } from "@/lib/insights";
import { pageMetadata } from "@/lib/metadata";
import { articleSchema, breadcrumbSchema } from "@/lib/schema";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return allInsightSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getInsight(slug);
  if (!article) return {};
  return pageMetadata({
    title: article.title,
    description: article.description,
    path: `/insights/${article.slug}`,
    type: "article",
    publishedTime: article.date || undefined,
    // A draft is never indexed, whatever route it is reached by.
    noindex: article.draft,
  });
}

/**
 * Highlights an unresolved marker in the rendered article so a draft cannot be
 * mistaken for finished copy during review.
 */
function markMarkers(text: string) {
  const parts = text.split(/(\{\{[A-Z]+\}\})/g);
  return parts.map((part, i) =>
    /^\{\{[A-Z]+\}\}$/.test(part) ? (
      <mark key={i} className="bg-accent/30 px-1 font-semibold text-ink">
        {part}
      </mark>
    ) : (
      <span key={i}>{part}</span>
    ),
  );
}

const mdxComponents = {
  p: (props: { children?: React.ReactNode }) => (
    <p>{typeof props.children === "string" ? markMarkers(props.children) : props.children}</p>
  ),
  li: (props: { children?: React.ReactNode }) => (
    <li>{typeof props.children === "string" ? markMarkers(props.children) : props.children}</li>
  ),
};

export default async function InsightPage({ params }: Props) {
  const { slug } = await params;
  const article = getInsight(slug);
  if (!article) notFound();
  // Drafts are reviewable in development and gone in production.
  if (article.draft && process.env.NODE_ENV === "production") notFound();

  const more = listInsights()
    .filter((a) => a.slug !== article.slug)
    .slice(0, 2);

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", href: "/" },
          { name: "Insights", href: "/insights" },
          { name: article.title, href: `/insights/${article.slug}` },
        ])}
      />
      {/* Article schema is emitted only for a published article. */}
      {article.draft ? null : (
        <JsonLd
          data={articleSchema({
            title: article.title,
            description: article.description,
            slug: article.slug,
            datePublished: article.date || undefined,
          })}
        />
      )}

      <article>
        <section className="bg-carbon py-[var(--section-y)] pt-28 text-paper">
          <Container width="narrow">
            <Reveal>
              <nav aria-label="Breadcrumb" className="eyebrow text-paper-muted">
                <Link href="/insights" className="hover:text-accent">
                  Insights
                </Link>
              </nav>
              <div className="mt-6 flex flex-wrap items-center gap-4">
                <span className="eyebrow text-accent">{article.topic}</span>
                {article.draft ? (
                  <span className="eyebrow border border-accent px-2 py-1 text-accent">
                    Draft
                  </span>
                ) : null}
                <span className="text-xs text-paper-muted">{article.readingMinutes} min read</span>
              </div>
              <h1 className="display mt-6 text-[clamp(2.25rem,7vw,4rem)]">{article.title}</h1>
              {/* Answer first: two to three sentences a reader, a search engine
                  or an assistant can lift without needing the rest. */}
              <p className="copy mt-8 border-l-2 border-accent pl-5 text-[1.15rem]">
                {article.answer}
              </p>
            </Reveal>
          </Container>
        </section>

        {article.draft ? (
          <div className="bg-accent text-carbon">
            <Container width="narrow">
              <p className="py-4 text-sm font-semibold">
                Draft. Every {"{{VERIFY}}"} marker below must be checked against a source
                document before this article is published. Hidden in production.
              </p>
            </Container>
          </div>
        ) : null}

        <Section tone="light" width="narrow">
          <div className="copy">
            <MDXRemote
              source={article.body}
              components={mdxComponents}
              options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
            />
          </div>
        </Section>
      </article>

      <Section tone="dark">
        <div className="flex flex-col gap-12 md:flex-row md:items-end md:justify-between">
          <Reveal className="max-w-2xl">
            <h2 className="display text-[clamp(1.75rem,6vw,3rem)]">
              We market projects this carefully too
            </h2>
            <p className="copy prose-measure mt-6 text-paper-muted">
              If you are a developer and this is the standard you want applied to your
              marketing, book a call.
            </p>
            <div className="mt-8">
              <Button href="/contact">Book a discovery call</Button>
            </div>
          </Reveal>
          {more.length > 0 ? (
            <Reveal delay={80}>
              <p className="eyebrow text-paper-muted">Read next</p>
              <ul className="mt-3 space-y-3">
                {more.map((a) => (
                  <li key={a.slug}>
                    <Link
                      href={`/insights/${a.slug}`}
                      className="display text-lg hover:text-accent"
                    >
                      {a.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </Reveal>
          ) : null}
        </div>
      </Section>
    </>
  );
}
