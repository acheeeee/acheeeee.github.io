> [!WARNING]
> **這份文件已過時（2026-10-03）。**
> 它描述的是已經被捨棄的「墨線紙帶／感熱紙」復古世界。使用者在那之後明確要求
> 「不要走復古風我想要現代科技感」，並指定 `rauno.me` 為品質基準、結構為
> 「一格一個主題」的格盤。目前實際的視覺世界是：淺中性灰底上的白色框板格盤、
> Geist + Geist Mono 字體、單一電藍 `#1b23ff` 色場。
>
> **權威來源是程式碼與 `.impeccable/surfaces/src-pages-index-astro.md` 的方向契約**，
> 不是這份文件。重寫這份文件是待辦事項。

# 維護手冊

這份文件是給**未來接手這個網站的人或模型**看的。不管你是在新的聊天室、換了模型、還是半年後的我自己，照這份做就不會把設計搞亂。

---

## 0. 先讀這些，順序不要跳

動任何 UI 檔案（`.astro`、CSS、資產）之前，依序讀完：

1. **`PRODUCT.md`** — 已確認的產品事實：這站給誰看、什麼是真的、什麼絕對不能編。標成「未定 / 待提供」的欄位是開放問題，**去問使用者，不要自己填**。
2. **`DESIGN.md`** — 已承諾的視覺世界（色彩、字體、間距、動態）。
3. **`.impeccable/surfaces/src-pages-index-astro.md`** — 首頁的 surface brief 與方向契約（THESIS / OWN-WORLD / STORY / FIRST VIEWPORT / FORM / FINISH 六段）。
4. **`AGENTS.md`** — 這個專案對 agent 的規則。

**記在這些檔案裡的決策大於你的新想法。** 如果工作真的需要偏離，先說出來取得同意，然後更新那個檔案——不要默默改掉。

---

## 1. 這個網站是什麼

李嘉峻（BEDO）的個人網站。台科大資工所碩一，研究 ASR（語音辨識）。

- **技術**：Astro 7 靜態站，無後端、無資料庫、無表單接收端。對外互動只有 `mailto:` 與外部連結。
- **部署**：push 到 `main` → GitHub Actions（`.github/workflows/deploy.yml`）自動建置部署到 `https://acheeeee.github.io`。
- **語言**：中文（`/`）與英文（`/en/`）。首訪依瀏覽器語言自動選擇，右上角可手動切換，選擇記在 `localStorage` 的 `bedo.lang`。
- **訪客**：同行研究者與工程師，從履歷連結、GitHub profile、他人轉發進來，三十秒內要判斷「這人在做什麼」。
- **唯一主要動作**：往下進入研究內容。不是寄信。別把寄信升格成主行動。

---

## 2. 絕對不能做的事

`PRODUCT.md` 的「目前沒有，未來工作不得編造」清單是強制的：

- 不得編造論文發表、引用數、效能數字（WER、準確率等）、benchmark
- 不得編造客戶、合作單位、推薦語、案例研究
- 不得編造獎項、媒體報導、演講紀錄
- 不得編造流量或使用者規模
- **黑客松必須寫「未獲獎」**。不得用「參與過競賽」這類模糊措辭讓它讀起來像得獎或入圍。
- 英文姓名的羅馬拼音未確認，**不要自己拼**。英文版用「BEDO」加「李嘉峻」。

不確定的一律去問。寧可欄位空著，也不要填假的。

---

## 3. 檔案地圖

