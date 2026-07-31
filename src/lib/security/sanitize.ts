import "server-only";

/**
 * Escape user-supplied text before it is interpolated into an HTML email.
 * Enquiry content is attacker-controlled, and the recipient's mail client will
 * happily render markup we pass through.
 */
const ENTITIES: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
};

export function escapeHtml(input: string): string {
  return input.replace(/[&<>"']/g, (char) => ENTITIES[char] ?? char);
}

/** Strip CR/LF so user input cannot inject additional email headers. */
export function sanitizeHeaderValue(input: string): string {
  return input.replace(/[\r\n]+/g, " ").trim().slice(0, 200);
}
