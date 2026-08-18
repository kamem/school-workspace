# テスト実装（Vitest）

- 日付: 2026-11-06
- 分類: ツール設定
- 完了: [ ]
- Notion: https://app.notion.com/3a200b59eb15819580a9ec92c27eee73

---

## ねらい

完成した静的React版Xeoryサイトにテストを書き、「壊れたら機械が教えてくれる」状態を作る。lint/formatに続く品質ツールの総仕上げ。

## タイムテーブル

- 講義・デモ 60分: なぜテストを書くのか（目視確認の限界・リファクタリングの安心感）/ [Vitest](https://vitest.dev/)の紹介（Viteと同じ作者群・設定がほぼ不要）/ テストの基本形（test / expect）
- ハンズオン 90分:
  - 導入: `npm install -D vitest @testing-library/react @testing-library/jest-dom jsdom`、npm scriptsに `test` を登録
  - まずは関数のテスト: カテゴリ絞り込みのfilterロジックを関数に切り出してテスト（UIなしでテストできる形にするという設計の話）
  - コンポーネントのテスト: 「ArticleCardに記事タイトルが表示される」「メニューボタンを押すと開く」
  - watchモードで「わざと壊す→赤くなる→直す→緑に戻る」を体験
- 演習・質疑 30分: 自分のサイトにテストを1つ自作、push（CIの話は紹介程度）

## 教えるポイント

- テストは「未来の自分への保険」。次回以降Nextへの移植で大改造するので、「壊していないことを確かめながら直せる」価値がすぐに回収される
- AIとの相性: テストはAIに書かせやすい題材。ただし「何をテストすべきか」を決めるのは人間、という役割分担をここでも強調
- 1月のPlaywright MCP（ブラウザ操作・E2E）との違い: Vitestは部品単位、Playwrightはサイト全体、という予告をしておく

## AI導入用プロンプト

```javascript
このVite + React + TypeScriptプロジェクトにVitestとTesting Libraryを導入してください。

要件:
1. vitest / @testing-library/react / @testing-library/jest-dom / jsdom をdevDependenciesに追加
2. vite.config.tsにテスト設定（jsdom環境）を追加
3. npm scriptsに "test"（watch）と "test:run"（1回実行）を登録
4. ArticleCardコンポーネントに対するテストを例として1つ作成
5. npm run test:run が成功することを確認

最後に、テストファイルの各行が何をしているか初心者向けに説明してください。
```

## 宿題

- 自分のサイトのコンポーネントにテストをもう1つ書いてくる
