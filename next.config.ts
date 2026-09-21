import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Every page except the two form routes prerenders to static HTML. The forms
  // need a server, so this is a standard Vercel build rather than a full
  // `output: "export"`. If the forms ever move to a third-party endpoint, this
  // can become a static export with no other change.
  images: {
    // Only our own files, from /public. No remote patterns are allowed, so a
    // stock image cannot be hotlinked in by accident.
    formats: ["image/avif", "image/webp"],
    deviceSizes: [420, 640, 828, 1080, 1200, 1920, 2560],
  },
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          // The site sets no camera, microphone or location permissions.
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
