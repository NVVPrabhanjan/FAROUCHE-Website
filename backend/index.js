import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import eventCreateRoute from "./routes/event.route.js";
import registrationRouter from "./routes/registration.route.js";
import resultsRouter from "./routes/results.route.js"
import bodyParser from "body-parser";
import multer from "multer";
import helmet from "helmet";
import rateLimit from 'express-rate-limit';
import { google } from 'googleapis';
import fs from 'fs';
import os from "os";
import cluster from "cluster";
const serviceAccount = JSON.parse(fs.readFileSync("./credentials.json"));

const totalCPUs = os.cpus().length;
console.log(totalCPUs);

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
  app.use(bodyParser.urlencoded({ extended: true }));

// Middleware
app.use(express.json());
//app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
const corsOptions = {
	origin: ['http://139.59.85.84:3000','https://farouche25.tech','https://farouche-website.vercel.app', 'http://localhost:3000', 'http://localhost:3001'],
  credentials: true,
};
app.use(cors(corsOptions));

//
async function getSheetData() {
  const auth = new google.auth.GoogleAuth({
    keyfile:  serviceAccount,
    scopes: ['https://www.googleapis.com/auth/spreadsheets']
  });

  const data = await auth.getClient();
  const Sheets = google.sheets({ version: 'v4', auth: data });

  return {data, Sheets};
  // You can now proceed to interact with the Sheets API
}

const PORT = process.env.PORT || 4000;

// API Routes
app.use("/api/v1/event", eventCreateRoute);
app.use("/api/v1/registration", registrationRouter);
app.use("/api/v1/results",resultsRouter)
app.get("/", (req, res) => {
  return res.json({ "All Routes are running": "Welcome to farouche" });
});

app.post("/",(req,res)=>{
console.log(req.body)
  return res.json(200)
})



app.listen(PORT,async () => {
  connectDB();
  const {data, Sheets}=await getSheetData()
  console.log("Connected to Google Sheets API");
  console.log(`Server running at port ${PORT}`);
});
}
