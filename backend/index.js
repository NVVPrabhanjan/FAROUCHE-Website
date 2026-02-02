import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import connectDB from "./utils/db.js";
import eventCreateRoute from "./routes/event.route.js";
import registrationRouter from "./routes/registration.route.js";
import resultsRouter from "./routes/results.route.js";
// import bodyParser from "body-parser"; // Removed unused import
// import { google } from "googleapis"; // Moved to service
// import fs from "fs"; // Moved to service
import os from "os";
import cluster from "cluster";
import { getSheetData } from "./services/googleSheet.service.js"; // Import new service

const totalCPUs = os.cpus().length;
console.log(`Total CPUs: ${totalCPUs}`);

if (cluster.isPrimary) {
  // Fork workers
  for (let i = 0; i < totalCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died. Forking a new one.`);
    cluster.fork();
  });
} else {
  dotenv.config({});
  const app = express();
  
  // Security Middleware
  app.use(helmet());
  
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
    standardHeaders: 'draft-7', 
    legacyHeaders: false, 
  });
  app.use(limiter);

  // app.use(bodyParser.urlencoded({ extended: true })); // Express has built-in body parser now
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(cookieParser());

  const corsOptions = {
    origin: [
      "http://139.59.85.84:3000",
      "https://farouche25.tech",
      "https://farouche-website.vercel.app",
      "http://localhost:3000",
      "http://localhost:3001",
    ],
    credentials: true,
  };
  app.use(cors(corsOptions));
  
  // Simple Request Logger
  app.use((req, res, next) => {
      console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
      next();
  });

  const PORT = process.env.PORT || 4000;

  // API Routes
  app.use("/api/v1/event", eventCreateRoute);
  app.use("/api/v1/registration", registrationRouter);
  app.use("/api/v1/results", resultsRouter);
  
  app.get("/", (req, res) => {
    return res.json({ "All Routes are running": "Welcome to farouche" });
  });

  // Removed generic post handler unless specifically needed
  // app.post("/", (req, res) => { ... });

  app.listen(PORT, async () => {
    await connectDB();
    try {
        await getSheetData();
        console.log("Connected to Google Sheets API via Service");
    } catch (err) {
        console.error("Failed to connect to Google Sheets:", err.message);
    }
    console.log(`Server running at port ${PORT}`);
  });
}
