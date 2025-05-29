import express from 'express';
import dotenv from 'dotenv';
import { authorize } from './auth.js';
import { SheetsService } from './sheets.js';
import { CommandProcessor } from './commands.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.text());

const PORT = process.env.PORT || 3000;
const SPREADSHEET_ID = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;

let commandProcessor;

async function initialize() {
  try {
    if (!SPREADSHEET_ID) {
      console.error('エラー: GOOGLE_SHEETS_SPREADSHEET_IDが設定されていません。.envファイルを確認してください。');
      process.exit(1);
    }

    console.log('Google Sheets APIの認証を行っています...');
    const auth = await authorize();
    
    const sheetsService = new SheetsService(auth);
    commandProcessor = new CommandProcessor(sheetsService, SPREADSHEET_ID);
    
    console.log('認証が完了しました！');
    console.log(`スプレッドシートID: ${SPREADSHEET_ID}`);
  } catch (err) {
    console.error('初期化エラー:', err.message);
    console.log('\n=== セットアップ手順 ===');
    console.log('1. Google Cloud Consoleでプロジェクトを作成');
    console.log('2. Google Sheets APIを有効化');
    console.log('3. OAuth 2.0認証情報を作成してcredentials.jsonとして保存');
    console.log('4. src/setup.jsを実行して認証を完了');
    console.log('5. .envファイルにスプレッドシートIDを設定');
    process.exit(1);
  }
}

app.get('/', (req, res) => {
  res.json({
    message: 'Claude Sheets Integration API',
    endpoints: {
      'POST /command': '指示を送信してスプレッドシートを操作',
      'GET /health': 'ヘルスチェック'
    }
  });
});

app.post('/command', async (req, res) => {
  try {
    const instruction = req.body.instruction || req.body;
    if (!instruction) {
      return res.status(400).json({ error: '指示が必要です' });
    }

    const result = await commandProcessor.processCommand(instruction);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok', spreadsheetId: SPREADSHEET_ID });
});

initialize().then(() => {
  app.listen(PORT, () => {
    console.log(`サーバーがポート${PORT}で起動しました`);
    console.log(`http://localhost:${PORT}`);
  });
});