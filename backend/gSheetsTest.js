import { authenticate } from "@google-cloud/local-auth";
import { google } from "googleapis";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import fs from "fs";
const serviceAccount = JSON.parse(fs.readFileSync("./credentials.json"));
console.log(serviceAccount);

async function getSheetData() {
  const auth = new google.auth.GoogleAuth({
    keyfile: serviceAccount,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const data = await auth.getClient();
  const Sheets = google.sheets({ version: "v4", auth: data });
  return { data, Sheets };
}

const auth = new google.auth.GoogleAuth({
  credentials: serviceAccount,
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

const sheets = google.sheets({ version: "v4", auth });

export async function appendToSheet(values) {
  const spreadsheetId = "1FMin3wicuOVHhMtC0DzNo8PnSBHsHHQCEMgvIul4I_k";
  const range = "Sheet1!A:F";

  try {
    const data = await sheets.spreadsheets.values.append({
      spreadsheetId,
      range,
      valueInputOption: "RAW",
      requestBody: {
        values: [values],
      },
    });

    console.log(data);
    return { success: true };
  } catch (error) {
    console.error("Error appending to Google Sheets:", error);
    return { success: false, error };
  }
}

appendToSheet([
  "name",
  "phoneNumber",
  "email",
  "hostelName",
  "eventTitle",
]).then((data) => {
  console.log(data);
});
