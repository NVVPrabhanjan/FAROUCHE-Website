

import "dotenv/config";
import { startConsumer, shutdownConsumer } from "./consumer.js";

console.log("🚀 Farouche Email Service starting...");
console.log(`   Kafka broker : ${process.env.KAFKA_BROKER || "localhost:9092"}`);
console.log(`   Topic        : ${process.env.KAFKA_TOPIC  || "email-jobs"}`);
console.log(`   Email user   : ${process.env.EMAIL_USER   || "(not set — check .env)"}`);


startConsumer().catch((err) => {
  console.error("❌ Fatal: Consumer failed to start:", err);
  process.exit(1);
});


async function shutdown(signal) {
  console.log(`\n📴 Received ${signal}. Shutting down gracefully...`);
  await shutdownConsumer();
  process.exit(0);
}

process.on("SIGINT",  () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));
