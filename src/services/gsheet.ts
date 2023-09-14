import { google } from 'googleapis';
import { JWT } from 'google-auth-library';




const sheets = google.sheets('v4');

async function authenticate() {
    const auth = new google.auth.GoogleAuth({
        keyFile: process.env.GSHEET_API_KEY_PATH,  // Remplacez par le chemin vers votre fichier JSON téléchargé
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const authClient = await auth.getClient();
    // @ts-ignore
    google.options({ auth: authClient });
}

export async function findOrCreateSheet(sheetId: string) {

}
export async function createSheetAndGetURL(title: string) {
    await authenticate();

    // Créer un nouveau Google Sheet
    const response = await sheets.spreadsheets.create({
        requestBody: {
            properties: {
                title: title
            }
        }
    });

    const spreadsheetId = response.data.spreadsheetId;
    const url = `https://docs.google.com/spreadsheets/d/${spreadsheetId}/edit`;
    return {url: url, id: spreadsheetId || ''};
}
async function clearSheet(sheetId: string) {
    await authenticate();
    const sheetsApi = google.sheets({ version: 'v4' });

    await sheetsApi.spreadsheets.values.clear({
        spreadsheetId: sheetId,
        range: 'Sheet1',  // ou le nom de votre feuille
    });
}

export async function appendToSheet(data: any[], sheetId: string) {
    await authenticate();
    await clearSheet(sheetId);

    const spreadsheetId = sheetId;  // Remplacez par l'ID de votre Google Sheet
    const range = 'Sheet1';  // Remplacez par le nom de votre feuille si différent
    const values = data.map(obj => Object.values(obj));
    const keys= Object.keys(data[0]);

    const request = {
        spreadsheetId,
        range,
        valueInputOption: 'RAW',
        insertDataOption: 'INSERT_ROWS',
        resource: {
            values: [keys, ...values]
        }
    };
    return sheets.spreadsheets.values.append(request);
}
