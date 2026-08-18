# SVG＋CSSアニメーションでロゴ実装

- 日付: 未定
- 分類: JavaScript
- 完了: [ ]
- Notion: https://app.notion.com/3a300b59eb1581e59147ca9b913d02a0

---

## この回でやること

ベクター画像の仕組みとWebアニメーションの基礎を知り、自分のブログのロゴをSVGで作ってCSSアニメーションで動かす。完成したらブログのHeaderに組み込む。

## 手順

### 1. SVGとは何かを知る

ベクター vs ラスター。「コードで書ける画像」で拡大しても荒れない。

### 2. Figmaでロゴを作ってSVG書き出しする

シンプルなものなら手書きでもよい。

### 3. SVGの中身を読む

`viewBox` / `path` / `fill` / `stroke`。

### 4. CSSアニメーションの基礎を押さえる

`transition` / `@keyframes`。

### 5. 定番の線画アニメを実装する

`stroke-dasharray` + `stroke-dashoffset` で「手描き風にロゴが描かれる」を実装する。仕組みは単純だが感動値が高い——「ダッシュの線の長さを測ってずらす」という理屈。

### 6. 動きのバリエーションを作る

hoverで動くロゴ / ページ読み込み時の描画アニメ。

### 7. 完成したらブログのHeaderに組み込む

## 注意・ヒント

- SVGはテキストなのでGitの差分が見える・コードとして扱える（画像との決定的な違い）
- `prefers-reduced-motion` への配慮を忘れない（アクセシビリティ、酔いやすい人向けにアニメを止める）
- アニメーションは「目的（誘導・フィードバック・演出）があるか」で入れる場所を決める。動かすこと自体を目的化しない

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

## 宿題

- 自分のロゴアニメーションを仕上げてブログに組み込んでくる
