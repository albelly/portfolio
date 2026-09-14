/**
 * サイト全体の設定・データを一元管理するファイル。
 *
 * 【この後の工程で編集する場所】
 *  - profile      : 自己紹介文（全ページ冒頭に表示される）
 *  - categories   : カテゴリの名前・説明・テーマ
 *  - works        : 作品データ（ここに追記すれば一覧に自動で並ぶ）
 */

/* ------------------------------------------------------------------
 * カテゴリ
 * ------------------------------------------------------------------ */

/** カテゴリの識別子。テーマ名（themes.css の data-theme）と対応する。 */
export type CategoryId = 'web' | 'apps' | 'images';

/** ナビゲーションの識別子。TOP を含む。 */
export type NavId = 'top' | CategoryId;

export interface Category {
  id: CategoryId;
  /** タブに表示する名前 */
  label: string;
  /** タブの下に小さく出る補足（英語表記など） */
  sub: string;
  /** リンク先 */
  href: string;
  /** カテゴリページの見出し */
  heading: string;
  /** カテゴリページの説明文 */
  description: string;
}

export const categories: Category[] = [
  {
    id: 'web',
    label: 'Web・LP制作',
    sub: 'Websites & Landing Pages',
    href: '/web/',
    heading: 'Web・LP制作',
    // TODO: Phase 2 で本文を差し替え
    description:
      'コーポレートサイト、サービスサイト、キャンペーン用ランディングページの制作を行っています。デザインから実装、公開までを一貫して対応します。',
  },
  {
    id: 'apps',
    label: 'Webアプリ',
    sub: 'Web Applications',
    href: '/apps/',
    heading: 'Webアプリ',
    // TODO: Phase 2 で本文を差し替え
    description:
      '業務効率化ツールや予約・管理システムなど、ブラウザ上で動作するアプリケーションを開発しています。小規模から段階的に育てる開発も歓迎です。',
  },
  {
    id: 'images',
    label: '画像生成',
    sub: 'Logo / Icon / Stamps',
    href: '/images/',
    heading: '画像生成',
    // TODO: Phase 2 で本文を差し替え
    description:
      'ロゴ、アイコン、LINEスタンプ、バナーなどのビジュアル制作を行っています。用途に合わせたテイストの調整やバリエーション展開にも対応します。',
  },
];

/** ヘッダータブに並べる項目（TOP + 3カテゴリ） */
export const navItems: { id: NavId; label: string; sub: string; href: string }[] = [
  { id: 'top', label: 'TOP', sub: 'Home', href: '/' },
  ...categories.map((c) => ({ id: c.id as NavId, label: c.label, sub: c.sub, href: c.href })),
];

/** id からカテゴリを引く */
export function getCategory(id: CategoryId): Category {
  const found = categories.find((c) => c.id === id);
  if (!found) throw new Error(`Unknown category: ${id}`);
  return found;
}

/* ------------------------------------------------------------------
 * プロフィール（全ページ冒頭の自己紹介エリア）
 * ------------------------------------------------------------------ */

export interface Profile {
  name: string;
  /** 肩書き */
  role: string;
  /** 一言キャッチ。meta description の既定値にも使う */
  tagline: string;
  /** 自己紹介の本文（段落ごとに配列で持つ） */
  intro: string[];
  /** 「できること」の箇条書き */
  skills: { title: string; body: string }[];
  /** 問い合わせ先（Phase 4 で実際の値に差し替え） */
  contact: { label: string; href: string }[];
}

export const profile: Profile = {
  // TODO: Phase 2 で実際の情報に差し替え
  name: 'Your Name',
  role: 'Web Designer / Developer',
  tagline: 'Web制作・Webアプリ開発・画像生成を一人で完結できる制作者です。',
  intro: [
    'はじめまして。Webサイト制作、Webアプリ開発、ロゴやアイコンなどの画像制作を行っています。',
    '企画から公開・運用までを一貫して担当できるため、複数の外注先とやり取りする手間をかけずに進められます。小規模な修正から新規立ち上げまで、規模を問わずご相談ください。',
  ],
  skills: [
    {
      title: 'Web・LP制作',
      body: 'デザインからコーディング、公開作業まで対応。スマートフォン表示も標準で最適化します。',
    },
    {
      title: 'Webアプリ開発',
      body: 'フォーム、予約、管理画面など、業務に合わせた仕組みを構築します。',
    },
    {
      title: '画像生成・デザイン',
      body: 'ロゴ、アイコン、LINEスタンプ、バナーなど、用途に応じたビジュアルを制作します。',
    },
  ],
  contact: [
    // TODO: Phase 4 で実際の連絡先に差し替え
    { label: 'お問い合わせ', href: '#contact' },
  ],
};

