import { authenticate } from '@google-cloud/local-auth';
import { google } from 'googleapis';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';
const serviceAccount = JSON.parse(fs.readFileSync("./credentials.json"));
console.log(serviceAccount)

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

getSheetData().catch(console.error);
