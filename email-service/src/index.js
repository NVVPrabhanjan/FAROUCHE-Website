import "dotenv/config";
import express from "express";
import cors from "cors";
import emailRoutes from "./routes/email.routes.js";

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

console.log("🚀 Farouche Email Service starting...");
console.log(`   Resend from  : ${process.env.EMAIL_FROM || "(not set — check .env)"}`);

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({ status: "alive" });
});

// Routes
app.use("/api", emailRoutes);

const server = app.listen(PORT, () => {
  console.log(`✅ Email service HTTP server running on port ${PORT}`);
});

// Graceful shutdown
async function shutdown(signal) {
  console.log(`\n📴 Received ${signal}. Shutting down gracefully...`);
  server.close(() => {
    console.log("✅ HTTP server closed.");
    process.exit(0);
  });
}

process.on("SIGINT",  () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));
