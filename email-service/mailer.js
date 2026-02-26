

import nodemailer from "nodemailer";

const EMAIL_USER = process.env.EMAIL_USER?.trim();
const EMAIL_PASS = process.env.EMAIL_PASS?.trim();


let _transporter = null;

function getTransporter() {
  if (!EMAIL_USER || !EMAIL_PASS) {
    throw new Error("❌ Mailer: EMAIL_USER or EMAIL_PASS missing in .env");
  }

  if (!_transporter) {
    _transporter = nodemailer.createTransport({
      service: "gmail",
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

  await transporter.sendMail({
    from: `"Farouche 2026" <${EMAIL_USER}>`,
    to,
    subject,
    html,
  });

  console.log(`✅ Email delivered → ${to}`);
}

export { EMAIL_USER };
