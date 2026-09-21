import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const CONTENT_DIR = path.join(process.cwd(), "src/content/insights");

export type Insight = {
  slug: string;
  title: string;
  /** The quotable 2-3 sentence answer that opens the article. */
  answer: string;
  description: string;
  topic: string;
  date: string;
  readingMinutes: number;
  /** Drafts are visible in development, hidden in production. */
  draft: boolean;
  body: string;
};

function readFile(slug: string): Insight | null {
  const file = path.join(CONTENT_DIR, `${slug}.mdx`);
  if (!fs.existsSync(file)) return null;
  const raw = fs.readFileSync(file, "utf8");
  const { data, content } = matter(raw);
  const words = content.split(/\s+/).filter(Boolean).length;
  return {
    slug,
    title: String(data.title ?? slug),
    answer: String(data.answer ?? ""),
    description: String(data.description ?? data.answer ?? ""),
    topic: String(data.topic ?? "Insight"),
    date: String(data.date ?? ""),
    readingMinutes: Math.max(1, Math.round(words / 200)),
    draft: data.draft !== false,
    body: content,
  };
}

export function allInsightSlugs(): string[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

export function getInsight(slug: string): Insight | null {
  return readFile(slug);
}

/** Newest first. Drafts are dropped in production builds. */
export function listInsights(): Insight[] {
  return allInsightSlugs()
    .map(readFile)
    .filter((a): a is Insight => a !== null)
    .filter((a) => (process.env.NODE_ENV === "production" ? !a.draft : true))
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}
