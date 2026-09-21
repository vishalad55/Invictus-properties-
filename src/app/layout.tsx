import type { Metadata, Viewport } from "next";
import { Archivo_Black, Inter } from "next/font/google";
import "./globals.css";
import { Analytics } from "@/components/Analytics";
import { CookieBanner } from "@/components/CookieBanner";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import { StickyCta } from "@/components/StickyCta";
import { organizationSchema, professionalServiceSchema } from "@/lib/schema";
import { site } from "@/lib/site";

/* Heavy uppercase display face plus a clean sans for body copy.
   Both self-hosted by next/font at build time, with system fallbacks. */
const display = Archivo_Black({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display-src",
  display: "swap",
  fallback: ["Arial Black", "Helvetica Neue", "sans-serif"],
});

const body = Inter({
  subsets: ["latin"],
  variable: "--font-body-src",
  display: "swap",
  fallback: ["system-ui", "Segoe UI", "sans-serif"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Real estate marketing in Hyderabad`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_IN",
    url: site.url,
    title: `${site.name} — Real estate marketing in Hyderabad`,
    description: site.description,
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: site.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — Real estate marketing in Hyderabad`,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
};

export const viewport: Viewport = {
  themeColor: "#0b0c10",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={`${display.variable} ${body.variable}`}>
      <body className="font-body antialiased">
        <JsonLd data={organizationSchema()} />
        <JsonLd data={professionalServiceSchema()} />
        <Header />
        <main id="main" className="pb-20 lg:pb-0">
          {children}
        </main>
        <Footer />
        <StickyCta />
        <CookieBanner />
        <Analytics />
      </body>
    </html>
  );
}
