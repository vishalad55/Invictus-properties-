/**
 * Outbound notification email.
 *
 * Uses Resend over plain fetch so the route stays dependency-free and runs on
 * the Edge or Node runtime without change. If no API key is configured the
 * submission is not silently dropped: the route reports failure to the caller
 * and the visitor is offered WhatsApp instead.
 *
 * Nothing is written to a database or a log store. The enquiry lives in the
 * notification email and nowhere else.
 */

const RESEND_ENDPOINT = "https://api.resend.com/emails";

export type MailResult = { sent: boolean; reason?: string };

export async function sendNotification(input: {
  subject: string;
  lines: [string, string][];
}): Promise<MailResult> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.LEAD_NOTIFICATION_EMAIL;
  const from = process.env.LEAD_FROM_EMAIL;

  if (!apiKey || !to || !from) {
    return { sent: false, reason: "email_not_configured" };
  }

  const text = input.lines.map(([label, value]) => `${label}: ${value}`).join("\n");
  const html = `<table style="font-family:system-ui,sans-serif;font-size:14px">${input.lines
    .map(
      ([label, value]) =>
        `<tr><td style="padding:4px 12px 4px 0;color:#666">${escapeHtml(
          label,
        )}</td><td style="padding:4px 0"><strong>${escapeHtml(value)}</strong></td></tr>`,
    )
    .join("")}</table>`;

  try {
    const res = await fetch(RESEND_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ from, to: [to], subject: input.subject, text, html }),
    });
    if (!res.ok) {
      // The provider's response body can contain the submitted address, so it is
      // not logged. Only the status is recorded.
      return { sent: false, reason: `provider_status_${res.status}` };
    }
    return { sent: true };
  } catch {
    return { sent: false, reason: "network_error" };
  }
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
