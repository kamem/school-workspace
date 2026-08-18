# Homebrew・mise・Node.jsインストール

- 日付: 2026-09-04
- 分類: 環境構築
- 完了: [ ]
- Notion: https://app.notion.com/3a100b59eb15815a8669d99a3f0502de

---

## ねらい

以降の授業で使うNode.js環境を全員分整える。バージョン管理ツール（mise）経由で入れることで、プロジェクトごとにNodeのバージョンを切り替えられる状態にする。

## 進め方（中盤30分）

Homebrew → mise → Node.js の順に入れる。

### 1. Homebrew

- 公式サイト: [https://brew.sh/ja/](https://brew.sh/ja/)
- Macのパッケージ管理ツール。ターミナルからコマンド1つでツールを入れられる
- インストール（公式サイト掲載のコマンドをターミナルに貼り付けて実行）:

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

- 途中でMacのパスワード入力とEnterを求められる
- 完了後、インストーラー末尾に表示される「Next steps」のコマンド（PATH設定）を忘れず実行
- `brew -v` でバージョンが出ればOK

### 2. mise

- 公式サイト: [https://mise.jdx.dev/](https://mise.jdx.dev/)
- Node.jsなどの実行環境のバージョン管理ツール。プロジェクトごとにバージョンを固定・切り替えできる

```bash
brew install mise
```

- シェルへの組み込み（zsh）:

```bash
echo 'eval "$(mise activate zsh)"' >> ~/.zshrc
source ~/.zshrc
```

### 3. Node.js（mise経由）

```bash
mise use --global node@lts
```

### 4. 動作確認

```bash
mise -v
node -v
npm -v
```

3つともバージョン番号が表示されれば完了。

## Windowsの場合（fnm）

Windowsはmiseの代わりに **fnm（Fast Node Manager）** を使う。「バージョン管理ツール経由でNodeを入れる」という考え方はmiseと同じ。Git Bashとの相性も良い。

- 公式サイト: [https://github.com/Schniz/fnm](https://github.com/Schniz/fnm)

### 1. fnmのインストール（PowerShellで実行）

```powershell
winget install Schniz.fnm
```

### 2. Git Bashへの組み込み

Git Bashを開いて以下を実行（起動時にfnmが有効になる）:

```bash
echo 'eval "$(fnm env --use-on-cd --shell bash)"' >> ~/.bashrc
source ~/.bashrc
```

### 3. Node.jsのインストール

```bash
fnm install --lts
fnm default lts-latest
```

### 4. 動作確認

```bash
fnm --version
node -v
npm -v
```

miseとfnmの対応: `mise use --global node@lts` ↔ `fnm install --lts` + `fnm default`

## 準備

- [ ] 学生のPC環境（Mac/Windows）を事前確認
- [ ] Windowsの学生がGit for Windows（Git Bash）導入済みか確認

## 備考

- うまくいかない場合の退避策: Node.js[公式インストーラー](https://nodejs.org/)で直接入れても授業は進められる
- トラブル対応の時間を多めに確保しておく
