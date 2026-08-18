# linter・formatter導入（oxlint・Prettier・stylelint・markdownlint・PostCSS）

- 日付: 2026-09-18
- 分類: ツール設定
- 完了: [ ]
- Notion: https://app.notion.com/3a100b59eb1581e78e1ccb6e9b2a4d53

---

## この回でやること

linter/formatterの役割を知り、自分のプロジェクトに一式導入して「保存すれば整う・壊れたらすぐ気づく」環境を作る。

## 導入するツール

- [oxlint](https://oxc.rs/docs/guide/usage/linter.html) — JavaScriptのlint
- [Prettier](https://prettier.io/) — コード整形（format on save）
- [stylelint](https://stylelint.io/) — CSSのlint
- [markdownlint](https://github.com/DavidAnson/markdownlint) — README等Markdownのlint
- [PostCSS](https://postcss.org/) — CSS変換の土台（autoprefixerなど。ViteはPostCSS内蔵なので設定ファイルの書き方を知る）

## 手順

### 1. lintとformatの違いを知る

それぞれのツールが何を守ってくれるかを押さえる。

### 2. Viteプロジェクトにツールを順に導入する

同日に作ったViteプロジェクトに、上記のツールを順に導入する。

### 3. npm scriptsに `lint` `format` を登録する

### 4. Cursorでformat on saveを設定する

### 5. PostCSS（autoprefixer）の設定ファイルを書く

### 6. わざとエラーを書いて直す練習をする

## ヒント

- 設定ファイルをリポジトリで共有すれば、チーム全員が同じルールでコードを書ける（チーム開発の視点）

## AI導入用プロンプト

VS Code（Copilot）のエージェントモードに貼り付けて、一式を導入させるプロンプト。

```
このViteプロジェクトに、以下の開発ツール一式を導入して設定してください。

対象ツール:
- oxlint（JavaScriptのlint）
- Prettier（フォーマッター）
- stylelint + stylelint-config-standard（CSSのlint）
- markdownlint-cli2（Markdownのlint）
- PostCSS + autoprefixer（CSSのベンダープレフィックス自動付与）

要件:
1. 必要なパッケージはすべて devDependencies に追加する
2. 各ツールの設定ファイルをプロジェクト直下に作成する（一般的な推奨設定でよい）
3. Prettierと各linterのルールが競合しないように設定する
4. package.json の scripts に以下を追加する:
   - "lint:js" / "lint:css" / "lint:md": それぞれのlintを個別実行
   - "lint": 上記3つをまとめて実行
   - "format": Prettierで全ファイルを整形
5. .vscode/settings.json を作成し、ファイル保存時にPrettierで自動整形される設定を入れる
6. 既存コードにlintエラーがあれば修正する
7. npm run lint と npm run format が正常終了することを確認する

最後に、追加・変更したファイルの一覧と、それぞれの設定が何をしているかを
プログラミング初心者向けに説明してください。
```

### プロンプトの使い方（おすすめ）

1. まず**手作業で1〜2ツール**（oxlint・Prettier）を入れて、設定ファイルの意味を理解する
2. 残り（stylelint・markdownlint・PostCSS）は上のプロンプトで**AIに一括導入**させ、生成された設定ファイルを読んで答え合わせする
3. 「手で入れると仕組みがわかる／AIに任せると速い。ただしAIの出力は読んで判断する」という使い分けを体感する

### 補足プロンプト（レビュー用）

導入後に設定内容を確認したいとき:

```
このプロジェクトのlint/format関連の設定ファイルをすべて読んで、
それぞれの役割と、変更するとどうなるかを初心者向けに説明してください。
```

## 宿題

- lintエラーゼロの状態にしてpushしてくる
- READMEに自分のプロジェクトのセットアップ手順を書いてくる
