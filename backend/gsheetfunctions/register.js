import { authenticate } from '@google-cloud/local-auth';
import { google } from 'googleapis';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';
const serviceAccount = JSON.parse(fs.readFileSync("./credentials.json"));
// console.log(serviceAccount)

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




const auth = new google.auth.GoogleAuth({
  credentials: serviceAccount,
  scopes: ['https://www.googleapis.com/auth/spreadsheets']
});

const sheets = google.sheets({ version: 'v4', auth });

export async function appendToSheet(values,shetName) {
  const spreadsheetId = '1FMin3wicuOVHhMtC0DzNo8PnSBHsHHQCEMgvIul4I_k'; // Replace with actual Google Sheet ID
  const range = `${shetName}!A:F`; // Adjust as needed
  await ensureSheetExists(auth, spreadsheetId, shetName);




  try {
   const data=  await sheets.spreadsheets.values.append({
      spreadsheetId,
      range,
      valueInputOption: 'RAW',
      requestBody: {
        values: [values]
      }
    });

    // console.log(data)
    return { success: true };
  } catch (error) {
    console.error('Error appending to Google Sheets:', error);
    return { success: false, error };
  }
}

async function ensureSheetExists(auth, spreadsheetId, sheetName) {
  const sheets = google.sheets({ version: 'v4', auth });

  try {
    // Get all sheets
    const spreadsheet = await sheets.spreadsheets.get({ spreadsheetId });
    const sheetExists = spreadsheet.data.sheets.some(
      (s) => s.properties.title === sheetName
    );

    // If sheet exists, return
    if (sheetExists) return;

    // Otherwise, create the sheet
    await sheets.spreadsheets.batchUpdate({
      spreadsheetId,
      resource: {
        requests: [
          {
            addSheet: {
              properties: { title: sheetName },
            },
          },
        ],
      },
      auth,
    });

    console.log(`Sheet '${sheetName}' created successfully.`);
  } catch (error) {
    console.error('Error checking/creating sheet:', error);
  }
}
