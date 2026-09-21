import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";

const base =
  "inline-flex min-h-12 items-center justify-center gap-2 px-6 py-3 text-sm font-semibold uppercase tracking-[0.12em] transition-colors duration-200";

const variants: Record<Variant, string> = {
  primary: "bg-accent text-carbon hover:bg-[color-mix(in_srgb,var(--accent)_82%,white)]",
  secondary:
    "border border-current text-current hover:bg-current/10",
  ghost: "text-current underline underline-offset-4 hover:text-accent",
};

export function Button({
  href,
  children,
  variant = "primary",
  className = "",
  external = false,
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
  external?: boolean;
}) {
  const classes = `${base} ${variants[variant]} ${className}`;
  if (external) {
    return (
      <a href={href} className={classes} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
