import "server-only";
import { escapeHtml, sanitizeHeaderValue } from "@/lib/security/sanitize";
import { site } from "@/data/site";
import { palette } from "@/lib/design/tokens";
import type { EnquiryInput } from "@/lib/validation/schemas";

/**
 * Transactional email via Resend's REST API.
 *
 * Called over plain fetch rather than the SDK so the project carries one less
 * dependency, and so swapping to SES or Postmark is a single-file change.
 * If no API key is configured the message is logged and reported as delivered,
 * which keeps local development and preview builds working.
 */

const RESEND_ENDPOINT = "https://api.resend.com/emails";

interface SendArgs {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
}

async function send({ to, subject, html, replyTo }: SendArgs): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.ENQUIRY_FROM_EMAIL ?? "website@lumioragems.com";

  if (!apiKey) {
    console.info("[email] No RESEND_API_KEY set — message not dispatched.", { to, subject });
    return true;
  }

  try {
    const response = await fetch(RESEND_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: `${site.name} <${from}>`,
        to: [to],
        subject: sanitizeHeaderValue(subject),
        html,
        ...(replyTo ? { reply_to: sanitizeHeaderValue(replyTo) } : {}),
      }),
    });

    if (!response.ok) {
      console.error("[email] Provider rejected the message.", response.status);
      return false;
    }
    return true;
  } catch (error) {
    console.error("[email] Dispatch failed:", (error as Error).message);
    return false;
  }
}

function shell(inner: string) {
  return `<!doctype html><html><body style="margin:0;padding:32px;background:${palette.ivory[100]};font-family:Helvetica,Arial,sans-serif;color:${palette.ink[700]};">
  <div style="max-width:560px;margin:0 auto;background:${palette.ivory[50]};border:1px solid ${palette.rose[200]};border-radius:6px;padding:36px;">
    <p style="margin:0 0 26px;font-size:12px;letter-spacing:.32em;text-transform:uppercase;color:${palette.gold[600]};">${escapeHtml(site.name)}</p>
    ${inner}
  </div>
  <p style="max-width:560px;margin:20px auto 0;font-size:11px;color:${palette.ink[400]};text-align:center;">
    ${escapeHtml(site.name)} · ${escapeHtml(site.address.locality)}, ${escapeHtml(site.address.region)}
  </p>
</body></html>`;
}

const row = (label: string, value: string) =>
  `<tr>
     <td style="padding:7px 14px 7px 0;font-size:12px;color:${palette.ink[400]};white-space:nowrap;vertical-align:top;">${escapeHtml(label)}</td>
     <td style="padding:7px 0;font-size:14px;color:${palette.ink[800]};">${escapeHtml(value)}</td>
   </tr>`;

/** Internal notification to the gallery. */
export async function sendEnquiryNotification(data: EnquiryInput) {
  const to = process.env.ENQUIRY_TO_EMAIL ?? site.email;
  const label =
    data.enquiryType === "product" ? "Stone enquiry"
    : data.enquiryType === "custom" ? "Bespoke enquiry"
    : "General enquiry";

  const subject = data.productName
    ? `${label} — ${data.productName}`
    : `${label} from ${data.name}`;

  const html = shell(`
    <h1 style="margin:0 0 22px;font-size:22px;font-weight:normal;color:${palette.ink[900]};">${escapeHtml(label)}</h1>
    <table style="width:100%;border-collapse:collapse;">
      ${row("Name", data.name)}
      ${row("Email", data.email)}
      ${data.phone ? row("Telephone", data.phone) : ""}
      ${data.productName ? row("Stone", data.productName) : ""}
      ${data.productSlug ? row("Reference", data.productSlug) : ""}
      ${row("Received", new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }))}
    </table>
    <div style="margin-top:24px;padding-top:22px;border-top:1px solid ${palette.rose[200]};">
      <p style="margin:0 0 8px;font-size:12px;color:${palette.ink[400]};">Message</p>
      <p style="margin:0;font-size:14px;line-height:1.7;white-space:pre-wrap;">${escapeHtml(data.message)}</p>
    </div>
  `);

  return send({ to, subject, html, replyTo: data.email });
}

/** Acknowledgement to the customer. */
export async function sendEnquiryAcknowledgement(data: EnquiryInput) {
  const html = shell(`
    <h1 style="margin:0 0 18px;font-size:24px;font-weight:normal;color:${palette.ink[900]};">Thank you, ${escapeHtml(data.name.split(" ")[0] ?? data.name)}.</h1>
    <p style="margin:0 0 16px;font-size:15px;line-height:1.75;">
      We have your enquiry${data.productName ? ` regarding the ${escapeHtml(data.productName)}` : ""} and one of our gemmologists will reply within one working day.
    </p>
    <p style="margin:0 0 24px;font-size:15px;line-height:1.75;">
      If your enquiry is urgent, you are welcome to call us on ${escapeHtml(site.phone)}.
    </p>
    <div style="padding:18px;background:${palette.rose[100]};border-radius:4px;">
      <p style="margin:0 0 8px;font-size:12px;color:${palette.ink[400]};">Your message</p>
      <p style="margin:0;font-size:14px;line-height:1.7;white-space:pre-wrap;">${escapeHtml(data.message)}</p>
    </div>
  `);

  return send({ to: data.email, subject: `We have your enquiry — ${site.name}`, html });
}

export async function sendNewsletterWelcome(email: string) {
  const html = shell(`
    <h1 style="margin:0 0 18px;font-size:24px;font-weight:normal;color:${palette.ink[900]};">Welcome to the letter.</h1>
    <p style="margin:0;font-size:15px;line-height:1.75;">
      You will hear from us when something genuinely uncommon reaches the vault — no more than once or twice a month. You can leave at any time using the link at the foot of any letter.
    </p>
  `);
  return send({ to: email, subject: `Welcome — ${site.name}`, html });
}
