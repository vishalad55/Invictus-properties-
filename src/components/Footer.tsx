import Link from "next/link";
import { contact, nav, rera, site, socials } from "@/lib/site";
import { Logo } from "./Logo";

/**
 * Nothing here is invented. A contact detail that has not been supplied is
 * simply not rendered — see src/lib/site.ts and LAUNCH_CHECKLIST.md.
 */
export function Footer() {
  const socialLinks = [
    { label: "Instagram", href: socials.instagram },
    { label: "LinkedIn", href: socials.linkedin },
    { label: "YouTube", href: socials.youtube },
  ].filter((s) => s.href);

  return (
    <footer className="bg-carbon text-paper">
      <div className="mx-auto w-full max-w-6xl px-[var(--gutter)] py-16">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Logo className="text-xl" />
            <p className="copy prose-measure mt-5 text-paper-muted">{site.tagline}</p>
            <p className="mt-6 text-sm text-paper-muted">
              {site.legalEntity}
              <br />
              {contact.addressLine ? (
                <>
                  {contact.addressLine}
                  <br />
                </>
              ) : null}
              {site.locality}, {site.region}
            </p>
          </div>

          <nav aria-label="Footer">
            <h2 className="eyebrow mb-4 text-paper-muted">Pages</h2>
            <ul className="space-y-3 text-sm">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-accent">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="eyebrow mb-4 text-paper-muted">Contact</h2>
            <ul className="space-y-3 text-sm">
              {contact.email ? (
                <li>
                  <a href={`mailto:${contact.email}`} className="hover:text-accent">
                    {contact.email}
                  </a>
                </li>
              ) : null}
              {contact.phone ? (
                <li>
                  <a href={`tel:${contact.phone.replace(/\s/g, "")}`} className="hover:text-accent">
                    {contact.phone}
                  </a>
                </li>
              ) : null}
              <li>
                <Link href="/contact" className="hover:text-accent">
                  Book a discovery call
                </Link>
              </li>
            </ul>

            {socialLinks.length > 0 ? (
              <>
                <h2 className="eyebrow mb-4 mt-8 text-paper-muted">Follow</h2>
                <ul className="space-y-3 text-sm">
                  {socialLinks.map((s) => (
                    <li key={s.label}>
                      <a
                        href={s.href}
                        className="hover:text-accent"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {s.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </>
            ) : null}
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-carbon-line pt-8 text-xs text-paper-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.legalEntity}. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {/* RERA agent registration. Rendered only when the number is supplied. */}
            {rera.agentNumber ? <span>RERA agent registration: {rera.agentNumber}</span> : null}
            {contact.gstin ? <span>GSTIN: {contact.gstin}</span> : null}
            <Link href="/privacy" className="hover:text-accent">
              Privacy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
