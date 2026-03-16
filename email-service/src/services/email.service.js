import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";

const AWS_KEY = process.env.AWS_KEY?.trim();
const AWS_SECRET = process.env.AWS_SECRET?.trim();
const EMAIL_USER = process.env.EMAIL_USER?.trim();

let _client = null;

function getClient() {
  if (!AWS_KEY || !AWS_SECRET || !EMAIL_USER) {
    throw new Error("❌ Mailer: AWS_KEY / AWS_SECRET / EMAIL_USER missing in .env");
  }

  if (!_client) {
    _client = new SESClient({
      region: "ap-south-1",
      credentials: {
        accessKeyId: AWS_KEY,
        secretAccessKey: AWS_SECRET,
      },
    });

    console.log("📧 AWS SES client initialised.");
  }

  return _client;
}

export async function sendMail({ to, subject, html }) {
  const client = getClient();

  const command = new SendEmailCommand({
    Source: `"Farouche 2026" <${EMAIL_USER}>`,
    Destination: {
      ToAddresses: [to],
    },
    Message: {
      Subject: { Data: subject },
      Body: {
        Html: { Data: html },
      },
    },
  });

  await client.send(command);

  console.log(`✅ Email delivered → ${to}`);
}

export { EMAIL_USER };