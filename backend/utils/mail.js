import { createTransport } from "nodemailer";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Configure transporter
const transporter = createTransport({
  host: "smtp.gmail.com",
  port: 465, // Secure port
  secure: true, // Use SSL
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Email sending function
export async function sendMail(to, subject, text, html) {
  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      text,
      html,
    });

    return info;
  } catch (error) {
    throw new Error("Email sending failed.");
  }
}