```
src/
├─ data/site.ts          ← 所有文案與條目。多數維護只改這一個檔案。
├─ lib/
│  ├─ utterance.ts       ← 發話的音韻模型（音段、聲調、共振峰）
│  ├─ waveform.ts        ← 主音波圖的合成與幾何
│  ├─ worktrace.ts       ← 工作紙帶的墨線包絡
│  └─ random.ts          ← 確定性亂數（同種子＝同痕跡）
├─ layouts/Base.astro    ← <head>、hreflang、字體預載、語言偵測
├─ components/
│  ├─ Home.astro         ← 首頁組成（雙語共用）
│  ├─ PanelBar.astro     ← 頂端機器面板 + 語言切換
│  ├─ Waveform.astro     ← 主紙帶（音波圖）+ scrub 讀值
│  ├─ PastedPhoto.astro  ← 角貼大頭照
│  ├─ WorkBand.astro     ← 一條工作紙帶
│  ├─ ReadingTier.astro  ← 閱讀紀錄層軌（含空狀態）
│  └─ ContactPanel.astro ← 蝕刻聯絡面板
├─ styles/
│  ├─ global.css         ← design token、重置、瀏覽器表面主題
│  └─ fonts.css          ← 自架字體（由腳本產生，見第 8 節）
├─ assets/bedo-portrait.jpeg
└─ pages/
   ├─ index.astro        ← 中文首頁（薄殼，只傳 locale）
   └─ en/index.astro     ← 英文首頁

public/fonts/            ← 115 個 woff2。不要手動刪。
scripts/shoot.mjs        ← 截圖與版面量測（見第 7 節）
```

---

## 4. 常見維護任務

### 4.1 新增一筆「進行中」的工作

只改 `src/data/site.ts` 的 `WORK` 陣列，加在**最前面**（順序即閱讀順序，最近的在前）：

```ts
{
  id: 'my-new-thing',        // 穩定識別碼，之後不要改（錨點與墨線種子都靠它）
  pen: 1,                    // 通道筆色 1=鈷藍 2=朱紅 3=深青綠。往下輪一號，避免相鄰同色
  status: 'active',
  density: 1,                // 墨跡濃度。進行中建議 0.8–1
  extent: 1,                 // 1 = 墨線衝出右緣（未收尾）
  title: { 'zh-Hant': '中文標題', en: 'English title' },
  summary: {
    'zh-Hant': '一句話說明。沒有就留空字串，不會留下空殼。',
    en: 'One sentence. Empty string renders nothing.',
  },
  source: { label: '作者, 年份 · arXiv:XXXX', href: 'https://...' },  // 沒有就 null
  period: null,              // 例如 { 'zh-Hant': '2026-02 起', en: 'since 2026-02' }；未定就 null
}
```

**不用改任何 `.astro`。** 墨線會依 `id` 自動產生，而且同一個 `id` 永遠產生同一條痕跡。

### 4.2 把一筆工作標成完成

改那一筆的三個欄位，**不要刪掉條目**（使用者明確要求完成的不刪）：

```ts
status: 'closed',
density: 0.46,   // 完成的建議 0.4–0.55：讀得出來，但明顯比進行中淡
extent: 0.62,    // < 1，墨線會在這個比例收尾並畫上雙線
```

狀態是靠**墨色濃度、振幅與收尾**表達的，不是靠徽章。不要加 badge、不要加色塊。

### 4.3 新增閱讀紀錄

`src/data/site.ts` 的 `READING` 陣列：

```ts
{
  id: 'coala-2026',
  title: 'COALA: Robust Contextualized Speech-augmented Language Modeling for ASR',
  venue: 'arXiv',
  year: '2026',
  href: 'https://arxiv.org/abs/2607.08117',
  state: 'reading',   // 'reading' 在讀 | 'read' 讀完
}
```

陣列一旦非空，`ReadingTier` 會自動從空狀態切換成條目列表，計數欄會跟著更新。空狀態是刻意設計的（刻度照畫、計數誠實讀 0），不要為了「看起來比較滿」去塞假條目。

### 4.4 改文案

全部在 `src/data/site.ts` 的 `STRINGS`。兩個語言都要改——`Strings` 是 TypeScript interface，少一邊建置就會報錯，這是故意的。

### 4.5 改聯絡方式

`src/data/site.ts` 的 `CONTACT` 陣列。`label` 是蝕刻標籤（大寫短標籤），`value` 是面板上顯示的值。

