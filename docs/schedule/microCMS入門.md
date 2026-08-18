# microCMS入門（アカウント・スキーマ・入稿）

- 日付: 2026-11-27
- 分類: React/Next.js
- 完了: [ ]
- Notion: https://app.notion.com/3a200b59eb15813aa077f3dd5a9d9cfc

---

## 今日のJS/TS（冒頭30分）

非同期処理入門: 同期と非同期 / `async` `await` / `fetch`。公開APIをコンソールから叩いてJSONを見る。**次回のmicroCMS取得の仕込み回**。

## 進め方

- ヘッドレスCMSとは何か（WordPressとの違い / データと見た目の分離）
- [microCMS](https://microcms.io/) アカウント作成（無料枠）
- 記事APIのスキーマ作成: タイトル・本文・サムネイル・カテゴリ（講師のテンプレに合わせる）
- 各自2〜3記事を入稿してみる
- APIプレビューでJSONが返ってくるのを確認（「さっきfetchで見たJSONと同じ形」）

## 教えるポイント

- スキーマ設計＝Reactで書いた `Article` 型と同じ情報設計。「型がそのままCMSの項目になる」という伏線回収

## 宿題

- 記事を合計5本まで増やしてくる
