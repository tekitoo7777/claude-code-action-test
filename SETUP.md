# Google Sheets Claude Integration セットアップガイド

このシステムは、Claudeに指示を出してGoogle スプレッドシートを編集できるようにするものです。

## 前提条件

- Node.js (v14以上)
- Googleアカウント
- 編集権限のあるGoogle スプレッドシート

## セットアップ手順

### 1. Google Cloud Consoleでの設定

1. [Google Cloud Console](https://console.cloud.google.com/)にアクセス
2. 新しいプロジェクトを作成（または既存のプロジェクトを選択）
3. 「APIとサービス」→「ライブラリ」から「Google Sheets API」を検索して有効化

### 2. 認証情報の作成

1. 「APIとサービス」→「認証情報」を開く
2. 「認証情報を作成」→「OAuth クライアント ID」を選択
3. アプリケーションの種類で「デスクトップアプリ」を選択
4. 名前を付けて作成
5. 作成された認証情報をダウンロードし、`credentials.json`として保存

### 3. プロジェクトのセットアップ

```bash
# 依存関係のインストール
npm install

# credentials.jsonをプロジェクトルートに配置
cp /path/to/downloaded/credentials.json .

# 環境変数の設定
cp .env.example .env
```

### 4. .envファイルの編集

`.env`ファイルを開き、スプレッドシートIDを設定：

```
GOOGLE_SHEETS_SPREADSHEET_ID=あなたのスプレッドシートID
```

スプレッドシートIDは、スプレッドシートのURLから取得できます：
`https://docs.google.com/spreadsheets/d/【ここがID】/edit`

### 5. 認証の実行

```bash
node src/setup.js
```

表示されるURLをブラウザで開き、Googleアカウントでログインして認証を許可します。
表示されるコードをコピーして、ターミナルに貼り付けます。

### 6. サーバーの起動

```bash
npm start
```

## 使い方

### APIエンドポイント

サーバーが起動したら、以下のエンドポイントが利用可能になります：

- `POST http://localhost:3000/command` - 指示を送信

### 指示の例

#### 読み取り
```json
{
  "instruction": "A1:B10の内容を読み取って"
}
```

#### 書き込み
```json
{
  "instruction": "A1に「Hello World」を書き込んで"
}
```

#### 行の追加
```json
{
  "instruction": "「田中、鈴木、佐藤」を追加して"
}
```

#### 範囲のクリア
```json
{
  "instruction": "A1:B10を削除して"
}
```

#### シートの作成
```json
{
  "instruction": "「2024年売上」というシートを作成して"
}
```

## トラブルシューティング

### 認証エラーが発生する場合

1. `credentials.json`が正しく配置されているか確認
2. Google Cloud ConsoleでSheets APIが有効になっているか確認
3. `token.json`を削除して再度認証を実行

### スプレッドシートにアクセスできない場合

1. スプレッドシートIDが正しいか確認
2. 認証したGoogleアカウントにスプレッドシートへのアクセス権限があるか確認

## セキュリティに関する注意

- `credentials.json`と`token.json`は機密情報を含むため、Gitにコミットしないでください
- 本番環境では適切なアクセス制御を実装してください