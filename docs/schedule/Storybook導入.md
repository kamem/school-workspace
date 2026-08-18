# Storybook導入（コンポーネントカタログ）

- 日付: 未定
- 分類: ツール設定
- 完了: [ ]
- Notion: https://app.notion.com/3a400b59eb15810a8581d9387e254754

---

## ねらい

Xeory移行で作ったコンポーネントを[Storybook](https://storybook.js.org/)でカタログ化する。「コンポーネントをページから切り離して一覧・確認できる」体験を通じて、部品化の価値を定着させる。

## タイムテーブル

- 講義・デモ 60分: Storybookとは（コンポーネントのカタログ。実務ではデザイナーとの共通言語になる）/ 実在企業の公開Storybookを見て回る（SmartHRなど、単位6で見るデザインシステムの実体がこれ）
- ハンズオン 90分:
  - `npx storybook init` で導入（Viteプロジェクトを自動検出）
  - `ArticleCard.stories.tsx` を作る: 通常・タグあり・サムネイルなしなどのバリエーションをストーリーとして登録
  - ControlsでpropsをGUIから動かす（型定義がそのまま操作パネルになることを確認）
  - Header・Sidebarなど他のコンポーネントもストーリー化
- 演習・質疑 30分: npm scriptsの確認（`storybook` / `build-storybook`）、push

## 教えるポイント

- 「ページに組み込まないと見た目を確認できない」状態からの解放が価値。propsのバリエーションを網羅的に確認できる
- Controlsは単位3で書いたTypeScriptの型定義から自動生成される——「型を書くと道具が賢くなる」の実例
- デザイン志望との接点: Storybookはデザイナーが実装を確認する場。ポートフォリオに「自分のStorybook」があると強い
- 次のVitest回とのつながり: ストーリー＝「コンポーネントの状態の列挙」。テストの発想（このpropsのときこう表示される）と同じ思考であることを予告

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
