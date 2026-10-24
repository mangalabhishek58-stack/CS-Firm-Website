const nodemailer = require('nodemailer');

/**
 * Email notifications for new enquiries, sent over SMTP.
 *
 * Works with any SMTP provider (Gmail, Zoho, Outlook, Resend, SendGrid...).
 * All settings come from environment variables - see .env.example.
 * Credentials must never be hard-coded or exposed to the frontend.
 */

const REQUIRED_SETTINGS = ['SMTP_HOST', 'SMTP_USER', 'SMTP_PASS', 'EMAIL_FROM', 'ENQUIRY_NOTIFY_TO'];

let transporter = null;

function isEmailConfigured() {
  return REQUIRED_SETTINGS.every((key) => Boolean(process.env[key]?.trim()));
}

function getTransporter() {
  if (!transporter) {
    const port = Number(process.env.SMTP_PORT) || 465;
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port,
      // Port 465 uses TLS from the start; 587 upgrades with STARTTLS.
      secure: process.env.SMTP_SECURE ? process.env.SMTP_SECURE === 'true' : port === 465,
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
      // Fail fast so the visitor is not left waiting on a slow mail server.
      connectionTimeout: 10000,
      greetingTimeout: 10000,
      socketTimeout: 15000,
    });
  }
  return transporter;
}

// Lets tests swap in a fake transport.
function setTransporter(customTransporter) {
  transporter = customTransporter;
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function singleLine(value) {
  return String(value).replace(/[\r\n]+/g, ' ').trim();
}

function buildEnquiryEmail(enquiry, receivedAt = new Date()) {
  const received = receivedAt.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', dateStyle: 'medium', timeStyle: 'short' });
  const phone = enquiry.phone || 'Not provided';

  const rows = [
    ['Name', enquiry.name],
    ['Email', enquiry.email],
    ['Phone', phone],
    ['Service', enquiry.service],
    ['Received', `${received} IST`],
  ];

  const text = [
    'New enquiry from the website',
    '',
    ...rows.map(([label, value]) => `${label}: ${value}`),
    '',
    'Message:',
    enquiry.message,
    '',
    'Reply to this email to respond to the visitor directly.',
  ].join('\n');

  const html = `
    <div style="font-family:Arial,Helvetica,sans-serif;color:#1c2733;max-width:640px">
      <h2 style="color:#12304f;margin:0 0 16px">New enquiry from the website</h2>
      <table cellpadding="8" cellspacing="0" style="border-collapse:collapse;width:100%;font-size:14px">
        ${rows
          .map(
            ([label, value]) => `
        <tr>
          <th align="left" style="background:#f5f6f3;border:1px solid #dfe3e8;width:120px">${label}</th>
          <td style="border:1px solid #dfe3e8">${escapeHtml(value)}</td>
        </tr>`
          )
          .join('')}
      </table>
      <h3 style="color:#12304f;margin:24px 0 8px">Message</h3>
      <p style="white-space:pre-wrap;font-size:14px;line-height:1.6;margin:0">${escapeHtml(enquiry.message)}</p>
      <p style="color:#4f5d6b;font-size:12px;margin-top:24px">Reply to this email to respond to the visitor directly.</p>
    </div>`;

  return {
    subject: singleLine(`New enquiry: ${enquiry.service} - ${enquiry.name}`),
    text,
    html,
  };
}

/**
 * Sends the enquiry to the firm's inbox.
 * Returns { delivered: true } on success, { delivered: false } when email
 * is not configured, and throws if the provider rejects or times out.
 */
async function sendEnquiryNotification(enquiry) {
  if (!isEmailConfigured()) return { delivered: false };

  const { subject, text, html } = buildEnquiryEmail(enquiry);
  await getTransporter().sendMail({
    from: process.env.EMAIL_FROM,
    to: process.env.ENQUIRY_NOTIFY_TO,
    replyTo: { name: singleLine(enquiry.name), address: enquiry.email },
    subject,
    text,
    html,
  });

  return { delivered: true };
}

module.exports = { sendEnquiryNotification, isEmailConfigured, buildEnquiryEmail, setTransporter };
