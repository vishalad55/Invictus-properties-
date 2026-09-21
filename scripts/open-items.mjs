#!/usr/bin/env node
/**
 * Lists every {{CONFIRM}}, {{PROVIDE}} and {{VERIFY}} still open in the source.
 *
 * LAUNCH_CHECKLIST.md is the written version of this. Run `npm run open-items`
 * to see the live count, and do not launch while anything in the blocking
 * section of the checklist is still listed here.
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const ROOTS = ["src", "public"];
const SKIP = new Set(["node_modules", ".next", ".git"]);
const MARKER = /\{\{(CONFIRM|PROVIDE|VERIFY)\}\}/g;

const counts = { CONFIRM: 0, PROVIDE: 0, VERIFY: 0 };
const hits = [];

function walk(dir) {
  for (const entry of readdirSync(dir)) {
    if (SKIP.has(entry)) continue;
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      walk(full);
      continue;
    }
    if (!/\.(tsx?|mdx?|css|json)$/.test(entry)) continue;
    const lines = readFileSync(full, "utf8").split("\n");
    lines.forEach((line, i) => {
      for (const match of line.matchAll(MARKER)) {
        counts[match[1]] += 1;
        hits.push({
          file: relative(process.cwd(), full),
          line: i + 1,
          kind: match[1],
          text: line.trim().slice(0, 120),
        });
      }
    });
  }
}

for (const root of ROOTS) {
  try {
    walk(root);
  } catch {
    // Root missing is not an error; there is simply nothing to scan.
  }
}

for (const kind of ["CONFIRM", "PROVIDE", "VERIFY"]) {
  const group = hits.filter((h) => h.kind === kind);
  console.log(`\n${kind} — ${group.length} open\n`);
  for (const h of group) console.log(`  ${h.file}:${h.line}\n    ${h.text}`);
}

console.log(
  `\nTotal: ${counts.CONFIRM} CONFIRM, ${counts.PROVIDE} PROVIDE, ${counts.VERIFY} VERIFY\n`,
);
