import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = `${site.name} — real estate marketing in Hyderabad`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Default Open Graph card. Generated rather than uploaded, so it never drifts
 * out of date with the brand. Typography is intentionally simple: the OG
 * renderer does not have the display face available.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0b0c10",
          color: "#f3f4f6",
          padding: 80,
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 28,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: "#b8975a",
          }}
        >
          Invictus Properties
        </div>
        <div
          style={{
            fontSize: 82,
            lineHeight: 1.05,
            fontWeight: 800,
            textTransform: "uppercase",
            maxWidth: 900,
          }}
        >
          We sell the facts of a project
        </div>
        <div style={{ fontSize: 30, color: "#a6abb8" }}>
          Real estate branding and growth · Hyderabad
        </div>
      </div>
    ),
    size,
  );
}
