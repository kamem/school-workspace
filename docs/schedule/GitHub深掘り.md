# GitHub深掘り（ブランチ・PR・チーム開発・worktree）

- 日付: 未定
- 分類: 環境構築
- 完了: [ ]
- Notion: https://app.notion.com/3ad00b59eb1581b99825e1e9db3ead1e

---

## この回でやること

前期の「1人でcommit → push」から一歩進んで、**ブランチとPR**——実務でコードが世に出る流れ——を一周する。おまけに、AIと並行で作業するための `git worktree` も触る。

## 手順

### 1. ブランチ — mainを壊さないための分岐

- ブランチ = 「分岐したセーブデータ」
- `git switch -c feature/add-profile` → 作業 → commit
- ブランチを行き来して、**ファイルの中身が切り替わるのを目で見る**
- 名前の慣習：`feature/` `fix/`

### 2. Pull Request — レビューしてもらってからmainに入れる

- push → GitHubでPR作成 → 差分を見る → レビュー → マージ
- PR説明文は「**何を・なぜ・どう確認したか**」の3点
- CopilotにPRレビューさせてみる（採用するかは人間が決める）
- PRは実務でコードが世に出る唯一の道。就職後は毎日やる操作になる

### 3. 3人で1つのリポジトリ（演習）

- 各自ブランチを切る → PR → **お互いのPRをレビュー** → マージ
- わざと同じ行を編集して**コンフリクトを起こし、直す**。コンフリクトは事故じゃなく日常
- 作業前に `git pull` する習慣をつける

### 4. git worktree — 作業場所を増やす

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
