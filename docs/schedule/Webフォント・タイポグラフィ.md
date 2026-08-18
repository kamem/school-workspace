# Webフォント・タイポグラフィ（next/font）

- 日付: 未定
- 分類: React/Next.js
- 完了: [ ]
- Notion: https://app.notion.com/3ae00b59eb158168a55ee717ae9e8fcf

---

## この回でやること

ブログで使うフォントを選び、`next/font` で読み込んで、見出し・本文のタイポグラフィを整える。

## 手順

### 1. フォントを見て回る

[Google Fonts](https://fonts.google.com/) で「Language → Japanese」に絞り、試し書き欄に自分のブログタイトルを入れて見比べる。フォントが変わるとサイトの印象がどう変わるかを観察する。

### 2. M PLUS 1p を読み込む

まずは全員 [M PLUS 1p](https://fonts.google.com/specimen/M+PLUS+1p) で手順を統一する:

```typescript
import { M_PLUS_1p } from "next/font/google"

const mplus = M_PLUS_1p({
  weight: ["400", "700"],
  subsets: ["latin"],
})
```

### 3. CSS変数で全体に適用する

読み込んだフォントをCSS変数に入れて、サイト全体で使えるようにする（ダークモードの色変数と同じ考え方）。

### 4. 2書体の組み合わせにする

見出し用と本文用でフォントを分けてみる（強い見出し × 素直な本文が定番の組み合わせ）。動作確認できたら、好きなフォントに差し替えてOK。

### 5. 読みやすさを整える

行間（`line-height`）・字間（`letter-spacing`）・文字サイズを調整して、記事本文が読みやすい状態に仕上げる。

## 日本語フォントの注意

- 日本語フォントは漢字を含むため、**欧文フォントの数十倍重い**（数MB〜数十MB）
- `next/font` は自動で**サブセット**（使う文字だけに分割配信）してくれる。タグ直貼りではなくnext/fontを使うのはこのため
- 読み込み中に一瞬フォントが切り替わって見えるのは仕様（`display: swap`）

## 参考リンク

- [Google Fonts](https://fonts.google.com/) — フォント検索。「Language → Japanese」で日本語フォントに絞り込める
- [Google Fonts 日本語一覧](https://fonts.google.com/?subset=japanese) — 日本語対応フォントだけの直リンク
- [M PLUS 1p](https://fonts.google.com/specimen/M+PLUS+1p) — 授業の標準フォント。ウェイトが7段階あり、見出し/本文の使い分け練習にも向く
- [next/font 公式ドキュメント](https://nextjs.org/docs/app/getting-started/fonts) — Next.jsでのフォント読み込み方法

## 宿題

- ブログの見出し・本文のフォントとタイポグラフィ設定を仕上げてpushする
- 選んだフォントの理由をREADMEに一言書く（「好みだから」ではなく「サイトの雰囲気に合うから」を言葉にしてみる）
