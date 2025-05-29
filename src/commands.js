import { SheetsService } from './sheets.js';

export class CommandProcessor {
  constructor(sheetsService, spreadsheetId) {
    this.sheets = sheetsService;
    this.spreadsheetId = spreadsheetId;
  }

  async processCommand(instruction) {
    const lowerInstruction = instruction.toLowerCase();
    
    if (lowerInstruction.includes('読み取') || lowerInstruction.includes('取得') || lowerInstruction.includes('read')) {
      return await this.handleReadCommand(instruction);
    }
    
    if (lowerInstruction.includes('書き込') || lowerInstruction.includes('更新') || lowerInstruction.includes('write') || lowerInstruction.includes('update')) {
      return await this.handleWriteCommand(instruction);
    }
    
    if (lowerInstruction.includes('追加') || lowerInstruction.includes('append') || lowerInstruction.includes('add')) {
      return await this.handleAppendCommand(instruction);
    }
    
    if (lowerInstruction.includes('削除') || lowerInstruction.includes('クリア') || lowerInstruction.includes('clear') || lowerInstruction.includes('delete')) {
      return await this.handleClearCommand(instruction);
    }
    
    if (lowerInstruction.includes('シート作成') || lowerInstruction.includes('create sheet')) {
      return await this.handleCreateSheetCommand(instruction);
    }
    
    return { success: false, message: '指示を理解できませんでした。読み取り、書き込み、追加、削除、シート作成などの操作を指定してください。' };
  }

  async handleReadCommand(instruction) {
    const rangeMatch = instruction.match(/[A-Z]+\d+(?::[A-Z]+\d+)?/i);
    if (!rangeMatch) {
      return { success: false, message: '範囲を指定してください（例：A1:B10）' };
    }
    
    try {
      const data = await this.sheets.readRange(this.spreadsheetId, rangeMatch[0]);
      return {
        success: true,
        message: `${rangeMatch[0]}の内容を取得しました`,
        data
      };
    } catch (err) {
      return { success: false, message: `エラー: ${err.message}` };
    }
  }

  async handleWriteCommand(instruction) {
    const rangeMatch = instruction.match(/[A-Z]+\d+(?::[A-Z]+\d+)?/i);
    if (!rangeMatch) {
      return { success: false, message: '範囲を指定してください（例：A1）' };
    }
    
    const valueMatch = instruction.match(/[「"'](.+?)[」"']/);
    if (!valueMatch) {
      return { success: false, message: '値を「」または""で囲んで指定してください' };
    }
    
    try {
      const values = [[valueMatch[1]]];
      await this.sheets.writeRange(this.spreadsheetId, rangeMatch[0], values);
      return {
        success: true,
        message: `${rangeMatch[0]}に"${valueMatch[1]}"を書き込みました`
      };
    } catch (err) {
      return { success: false, message: `エラー: ${err.message}` };
    }
  }

  async handleAppendCommand(instruction) {
    const sheetMatch = instruction.match(/シート[：:]?\s*([^\s]+)/);
    const range = sheetMatch ? `${sheetMatch[1]}!A:A` : 'A:A';
    
    const valueMatch = instruction.match(/[「"'](.+?)[」"']/);
    if (!valueMatch) {
      return { success: false, message: '追加する値を「」または""で囲んで指定してください' };
    }
    
    try {
      const values = valueMatch[1].split(/[,、]/).map(v => [v.trim()]);
      await this.sheets.appendRows(this.spreadsheetId, range, values);
      return {
        success: true,
        message: `${values.length}行を追加しました`
      };
    } catch (err) {
      return { success: false, message: `エラー: ${err.message}` };
    }
  }

  async handleClearCommand(instruction) {
    const rangeMatch = instruction.match(/[A-Z]+\d+(?::[A-Z]+\d+)?/i);
    if (!rangeMatch) {
      return { success: false, message: '削除する範囲を指定してください（例：A1:B10）' };
    }
    
    try {
      await this.sheets.clearRange(this.spreadsheetId, rangeMatch[0]);
      return {
        success: true,
        message: `${rangeMatch[0]}の内容を削除しました`
      };
    } catch (err) {
      return { success: false, message: `エラー: ${err.message}` };
    }
  }

  async handleCreateSheetCommand(instruction) {
    const nameMatch = instruction.match(/[「"'](.+?)[」"']/);
    if (!nameMatch) {
      return { success: false, message: 'シート名を「」または""で囲んで指定してください' };
    }
    
    try {
      await this.sheets.createSheet(this.spreadsheetId, nameMatch[1]);
      return {
        success: true,
        message: `シート"${nameMatch[1]}"を作成しました`
      };
    } catch (err) {
      return { success: false, message: `エラー: ${err.message}` };
    }
  }
}