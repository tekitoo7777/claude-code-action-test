const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: 'こんにちは！Claude Code Action テストプロジェクトへようこそ！',
    timestamp: new Date().toISOString(),
    status: 'success'
  });
});

app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

app.get('/api/test', (req, res) => {
  res.json({
    message: 'API テストエンドポイント',
    data: {
      project: 'claude-code-action-test',
      framework: 'Express.js',
      version: '1.0.0'
    }
  });
});

app.listen(port, () => {
  console.log(`🚀 サーバーがポート ${port} で起動しました`);
  console.log(`📱 アクセス: http://localhost:${port}`);
});