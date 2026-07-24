import { escapeHtml } from "./validation";

function baseLayout(bodyHtml: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<meta name="color-scheme" content="dark" />
<title>Zam Forex</title>
</head>
<body style="margin:0;padding:0;background:#05070a;">
<div style="width:100%;background:#05070a;padding:32px 16px;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;margin:0 auto;">
    <tr>
      <td style="background:#0f141c;border:1px solid #1e2733;border-radius:16px;overflow:hidden;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td style="padding:28px 32px;text-align:center;border-bottom:1px solid #1e2733;">
              <span style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;font-size:22px;font-weight:800;letter-spacing:0.5px;color:#f4f7fb;">
                ZAM<span style="color:#00e0a4;">FOREX</span>
              </span>
            </td>
          </tr>
          <tr>
            <td style="padding:32px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;font-size:15px;line-height:1.7;color:#bcc5d2;">
              ${bodyHtml}
            </td>
          </tr>
          <tr>
            <td style="padding:24px 32px;text-align:center;font-size:12px;color:#5a6472;border-top:1px solid #1e2733;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;">
              Zam Forex &middot; <a href="mailto:zamforex110@gmail.com" style="color:#00e0a4;text-decoration:none;">zamforex110@gmail.com</a><br />
              This is an automated message.
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</div>
</body>
</html>`;
}

function referenceBox(referenceId: string): string {
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:20px 0;">
    <tr>
      <td style="background:#151b24;border:1px solid #00e0a4;border-radius:12px;padding:16px 20px;text-align:center;">
        <div style="font-size:11px;text-transform:uppercase;letter-spacing:1px;color:#7c8794;margin-bottom:6px;">Reference ID</div>
        <div style="font-size:20px;font-weight:700;color:#00e0a4;font-family:'SFMono-Regular',Consolas,monospace;">${referenceId}</div>
      </td>
    </tr>
  </table>`;
}

export function customerAcknowledgementEmail(params: { name: string; referenceId: string }) {
  const { name, referenceId } = params;
  const body = `
    <p style="margin:0 0 16px;color:#f4f7fb;font-size:17px;font-weight:600;">Hello ${escapeHtml(name)},</p>
    <p style="margin:0 0 16px;">Thank you for contacting Zam Forex.</p>
    <p style="margin:0 0 16px;">We have successfully received your inquiry. Our support team is currently reviewing your message. We will respond to your inquiry as soon as possible.</p>
    ${referenceBox(referenceId)}
    <p style="margin:0 0 16px;">Please keep this reference number for future communication. If you need to provide additional information, simply reply to this email.</p>
    <p style="margin:0 0 16px;">Thank you for choosing Zam Forex.</p>
    <p style="margin:0;">Best Regards,<br />Zam Forex Support Team</p>
  `;
  return {
    subject: "Thank You for Contacting Zam Forex",
    html: baseLayout(body),
    text: `Hello ${name},\n\nThank you for contacting Zam Forex.\n\nWe have successfully received your inquiry. Our support team is currently reviewing your message. We will respond to your inquiry as soon as possible.\n\nReference ID: ${referenceId}\nPlease keep this reference number for future communication. If you need to provide additional information, simply reply to this email.\n\nThank you for choosing Zam Forex.\n\nBest Regards,\nZam Forex Support Team\nzamforex110@gmail.com`,
  };
}

export function adminNotificationEmail(params: {
  name: string;
  email: string;
  subject: string;
  message: string;
  referenceId: string;
  submittedAt: string;
}) {
  const { name, email, subject, message, referenceId, submittedAt } = params;
  const row = (label: string, value: string) => `
    <tr>
      <td style="padding:10px 0;border-bottom:1px solid #1e2733;color:#7c8794;font-size:13px;width:120px;vertical-align:top;">${label}</td>
      <td style="padding:10px 0;border-bottom:1px solid #1e2733;color:#f4f7fb;font-size:14px;vertical-align:top;">${value}</td>
    </tr>`;
  const body = `
    <p style="margin:0 0 16px;color:#f4f7fb;font-size:17px;font-weight:600;">New Contact Form Submission</p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:16px;">
      ${row("Reference ID", `<span style="color:#00e0a4;font-family:'SFMono-Regular',Consolas,monospace;">${referenceId}</span>`)}
      ${row("Name", escapeHtml(name))}
      ${row("Email", `<a href="mailto:${escapeHtml(email)}" style="color:#00e0a4;text-decoration:none;">${escapeHtml(email)}</a>`)}
      ${row("Subject", escapeHtml(subject))}
      ${row("Date &amp; Time", submittedAt)}
    </table>
    <div style="font-size:11px;text-transform:uppercase;letter-spacing:1px;color:#7c8794;margin-bottom:6px;">Message</div>
    <div style="background:#151b24;border:1px solid #1e2733;border-radius:10px;padding:16px;color:#d8dee6;white-space:pre-wrap;">${escapeHtml(message)}</div>
    <p style="margin:20px 0 0;font-size:13px;color:#7c8794;">Reply directly to this email to respond to ${escapeHtml(name)} — Reply-To is already set to their address.</p>
  `;
  return {
    subject: `New Contact Form Submission — ${subject} [${referenceId}]`,
    html: baseLayout(body),
    text: `New Contact Form Submission\n\nReference ID: ${referenceId}\nName: ${name}\nEmail: ${email}\nSubject: ${subject}\nDate & Time: ${submittedAt}\n\nMessage:\n${message}`,
  };
}
