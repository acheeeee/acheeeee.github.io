> [!WARNING]
> **這份文件已過時（2026-10-03）。**
> 它描述的是已經被捨棄的「墨線紙帶／感熱紙」復古世界。使用者在那之後明確要求
> 「不要走復古風我想要現代科技感」，並指定 `rauno.me` 為品質基準、結構為
> 「一格一個主題」的格盤。目前實際的視覺世界是：淺中性灰底上的白色框板格盤、
> Geist + Geist Mono 字體、單一電藍 `#1b23ff` 色場。
>
> **權威來源是程式碼與 `.impeccable/surfaces/src-pages-index-astro.md` 的方向契約**，
> 不是這份文件。重寫這份文件是待辦事項。

---
name: 墨線紙帶 / Ink-Trace Chart
description: 一位 ASR 研究者的首頁，做成一台多筆道記錄儀，在整張印刷方格記錄紙上畫出他名字的音波圖。
colors:
  paper: "#cfc8b8"
  paper-high: "#ded8ca"
  paper-edge: "#bbb3a1"
  paper-deep: "#aaa28e"
  grid: "#cf8a6e"
  grid-strong: "#b4573c"
  rule: "#a8a192"
  rule-strong: "#8e8676"
  pen-1: "#16357e"
  pen-2: "#ab2f22"
  pen-3: "#0c5a52"
  trace-1: "#b2ac9d"
  trace-2: "#6b6253"
  trace-3: "#2f2a23"
  trace-4: "#1a1713"
  ink: "#1b2330"
  ink-strong: "#0e141d"
  ink-soft: "#4a4336"
  grease: "#d4452f"
typography:
  display:
    fontFamily: "'Archivo', 'Noto Sans TC', ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.25rem, 1.7rem + 2.4vw, 3.5rem)"
    fontWeight: 800
    lineHeight: 0.96
    letterSpacing: "-0.03em"
    fontVariation: "'wdth' 108"
  headline:
    fontFamily: "'Archivo', 'Noto Sans TC', ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.75rem, 1.45rem + 1.4vw, 2.625rem)"
    fontWeight: 700
    lineHeight: 1.08
    letterSpacing: "-0.022em"
    fontVariation: "'wdth' 106"
  title:
    fontFamily: "'Archivo', 'Noto Sans TC', ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.4375rem, 1.25rem + 0.85vw, 1.9375rem)"
    fontWeight: 700
    lineHeight: 1.08
    letterSpacing: "-0.022em"
    fontVariation: "'wdth' 104"
  body:
    fontFamily: "'Archivo', 'Noto Sans TC', ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.0625rem, 1rem + 0.3vw, 1.1875rem)"
    fontWeight: 420
    lineHeight: 1.65
    letterSpacing: "normal"
  label:
    fontFamily: "'Martian Mono', ui-monospace, 'SFMono-Regular', monospace"
    fontSize: "0.75rem"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "0.16em"
    fontFeature: "'tnum' 1"
    fontVariation: "'wdth' 88"
spacing:
  "1": "0.25rem"
  "2": "0.5rem"
  "3": "0.75rem"
  "4": "1rem"
  "5": "1.5rem"
  "6": "2rem"
  "7": "3rem"
  "8": "4rem"
  "9": "6rem"
rounded:
  none: "0"
components:
  jump-primary:
    backgroundColor: "{colors.paper-high}"
    textColor: "{colors.ink-strong}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "0.7rem 1rem 0.7rem 0.75rem"
  lang-notch:
    backgroundColor: "{colors.paper-high}"
    textColor: "{colors.ink-strong}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "0.3rem 0.7rem 0.4rem"
  contact-plate:
    backgroundColor: "{colors.paper-high}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.none}"
    padding: "2rem 1.5rem 1.5rem"
---

# Design System: 墨線紙帶 / Ink-Trace Chart

## Overview

