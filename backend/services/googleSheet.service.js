import { google } from "googleapis";
import fs from "fs";
import path from "path";

// Load credentials safely
const credentialsPath = path.resolve("./credentials.json");
let serviceAccount;

try {
  if (fs.existsSync(credentialsPath)) {
    serviceAccount = JSON.parse(fs.readFileSync(credentialsPath));
  } else {
    console.warn("credentials.json not found. Google Sheets functionality may not work.");
  }
} catch (error) {
  console.error("Error loading credentials.json:", error);
}

export async function getSheetData() {
  if (!serviceAccount) {
    throw new Error("Service account credentials are missing.");
  }

  const auth = new google.auth.GoogleAuth({
    credentials: serviceAccount,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const client = await auth.getClient();
  const sheets = google.sheets({ version: "v4", auth: client });

  return { client, sheets };
}
