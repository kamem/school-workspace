# npm入門・ライブラリ導入

- 日付: 2026-09-04
- 分類: 環境構築
- 完了: [ ]
- Notion: https://app.notion.com/3a100b59eb158109b7add0b37e018d57

---

## ねらい

package.jsonの役割とnpm scriptsを理解し、ライブラリを自分で導入して動かすところまで体験する。

## 進め方（後半90分）

- npmとは / package.jsonの読み方 / dependenciesとdevDependencies / npm scripts
- `npm init` → ライブラリを実際に導入して自分のページで動かす
- node_modulesと.gitignoreの関係、`npx`の使い方

## 導入しやすいライブラリ例（見た目にすぐ効くもの）

- [**Swiper**](https://swiperjs.com/) — スライダー/カルーセル。定番で実務でもよく使う
- [**AOS**](https://michalsnik.github.io/aos/) — スクロールで要素がふわっと出るアニメーション。数行で効く
- [**GLightbox**](https://biati-digital.github.io/glightbox/) — 画像のライトボックス表示
- [**canvas-confetti**](https://github.com/catdad/canvas-confetti) — 紙吹雪。1行で動いて盛り上がる
- [**dayjs**](https://day.js.org/) — 日付の表示・計算

まずcanvas-confettiやAOSのような「数行で動く」ものから入り、Swiperで「ドキュメントを読んで組み込む」体験をさせる。

## 備考

- Git・GitHubは前期に実施済み。必要に応じてこの回で軽く復習（pushまでの流れ）

## 宿題

- 好きなライブラリを1つ選んで自分のページに組み込み、pushしてくる
