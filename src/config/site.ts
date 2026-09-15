/**
 * サイト全体の設定・データを一元管理するファイル。
 *
 * 文面は3サービス（クラウドワークス / ランサーズ / ココナラ）の
 * 公開プロフィールと整合させている。
 *
 * 【ブランド方針の要点】
 *  - 前に出すもの: Webデザイン / Webサイト・LP制作 / 見やすさ・使いやすさ /
 *    要望を整理して形にする力 / 納品前の品質確認 / 相談しやすさ
 *  - 制作手段としてのAIツール名は公開面に出さない
 *  - 「バグ」→「動作上の問題」、「完成後に確認」→「納品前には実際に操作しながら」
 *  - 同じ強み（見やすさ・使いやすさ）を文中で二度説明しない
 *  - セリフ部分には「」を付ける
 *  - 件数（「1サイト制作」など）は書かない
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
    description:
      'Webサイト・LP制作を中心に、見やすく使いやすいWebデザインを意識して制作しています。初めて訪れた方でも迷わず操作でき、伝えたい内容が自然に届くかどうかを基準に組み立てています。',
  },
  {
    id: 'apps',
    label: 'Webアプリ',
    sub: 'Web Applications',
    href: '/apps/',
    heading: 'Webアプリ',
    description: 'ブラウザ上で動作する小規模なツールを、個人制作として作っています。',
  },
  {
    id: 'images',
    label: '画像生成',
    sub: 'Logo / Icon / Stamps',
    href: '/images/',
    heading: '画像生成',
    description: 'ロゴ、アイコン、LINEスタンプなどのビジュアル制作です。',
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
  role: string;
  /** キャッチフレーズ。クラウドワークス・ランサーズと同一文言 */
  tagline: string;
  /** 自己紹介の導入（段落ごとに配列で持つ） */
  intro: string[];
  /** 依頼者側の悩みを代弁するセリフ。「」付きで表示する */
  voices: string[];
  /** セリフを受ける一文 */
  voicesAnswer: string;
  /** 【対応可能な業務】 */
  services: { title: string; body: string }[];
  /** 品質確認・経歴・締めの段落 */
  closing: string[];
  /** 稼働条件 */
  workStyle: { label: string; value: string }[];
  /** 各サービスの公開プロフィール（依頼はここから） */
  profiles: { label: string; href: string; note: string }[];
}

export const profile: Profile = {
  // 表記ゆれ: ココナラ「クオン。」／クラウドワークス・ランサーズ「くおん。」
  // 本文中は「クオン」で統一しているため、サイト上もこれに合わせている。
  name: 'クオン',
  role: 'Webデザイナー',
  tagline: '伝えたい魅力を、見やすいWebデザインで形にします',

  intro: [
    'はじめまして、クオンと申します。',
    'Webサイト・LP制作を中心に、見やすさと使いやすさを意識したWebデザインを心がけています。見た目の印象だけでなく、初めて訪れた方でも迷わず操作でき、伝えたい内容が自然に届くWebサイトづくりを大切にしています。',
  ],

  voices: [
    'こんなサイトにしたいけれど、うまく言葉にできない',
    'イメージはあるけれど、どう形にすればいいか分からない',
  ],
  voicesAnswer:
    'そのような段階からでも、丁寧にお話を伺い、ご要望や目的を一緒に整理しながら制作を進めます。',

  services: [
    {
      title: 'Webサイト制作',
      body: '構成の検討からデザイン、公開までを一貫して対応します。',
    },
    {
      title: 'LP制作',
      body: '伝えたい内容が最後まで読まれる流れを意識して組み立てます。',
    },
    {
      title: 'HTML・CSSコーディング',
      body: 'デザインをもとに、表示崩れのないページに仕上げます。',
    },
    {
      title: 'Webサイトの修正・更新',
      body: 'テキストや画像の差し替え、レイアウト調整など、軽微な修正・追加対応が可能です。',
    },
  ],

  closing: [
    '納品前には実際に操作しながら、表示崩れや動作上の問題、仕様とのズレがないかを確認し、最後まで丁寧に仕上げます。',
    'これまで接客、IT関連業務、現場管理など、さまざまな仕事を経験してきました。その経験を活かし、相手に合わせた柔軟な対応と、気軽に相談していただけるコミュニケーションを心がけています。',
    'お仕事を終えたときに、「頼んでよかった」「話しやすかった」と思っていただけることが一番うれしいです。一つひとつのご依頼に責任を持って丁寧に対応いたします。まずはお気軽にご相談ください。',
  ],

  workStyle: [
    { label: '稼働時間', value: '週20時間程度（週4日 × 5時間目安）' },
    { label: '稼働時間帯', value: '平日夜間、土日・祝日' },
    { label: '返信', value: '原則当日中、遅くとも24時間以内' },
    { label: '勤務場所', value: 'フルリモート' },
    { label: '打ち合わせ', value: 'Slack / Zoom / Discord、各サイトのメッセージに対応' },
    { label: '時間単価', value: '1,500円 〜 2,000円' },
  ],

  profiles: [
    {
      label: 'クラウドワークス',
      href: 'https://crowdworks.jp/public/employees/7178099',
      note: 'くおん。',
    },
    {
      label: 'ランサーズ',
      href: 'https://www.lancers.jp/profile/qon_nekonari',
      note: 'くおん。',
    },
    {
      label: 'ココナラ',
      href: 'https://coconala.com/users/6271776',
      note: 'クオン。',
    },
  ],
};

