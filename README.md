# Claude Sheets Integration - Google スプレッドシート連携システム

このプロジェクトは、Claudeに日本語で指示を出してGoogle スプレッドシートを編集できるシステムです。

## 機能

- スプレッドシートのデータ読み取り
- セルへのデータ書き込み
- 行の追加
- 範囲のクリア（削除）
- 新しいシートの作成

## セットアップ

詳細なセットアップ手順は[SETUP.md](./SETUP.md)を参照してください。

### クイックスタート

1. Google Cloud ConsoleでSheets APIを有効化
2. OAuth認証情報を作成し、`credentials.json`として保存
3. 依存関係をインストール: `npm install`
4. 環境変数を設定: `cp .env.example .env` して編集
5. 認証を実行: `node src/setup.js`
6. サーバー起動: `npm start`

## 使い方

サーバー起動後、以下のように指示を送信します：

```bash
# データの読み取り
curl -X POST http://localhost:3000/command \
  -H "Content-Type: application/json" \
  -d '{"instruction": "A1:B10の内容を読み取って"}'

# セルへの書き込み
curl -X POST http://localhost:3000/command \
  -H "Content-Type: application/json" \
  -d '{"instruction": "A1に「Hello World」を書き込んで"}'
```

その他の使用例は[examples/example-requests.md](./examples/example-requests.md)を参照してください。

## プロジェクト構成

```
├── src/
│   ├── index.js      # メインサーバー
│   ├── auth.js       # Google認証処理
│   ├── sheets.js     # Sheets API操作
│   ├── commands.js   # コマンド処理
│   └── setup.js      # 初期セットアップ
├── examples/         # 使用例
├── .env.example      # 環境変数テンプレート
└── SETUP.md          # セットアップガイド
```

## ライセンス

MIT
