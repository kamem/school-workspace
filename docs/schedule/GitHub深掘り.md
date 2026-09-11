# GitHub深掘り（ブランチ・gh・PR・チーム開発・stash・worktree）

- 日付: 未定
- 分類: 環境構築
- 完了: [ ]
- Notion: https://app.notion.com/3ad00b59eb1581b99825e1e9db3ead1e

---

## この回でやること

前期の「1人でcommit → push」から一歩進んで、**ブランチとPR**——実務でコードが世に出る流れ——を一周する。ターミナルからGitHubを扱う `gh`、途中作業の退避（`stash`）、AIと並行作業のための `git worktree` も触る。

## 手順

### 1. ブランチ — mainを壊さないための分岐

- ブランチ = 「分岐したセーブデータ」
- `git switch -c feature/add-profile` → 作業 → commit
- ブランチを行き来して、**ファイルの中身が切り替わるのを目で見る**
- 名前の慣習：`feature/` `fix/`

### 2. GitHub CLI（gh）— ターミナルからPRを出す道具

ブラウザを開かずにPR作成・レビュー確認ができる公式CLI。あとで出てくる `gh stack` や、AIエージェント連携でも前提になる。

**インストール**

macOS（Homebrew）:

```bash
brew install gh
gh --version
```

`brew: command not found` なら、先に [Homebrew・mise・Node.jsインストール](Homebrew・mise・Node.jsインストール.md) を済ませる。

Windows（インストーラ）:

1. [GitHub CLI のリリース](https://cli.github.com/) から Windows 用インストーラを入手して実行
2. コマンドプロンプト（または PowerShell）を開き直して `gh --version`

**認証（mac / Windows 共通）**

```bash
gh auth login
gh auth status
```

質問は矢印キーで選ぶ。おすすめはだいたい次のとおり。

| 質問 | おすすめ |
| ---- | -------- |
| Which account? | GitHub.com |
| Preferred protocol | HTTPS（SSH鍵があるなら SSH でも可） |
| How to authenticate? | Login with a web browser |
| Authenticate Git with your GitHub credentials? | Yes（出たら） |

ターミナルに出るワンタイムコードをブラウザに貼り付けて承認する。`gh auth status` でログイン中と出ればOK。トークン切れなどで動かなくなったら `gh auth login` をやり直す。

- 参考（macOS）: [macOS環境でGitHub CLIをインストール&認証して、リポジトリクローンまで行う方法（Zenn）](https://zenn.dev/walnut_963/articles/15e7fbc77ef9a3)
- 参考（Windows）: [github CLIをWindows11にインストールする（Zenn）](https://zenn.dev/torihazi/articles/882ab5c2b14850)

### 3. Pull Request — レビューしてもらってからmainに入れる

- push → GitHubでPR作成（ブラウザでも `gh pr create` でも可）→ 差分を見る → レビュー → マージ
- PR説明文は「**何を・なぜ・どう確認したか**」の3点
- CopilotにPRレビューさせてみる（採用するかは人間が決める）
- PRは実務でコードが世に出る唯一の道。就職後は毎日やる操作になる

### 4. 3人で1つのリポジトリ（演習）

- 各自ブランチを切る → PR → **お互いのPRをレビュー** → マージ
- わざと同じ行を編集して**コンフリクトを起こし、直す**。コンフリクトは事故じゃなく日常
- 作業前に `git pull` する習慣をつける

### 5. git stash — 途中の作業を一時退避

commitするほどではない変更を、いったんしまっておける仕組み。別ブランチに切り替えたいのに未commitの変更があって怒られたとき、などに使う。

```bash
git stash                # 変更を退避（作業ツリーをきれいにする）
git stash push -m "文言" # メッセージ付きで退避（後から探しやすい）
git stash list           # 退避一覧
git stash pop            # 最新を戻して一覧から消す
git stash apply          # 戻すが一覧には残す
git stash drop           # 指定した退避を捨てる
```

- stashは**ローカルだけ**。pushされないので「しまっておけばGitHubに残る」わけではない
- `pop` するとコンフリクトすることがある。戻す前に今の作業内容を意識する
- 「よく使うが、長く溜め込まない」。退避のまま忘れがちなので、すぐ戻すかcommitに昇格させる

### 6. git worktree — 作業場所を増やす

1つのリポジトリで**作業ディレクトリを複数持てる**仕組み。ブランチ切り替えもstashもいらなくなる。

```bash
git worktree add -b fix/header ../blog-fix   # 新ブランチ＋作業場所を作る
git worktree list                            # 一覧
git worktree remove ../blog-fix              # 片付け
```

**なぜ今これを学ぶか**：AIに「この修正やっといて」と任せている間、自分は別のworktreeで別の作業ができる。**エージェントに1つ、自分に1つ**が並行作業の基本形。Claude CodeやCopilot coding agentには自動でworktreeを使うものもある。

## 補足（余裕があれば）

**`--detach`**

`git worktree add --detach ../experiment` でブランチを作らず試せる。同じブランチは2つのworktreeで同時に開けないので、「mainと同じ内容でもう1つ作業場所が欲しい」ときの逃げ道。捨てる前提の検証ならdetach、残す作業ならブランチ付き。

**スタックプルリクエスト（gh stack）**

巨大な1PRにせず、依存する複数PRを積み上げる手法。`main ← #301（テーブル定義）← #302（サービス層）← #303（API）` のように各PRのbaseを前のPRのブランチにする。`gh stack init` → `add` → `submit` で一括PR作成、`gh stack sync` で下位PRマージ後のリベースまでやってくれる。AIエージェントに並列で実装させる文脈で注目されている。ここでは「こういう手法もある」と知っておけばOK。

- 参考記事: [スタックプルリクエスト入門 — gh stackの使い方と、AIエージェントの並列実装での活用（Findy Tech Blog）](https://tech.findy.co.jp/entry/2026/08/05/070000)

## 宿題

自分のブログリポジトリでブランチを切って作業し、PRを作って自分でマージするところまで。
