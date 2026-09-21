import type { ReactNode } from "react";

/**
 * A proof point we do not yet hold.
 *
 * In development it renders loudly so it cannot be forgotten. In production it
 * renders nothing at all, so the live site never shows an invented number, a
 * fake testimonial or an empty promise.
 */
export function Placeholder({
  label,
  children,
}: {
  label: string;
  children?: ReactNode;
}) {
  if (process.env.NODE_ENV === "production") return null;
  return (
    <div
      data-placeholder
      className="my-4 border-2 border-dashed border-accent/70 bg-accent/10 p-4 text-sm text-current"
    >
      <p className="eyebrow mb-2 text-accent-strong">Placeholder — not for production</p>
      <p className="font-semibold">{label}</p>
      {children ? <div className="mt-2 opacity-80">{children}</div> : null}
    </div>
  );
}
