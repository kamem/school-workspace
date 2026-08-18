# Copilotカスタマイズ（instructions・Agent Skills）

- 日付: 2026-09-04
- 分類: AI・MCP
- 完了: [ ]
- Notion: https://app.notion.com/3a300b59eb15814fb7e5ca29db73742b

---

## この回でやること

Copilotに「このプロジェクトのルール」を覚えさせる仕組みを知り、指示書ファイル（copilot-instructions.md）を自分のリポジトリに作る。指示書をリポジトリに置けばチーム全員（クラス全員）に同じ設定が配られることを体験する。

## 手順

### 1. カスタマイズ手段の全体像を知る

Copilotはデフォルトではプロジェクトのルールを知らない → 指示書で教える、という発想を押さえる。

| ファイル | 役割 |
| --- | --- |
| `.github/copilot-instructions.md` | リポジトリ全体に常時適用される指示書（ClaudeのCLAUDE.md相当） |
| `.github/instructions/*.instructions.md` | `applyTo`でファイルパターン別に適用する指示 |
| `.github/prompts/*.prompt.md` | `/名前` で手動呼び出しする定型プロンプト |
| `.github/skills/<名前>/SKILL.md` | 質問内容にマッチしたら自動で読み込まれるスキル（手順書＋スクリプト同梱可） |
| `AGENTS.md` | ツール横断のオープン標準（Copilotも対応） |

参考: [VS Code: Copilot customization](https://code.visualstudio.com/docs/copilot/copilot-customization) / [VS Code: Agent Skills](https://code.visualstudio.com/docs/agent-customization/agent-skills) / [GitHub Docs: About agent skills](https://docs.github.com/en/copilot/concepts/agents/about-agent-skills)

### 2. `.github/copilot-instructions.md` を作る

自分のリポジトリに指示書を作る（例: 「このプロジェクトはTypeScriptを使う」「コメントは日本語で」など）。

### 3. 効果を確認する

同じ質問を指示書の有無で比べてみる。

### 4. Agent Skillsを知る

授業で使ってきた「AI導入用プロンプト」を `.github/skills/` のSKILL.mdにすると、貼り付け不要の自動発動に進化する。

## ヒント

- 「毎回同じことをAIに説明しているなら、それはファイルに書いてリポジトリに置く」——lint設定ファイルの共有（単位2）と同じ思想
- SKILL.mdはオープン標準で、Claude・Copilotなどツールをまたいで使える（置き場所が違うだけ）

## スキル集・参考リンク

### 公式（企業がメンテナンス）

- [anthropics/skills](https://github.com/anthropics/skills) — **Anthropic公式**のスキル集（17スキル）。デザイン関連が充実:
  - `frontend-design` — 「AIが作るページはどれも同じ見た目（Inter・紫グラデ・角丸カード）」問題への対策スキル。デザイン差別化の考え方が学べる
  - `canvas-design` — デザイン哲学を先に定義してからビジュアルを作る二段階ワークフロー
  - `brand-guidelines` — ブランドカラー・タイポグラフィを成果物に適用する見本（自分のブログのブランドスキルを作る際の雛形になる）
  - `webapp-testing` — Playwrightでのフロントエンド検証ツールキット
- [vercel-labs/agent-skills](https://github.com/vercel-labs/agent-skills) — **Vercel公式**。Next.js/React系のベストプラクティス集で、授業のNextフェーズと相性が良い（[公式ドキュメント](https://vercel.com/docs/agent-resources/skills)）

### 著名個人・コミュニティ製（公式ではないが高品質）

- [emilkowalski/skills](https://github.com/emilkowalski/skills) — Vercel/Linearで活躍した著名デザインエンジニアEmil Kowalskiの個人スキル集（**Apple公式ではない**）。`apple-design` はWWDCのデザイントークから17原則をWeb向けに蒸留したもの。`improve-animations` / `animation-vocabulary` などアニメーション系も充実
- [ehmo/platform-design-skills](https://github.com/ehmo/platform-design-skills) — Apple HIG・Material Design 3・**WCAG 2.2** の300以上のルール集。アクセシビリティレビューに使える

### 使うときの注意

- 公式以外は品質がまちまち・基本英語。**導入する前にSKILL.mdの中身を読んで選ぶ**
- 試し方の例: 同じブログ画面を `apple-design` と Material Design 系スキルでそれぞれレビューさせると、デザイン思想の違いがわかる（単位6のデザインシステム比較とつながる）

### frontend-design スキル導入用プロンプト

VS Code（Copilot）のエージェントモードに貼り付けて使う:

```
Anthropic公式のスキル集から frontend-design スキルをこのプロジェクトに導入してください。

手順:
1. https://github.com/anthropics/skills を一時ディレクトリに shallow clone する
   （git clone --depth 1）
2. その中の skills/frontend-design ディレクトリ一式を、
   このリポジトリの .github/skills/frontend-design/ にコピーする
3. SKILL.md の frontmatter（name / description）が正しく読める状態か確認する
4. 一時ディレクトリを削除する
5. LICENSEファイルがあれば、ライセンス上の注意点があるか教えてください

導入後、以下を日本語で説明してください:
- このスキルが何をするものか（SKILL.md本文の要約）
- どんな指示をしたときに発動するか、発動させる質問の例を3つ
- このスキルが「やめさせようとしている定番の見た目」は何か
```

**導入後の確認**: スキル導入の前後で「ブログのトップページのデザインを提案して」と同じ指示を出し、生成されるデザインを見比べる——「Inter・紫グラデ・角丸カード」の定番から抜け出せているかを確認すると、スキルの効果が一目でわかる。

## 宿題

- 自分のリポジトリに copilot-instructions.md を書いてpushしてくる