/* ------------------------------------------------------------------
 * 作品データ
 * ------------------------------------------------------------------ */

/**
 * 作品の見せ方。
 *  - 'iframe' : 別サイトとして作った作品を画面内に埋め込む（Web・LP向け）
 *  - 'link'   : サムネイル＋別タブで開くリンク（重いサイトや外部サービス向け）
 *  - 'image'  : 画像そのものを説明付きで並べる（画像生成向け）
 */
export type EmbedType = 'iframe' | 'link' | 'image';

export interface Work {
  /** URL やキーに使う一意のID */
  id: string;
  title: string;
  category: CategoryId;
  /** 一覧カードに出す短い説明 */
  summary: string;
  /** 詳細説明（画像生成ページなどで本文として使う） */
  description?: string;
  /** 制作年など */
  year?: string;
  /** 使用技術・タグ */
  tags: string[];
  embedType: EmbedType;
  /** embedType が 'iframe' / 'link' のときの公開URL */
  url?: string;
  /** サムネイル、または embedType が 'image' のときの画像パス（public/ 起点） */
  image?: string;
  /** TOPページの抜粋一覧に出すかどうか */
  featured?: boolean;
}

/**
 * 作品一覧。
 * Phase 3 でここに実際の作品を追記していく。
 * 現在はレイアウト確認用のプレースホルダー。
 */
export const works: Work[] = [
  {
    id: 'sample-lp',
    title: 'サンプルLP（準備中）',
    category: 'web',
    summary: 'キャンペーン用ランディングページの制作例を掲載予定です。',
    year: '2026',
    tags: ['LP', 'レスポンシブ'],
    embedType: 'iframe',
    // url: 'https://example.com/',
    featured: true,
  },
  {
    id: 'sample-corporate',
    title: 'サンプルコーポレートサイト（準備中）',
    category: 'web',
    summary: '企業サイトの制作例を掲載予定です。',
    year: '2026',
    tags: ['コーポレート', 'CMS'],
    embedType: 'link',
    // url: 'https://example.com/',
  },
  {
    id: 'sample-app',
    title: 'サンプル管理ツール（準備中）',
    category: 'apps',
    summary: '業務効率化を目的としたWebアプリの制作例を掲載予定です。',
    year: '2026',
    tags: ['管理画面', 'フォーム'],
    embedType: 'link',
    // url: 'https://example.com/',
    featured: true,
  },
  {
    id: 'sample-logo',
    title: 'サンプルロゴ（準備中）',
    category: 'images',
    summary: 'ロゴ制作の事例を掲載予定です。',
    description:
      'ここに制作意図、提案したバリエーション、最終的に採用された案などの説明文が入ります。',
    year: '2026',
    tags: ['ロゴ', 'ブランディング'],
    embedType: 'image',
    // image: '/works/sample-logo.png',
    featured: true,
  },
  {
    id: 'sample-stamp',
    title: 'サンプルLINEスタンプ（準備中）',
    category: 'images',
    summary: 'LINEスタンプの制作事例を掲載予定です。',
    description: 'ここにテイストの方向性や、表情・ポーズのバリエーションについての説明文が入ります。',
    year: '2026',
    tags: ['LINEスタンプ', 'キャラクター'],
    embedType: 'image',
    // image: '/works/sample-stamp.png',
  },
];

/** 指定カテゴリの作品を取り出す */
export function worksByCategory(category: CategoryId): Work[] {
  return works.filter((w) => w.category === category);
}

/** TOPページ用の抜粋（featured を優先し、足りなければ先頭から補う） */
export function featuredWorks(limit = 3): Work[] {
  const featured = works.filter((w) => w.featured);
  const rest = works.filter((w) => !w.featured);
  return [...featured, ...rest].slice(0, limit);
}

/* ------------------------------------------------------------------
 * サイト共通のメタ情報
 * ------------------------------------------------------------------ */

export const site = {
  title: `${profile.name} | ポートフォリオ`,
  shortTitle: profile.name,
  description: profile.tagline,
};
