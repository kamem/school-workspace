# React導入（Vite + React）・コンポーネント・JSX

- 日付: 2026-09-25
- 分類: React/Next.js
- 完了: [ ]
- Notion: https://app.notion.com/3a100b59eb158162b7fec86d3ec592a7

---

## ねらい

第2回で理解したViteの上にReactを導入し、「UIをコンポーネントで組み立てる」考え方とJSXの基本を身につける。

## タイムテーブル

- 講義・デモ 60分: Reactとは・なぜ使うのか / コンポーネントという考え方 / JSXのルール（`className`、`{}`でのJS埋め込み、単一ルート要素）
- ハンズオン 90分:
  - `npm create vite@latest` で **Reactテンプレート** を選んでプロジェクト作成（Viteでフレームワークを選べることを体験）
  - 構造の探検（`main.jsx`、`App.jsx` — 第2回のvanilla構成との違いを見る）
  - 自己紹介カードなど小さなコンポーネントを作り、propsで内容を出し分ける
- 演習・質疑 30分: コンポーネントをもう1つ自作、第2回のlinter/formatter設定を適用してpush

## 備考

- 第2回のvanillaプロジェクトには続かず、**React用に新規プロジェクトを作る**。`npm create vite` は新規生成専用で、既存プロジェクトにテンプレートを後乗せできないため
- ただしlint/formatterはやり直さない: 第2回の設定ファイル一式（oxlint・Prettier・stylelintなど）を新プロジェクトに**コピーするだけ**で効く。「設定をファイルにしておけば次のプロジェクトに持ち込める」という第2回の答え合わせになる
- Next.jsはReactの基本がわかってから後の回で導入する（NextはReactベースのフレームワーク、という順で説明できる）
- 講師デモ（5分）: 第2回のvanillaプロジェクトに `npm install react react-dom` して見せる。「Reactは第1回のSwiperと同じ、npmで入るただのライブラリ」という種明かし
- ViteとNextの関係は混同しやすいので注意: Viteはビルドツール（中でReact等を選ぶ）、Nextはビルド機構内蔵のReactフレームワーク。並列の選択肢であり組み合わせるものではない

## 宿題

- コンポーネントをひとつ追加してくる（内容は自由）

---

## Vite + React 導入手順

### 1. プロジェクト作成

```bash
npm create vite@latest my-react-site
```

対話で聞かれること:

- **Select a framework** → `React` を選ぶ
- **Select a variant** → `TypeScript`（12月のNext.jsもTSが標準なので最初からTSで統一。ただし型の文法は教え込まず、「赤線はヒント、注釈は読めればOK」のスタンスで進める）

### 2. 起動まで

```bash
cd my-react-site
npm install
npm run dev
```

ブラウザで `http://localhost:5173` を開いてViteのReactテンプレートが表示されればOK。

### 3. 構造の確認（ここを丁寧に）

読み込みの流れを追う: `index.html` → `src/main.tsx`（ReactをHTMLの `#root` に接続）→ `src/App.tsx`（画面の中身）

- 触るのは基本 `App.tsx` と `src/` 以下
- `App.tsx` を編集して保存 → 即座に画面が変わる（HMR）ことを最初に体験させる

### 4. 片付け

テンプレートの不要な部分（カウンターやロゴ）を消して、`App.tsx` を最小構成にしてから自分のコンポーネント作りを始める。

### TypeScriptについての注意

- 型注釈は「読めればOK」から始める。自分で型を書くのはpropsの型定義くらいからでよい
- 型エラーで詰まって授業が止まる場合の逃げ道: ひとまず `any` で進めて後で直す（「逃げたことがわかる」のが any の利点と説明する）

## AI導入用プロンプト

VS Code（Copilot）のエージェントモードに貼り付けて使う:

```javascript
ViteでReactのプロジェクトを新規作成してください。

要件:
1. npm create vite を使う。フレームワークはReact、variantはTypeScript
2. プロジェクト名は my-react-site
3. 作成後、テンプレートの不要なサンプル（カウンター、ロゴ、不要なCSS）を削除して、
   App.tsx を「Hello React」とだけ表示する最小構成に整理する
4. 前のプロジェクトと同じ構成で oxlint / Prettier / stylelint / markdownlint /
   PostCSS(autoprefixer) を導入し、npm scripts（lint / format）も設定する
5. npm run dev で起動できること、npm run lint が正常終了することを確認する

最後に、index.html → main.tsx → App.tsx がどうつながって画面が表示されるのかを、
プログラミング初心者向けに図解イメージで説明してください。
```

### 授業での使い方

- **手作業での作成（上の手順1〜4）を全員が一度体験してから**、プロンプト版を紹介する
- AIに作らせた場合も「main.tsxとApp.tsxのつながりを説明させる」部分が教材になる
