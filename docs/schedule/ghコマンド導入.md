# ghコマンド導入（GitHub CLI）

- 日付: 未定
- 分類: 環境構築
- 完了: [ ]
- Notion:

---

## この回でやること

ブラウザを開かずにPR作成・レビュー確認ができる公式CLI（`gh`）を、**インストールから認証まで**通す。次の [GitHub深掘り](GitHub深掘り.md) や、あとで出てくる `gh stack`・AIエージェント連携の前提になる。

## 手順

### 1. インストール

**macOS（Homebrew）**

```bash
brew install gh
gh --version
```

`brew: command not found` なら、先に [Homebrew・mise・Node.jsインストール](Homebrew・mise・Node.jsインストール.md) を済ませる。

**Windows（インストーラ）**

1. [GitHub CLI のリリース](https://cli.github.com/) から Windows 用インストーラを入手して実行
2. コマンドプロンプト（または PowerShell）を開き直して `gh --version`

### 2. 認証（mac / Windows 共通）

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

### 3. 動くか確認する

```bash
gh repo list
```

自分のリポジトリが一覧できれば準備完了。次の回でブランチ・PRを触るときに `gh pr create` も使える。

## 参考

- macOS: [macOS環境でGitHub CLIをインストール&認証して、リポジトリクローンまで行う方法（Zenn）](https://zenn.dev/walnut_963/articles/15e7fbc77ef9a3)
- Windows: [github CLIをWindows11にインストールする（Zenn）](https://zenn.dev/torihazi/articles/882ab5c2b14850)
