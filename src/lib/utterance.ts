/**
 * 發話的音韻模型 / Phonetic model of an utterance
 *
 * 這裡只描述音段：時間界線、國際音標、基頻（聲調）、共振峰、噪音頻帶。
 * 波形的合成與幾何在 waveform.ts。
 *
 * 這不是真實錄音的分析結果，而是以音韻參數程序生成的示意波形。
 * 任何使用處都必須標註為示意（見 PRODUCT.md「不得編造」清單）。
 * 要換成真實錄音，見 MAINTENANCE.md →「把波形換成真實錄音」。
 */

export type SegmentKind = 'voiced' | 'nasal' | 'glide' | 'noise' | 'closure';

export interface Segment {
  /** 國際音標標記，標註層會原樣排印 */
  ipa: string;
  /** 起始秒數 */
  start: number;
  /** 結束秒數 */
  end: number;
  kind: SegmentKind;
  /**
   * 基頻（Hz）控制點，沿音段等距取樣。聲調就寫在這裡。
   * 不給就是無聲段，合成時只出噪音。
   */
  f0?: number[];
  /**
   * 共振峰軌跡，外層為 F1…F4，內層是沿音段等距的 Hz 控制點。
   * 合成時用來加權諧波，決定波形的形狀。
   */
  formants?: number[][];
  /** 亂流噪音的頻帶 [低, 高]，單位 Hz。擦音、塞擦音用。 */
  noise?: [number, number];
  /** 是否在音段起點有爆發（塞音除阻） */
  burst?: boolean;
  /** 整段振幅係數，0–1。鼻音與滑音通常較弱。 */
  amp?: number;
}

/**
 * 「李嘉峻」· lǐ jiā jùn · [li˨˩˦ t͡ɕja˥ t͡ɕyn˥˩]
 * 共振峰值取自華語元音的常見範圍；聲調以基頻控制點表示。
 */
export const UTTERANCE_ZH: Segment[] = [
  {
    ipa: 'l',
    start: 0,
    end: 0.08,
    kind: 'voiced',
    f0: [116, 108],
    formants: [[350, 320], [1100, 1820], [2600, 2820], [3400, 3420]],
    amp: 0.62,
  },
  {
    ipa: 'i',
    start: 0.08,
    end: 0.33,
    kind: 'voiced',
    // 上聲 214：先降後升
    f0: [108, 92, 86, 104, 132],
    formants: [[300, 292, 290], [2250, 2300, 2330], [2950, 3020, 3060], [3600, 3640, 3660]],
    amp: 0.92,
  },
  {
    ipa: 't͡ɕ',
    start: 0.33,
    end: 0.45,
    kind: 'noise',
    noise: [3000, 7600],
    burst: true,
    amp: 0.42,
  },
  {
    ipa: 'ja',
    start: 0.45,
    end: 0.72,
    kind: 'voiced',
    // 陰平 55：高平
    f0: [150, 152, 151],
    formants: [[320, 560, 790], [2300, 1700, 1250], [2900, 2700, 2500], [3500, 3400, 3320]],
    amp: 1,
  },
  {
    ipa: 't͡ɕ',
    start: 0.72,
    end: 0.84,
    kind: 'noise',
    noise: [3000, 7600],
    burst: true,
    amp: 0.4,
  },
  {
    ipa: 'y',
    start: 0.84,
    end: 1.0,
    kind: 'voiced',
    // 去聲 51：高降
    f0: [158, 140, 118],
    formants: [[300, 298], [1900, 1810], [2300, 2260], [3400, 3360]],
    amp: 0.86,
  },
  {
    ipa: 'n',
    start: 1.0,
    end: 1.12,
    kind: 'nasal',
    f0: [112, 88],
    formants: [[262, 250], [1450, 1400], [2500, 2500]],
    amp: 0.34,
  },
];

/**
 * 「BEDO」· [ˈbeɪ.doʊ]
 * 使用者確認的對外綽號；英文版排印這一個。
 */
export const UTTERANCE_EN: Segment[] = [
  {
    ipa: 'b',
    start: 0,
    end: 0.07,
    kind: 'noise',
    noise: [300, 3200],
    burst: true,
    amp: 0.36,
  },
  {
    ipa: 'eɪ',
    start: 0.07,
    end: 0.38,
    kind: 'voiced',
    f0: [136, 128, 120],
    formants: [[520, 420, 332], [1900, 2140, 2300], [2550, 2760, 2900], [3400, 3460, 3500]],
    amp: 1,
  },
  {
    ipa: 'd',
    start: 0.38,
    end: 0.46,
    kind: 'noise',
    noise: [1500, 5200],
    burst: true,
    amp: 0.4,
  },
  {
    ipa: 'oʊ',
    start: 0.46,
    end: 0.82,
    kind: 'voiced',
    f0: [118, 106, 94],
    formants: [[500, 440, 392], [920, 850, 782], [2500, 2470, 2450], [3300, 3300, 3300]],
    amp: 0.9,
  },
];

/**
 * 「LI BE DO」· [li bi doʊ]
 * 頂部捲動軸用的波形。中英文版共用這一個。
 */
export const UTTERANCE_LIBEDO: Segment[] = [
  { ipa: 'l', start: 0, end: 0.06, kind: 'voiced', f0: [118, 112], formants: [[350, 320], [1100, 1800], [2600, 2800], [3400, 3420]], amp: 0.55 },
  { ipa: 'i', start: 0.06, end: 0.24, kind: 'voiced', f0: [112, 120, 116], formants: [[300, 292], [2250, 2320], [2950, 3040], [3600, 3650]], amp: 0.92 },
  { ipa: 'b', start: 0.24, end: 0.3, kind: 'noise', noise: [300, 3000], burst: true, amp: 0.34 },
  { ipa: 'i', start: 0.3, end: 0.5, kind: 'voiced', f0: [130, 138, 128], formants: [[310, 300], [2200, 2300], [2900, 3000], [3550, 3600]], amp: 1 },
  { ipa: 'd', start: 0.5, end: 0.56, kind: 'noise', noise: [1500, 5200], burst: true, amp: 0.36 },
  { ipa: 'oʊ', start: 0.56, end: 0.86, kind: 'voiced', f0: [124, 110, 96], formants: [[500, 440, 392], [920, 850, 782], [2500, 2460, 2450], [3300, 3300, 3300]], amp: 0.88 },
];
