import { NextResponse } from "next/server";
import { isEmail, isPhone, NETWORK_ROLES, parseFields } from "@/lib/form-validation";
import { sendNotification } from "@/lib/mailer";
import { clientKey, rateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Channel partner, investor and vendor sign-ups. Same protections as above. */
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

  if (typeof payload.website === "string" && payload.website.trim() !== "") {
    return NextResponse.json({ ok: true, sent: true });
  }

  const parsed = parseFields(payload, [
    { name: "name", label: "Name", required: true, maxLength: 120 },
    { name: "role", label: "Role", required: true, allowed: NETWORK_ROLES },
    { name: "city", label: "City", required: true, maxLength: 80 },
    { name: "email", label: "Email", required: true, maxLength: 200 },
    { name: "phone", label: "Phone", required: false, maxLength: 40 },
    { name: "note", label: "Note", required: false, maxLength: 1000 },
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
    subject: `Network sign-up — ${v.role} (${v.city})`,
    lines: [
      ["Name", v.name!],
      ["Role", v.role!],
      ["City", v.city!],
      ["Email", v.email!],
      ["Phone", v.phone || "Not given"],
      ["Note", v.note || "None"],
    ],
  });

  return NextResponse.json({ ok: true, sent: result.sent, reason: result.reason });
}
