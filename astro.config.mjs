// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  // Netlify で公開する前提。独自ドメインを取得したらここを書き換える。
  // 絶対URLやサイトマップの生成に使われるだけなので、開発中は未確定でも支障はない。
  site: 'https://albelly-portfolio.netlify.app',

  // 完全な静的サイトとして出力する（サーバー不要）
  output: 'static',

  build: {
    // /web/index.html の形で出力し、URL を /web/ に統一する
    format: 'directory',
  },
});
