import { NextResponse } from "next/server";
import {
  BUDGET_RANGES,
  isEmail,
  isPhone,
  parseFields,
  PROJECT_TYPES,
} from "@/lib/form-validation";
import { sendNotification } from "@/lib/mailer";
import { clientKey, rateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Discovery call enquiry.
 *
 * Spam protection is a honeypot field plus a per-instance rate limit.
 * The submission is emailed and then discarded: nothing is written to a
 * database, a log line or a third-party store.
 */
export async function POST(request: Request) {
  const limit = rateLimit(clientKey(request.headers));
  if (!limit.ok) {
    return NextResponse.json(
      { ok: false, error: "Too many submissions. Try again shortly." },
      { status: 429, headers: { "Retry-After": String(limit.retryAfterSeconds) } },
    );
  }

  let payload: Record<string, unknown>;
  try {
    payload = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false, error: "Malformed request." }, { status: 400 });
  }

  // Honeypot. A real visitor never sees or fills this field. Answer 200 so a
  // bot cannot tell it was caught.
  if (typeof payload.website === "string" && payload.website.trim() !== "") {
    return NextResponse.json({ ok: true, sent: true });
  }

  const parsed = parseFields(payload, [
    { name: "name", label: "Name", required: true, maxLength: 120 },
    { name: "company", label: "Company", required: true, maxLength: 160 },
    { name: "email", label: "Email", required: true, maxLength: 200 },
    { name: "phone", label: "Phone", required: false, maxLength: 40 },
    { name: "projectType", label: "Project type", required: true, allowed: PROJECT_TYPES },
    { name: "city", label: "City", required: true, maxLength: 80 },
    { name: "budget", label: "Budget range", required: true, allowed: BUDGET_RANGES },
    { name: "message", label: "Message", required: false, maxLength: 2000 },
  ]);

  if (!parsed.ok) {
    return NextResponse.json({ ok: false, error: parsed.error }, { status: 400 });
  }

  const v = parsed.values;
  if (!isEmail(v.email!)) {
    return NextResponse.json(
      { ok: false, error: "That email address does not look right." },
      { status: 400 },
    );
  }
  if (v.phone && !isPhone(v.phone)) {
    return NextResponse.json(
      { ok: false, error: "That phone number does not look right." },
      { status: 400 },
    );
  }

  const result = await sendNotification({
    subject: `Discovery call request — ${v.company} (${v.city})`,
    lines: [
      ["Name", v.name!],
      ["Company", v.company!],
      ["Email", v.email!],
      ["Phone", v.phone || "Not given"],
      ["Project type", v.projectType!],
      ["City", v.city!],
      ["Budget", v.budget!],
      ["Message", v.message || "None"],
    ],
  });

  // Whether or not email delivery succeeded, the visitor is handed the WhatsApp
  // fallback by the client. We report delivery honestly rather than claiming
  // success we did not get.
  return NextResponse.json({ ok: true, sent: result.sent, reason: result.reason });
}
