/**
 * In-memory fixed-window rate limit.
 *
 * Deliberately simple: it holds counters in the function instance's memory, so
 * on Vercel it limits per warm instance rather than globally. That is enough to
 * stop a naive flood of form posts. If we ever need a hard global limit, move
 * this to Upstash or Vercel KV — the call site does not change.
 *
 * No IP address is persisted. Counters are keyed by a hash and expire with the
 * window.
 */

type Entry = { count: number; resetAt: number };

const buckets = new Map<string, Entry>();

const WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS = 5;

/** Non-reversible key, so a raw IP is never held in memory. */
function hash(input: string): string {
  let h = 2166136261;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return (h >>> 0).toString(36);
}

export function rateLimit(identifier: string): { ok: boolean; retryAfterSeconds: number } {
  const key = hash(identifier);
  const now = Date.now();
  const entry = buckets.get(key);

  // Opportunistic cleanup so the map cannot grow without bound.
  if (buckets.size > 5000) {
    for (const [k, v] of buckets) if (v.resetAt < now) buckets.delete(k);
  }

  if (!entry || entry.resetAt < now) {
    buckets.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return { ok: true, retryAfterSeconds: 0 };
  }

  entry.count += 1;
  if (entry.count > MAX_REQUESTS) {
    return { ok: false, retryAfterSeconds: Math.ceil((entry.resetAt - now) / 1000) };
  }
  return { ok: true, retryAfterSeconds: 0 };
}

/** Best-effort client identifier from proxy headers. Never stored. */
export function clientKey(headers: Headers): string {
  const forwarded = headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]!.trim();
  return headers.get("x-real-ip") ?? "unknown";
}
