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
  /**
   * 是否為「現在正在做的主要計畫」。true 的格子是電藍色，其他一律白色。
   * 同一時間只該有一個主要計畫是 true —— 藍色是為了讓訪客一眼找到重點，
   * 藍色一多就失去作用。計畫完成後改成 false（變白）並把 status 改成 'closed'。
   */
  primary: boolean;
  /**
   * 進度條目（可選）。一行一件事，寫做了什麼、不寫用了哪個套件。
   * done: 完成 | now: 進行中 | next: 接下來。asOf 是最後更新日期。
   */
  progress?: {
    asOf: string;
    items: Array<{ state: 'done' | 'now' | 'next'; text: Record<Locale, string> }>;
  };
  /** 額外連結，例如專題的程式碼 repo；沒有就設 null */
  repo?: { label: string; href: string } | null;
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
  /** 作者，例如 'Krogh & Hertz' */
  authors: string;
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
  lab: { label: string; href: string };
  field: string;
  lede: string;
  /**
   * 自我介紹格的名字組字（使用者要求：名詞、不寫句子；極簡但要有設計感）。
   * name 是主角；formal 是正式英文名（使用者確認：LI, CHIA-CHUN，照護照寫法，不要自己翻）；
   * alias 是綽號。所屬與研究不放這裡——研究方向那一格已經有了，使用者要求不要重複。
   */
  intro: { name: string; formal: string; alias: string };
  /** 頂部波形捲動軸的無障礙說明 */
  scrubberLabel: string;
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
    lab: { label: '自然語言處理實驗室', href: 'https://nlp.csie.ntust.edu.tw/' },
    field: '語音辨識 ASR · 自然語言處理',
    lede: '這頁記錄我正在進行的語音辨識研究。沒有收尾的那幾條，就是現在手上的工作。',
    intro: {
      name: '李嘉峻',
      formal: 'LI, CHIA-CHUN',
      alias: 'BEDO',
    },
    scrubberLabel: '頁面捲動軸：合成的「LI BE DO」波形，可拖曳左右移動頁面。',
    jumpAction: '往右看進行中的工作',
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
    contactIntro: '任何詳細細節或想詢問的事，歡迎寄信給我。',
    langSwitchLabel: '語言',
    skipToContent: '跳到主要內容',
  },
  en: {
    htmlLang: 'en',
    localeLabel: 'EN',
    siteTitle: 'LI, CHIA-CHUN (BEDO) — speech recognition research',
    metaDescription:
      'BEDO (李嘉峻), first-year CS master’s student at NTUST, working on automatic speech recognition. A record of work in progress.',
    name: 'BEDO',
    aliasLabel: '李嘉峻',
    affiliation: 'MSc Computer Science, year 1 · National Taiwan University of Science and Technology',
    lab: { label: 'Natural Language Processing Lab', href: 'https://nlp.csie.ntust.edu.tw/' },
    field: 'Automatic speech recognition · NLP',
    lede: 'A record of the speech recognition work I have open right now. The traces without an end boundary are the live ones.',
    intro: {
      name: 'BEDO',
      formal: 'LI, CHIA-CHUN',
      alias: '李嘉峻',
    },
    scrubberLabel: 'Page scrubber: a synthesised “LI BE DO” waveform. Drag to move the page sideways.',
    jumpAction: 'See the work in progress',
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
    contactIntro: 'For details or any questions, feel free to email me.',
    langSwitchLabel: 'Language',
    skipToContent: 'Skip to main content',
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
    primary: true,
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
    // 來源：使用者 2026-10-03 的進度回報，濃縮成一行一件事
    progress: {
      asOf: '2026-10-03',
      items: [
        {
          state: 'done',
          text: {
            'zh-Hant': '資料層：LibriSpeech 訓練集 961 小時，與論文的 960 小時吻合',
            en: 'Data layer: 961 h of LibriSpeech training audio, matching the paper’s 960 h',
          },
        },
        {
          state: 'done',
          text: {
            'zh-Hant': '稀有詞抽取以官方參考檔驗證，2620／2620 句完全一致',
            en: 'Rare-word extraction checked against the official reference: 2,620 / 2,620 match',
          },
        },
        {
          state: 'done',
          text: {
            'zh-Hant': '重現論文 Figure 1 的多實體分布統計',
            en: 'Reproduced the multi-entity distribution from the paper’s Figure 1',
          },
        },
        {
          state: 'done',
          text: {
            'zh-Hant': 'Biasing list 產生器，固定 seed 可重現',
            en: 'Biasing-list generator, reproducible with a fixed seed',
          },
        },
        {
          state: 'now',
          text: {
            'zh-Hant': 'Audio adapter 與 CTC 模組',
            en: 'Audio adapter and CTC module',
          },
        },
        {
          state: 'next',
          text: {
            'zh-Hant': '兩階段訓練，再以 BTI／Recall／WER 評估',
            en: 'Two-stage training, then BTI / Recall / WER evaluation',
          },
        },
      ],
    },
    period: null,
  },
  {
    id: 'realtime',
    status: 'active',
    primary: false,
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
    primary: false,
    title: {
      'zh-Hant': '2026 新北市 AI 智慧城市黑客松競賽',
      en: '2026 New Taipei City AI Smart City Hackathon',
    },
    summary: {
      'zh-Hant':
        '為新北市法制局做的訴願案 AI 輔助系統：從進件 PDF 擷取欄位、推薦適用法規並提示新舊法時效、比對歷史相似案例，再產出決定書草稿。檢索採 BM25（jieba 斷詞）加 Gemini 向量的混合檢索，所有引用法條都必須來自知識庫原文。後端 Python／FastAPI，前端 Vue。',
      en:
        'An AI assistant for administrative-appeal casework, built for the New Taipei City Legal Affairs Bureau: it extracts fields from incoming PDFs, recommends applicable statutes with amendment-timing alerts, retrieves similar past decisions, and drafts a decision. Retrieval is hybrid BM25 (jieba) plus Gemini embeddings, and every cited statute must come from the knowledge base verbatim. Python / FastAPI backend, Vue frontend.',
    },
    source: null,
    repo: {
      label: 'acheeeee/AI_hackathon_20260912',
      href: 'https://github.com/acheeeee/AI_hackathon_20260912',
    },
    period: null,
  },
];