### 4.6 把音波圖換成真實錄音

目前首頁的音波圖是**合成波形**：音韻參數寫在 `src/lib/utterance.ts` 的 `UTTERANCE_ZH` / `UTTERANCE_EN`，由 `src/lib/waveform.ts` 合成時域訊號後按欄取極值畫成墨線。圖說已標明「非實際錄音分析」。這是誠實的做法，但真實錄音會更好，而且換起來比聲譜圖容易得多——波形不需要 FFT。

要換成真的：

1. 錄三秒清楚念出「李嘉峻」（英文版錄「BEDO」），存成 wav，放進 `src/assets/`。
2. 在 `src/lib/` 寫一支建置期函式：用 Node 解碼 wav 取出 PCM 樣本（16-bit little-endian，跳過 44 byte 的標頭就能讀；或用 `node-wav`），正規化到峰值 1。
3. 把 `buildWaveform()` 裡合成訊號的那段換成讀取真實樣本。**按欄取極值的邏輯完全不用改**——它本來就是在吃一個 `Float32Array`。
4. 音段邊界（`UTTERANCE_ZH` 的 `start` / `end`）要對齊真實錄音的時間。用 Praat 標一次 TextGrid 最準，手調也可以。
5. **把圖說改掉**：`waveCaption` 的「非實際錄音分析」必須移除，換成錄音日期之類的真實說明。圖說與圖不符就是在說謊。

### 4.7 新增子頁（關於我 / 研究 / 論文 / side projects）

目前**只有首頁**，首頁上沒有指向不存在頁面的連結（刻意的，避免 404）。

新增一頁時：

1. 建 `src/pages/<name>/index.astro`（中文）與 `src/pages/en/<name>/index.astro`（英文）。
2. 兩頁都包 `Base`，傳對應的 `locale`。
3. 版面必須繼承這個世界：紙 → 網格 → 墨線 → 標記 四層，蝕刻標籤在固定槽位，狀態靠濃度。直接重用 `WorkBand`、`ReadingTier`、`ContactPanel`。
4. `Base.astro` 的 `hreflang` 目前硬寫首頁路徑（`LOCALE_PATH`）。新增路由時要把 `LOCALE_PATH` 改成能依當前路由產生對應語言 URL，否則子頁的 `hreflang` 會全部指回首頁。
5. 面板的語言切換也是指向 `LOCALE_PATH`，同一個問題，一起改。
6. 在首頁加入口連結，並為新頁寫 surface brief（見第 0 節第 3 項）。

---

## 5. 視覺世界的規則

世界是 **筆式記錄儀在記錄紙上畫出的精準墨線**。細節在 `DESIGN.md`，但以下幾條最容易被不小心破壞：

- **只有四層套印**：紙、網格、墨線、標記。不准第五層（不要加玻璃、漸層字、光暈、陰影堆疊）。
  滿版方格紙、紙纖維顆粒、走紙孔、撕線孔**全部歸在第一／第二層**，不是新的平面。
- **墨線必須精準**：1px、`vector-effect="non-scaling-stroke"`、不加模糊濾鏡、不加漸層。使用者明確要求過「精準的線」；暈開的灰塊被否決過一次。
- **格線與細線是兩套，不要混用**：
  - `--grid` / `--grid-strong`（橙紅）是**印刷方格**——只用在圖表內部、紙帶上下緣、刻度、滿版紙面。
  - `--rule` / `--rule-strong`（中性灰）是**版面結構分隔**——面板邊、面板框、欄位分隔。
  把結構細線塗成橙紅會讓整頁變成一張發票。
- **顏色分的是通道，不是狀態**：`--pen-1`（鈷藍）/ `--pen-2`（朱紅）/ `--pen-3`（深青綠）代表不同通道。
  狀態永遠靠濃度、振幅與收尾表達。不要用顏色表示「進行中／完成」。
