import { NextResponse } from "next/server";
import { validateContactInput } from "@/lib/contact/validation";
import { generateReferenceId } from "@/lib/contact/referenceId";
import { isRateLimited } from "@/lib/contact/rateLimit";
import { sendAdminNotification, sendCustomerAcknowledgement } from "@/lib/contact/mailer";

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ success: false, error: "Invalid request body." }, { status: 400 });
  }

  // Honeypot: real visitors never see or fill this field. Bots that
  // auto-fill every input will trip it — pretend success so they don't
  // learn the check exists, but skip sending any actual email.
  const honeypot = body.website;
  if (typeof honeypot === "string" && honeypot.trim().length > 0) {
    return NextResponse.json({ success: true, referenceId: generateReferenceId() });
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { success: false, error: "Too many requests. Please try again in a few minutes." },
      { status: 429 },
    );
  }

  const result = validateContactInput(body);
  if (!result.valid) {
    return NextResponse.json({ success: false, errors: result.errors }, { status: 400 });
  }

  const { name, email, subject, message } = result.data;
  const referenceId = generateReferenceId();
  const submittedAt = new Date().toLocaleString("en-US", {
    dateStyle: "long",
    timeStyle: "short",
    timeZone: "Asia/Dubai",
  });

  try {
    await sendAdminNotification({ name, email, subject, message, referenceId, submittedAt });
    await sendCustomerAcknowledgement({ name, email, referenceId });
  } catch (err) {
    console.error("Contact form email send failed:", err);
    return NextResponse.json(
      {
        success: false,
        error: "We couldn't send your message right now. Please try again shortly or email us directly.",
      },
      { status: 502 },
    );
  }

  return NextResponse.json({ success: true, referenceId });
}
