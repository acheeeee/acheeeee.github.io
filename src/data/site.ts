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
  /** 作者，照原文寫法；沒有就省略 */
  authors?: string | null;
  /**
   * 已完成的格子：true = 高度貼合內容、完整顯示、不收合（使用者指定）。
   * 同一欄的另一格會用剩下的高度，放不下就收合、點了展開。
   */
  fit?: boolean;
  /** 展開後才看得到的詳細段落（例如論文的引言、方法、結果、結論）。只寫原文裡有的。 */
  details?: Array<{ heading: Record<Locale, string>; body: Record<Locale, string> }>;
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
    // 來源：使用者 2026-10-03 與 2026-10-18 的進度回報，濃縮成一行一件事（不寫檔名、套件、時間估計）
    progress: {
      asOf: '2026-10-18',
      items: [
        {
          // 使用者 2026-10-18：放不下就把已完成的濃縮，資料層與前處理合成一條（原本四條）
          state: 'done',
          text: {
            'zh-Hant': '資料層與前處理：LibriSpeech 訓練集 961 小時（論文 960 小時）、稀有詞與官方參考檔 2620／2620 一致、重現 Figure 1 分布、biasing list 產生器',
            en: 'Data and preprocessing: 961 h LibriSpeech (paper: 960 h), rare words matching the official reference 2,620 / 2,620, Figure 1 reproduced, biasing-list generator',
          },
        },
        {
          // 2026-10-03 標為進行中；2026-10-18 使用者已做到 B-8（第二階段），推定完成——待使用者確認
          state: 'done',
          text: {
            'zh-Hant': 'Audio adapter 與 CTC 模組',
            en: 'Audio adapter and CTC module',
          },
        },
        {
          // 使用者 2026-10-18：第二階段合成一條、標進行中，內容用頓號列出在做什麼
          state: 'now',
          text: {
            'zh-Hant': '第二階段：prompt 組裝、前向計算與 KV cache、候選資料與遮罩、訓練、四組 loss 對照實驗',
            en: 'Stage 2: prompt assembly, forward pass with KV cache, candidate data and masks, training, four-way loss comparison',
          },
        },
        {
          state: 'next',
          text: {
            'zh-Hant': '以 Recall、BTI、WER 評估（N = 500／1000／5000）',
            en: 'Evaluation: Recall, BTI, WER (N = 500 / 1,000 / 5,000)',
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
  {
    // 來源：使用者 2026-10-15 提供的論文 LaTeX 原稿。大學畢業論文，沒有投稿——不得寫成或暗示已發表。
    // 使用者要求不標類型。數字照原稿，不要改寫成更好看的。年份未提供，不要自己補。
    id: 'heatwave-thesis',
    status: 'closed',
    primary: false,
    authors: 'LI CHIA-CHUN, PEI-CHEN LEE, CHUN-LIN CHENG',
    title: {
      'zh-Hant': 'Efficient 3-Day European Heatwave Forecasting using TSBPCA-optimized LSTM',
      en: 'Efficient 3-Day European Heatwave Forecasting using TSBPCA-optimized LSTM',
    },
    summary: {
      'zh-Hant':
        '熱浪預警要提前得夠早，也要能在一般硬體上跑。輸入是 ERA5 再分析資料中 2000–2023 年歐洲夏季的四個氣象場（2 公尺氣溫、表層土壤濕度、500 hPa 重力位高度、850 hPa 氣溫）。TSBPCA（時序串流批次 PCA）把約 11 萬維的網格資料壓成 8 個主成分，再由兩層輕量 LSTM 讀過去 10 天，提前三天判斷是否發生熱浪。TSBPCA 用串流 QR 分解逐批更新投影基底，不建完整的共變異數矩陣，記憶體需求從標準 PCA 的 100 GB 以上降到 10 GB 以下。評估以召回率優先：測試集 Recall 0.53、Precision 0.26。',
      en:
        'Heatwave warnings need enough lead time and have to run on ordinary hardware. The input is four ERA5 reanalysis fields over Europe for the 2000–2023 summers: 2 m temperature, top-layer soil moisture, 500 hPa geopotential and 850 hPa temperature. TSBPCA (temporal streaming batch PCA) compresses the roughly 113,000-dimensional grid to 8 components, and a two-layer lightweight LSTM reads the past 10 days to flag a heatwave three days ahead. TSBPCA updates its projection basis batch by batch with a streaming QR decomposition and never builds the full covariance matrix, cutting memory from over 100 GB with standard PCA to under 10 GB. Evaluation favours recall: 0.53 recall and 0.26 precision on the test set.',
    },
    // 展開後的段落：依使用者 2026-10-15 提供的論文 LaTeX 原稿整理（2026-10-18 使用者要求展開時內容多一點）。
    // 數字全部照原稿，不要改寫成更好看的。
    details: [
      {
        heading: { 'zh-Hant': '引言', en: 'Introduction' },
        body: {
          'zh-Hant':
            '極端熱浪的頻率、強度與持續時間都在增加，衝擊公共健康、農業產量與電網負載，因此需要能實際運作的預警。現有系統常卡在兩件事：物理模型或大型深度學習模型運算量大、難以部署；而季節尺度的預報雖然存在，三天這種短期、在地的熱浪預警仍有缺口。這篇提出 TSBPCA-LSTM：先用 TSBPCA 壓縮高解析度氣象場，再交給輕量 LSTM 判斷三天後是否發生熱浪，目標是在一般研究用硬體上就能跑。',
          en:
            'Extreme heatwaves are becoming more frequent, more intense and longer, straining public health, crop yields and power grids, so early warning has to be something that can actually run. Current systems tend to hit two walls: physics-based or large deep-learning models are expensive and hard to deploy, and while seasonal forecasts exist, short-range (three-day) local heatwave warnings remain a gap. This thesis proposes TSBPCA-LSTM: TSBPCA compresses high-resolution atmospheric fields, and a lightweight LSTM decides whether a heatwave will occur three days ahead, with the goal of running on ordinary research hardware.',
        },
      },
      {
        heading: { 'zh-Hant': '資料與熱浪定義', en: 'Data and heatwave definition' },
        body: {
          'zh-Hant':
            'ERA5 再分析資料，歐洲區域，2000–2023 年夏季（6–8 月），每日、0.25° 解析度。四個變數依 Weirich-Benet 等人（2023）的物理理由選定：2 公尺氣溫（地表熱的強度）、表層土壤含水量（透過蒸發潛熱形成陸氣正回饋）、500 hPa 重力位高度（造成歐洲熱浪的阻塞高壓脊）、850 hPa 氣溫（低層暖平流）。熱浪的定義：先算整個歐洲範圍的空間平均日均溫，以其歷史分布的第 90 百分位為門檻，連續至少 3 天超過即為熱浪（依 WMO 對熱浪持續時間的定義）。總共 2,206 天，其中 149 天是熱浪，約 1:14。',
          en:
            'ERA5 reanalysis over Europe for the 2000–2023 summers (June–August), daily at 0.25° resolution. The four variables follow the physical reasoning of Weirich-Benet et al. (2023): 2 m temperature (surface heat), top-layer soil moisture (a land–atmosphere feedback through latent heat), 500 hPa geopotential height (the blocking ridges behind European heatwaves) and 850 hPa temperature (low-level warm advection). A heatwave is defined on the Europe-wide spatial mean of daily temperature: the threshold is the 90th percentile of its historical distribution, and the threshold must be exceeded for at least 3 consecutive days, following the WMO definition of heatwave duration. The dataset has 2,206 days, 149 of them heatwave days (about 1:14).',
        },
      },
      {
        heading: { 'zh-Hant': '方法：TSBPCA', en: 'Method: TSBPCA' },
        body: {
          'zh-Hant':
            '標準 PCA 要先建 d × d 的共變異數矩陣；這份資料 d ≈ 113,364，光是存這個矩陣就要約 102.8 GB。TSBPCA 依時間順序每 30 天一批（約一個月），用串流 QR 分解更新 K = 8 維的投影基底：先算 X·Q、再乘回 Xᵀ，全程不建 d × d 矩陣；每批內反覆更新到收斂（Frobenius 差小於 10⁻⁵，最多 100 次）。關鍵是「暖啟動」：每一批都從上一批收斂的基底開始，而不是重新隨機初始化，子空間因此隨時間平滑演變，保留相鄰大氣狀態之間的時空相關。只有一批時（T = N）會精確收斂回標準 PCA。K = 8 依累積解釋變異量選定；批次大小在 7、14、30、60 天中以 30 天收斂最穩定。',
          en:
            'Standard PCA first builds a d × d covariance matrix; with d ≈ 113,364 here, storing it alone takes about 102.8 GB. TSBPCA processes the data in chronological 30-day batches (about a month) and updates a K = 8 projection basis with a streaming QR decomposition, computing X·Q before multiplying back by Xᵀ so the d × d matrix is never formed; within each batch it iterates until the Frobenius change drops below 10⁻⁵ (at most 100 iterations). The key is the warm start: each batch begins from the basis the previous batch converged to instead of a fresh random one, so the subspace evolves smoothly over time and keeps the spatiotemporal correlation between neighbouring atmospheric states. With a single batch (T = N) it converges exactly to standard PCA. K = 8 was chosen from cumulative explained variance; among batch sizes of 7, 14, 30 and 60 days, 30 gave the most stable convergence.',
        },
      },
      {
        heading: { 'zh-Hant': '方法：LSTM 與訓練', en: 'Method: LSTM and training' },
        body: {
          'zh-Hant':
            '輸入是過去 10 天的壓縮特徵（10 × 8），對應阻塞高壓形成約 5–10 天的時間尺度。模型是兩層 LSTM、每層 32 個隱藏單元（16、32、64 中驗證集 recall 最好），最後一步接 LayerNorm 與 Dropout 0.4（0.2 時約第 5 個 epoch 就開始過擬合）。訓練集熱浪對正常約 85 : 1,450（1:17），用加權的二元交叉熵處理，正類權重取比例的一半（約 8.53），避免模型幾乎全部猜熱浪。資料依時間順序切成 70 / 15 / 15，不打亂，避免未來資料洩漏到訓練集。分類門檻在驗證集 0.3–0.6 之間掃描，以 recall 最大為準選了 0.4。',
          en:
            'The input is the last 10 days of compressed features (10 × 8), matching the roughly 5–10-day timescale over which blocking highs build. The model is a two-layer LSTM with 32 hidden units per layer (the best validation recall among 16, 32 and 64), followed by LayerNorm and dropout of 0.4 on the last step (at 0.2 it began overfitting around epoch 5). The training set has about 85 heatwave days to 1,450 normal days (1:17), handled with weighted binary cross-entropy whose positive weight is half the ratio (about 8.53) so the model does not flag almost everything as a heatwave. Data is split 70 / 15 / 15 in chronological order without shuffling, so no future data leaks into training. The decision threshold was swept from 0.3 to 0.6 on the validation set and set to 0.4 for maximum recall.',
        },
      },
      {
        heading: { 'zh-Hant': '結果', en: 'Results' },
        body: {
          'zh-Hant':
            '測試集 330 天、其中 32 天是熱浪：TP 17、FN 15、FP 48、TN 250，Recall 0.5312、Precision 0.2615、F1 0.3505——提前三天抓到一半以上的熱浪，代價是較多誤報。這是刻意的取捨：對預警系統來說，漏掉一次熱浪的代價遠高於多發幾次警報。運算方面，TSBPCA 的記憶體峰值低於 10 GB（標準 PCA 估計要 100 GB 以上），在一般 CPU 工作站上完成 24 年資料的降維約 339 秒。兩篇參考研究分別預測年度熱浪天數與 1–6 週的次季節發生率，任務不同，所以論文不直接比較預測分數，只比較降維方式與運算成本。',
          en:
            'On a 330-day test set with 32 heatwave days: TP 17, FN 15, FP 48, TN 250, giving recall 0.5312, precision 0.2615 and F1 0.3505. More than half of the heatwaves are caught three days ahead, at the cost of more false alarms, which is a deliberate trade-off: for an early-warning system, missing a heatwave costs far more than an extra alert. On the compute side, TSBPCA peaks below 10 GB of memory (standard PCA would need over 100 GB) and reduces the full 24 years of data in about 339 seconds on an ordinary CPU workstation. The two reference studies predict annual heatwave-day counts and 1–6-week subseasonal occurrence, which are different tasks, so the thesis compares only dimensionality-reduction approach and compute cost, not prediction scores.',
        },
      },
      {
        heading: { 'zh-Hant': '結論', en: 'Conclusion' },
        body: {
          'zh-Hant':
            'TSBPCA 讓高解析度氣象資料可以在一般硬體上處理，搭配輕量 LSTM 提供三天前的熱浪預警；precision 偏低是以安全優先的設計取捨。之後的方向是整合多來源的氣候資料，並嘗試混合式的深度學習架構，讓模型更穩健。',
          en:
            'TSBPCA makes high-resolution atmospheric data tractable on ordinary hardware, and paired with a lightweight LSTM it gives three-day heatwave warnings; the low precision is a safety-first design choice. Next steps are integrating multi-source climate data and trying hybrid deep-learning architectures to make the model more robust.',
        },
      },
    ],
    source: null,
    repo: null,
    period: null,
  },
  {
    // 來源：使用者 2026-10-18 用 templates/project-update.md 填好的回傳。
    // 使用者只同意公開「轉錄速度」這個數字（含量測條件）；記憶體用量、錯誤率都不寫。
    // 課堂錄音與逐字稿沒有公開，不得寫成有公開資料集。中文名稱未提供，先用英文原名。
    // 期間回傳寫「2026-10 起」但狀態是已完成，待使用者確認，先不填。
    // 依使用者指示放在畢業論文後面（原本小狗那格）。
    id: 'audio-to-summarize',
    status: 'closed',
    primary: false,
    fit: true, // 使用者要求完整顯示、不收合
    title: {
      'zh-Hant': 'Audio to Summarize',
      en: 'Audio to Summarize',
    },
    summary: {
      'zh-Hant':
        '在 Apple Silicon Mac 上本機批次轉錄課堂錄音的工具，以 MLX 執行 Cohere Transcribe 2B（int8 量化），長音檔在能量最低處切成 35 秒以內的片段。模型本身沒有語言偵測，因此改用中文模式解碼每個檔案的幾段樣本，依漢字比例判斷是英文還是中文授課；中文課保留英文術語、轉為台灣繁體，並移除模型在靜音段產生的重複輸出。輸出附時間標記的逐字稿與字幕，再交給 LLM 整理重點。在 MacBook Pro（M5、32GB）上約 50 倍即時速度：17 段真實課堂錄音（英文與中文授課）共 9 小時 54 分，純轉錄耗時 12 分鐘（不含模型載入與音檔轉檔）。',
      en:
        'A tool for batch-transcribing lecture recordings locally on Apple Silicon Macs, running Cohere Transcribe 2B (int8) with MLX and splitting long audio into segments of at most 35 s at low-energy points. Because the model has no language identification, each file is classified as English or Mandarin by decoding a few samples in Mandarin mode and measuring the share of Han characters. Mandarin output keeps English technical terms, is converted to Taiwan Traditional Chinese, and has the repetition loops the model produces on silence removed. The result is a timestamped transcript and subtitle file per recording, ready to hand to an LLM for summarization. About 50× real time on a MacBook Pro (M5, 32 GB): 17 real lecture recordings (English- and Mandarin-taught) totaling 9 h 54 min were transcribed in 12 minutes of decoding time (excluding model loading and audio conversion).',
    },
    source: null,
    repo: {
      label: 'acheeeee/audio-to-summarize',
      href: 'https://github.com/acheeeee/audio-to-summarize',
    },
    period: null,
  },
];

/**
 * 讀過的論文，最近讀的在前。陣列空的時候首頁會顯示誠實的空狀態。
 * 作者、出處、年份都要查證過再填（下面每篇都已對照原文、arXiv 摘要頁或 Crossref）。
 */
export const READING: ReadingEntry[] = [
  {
    // 2026-10-16 加入；標題、作者、年份對照 arXiv 摘要頁（v1 2026-05-18，未標投稿出處）
    id: 'tsai-ctc-word-spotting-2026',
    title: 'Contextual Biasing for Streaming ASR via CTC-based Word Spotting',
    authors: 'Tsai, Lo, Sun & Chen',
    venue: 'arXiv',
    year: '2026',
    href: 'https://arxiv.org/abs/2605.18222',
    state: 'read',
  },
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
