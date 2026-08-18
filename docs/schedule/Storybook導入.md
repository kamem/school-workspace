# Storybook導入（コンポーネントカタログ）

- 日付: 未定
- 分類: ツール設定
- 完了: [ ]
- Notion: https://app.notion.com/3a400b59eb15810a8581d9387e254754

---

## この回でやること

Xeory移行で作ったコンポーネントを[Storybook](https://storybook.js.org/)でカタログ化する。「コンポーネントをページから切り離して一覧・確認できる」体験を通じて、部品化の価値を実感する。

## 手順

### 1. Storybookとは何かを知る

Storybook＝コンポーネントのカタログ。実務ではデザイナーとの共通言語になる。実在企業の公開Storybookを見て回る（SmartHRなど。単位6で見るデザインシステムの実体がこれ）。

### 2. Storybookを導入する

`npx storybook init` で導入する（Viteプロジェクトを自動検出してくれる）。

### 3. ArticleCardのストーリーを作る

`ArticleCard.stories.tsx` を作り、通常・タグあり・サムネイルなしなどのバリエーションをストーリーとして登録する。

### 4. ControlsでpropsをGUIから動かす

型定義がそのまま操作パネルになることを確認する。

### 5. 他のコンポーネントもストーリー化する

Header・Sidebarなど、残りのコンポーネントにもストーリーを作る。

### 6. npm scriptsを確認してpush

`storybook` / `build-storybook` の2つのscriptsを確認し、GitHubへpushする。

## 使いこなしのヒント

- 「ページに組み込まないと見た目を確認できない」状態からの解放が価値。propsのバリエーションを網羅的に確認できる
- Controlsは単位3で書いたTypeScriptの型定義から自動生成される——「型を書くと道具が賢くなる」の実例
- デザイン志望との接点: Storybookはデザイナーが実装を確認する場。ポートフォリオに「自分のStorybook」があると強い
- 次のVitest回とのつながり: ストーリー＝「コンポーネントの状態の列挙」。テストの発想（このpropsのときこう表示される）と同じ思考

## AI導入用プロンプト

```javascript
このVite + React + TypeScriptプロジェクトにStorybookを導入してください。

要件:
1. npx storybook init を使い、Vite構成に合ったセットアップを行う
2. ArticleCardコンポーネントのストーリーを作成する。propsのバリエーション
   （通常 / サムネイルなし など）を最低2つ登録する
3. propsの型定義からControlsが動くことを確認する
4. npm run storybook で起動できることを確認する

最後に、ストーリーファイルの各部分（meta / args / 各ストーリー）が
何をしているかを初心者向けに説明してください。
```

## 宿題

- 残りのコンポーネントのストーリーを書いてpushしてくる
