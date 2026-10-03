# 維護手冊

給**未來接手這個網站的人或模型**看的。換聊天室、換模型、或半年後的自己，照這份做就不會把設計搞亂。

---

## 0. 先讀這些

動任何 UI 檔案之前依序讀：

1. **`PRODUCT.md`** — 產品事實：給誰看、什麼是真的、什麼絕對不能編。標「未定／待提供」的是開放問題，**去問使用者，不要自己填**。
2. **`.impeccable/surfaces/src-pages-index-astro.md`** — 首頁的方向契約與改版紀錄。**目前的視覺權威在這裡與程式碼。**
3. **`DESIGN.md`** — ⚠️ 已過時，描述的是被捨棄的復古紙張世界。重寫前不要照它做。
4. **`AGENTS.md`** — agent 規則。

記在這些檔案裡的決策大於你的新想法。要偏離就先說、取得同意、再更新檔案。

---

## 1. 這個網站是什麼

李嘉峻（BEDO）的個人網站。台科大資工所碩一，研究 ASR。

- **技術**：Astro 7 靜態站，無後端。對外互動只有 `mailto:` 與外部連結。
- **部署**：push 到 `main` → GitHub Actions 自動部署到 `https://acheeeee.github.io`。**使用者要求：改完先讓他看過，不要自己 push。**
- **語言**：中文 `/`、英文 `/en/`。首訪依瀏覽器語言自動選，右上角可切換，選擇存在 `localStorage` 的 `bedo.lang`。

---

## 2. 視覺世界（目前）

品質基準是使用者指定的 **rauno.me**。

- **整頁左右移動，不上下捲。** 內容在 `#track` 這條橫向軌道裡；滑鼠滾輪的上下會被轉成左右。頁面本身 `overflow: hidden`。
- **一格一個主題。** 軌道由「欄」組成，每欄一到兩格，欄寬刻意不同（`.col--*` 寬度用 `--u` 的倍數）。
- **格子上不標註「這格是什麼」。** 使用者明確要求拿掉右下角的小標籤——內容自己會說明。不要加回去。
- **頂部是 LI BE DO 波形捲動軸**：框起來的那段是目前視窗位置，可拖曳、可點擊跳轉、可用方向鍵。波形是合成的，不是真實錄音。
- **滑鼠滾輪可以捲動頁面**：在頁面任何位置滾都會左右移動，有平滑補間。**桌機不要開 `scroll-snap`**——吸附會把滾輪每一格的小位移拉回原位，看起來像滾不動（踩過一次）。手機觸控才吸附（`pointer: coarse`）。
- **全部格子一起縮放**（使用者要求）：頁面在最左邊時**所有欄**一起放大到 1.2 倍，往右捲動「第一格原本寬度」的距離內**統一線性**縮到 **0.85 倍**（使用者要求：原本大小的 85%，常數 `REST_ZOOM`），所有欄上下切齊。縮小速度由 `SHRINK_SPEED`（目前 1.25）控制：數字越大，捲越短的距離就縮完。實作是 `#track` 上的 `--track-zoom`，每個 `.col` 用 CSS `zoom` 讀它；高度要寫 `calc(100% * var(--track-zoom))`——zoom 底下百分比高度會被抵銷，量過不乘回去視覺高度不變。矮螢幕上下留白不夠時最大倍率會自動降低（1280×720 約 1.1 倍）以免被切掉；手機與「減少動態」設定下不縮放。
- **Hover 要明顯**：格子放大 1.035 倍、浮起陰影、帶輕微過衝的彈性曲線（`--ease-spring`）。使用者要求過「縮放明顯一點、看起來靈活」。
- 淺灰底 `--ground`、白格 `--panel`、1px 框邊、四角十字記號、零圓角。
- 字體 Geist + Geist Mono + Noto Sans TC，全部自架在 `public/fonts/`，不准改成外部字體 CSS。
- `body` 字重 500，**不要**加 `-webkit-font-smoothing: antialiased`（使用者回報過字太細刺眼）。
- 照片**保持彩色**。做成灰階讀起來像遺照，使用者否決過。
- **照片格**：白底填滿欄位空間；照片**完整不裁切、維持原圖比例**（778×1052），以格子內四周 1.5rem 留白後的高度為準算出寬度，靠左上放。照片右邊放教育背景（與照片共用 `--photo-w` 這個值算位置，見 Home.astro 的 `.photocell`）。尺寸用容器查詢算（`--pw: min(100cqw, 100cqh / 1.352)`）——不要改用 `height: 100%; width: auto`，在這個版面裡量過會失效。照片不能變成可捲動的框。
- 照片和研究方向在**同一欄**（照片在上、研究方向貼齊欄底），不要移到名字下面。研究方向那格標題「語音辨識 ASR · 自然語言處理」放同一行、內距較緊（`compact`）。
- **頂部捲軸**：拖曳時走首頁同一套平滑補間（`window.trackGlide`），所以會順順跟著動；框下方顯示框中心所在的音節（LI / BE / DO），與框保持約 10px 距離。
- 第一格只有：大字中文名、一行「LI, CHIA-CHUN ── BEDO」、黃色圓、往右的按鈕。寫**名詞**不寫句子（使用者否決過句子版）；**不放**所屬與研究（研究方向那格已經有，使用者要求不要重複）；**不放**國際音標那行（使用者覺得字體奇怪）。
- 正式英文名是 **LI, CHIA-CHUN**（使用者確認的護照寫法）。不要自己翻成別的拼法。
- 黑客松那格**不寫**「未獲獎」（使用者決定），但也絕對不能寫成像有得獎。
- 聯絡方式**一行一項**，標籤在左、值在右。說明文字是「任何詳細細節或想詢問的事，歡迎寄信給我。」（使用者要求，不要改回「寄信最快」）。
- 格子高度約為可用高度的 70%，上下各留 15% 空白；但格子至少保留 36rem 高，矮螢幕先保證內容放得下。改內容後要用 1280×720 檢查有沒有格子被切掉。

