import nodemailer from "nodemailer";

const EMAIL_USER = process.env.EMAIL_USER?.trim();
const EMAIL_PASS = process.env.EMAIL_PASS?.trim();
const SMTP_HOST = process.env.SMTP_HOST?.trim() || "smtp.gmail.com";
const SMTP_PORT = process.env.SMTP_PORT?.trim() || 465;

let _transporter = null;

function getTransporter() {
  if (!EMAIL_USER || !EMAIL_PASS) {
    throw new Error("❌ Mailer: EMAIL_USER / EMAIL_PASS missing in .env");
  }

  if (!_transporter) {
    _transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT),
      secure: Number(SMTP_PORT) === 465, // true for 465, false for other ports
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
      },
    });

    console.log("📧 Nodemailer transporter initialised.");
  }

  return _transporter;
}

export async function sendMail({ to, subject, html }) {
  const transporter = getTransporter();

  const mailOptions = {
    from: `"Farouche 2026" <${EMAIL_USER}>`,
    to,
    subject,
    html,
  };

  const info = await transporter.sendMail(mailOptions);

  console.log(`✅ Email delivered → ${to} [${info.messageId}]`);
}

export { EMAIL_USER };