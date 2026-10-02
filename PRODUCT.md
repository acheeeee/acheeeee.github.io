# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

主要訪客是**同行**：NLP / 語音領域的研究者、研究所同儕、實驗室與業界的工程師。

次要訪客是**想確認「這個人在做什麼」的人**——看到名字之後想知道背景、經歷與聯絡方式的對象（例如實習或合作的接洽者）。

進站來源（已確認三種）：

- 履歷上的連結
- GitHub profile 的個人網站欄位
- 他人轉發的連結

訪客的任務很一致：在短時間內確認「這個人在做什麼研究、到什麼程度、怎麼聯絡」。

## Product Purpose

李嘉峻（綽號「比都」／BEDO）的個人網站。台科大（NTUST）資工所碩一，研究領域為 NLP 中的 ASR（自動語音辨識）。

這個站要讓同行看見他在做什麼、經歷到哪裡、以及如何聯絡他。首頁是單頁入口，同時承載自我介紹、進行中的工作、經歷與聯絡方式；成功的定義是訪客不必離站或另外搜尋，就能回答「他在做什麼」並拿到聯絡方式。

## Positioning

這不是成果展示櫃，而是**公開進行中的研究軌跡**。站上要出現的內容是進行中的論文重現、讀過的論文筆記、side projects——也就是過程本身，而不是一份完成品清單。對一個碩一研究者來說，正在讀什麼、正在重現什麼，比獎項列表更能讓同行判斷他的方向與程度。

## Operating Context

- 訪客幾乎都是「先看到名字，再來驗證這個人」的情境，不是主動搜尋進站。
- 站的所屬網域為 GitHub Pages 使用者站 `acheeeee.github.io`，推上 `main` 後由 GitHub Actions（`withastro/action@v4`）自動建置部署。
- 內容會隨學期與研究進度持續累積；結構必須能在不重做的前提下長出新區塊。

## Capabilities and Constraints

**技術**（由既有程式碼決定，非本次新選）

- Astro 7 靜態站，Node >= 22.12。
- 純靜態輸出，部署在 GitHub Pages：沒有後端、沒有資料庫、沒有表單接收端。對外互動只能靠 `mailto:` 與外部連結。

**內容結構**

- 首頁：單頁入口，包含自我介紹、進行中的工作、經歷、聯絡方式。
- 已確認後續會長出的區塊／路由：關於我、我做的研究、讀過的論文（筆記）、side projects。
- 中英**雙語**是硬需求。雙語的實作方式（i18n 路由分流，或單頁並呈）**尚未決定**。

**聯絡方式（範圍已確認，僅這四項）**

- Email：`ach3r204@gmail.com`（確認直接公開露出）
- GitHub：`https://github.com/acheeeee`
- LinkedIn：`https://www.linkedin.com/in/bedo-lee-858726404`
- Instagram：`https://www.instagram.com/be_do_in_gatao/`

**明確未定**

- 即時系統的正式名稱與範圍。
- 「讀過的論文」要公開到什麼程度（條目清單／完整筆記）。

**已確認不做**

- 不提供可下載的履歷 PDF。

## Brand Commitments

- 本名：李嘉峻。對外慣用綽號：比都 / BEDO。
- 網域：`acheeeee.github.io`（GitHub 帳號 `acheeeee`）。
- 沒有 logo、沒有既定品牌色或字體規範。
- 現有 favicon 仍是 Astro 預設圖示，屬於待替換的佔位資產，不是品牌承諾。

## Evidence on Hand

**進行中**

- COALA 論文重現。使用者確認是台師大這篇（**不是** Favory 等人 2020 的同名音訊表徵論文）：
  Jhih-Rong Guo, Bi-Cheng Yan, Tien-Hong Lo, Berlin Chen（National Taiwan Normal University），
  *COALA: Robust Contextualized Speech-augmented Language Modeling for ASR via Contrastive Regularizer and Biasing Score Estimation*，
  arXiv:2607.08117 — ASR contextual biasing。
- 一個即時系統（開發中；正式名稱與範圍未定）。

**已完成**

- 參加過一次黑客松，**未獲獎**。這點必須照實呈現，不得用模糊措辭讓它讀起來像得獎或入圍。

**資產**

- 個人大頭照：`src/assets/bedo-portrait.jpeg`。778 × 1052（約 3:4 直幅），218 KB，無 EXIF 旋轉。正式商務風格：西裝領帶、淺色辦公空間淺景深背景、正面齊肩構圖，臉部位於畫面中上段。
  放在 `src/assets/` 而非 `public/`，以便由 Astro 的 `astro:assets` 做格式轉換與 srcset；引用時一律經過 `<Image />`。
  **解析度限制**：原圖僅 778px 寬，在 2x 螢幕上最多只能撐到約 390px 的 CSS 寬度。適合肖像卡或中等尺寸區塊，不足以做滿版 hero；若未來版面需要更大，必須向使用者索取更高解析度原檔，不得放大插值。

**目前沒有，未來工作不得編造**

- 已發表論文、引用數、模型或系統的效能數字
- 客戶、合作單位、推薦語、案例研究
- 獎項、媒體報導、演講紀錄
- 任何流量或使用者規模數據

## Product Principles

1. **誠實呈現階段。** 碩一、剛起步、黑客松沒得獎——都照實寫。進行中的工作不得被包裝成已完成的成果。
2. **「在做什麼」優先於「我是誰」。** 訪客是同行，最想要的是研究方向與進行中的工作，自我介紹服務於它。
3. **聯絡方式隨手可得。** 任何位置的訪客都能在不離站、不另外搜尋的情況下拿到聯絡方式。
4. **雙語對等。** 中英兩邊都要是完整內容，不能有一邊是殘缺的翻譯。
5. **可持續增長。** 結構要能持續加進研究、論文筆記、side projects，而不需要重做。

## Accessibility & Inclusion

雙語站必須正確標記語言：`lang` 屬性要隨實際內容語言切換，讓螢幕閱讀器用正確的語音引擎朗讀中英文段落。除此之外沒有建立其他特定標準。
