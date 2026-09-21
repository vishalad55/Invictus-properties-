# Launch checklist

Everything still open in the codebase, grouped by who has to resolve it.

Run `npm run open-items` for the live list with file and line numbers. At the
time of writing: **38 `{{CONFIRM}}`, 31 `{{PROVIDE}}`, 33 `{{VERIFY}}`**.

Marker meanings:

- **`{{CONFIRM}}`** — we drafted it, you approve it before it goes public
- **`{{PROVIDE}}`** — we are waiting on material or a fact from you
- **`{{VERIFY}}`** — a legal or factual specific to be checked against a source
  document, never filled in from memory

---

## Blocking — the site must not go live until these are closed

### Legal and compliance

- [ ] **RERA agent registration.** A channel partner who markets or sells
      projects for a promoter generally needs an agent registration in the state
      where it operates, and must state the number in its advertising. Confirm
      with our own adviser whether Invictus holds a Telangana registration, and
      a Karnataka one for the Bangalore work. If we hold them, set
      `NEXT_PUBLIC_RERA_AGENT_NUMBER`. If we do not, the number must not be
      invented and the Network page's channel partner offer should be reviewed
      before launch.
      `src/lib/site.ts`
- [ ] **Privacy policy.** The whole page is drafted against the Digital Personal
      Data Protection Act, 2023 and has not been seen by a lawyer. Have it
      reviewed, then set `NEXT_PUBLIC_PRIVACY_UPDATED` to the review date.
      `src/app/privacy/page.tsx`
- [ ] **Data retention period.** State a period we can actually meet. The
      section is hidden in production until it is set, so we publish no promise
      we do not keep.
      `src/app/privacy/page.tsx`
- [ ] **Grievance contact.** Name and contact address of the person who answers
      data requests. A privacy policy without a working contact route is not
      usable.
      `src/app/privacy/page.tsx`
- [ ] **Cookie banner wording.** Drafted, not legally reviewed.
      `src/components/CookieBanner.tsx`

### Shangrila Infracon

The case study is behind `NEXT_PUBLIC_SHOW_SHANGRILA`, which is `false`. The
page returns 404 while it is off. Before it may ever be switched on:

- [ ] **Written client approval on file** for the page and everything on it.
- [ ] Confirm the page never states or implies that Shangrila is part of, or
      continues, any other Bollineni-named company.
- [ ] Confirm no project completion date or delivery promise appears anywhere.
- [ ] Confirm no project count appears. The phrasing is "ongoing, completed and
      upcoming projects".
- [ ] Confirm every advertised project particular matches the RERA
      registration. If unsure, leave it out.

The rules are recorded next to the entry in `src/lib/case-studies.ts` and render
on the page itself in development, so they travel with the content.

### Client-approved figures

- [ ] **Allure Avani.** No lead numbers, cost per lead, site visit counts,
      booking numbers or price points may be published without written approval.
      Every outcome is currently `null`.
- [ ] **Urban Greens.** Scope, location and results not supplied. The page is a
      marked draft and 404s in production.

---

## Needed from you — `{{PROVIDE}}`

### Assets

- [ ] **Logo files.** `invictus-mark.svg`, `invictus-wordmark.svg`, and a light
      version if the black mark does not read on the carbon background. Drop in
      `public/assets/logo/`, then point `src/components/Logo.tsx` at them. Until
      then the wordmark is set in the display face.
- [ ] **Home hero image or loop.** `public/assets/images/home-hero.jpg`, or an
      8–10 second muted loop plus a poster frame.
- [ ] **Case study photography**, cleared for publication, one per study. See
      `public/assets/images/README.md` for filenames.
- [ ] **Client logos**, only ones supplied and cleared in writing. Then set
      `NEXT_PUBLIC_SHOW_CLIENT_LOGOS=true`.
- [ ] **Team headshots and bios.** Then set `NEXT_PUBLIC_SHOW_TEAM=true`. No
      stock photography and no invented roles.

### Facts

- [ ] **Domain.** Set `NEXT_PUBLIC_SITE_URL` before the first production deploy
      or canonicals and the sitemap point at the wrong host.
- [ ] **Contact email, phone and WhatsApp number.** Each is hidden until set.
      The WhatsApp number also drives the prefilled message after the form.
- [ ] **Full address and GSTIN**, if they are to appear in the footer. Until
      then the site shows only "Khanamet, Hyderabad".
