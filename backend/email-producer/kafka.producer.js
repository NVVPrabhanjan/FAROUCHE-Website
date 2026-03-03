import axios from "axios";

const EMAIL_SERVICE_URL = process.env.EMAIL_SERVICE_URL || "http://localhost:5001/api/send-email";

export async function publishEmailJob({ type, payload }) {
  try {
    const response = await axios.post(EMAIL_SERVICE_URL, {
      type,
      payload
    });
    
    console.log(`📤 Email job sent to HTTP service [${type}] → ${payload?.to}`);
    return response.data;
  } catch (err) {
    console.error(`❌ HTTP Email publish failed [${type}]:`, err.message);
    if (err.response) {
      console.error("Response data:", err.response.data);
    }
  }
}

// Keeping this exported for backward compatibility if any file calls it, though it does nothing now.
export async function disconnectProducer() {
  console.log("🛑 disconnectProducer called (No-op: Kafka removed, using HTTP).");
}
