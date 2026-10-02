/**
 * 波形合成與幾何 / Waveform synthesis and geometry
 *
 * 從 utterance.ts 的音韻模型合成時域訊號，再按欄取極值，
 * 畫成機械筆式記錄儀那種精準的墨線 —— 不是暈開的灰塊。
 *
 * 渲染方式與真正的音訊編輯器相同：把訊號切成固定欄數，
 * 每一欄畫一條從該欄最小值到最大值的直線。
 */
import { rng } from './random';
import type { Segment } from './utterance';

/** SVG 使用者單位的畫布尺寸。縱橫比固定，實際尺寸由 CSS 決定。 */
export const CANVAS = { w: 1200, h: 300 } as const;

/** 合成取樣率。只需要足夠解析基頻與低階諧波。 */
const SAMPLE_RATE = 16000;

/** 波形的欄數。每一欄一條墨線。 */
const COLUMNS = 480;

/** 參與合成的諧波數 */
const HARMONICS = 14;

export interface Column {
  x: number;
  /** 該欄的最大值對應的 y */
  top: number;
  /** 該欄的最小值對應的 y */
  bottom: number;
}

export interface Boundary {
  x: number;
  /** 音段起點為 true；末端收束線為 false */
  onset: boolean;
}

export interface SegmentLabel {
  ipa: string;
  x: number;
  x1: number;
  x2: number;
}

export interface AmpTick {
  y: number;
  value: number;
  label: string;
  axis: boolean;
}

export interface TimeTick {
  x: number;
  seconds: number;
  label: string | null;
  major: boolean;
}

