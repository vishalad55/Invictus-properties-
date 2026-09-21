import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { Container, Section } from "@/components/Section";

export const metadata: Metadata = pageMetadata({
  title: "Brand review",
  description:
    "Internal page for reviewing accent colour options and the type scale.",
  path: "/brand",
  noindex: true,
});

/**
 * {{CONFIRM}} ACCENT.
 *
 * Three options, shown on both the dark and light surfaces they will actually
 * appear on. Pick one, then set --accent and --accent-strong in
 * src/styles/tokens.css. Nothing else in the codebase needs to change.
 *
 * Electric lime is deliberately absent: that palette belongs to Shangrila.
 */
const options = [
  {
    key: "A",
    name: "Warm gold (default)",
    value: "#b8975a",
    onLight: "#7a6026",
    note: "Reads as premium without tipping into the gold-and-marble look every luxury project in the city already uses. Holds up on photography.",
  },
  {
    key: "B",
    name: "Deep brass",
    value: "#c98a3f",
    onLight: "#8a5a1c",
    note: "Warmer and louder. Stronger on a small mobile button, closer to the amber several competitors use.",
  },
  {
    key: "C",
    name: "Slate blue",
    value: "#6f86a8",
    onLight: "#3f5573",
    note: "Cool and more corporate. Reads institutional rather than premium, and puts more distance between us and the usual property palette.",
  },
];

export default function BrandPage() {
  return (
    <>
      <section className="bg-carbon pb-16 pt-28 text-paper">
        <Container>
          <p className="eyebrow text-accent">Internal</p>
          <h1 className="display mt-6 text-[clamp(2.25rem,7vw,3.75rem)]">Brand review</h1>
          <p className="copy prose-measure mt-6 text-paper-muted">
            Accent options and the type scale. Not linked from the site navigation and not
            indexed. Pick an accent and it changes in one file.
          </p>
        </Container>
      </section>

      <Section tone="dark">
        <h2 className="display text-2xl">Accent options on carbon</h2>
        <div className="mt-8 grid gap-8 md:grid-cols-3">
          {options.map((o) => (
            <div key={o.key} className="border border-carbon-line p-6">
              <div className="h-24 w-full" style={{ background: o.value }} />
              <p className="eyebrow mt-5" style={{ color: o.value }}>
                Option {o.key}
              </p>
              <h3 className="display mt-2 text-lg">{o.name}</h3>
              <p className="mt-2 font-mono text-xs text-paper-muted">{o.value}</p>
              <p className="copy mt-4 text-sm text-paper-muted">{o.note}</p>
              <button
                type="button"
                className="mt-6 min-h-12 w-full px-5 text-sm font-semibold uppercase tracking-[0.12em] text-carbon"
                style={{ background: o.value }}
              >
                Book a call
              </button>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="light">
        <h2 className="display text-2xl">The same options on off-white</h2>
        <p className="copy prose-measure mt-4 text-ink-muted">
          Accent text on a light background uses a darker variant so contrast stays above the
          WCAG AA threshold. Both values are set together in tokens.css.
        </p>
        <div className="mt-8 grid gap-8 md:grid-cols-3">
          {options.map((o) => (
            <div key={o.key} className="border border-offwhite-line p-6">
              <p className="eyebrow" style={{ color: o.onLight }}>
                Option {o.key} — {o.name}
              </p>
              <p className="display mt-4 text-3xl" style={{ color: o.onLight }}>
                42 projects
              </p>
              <p className="copy mt-4 text-sm text-ink-muted">
                Body copy beside the accent, so you can judge it against the text it will sit
                next to rather than on its own.
              </p>
              <p className="mt-4 font-mono text-xs text-ink-muted">
                on dark {o.value} · on light {o.onLight}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="raised">
        <h2 className="display text-2xl">Type scale</h2>
        <div className="mt-10 space-y-8">
          <p className="display text-[clamp(2.75rem,10vw,6.5rem)]">Display, hero</p>
          <p className="display text-[clamp(2rem,6vw,3.75rem)]">Display, section heading</p>
          <p className="display text-xl">Display, card heading</p>
          <p className="eyebrow text-ink-muted">Eyebrow · uppercase · tracked</p>
          <p className="copy prose-measure text-ink-muted">
            Body copy is set in Inter at a comfortable reading measure. The display face is
            Archivo Black, loaded from Google Fonts and self-hosted at build time, with Arial
            Black as the fallback so a slow connection never shows an unstyled headline.
          </p>
        </div>
      </Section>
    </>
  );
}
