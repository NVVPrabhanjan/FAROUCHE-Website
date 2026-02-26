import { EMAIL_USER } from "../mailer.js";

export function registrationConfirmationTemplate({
  name,
  eventTitle,
  venue,
  teamMembers = [],
}) {
  const teamSection =
    teamMembers.length > 0
      ? `<tr><td style="padding:8px 0;color:#555;font-size:14px;">
           <strong>Team Members:</strong><br/>
           ${teamMembers.map((m) => `• ${m}`).join("<br/>")}
         </td></tr>`
      : "";

  return `
    <div style="font-family:'Segoe UI',Arial,sans-serif;background:#f4f4f8;padding:30px;">
      <div style="max-width:560px;margin:auto;background:#fff;border-radius:12px;
                  overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,0.08);">

        <div style="background:linear-gradient(135deg,#1a1a2e 0%,#16213e 60%,#0f3460 100%);
                    padding:32px 30px;text-align:center;">
          <h1 style="color:#e2b96f;margin:0;font-size:26px;letter-spacing:1px;">FAROUCHE 2026</h1>
          <p style="color:#c0c0d0;margin:6px 0 0;font-size:13px;letter-spacing:2px;">BMSET HOSTEL ANNUAL FEST</p>
        </div>

        <div style="padding:30px;">
          <h2 style="color:#1a1a2e;margin:0 0 16px;font-size:20px;">🎉 Registration Confirmed!</h2>
          <p style="color:#444;font-size:15px;line-height:1.6;margin:0 0 20px;">
            Hi <strong>${name}</strong>,<br/>
            You have successfully registered for <strong>${eventTitle}</strong>.
            We're thrilled to have you on board!
          </p>

          <table cellpadding="0" cellspacing="0"
                 style="width:100%;background:#f9f9fc;border-radius:8px;
                        padding:16px 20px;border-left:4px solid #e2b96f;">
            <tr>
              <td style="padding:8px 0;color:#555;font-size:14px;"><strong>Event:</strong> ${eventTitle}</td>
            </tr>
            <tr>
              <td style="padding:8px 0;color:#555;font-size:14px;"><strong>Venue:</strong> ${venue || "To be announced"}</td>
            </tr>
            ${teamSection}
          </table>

          <p style="color:#666;font-size:13px;margin:24px 0 0;line-height:1.7;">
            Keep an eye on your inbox — we'll send further updates closer to the event date.
          </p>
        </div>

        <div style="background:#f4f4f8;padding:20px 30px;text-align:center;border-top:1px solid #e8e8f0;">
          <p style="color:#888;font-size:12px;margin:0;">
            Questions? <a href="mailto:${EMAIL_USER}" style="color:#0f3460;">${EMAIL_USER}</a>
          </p>
          <p style="color:#aaa;font-size:11px;margin:8px 0 0;">© 2026 Farouche — BMSCT HOSTEL Annual Fest</p>
        </div>
      </div>
    </div>`;
}

export function adminCustomEmailTemplate({ name, message, whatsappLink }) {
  const waButton = whatsappLink
    ? `<p style="margin:20px 0 0;">
         <a href="${whatsappLink}"
            style="display:inline-block;background:#25D366;color:#fff;
                   padding:10px 24px;text-decoration:none;border-radius:6px;
                   font-size:14px;font-weight:600;">
           Join WhatsApp Group
         </a>
       </p>`
    : "";

  return `
    <div style="font-family:'Segoe UI',Arial,sans-serif;background:#f4f4f8;padding:30px;">
      <div style="max-width:560px;margin:auto;background:#fff;border-radius:12px;
                  overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,0.08);">

        <div style="background:linear-gradient(135deg,#1a1a2e 0%,#16213e 60%,#0f3460 100%);
                    padding:32px 30px;text-align:center;">
          <h1 style="color:#e2b96f;margin:0;font-size:26px;letter-spacing:1px;">FAROUCHE 2026</h1>
          <p style="color:#c0c0d0;margin:6px 0 0;font-size:13px;letter-spacing:2px;">BMSET HOSTEL ANNUAL FEST</p>
        </div>

        <div style="padding:30px;">
          <h2 style="color:#1a1a2e;margin:0 0 12px;font-size:18px;">Hello ${name},</h2>
          <p style="color:#444;font-size:15px;line-height:1.7;margin:0;">${message}</p>
          ${waButton}
        </div>

        <div style="background:#f4f4f8;padding:20px 30px;text-align:center;border-top:1px solid #e8e8f0;">
          <p style="color:#888;font-size:12px;margin:0;">
            Best Regards — Farouche 2026 Technical Team<br/>
            <a href="mailto:${EMAIL_USER}" style="color:#0f3460;">${EMAIL_USER}</a>
          </p>
        </div>
      </div>
    </div>`;
}