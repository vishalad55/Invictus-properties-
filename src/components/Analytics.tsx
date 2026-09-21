"use client";

import Script from "next/script";
import { useConsent } from "@/lib/consent";
import { analytics } from "@/lib/site";

/**
 * GA4 and the Meta Pixel load only after the visitor has actively granted
 * consent. Nothing is requested, and no identifier is set, before that click.
 */
export function Analytics() {
  const consent = useConsent();
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