- [ ] **Social profile URLs.** Empty links are not rendered.
- [ ] **Case study content** for Allure Avani (project size, configuration,
      stage, the numbers behind the problem, the honest lesson) and all of
      Urban Greens.

---

## For your approval — `{{CONFIRM}}`

### Brand

- [ ] **Accent colour.** Default is warm gold `#B8975A`. Two alternatives are
      built and viewable side by side on `/brand`: deep brass `#C98A3F` and
      slate blue `#6F86A8`. Pick one and it changes in `src/styles/tokens.css`
      alone. Electric lime is deliberately absent; it belongs to Shangrila.

### Copy

Every headline and paragraph on the site is a first draft. The ones that most
need your eye:

- [ ] **Home hero line and sub-line**, and each of the seven section headings.
      `src/app/page.tsx`
- [ ] **The problem section.** Three statements about what is broken in this
      market. They are pointed, and you will be quoted on them.
- [ ] **How we work.** The four steps, particularly the promise that audit
      findings are handed over whether or not we are hired.
- [ ] **About, "Why we started".** This is a drafted founding story. Replace it
      with the real one or cut it. It must not describe history we cannot stand
      behind. `src/app/about/page.tsx`
- [ ] **Services, Work, Insights, Network and Contact page headlines.**
- [ ] **Service answers.** Eight two-to-three sentence answers written to be
      quoted verbatim by search engines and AI assistants. `src/lib/services.ts`

### Service specifics we would not state without you

- [ ] Typical brand engagement timeline
- [ ] Minimum monthly media budget we will accept
- [ ] Realistic timeline before search work shows, from our own projects
- [ ] Which NRI corridors we actually have delivery experience in
- [ ] Which CRMs we support

Each is an FAQ answer currently holding a marker. Unanswered questions render as
placeholders in development, disappear in production, and never enter FAQ
schema, so an unapproved claim cannot reach a search result.

---

## Fact-checking — `{{VERIFY}}`

All three Insights articles are outlines, marked `draft: true`. They are visible
in development, hidden and unindexed in production, and excluded from the
sitemap and `llms.txt`. They deliberately contain no section numbers, no fees,
no timelines and no portal specifics, because a wrong specific in a land article
is worse than no article.

- [ ] **How to verify land before buying near the ORR** — 11 markers. Record
      names and issuing authorities, master plan jurisdictions along the
      corridor, restricted land categories, encumbrance certificate period,
      searchable court records, pre-purchase notice and registration.
- [ ] **What patta and ancestral land history mean for a buyer** — 10 markers.
      What the current record of rights is called and what presumption attaches
      to it, the test for ancestral property, how shares devolve, and the
      position on daughters' rights under the current statute and case law.
- [ ] **How to read a RERA registration page** — 12 markers. The authority and
      portal for Telangana and separately for Karnataka, how phases and
      extensions display, the defined area terms, remedies where a declared date
      is missed, and current advertising requirements including what an agent
      must state.

Set `draft: false` in a file's frontmatter only when every marker in that file
has been checked against a source document. Each article closes by saying it is
not legal advice; keep that.

---

## Before the first deploy

- [ ] Create the Vercel project. Defaults are correct, build command
      `next build`. **Do not deploy until you say so.**
- [ ] Set every variable from `.env.example` for Production and Preview. Leave
      anything unsupplied empty rather than guessing.
- [ ] Verify the sender domain with the email provider and set `RESEND_API_KEY`,
      `LEAD_NOTIFICATION_EMAIL` and `LEAD_FROM_EMAIL`. Without them the forms
      accept a submission but report that it was not delivered, and nothing is
      stored, so the enquiry is lost.
- [ ] Set `NEXT_PUBLIC_GA4_ID` and `NEXT_PUBLIC_META_PIXEL_ID`. Neither loads
      until a visitor accepts the banner. With both empty, no banner is shown
      because there is nothing to consent to.
- [ ] Submit both forms end to end on the preview deploy and confirm the
      notification email arrives.
- [ ] Re-run Lighthouse once real photography is in. Current mobile scores on a
      production build are 98–100 across performance, accessibility, best
      practices and SEO, measured without images.
- [ ] Submit `sitemap.xml` in Google Search Console and confirm `/llms.txt`
      resolves on the live domain.
- [ ] Confirm `/brand` is not linked from anywhere and carries `noindex`. It is
      an internal review page.