/* ------------------------------------------------------------------
 * 作品データ
 * ------------------------------------------------------------------ */

/**
 * 作品の見せ方。
 *  - 'iframe' : 別サイトとして作った作品を画面内に埋め込む（Web・LP向け）
 *  - 'link'   : サムネイル＋別タブで開くリンク（重いサイトや外部サービス向け）
 *  - 'image'  : 画像そのものを説明付きで並べる
 */
export type EmbedType = 'iframe' | 'link' | 'image';

export interface Work {
  id: string;
  title: string;
  category: CategoryId;
  /** 一覧カードに出す短い説明 */
  summary: string;
  /** 詳細説明 */
  description?: string;
  year?: string;
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
 * 実際の作品ができ次第ここに追記する。現在はレイアウト確認用。
 */
export const works: Work[] = [
  {
    id: 'sample-lp',
    title: 'LP制作（準備中）',
    category: 'web',
    summary: '個人制作によるランディングページを掲載予定です。',
    year: '2026',
    tags: ['LP', 'レスポンシブ'],
    embedType: 'iframe',
    featured: true,
  },
  {
    id: 'sample-corporate',
    title: 'Webサイト制作（準備中）',
    category: 'web',
    summary: '個人制作によるWebサイトを掲載予定です。',
    year: '2026',
    tags: ['Webサイト', 'HTML・CSS'],
    embedType: 'link',
    featured: true,
  },
  {
    id: 'sample-app',
    title: 'Webツール（準備中）',
    category: 'apps',
    summary: 'ブラウザ上で動作する個人制作のツールを掲載予定です。',
    year: '2026',
    tags: ['個人制作'],
    embedType: 'link',
    featured: true,
  },
  {
    id: 'sample-logo',
    title: 'ロゴ（準備中）',
    category: 'images',
    summary: 'ロゴ制作の事例を掲載予定です。',
    description: 'ここに制作意図や提案したバリエーションの説明が入ります。',
    year: '2026',
    tags: ['ロゴ'],
    embedType: 'image',
  },
  {
    id: 'sample-stamp',
    title: 'LINEスタンプ（準備中）',
    category: 'images',
    summary: 'LINEスタンプの制作事例を掲載予定です。',
    description: 'ここにテイストの方向性や表情・ポーズのバリエーションの説明が入ります。',
    year: '2026',
    tags: ['LINEスタンプ'],
    embedType: 'image',
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
  title: `${profile.name} | Webサイト・LP制作`,
  shortTitle: profile.name,
  description: `${profile.tagline}。Webサイト制作・LP制作・HTML/CSSコーディング・Webサイトの修正や更新に対応しています。`,
};
