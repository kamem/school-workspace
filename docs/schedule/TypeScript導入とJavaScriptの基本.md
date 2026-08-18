# TypeScript導入とJavaScriptの基本

- 日付: 2026-09-18
- 分類: JavaScript
- 完了: [ ]
- Notion: https://app.notion.com/3a200b59eb15813c907bd00d49f7adce

---

## この回でやること

Reactに入る前に、素のJavaScript/TypeScriptだけに触れる。TS＝JSに型を足したものであることを体験し、Xeory移行で使うJSの基本文法をTSで書きながら覚える。ここで文法を先に押さえておくことで、React回で新しく覚えることを「JSX＋コンポーネント」だけに減らせる。

## 手順

### 1. JSとTSの関係を知る

TS＝JSに型を足したもの。ブラウザで動くのはJS、TSは開発中の安全装置。

### 2. 既存プロジェクトにTypeScriptを導入する

単位2のプロジェクトに `npm install -D typescript` → `.js` を `.ts` 化して「後から足せる」を体験する（ViteはそのままTSを解釈できる）。

### 3. JSの基本をTSで書きながら覚える

**Xeory移行で使う文法だけに絞る**:

- 変数（`const` / `let`）と型注釈（`string` / `number` / `boolean`）
- 関数（アロー関数）と引数・戻り値の型
- オブジェクトと `type` 定義、分割代入
- 配列と `map`（コンソールで動かして確認）

### 4. エラーを読む練習をする

わざとtypo・型違いを書いてエラーを読む練習をする。

### 5. GitHubへpush

## 使いこなしのヒント

- 「赤線は敵ではなくヒント」。以降ずっと使える考え方
- 型注釈は「読めればOK」から。全部に型を書かなくてよい（推論に任せられるところは任せる）
- ここで覚えた「オブジェクト＋type」がXeory移行の `Article` 型に、「配列＋map」が記事一覧表示に直結する

## AI導入用プロンプト

VS Code（Copilot）のエージェントモードに貼り付けて使う:

```javascript
この Vite（vanilla）プロジェクトに TypeScript を導入してください。

要件:
1. typescript を devDependencies に追加する
2. tsconfig.json を作成する（Vite の vanilla-ts テンプレートに準じた一般的な設定でよい）
3. src 内の .js ファイルを .ts にリネームし、型エラーが出る箇所を修正する
4. index.html の script 読み込みも .ts に合わせて修正する
5. npm scripts に "typecheck"（tsc --noEmit）を追加する
6. npm run dev で今まで通り動くこと、npm run typecheck が正常終了することを確認する

最後に、以下をプログラミング初心者向けに説明してください:
- tsconfig.json の各設定が何をしているか（主要なものだけでよい）
- 「TSはブラウザでは動かず、開発中のチェックとして働く」とはどういうことか
- 型エラーが出たとき、どこを読めば原因がわかるか
```

### プロンプトの使い方

- まず手作業での導入（`npm install -D typescript` → リネーム → 動作確認）を一度体験してから、プロンプト版を使う
- AIの説明パート（tsconfigの意味・エラーの読み方）は、復習教材として自分のREADMEに貼っておくとよい

## 宿題

- 自分の好きなもの（曲・映画など）を `type` を定義したオブジェクトの配列で作り、mapでコンソールに一覧表示してくる