### 顏色規則（使用者指定，必須遵守）

**藍色格（`accent`）只給兩種東西：**

1. **現在正在做的主要計畫**——`WORK` 裡 `primary: true` 的那一筆（目前是 COALA）
2. **聯絡**那一格

**黃色（`--yellow` `#ffd816`，IKEA 那種黃）只用在第一格**：一顆大到被格子邊緣切掉的黃色圓，名字壓在上面。不要把黃色用到別的地方。（試過整格塗黃，跟旁邊的藍放在一起太像 IKEA 招牌，所以選了圓。）

**其他一律白色**：研究方向（試過藍色，使用者改回白色）、side project、其他進行中的工作、所有已完成的東西。

理由：藍色是讓訪客**一眼找到重點**用的，藍色一多就失去作用。所以：

- 同一時間只該有**一個** `primary: true`。
- 主要計畫**完成之後**：把那筆的 `primary` 改成 `false`、`status` 改成 `'closed'`，它就會變成白色的已完成格。下一個主要計畫再設 `primary: true`。

---

## 3. 檔案地圖

```
src/
├─ data/site.ts           ← 所有文案與條目。多數維護只改這一個檔案。
├─ lib/
│  ├─ utterance.ts        ← 音韻模型（UTTERANCE_LIBEDO 是頂部捲動軸用的）
│  ├─ waveform.ts         ← 波形合成與幾何
│  └─ random.ts           ← 確定性亂數
├─ layouts/Base.astro     ← <head>、hreflang、字體預載、首訪語言偵測
├─ components/
│  ├─ Home.astro          ← 首頁：橫向軌道與欄位排版、滾輪轉橫向
│  ├─ TopBar.astro        ← 頂部波形捲動軸 + 語言切換
│  ├─ Panel.astro         ← 一格（accent / closed / bleed / grow）
│  └─ PastedPhoto.astro   ← 照片
├─ styles/global.css      ← design token、瀏覽器表面主題
├─ styles/fonts.css       ← 自架字體（腳本產生）
└─ assets/bedo-portrait.jpeg
scripts/shoot.mjs         ← 截圖與量測（見第 6 節）
```

---

## 4. 常見維護任務

全部在 `src/data/site.ts`，**不用改 `.astro`**。

### 4.1 新增一個專題 / side project

在 `WORK` 陣列加一筆：

```ts
{
  id: 'my-project',          // 穩定識別碼，之後不要改
  status: 'active',          // 'active' 進行中 | 'closed' 已完成
  primary: false,            // 只有「現在的主要計畫」才設 true（會變藍）
  title: { 'zh-Hant': '中文標題', en: 'English title' },
  summary: { 'zh-Hant': '一句話。沒有就留空字串。', en: 'One sentence.' },
  source: null,              // 論文出處 { label, href }
  repo: null,                // 程式碼 { label, href }
  period: null,
}
```

- `primary: true` 的會放在藍色大欄；`primary: false` 且進行中的放在白色欄。
- **只寫真的。** 不准編造效能數字、獎項、使用者規模。

### 4.1b 更新主要計畫的進度

在那筆 `WORK` 條目的 `progress` 裡改：

```ts
progress: {
  asOf: '2026-10-03',                 // 最後更新日期
  items: [
    { state: 'done', text: { 'zh-Hant': '…', en: '…' } },   // 完成
    { state: 'now',  text: { … } },                         // 進行中（最亮）
    { state: 'next', text: { … } },                         // 接下來（最淡）
  ],
},
```

使用者要求：**一行一件事，寫做了什麼，不寫用了哪個套件**（Python、PyTorch 這類不用寫）。數字只能用使用者給的，不准推測還沒跑出來的評估結果。改完要用 1280×720 檢查 COALA 那格有沒有被切掉。

