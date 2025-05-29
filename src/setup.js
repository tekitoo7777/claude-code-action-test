import readline from 'readline';
import { getAuthUrl, getNewToken } from './auth.js';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function setup() {
  console.log('=== Google Sheets API 認証セットアップ ===\n');
  
  try {
    const authUrl = await getAuthUrl();
    console.log('以下のURLをブラウザで開いて認証を行ってください:');
    console.log(authUrl);
    console.log('\n');
    
    rl.question('認証後に表示されるコードを入力してください: ', async (code) => {
      try {
        await getNewToken(code);
        console.log('\n認証が完了しました！');
        console.log('次は.envファイルにスプレッドシートIDを設定してください。');
        rl.close();
      } catch (err) {
        console.error('認証エラー:', err.message);
        rl.close();
      }
    });
  } catch (err) {
    console.error('セットアップエラー:', err.message);
    console.log('\ncredentials.jsonファイルが存在することを確認してください。');
    rl.close();
  }
}

setup();