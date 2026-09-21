"use client";

import { useSyncExternalStore } from "react";

/**
 * Analytics consent, held in the visitor's own browser and read through an
 * external store rather than an effect, so the value is correct on the first
 * client render and stays in step across every component that reads it.
 *
 * "unknown" is what the server renders. It means "we have not read the browser
 * yet", which is different from "unset" (read, and the visitor has not chosen).
 * Treating them separately is what stops the banner flashing during hydration.
 */
export type Consent = "granted" | "denied" | "unset" | "unknown";

export const CONSENT_KEY = "invictus.consent.v1";
const CONSENT_EVENT = "invictus:consent";

function read(): Consent {
  try {
    const v = window.localStorage.getItem(CONSENT_KEY);
    return v === "granted" || v === "denied" ? v : "unset";
  } catch {
    // Storage blocked or unavailable. We ask again rather than assume a grant.
    return "unset";
  }
}

let cached: Consent | null = null;

function getSnapshot(): Consent {
  if (cached === null) cached = read();
  return cached;
}

function getServerSnapshot(): Consent {
  return "unknown";
}

function subscribe(onChange: () => void): () => void {
  const handler = () => {
    cached = read();
    onChange();
  };
  window.addEventListener(CONSENT_EVENT, handler);
  // Another tab changing the choice should be honoured here too.
  window.addEventListener("storage", handler);
  return () => {
    window.removeEventListener(CONSENT_EVENT, handler);
    window.removeEventListener("storage", handler);
  };
}

export function useConsent(): Consent {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export function setConsent(value: "granted" | "denied") {
  try {
    window.localStorage.setItem(CONSENT_KEY, value);
  } catch {
    // Choice then lasts for this page view only, which is the safe direction.
  }
  cached = value;
  window.dispatchEvent(new Event(CONSENT_EVENT));
}
