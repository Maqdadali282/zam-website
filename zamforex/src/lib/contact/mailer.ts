import nodemailer from "nodemailer";
import { adminNotificationEmail, customerAcknowledgementEmail } from "./emailTemplates";

let transporter: nodemailer.Transporter | null = null;

function getTransporter(): nodemailer.Transporter {
  if (transporter) return transporter;

  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;
  if (!user || !pass) {
    throw new Error(
      "Email is not configured: set GMAIL_USER and GMAIL_APP_PASSWORD (see .env.example).",
    );
  }

  transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user, pass },
  });
  return transporter;
}

export async function sendAdminNotification(params: {
  name: string;
  email: string;
  subject: string;
  message: string;
  referenceId: string;
  submittedAt: string;
}) {
  const from = process.env.GMAIL_USER!;
  const to = process.env.CONTACT_ADMIN_EMAIL || from;
  const { subject, html, text } = adminNotificationEmail(params);

  await getTransporter().sendMail({
    from: `"Zam Forex Website" <${from}>`,
    to,
    replyTo: `"${params.name}" <${params.email}>`,
    subject,
    html,
    text,
  });
}

export async function sendCustomerAcknowledgement(params: { name: string; email: string; referenceId: string }) {
  const from = process.env.GMAIL_USER!;
  const { subject, html, text } = customerAcknowledgementEmail(params);

  await getTransporter().sendMail({
    from: `"Zam Forex Support" <${from}>`,
    to: params.email,
    replyTo: process.env.CONTACT_ADMIN_EMAIL || from,
    subject,
    html,
    text,
  });
}
