"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

/**
 * Mobile sticky "Book a call". Hidden on the contact page, where the form is
 * already the whole screen. Sits above the safe-area inset on iOS.
 */
export function StickyCta() {
  const pathname = usePathname();
  if (pathname === "/contact") return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-carbon-line bg-carbon/95 p-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] backdrop-blur lg:hidden">
      <Link
        href="/contact"
        className="flex min-h-12 w-full items-center justify-center bg-accent px-5 text-sm font-semibold uppercase tracking-[0.12em] text-carbon"
      >
        Book a discovery call
      </Link>
    </div>
  );
}
