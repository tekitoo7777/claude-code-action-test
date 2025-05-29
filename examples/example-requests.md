# 使用例

## cURLでの使用例

### データの読み取り
```bash
curl -X POST http://localhost:3000/command \
  -H "Content-Type: application/json" \
  -d '{"instruction": "A1:C5の内容を読み取って"}'
```

### セルへの書き込み
```bash
curl -X POST http://localhost:3000/command \
  -H "Content-Type: application/json" \
  -d '{"instruction": "B2に「完了」を書き込んで"}'
```

### 複数行の追加
```bash
curl -X POST http://localhost:3000/command \
  -H "Content-Type: application/json" \
  -d '{"instruction": "「商品A、商品B、商品C」を追加して"}'
```

### 範囲のクリア
```bash
curl -X POST http://localhost:3000/command \
  -H "Content-Type: application/json" \
  -d '{"instruction": "D1:D10を削除して"}'
```

### 新しいシートの作成
```bash
curl -X POST http://localhost:3000/command \
  -H "Content-Type: application/json" \
  -d '{"instruction": "「月次レポート」というシートを作成して"}'
```

## Node.jsでの使用例

```javascript
import fetch from 'node-fetch';

async function sendCommand(instruction) {
  const response = await fetch('http://localhost:3000/command', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ instruction }),
  });
  
  const result = await response.json();
  console.log(result);
}

// 使用例
await sendCommand('A1に「タイトル」を書き込んで');
await sendCommand('A2:A5に「項目1、項目2、項目3、項目4」を追加して');
```