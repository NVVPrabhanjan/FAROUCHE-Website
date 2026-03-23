import nodemailer from "nodemailer";

const GMAIL_USER = process.env.GMAIL_USER?.trim();
const GMAIL_CLIENT_ID = process.env.GMAIL_CLIENT_ID?.trim();
const GMAIL_CLIENT_SECRET = process.env.GMAIL_CLIENT_SECRET?.trim();
const GMAIL_REFRESH_TOKEN = process.env.GMAIL_REFRESH_TOKEN?.trim();
const EMAIL_FROM = process.env.EMAIL_FROM?.trim() || `Farouche 2026 <${GMAIL_USER}>`;

if (!GMAIL_USER || !GMAIL_CLIENT_ID || !GMAIL_CLIENT_SECRET || !GMAIL_REFRESH_TOKEN) {
  console.error("❌ Mailer: Gmail OAuth2 credentials missing in .env");
}

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: GMAIL_USER,
    clientId: GMAIL_CLIENT_ID,
    clientSecret: GMAIL_CLIENT_SECRET,
    refreshToken: GMAIL_REFRESH_TOKEN,
  },
});

console.log("📧 Gmail OAuth2 transporter initialised.");

export async function sendMail({ to, subject, html }) {
  const info = await transporter.sendMail({
    from: EMAIL_FROM,
    to,
    subject,
    html,
  });

  console.log(`✅ Email delivered → ${to} [${info.messageId}]`);
}

// Alias for backward compatibility with email templates
export const EMAIL_USER = EMAIL_FROM;