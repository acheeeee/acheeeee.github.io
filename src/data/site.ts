/**
 * 站內所有文案與條目的單一來源。
 * Single source of truth for every string and entry on the site.
 *
 * 要新增工作條目或閱讀紀錄，只改這個檔案，不要改 .astro。
 * 詳細操作步驟見 MAINTENANCE.md。
 *
 * 鐵律（來自 PRODUCT.md）：這裡只能寫真的。
 * 沒有的東西 —— 論文發表、效能數字、引用數、獎項、客戶、推薦語 —— 一律不得編造。
 */

export const LOCALES = ['zh-Hant', 'en'] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = 'zh-Hant';

/** 每個語言的首頁路徑 */
export const LOCALE_PATH: Record<Locale, string> = {
  'zh-Hant': '/',
  en: '/en/',
};

/**
 * 工作條目的狀態。
 * 'active'  進行中 —— 燒痕深、不收尾、衝出右緣
 * 'closed'  已完成 —— 燒痕淺、以雙線收束
 */
export type WorkStatus = 'active' | 'closed';

export interface WorkEntry {
  /** 穩定識別碼，不要改（CSS 與錨點會用到） */
  id: string;
  status: WorkStatus;
  title: Record<Locale, string>;
  /** 一句話說明。留空字串就不渲染，不會留下空殼。 */
  summary: Record<Locale, string>;
  /** 引用來源；沒有就設 null */
  source: { label: string; href: string } | null;
  /** 時間欄位的文字，例如 '2026-02 起'。未定就設 null，欄位會收起來不留空槽。 */
  period: Record<Locale, string> | null;
}

export interface ReadingEntry {
  id: string;
  title: string;
  venue: string;
  year: string;
  href: string;
  /** 讀到什麼程度 */
  state: 'reading' | 'read';
}

interface Strings {
  htmlLang: string;
  /** <html lang> 與 hreflang 用 */
  localeLabel: string;
  siteTitle: string;
  metaDescription: string;
  name: string;
  aliasLabel: string;
  affiliation: string;
  field: string;
  lede: string;
  /**
   * 自我介紹格的導語，一行一個元素，由版面交替縮排排版。
   * 姓名就在第一行裡 —— 不另立大標題、不在標題上方加小標。
   */
  introLines: string[];
  waveCaption: string;
  waveAlt: string;
  scaleAmp: string;
  scaleTime: string;
  readout: { time: string; amp: string; segment: string; idle: string; help: string };
  jumpAction: string;
  jumpActionCount: (n: number) => string;
  sections: { active: string; closed: string; reading: string; contact: string };
  statusLabel: Record<WorkStatus, string>;
  periodLabel: string;
  sourceLabel: string;
  readingEmpty: string;
  readingCount: (n: number) => string;
  readingState: Record<ReadingEntry['state'], string>;
  contactIntro: string;
  langSwitchLabel: string;
  skipToContent: string;
  footerNote: string;
}

