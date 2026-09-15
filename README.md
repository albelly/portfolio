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

## 作品を追加する

作品は `src/config/site.ts` の `works` 配列に追記する。
**ページ側のファイルは触らない。** 配列に足せば一覧に自動で並ぶ。

### 手順

1. 画像を使う場合は `public/works/` に置く（例: `public/works/cafe-lp.png`）
2. `works` 配列にオブジェクトを1つ追加する
3. `npm run dev` で表示を確認する

**配列の並び順がそのまま表示順**になる。新しい作品は先頭に足す。

### 書く項目

| 項目 | 必須 | 内容 |
| --- | --- | --- |
| `id` | ✅ | 半角英数の一意な名前。他の作品と重複させない |
| `title` | ✅ | 作品名 |
| `category` | ✅ | `'web'` など。**公開中のカテゴリのidと一致させる** |
| `summary` | ✅ | 一覧カードに出る1〜2文の説明 |
| `description` | | 詳しい説明。`layout: 'stack'` のカテゴリで本文として出る |
| `year` | | 制作年 |
| `tags` | ✅ | 分類の配列 |
| `embedType` | ✅ | 下表を参照 |
| `url` | △ | `iframe` / `link` のとき必須。公開URL |
| `repoUrl` | | ソースコードの公開先。どの型でも使える |
| `image` | △ | `image` のとき必須。`public/` を起点にしたパス |
| `featured` | | `true` にするとTOPの抜粋に出る |

### embedType の選び方

| 値 | 使う場面 | 必要なもの |
| --- | --- | --- |
| `iframe` | 別サイトとして公開済みで、画面内に埋め込んで見せたいもの | `url` |
| `link` | 別タブで開かせたいもの（重いサイト・外部サービス） | `url` ＋ `image` 推奨 |
| `image` | 画像そのものが作品のもの | `image` |
| `self` | このサイト自身のように、開くべき外部URLが無いもの | 任意で `image` / `repoUrl` |

> `self` がある理由: このサイト自身を `iframe` で埋め込むと、埋め込んだページにも
> 同じ一覧があるため入れ子が繰り返される。`link` にすると「サイトを開く」が
> いま見ているページを指してしまう。`self` はそのどちらも描画しない。

### 記入例

公開サイトを別タブで開かせる場合:

```ts
{
  id: 'cafe-lp',
  title: 'カフェのランディングページ',
  category: 'web',
  summary: '新規開店するカフェの告知用ページです。',
  year: '2026',
  tags: ['LP', 'HTML・CSS', 'レスポンシブ対応'],
  embedType: 'link',
  url: 'https://example.com/',
  image: '/works/cafe-lp.png',
  featured: true,
},
```

画面内に埋め込んで見せる場合:

```ts
{
  id: 'shop-site',
  title: '雑貨店のWebサイト',
  category: 'web',
  summary: '店舗紹介と商品一覧をまとめたサイトです。',
  year: '2026',
  tags: ['Webサイト', 'HTML・CSS'],
  embedType: 'iframe',
  url: 'https://example.com/',
},
```

### 文面を書くときの注意

公開プロフィール（クラウドワークス・ランサーズ・ココナラ）と表現を揃える。

- 制作手段としてのAIツール名は書かない
- 「バグ」ではなく「動作上の問題」
- 「完成後に確認」ではなく「納品前には実際に操作しながら」
- 「1サイト制作」などの件数は書かない
- 実力以上に見える技術名をタグに入れない（JavaScript は HTML・CSS より控えめに扱う）

次のコマンドで、書き出したHTMLに禁止表現が混ざっていないか確認できる。

```bash
npm run build
grep -riE "ChatGPT|Claude|Gemini|Codex|Dify|バグ|完成後|UI/UX" dist/
```

何も出力されなければ問題ない。

### つまずきやすい点

- `id` が他と重複しているとビルドが通らない
- `category` に**非公開カテゴリのid**を書くと、その作品はどこにも表示されない
- `image` のパスに `public/` を含めない（`public/works/a.png` → `/works/a.png`）

## 公開

Netlify に接続すると `netlify.toml` の設定でビルドされる（`npm run build` → `dist`）。
