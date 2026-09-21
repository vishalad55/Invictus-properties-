import fs from "node:fs";
import path from "node:path";
import Image from "next/image";

/**
 * A photography slot.
 *
 * If the file has been supplied in /public, it renders through next/image with
 * the right sizes, formats and lazy loading. If it has not, it renders a
 * labelled slot in development and a neutral block in production. Layout never
 * collapses, and no stock photo is ever hotlinked in as a stand-in.
 *
 * Server component: the existence check runs at build time.
 */
export function ImageSlot({
  src,
  alt,
  className = "",
  priority = false,
  sizes = "100vw",
  fill = false,
}: {
  src: string;
  alt: string;
  className?: string;
  /** Set on the one above-the-fold image per page, and nowhere else. */
  priority?: boolean;
  sizes?: string;
  /**
   * Cover the nearest positioned ancestor, for full-bleed hero backgrounds.
   *
   * The positioning has to be decided here rather than passed in through
   * className: two Tailwind position utilities on one element are resolved by
   * stylesheet order, not by the order they are written, so a caller asking for
   * `absolute` cannot reliably beat a `relative` set on the same element.
   */
  fill?: boolean;
}) {
  const exists = fileExists(src);
  const isDev = process.env.NODE_ENV !== "production";
  const position = fill ? "absolute inset-0 -z-10 h-full w-full" : "relative";

  if (exists) {
    return (
      <div className={`${position} overflow-hidden bg-carbon-raised ${className}`}>
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          loading={priority ? undefined : "lazy"}
          className="object-cover"
        />
      </div>
    );
  }

  return (
    <div className={`${position} overflow-hidden bg-carbon-raised ${className}`}>
      {isDev ? (
        <div className="absolute inset-0 grid place-items-center p-6 text-center">
          <div className="max-w-md">
            <p className="eyebrow text-accent">Image slot — file not supplied</p>
            <p className="mt-2 font-mono text-xs break-all text-paper-muted">{src}</p>
            <p className="mt-2 text-xs text-paper-muted">alt: {alt}</p>
          </div>
        </div>
      ) : (
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(135deg,var(--carbon-raised),var(--carbon))]"
        />
      )}
    </div>
  );
}

function fileExists(publicPath: string): boolean {
  try {
    return fs.existsSync(path.join(process.cwd(), "public", publicPath));
  } catch {
    return false;
  }
}
