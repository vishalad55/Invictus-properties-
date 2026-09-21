# Invictus Properties — website

Marketing site for Invictus Properties (Invictus Premium Properties), a real
estate branding and growth agency in Khanamet, Hyderabad.

The site has one conversion: a developer books a 30-minute discovery call.
Its secondary goal is channel partners, investors and vendors joining the
network list.

## Stack

- Next.js (App Router) with TypeScript
- Tailwind CSS v4, with all brand tokens in `src/styles/tokens.css`
- Insights articles in MDX, rendered with `next-mdx-remote`
- Two serverless routes for the forms, everything else prerendered
- Deploy target: Vercel

## Running it

```bash
npm install
cp .env.example .env.local   # fill in what you have; empty values stay hidden
npm run dev                  # http://localhost:3000
npm run build && npm start   # production behaviour, including hidden drafts
```

Development and production deliberately differ. Drafts, unapproved figures and
missing assets render as loud placeholders in development and are hidden or
return 404 in production. To see what the public would see, run a production
build.

## The rule this codebase is built around

Nothing is invented. There are no placeholder testimonials, no logo wall, no
"X+ projects" counters, no years-in-business claim, no team photos and no
contact details that have not been supplied.

Where a fact is missing the site does one of three things:

1. Renders a visible placeholder in development and nothing in production
   (`src/components/Placeholder.tsx`).
2. Hides the block behind a flag in `src/lib/site.ts`.
3. Returns 404 for the whole page, which is what drafts and the restricted
   case study do.

Markers in the source mean:

- `{{CONFIRM}}` — drafted by us, needs the client's approval before it is public
- `{{PROVIDE}}` — we are waiting on material or a fact from the client
- `{{VERIFY}}` — a legal or factual specific that must be checked against a
  source document, never filled in from memory

`LAUNCH_CHECKLIST.md` lists every one of them still open.

## Where things live

```
src/
  app/                    routes; each page is answer-first with its own schema
    api/discovery-call/   form route: honeypot, rate limit, email, no storage
    api/network/          same, for partner and investor sign-ups
    llms.txt/             generated description of the site for AI assistants
    brand/                internal accent and type review page, never indexed
  components/             layout, forms, reveal-on-scroll, consent banner
  content/insights/       MDX articles, each with frontmatter and a draft flag
  lib/
    site.ts               brand facts, contact details, flags, RERA number
    services.ts           the eight services, their answers and FAQs
    case-studies.ts       case studies and their display rules
    schema.ts             JSON-LD builders
    metadata.ts           per-page canonical, Open Graph and Twitter metadata
  styles/tokens.css       the entire brand: colour, type, spacing, motion
public/assets/            logo and image slots, each with a README of what we need
```

## Changing the brand

Edit `src/styles/tokens.css`. The accent is one variable, with two alternatives
defined alongside it. Compare them on `/brand`, which shows each option on both
the dark and light surfaces it will actually appear on.

Shangrila's electric lime is deliberately absent. That palette belongs to a
client and must not be used here.

## Content

**Services** are data in `src/lib/services.ts`. Each has a two-to-three sentence
answer written to be quoted verbatim, what the engagement includes, what we
report on, and an FAQ. An FAQ answer still carrying a marker is never rendered
as an answer and never enters FAQ schema.

**Case studies** are data in `src/lib/case-studies.ts`, rendered through one
template: context, problem, what we did, what changed, what we learned. Outcome
figures are `null` until approved. Each study carries a `status` and, where
relevant, hard display rules that appear alongside the entry.

**Insights** are MDX files in `src/content/insights/`. Set `draft: false` in the
frontmatter only when every `{{VERIFY}}` in that file has been checked.

## Accessibility and performance

WCAG AA contrast on both surfaces, semantic landmarks, a skip link, visible
focus rings, 48px minimum tap targets, and motion that stops at
`prefers-reduced-motion`.

Lighthouse on mobile, measured against a production build:

| Page | Performance | Accessibility | Best practices | SEO |
| --- | --- | --- | --- | --- |
| Home | 98 | 100 | 100 | 100 |
| Contact | 100 | 100 | 100 | 100 |
| Services detail | 98 | 100 | 100 | 100 |
| Work | 99 | 100 | 100 | 100 |
| Network | 100 | 100 | 100 | 100 |
| About | 98 | 100 | 100 | 100 |

Re-measure once real photography is in. Image slots currently render as
gradients, and images are the usual cause of a drop.

## Deploying

Not deployed yet, by instruction. When you are ready:

1. Create the Vercel project from this repository. The defaults are correct;
   the build command is `next build`.
2. Set every variable from `.env.example` in Project Settings, for Production
   and Preview. Leave anything not yet supplied empty rather than guessing.
3. Set `NEXT_PUBLIC_SITE_URL` to the real domain before the first production
   deploy, or canonicals and the sitemap will point at the wrong host.
4. Verify the sender domain with the email provider, or form notifications will
   not send. The route reports the failure rather than pretending it worked.
5. Work through `LAUNCH_CHECKLIST.md`.
