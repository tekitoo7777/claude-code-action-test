# Claude Code Action テストプロジェクト

Node.js と Express.js を使用したシンプルな Web API サーバーです。

## 📋 プロジェクト概要

このプロジェクトは Claude Code Action の動作テストを目的とした Node.js アプリケーションです。Express.js フレームワークを使用して、基本的な REST API エンドポイントを提供します。

## 🚀 使用方法

### 1. 依存関係のインストール

```bash
npm install
```

### 2. アプリケーションの起動

```bash
npm start
```

または開発モードで起動：

```bash
npm run dev
```

### 3. アクセス

サーバーが起動したら、以下の URL にアクセスできます：

- **メイン**: http://localhost:3000/
- **ヘルスチェック**: http://localhost:3000/health
- **API テスト**: http://localhost:3000/api/test

## 📡 API エンドポイント

| エンドポイント | メソッド | 説明 |
|---|---|---|
| `/` | GET | ウェルカムメッセージを返す |
| `/health` | GET | サーバーの健康状態を確認 |
| `/api/test` | GET | API テストエンドポイント |

## 🛠 技術スタック

- **Node.js**: JavaScript ランタイム
- **Express.js**: Web アプリケーションフレームワーク

## 📝 ライセンス

MIT License