### 4.1c 教育背景

`EDUCATION` 陣列（最近的在前），顯示在照片右邊。欄位：`level`（碩士／學士／高中）、`school`、`department`（沒有就 null）、`period`（年份，未提供就 null）、`current`。
英文校名用通用簡稱（NTUST、NCHU），完整英文名太長會放不下。字級在矮螢幕會自動退一級（英文版先退）。改完用 1280×720 的中英文都檢查一次。

### 4.2 主要計畫完成了

```ts
status: 'closed',
primary: false,
```

它會變成白色虛線框的已完成格。然後把下一個主要計畫設成 `primary: true`。

### 4.3 新增閱讀紀錄

`READING` 陣列（最近讀的在前）加 `{ id, title, authors, venue, year, href, state: 'reading' | 'read' }`。作者、出處、年份要**查證過**再填（對照原文 PDF 或 Crossref），不要憑印象。陣列空的時候會顯示誠實的空狀態，**不要為了看起來滿塞假條目**。

閱讀紀錄和聯絡在**同一欄**（閱讀在上、聯絡在下，使用者指定）。收合時標題旁顯示「總計 N」（不放其他統計），下面**直接列出論文標題、每篇一行**，標題太長就用「…」截斷；放不下的篇數會在底部淡出並出現「⋯」，告訴訪客下面還有（使用者要求不要全部藏起來）。聯絡格只佔它內容需要的高度，閱讀格吃剩下的。**點這一格**才往下展開——閱讀格長高吃掉整欄、聯絡格縮到 0 淡出，清單在格內上下捲；再點一次或按 Esc 收合。**滑鼠移上去只做一般的放大，不能展開**（使用者明確要求）。展開是往下，**不要做成橫向展開**。

### 4.4 改文案、聯絡方式、實驗室

`STRINGS`（兩個語言都要改，少一邊 TypeScript 會報錯）、`CONTACT`、`STRINGS[*].lab`。

### 4.5 換成真實錄音的波形

頂部波形目前由 `UTTERANCE_LIBEDO` 合成。要換真實的：錄一段念「LI BE DO」的 wav，在建置期讀出 PCM 樣本，取代 `buildWaveform()` 裡合成訊號的那段——按欄取極值的邏輯不用改。換完後把 `scrubberLabel` 裡的「合成的」拿掉。

---

## 5. 踩過的坑

- **Astro 樣式作用域**：在 `Home.astro` 寫的 class 樣式，套不到 `Panel.astro` 渲染出來的元素上（拿不到作用域 hash）。要跨元件指定祖先就用 `:global(.panel[data-accent='true']) .xxx`。格盤曾經因此整個垮成一條條窄柱。
- **macOS 無頭 Chrome 最小視窗寬度約 500px**：用 `chrome --headless --screenshot --window-size=390,...` 截出來的「手機圖」其實是 500px 版面，看起來像溢出，是假的。一律用 `scripts/shoot.mjs`（走 CDP 做真實裝置模擬）。
- **偵測器要掃 `dist/`**，掃 `.astro` 原始碼會假性通過。
- **偵測器目前對每一格回報 `cramped-padding`**：真實瀏覽器量測每格文字距框邊 33px，這是偵測器誤判這種橫向 flex 版面，不是真的貼邊。已排除過 dvh、overflow、flex-basis 三種假設，原因未明。

---

## 6. 改完之後的驗證

```bash
npx astro build
sh .kiro/skills/impeccable/scripts/impeccable detect dist/index.html dist/en/index.html
```

截圖（先開一個帶除錯埠的 Chrome，再開 preview）：

```bash
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  --headless=new --disable-gpu --remote-debugging-port=9222 \
  --user-data-dir=/tmp/chrome-shoot --no-first-run about:blank &
npx astro preview --port 4411 &
node scripts/shoot.mjs "http://localhost:4411/" .impeccable/review/desktop.png 1440 900 0
node scripts/shoot.mjs "http://localhost:4411/" .impeccable/review/mobile.png   390 844 1
```

橫向頁面要看：頁面本身不能有垂直捲動（`scrollHeight == clientHeight`）、軌道 `#track` 要能橫向捲、沒有任何格子的內容被切掉。

---

## 7. 待補清單

| 項目 | 狀態 |
|---|---|
| DESIGN.md 整份重寫成目前的世界 | 待做 |
| 波形是合成的，不是真實錄音 | 待使用者提供音檔 |
| 「即時系統」沒有正式名稱與說明 | 待使用者提供 |
| og:image | 沒有，分享連結只有文字卡 |
| `LOCALE_PATH` 只處理首頁 | 加子頁時必須改 |
| 偵測器 `overused-font`（Geist） | 已知，字體尚未與使用者討論 |
