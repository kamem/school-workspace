# PWA対応（ホーム画面に追加できるブログにする）

- 日付: 未定
- 分類: React/Next.js
- 完了: [ ]

---

## この回でやること

自分のブログをPWA（Progressive Web App）にして、スマホのホーム画面に「アプリ」として追加できるようにする。アプリアイコンや起動時の色など、**アプリとしての見た目をデザインする**のが今回の中心。前回までのmetadata（favicon・OGP）と同じ「metadataファイル」の仲間として、`app/manifest.ts` を1つ追加するだけで実装できる。

## 手順

### 1. PWAとは何かを知り、実物を触る

- PWAは「ホーム画面に追加すると、アドレスバーのないアプリのような画面で開くWebサイト」。アプリストアの審査がなく、更新はデプロイするだけで反映される
- スマホで [What PWA Can Do Today](https://whatpwacando.today/) を開いてホーム画面に追加し、普通のWebページとの見た目の違いを観察する

### 2. Figmaでアプリアイコンを作る

ホーム画面に並ぶ「アプリの顔」を作る。faviconを流用せず、アプリアイコンとして作り直す。

| ファイル                       | サイズ  | 用途                                                            |
| ------------------------------ | ------- | --------------------------------------------------------------- |
| `public/icon-192.png`          | 192×192 | 通常のアイコン                                                  |
| `public/icon-512.png`          | 512×512 | 通常のアイコン（大）                                            |
| `public/icon-maskable-512.png` | 512×512 | Android用。端末によって丸・角丸などに切り抜かれる前提のアイコン |
| `app/apple-icon.png`           | 180×180 | iPhone用（`app/` に置くとNext.jsが自動で読み込む）              |

- **maskable版は、中心の直径80%の円の中にロゴを収める**（外側は切り抜かれる可能性がある）。背景は四隅まで塗りつぶす
- [Maskable.app](https://maskable.app/) に書き出した画像を読み込むと、切り抜かれた形をプレビューできる
- iPhoneは角丸を自動でかけるので、角丸にせず四角いまま書き出す。**背景を透過にしない**（透過部分が黒く表示される）

### 3. `app/manifest.ts` を作る

アプリの名前・アイコン・色をブラウザに伝えるファイル。`app/` に置くと、Next.jsが `<head>` へのリンクまで自動で設定してくれる。

```typescript
import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: '（ブログの正式名）',
    short_name: '（ホーム画面に出る短い名前）',
    description: '（ブログの説明）',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#1e40af',
    icons: [
      { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
      {
        src: '/icon-maskable-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  }
}
```

| 項目               | どこに効くか                                                                                                  |
| ------------------ | ------------------------------------------------------------------------------------------------------------- |
| `name`             | インストール画面・起動画面に出る正式名                                                                        |
| `short_name`       | ホーム画面のアイコンの下に出る名前。長いと「…」で切れるので短くする                                           |
| `display`          | `standalone` でアドレスバーのないアプリ表示になる。`browser` / `minimal-ui` / `fullscreen` も試して違いを見る |
| `background_color` | Androidで起動した瞬間に出る画面（スプラッシュ画面）の背景色                                                   |
| `theme_color`      | アプリ表示時のステータスバー・タイトルバーの色                                                                |

### 4. PCのChromeで確認・インストールする

- `npm run dev` で起動し、DevToolsの **Application → Manifest** を開く。名前・アイコン・色が読み込まれているか、エラーが出ていないかを確認する
- アドレスバー右端のインストールアイコンからインストールすると、PC上でもアプリとして開ける
- `localhost` は特別扱いされるので、HTTPSでなくてもここまでは試せる

### 5. デプロイしてスマホのホーム画面に追加する

pushしてVercelにデプロイし、公開URLをスマホで開く。

- **Android（Chrome）**: メニュー → 「ホーム画面に追加」または「アプリをインストール」
- **iPhone（Safari）**: 共有ボタン → 「ホーム画面に追加」。iOS 26以降は「Webアプリとして開く」がオンになっていることを確認する

ホーム画面のアイコンから起動して、アドレスバーが消えているか・アイコンや名前が意図どおりかを確認する。

### 6. ブラウザの色をダークモードと合わせる

`theme_color` はmanifestの中では1色しか指定できない。ブラウザのアドレスバーなどの色をライト/ダークで切り替えたいときは、`layout.tsx` の `viewport` で指定する（→ [課題: ダークモード対応](課題_ダークモード対応.md)）。

```typescript
import type { Viewport } from 'next'

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#111827' },
  ],
}
```

### 7. 発展: オフライン対応

電波がないときにも「オフラインです」のページを出したい人向け。Service Worker（ブラウザの裏側で動き、通信を横取りしてキャッシュを返すしくみ）が必要になる。Next.js公式では [Serwist](https://github.com/serwist/serwist) が紹介されている。キャッシュの扱いを間違えると古いページが出続けるので、手順1〜6が終わってから取り組む。

## 注意・ヒント

- **インストールにはHTTPSが必須**。Vercelは自動でHTTPSになるので、デプロイ済みのブログならそのまま条件を満たしている
- **ホーム画面に追加できるようにするだけなら、Service Workerは不要**（Next.js公式ガイドにも記載あり）。今回はmanifestとアイコンに集中する
- アイコンや名前を変えても、ホーム画面に追加済みのアプリにはすぐ反映されないことがある。そのときは一度削除して追加し直す
- 調べものをすると `next-pwa` を使う記事がよく出てくるが、更新が止まっている。古い記事の手順はそのまま真似しない
- LighthouseのPWA診断は廃止されている。確認はDevToolsのApplicationパネルで行う
- プッシュ通知もPWAの機能だが、通知を送るサーバー側のしくみが必要になるため、この授業では扱わない

## AI実装用プロンプト（2段階）

一気に全部やらず、1つずつ実行しては動作確認する。VS Code（Copilot）のエージェントモードに貼り付けて使う。

### プロンプト① manifestの作成

```javascript
このNext.jsブログに app/manifest.ts を作成して、PWAとしてホーム画面に追加できるようにしてください。

要件:
- アイコンは public/icon-192.png・public/icon-512.png・public/icon-maskable-512.png を参照する（maskable版は purpose: "maskable"）
- display は standalone
- theme_color と background_color は、サイトで使っているCSS変数（色トークン）の値に合わせる
- Service Workerやオフライン対応は入れない

最後に、manifestの各項目がスマホ上のどこに表示されるのかを一覧表で説明してください。
```

→ できたら確認: DevToolsの Application → Manifest にエラーが出ていないか

### プロンプト② iPhone向けの「ホーム画面に追加」案内

```javascript
iPhoneのSafariでブログを開いたときだけ、画面下に「共有ボタン → ホーム画面に追加 でアプリとして使えます」
という案内バーを表示するコンポーネントを作ってください。

要件:
- すでにホーム画面から開いている（display-mode: standalone）ときは表示しない
- 閉じるボタンを付け、閉じたらlocalStorageに記録して再表示しない
- デザインはブログの既存の色トークン・フォントに合わせる

最後に、iPhoneとAndroidでインストール方法が違う理由を初心者向けに説明してください。
```

→ できたら確認: PCのChromeのデバイスモードでiPhoneを選んで表示されるか、閉じたら再表示されないか

※ アイコン画像はAIに作らせず、Figmaで自作して配置する。ホーム画面に並ぶアプリの顔として、デザインの見せ場にする。

## 参考リンク

- [Next.js公式: PWAガイド](https://nextjs.org/docs/app/guides/progressive-web-apps) — manifest・プッシュ通知・Service Workerまでの全体像
- [Next.js公式: manifest.json](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/manifest) — `app/manifest.ts` の書き方
- [MDN: ウェブアプリマニフェスト](https://developer.mozilla.org/ja/docs/Web/Progressive_web_apps/Manifest) — manifestの各項目の意味（日本語）
- [Maskable.app](https://maskable.app/) — maskableアイコンが切り抜かれたときの見え方をプレビューできる
- [What PWA Can Do Today](https://whatpwacando.today/) — PWAでできることを実機で試せるデモサイト
- [Serwist](https://github.com/serwist/serwist) — 発展のオフライン対応で使うライブラリ
