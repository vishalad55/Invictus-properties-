"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav } from "@/lib/site";
import { Logo } from "./Logo";

export function Header() {
  const pathname = usePathname();
  // The menu is remembered against the route it was opened on, so navigating
  // closes it without an effect that fires on every render.
  const [openedOn, setOpenedOn] = useState<string | null>(null);
  const open = openedOn === pathname;

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-carbon-line bg-carbon/95 text-paper backdrop-blur supports-[backdrop-filter]:bg-carbon/80">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-accent focus:px-4 focus:py-2 focus:text-carbon"
      >
        Skip to content
      </a>
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-[var(--gutter)] py-4">
        <Link href="/" className="flex items-center" aria-label="Invictus Properties, home">
          <Logo />
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-7 lg:flex">
          {nav.map((item) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`text-sm font-medium transition-colors hover:text-accent ${
                  active ? "text-accent" : "text-paper"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          <Link
            href="/contact"
            className="min-h-11 bg-accent px-5 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-carbon transition-colors hover:bg-[color-mix(in_srgb,var(--accent)_82%,white)]"
          >
            Book a discovery call
          </Link>
        </nav>

        <button
          type="button"
          onClick={() => setOpenedOn(open ? null : pathname)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          className="-mr-2 flex h-11 w-11 items-center justify-center lg:hidden"
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          <span aria-hidden="true" className="relative block h-4 w-6">
            <span
              className={`absolute left-0 block h-0.5 w-6 bg-current transition-transform duration-200 ${
                open ? "top-2 rotate-45" : "top-0"
              }`}
            />
            <span
              className={`absolute left-0 top-2 block h-0.5 w-6 bg-current transition-opacity duration-200 ${
                open ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute left-0 block h-0.5 w-6 bg-current transition-transform duration-200 ${
                open ? "top-2 -rotate-45" : "top-4"
              }`}
            />
          </span>
        </button>
      </div>

      {open ? (
        <nav
          id="mobile-nav"
          aria-label="Primary mobile"
          className="border-t border-carbon-line bg-carbon lg:hidden"
        >
          <ul className="mx-auto w-full max-w-6xl px-[var(--gutter)] py-4">
            {nav.map((item) => (
              <li key={item.href} className="border-b border-carbon-line last:border-0">
                <Link href={item.href} className="block py-4 text-lg font-medium">
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="pt-5">
              <Link
                href="/contact"
                className="flex min-h-12 items-center justify-center bg-accent px-5 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-carbon"
              >
                Book a discovery call
              </Link>
            </li>
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