export interface Waveform {
  width: number;
  height: number;
  duration: number;
  columns: Column[];
  /** 零線（中軸）的 y */
  axisY: number;
  boundaries: Boundary[];
  labels: SegmentLabel[];
  ampTicks: AmpTick[];
  timeTicks: TimeTick[];
  /** 每個音段的峰值振幅，供讀值面板使用 */
  peaks: Array<{ start: number; end: number; peak: number }>;
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

function sampleTrack(points: number[], t: number): number {
  if (points.length === 0) return 0;
  if (points.length === 1) return points[0];
  const span = (points.length - 1) * Math.min(Math.max(t, 0), 1);
  const i = Math.min(Math.floor(span), points.length - 2);
  return lerp(points[i], points[i + 1], span - i);
}

/** 共振峰共振：每個諧波依其與共振峰的距離取得增益 */
function resonance(freq: number, formants: number[]): number {
  const bandwidths = [90, 120, 180, 260];
  const levels = [1, 0.72, 0.4, 0.22];
  let gain = 0.04;
  for (let i = 0; i < formants.length; i++) {
    const delta = (freq - formants[i]) / (bandwidths[i] ?? 260);
    gain += (levels[i] ?? 0.2) / (1 + delta * delta);
  }
  return gain;
}

/** 音段內的振幅包絡：起弱、中強、尾弱，塞音除阻另給一個尖峰 */
function envelope(phase: number, kind: Segment['kind'], burst: boolean): number {
  if (kind === 'noise') {
    // 除阻是個尖峰，之後是衰減的摩擦噪音
    const attack = burst ? Math.exp(-phase * 14) * 0.8 : 0;
    const body = Math.sin(Math.PI * Math.min(phase * 1.25, 1)) * 0.55;
    return Math.min(attack + body, 1);
  }
  const rise = Math.min(phase / 0.12, 1);
  const fall = Math.min((1 - phase) / 0.16, 1);
  return Math.min(rise, fall);
}

export function buildWaveform(segments: Segment[]): Waveform {
  const { w, h } = CANVAS;
  const duration = segments.reduce((max, s) => Math.max(max, s.end), 0);
  const total = Math.round(duration * SAMPLE_RATE);
  const signal = new Float32Array(total);
  const random = rng('utterance-noise');

  let phaseAcc = 0;
  let prevNoise = 0;

  for (let n = 0; n < total; n++) {
    const t = n / SAMPLE_RATE;
    const seg = segments.find((s) => t >= s.start && t < s.end);
    if (!seg) continue;

    const local = (t - seg.start) / Math.max(seg.end - seg.start, 1e-6);
    const amp = (seg.amp ?? 1) * envelope(local, seg.kind, Boolean(seg.burst));
    let value = 0;

    if (seg.f0 && seg.formants) {
      const f0 = sampleTrack(seg.f0, local);
      phaseAcc += f0 / SAMPLE_RATE;
      const formants = seg.formants.map((track) => sampleTrack(track, local));
      for (let k = 1; k <= HARMONICS; k++) {
        const freq = k * f0;
        if (freq > SAMPLE_RATE / 2) break;
        value += (resonance(freq, formants) / Math.pow(k, 1.1)) * Math.sin(2 * Math.PI * k * phaseAcc);
      }
      value *= 0.62;
    }

    if (seg.noise) {
      // 一階高通之後的白噪音，把能量推到高頻，聽覺上就是擦音
      const white = random() * 2 - 1;
      const highpassed = white - prevNoise * 0.72;
      prevNoise = white;
      // 摩擦噪音比母音弱得多；真實語音裡母音才是最響的那一段
      value += highpassed * 0.42;
    }

    signal[n] = value * amp;
  }

  // 正規化到峰值 1
  let peak = 0;
  for (let n = 0; n < total; n++) peak = Math.max(peak, Math.abs(signal[n]));
  const scale = peak > 0 ? 1 / peak : 1;

  const axisY = h / 2;
  const half = h / 2;
  const round = (n: number) => Math.round(n * 10) / 10;

  // 按欄取極值，這就是音訊編輯器畫波形的方式
  const columns: Column[] = [];
  const perColumn = total / COLUMNS;
  for (let c = 0; c < COLUMNS; c++) {
    const from = Math.floor(c * perColumn);
    const to = Math.min(Math.floor((c + 1) * perColumn), total);
    let min = 0;
    let max = 0;
    for (let n = from; n < to; n++) {
      const v = signal[n] * scale;
      if (v < min) min = v;
      if (v > max) max = v;
    }
    // 即使靜音也留一條髮絲，讓零線連續不斷
    const minY = axisY - min * half * 0.94;
    const maxY = axisY - max * half * 0.94;
    columns.push({
      x: round((c / COLUMNS) * w),
      top: round(Math.min(maxY, axisY - 0.3)),
      bottom: round(Math.max(minY, axisY + 0.3)),
    });
  }

  const x = (t: number) => round((t / duration) * w);

  const boundaries: Boundary[] = segments.map((s) => ({ x: x(s.start), onset: true }));
  boundaries.push({ x: x(duration), onset: false });

  const labels: SegmentLabel[] = segments.map((s) => ({
    ipa: s.ipa,
    x: round((x(s.start) + x(s.end)) / 2),
    x1: x(s.start),
    x2: x(s.end),
  }));

  const ampTicks: AmpTick[] = [
    { y: round(axisY - half * 0.94), value: 1, label: '+1', axis: false },
    { y: round(axisY - half * 0.47), value: 0.5, label: '+0.5', axis: false },
    { y: round(axisY), value: 0, label: '0', axis: true },
    { y: round(axisY + half * 0.47), value: -0.5, label: '−0.5', axis: false },
    { y: round(axisY + half * 0.94), value: -1, label: '−1', axis: false },
  ];

  const timeTicks: TimeTick[] = [];
  for (let ms = 0; ms <= Math.round(duration * 1000); ms += 50) {
    const major = ms % 200 === 0;
    timeTicks.push({
      x: x(ms / 1000),
      seconds: ms / 1000,
      label: major ? (ms / 1000).toFixed(1) : null,
      major,
    });
  }

  // 每個音段的峰值，讀值面板用
  const peaks = segments.map((s) => {
    const from = Math.floor(s.start * SAMPLE_RATE);
    const to = Math.min(Math.floor(s.end * SAMPLE_RATE), total);
    let p = 0;
    for (let n = from; n < to; n++) p = Math.max(p, Math.abs(signal[n] * scale));
    return { start: s.start, end: s.end, peak: Math.round(p * 100) / 100 };
  });

  return {
    width: w,
    height: h,
    duration,
    columns,
    axisY: round(axisY),
    boundaries,
    labels,
    ampTicks,
    timeTicks,
    peaks,
  };
}
