This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

# ポケモンクイズ

ポケモンの英語名と画像を見て、正しいポケモン名を選択肢から選ぶクイズ形式のゲームアプリです。  
PokeAPI からデータを取得し、React/Next.js を用いてフロントエンドを構築しています。

---

## 🚀 作品概要

- ポケモンの「英語名」と「公式画像」を表示  
- 4択の中から正しいポケモン名を選択  
- 正解／不正解のフィードバック  
- 出題はランダム生成で何度でも遊べる  

---

## 🛠 使用技術

- **Next.js**
- **React**
- **TypeScript**
- **Bootstrap**
- **PokeAPI**

---

## 💡 苦労した点

- **PokeAPI から必要な情報（英語名・画像など）を取得する処理**
- **アプリの構造を一から作り上げたこと**
- 非同期処理やコンポーネント分割の設計に時間を要した

---

## 📚 学んだこと

- **API からデータを取得し、フロントで扱う一連の流れ**
- Fetch / axios による外部データ通信の理解
- Next.js を使ったページ構成とルーティング
- TypeScript での型管理と安全なコーディング

---

## ▶️ 今後の改善予定

- 難易度選択機能の追加  
- タイムアタックモードの実装  
- UI をよりポケモン風にブラッシュアップ  

---

## 📦 セットアップ & 実行

```bash
# 依存関係のインストール
npm install

# 開発サーバー起動
npm run dev

# 本番ビルド
npm run build
npm start
