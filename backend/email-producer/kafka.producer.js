

import { Kafka } from "kafkajs";

const BROKER = process.env.KAFKA_BROKER || "localhost:9092";
const TOPIC  = process.env.KAFKA_TOPIC  || "email-jobs";

const kafka = new Kafka({
  clientId: "farouche-backend",
  brokers: [BROKER],
  retry: { retries: 3 },
});

const producer = kafka.producer();
let _connected = false;


async function ensureConnected() {
  if (!_connected) {
    await producer.connect();
    _connected = true;
    console.log("✅ Kafka producer connected.");
  }
}



export async function publishEmailJob({ type, payload }) {
  try {
    await ensureConnected();

    await producer.send({
      topic: TOPIC,
      messages: [
        {
          key: type,
          value: JSON.stringify({ type, payload }),
        },
      ],
    });

    console.log(`📤 Email job published to Kafka [${type}] → ${payload?.to}`);
  } catch (err) {

    console.error(`❌ Kafka publish failed [${type}]:`, err.message);
  }
}


export async function disconnectProducer() {
  if (_connected) {
    await producer.disconnect();
    _connected = false;
    console.log("🛑 Kafka producer disconnected.");
  }
}
