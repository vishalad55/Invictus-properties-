import type { ElementType, ReactNode } from "react";

type Tone = "dark" | "light" | "raised";

const toneClass: Record<Tone, string> = {
  dark: "bg-carbon text-paper",
  light: "bg-offwhite text-ink",
  raised: "bg-offwhite-raised text-ink",
};

export function Container({
  children,
  className = "",
  width = "default",
}: {
  children: ReactNode;
  className?: string;
  width?: "default" | "narrow" | "wide";
}) {
  const max =
    width === "narrow" ? "max-w-3xl" : width === "wide" ? "max-w-[92rem]" : "max-w-6xl";
  return (
    <div className={`mx-auto w-full ${max} px-[var(--gutter)] ${className}`}>{children}</div>
  );
}

export function Section({
  children,
  tone = "light",
  as: Tag = "section",
  className = "",
  id,
  width,
}: {
  children: ReactNode;
  tone?: Tone;
  as?: ElementType;
  className?: string;
  id?: string;
  width?: "default" | "narrow" | "wide";
}) {
  return (
    <Tag id={id} className={`${toneClass[tone]} py-[var(--section-y)] ${className}`}>
      <Container width={width}>{children}</Container>
    </Tag>
  );
}

/** Section label plus heading. One idea per section. */
export function SectionHead({
  eyebrow,
  title,
  lead,
  tone = "light",
  className = "",
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  tone?: Tone;
  className?: string;
}) {
  const muted = tone === "dark" ? "text-paper-muted" : "text-ink-muted";
  return (
    <div className={`max-w-3xl ${className}`}>
      {eyebrow ? <p className={`eyebrow ${muted} mb-4`}>{eyebrow}</p> : null}
      <h2 className="display text-[clamp(2rem,6vw,3.75rem)]">{title}</h2>
      {lead ? <p className={`copy prose-measure mt-6 ${muted}`}>{lead}</p> : null}
    </div>
  );
}
