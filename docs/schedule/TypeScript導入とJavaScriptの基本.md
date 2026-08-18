# TypeScript導入とJavaScriptの基本

- 日付: 2026-09-18
- 分類: JavaScript
- 完了: [ ]
- Notion: https://app.notion.com/3a200b59eb15813c907bd00d49f7adce

---

## ねらい

Reactに入る前に、素のJavaScript/TypeScriptだけに触れる時間を作る。React回の負荷を「JSX＋コンポーネント」だけに減らすのが目的。

## タイムテーブル

- 講義・デモ 60分:
  - JSとTSの関係: TS＝JSに型を足したもの。ブラウザで動くのはJS、TSは開発中の安全装置
  - 単位2のプロジェクトに `npm install -D typescript` → `.js` を `.ts` 化して「後から足せる」を体験（ViteはそのままTSを解釈できる）
- ハンズオン 90分: JSの基本をTSで書きながら覚える。**Xeory移行で使う文法だけに絞る**:
  - 変数（`const` / `let`）と型注釈（`string` / `number` / `boolean`）
  - 関数（アロー関数）と引数・戻り値の型
  - オブジェクトと `type` 定義、分割代入
  - 配列と `map`（コンソールで動かして確認）
- 演習・質疑 30分: わざとtypo・型違いを書いてエラーを読む練習、push

## 教えるポイント

- 「赤線は敵ではなくヒント」をここで刊り込む（以降の全回で効く）
- 型注釈は「読めればOK」から。全部に型を書かせない（推論に任せるところを見せる）
- ここで覚えた「オブジェクト＋type」がXeory移行の `Article` 型に、「配列＋map」が記事一覧表示に直結する
- この回で前倒しした分、以降の「今日のJS/TS」は復習・補強に寄せられる

## 宿題

- 自分の好きなもの（曲・映画など）を `type` を定義したオブジェクトの配列で作り、mapでコンソールに一覧表示してくる

---

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

### 授業での使い方

- 手作業での導入（`npm install -D typescript` → リネーム → 動作確認）を一度やってから、プロンプト版を紹介する
- AIの説明パート（tsconfigの意味・エラーの読み方）は、そのまま復習教材として各自のREADMEに貼らせてもよい