export const STRINGS: Record<Locale, Strings> = {
  'zh-Hant': {
    htmlLang: 'zh-Hant',
    localeLabel: '中文',
    siteTitle: '李嘉峻 BEDO · 語音辨識研究',
    metaDescription:
      '李嘉峻（BEDO），台灣科技大學資訊工程研究所碩一，研究語音辨識。這裡記錄正在進行的工作。',
    name: '李嘉峻',
    aliasLabel: '比都 · BEDO',
    affiliation: '國立臺灣科技大學 資訊工程研究所 碩士一年級',
    field: '語音辨識 ASR · 自然語言處理',
    lede: '這頁記錄我正在進行的語音辨識研究。沒有收尾的那幾條，就是現在手上的工作。',
    introLines: ['李嘉峻', '是台灣科技大學', '資工所碩一，', '研究語音辨識。'],
    waveCaption: '「李嘉峻」三音節的合成波形，非實際錄音分析。橫軸時間（秒），縱軸正規化振幅。',
    waveAlt:
      '一張音波圖，橫軸為時間、縱軸為振幅，顯示「李嘉峻」三個音節的波形包絡，下方標有國際音標音段邊界。',
    scaleAmp: '振幅',
    scaleTime: '時間 秒',
    readout: {
      time: '時間',
      amp: '峰值',
      segment: '音段',
      idle: '指標或方向鍵',
      help: '這是一張音波圖。聚焦後可用左右方向鍵沿時間軸移動讀取位置，Home 與 End 跳到兩端；時間、該音段的峰值振幅與國際音標會顯示在圖說右側。',
    },
    jumpAction: '往下看進行中的工作',
    jumpActionCount: (n) => `進行中 ${n} 條`,
    sections: {
      active: '進行中',
      closed: '已完成',
      reading: '閱讀紀錄',
      contact: '聯絡',
    },
    statusLabel: { active: '進行中 · 未收尾', closed: '已完成' },
    periodLabel: '期間',
    sourceLabel: '出處',
    readingEmpty: '尚未登錄條目。讀過的論文會逐筆記在這裡。',
    readingCount: (n) => `${n} 筆`,
    readingState: { reading: '在讀', read: '讀完' },
    contactIntro: '要聊研究、合作或是單純想問一句，寄信最快。',
    langSwitchLabel: '語言',
    skipToContent: '跳到主要內容',
    footerNote: '本站以 Astro 建置，原始碼公開在 GitHub。',
  },
  en: {
    htmlLang: 'en',
    localeLabel: 'EN',
    siteTitle: 'BEDO · 李嘉峻 — speech recognition research',
    metaDescription:
      'BEDO (李嘉峻), first-year CS master’s student at NTUST, working on automatic speech recognition. A record of work in progress.',
    name: 'BEDO',
    aliasLabel: '李嘉峻',
    affiliation: 'MSc Computer Science, year 1 · National Taiwan University of Science and Technology',
    field: 'Automatic speech recognition · NLP',
    lede: 'A record of the speech recognition work I have open right now. The traces without an end boundary are the live ones.',
    introLines: ['BEDO', 'is a first-year', 'CS master’s student', 'at NTUST working on', 'speech recognition.'],
    waveCaption: 'Synthesised waveform of “BEDO” — not an analysis of a real recording. Time in seconds across, normalised amplitude up.',
    waveAlt:
      'A waveform with time on the horizontal axis and amplitude on the vertical, showing the envelope of the two syllables of “BEDO”, annotated below with IPA segment boundaries.',
    scaleAmp: 'amplitude',
    scaleTime: 'time s',
    readout: {
      time: 'time',
      amp: 'peak',
      segment: 'segment',
      idle: 'pointer or arrow keys',
      help: 'This is a waveform. Once focused, use the left and right arrow keys to move the read position along the time axis, and Home or End to jump to either end; time, the segment peak amplitude and the IPA segment are reported beside the caption.',
    },
    jumpAction: 'Read the work in progress',
    jumpActionCount: (n) => `${n} open`,
    sections: {
      active: 'In progress',
      closed: 'Closed',
      reading: 'Reading log',
      contact: 'Contact',
    },
    statusLabel: { active: 'open · no end boundary', closed: 'closed' },
    periodLabel: 'period',
    sourceLabel: 'source',
    readingEmpty: 'No entries logged yet. Papers I read get recorded here one by one.',
    readingCount: (n) => `${n} entries`,
    readingState: { reading: 'reading', read: 'read' },
    contactIntro: 'Research, collaboration, or just a question — email reaches me fastest.',
    langSwitchLabel: 'Language',
    skipToContent: 'Skip to main content',
    footerNote: 'Built with Astro. Source is public on GitHub.',
  },
};

/**
 * 工作條目。新增一筆就在陣列裡加一個物件。
 * 順序即閱讀順序：最近的放最前面。
 */
export const WORK: WorkEntry[] = [
  {
    id: 'coala',
    status: 'active',
    title: {
      'zh-Hant': 'COALA 論文重現',
      en: 'Reproducing COALA',
    },
    summary: {
      'zh-Hant':
        '重現一套把外部實體知識接進語音辨識的 contextual biasing 方法，目標是在多實體語句上穩定地認出領域專有名詞。',
      en:
        'Reproducing a contextual biasing method that feeds external entity knowledge into an ASR system, aimed at recognising domain-specific names in multi-entity utterances.',
    },
    source: {
      label: 'Guo, Yan, Lo & Chen, NTNU · arXiv:2607.08117',
      href: 'https://arxiv.org/abs/2607.08117',
    },
    period: null,
  },
  {
    id: 'realtime',
    status: 'active',
    title: {
      'zh-Hant': '即時系統（開發中）',
      en: 'Real-time system (in development)',
    },
    summary: {
      'zh-Hant': '',
      en: '',
    },
    source: null,
    period: null,
  },
  {
    id: 'hackathon',
    status: 'closed',
    title: {
      'zh-Hant': '黑客松',
      en: 'Hackathon',
    },
    summary: {
      'zh-Hant': '參加並完成了一次黑客松，沒有得獎。',
      en: 'Took part in a hackathon and finished it. Did not place.',
    },
    source: null,
    period: null,
  },
];

/** 讀過的論文。目前為空陣列，首頁會渲染這個世界自己的空狀態。 */
export const READING: ReadingEntry[] = [];

export interface ContactChannel {
  id: string;
  label: string;
  /** 面板上顯示的值 */
  value: string;
  href: string;
}

export const CONTACT: ContactChannel[] = [
  { id: 'email', label: 'EMAIL', value: 'ach3r204@gmail.com', href: 'mailto:ach3r204@gmail.com' },
  { id: 'github', label: 'GITHUB', value: 'acheeeee', href: 'https://github.com/acheeeee' },
  {
    id: 'linkedin',
    label: 'LINKEDIN',
    value: 'bedo-lee',
    href: 'https://www.linkedin.com/in/bedo-lee-858726404',
  },
  {
    id: 'instagram',
    label: 'INSTAGRAM',
    value: 'be_do_in_gatao',
    href: 'https://www.instagram.com/be_do_in_gatao/',
  },
];

export const SITE_ORIGIN = 'https://acheeeee.github.io';