- **`--grease`（蠟筆紅 `#d4452f`）只能是筆痕**：playhead、當前語言的刻痕、箭頭。
  它對紙面只有 2.7:1，**永遠不可以承載文字**。
- **滿版方格紙要耳語**：`--grid-fine` / `--grid-heavy` 的強度調過兩次。太強的時候整頁會像被紅線切割，
  讀起來是瑕疵不是紙。改動前先截圖比對。
- **底色在 `html` 上，不在 `body`**：`body` 的分層背景如果傳播到根畫布，`scroll` 與 `fixed` 混用會讓
  方格紙只畫到第一個視窗高度就斷掉。這個坑踩過一次，不要把 `html { background-color }` 拿掉。
- **蠟筆紅 `--grease` 只能以筆痕出現**，永遠不做填色塊或按鈕底色。
- **蝕刻標籤不放在標題上方。** 小標籤排在值的旁邊或下方。標題上方的小字（eyebrow / kicker）在這個專案是禁止的。
- **狀態靠墨色濃度與振幅，不靠徽章。**
- **字級**：使用者要求過「內文大一點、名字小一點」。`--text-base` 現在是 17–19px、
  `--text-display` 上限 3.5rem（56px）。不要把名字放回 84px。
- **字重不能變細**：使用者回報過「字太細，閱讀起來很痛眼睛」。`body` 的 `font-weight` 是 **500**，
  不是 420。小字標籤是 600–650。另外 **刻意不設 `-webkit-font-smoothing: antialiased`** ——
  它在 macOS 上會把筆畫磨細，加回去等於把這個修正還原。
  中文在中間調紙底上對筆畫粗細特別敏感，細體會刺眼。
- **紙纖維顆粒蓋在文字上**：`--grain` 目前 0.1。調高會讓字讀起來有雜訊，這是上面那個抱怨的一部分原因。
- **等寬字只用於刻度、時間碼、數值**，不是用來裝「技術感」。
- **動態只有一個時刻**：觸針由左至右把紙帶燒出來，全站共用 `--clock`。不要新增各自獨立的 hover 動畫。
- **區段編號（01 / 02 / 03）不要加。**
- **照片最大顯示寬度 330px**（原圖只有 778px 寬）。不得插值放大。需要更大就向使用者要高解析度原檔。

---

## 6. 建置與部署

```bash
npm install
npx astro dev --background     # 開發（背景模式，見 AGENTS.md）
npx astro dev status           # 看狀態
npx astro dev logs             # 看日誌
npx astro dev stop             # 關掉

npx astro build                # 產出 dist/
npx astro preview --port 4411  # 預覽建置結果
```

部署：push 到 `main` 就會自動跑。不要手動改 `dist/`。

---

## 7. 改完 UI 之後的驗證（照做，不要跳）

### 7.1 建置必須通過

```bash
npx astro build
```

### 7.2 跑機械偵測器

**注意：要掃 `dist/` 的 HTML，不是掃原始碼。** 掃 `.astro` 會回傳空陣列，那是假的通過。

```bash
sh .kiro/skills/impeccable/scripts/impeccable detect dist/index.html dist/en/index.html
```

零發現才算過。

### 7.3 截圖檢查

`scripts/shoot.mjs` 走 Chrome DevTools Protocol，可以做真實的裝置模擬與整頁擷取。

**不要用 `chrome --headless --screenshot`。** macOS 上無頭 Chrome 有約 500px 的最小視窗寬度，叫它用 390 寬只會把 500px 的版面塞進 390px 的圖裡，看起來像版面爆掉——那是擷取失真，不是真的缺陷。這個坑踩過一次了。

