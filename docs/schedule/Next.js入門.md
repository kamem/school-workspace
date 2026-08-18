# Next.js入門

- 日付: 2026-11-13
- 分類: React/Next.js
- 完了: [ ]
- Notion: https://app.notion.com/3a100b59eb15811d8dccc7f587abfde1

---

## ねらい

Reactの基本を踏まえて、Next.js（Reactベースのフレームワーク）でプロジェクトを立ち上げ、App Routerでページを増やせるようになる。

## タイムテーブル

- 講義・デモ 60分: Next.jsとは / Vite + Reactとの違い（ルーティング・SSR・画像最適化などが最初から入っている） / `npx create-next-app@latest` の各オプションの意味（TypeScript / ESLint / Tailwind / App Router）
- ハンズオン 90分: `npx create-next-app` でプロジェクト作成 → フォルダ構造の探検（`app/`、`page.tsx`、`layout.tsx`）→ ページ追加とファイルベースルーティング → `Link` での遷移。全員の環境構築を完了させる
- 演習・質疑 30分: つまずきの解消、GitHubへpush

## 備考

- ViteとNextの関係: Viteはビルドツール、Nextはビルド機構（Turbopack）内蔵のReactフレームワーク。並列の選択肢であり、create-next-appでViteは選べない

## 宿題

- ページをもう1枚追加してくる
