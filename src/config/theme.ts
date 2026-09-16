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

export type SeasonId = 'spring' | 'summer' | 'autumn' | 'winter';
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

/** 既定のテーマ。JavaScript が無効な環境ではこれが表示される */
export const defaultTheme = { season: 'autumn' as SeasonId, time: 'day' as TimeId };

/** 「秋の日中」のような表示名を作る */
export function themeName(season: SeasonId, time: TimeId): string {
  const s = seasons.find((x) => x.id === season)?.label ?? '';
  const t = timeBands.find((x) => x.id === time)?.label ?? '';
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

/** localStorage のキー */
export const STORAGE_KEY = 'qon-theme';
