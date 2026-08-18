# MCP入門・セットアップ

- 日付: 2026-09-04
- 分類: AI・MCP
- 完了: [ ]
- Notion: https://app.notion.com/3a100b59eb158129bb60c9d4a7ed45d0

---

## ねらい

MCP（Model Context Protocol）とは何かを理解し、AIが外部ツールを操作する仕組みを体験する。

## 進め方（前半）

- MCPとは: AIとツール（Notion・Figma・ブラウザなど）をつなぐ共通規格
- VS Code（GitHub Copilot）へのMCPサーバー設定（下記の設定手順参照）
- 動作確認

---

## VS Code（GitHub Copilot）でのMCP設定手順

前提: VS Code最新版＋GitHub Copilot拡張機能。MCPツールはCopilot Chatの**エージェントモード**から使う。

### 設定ファイルの場所

- プロジェクトごと: リポジトリ直下に `.vscode/mcp.json` を作る（**設定をGitで共有できるので授業はこちら推奨**）
- 個人全体: コマンドパレット（Cmd+Shift+P）→「MCP: Open User Configuration」
- コマンドパレット「MCP: Add Server」から対話形式でも追加できる

### 3つまとめて設定する例（.vscode/mcp.json）

```json
{
  "servers": {
    "playwright": {
      "command": "npx",
      "args": ["@playwright/mcp@latest"]
    },
    "notion": {
      "type": "http",
      "url": "https://mcp.notion.com/mcp"
    },
    "figma": {
      "type": "http",
      "url": "https://mcp.figma.com/mcp"
    }
  }
}
```

### Playwright MCP

- `npx @playwright/mcp@latest` をVS Codeが自動起動する（上記のとおりcommand形式）
- 事前にNode.jsが入っていればOK。初回はブラウザのダウンロードが走るので少し待つ
- 参考: [Playwright MCP（GitHub）](https://github.com/microsoft/playwright-mcp)

### Notion MCP

- Notion公式のリモートサーバー `https://mcp.notion.com/mcp` を使う
- VS Codeでサーバーを起動すると、ブラウザが開いてNotionのOAuth認証 → アクセスを許可するページ/ワークスペースを選ぶ
- トークンの手動発行は不要（OAuthで完結）
- 参考: [Notion MCP公式ドキュメント](https://developers.notion.com/docs/mcp)

### Figma MCP

Figma公式の**リモートサーバー** `https://mcp.figma.com/mcp` を使う（公式推奨・機能が最も広い）:

- 起動するとブラウザでFigmaのOAuth認証（Notionと同じ流れ、トークン発行不要）
- デザインの読み取り（デザイン→コード生成）に加え、**use_figmaツールでキャンバスを直接操作（コード→デザイン生成）もできる**（ベータ・現在無料だが将来有料化予定。授業直前に条件要確認）
- デスクトップ版 `http://127.0.0.1:3845/mcp`（アプリの設定でDev Mode MCPサーバーをON）もあるが、組織向けの位置づけなので授業はリモート版で統一
- プランによる制限があるため、学生のFigmaプラン（教育プラン）で使えるか事前に講師PCで検証しておく

参考: [Figma MCPサーバー公式ガイド](https://help.figma.com/hc/en-us/articles/32132100833559) / [リモート版セットアップ](https://developers.figma.com/docs/figma-mcp-server/remote-server-installation/)

### 動作確認の手順

1. `.vscode/mcp.json` を保存すると、エディタ上に「起動」ボタンが出る（またはコマンドパレット「MCP: List Servers」→ Start）
2. Copilot Chatを開いてモードを「**Agent**」に切り替える
3. 工具アイコン（Tools）を押して、playwright / notion / figma のツールが並んでいればOK
4. 動作テスト例:
   - Playwright: 「[example.com](http://example.com) を開いてスクリーンショットを撮って」
   - Notion: 「自分のNotionに今日の日付でメモページを作って」
   - Figma: フレームを選択した状態で「これをHTMLとCSSにして」

### つまずきポイント

- mcp.jsonの**JSONの書き間違い**（カンマ・括弧）が一番多い。保存時のエラー表示を見る
- Figmaの読み取り系ツールは「今どのファイル・フレームを対象にするか」で迷いやすい。ファイルのURLをプロンプトに貼る運用が確実
- 学校PCのプロキシ/セキュリティ設定で `npx` のダウンロードが止まることがある → 事前に講師PCで検証しておく

---

## MCP登録用プロンプト

VS Code（Copilot）のエージェントモードに貼り付けて、設定ファイルを作らせる:

```
このプロジェクトにMCPサーバーの設定を追加してください。

要件:
1. .vscode/mcp.json を作成する
2. 以下の3つのサーバーを登録する:
   - playwright: コマンド起動で npx @playwright/mcp@latest
   - notion: HTTP接続で https://mcp.notion.com/mcp
   - figma: HTTP接続で https://mcp.figma.com/mcp
3. JSONの構文が正しいことを確認する

作成後、以下を初心者向けに説明してください:
- それぞれのサーバーがどんなことをできるようにするのか
- 各サーバーを起動する方法と、NotionとFigmaのOAuth認証で何が起きるか
- ツールが使えるようになったかをCopilot Chatで確認する手順
```

### 補足

- 設定ファイルを作った後の**サーバー起動とOAuth認証（ブラウザでのログイン許可）は自分の手で行う**——AIに任せられるのはファイル作成まで、認証は本人の操作、という境界も教材になる
- 認証後、Copilot ChatのAgentモードでToolsアイコンを開き、3サーバーのツールが並んでいれば完了（動作テスト例は上記「動作確認の手順」参照）
