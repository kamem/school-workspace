# Next.jsでmetadata追加（SEO・OGP）

- 日付: 未定
- 分類: React/Next.js
- 完了: [ ]
- Notion: https://app.notion.com/3a900b59eb1581de8bf5fca157119db0

---

## この回でやること

ブログにタイトル・description・OGPを設定し、「検索結果やSNSシェアでどう見えるか」までデザインする。前期に学んだmetaタグの知識を、Next.jsのmetadata APIで実装し直す。

📎 前期の復習用資料: [webを公開する前に](https://app.notion.com/p/38200b59eb15807ea3eee940f9244655)（metaタグの基礎はここで実施済み。今回は「HTMLに直書き → NextのAPIで生成」への置き換え）

## 手順

### 1. 前期の復習

前期資料を見ながら、title / description / OGPがどこに効くかを思い出す（検索結果・SNSカード・タブ表示）。

### 2. 静的metadata

`layout.tsx` / `page.tsx` に `export const metadata` でサイト共通・ページ別の設定を書く。

### 3. 動的metadata

記事詳細ページ（単位9）に `generateMetadata` を追加し、**microCMSの記事タイトル・サムネイルがそのままOGPになる**ようにする。

### 4. OGP画像の設定

サイト共通のデフォルト画像はFigmaで自作する。

### 5. favicon

`app/` に `icon.png` を置くだけでNext.jsが自動認識する。ブラウザタブの顔もFigmaで自作する。

### 6. sitemap

`app/sitemap.ts` を作ると `/sitemap.xml` が自動生成される。microCMSの記事一覧から動的に生成して、検索エンジンに全記事を伝える。

### 7. シェアデバッガーで確認

デプロイ後にシェアデバッガー（XのCard Validator等）でカード表示を確認する。

## 注意・ヒント

- 前期は「ページごとにHTMLへ手書き」だったものが、Nextでは「データから自動生成」になる。記事が100本に増えてもOGPは全自動——CMS連携の延長の話
- OGP画像は「サイトの顔」。デザイン志望として手を掛ける価値がある成果物（1200×630の定番サイズ）
- タイトル設計（「記事名 \| サイト名」のテンプレート）もmetadata APIの `title.template` で仕組み化できる

## AI実装用プロンプト（3段階）

一気に全部やらず、1つずつ実行しては動作確認する。VS Code（Copilot）のエージェントモードに貼り付けて使う。

### プロンプト① サイト共通のmetadata

```javascript
このNext.jsブログの app/layout.tsx にサイト共通のmetadataを設定してください。

要件:
- サイト名・description・OGPのデフォルト画像（/ogp.png を参照）
- title.template で「ページ名 | サイト名」の形式にする
- favicon は app/icon.png を参照する前提でよい

最後に、設定した各項目が「検索結果・SNSのシェアカード・ブラウザタブ」の
どこに効くのかを一覧表で説明してください。
```

→ できたら確認: ブラウザタブのタイトルとfaviconが変わっているか

### プロンプト② 記事ごとのOGP（generateMetadata）

```javascript
記事詳細ページ（app/articles/[id]/page.tsx）に generateMetadata を実装し、
microCMSの記事タイトル・概要・サムネイルがそのページのOGPに
反映されるようにしてください。

最後に、デプロイ後にOGPを確認する手順（シェアデバッガーの使い方）を
説明してください。
```

→ できたら確認: 記事を変えるとOGPの内容も変わるか

### プロンプト③ sitemapとrobots

```javascript
app/sitemap.ts を作成し、固定ページとmicroCMSの全記事から
sitemap.xml を動的生成してください。app/robots.ts も作成してください。

最後に、sitemapとrobotsが何のためにあるのかを初心者向けに説明してください。
```

→ できたら確認: /sitemap.xml をブラウザで開いて記事一覧が出ているか

※ OGP画像（1200×630）とfavicon画像はAIには作れないので、Figmaで自作して配置する。ここが自分のデザインの見せ場。

## 宿題

- 自分のブログのOGP画像をFigmaで作って設定し、シェアしたときの見え方を確認してくる
