

import { Kafka } from "kafkajs";
import { sendMail } from "./mailer.js";
import {
  registrationConfirmationTemplate,
  adminCustomEmailTemplate,
} from "./templates/email.templates.js";

const BROKER     = process.env.KAFKA_BROKER    || "localhost:9092";
const GROUP_ID   = process.env.KAFKA_GROUP_ID  || "email-service-group";
const TOPIC      = process.env.KAFKA_TOPIC     || "email-jobs";


const kafka = new Kafka({
  clientId: "email-service",
  brokers: [BROKER],
  retry: {
    initialRetryTime: 300,
    retries: 8,
  },
});

const consumer = kafka.consumer({ groupId: GROUP_ID });


async function processJob(type, payload) {
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
  }
}


export async function startConsumer() {
  await consumer.connect();
  console.log("✅ Kafka Consumer connected.");

  await consumer.subscribe({ topic: TOPIC, fromBeginning: false });
  console.log(`📬 Listening on topic: "${TOPIC}" | group: "${GROUP_ID}"`);

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const raw = message.value?.toString();
      if (!raw) return;

      let job;
      try {
        job = JSON.parse(raw);
      } catch {
        console.error("❌ Failed to parse Kafka message — not valid JSON:", raw);
        return;
      }

      const { type, payload } = job;
      console.log(`📨 Processing job: [${type}] → ${payload?.to}`);

      try {
        await processJob(type, payload);
      } catch (err) {

        console.error(
          `❌ Failed to process job [${type}] for ${payload?.to}:`,
          err.message
        );
      }
    },
  });
}


export async function shutdownConsumer() {
  console.log("🛑 Shutting down Kafka consumer...");
  await consumer.disconnect();
  console.log("✅ Kafka consumer disconnected.");
}
