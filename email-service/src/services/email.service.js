import { Resend } from "resend";

const RESEND_API_KEY = process.env.RESEND_API_KEY?.trim();
const EMAIL_FROM = process.env.EMAIL_FROM?.trim() || "Farouche 2026 <support@farouche.in>";

if (!RESEND_API_KEY) {
  console.error("❌ Mailer: RESEND_API_KEY missing in .env");
}

const resend = new Resend(RESEND_API_KEY);

console.log("📧 Resend client initialised.");

export async function sendMail({ to, subject, html }) {
  const { data, error } = await resend.emails.send({
    from: EMAIL_FROM,
    to,
    subject,
    html,
  });

  if (error) {
    throw new Error(`Resend error: ${error.message}`);
  }

  console.log(`✅ Email delivered → ${to} [${data.id}]`);
}

// Alias for backward compatibility with email templates
export const EMAIL_USER = EMAIL_FROM;