**Creative North Star: 「多筆道記錄儀的墨線」(The Multi-Pen Chart Recorder's Ink Lines)**

這頁不是在介紹一個人，而是攤開他工作的輸出紙帶——而且整張頁面本身就是記錄紙。暖灰米黃的紙面上預印著一整片橙紅色的方格（心電圖紙那種），一台多筆道筆式記錄儀在上面運作：主通道的鈷藍觸針把名字的時域訊號畫成一條精準的墨線——每一欄一條 1px 的直線，鏡像於零線，正是音訊編輯器畫波形的方式。線上壓著手寫的音段邊界與國際音標，下面是時間刻度尺與正規化振幅刻度。每一筆工作也是這張紙上的一條墨線包絡，各自用一支通道筆色（鈷藍、朱紅、松綠），躺在自己的時間軸上；未收尾、衝出右緣的那一條，就是現在正在做的事。

這個世界經歷了兩輪使用者指示的演化。它原本是 Kay Sonagraph 聲譜儀的感熱燒痕（模糊灰階密度場），第一輪依使用者「我希望把圖變成音波圖就是精準的線」換成筆式記錄儀的精準墨線。第二輪使用者要三件事：內文放大、名字縮小、顏色炫一點、材質更豐富但不單調。於是調色策略由收斂改為**多筆道彩色記錄儀**：印刷方格變成橙紅、每條記錄用一支通道筆色、蠟筆紅提亮；並補上整張頁面的物理——印刷方格記錄紙、SVG 亂流紙纖維、走紙齒孔、撕線孔、面板索引刻度、面板螺絲、通道色條。四層套印、蝕刻標籤、狀態靠濃度、單一時鐘的骨架全部保留。它仍刻意拒絕這個類別的兩種預設：既不是「大名字＋一句 tagline＋幾個社群圖示」的留白極簡個人站，也不是深色終端機風。

密度與誠實是這個系統的性格。墨線一律 1px、`vector-effect: non-scaling-stroke`、不模糊不漸層——縮放時線不變粗，這是「精準」的硬保證。顏色分的是**通道**，不是狀態；狀態不靠徽章，靠墨跡：進行中的濃而振幅不收、衝出右緣，已完成的筆色往紙面退一階、以雙線收束。等寬字只用來承載量測。波形是由音韻模型程序合成的，不是真實錄音，所以兩個版本的圖說都帶著誠實標籤。

**Key Characteristics:**
- 整張頁面是一張印刷方格記錄紙：橙紅方格背景跑滿全頁，不只在圖裡。
- 兩套線系統永不混用：橙紅印刷方格（`--grid`）與中性結構細線（`--rule`）各司其職。
- 墨線是精準的線，不是模糊的場：每欄一條 1px `non-scaling-stroke`，鏡像於零線。
- 顏色編碼通道（`--pen-1/2/3`），不編碼狀態；狀態靠墨色濃度、振幅與收尾與否。
- 蠟筆紅 `--grease` 只以筆痕（線、箭頭、底線、刻痕）出現，永不做填色塊、永不承載文字。
- 四層套印：紙 → 網格（印刷方格）→ 墨線 → 標記；不准第五層。
- 單一時鐘驅動所有入場動態：一支筆由左至右走過，墨線依序落下。

## Colors

調色盤是一條多筆道記錄紙的物理：暖灰米黃的紙、橙紅的印刷方格、三支通道筆色、藍黑的手寫標記墨、以及一支蠟筆紅。這一輪把色相明顯推高了（印刷方格由中性灰改橙紅、主波形改鈷藍、蠟筆紅提亮），同時嚴格分出「印刷格線」與「結構細線」兩套線。所有顏色依四層套印的角色分組。

### Primary
- **蠟筆紅 Grease Red** (`#d4452f`)：唯一的強調色，受最嚴格的紀律約束。只以**畫出來的筆痕**出現——當前語言刻度下的底線、往下跳的箭頭描邊（`stroke`）、scrub 刻痕與播放頭（`.wave__playhead` / `.wave__pen` / `.band__mark`）、`::selection` 混色、`caret-color`、連結 hover 的底線色、scrollbar thumb hover——**永不作為填色塊或背景，永不承載文字**。它是手在記錄紙上留下的那一道，稀少是重點。

### Secondary
通道筆色（第三層墨線）。顏色分的是**通道**，不是狀態：每條工作紙帶在 `src/data/site.ts` 攜帶一個 `pen: 1 | 2 | 3` 欄位，新增條目往下輪一號避免相鄰同色。
- **鈷藍 Pen 1** (`#16357e`)：主通道，紙上 6.8:1。主波形（`.wave__trace line` 的 `stroke`）與通道一的工作紙帶。
- **朱紅 Pen 2** (`#ab2f22`)：通道二，紙上 4.0:1，僅用於墨線與大字（對比不足以承載內文）。
- **松綠 Pen 3** (`#0c5a52`)：通道三，紙上 4.9:1。採深青綠而非亮松綠，因為松綠在暖褐紙上色相差太小會讀成淡色。

### Neutral
紙（第一層）承載一切背景與面板襯底：
- **紙 Paper** (`#cfc8b8`)：頁面底色，掛在 `html` 與 `body` 上，整張記錄紙的紙面。
- **亮紙 Paper High** (`#ded8ca`)：面板、照片襯底、繪圖區混色基底——比紙亮一階。
- **紙邊 Paper Edge** (`#bbb3a1`)：紙帶邊緣、卡紙、語言刻度盤凹槽、scrollbar track。
- **紙凹 Paper Deep** (`#aaa28e`)：面板凹槽、頁腳底色、齒孔與面板螺絲的暗點、撕線打孔。

網格（第二層）是記錄紙上預印的橙紅方格：
- **網格 Grid** (`#cf8a6e`)：橙紅細格線——繪圖區虛線振幅次要格線（`stroke-dasharray: 2 7`）、時間刻度短痕、紙帶上下緣細線、滿版方格的細格與粗格來源色。
- **強網格 Grid Strong** (`#b4573c`)：橙紅主格線——繪圖區外框、零線（`.wave__zero` / `.band__zero`）、刻度盤邊框、面板索引刻度、scrollbar thumb、時間主刻度。

結構細線（中性，**不是**印刷方格，承擔版面本身的分隔）：
- **細線 Rule** (`#a8a192`)：中性 1px 分隔——圖說上緣、閱讀層軌條目分隔。
- **強細線 Rule Strong** (`#8e8676`)：較重的中性結構線——面板下緣、身分欄位上緣、工作紙帶之間、面板邊框、聯絡面板邊框、頁腳上緣、刻度盤分隔。

墨線濃度階（第三層的濃度用，**不帶色相**，進行中用濃、已完成用淡）：
- **墨線 1–4 Trace 1–4** (`#b2ac9d` / `#6b6253` / `#2f2a23` / `#1a1713`)：筆色 token 缺省時的回落（`var(--pen, var(--trace-4))`）、角貼紙角與齒孔的暗墨混色來源。墨線本體的筆色由 `--pen-*` 決定，`--trace-*` 只作濃度回落與材質混色。

標記（第四層，手寫標註層，藍黑）承載所有可讀文字與量測墨線：
- **墨 Ink** (`#1b2330`)：正文主色（紙上 9.5:1）、音段邊界線、已完成條目的雙線收束、撕線的虛線、往下跳按鈕的邊框、`accent-color`。
- **強墨 Ink Strong** (`#0e141d`)：量測讀值、`:focus-visible` outline、最強標題墨、`::selection` 文字色。
- **柔墨 Ink Soft** (`#4a4336`)：次要文字、蝕刻標籤、圖說、刻度數值、已完成條目的值（紙上 5.9:1）。次要文字由紙的色相調出，**不用中性灰**。

### Named Rules

**The Two-Line-Systems Rule（兩線分治律）.** 版面上有兩套永不混用的線。`--grid` / `--grid-strong` 是**印刷圖表格線**（橙紅）：只出現在圖表內（振幅格線、零線、外框）、紙帶上下緣、刻度短痕、以及作為整張頁面的方格背景。`--rule` / `--rule-strong` 是中性**結構細線**：面板邊、框、欄位分隔。把結構細線漆成橙紅，整頁就會讀成一張發票。審核測試：這條線是「紙上印好的圖表格子」還是「版面把兩塊東西分開」？印表格用 grid，分版面用 rule。

**The Colour-Encodes-Channel Rule（色即通道律）.** `--pen-1`（鈷藍）/ `--pen-2`（朱紅）/ `--pen-3`（松綠）是記錄通道，每條工作條目在 `site.ts` 攜帶 `pen` 欄位。顏色**只分通道，不表達狀態**。狀態一律是墨色濃度（`--trace-opacity`）＋振幅包絡（收不收）＋是否收尾（雙線 terminal）。已完成不是「換灰色」，而是把同一支筆色往紙面混退一階（`color-mix(... var(--pen) 82%, var(--paper))`）。沒有徽章、沒有 pill。

**The Grease-As-Mark Rule（蠟筆只畫痕律）.** `--grease` (`#d4452f`) 只以線、描邊、底線、刻痕、播放頭、選取混色出現。它永遠不是 `background-color` 的填色、不是色塊、不是按鈕底，**也永遠不承載文字**。它在紙上實測對比足以讓筆痕清楚可見（蠟筆紅對紙約 4.8:1），但正因為它永不排字，無須通過正文對比門檻——它是記號不是文本。審核測試：若把某處的 `--grease` 換成一塊填色或拿它排一行字它就壞了，那它用對了。

**The Trace-Is-A-Line Rule（墨線成線律）.** 第三層是**畫出來的精準線**，不是暈開的場：每一欄一條 1px、`vector-effect: non-scaling-stroke`、無濾鏡、無漸層的直線，鏡像於零線。縮放時線不得變粗、不得模糊。新區塊若需要能量感，應長出一條墨線包絡紙帶（用某支 `--pen`），而不是加一個色點、也不是回到模糊的灰階密度場。

## Typography

**Display／Body Font:** Archivo（自架，`font-weight: 100 900` 字重軸 ＋ `font-stretch: 62% 125%` 寬度軸；拉丁依 unicode-range 分三片自取），中文回落 Noto Sans TC（自架，`font-weight: 100 900`，依 unicode-range 分一百多片自取）。
**Label／Mono Font:** Martian Mono（自架，`font-weight: 100 800` ＋ `font-stretch: 75% 112.5%`）。

**Character:** Archivo 是機器面板蝕刻字的直系後裔，寬度軸讓標題能壓出面板銘牌的那種緊實感（display 用 `font-stretch: 108%`）。Martian Mono 的等寬齒輪只在需要「這是一個被量到的數」時出現。中英文透過共用 `--font-sans` 無縫並置。

這一輪依使用者指示調整了尺度：**內文放大、名字縮小**。內文基準 `--text-base` 升到 `clamp(1.0625rem, 1rem + 0.3vw, 1.1875rem)`（約 17–19px），姓名 display 上限由前一版的 84px 一路降到 `clamp(2.25rem, 1.7rem + 2.4vw, 3.5rem)`（上限 56px）。名字不再是壓倒一切的巨標，而是記錄表頭裡一個可讀、克制的 h1。

### Hierarchy
- **Display**（800、`clamp(2.25rem, 1.7rem + 2.4vw, 3.5rem)`、line-height 0.96、`letter-spacing: -0.03em`、`font-stretch: 108%`）：僅用於 `.identity__name`，記錄表頭裡的姓名 h1。窄螢幕（≤46rem）另降為 `clamp(1.875rem, 8.6vw, 2.5rem)`。
- **Headline**（700、`clamp(1.75rem, 1.45rem + 1.4vw, 2.625rem)`、`font-stretch: 106%`）：區段標題 `.section__title`（對應 `--text-2xl`）。
- **Title**（700、`clamp(1.4375rem, 1.25rem + 0.85vw, 1.9375rem)`、`font-stretch: 104%`）：工作紙帶標題 `.band__title`（對應 `--text-xl`）。
- **Body**（420、`clamp(1.0625rem, 1rem + 0.3vw, 1.1875rem)`、line-height 1.65）：正文；導語升一級用 `--text-lg`（`clamp(1.1875rem, 1.1rem + 0.4vw, 1.4375rem)`、line-height 1.5）。文字欄寬上限 `--measure: 68ch`。
- **Label／蝕刻**（600、`--text-2xs` = `0.75rem`、`letter-spacing: 0.16em`、`font-stretch: 88%`、全大寫）：`.engraved` 蝕刻標籤與 `.mono` 量測值，用 Martian Mono、`font-variant-numeric: tabular-nums` + `'tnum' 1`。
- 另有兩級小字輔助：`--text-xs` = `0.8125rem`（skip-link）、`--text-sm` = `0.875rem`（圖說、次要值、頁腳）。

### Named Rules

**The No-Eyebrow Rule（禁眉標律）.** 標題上方不放小標、kicker 或 eyebrow。身分資訊的蝕刻標籤排在值的**旁邊**（如 `發話者` 貼在姓名側）或**下方**（如欄位的 `所屬`／`領域`、工作紙帶的 `通道`／`狀態`／`期間`／`出處`），鎖在同一記錄表網格裡，從不浮在標題之上。

**The Mono-For-Measurement Rule（等寬限量測律）.** Martian Mono 只承載被量到的東西：時間碼、振幅讀值、刻度標籤、計數、通道號、`wdth` 蝕刻標籤、頁腳 repo 路徑、面板擁有者短標。它不當正文、不當裝飾性強調。數值一律 `tabular-nums` + `'tnum' 1` 對位。

**The Axis-Name-In-Caption Rule（軸名入圖說律）.** 圖表的刻度槽只畫**刻度值**（振幅 `+1 / +0.5 / 0 / −0.5 / −1`、時間秒數），不排**軸名**。振幅軸名與時間軸名都在圖說裡（如「橫軸時間（秒），縱軸正規化振幅」／「Time in seconds across, normalised amplitude up.」）——因為軸名排在刻度槽裡會在某些寬度與語言下和端點刻度標籤相撞。軸名也併進 SVG 的 `aria-label`（`${alt}（${ampAxisLabel} / ${timeAxisLabel}）`）給螢幕閱讀器，但視覺上不出現在槽裡。

**The One-Font-Two-Scripts Rule（一字兩文律）.** 中英文共用同一條 `--font-sans` 堆疊，Archivo 打拉丁、Noto Sans TC 接中文。英文版顯示名固定為 BEDO；不得為中文名自行拼寫羅馬拼音。

## Layout

頁面是一台記錄儀的縱向輸出，以 `.page`（`max-width: 1320px`、`padding-inline: var(--gutter)`、`--gutter: clamp(1.25rem, 4vw, 3.5rem)`）置中。

主紙帶區（`.masthead`）用 CSS Grid 把波形圖與角貼照片並排（寬螢幕左欄波形 `minmax(0,1fr)`、右欄照片 `clamp(200px, 23vw, 330px)`）。身分欄位列排在波形**下方**（圖在前、圖說在後，這是記錄紙的讀法）。導語與主要動作跨滿寬。

波形圖本身是一個三列的 grid（`grid-template-columns: 3.25rem 1fr`）：左欄是振幅刻度槽，右欄依序是繪圖區（`aspect-ratio: 1200 / 300`）、音標標記層（`.wave__tier`）、時間刻度尺（`.wave__axis--time`）。圖說與讀值 `<output>` 另起一列，左內縮對齊繪圖區。

間距走一條固定的節拍尺（rem）：`--space-1` 0.25 / `--space-2` 0.5 / `--space-3` 0.75 / `--space-4` 1 / `--space-5` 1.5 / `--space-6` 2 / `--space-7` 3 / `--space-8` 4 / `--space-9` 6。

響應式斷點在 `60rem`（照片與身分欄位重排成記錄表頭、波形跨滿寬）與 `46rem`（波形繪圖區長高 `aspect-ratio: 1200 / 520`、振幅刻度槽縮到 `2.5rem`、`--plot-pad` 降到 `6px`、中間 `±0.5` 刻度收起 `[data-half='true'] { display: none }` 只留 `±1` 與零線、圖說取消左內縮）。

**背景色掛 `html` 不掛 `body`**：若 `body` 的分層背景傳播到根畫布，`scroll` 與 `fixed` 兩種 `background-attachment` 混用時，滿版方格會只畫到第一個視窗高度就斷掉。所以 `html { background-color: var(--paper) }` 承擔底色，`body` 才疊上方格與環境光漸層。

**溢出手法**：進行中的工作紙帶用 `margin-right: calc(50% - 50vw)` 把墨線拉到視窗右緣衝出，由 `html` 與 `body` 的 `overflow-x: clip` 裁掉而不產生橫向捲軸（`clip` 不建立捲動容器，所以 sticky 面板不受影響）。`html` 的 `scroll-padding-top: calc(var(--space-7) + 2.75rem)` 預留了黏性面板列的高度。

**繪圖區 inset（`--plot-pad`）對位**：繪圖區有 `padding: var(--plot-pad)`（桌機 10px、窄螢幕 6px），音標 tier 與時間刻度尺則用 `padding-inline: calc(var(--plot-pad) + var(--hairline))` 鏡像這個 inset 加上 1px 邊框。原因：百分比定位的刻度與音標是對齊到內層 `.wave__row` / `.wave__canvas`（未加 padding 的內框）解析，而不是加了 padding 的外框；tier 與尺必須補上相同 inset，刻度位置才會與繪圖區內的墨線精準對齊。

## Elevation & Depth

這個系統**幾乎是平的**：深度不是裝飾，而是「紙疊在紙上」的物理。只有兩個授權的陰影 token，都是**帶 y 位移的柔和投影**，不用零位移光暈。其餘所有層次由四層套印、結構細線與面板凹槽的 inset 高光承擔。

### Shadow Vocabulary
- **照片投影**（`--shadow-photo`: `0 12px 26px -10px rgba(26, 23, 19, 0.5), 0 2px 5px -2px rgba(26, 23, 19, 0.36)`）：角貼照片浮在紙面上的那一點抬起。
- **面板凹槽**（`--shadow-panel`: `0 1px 0 0 rgba(215, 210, 199, 0.5) inset, 0 6px 16px -12px rgba(26, 23, 19, 0.5)`）：繪圖區、聯絡面板、往下跳的動作按鈕、黏性面板列的凹入感（頂部一道亮紙 inset 高光 + 底部一道極淡落影）。

### Named Rules

**The Paper-On-Paper Rule（紙疊紙律）.** 抬起只用於真的疊在紙面上的物件（照片、面板、按鈕、繪圖區），且一律用帶 y 位移的柔影，不用 `0 0` 光暈。表面在靜止時是平的；陰影是物理，不是強調。

## Shapes

**直角世界。** 唯一的圓角 token 是 `rounded.none: 0`——沒有任何圓角。所有邊框、面板、刻度槽、繪圖區都是直角，呼應記錄紙與機器面板的切邊。

form 語言由幾種幾何構成：
- **細線（`--hairline` 1px）**：所有分隔、邊框、刻度短痕、墨線的基本筆畫。
- **印刷方格**：整頁背景的 ECG 記錄紙，見 Elevation 下方的材質清單。
- **切角三角**：照片角貼用 `clip-path: polygon(...)` 切出三角紙角，照片本身 `rotate: -0.7deg` 刻意貼歪。
- **圓點材質**：走紙齒孔、面板螺絲、撕線打孔都是 `radial-gradient` 的小圓點，但它們是紙與機箱的物理，不是裝飾性圓角。
- **程序生成的波形幾何**：見 Components 的 Waveform 與 WorkBand——由 `src/lib/waveform.ts`、`src/lib/worktrace.ts`（搭配 `src/lib/utterance.ts` 的音韻模型）與 `src/lib/random.ts` 的確定性亂數產生，不是手畫路徑。

## Components

### 導覽 · 語言刻度（PanelBar）
黏性機器面板列（`position: sticky; top: 0`，底 `color-mix(in oklab, var(--paper-high) 88%, var(--paper))`，`backdrop-filter: saturate(118%) blur(3px)`，下緣 `--rule-strong` 結構細線 ＋ 一道 `--grid-strong` 的**印刷索引刻度**（`repeating-linear-gradient`，11px 一格、3px 高、貼底排）。左端是擁有者名（Martian Mono、`font-stretch: 86%`、`letter-spacing: 0.18em`、全大寫）。右端是語言刻度：兩個刻度位置排在一個 `--rule-strong` 細框、`--paper-edge` 凹槽裡，中間以細線分隔。
- **當前刻度**（`[data-active='true']`）：底色 `--paper-high`，底部一道 `--grease` 蠟筆痕（`height: 2px`，`inset-inline: 0.45rem`，`bottom: 0.18rem`）標記——不是填色塊，是畫上去的痕。
- **Hover**：色升到 `--ink-strong`，底加一層 `--paper-high` 混色。

### 主要動作 · 往下跳（Jump）
`.jump` 是唯一的主要動作，長得像面板上的一個按鍵：底 `--paper-high` 混色、`--hairline` 的 `--ink` 邊框、`--shadow-panel`，直角。箭頭 SVG 以 `--grease` 描邊（`fill: none`，`stroke-width: 1.6`）。計數分隔線用 `--rule-strong`。
- **Hover**：底色升到 `--paper-high`、落影加深、箭頭 `translateY(2px)`（像被按下）。過場用 `--ease-burn`，150–220ms。

### 聯絡面板（ContactPanel）
`.plate`：`--paper-high` 混色底、`--rule-strong` 細框、`--shadow-panel`、直角，`padding: 2rem 1.5rem 1.5rem`。固定槽位的 grid（`repeat(auto-fit, minmax(13rem, 1fr))`），每格一個 `.engraved` 蝕刻標籤 + 一個值，值本身就是連結（`overflow-wrap: anywhere`）。
- **面板螺絲**：`::before` 用四個 `radial-gradient` 在面板四角畫 `--paper-deep` 的小圓點螺絲（機器面板用螺絲固定在機箱上）。

### 角貼照片（PastedPhoto · 簽名元件）
照片用四個切角三角「貼」在 `--paper-high` 底板上，底板 `rotate: -0.7deg`（角貼永遠貼不正），`--shadow-photo` 抬起。角貼三角色用 `color-mix(in oklab, var(--paper-deep) 82%, var(--trace-2))`。照片本身 `filter: saturate(0.82) contrast(1.04)`——記錄紙旁的照片不會比紙更鮮豔。
- **330px 顯示上限（硬規則）**：容器 `max-width: 330px`，`<Image widths={[195,260,330,390]}>`。原圖僅 778px 寬，**不得插值放大**超過約 390px CSS 寬；需要更大版面必須向使用者索取更高解析度原檔。

### 波形圖（Waveform · 主紙帶／簽名元件）
整頁的主紙帶，四層套印的完整示範。繪圖區是多筆道記錄儀主通道的鈷藍墨線：由 `src/lib/utterance.ts` 的音韻模型（音段時界、IPA、聲調 f0 軌、共振峰軌跡、噪音頻帶）經 `buildWaveform()` 合成一條時域訊號，正規化到峰值 1，再按欄取每欄 min/max，每欄畫一條 1px、`vector-effect: non-scaling-stroke` 的直線。畫布為 `1200×300` 使用者單位；`preserveAspectRatio="none"`。所有文字標籤走 HTML 絕對定位（不放進 SVG），確保可選取、可朗讀、字級受控。
- **四層對應**：繪圖區底是紙；`.wave__grid`（橙紅虛線振幅格線，`stroke: var(--grid)`、`stroke-dasharray: 2 7`）是網格；`.wave__trace`（每欄一線，`stroke: var(--pen-1)` 鈷藍）＋ `.wave__zero`（零線，`--grid-strong`）是墨線；`.wave__boundaries`（音段邊界，`--ink`，`opacity: 0.55`，`data-onset='false'` 的末端收束線加粗到 2px、`opacity: 0.85`）＋ 音標 tier 是標記墨。
- **幾何是示意，非真實錄音**：波形由音韻參數程序生成，**非真實錄音的分析**；兩版圖說都標「非實際錄音分析／not an analysis of a real recording」（PRODUCT.md 禁造清單）。
- **刻度槽只放值，軸名在圖說**：振幅槽讀 `+1 / +0.5 / 0 / −0.5 / −1`，時間尺讀秒數；軸名不排進槽裡（見 Axis-Name-In-Caption Rule）。
- **讀值**走 `<output for>`：scrub 時 `.wave__value` 讀出時間、該音段峰值振幅、IPA；瀏覽器自動朗讀。鍵盤路徑（方向鍵／Home／End，Shift 加大步距）等價於滑鼠 scrub。
- **入場**：筆（`.wave__pen`，1px `--grease`）由左至右走過一次（`@keyframes pen-sweep`，歷時 `--clock`），每欄墨線以依序遞增的 `--col`（0..0.86）延遲落下（`@keyframes ink-settle`，`calc(var(--clock) * 0.5)`）。由 `IntersectionObserver`（threshold 0.2）進場觸發一次；`prefers-reduced-motion` 下直接顯示。
- **簽名互動**：指標掃過時 `.wave__playhead`（1px `--grease` ＋ 一枚三角刻痕 `clip-path: polygon(0 0, 100% 0, 50% 100%)`）跟隨。

### 工作紙帶（WorkBand · 簽名元件）
一條工作等於一條墨線包絡紙帶，由 `buildWorkTrace()` 生成（`1200×120`，三組低頻擺動＋抖動組成包絡，鏡像於中軸）。這條紙帶**沒有頻率軸、沒有數值讀取**——它是材質不是量測，刻意沒有單位、沒有刻度。文字欄位全在固定槽位、以 `.engraved` 標籤標示、排在紙帶**下方**；第一個欄位就是**通道**（`CH{pen}` ＋ 一條該通道筆色的色條 `.band__swatch`）。
- **確定性**：種子用條目 `id`（經 `random.ts`），同一條目永遠得到同一條墨線。
- **顏色是通道**：`style="--pen:var(--pen-{entry.pen})"`，`.band__lines line` 的 `stroke: var(--pen, var(--trace-4))`。顏色不隨狀態改變。
- **狀態靠墨線，不靠徽章**：`data-status="active"` 墨濃（`--trace-opacity` 高）、振幅不收、`margin-right: calc(50% - 50vw)` 衝出右緣；`data-status="closed"` 筆色往紙面退一階（`color-mix(... var(--pen) 82%, var(--paper))`）、值用 `--ink-soft`、以 `terminal` 雙線（兩條 `--ink` 1.5px）收束。
- **走紙齒孔**：`.band__trace::before/::after` 沿紙帶上下緣排連續的 `radial-gradient` 圓點齒孔（30px 一格、10px 高），這是連續走紙的物理。
- **入場**：SVG `opacity` 由 0.22 過渡到 `--trace-opacity`，與主紙帶共用 `--clock`／`--ease-burn`，`[data-burned='true']` 進場觸發一次。
- **簽名互動**：指標掃過時一道 `--grease` 蠟筆刻痕 `.band__mark` 跟隨（`opacity: 0.92`，不是變色）。

### 閱讀層軌（ReadingTier）
一條像未標註 TextGrid 的層軌，上下緣各畫 24 條 `--grid-strong` 短刻痕。**空狀態是世界自己的空狀態**：零條目時刻度照畫、中間一道虛線基線、計數欄誠實讀 0（0 是讀數不是失敗）。有條目後同一層軌長出條目列（條目間以 `--rule` 分隔）。

### 區段撕線（section tear）
區段之間不是一條黑色實線，而是**連續記錄紙的撕線**：`.section::before` 疊一道 `--ink` 的虛線（`repeating-linear-gradient`，9px 線 9px 空）＋ 一排 `--paper-deep` 的 `radial-gradient` 打孔，橫跨到 gutter 外。撕線用的是中性墨，不是橙紅格線。

### 網站圖示（favicon · `public/favicon.svg`）
與主紙帶同一語言的縮影：`#cfc8b8` 紙面、兩道 `#cf8a6e` 橙紅細格線、一道 `#b4573c` 零線、十二條 `#16357e` 鈷藍的垂直墨線（`shape-rendering="crispEdges"`，`stroke-width: 1.7`）鏡像於零線——與主通道同色、同語言的波形片段。

## Do's and Don'ts

### Do:
- **Do** 遵守四層套印順序（紙 → 網格 → 墨線 → 標記墨），任何新元素都歸入這四層之一；整頁方格、紙纖維、齒孔、撕線孔都屬於第一、二層。
- **Do** 分清兩套線：橙紅 `--grid` / `--grid-strong` 只畫印刷圖表格與整頁方格；中性 `--rule` / `--rule-strong` 畫版面結構分隔。
- **Do** 把波形畫成精準的線：每欄一條 1px、`vector-effect: non-scaling-stroke`、無濾鏡無漸層，鏡像於零線。
- **Do** 用 `--pen-1/2/3` 編碼通道，每條工作條目帶 `pen` 欄位，相鄰條目輪不同號；色條 `.band__swatch` 與通道同色。
- **Do** 用墨色濃度（`--trace-opacity`）、振幅與收尾與否表達狀態：進行中濃、振幅不收、衝出右緣；已完成筆色退一階、雙線收束。
- **Do** 讓 `--grease` (`#d4452f`) 只以畫出的筆痕出現（線、描邊、底線、刻痕、播放頭、選取混色），永不填色、永不排字。
- **Do** 讓整頁方格「低語」：`--grid-fine` = `color-mix(... var(--grid) 11%, transparent)`、`--grid-heavy` = `color-mix(... var(--grid-strong) 16%, transparent)`，細格 `--grid-fine-step: 8px`、粗格 `--grid-heavy-step: 40px`；強度已刻意調弱兩次，因為太強的格會讀成瑕疵而不是紙。
- **Do** 把背景色掛在 `html` 上（不要掛 `body`），否則滿版方格在 scroll/fixed 混用下會被裁到第一屏高度就斷掉。
- **Do** 把紙纖維做成 `body::before` 上的內嵌 SVG `feTurbulence` data URI（`mix-blend-mode: multiply`、`opacity: var(--grain)` = 0.17），並在 `prefers-reduced-transparency: reduce` 下停用；它屬於第一層紙，不是第五層。
- **Do** 讓圖表刻度槽只放刻度值（`+1 / +0.5 / 0 / −0.5 / −1`、秒數），把軸名放進圖說與 `aria-label`。
- **Do** 讓繪圖區 inset（`--plot-pad`）與音標 tier、時間尺的 `padding-inline: calc(var(--plot-pad) + var(--hairline))` 一致，刻度才對齊內層 row 而非 padding 外框。
- **Do** 把等寬 Martian Mono 留給被量到的數（時間、振幅、刻度、計數、通道號），並開 `tabular-nums` + `'tnum' 1`。
- **Do** 所有入場動態共用單一時鐘 `--clock: 1150ms` + `--ease-burn: cubic-bezier(0.16, 1, 0.3, 1)`；授權的動態是筆由左至右走過、墨線依序落下（`pen-sweep` + `ink-settle`），加 scrub 時的 `--grease` 播放頭。
- **Do** 保留瀏覽器表面的世界化：`::selection` 用 `--grease` 26% 混色、`caret-color: --grease`、`scrollbar-color: --grid-strong --paper-edge`（thumb hover 轉 `--pen-2`）、`:focus-visible` 用 `2px --ink-strong` + `outline-offset: 3px`、連結 `text-underline-offset: 0.22em`、hover 底線轉 `--grease`。
- **Do** 自架 Archivo（`wght 100–900` + `wdth 62–125`）、Martian Mono（`wght 100–800` + `wdth 75–112.5`）、Noto Sans TC（`wght 100–900`），全部 `font-display: swap`、依 unicode-range 分片。
- **Do** 把程序合成的波形圖說標註為示意（非實際錄音分析）。

### Don't:
- **Don't** 加入第五層或任何漂浮於四層套印之上的視覺平面。
- **Don't** 把中性結構細線漆成橙紅（會讓頁面讀成發票），也不要把橙紅印刷格線拿去當版面分隔。
- **Don't** 讓墨線模糊、加濾鏡、加漸層，或讓它隨縮放變粗（不得退回舊的感熱燒痕灰階密度場）。
- **Don't** 用顏色表達狀態——顏色只分通道；狀態是墨色濃度、振幅與收尾的事。
- **Don't** 用 `--grease` 做填色塊、背景、色點，或拿它排任何文字。
- **Don't** 在標題上方放 eyebrow／kicker／小標。
- **Don't** 用徽章或 pill 表達狀態。
- **Don't** 把軸名排進刻度槽（會與端點刻度標籤相撞）；軸名只在圖說。
- **Don't** 給任何東西加圓角（唯一 token 是 `rounded.none: 0`）。
- **Don't** 用零位移光暈當陰影（要帶 y 位移的柔影）。
- **Don't** 把整頁方格調強到變成明顯的格線——它必須只在近看時才讀得出來。
- **Don't** 讓各元件散出各自獨立的入場 hover 動畫，破壞單一時鐘。
- **Don't** 把大頭照插值放大超過約 390px CSS 寬（原圖僅 778px）。
- **Don't** 為中文名自行拼寫英文羅馬拼音；英文版顯示名固定 BEDO。