```bash
# 先開一個帶除錯埠的 Chrome
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  --headless=new --disable-gpu --remote-debugging-port=9222 \
  --user-data-dir=/tmp/chrome-shoot --no-first-run about:blank &

npx astro preview --port 4411 &

# node scripts/shoot.mjs <url> <輸出png> <寬> <高> <mobile 0|1>
node scripts/shoot.mjs "http://localhost:4411/"    .impeccable/review/desktop.png 1440 900 0
node scripts/shoot.mjs "http://localhost:4411/"    .impeccable/review/mobile.png   390 844 1
node scripts/shoot.mjs "http://localhost:4411/en/" .impeccable/review/desktop-en.png 1440 900 0
```

腳本除了截圖還會印出版面量測，直接看這幾個值：

- `scrollW` 必須等於 `vw`，否則有橫向溢出
- `bad` 必須是空陣列（列出所有超出視窗右緣的元素；進行中紙帶的刻意外溢已排除）
- `activeTop` 應小於視窗高度，代表「進行中」的規線進到第一屏

### 7.4 檢查輪數有上限

完整建置 → 批次檢查一輪（桌機與手機一起）→ 一次修完 → 最多再確認一輪 → 停。不要無限自我 QA。

---

## 8. 自架字體的維護

三套可變字體，全部自架在 `public/fonts/`（115 個 woff2），`src/styles/fonts.css` 由腳本產生：

| 用途 | 字體 | 說明 |
|---|---|---|
| 顯示與正文（拉丁） | **Archivo**（含 wdth 軸） | 源自 19 世紀美式 gothic 與工程表單字，正是機器面板蝕刻字的直系 |
| 刻度、時間碼、數值 | **Martian Mono** | 只用於量測，不是裝飾 |
| 中文 | **Noto Sans TC** | 108 個 unicode-range 分片，瀏覽器按需自取 |

**絕對不要改成 `fonts.googleapis.com` 的外部樣式表。** 自架是刻意的：GitHub Pages 上外部字體 CSS 會阻塞渲染，而且這個世界不允許用系統字當顯示字。

要重新下載或換字體，用這段（它會改寫 CSS 成本地路徑，並保留 `unicode-range`）：

```bash
UA='Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36'
curl -sS -A "$UA" "https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@62..125,100..900&display=swap" -o /tmp/archivo.css
# 其餘字體同理；再把 CSS 裡的 https URL 全部下載到 public/fonts/ 並改寫成 /fonts/<檔名>
```

`Base.astro` 的 `latinPreloads()` 會在建置時讀 `fonts.css`，自動找出含基本拉丁範圍的分片來預載，所以字體重新下載、檔名編號改變也不會失效。中文分片有一百多片，交給瀏覽器按 `unicode-range` 自取，不預載。

---

## 9. 已知限制與待補清單

| 項目 | 狀態 |
|---|---|
| 音波圖是合成波形，不是真實錄音 | 待使用者提供三秒音檔（見 4.6） |
| 「即時系統」沒有正式名稱 | 待使用者提供名稱與一句話範圍 |
| 英文姓名羅馬拼音未確認 | 待使用者提供護照拼法；在那之前英文版用 BEDO |
| 大頭照只有 778px 寬 | 顯示寬度上限 330px；需要更大要向使用者要原檔 |
| 沒有 og:image | 連結預覽目前只有文字卡。要做需產一張 1200×630 的橫幅 |
| 「閱讀紀錄」要條目清單還是完整筆記 | 未定；目前以短刻痕條目呈現 |
| `LOCALE_PATH` 只處理首頁 | 新增子頁時必須改（見 4.7 第 4、5 點） |
| 沒有 sitemap.xml / robots.txt | 可加 `@astrojs/sitemap` |

---

## 10. 如果你是模型，而使用者只說「更新一下網站」

按這個順序問清楚再動手：

1. 要更新什麼？新的進行中工作、工作完成了、新讀的論文、還是改文案？
2. 新資訊的**確切內容**是什麼？有引用來源嗎？日期確定嗎？
3. 任何你不確定的事實，**問**，不要推測。

然後：改 `src/data/site.ts` →（必要時才改元件）→ 第 7 節的驗證流程 → 回報你改了什麼、驗證了什麼、什麼沒驗證到。
