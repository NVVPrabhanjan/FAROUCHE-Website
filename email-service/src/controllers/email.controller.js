import { sendMail } from "../services/email.service.js";
import {
  registrationConfirmationTemplate,
  adminCustomEmailTemplate,
} from "../templates/email.templates.js";

export const sendEmailHandler = async (req, res) => {
  const { type, payload } = req.body;

  if (!type || !payload) {
    return res.status(400).json({ error: "Missing 'type' or 'payload' in request body." });
  }

  console.log(`📨 Processing job: [${type}] → ${payload?.to}`);

  try {
    switch (type) {
      case "registration_confirmation": {
        const { to, name, eventTitle, venue, teamMembers = [] } = payload;
        await sendMail({
          to,
          subject: `🎉 Registration Confirmed – ${eventTitle} | Farouche 2026`,
          html: registrationConfirmationTemplate({ name, eventTitle, venue, teamMembers }),
        });
        break;
      }

      case "admin_bulk": {
        const { to, name, subject, message, whatsappLink } = payload;
        await sendMail({
          to,
          subject: subject || "Update from Farouche 2026",
          html: adminCustomEmailTemplate({ name, message, whatsappLink }),
        });
        break;
      }

      default:
        console.warn(`⚠️  Unknown job type received: "${type}" — skipping.`);
        return res.status(400).json({ error: `Unknown job type: ${type}` });
    }

    res.status(200).json({ success: true, message: `Email (${type}) processed successfully.` });
  } catch (err) {
    console.error(`❌ Failed to process job [${type}] for ${payload?.to}:`, err.message);
    res.status(500).json({ success: false, error: err.message });
  }
};
