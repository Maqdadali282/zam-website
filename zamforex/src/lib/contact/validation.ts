export type ContactInput = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export type ContactFieldErrors = Partial<Record<keyof ContactInput, string>>;

export type ValidationResult =
  | { valid: true; data: ContactInput }
  | { valid: false; errors: ContactFieldErrors };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function asString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

export function validateContactInput(input: Record<string, unknown>): ValidationResult {
  const name = asString(input.name);
  const email = asString(input.email);
  const subject = asString(input.subject);
  const message = asString(input.message);

  const errors: ContactFieldErrors = {};
  if (name.length < 2 || name.length > 100) {
    errors.name = "Please enter your full name (2–100 characters).";
  }
  if (!EMAIL_RE.test(email) || email.length > 254) {
    errors.email = "Please enter a valid email address.";
  }
  if (subject.length < 3 || subject.length > 150) {
    errors.subject = "Subject must be between 3 and 150 characters.";
  }
  if (message.length < 10 || message.length > 5000) {
    errors.message = "Message must be between 10 and 5,000 characters.";
  }

  if (Object.keys(errors).length > 0) {
    return { valid: false, errors };
  }
  return { valid: true, data: { name, email, subject, message } };
}

/** Escapes text before it's interpolated into an HTML email body. */
export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
