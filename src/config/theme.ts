/**
 * 季節・時間帯テーマの定義。
 *
 * 【考え方】
 *  2つの軸に別々の役割を持たせている。
 *   季節 → 自然のモチーフ（桜・風鈴・紅葉・雪）。色は持たない
 *   時間 → 色（空・紙・墨・差し色のすべて）
 *
 * 色の値は src/styles/seasons.css、モチーフは src/styles/effects.css にある。
 * このファイルは「名前」と「自動判定の境目」だけを持つ。
 */

/** 'none' は季節のモチーフを出さない状態。空の色は時間帯に従う */
export type SeasonId = 'none' | 'spring' | 'summer' | 'autumn' | 'winter';
export type TimeId = 'dawn' | 'day' | 'dusk' | 'night';

export interface Season {
  id: SeasonId;
  label: string;
  /** 季節を表すモチーフ（切替パネルの補足に出す） */
  motif: string;
}

export interface TimeBand {
  id: TimeId;
  label: string;
  /** 切替パネルの補足に出す時刻の目安 */
  hours: string;
}

export const seasons: Season[] = [
  { id: 'none', label: 'なし', motif: '装飾なし' },
  { id: 'spring', label: '春', motif: '桜' },
  { id: 'summer', label: '夏', motif: '風鈴' },
  { id: 'autumn', label: '秋', motif: '紅葉' },
  { id: 'winter', label: '冬', motif: '雪' },
];

export const timeBands: TimeBand[] = [
  { id: 'dawn', label: '早朝', hours: '5〜9時' },
  { id: 'day', label: '日中', hours: '9〜17時' },
  { id: 'dusk', label: '夕暮れ', hours: '17〜19時' },
  { id: 'night', label: '夜', hours: '19〜5時' },
];

/**
 * 既定のテーマ。何も選んでいない初回のアクセスと、JavaScript が無効な環境ではこれになる。
 * 装飾のない、日中の明るく見やすい状態で最初に見せる。
 */
export const defaultTheme = { season: 'none' as SeasonId, time: 'day' as TimeId };

/** 「秋の日中」「季節なし・日中」のような表示名を作る */
export function themeName(season: SeasonId, time: TimeId): string {
  const t = timeBands.find((x) => x.id === time)?.label ?? '';
  if (season === 'none') return `季節なし・${t}`;
  const s = seasons.find((x) => x.id === season)?.label ?? '';
  return `${s}の${t}`;
}

/**
 * 画面に埋め込む、テーマ名の対応表。
 * 切り替えたときにブラウザ側で表示名を組み立てるために使う。
 */
export const themeLabels = {
  seasons: Object.fromEntries(seasons.map((s) => [s.id, s.label])),
  times: Object.fromEntries(timeBands.map((t) => [t.id, t.label])),
};

/**
 * localStorage のキー。保存される値は次のどちらか。
 *   'auto'            … 「いまの時刻に合わせる」を選んだ状態。訪問のたびに時計から決める
 *   'autumn/night' 等 … 手動で選んだ季節と時間帯
 * 何も保存されていなければ defaultTheme（季節なし・日中）になる。
 */
export const STORAGE_KEY = 'qon-theme';
export const AUTO_VALUE = 'auto';
