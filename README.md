# portfolio

クライアントワーク獲得用のポートフォリオサイト。Astro による静的サイト。

## 開発

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # dist/ に出力
npm run preview  # ビルド結果を確認
```

## 構成

| パス | 役割 |
| --- | --- |
| `src/config/site.ts` | **カテゴリ・自己紹介文・作品データの一元管理**。内容の更新は基本ここ |
| `src/layouts/BaseLayout.astro` | 全ページ共通の骨格。`theme` で配色を切り替える |
| `src/components/CategoryTabs.astro` | 最上部のタブ。右上メニューでも同じものを使い回す |
| `src/components/FloatingMenu.astro` | スクロールでタブが画面外に出たとき右上に出るメニュー |
| `src/components/IntroSection.astro` | 全ページ冒頭の自己紹介エリア |
| `src/components/WorkGrid.astro` | 作品一覧。iframe / リンク / 画像を出し分ける |
| `src/styles/themes.css` | **テーマ（配色）の定義**。カテゴリごとの雰囲気はここで調整 |
| `src/styles/global.css` | リセットと共通スタイル |
| `src/pages/index.astro` | TOPページ |
| `src/pages/[category].astro` | カテゴリページ。公開中のカテゴリの数だけ自動生成される |

## ページ

| URL | 内容 | テーマ | 公開 |
| --- | --- | --- | --- |
| `/` | TOP | `base` | 公開 |
| `/web/` | Web・LP制作 | `web` | 公開 |
| `/apps/` | Webアプリ | `apps` | 非公開 |
| `/images/` | ロゴ・アイコン制作 | `images` | 非公開 |

3サービス（クラウドワークス・ランサーズ・ココナラ）の公開プロフィールでは
Webデザインに軸を絞っているため、このサイトも Web・LP制作のみを公開している。

## カテゴリの追加・復活

`src/config/site.ts` の `categories` で `enabled: true` にするか、配列に1つ追記する。
それだけでタブ・メニュー・ページ（`/<id>/`）・TOPのカテゴリ欄・作品一覧がすべて追随する。
新しい配色を使う場合のみ `src/styles/themes.css` に `[data-theme="<theme>"]` を足す。

## 作品の追加方法

`src/config/site.ts` の `works` 配列に追記する。`embedType` で見せ方が決まる。

- `iframe` … 別サイトとして作った作品を画面内に埋め込む
- `link` … サムネイル＋別タブで開くリンク
- `image` … 画像を直接表示（`image` に `public/` 起点のパスを指定）

## 公開

Netlify に接続すると `netlify.toml` の設定でビルドされる（`npm run build` → `dist`）。
