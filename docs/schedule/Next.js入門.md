# Next.js入門

- 日付: 2026-11-13
- 分類: React/Next.js
- 完了: [ ]

---

## この回でやること

Reactの基本を踏まえて、Next.js（Reactベースのフレームワーク）でプロジェクトを立ち上げ、App Routerでページを増やす。

## 手順

### 1. Next.jsとは何かを知る

Vite + Reactとの違い（ルーティング・SSR・画像最適化などが最初から入っている）と、`npx create-next-app@latest` の各オプションの意味（TypeScript / ESLint / Tailwind / App Router）を押さえる。

### 2. プロジェクトを作成する

`npx create-next-app@latest` でプロジェクトを作成する。

### 3. フォルダ構造を探検する

`app/`、`page.tsx`、`layout.tsx` がそれぞれ何かを確認する。

### 4. ページを追加してファイルベースルーティングを試す

### 5. `Link` でページ間を遷移させる

### 6. GitHubへpush

### 7. Vercelに連携する

[Vercelデプロイ回](Vercelデプロイ・環境変数.md)と同じ手順で、Next.jsプロジェクトも新しいプロジェクトとして連携しておく。以降はpushするだけで本番に反映される。

## 注意

- ViteとNextの関係: Viteはビルドツール、Nextはビルド機構（Turbopack）内蔵のReactフレームワーク。並列の選択肢であり、create-next-appでViteは選べない

## 宿題

- ページをもう1枚追加してくる
