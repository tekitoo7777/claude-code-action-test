import { google } from 'googleapis';

export class SheetsService {
  constructor(auth) {
    this.sheets = google.sheets({ version: 'v4', auth });
  }

  async readRange(spreadsheetId, range) {
    try {
      const response = await this.sheets.spreadsheets.values.get({
        spreadsheetId,
        range,
      });
      return response.data.values || [];
    } catch (err) {
      console.error('Error reading from sheet:', err);
      throw err;
    }
  }

  async writeRange(spreadsheetId, range, values) {
    try {
      const response = await this.sheets.spreadsheets.values.update({
        spreadsheetId,
        range,
        valueInputOption: 'USER_ENTERED',
        resource: {
          values,
        },
      });
      return response.data;
    } catch (err) {
      console.error('Error writing to sheet:', err);
      throw err;
    }
  }

  async appendRows(spreadsheetId, range, values) {
    try {
      const response = await this.sheets.spreadsheets.values.append({
        spreadsheetId,
        range,
        valueInputOption: 'USER_ENTERED',
        insertDataOption: 'INSERT_ROWS',
        resource: {
          values,
        },
      });
      return response.data;
    } catch (err) {
      console.error('Error appending to sheet:', err);
      throw err;
    }
  }

  async clearRange(spreadsheetId, range) {
    try {
      const response = await this.sheets.spreadsheets.values.clear({
        spreadsheetId,
        range,
      });
      return response.data;
    } catch (err) {
      console.error('Error clearing range:', err);
      throw err;
    }
  }

  async getSheetInfo(spreadsheetId) {
    try {
      const response = await this.sheets.spreadsheets.get({
        spreadsheetId,
      });
      return response.data;
    } catch (err) {
      console.error('Error getting sheet info:', err);
      throw err;
    }
  }

  async createSheet(spreadsheetId, sheetName) {
    try {
      const response = await this.sheets.spreadsheets.batchUpdate({
        spreadsheetId,
        resource: {
          requests: [{
            addSheet: {
              properties: {
                title: sheetName,
              },
            },
          }],
        },
      });
      return response.data;
    } catch (err) {
      console.error('Error creating sheet:', err);
      throw err;
    }
  }

  async deleteSheet(spreadsheetId, sheetId) {
    try {
      const response = await this.sheets.spreadsheets.batchUpdate({
        spreadsheetId,
        resource: {
          requests: [{
            deleteSheet: {
              sheetId,
            },
          }],
        },
      });
      return response.data;
    } catch (err) {
      console.error('Error deleting sheet:', err);
      throw err;
    }
  }
}