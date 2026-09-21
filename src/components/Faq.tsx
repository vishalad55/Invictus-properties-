import { Placeholder } from "./Placeholder";

/**
 * FAQ block. An answer still carrying a {{CONFIRM}} or {{PROVIDE}} marker is
 * never rendered as an answer — it shows as a placeholder in development and
 * disappears in production, so the site cannot publish an unapproved claim.
 */
export function Faq({
  items,
  tone = "light",
}: {
  items: { q: string; a: string }[];
  tone?: "light" | "dark";
}) {
  const muted = tone === "dark" ? "text-paper-muted" : "text-ink-muted";
  const line = tone === "dark" ? "border-carbon-line" : "border-offwhite-line";

  return (
    <dl className="mt-10 divide-y divide-current/10">
      {items.map((item) => {
        const unresolved = item.a.includes("{{");
        return (
          <div key={item.q} className={`border-t py-6 ${line}`}>
            <dt className="display text-lg">{item.q}</dt>
            <dd className={`copy mt-3 ${muted}`}>
              {unresolved ? (
                <Placeholder label="Answer not approved yet">{item.a}</Placeholder>
              ) : (
                item.a
              )}
            </dd>
          </div>
        );
      })}
    </dl>
  );
}