/**
 * 讀過的論文，最近讀的在前。陣列空的時候首頁會顯示誠實的空狀態。
 * 作者、出處、年份都要查證過再填（下面三篇已對照原文 PDF 與 Crossref）。
 */
export const READING: ReadingEntry[] = [
  {
    id: 'coala-2026',
    title: 'COALA: Robust Contextualized Speech-augmented Language Modeling for ASR via Contrastive Regularizer and Biasing Score Estimation',
    authors: 'Guo, Yan, Lo & Chen',
    venue: 'arXiv',
    year: '2026',
    href: 'https://arxiv.org/abs/2607.08117',
    state: 'read',
  },
  {
    id: 'storn-price-1997',
    title: 'Differential Evolution – A Simple and Efficient Heuristic for Global Optimization over Continuous Spaces',
    authors: 'Storn & Price',
    venue: 'Journal of Global Optimization',
    year: '1997',
    href: 'https://doi.org/10.1023/A:1008202821328',
    state: 'read',
  },
  {
    id: 'krogh-hertz-1991',
    title: 'A Simple Weight Decay Can Improve Generalization',
    authors: 'Krogh & Hertz',
    venue: 'NIPS',
    year: '1991',
    href: 'https://papers.baulab.info/papers/Krogh-1991.pdf',
    state: 'read',
  },
];

export interface EducationEntry {
  /** 學位層級，例如 碩士 / 學士 / 高中 */
  level: Record<Locale, string>;
  school: Record<Locale, string>;
  /** 系所；高中沒有就設 null */
  department: Record<Locale, string> | null;
  /** 期間，例如 '2026 –'。未確認就設 null，畫面上會收起來 */
  period: string | null;
  current: boolean;
}

/**
 * 教育背景，最近的在前。照片右邊那塊留白顯示。
 * 來源：使用者 2026-10-03 提供。期間（年份）尚未提供，不要自己補。
 */
export const EDUCATION: EducationEntry[] = [
  {
    level: { 'zh-Hant': '碩士', en: 'MSc' },
    school: { 'zh-Hant': '國立臺灣科技大學', en: 'NTUST' },
    department: { 'zh-Hant': '資訊工程研究所', en: 'Computer Science & Information Engineering' },
    period: null,
    current: true,
  },
  {
    level: { 'zh-Hant': '學士', en: 'BSc' },
    school: { 'zh-Hant': '國立中興大學', en: 'NCHU' },
    department: { 'zh-Hant': '應用數學系', en: 'Applied Mathematics' },
    period: null,
    current: false,
  },
  {
    level: { 'zh-Hant': '高中', en: 'High school' },
    school: { 'zh-Hant': '臺北市立松山高級中學', en: 'Songshan Senior High School, Taipei' },
    department: null,
    period: null,
    current: false,
  },
];

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
