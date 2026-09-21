# Logo files

Supply the Invictus Properties mark (black handshake-and-skyscraper) here:

- `invictus-mark.svg` — the mark alone, square, on a transparent background.
- `invictus-wordmark.svg` — mark plus wordmark, horizontal lockup.
- `invictus-mark-light.svg` — a version that reads on the carbon background, if
  the black mark does not.

Until these land, `src/components/Logo.tsx` sets the wordmark in the display
face so the header is never empty. Once the files are here, point that component
at them.

An `.ai`, `.eps` or high-resolution `.png` is fine as a source; we will convert
it. SVG is what the site actually loads.
