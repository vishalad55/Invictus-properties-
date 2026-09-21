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

/**
 * An image we have not been supplied yet. Renders a labelled slot in dev and a
 * neutral block in production, so layout never collapses and no stock photo is
 * hotlinked in as a stand-in.
 */
export function ImageSlot({
  src,
  alt,
  className = "",
  priority = false,
}: {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
}) {
  const isDev = process.env.NODE_ENV !== "production";
  return (
    <div
      className={`relative overflow-hidden bg-carbon-raised ${className}`}
      role={isDev ? undefined : "presentation"}
    >
      {/* Real photography drops into /public/assets/images with this exact name.
          Until the file exists the slot below is what renders. */}
      <div className="absolute inset-0 grid place-items-center p-6 text-center">
        {isDev ? (
          <div className="max-w-md">
            <p className="eyebrow text-accent">Image slot</p>
            <p className="mt-2 font-mono text-xs break-all text-paper-muted">{src}</p>
            <p className="mt-2 text-xs text-paper-muted">alt: {alt}</p>
          </div>
        ) : (
          <div
            aria-hidden="true"
            className="h-full w-full bg-[linear-gradient(135deg,var(--carbon-raised),var(--carbon))]"
          />
        )}
      </div>
      {priority ? null : null}
    </div>
  );
}
