"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import { analytics } from "@/lib/site";

export const CONSENT_KEY = "invictus.consent.v1";
export const CONSENT_EVENT = "invictus:consent";

export type ConsentValue = "granted" | "denied";

export function readConsent(): ConsentValue | null {
  if (typeof window === "undefined") return null;
  try {
    const v = window.localStorage.getItem(CONSENT_KEY);
    return v === "granted" || v === "denied" ? v : null;
  } catch {
    return null;
  }
}

export function writeConsent(value: ConsentValue) {
  try {
    window.localStorage.setItem(CONSENT_KEY, value);
  } catch {
    // Storage blocked. Consent then lasts for this page view only, which is the
    // safe direction: we ask again rather than assuming a grant.
  }
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: value }));
}

/**
 * GA4 and Meta Pixel load only after the visitor has actively granted consent.
 * Nothing is requested, and no identifier is set, before that click.
 */
export function Analytics() {
  const [consent, setConsent] = useState<ConsentValue | null>(null);

  useEffect(() => {
    setConsent(readConsent());
    const onChange = (e: Event) => setConsent((e as CustomEvent<ConsentValue>).detail);
    window.addEventListener(CONSENT_EVENT, onChange);
    return () => window.removeEventListener(CONSENT_EVENT, onChange);
  }, []);

  if (consent !== "granted") return null;

  return (
    <>
      {analytics.ga4 ? (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${analytics.ga4}`}
            strategy="afterInteractive"
          />
          <Script id="ga4-init" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}
gtag('js',new Date());
gtag('consent','default',{ad_storage:'granted',analytics_storage:'granted'});
gtag('config','${analytics.ga4}',{anonymize_ip:true});`}
          </Script>
        </>
      ) : null}

      {analytics.metaPixel ? (
        <Script id="meta-pixel" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,
'script','https://connect.facebook.net/en_US/fbevents.js');
fbq('init','${analytics.metaPixel}');fbq('track','PageView');`}
        </Script>
      ) : null}
    </>
  );
}
