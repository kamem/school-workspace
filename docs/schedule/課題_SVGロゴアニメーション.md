# SVG＋CSSアニメーションでロゴ実装

- 日付: 未定
- 分類: JavaScript
- 完了: [ ]
- Notion: https://app.notion.com/3a300b59eb1581e59147ca9b913d02a0

---

## ねらい

自分のブログのロゴをSVGで作り、CSSアニメーションで動かす。ベクター画像の仕組みとWebアニメーションの基礎を学ぶ。

## 進め方

- SVGとは: ベクター vs ラスター、「コードで書ける画像」で拡大しても荒れない
- Figmaでロゴを作ってSVG書き出し（シンプルなものなら手書きでも）
- SVGの中身を読む: `viewBox` / `path` / `fill` / `stroke`
- CSSアニメーションの基礎: `transition` / `@keyframes`
- 定番の線画アニメ: `stroke-dasharray` + `stroke-dashoffset` で「手描き風にロゴが描かれる」を実装
- hoverで動くロゴ / ページ読み込み時の描画アニメ
- 完成したらブログのHeaderに組み込む

## 教えるポイント

- SVGはテキストなのでGitの差分が見える・コードとして扱える（画像との決定的な違い）
- `stroke-dashoffset`の線画アニメは仕組みは単純だが感動値が高い。「ダッシュボードの線の長さを測ってずらす」という理屈を図で説明する
- `prefers-reduced-motion` への配慮（アクセシビリティ、酔いやすい人向けにアニメを止める）をここで教える
- アニメーションは「目的（誘導・フィードバック・演出）があるか」で入れる場所を決める。動かすこと自体が目的化しないように

## 宿題

- 自分のロゴアニメーションを仕上げてブログに組み込んでくる

---

## アニメーション・クリエイティブコーディングライブラリ図鑑

### アニメーション制御・再生

- [GSAP](https://gsap.com/) — Webアニメーションの王道。タイムライン制御とScrollTrigger（スクロール連動）が強力。CSSアニメの次に学ぶならまずこれ
- [Lottie](https://lottiefiles.com/jp/) — After Effectsなどで作ったアニメをJSONで書き出してWeb再生。デザイナーとエンジニアの分業の定番で、デザイン志望には特に重要
- [Lenis](https://lenis.darkroom.engineering/) — 滑らかスクロール。ハイエンドなサイトの「ぬるっとしたスクロール感」の正体。GSAPと併用定番

### 3D（WebGL）

- [Three.js](https://threejs.org/) — Web 3Dの標準ライブラリ。まずは「シーン・カメラ・ライト・メッシュ」の基礎概念から
- [React Three Fiber](https://r3f.docs.pmnd.rs/) — Three.jsをReactコンポーネントで書ける。授業のReact知識がそのまま3Dにつながる
- [Drei](https://github.com/pmndrs/drei) — React Three Fiberの便利ヘルパー集（カメラ制御・ローダーなどの定番部品）
- [OGL](https://github.com/oframe/ogl) — 軽量WebGLライブラリ。Three.jsより低レベル・軽量で、背景エフェクトなどに使われる
- [GLSL Shader](https://thebookofshaders.com/?lan=jp) — GPUで動く描画プログラム言語。リンクは定番入門「The Book of Shaders」（日本語版あり）。ハイエンドな背景表現の最終兵器

### 2D描画・物理・クリエイティブコーディング

- [PixiJS](https://pixijs.com/) — 高速2D描画（WebGL）。パーティクルやゲーム的表現
- [p5.js](https://p5js.org/) — クリエイティブコーディング入門の定番（Processing系）。数行で絵が描けてアート寄りの入口に最適
- [Matter.js](https://brm.io/matter-js/) — 2D物理エンジン（重力・衝突）。要素が落ちて積み重なる演出など

### 学習順の目安

1. CSSアニメーション（この回）
2. GSAP + Lenis（スクロール演出）
3. Lottie（デザイナー分業フロー）
4. Three.js / React Three Fiber + Drei（3Dに興味が出たら）
5. GLSL / OGL / PixiJS / p5.js / Matter.js（表現の引き出しを広げたい人向け）
