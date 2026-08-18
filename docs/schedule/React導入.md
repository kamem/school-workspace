# React導入（Vite + React）・コンポーネント・JSX

- 日付: 2026-09-25
- 分類: React/Next.js
- 完了: [ ]
- Notion: https://app.notion.com/3a100b59eb158162b7fec86d3ec592a7

---

## この回でやること

第2回で理解したViteの上にReactを導入し、「UIをコンポーネントで組み立てる」考え方とJSXの基本を身につける。自己紹介カードなど小さなコンポーネントを作り、propsで内容を出し分けるところまでやる。

## 手順

### 1. Reactとは何かを知る

Reactを使う理由と「コンポーネント」という考え方を押さえる。Reactは第1回のSwiperと同じ、npmで入るただのライブラリ（第2回のvanillaプロジェクトに `npm install react react-dom` するだけでも入る）。

### 2. プロジェクト作成

```bash
npm create vite@latest my-react-site
```

対話で聞かれること:

- **Select a framework** → `React` を選ぶ（Viteでフレームワークを選べることを体験）
- **Select a variant** → `TypeScript`（12月のNext.jsもTSが標準なので最初からTSで統一。ただし型の文法は覚え込まなくてよく、「赤線はヒント、注釈は読めればOK」のスタンスで進める）

### 3. 起動まで

```bash
cd my-react-site
npm install
npm run dev
```

ブラウザで `http://localhost:5173` を開いてViteのReactテンプレートが表示されればOK。

### 4. 構造の確認（ここを丁寧に）

読み込みの流れを追う: `index.html` → `src/main.tsx`（ReactをHTMLの `#root` に接続）→ `src/App.tsx`（画面の中身）。第2回のvanilla構成との違いを見る。

- 触るのは基本 `App.tsx` と `src/` 以下
- `App.tsx` を編集して保存 → 即座に画面が変わる（HMR）ことを最初に体験する

### 5. 片付け

テンプレートの不要な部分（カウンターやロゴ）を消して、`App.tsx` を最小構成にしてから自分のコンポーネント作りを始める。

### 6. JSXのルールを押さえてコンポーネントを作る

JSXのルール（`className`、`{}` でのJS埋め込み、単一ルート要素）を確認しながら、自己紹介カードなど小さなコンポーネントを作り、propsで内容を出し分ける。

### 7. コンポーネントをもう1つ自作し、lint/formatter設定を適用してpush

lint/formatterはやり直さない: 第2回の設定ファイル一式（oxlint・Prettier・stylelintなど）を新プロジェクトに**コピーするだけ**で効く。「設定をファイルにしておけば次のプロジェクトに持ち込める」という第2回の答え合わせになる。

## 注意

- 第2回のvanillaプロジェクトには続かず、**React用に新規プロジェクトを作る**。`npm create vite` は新規生成専用で、既存プロジェクトにテンプレートを後乗せできないため
- Next.jsはReactの基本がわかってから後の回で導入する（NextはReactベースのフレームワーク）
- ViteとNextの関係は混同しやすいので注意: Viteはビルドツール（中でReact等を選ぶ）、Nextはビルド機構内蔵のReactフレームワーク。並列の選択肢であり組み合わせるものではない

### TypeScriptについての注意

- 型注釈は「読めればOK」から始める。自分で型を書くのはpropsの型定義くらいからでよい
- 型エラーで詰まって止まる場合の逃げ道: ひとまず `any` で進めて後で直す（「逃げたことがわかる」のが any の利点）

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

### プロンプトの使い方

- **手作業での作成（手順2〜5）を一度体験してから**、プロンプト版を使う
- AIに作らせた場合も「main.tsxとApp.tsxのつながりを説明させる」部分が復習教材になる

## 宿題

- コンポーネントをひとつ追加してくる（内容は自由）
