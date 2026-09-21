"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { analytics } from "@/lib/site";
import { readConsent, writeConsent } from "./Analytics";

/**
 * Consent banner.
 *
 * {{CONFIRM}} the wording with our own legal adviser. This is drafted with
 * India's Digital Personal Data Protection Act in mind — notice before
 * processing, a real choice, and a refusal that is as easy as a grant — but it
 * is not legal advice and has not been reviewed by a lawyer.
 */
export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Nothing to ask about if no analytics IDs are configured.
    if (!analytics.ga4 && !analytics.metaPixel) return;
    if (readConsent() === null) setVisible(true);
  }, []);

  if (!visible) return null;

  const decide = (value: "granted" | "denied") => {
    writeConsent(value);
    setVisible(false);
  };

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-labelledby="consent-title"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-carbon-line bg-carbon p-4 pb-[calc(1rem+env(safe-area-inset-bottom))] text-paper lg:bottom-4 lg:left-4 lg:right-auto lg:max-w-md lg:border"
    >
      <h2 id="consent-title" className="eyebrow text-accent">
        Your choice on analytics
      </h2>
      <p className="mt-3 text-sm text-paper-muted">
        We use Google Analytics and the Meta Pixel to measure how this site performs. They
        load only if you accept. Decline and the site works exactly the same.{" "}
        <Link href="/privacy" className="underline underline-offset-4 hover:text-accent">
          Privacy policy
        </Link>
      </p>
      <div className="mt-4 flex flex-col gap-2 sm:flex-row">
        <button
          type="button"
          onClick={() => decide("granted")}
          className="min-h-12 flex-1 bg-accent px-5 text-sm font-semibold uppercase tracking-[0.12em] text-carbon"
        >
          Accept
        </button>
        <button
          type="button"
          onClick={() => decide("denied")}
          className="min-h-12 flex-1 border border-paper-muted px-5 text-sm font-semibold uppercase tracking-[0.12em]"
        >
          Decline
        </button>
      </div>
    </div>
  );
}
