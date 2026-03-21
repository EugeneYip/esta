import React, { useMemo, useState } from "react";

const theme = {
  bg: "#FCFAF2",
  card: "#FFFDF9",
  cardAlt: "#FFFBF5",
  line: "#D9CFC1",
  lineStrong: "#C5B4A1",
  ink: "#2D2A27",
  muted: "#665E57",
  soft: "#8A7E73",
  deep: "#6B493C",
  accent: "#9F6C4B",
  brownSoft: "#F3E8DE",
  green: "#5C6B42",
  greenSoft: "#EEF2E6",
  red: "#A95A4D",
  redSoft: "#F9ECE8",
  amber: "#9A7332",
  amberSoft: "#F7EFE2",
  blue: "#5D7487",
  blueSoft: "#EDF3F7",
  plum: "#6B5B6E",
  plumSoft: "#F1ECF3",
  white: "#FFFFFF",
};

const iconPaths = {
  settings: [
    { type: "path", props: { d: "M12 3.2l1.2 2.5 2.8.5-.8 2.5 2 2-2 2 .8 2.5-2.8.5L12 18.8l-1.2-2.6-2.8-.4.8-2.5-2-2 2-2-.8-2.5 2.8-.5L12 3.2z" } },
    { type: "circle", props: { cx: 12, cy: 11, r: 2.8 } },
  ],
  passport: [
    { type: "rect", props: { x: 5, y: 3.5, width: 14, height: 17, rx: 2.2 } },
    { type: "path", props: { d: "M9 8.5h6" } },
    { type: "circle", props: { cx: 12, cy: 13, r: 2.5 } },
    { type: "path", props: { d: "M9.6 13h4.8M12 10.5v5" } },
  ],
  plane: [
    { type: "path", props: { d: "M3 13.8l7-1.9 7.8 5V14l-5.2-3 5.4-1.3V7.1l-7.1 2.3L7 5.9 5.6 6.4l2.1 4.1-4.7 1.4z" } },
  ],
  shield: [
    { type: "path", props: { d: "M12 3l7 2.9v5.7c0 4.3-2.8 7.8-7 9.4-4.2-1.6-7-5.1-7-9.4V5.9L12 3z" } },
    { type: "path", props: { d: "M9.2 11.2l1.8 1.9 3.9-4.3" } },
  ],
  alert: [
    { type: "path", props: { d: "M12 4.2l8 13.8H4L12 4.2z" } },
    { type: "path", props: { d: "M12 9v4.8" } },
    { type: "circle", props: { cx: 12, cy: 16.3, r: 0.7, fill: "currentColor", stroke: "none" } },
  ],
  clock: [
    { type: "circle", props: { cx: 12, cy: 12, r: 8.5 } },
    { type: "path", props: { d: "M12 7.6v5l3.5 2" } },
  ],
  calendar: [
    { type: "rect", props: { x: 4.5, y: 5.5, width: 15, height: 14, rx: 2 } },
    { type: "path", props: { d: "M8 3.8v3.5M16 3.8v3.5M4.5 9.6h15" } },
  ],
  wallet: [
    { type: "rect", props: { x: 3.5, y: 6, width: 17, height: 12, rx: 2.1 } },
    { type: "path", props: { d: "M15 10.2h4.5v3.6H15a1.8 1.8 0 010-3.6z" } },
    { type: "circle", props: { cx: 16.8, cy: 12, r: 0.5, fill: "currentColor", stroke: "none" } },
  ],
  file: [
    { type: "path", props: { d: "M7 3.5h7l4 4v13H7z" } },
    { type: "path", props: { d: "M14 3.5v4h4" } },
    { type: "path", props: { d: "M9 12.2h6M9 15.4h6" } },
  ],
  link: [
    { type: "path", props: { d: "M10 14l4-4" } },
    { type: "path", props: { d: "M8 16H6.8A3.8 3.8 0 013 12.2 3.8 3.8 0 016.8 8H8" } },
    { type: "path", props: { d: "M16 8h1.2A3.8 3.8 0 0121 11.8 3.8 3.8 0 0117.2 16H16" } },
  ],
  search: [
    { type: "circle", props: { cx: 10.5, cy: 10.5, r: 5.5 } },
    { type: "path", props: { d: "M15 15l5 5" } },
  ],
  check: [{ type: "path", props: { d: "M5.5 12.2l4 4.2 9-9.4" } }],
  close: [
    { type: "path", props: { d: "M6 6l12 12" } },
    { type: "path", props: { d: "M18 6L6 18" } },
  ],
  refresh: [
    { type: "path", props: { d: "M18.5 9A7.5 7.5 0 006 7.2" } },
    { type: "path", props: { d: "M6.2 3.8v3.8H10" } },
    { type: "path", props: { d: "M5.5 15A7.5 7.5 0 0018 16.8" } },
    { type: "path", props: { d: "M17.8 20.2v-3.8H14" } },
  ],
  users: [
    { type: "circle", props: { cx: 9, cy: 9, r: 2.5 } },
    { type: "circle", props: { cx: 16, cy: 10, r: 2 } },
    { type: "path", props: { d: "M4.5 18a4.5 4.5 0 019 0" } },
    { type: "path", props: { d: "M13.5 18a3.6 3.6 0 013.6-3.2A3.4 3.4 0 0120 18" } },
  ],
  phone: [
    { type: "path", props: { d: "M7.2 4.5h2.2l1 3.7-1.7 1.7a15.1 15.1 0 006.9 6.9l1.7-1.7 3.7 1v2.2a1.7 1.7 0 01-1.8 1.7c-8.4-.5-15-7.2-15.5-15.5A1.7 1.7 0 017.2 4.5z" } },
  ],
  home: [
    { type: "path", props: { d: "M4.5 10.5L12 4l7.5 6.5" } },
    { type: "path", props: { d: "M6.5 9.7V19h11V9.7" } },
  ],
  id: [
    { type: "rect", props: { x: 3.5, y: 5, width: 17, height: 14, rx: 2 } },
    { type: "circle", props: { cx: 8, cy: 12, r: 2.2 } },
    { type: "path", props: { d: "M12.5 10h5M12.5 13h5M6 16h4" } },
  ],
  bag: [
    { type: "path", props: { d: "M7 9V7.5A3.5 3.5 0 0110.5 4h3A3.5 3.5 0 0117 7.5V9" } },
    { type: "rect", props: { x: 5, y: 9, width: 14, height: 10.5, rx: 2 } },
  ],
  camera: [
    { type: "path", props: { d: "M5.5 8h3l1.3-2h4.4l1.3 2h3A1.5 1.5 0 0120 9.5v7A1.5 1.5 0 0118.5 18h-13A1.5 1.5 0 014 16.5v-7A1.5 1.5 0 015.5 8z" } },
    { type: "circle", props: { cx: 12, cy: 13, r: 3.2 } },
  ],
  sparkle: [
    { type: "path", props: { d: "M12 3.5l1.4 4.1L17.5 9l-4.1 1.4L12 14.5l-1.4-4.1L6.5 9l4.1-1.4L12 3.5z" } },
    { type: "path", props: { d: "M18 14.5l.7 2.1 2.1.7-2.1.7-.7 2.1-.7-2.1-2.1-.7 2.1-.7.7-2.1zM6 14.5l.7 2.1 2.1.7-2.1.7-.7 2.1-.7-2.1-2.1-.7 2.1-.7.7-2.1z" } },
  ],
  arrowDown: [{ type: "path", props: { d: "M7 10l5 5 5-5" } }],
  arrowRight: [{ type: "path", props: { d: "M8 6l8 6-8 6" } }],
  app: [
    { type: "rect", props: { x: 6, y: 3.5, width: 12, height: 17, rx: 2.2 } },
    { type: "path", props: { d: "M10 6.8h4M11.2 17.2h1.6" } },
  ],
  globe: [
    { type: "circle", props: { cx: 12, cy: 12, r: 8.5 } },
    { type: "path", props: { d: "M3.8 12h16.4M12 3.5c2.2 2.4 3.5 5.4 3.5 8.5S14.2 18.1 12 20.5M12 3.5C9.8 5.9 8.5 8.9 8.5 12S9.8 18.1 12 20.5" } },
  ],
};

const sections = [
  { id: "start", zh: "快速判斷", en: "Start Here" },
  { id: "eligible", zh: "資格與限制", en: "Eligibility" },
  { id: "prepare", zh: "申請前準備", en: "Prepare" },
  { id: "flow", zh: "流程圖", en: "Flow" },
  { id: "fields", zh: "逐欄重點", en: "Fields" },
  { id: "status", zh: "結果與後續", en: "Status" },
  { id: "update", zh: "更新或重辦", en: "Update" },
  { id: "mistakes", zh: "常見錯誤", en: "Mistakes" },
  { id: "faq", zh: "問答", en: "FAQ" },
  { id: "links", zh: "官方連結", en: "Links" },
];

const facts = [
  {
    icon: "wallet",
    tone: "amber",
    zhLabel: "官方費用",
    zhValue: "US$40",
    enLabel: "Official fee",
    enValue: "US$40",
  },
  {
    icon: "clock",
    tone: "default",
    zhLabel: "平均填寫時間",
    zhValue: "約 23 分鐘",
    enLabel: "Average filing time",
    enValue: "About 23 minutes",
  },
  {
    icon: "calendar",
    tone: "default",
    zhLabel: "建議申請時點",
    zhValue: "訂旅程時就申請，最晚不晚於登機前 72 小時",
    enLabel: "When to apply",
    enValue: "Apply when you book the trip, and no later than 72 hours before boarding",
  },
  {
    icon: "shield",
    tone: "green",
    zhLabel: "有效期",
    zhValue: "通常 2 年，或到護照到期為止，以較早者為準",
    enLabel: "Validity",
    enValue: "Usually 2 years, or until passport expiry, whichever comes first",
  },
];

const routeCards = [
  {
    tone: "green",
    icon: "plane",
    zhTitle: "可走 ESTA",
    enTitle: "Use ESTA",
    zh: "觀光、商務、過境，搭符合規定的航空公司或船公司，單次停留不超過 90 天。",
    en: "Tourism, business, or transit, on an eligible carrier, with each stay capped at 90 days.",
  },
  {
    tone: "red",
    icon: "bag",
    zhTitle: "改走簽證",
    enTitle: "Use a visa",
    zh: "工作、正式學分課、永久居留、超過 90 天停留，或私人飛機等非標準承運方式。",
    en: "Work, for-credit study, permanent residence, stays above 90 days, or non-standard travel such as a private aircraft.",
  },
  {
    tone: "amber",
    icon: "alert",
    zhTitle: "先停下重看資格",
    enTitle: "Stop and re-check",
    zh: "若有古巴停留史、特定國家旅行史、特定雙重國籍、近期拒簽或拒絕紀錄，不要直接硬送。",
    en: "Do not file blindly if you have Cuba presence, restricted travel history, restricted dual nationality, or a recent refusal history.",
  },
];

const allowedUseItems = [
  { tone: "green", zh: "觀光、探親、短期休閒行程", en: "Tourism, visiting friends or relatives, short leisure travel" },
  { tone: "green", zh: "商務會議、展會、洽談、短期訓練", en: "Business meetings, trade shows, contract talks, short training" },
  { tone: "green", zh: "轉機經過美國", en: "Transit through the United States" },
  { tone: "blue", zh: "短期不計學分的休閒課程，例如旅遊中的兩日料理課", en: "Short non-credit recreational study, such as a two-day cooking class on a trip" },
  { tone: "blue", zh: "就醫", en: "Medical treatment" },
];

const restrictedItems = [
  {
    tone: "red",
    zh: "2011 年 3 月 1 日後，曾前往或停留伊朗、伊拉克、北韓、利比亞、索馬利亞、蘇丹、敘利亞、葉門。",
    en: "You traveled to or were present in Iran, Iraq, North Korea, Libya, Somalia, Sudan, Syria, or Yemen on or after March 1, 2011.",
  },
  {
    tone: "red",
    zh: "2021 年 1 月 12 日後，曾前往或停留古巴。",
    en: "You traveled to or were present in Cuba on or after January 12, 2021.",
  },
  {
    tone: "red",
    zh: "同時具有古巴、北韓、伊朗、伊拉克、蘇丹、敘利亞國籍。",
    en: "You are also a national of Cuba, North Korea, Iran, Iraq, Sudan, or Syria.",
  },
  {
    tone: "amber",
    zh: "上述限制有少數外交或軍事任務例外，但一般旅客不要自行假設自己符合例外。",
    en: "There are narrow diplomatic or military exceptions, but ordinary travelers should not assume they qualify.",
  },
];

const decisionSteps = [
  {
    icon: "passport",
    zh: "你持有的是中華民國電子護照嗎",
    en: "Do you hold an ROC e-passport",
    yesZh: "繼續",
    yesEn: "Continue",
    noZh: "先重看護照與簽證規則",
    noEn: "Re-check passport and visa rules first",
  },
  {
    icon: "plane",
    zh: "目的主要是觀光、商務或過境嗎",
    en: "Is your purpose mainly tourism, business, or transit",
    yesZh: "繼續",
    yesEn: "Continue",
    noZh: "多半不是 ESTA",
    noEn: "Usually not an ESTA case",
  },
  {
    icon: "clock",
    zh: "單次停留會在 90 天內嗎",
    en: "Will each stay remain within 90 days",
    yesZh: "繼續",
    yesEn: "Continue",
    noZh: "改走簽證",
    noEn: "Use the visa route",
  },
  {
    icon: "alert",
    zh: "你沒有古巴停留史、限制國旅行史、限制雙重國籍等問題嗎",
    en: "Do you avoid Cuba presence, restricted travel history, and restricted dual nationality issues",
    yesZh: "通常可申請",
    yesEn: "Usually eligible",
    noZh: "先改做簽證評估",
    noEn: "Move to visa evaluation first",
  },
];

const prepGroups = [
  {
    titleZh: "身份資料",
    titleEn: "Identity data",
    icon: "passport",
    items: [
      { icon: "passport", zh: "中華民國電子護照正本", en: "Your ROC e-passport" },
      { icon: "file", zh: "護照號碼、英文姓名、發照日、到期日", en: "Passport number, English name, issue date, and expiration date" },
      { icon: "id", zh: "國民身分證統一編號", en: "Your National ID number" },
      { icon: "camera", zh: "近期、清楚、正面、未修圖的人像照，以備影像驗證需要", en: "A recent, clear, front-facing, unedited photo in case image verification appears" },
    ],
  },
  {
    titleZh: "聯絡與行程",
    titleEn: "Contact and travel",
    icon: "phone",
    items: [
      { icon: "phone", zh: "可即時收信的 Email 與電話", en: "An email address and phone number you can actually use" },
      { icon: "home", zh: "住家地址的正式英文寫法", en: "A usable English version of your home address" },
      { icon: "users", zh: "緊急聯絡人姓名、電話、Email", en: "Emergency contact name, phone, and email" },
      { icon: "link", zh: "在美聯絡人，或第一晚住宿資訊", en: "A U.S. point of contact, or first-night stay details" },
    ],
  },
  {
    titleZh: "背景資料",
    titleEn: "Background details",
    icon: "file",
    items: [
      { icon: "bag", zh: "雇主資訊，或學校資訊", en: "Employer details, or school details" },
      { icon: "wallet", zh: "付款工具", en: "Your payment method" },
      { icon: "shield", zh: "是否有其他國籍、旅行史、拒簽或拒絕紀錄", en: "Whether you have other nationality, travel history, or refusal history" },
      { icon: "app", zh: "若打算用官方 App，先確認手機可正常操作拍照與掃描", en: "If you plan to use the official app, confirm your phone can handle photo and passport scanning" },
    ],
  },
];

const practicalNotes = [
  {
    tone: "amber",
    icon: "camera",
    zhTitle: "自拍照要怎麼理解",
    enTitle: "How to read the selfie item",
    zh: "目前官方首頁把 Traveler's selfie photo 標成 If Applicable。比較準的理解是，系統可能要求影像驗證，不是每位申請人都保證一定遇到。",
    en: "The official homepage currently labels the traveler's selfie photo as If Applicable. The better reading is that image verification may appear, not that every applicant is guaranteed to see it.",
  },
  {
    tone: "blue",
    icon: "app",
    zhTitle: "官方 App 的定位",
    enTitle: "What the official app currently does",
    zh: "目前官方 App 主要寫明兩件事，新個人申請，以及查既有申請。多人一起辦，網站通常仍較直覺。",
    en: "The official app currently highlights two core functions, new individual filing and existing application lookup. For multiple travelers, the website is still usually clearer.",
  },
  {
    tone: "green",
    icon: "id",
    zhTitle: "臺灣旅客最常漏掉的一格",
    enTitle: "The field Taiwan travelers miss most often",
    zh: "官方 FAQ 仍明確點出，臺灣護照持有人要提供 Passport Number 與 PIN。實務上，PIN 對一般中華民國護照持有人就是國民身分證統一編號。",
    en: "The official FAQ still specifically says Taiwan passport holders must provide both Passport Number and PIN. In practice, for most ROC passport holders, the PIN is the National ID number.",
  },
];

const flowSteps = [
  {
    step: "01",
    icon: "globe",
    zh: "進入官方網站或官方 App",
    en: "Open the official website or official app",
    noteZh: "自己單人申請，網站與 App 都可考慮。多人案件，先看網站。",
    noteEn: "For a solo filing, either the website or the app may work. For multiple travelers, start with the website.",
  },
  {
    step: "02",
    icon: "phone",
    zh: "驗證 Email",
    en: "Verify your email",
    noteZh: "驗證碼沒出現，先查垃圾郵件，再確認信箱填寫無誤。",
    noteEn: "If the code does not appear, check spam first, then confirm the email address was entered correctly.",
  },
  {
    step: "03",
    icon: "passport",
    zh: "掃描護照，處理影像驗證",
    en: "Scan the passport and handle image verification",
    noteZh: "系統自動帶入資料時，不可直接信任 OCR，所有核心欄位都要逐格重查。",
    noteEn: "If the system auto-fills data, do not trust OCR blindly. Re-check every core field one by one.",
  },
  {
    step: "04",
    icon: "id",
    zh: "填 Applicant Information",
    en: "Complete applicant information",
    noteZh: "姓名、護照號碼、生日、國籍、National ID、PIN 都要按證件與官方欄位老實填。",
    noteEn: "Fill name, passport number, date of birth, nationality, National ID, and PIN exactly to the document and live official fields.",
  },
  {
    step: "05",
    icon: "users",
    zh: "填聯絡、父母、工作或學校、緊急聯絡人",
    en: "Add contact, parent, work or school, and emergency details",
    noteZh: "建議先備好正式英文拼法，不要邊想邊亂填。",
    noteEn: "Prepare the formal English spellings before you start. Do not improvise as you go.",
  },
  {
    step: "06",
    icon: "home",
    zh: "填 Travel Information",
    en: "Complete travel information",
    noteZh: "有在美聯絡人或住宿就照實填。純轉機案件再依欄位情境處理。",
    noteEn: "Use the real U.S. contact or lodging if you have one. Handle transit-only cases according to the actual field shown.",
  },
  {
    step: "07",
    icon: "shield",
    zh: "回答 Eligibility Questions",
    en: "Answer the eligibility questions",
    noteZh: "這不是文書題，是資格題。不要猜，不要抱著先過再說的心態。",
    noteEn: "This is not simple paperwork. It is the eligibility screen. Do not guess.",
  },
  {
    step: "08",
    icon: "wallet",
    zh: "檢查、付款、保存申請編號",
    en: "Review, pay, and save the application number",
    noteZh: "送出前最後一次核對核心資料。付款後立刻保存 Application Number。",
    noteEn: "Do one final check on the core fields before submission. Save the Application Number immediately after payment.",
  },
];

const riskBands = [
  { id: "all", zh: "全部", en: "All" },
  { id: "high", zh: "高風險", en: "High risk" },
  { id: "medium", zh: "中風險", en: "Medium risk" },
  { id: "low", zh: "低風險", en: "Low risk" },
];

const fieldGuide = [
  {
    field: "Issuing Country / Nationality",
    zh: "通常選 TAIWAN。若官方當下欄位名稱或清單顯示略有不同，以當下官方畫面為準。",
    en: "This is usually TAIWAN. If the live official label or drop-down wording differs, follow the official screen.",
    risk: "high",
  },
  {
    field: "Passport Number",
    zh: "照護照資料頁逐字填。特別小心 O 與 0、I 與 1。",
    en: "Match the passport exactly. Be careful with O versus 0 and I versus 1.",
    risk: "high",
  },
  {
    field: "Family Name / First (Given) Name",
    zh: "依護照英文欄位拆開填，不要自己重排姓與名。",
    en: "Split the names exactly as shown on the passport. Do not re-order them yourself.",
    risk: "high",
  },
  {
    field: "Date of Birth",
    zh: "依系統格式填。最常見錯誤是月與日顛倒。",
    en: "Follow the system format. Month and day reversal is one of the most common mistakes.",
    risk: "high",
  },
  {
    field: "National Identification Number",
    zh: "一般中華民國護照持有人，通常就是國民身分證統一編號。",
    en: "For most ROC passport holders, this is the National ID number.",
    risk: "high",
  },
  {
    field: "Personal Identification Number (PIN)",
    zh: "對中華民國護照持有人，實務上通常也是國民身分證統一編號。不要看成可有可無。",
    en: "For ROC passport holders, this is typically also the National ID number. Do not treat it as optional by habit.",
    risk: "high",
  },
  {
    field: "Country / City of Birth",
    zh: "依系統要求填寫，維持一致且可辨識，不要臨時換另一套英文寫法。",
    en: "Complete it as requested by the system and keep the wording consistent and recognizable.",
    risk: "medium",
  },
  {
    field: "Other Citizenship / Nationality",
    zh: "若現在或過去有其他國籍，必須照實填。",
    en: "If you have current or former additional nationality, disclose it truthfully.",
    risk: "high",
  },
  {
    field: "Parents",
    zh: "父母姓名欄位可能出現，建議先想好正式英文拼法。",
    en: "Parent name fields may appear. Decide the formal English spelling before starting.",
    risk: "medium",
  },
  {
    field: "Contact Information",
    zh: "地址、電話、Email 要能真正對應到你，不要只求系統放行。",
    en: "Your address, phone, and email should genuinely map back to you. Do not fill them only to get through the page.",
    risk: "medium",
  },
  {
    field: "Social Media",
    zh: "常見會標成 Optional。若畫面出現，以當下官方標示處理。",
    en: "This commonly appears as Optional. If the field shows up, follow the live official label.",
    risk: "low",
  },
  {
    field: "Employment / School Information",
    zh: "有工作就填公司，學生就填學校。不要亂編。",
    en: "Use employer information if you work, or school details if you study. Do not invent content.",
    risk: "medium",
  },
  {
    field: "Emergency Contact Information",
    zh: "填一位真的聯絡得到的人，不一定要在美國。",
    en: "Use someone who can actually be reached. The person does not need to be in the United States.",
    risk: "low",
  },
  {
    field: "Travel Information",
    zh: "有住宿或在美聯絡人就照實填。純轉機案件依當下欄位與實際情況處理。",
    en: "If you have lodging or a U.S. contact, use the real details. Transit-only cases should follow the live field and real situation.",
    risk: "medium",
  },
  {
    field: "Eligibility Questions",
    zh: "全部誠實作答。這一區不是小欄位，而是資格審查本身。",
    en: "Answer honestly. This is not a minor section. It is the eligibility review itself.",
    risk: "high",
  },
];

const fieldHighlights = [
  {
    tone: "red",
    zh: "護照號碼、姓名、生日、PIN，是最值得最後再看一次的四組核心欄位。",
    en: "Passport number, name, date of birth, and PIN are the four field clusters most worth checking one final time.",
  },
  {
    tone: "amber",
    zh: "只要核心欄位錯得夠關鍵，後面常常不是小修，而是整份重辦。",
    en: "If a core field is wrong in a meaningful way, the next step is often a new filing rather than a small correction.",
  },
  {
    tone: "blue",
    zh: "OCR 幫你省時間，但不幫你承擔錯字的後果。",
    en: "OCR may save time, but it does not absorb the consequences of a wrong entry.",
  },
];

const statusCards = [
  {
    code: "Approved",
    tone: "green",
    icon: "check",
    zh: "Authorization Approved。通常可在有效期內多次旅行，但每次停留仍受 90 天等 VWP 規則限制。",
    en: "Authorization Approved. You may usually travel multiple times within the validity window, but each stay still remains subject to VWP rules such as the 90-day cap.",
  },
  {
    code: "Pending",
    tone: "amber",
    icon: "clock",
    zh: "Authorization Pending。官方通常表示結果會在 72 小時內更新。此時先保留資料，不要自己亂猜。",
    en: "Authorization Pending. Official guidance usually says a result should update within 72 hours. Keep your records and do not guess.",
  },
  {
    code: "Not Authorized",
    tone: "red",
    icon: "close",
    zh: "Travel Not Authorized。若情況沒有改變，再送相同資料通常也不會改變結果，應改評估簽證路線。",
    en: "Travel Not Authorized. If your circumstances did not change, filing the same profile again will usually not change the result. Move to visa evaluation.",
  },
];

const afterSubmit = [
  { icon: "file", zh: "保存 Application Number", en: "Save the Application Number" },
  { icon: "camera", zh: "截圖付款完成與查詢畫面", en: "Capture the payment-complete and status screens" },
  { icon: "passport", zh: "再核對一次護照號碼、姓名、生日與申請內容是否一致", en: "Check one more time that passport number, name, birth date, and filing details still match" },
  { icon: "search", zh: "出發前再次查狀態，尤其接近出發時", en: "Check the status again before departure, especially close to the trip" },
];

const updateMatrix = [
  { label: "Email、電話、住址等聯絡資訊", labelEn: "Email, phone, and address details", result: "update", zh: "通常可更新。", en: "Usually can be updated." },
  { label: "部分旅行資訊", labelEn: "Some travel details", result: "update", zh: "通常可更新。", en: "Usually can be updated." },
  { label: "護照資料", labelEn: "Passport details", result: "reapply", zh: "通常要重送新申請。", en: "Usually requires a new application." },
  { label: "國籍", labelEn: "Country of citizenship", result: "reapply", zh: "通常要重送新申請。", en: "Usually requires a new application." },
  { label: "出生日期", labelEn: "Date of birth", result: "reapply", zh: "通常要重送新申請。", en: "Usually requires a new application." },
  { label: "新護照", labelEn: "New passport", result: "reapply", zh: "必須重新申請。", en: "You must apply again." },
  { label: "姓名、性別、國籍變更", labelEn: "Name, gender, or citizenship change", result: "reapply", zh: "通常要重新申請。", en: "Usually requires reapplication." },
  { label: "ESTA 到期", labelEn: "Expired ESTA", result: "reapply", zh: "不能續期，要新申請。", en: "It cannot be renewed. File a new application." },
];

const specialNotes = [
  {
    tone: "blue",
    icon: "users",
    zh: "每位旅客都要自己的護照。嬰兒與兒童也一樣。",
    en: "Each traveler needs a passport of their own, including infants and children.",
  },
  {
    tone: "blue",
    icon: "shield",
    zh: "ESTA 核准不等於保證入境。它先讓你有資格登機，最後是否准許入境仍由 CBP 官員判斷。",
    en: "ESTA approval does not guarantee admission. It gets you to boarding eligibility first, but final admission is still decided by CBP.",
  },
  {
    tone: "amber",
    icon: "passport",
    zh: "若使用緊急或臨時護照走 VWP，護照本身也必須是電子護照。",
    en: "If you use an emergency or temporary passport under the VWP, that passport still must be an e-passport.",
  },
];

const mistakes = [
  {
    tone: "red",
    icon: "globe",
    zhTitle: "用了第三方頁面",
    enTitle: "Using a third-party page",
    zh: "不是官方網站或官方 App，常見問題就是費用被加價、資訊混亂、出事很難回頭查。",
    en: "If it is not the official website or official app, common problems include markups, mixed information, and harder recovery later.",
  },
  {
    tone: "red",
    icon: "id",
    zhTitle: "把 PIN 當成不重要",
    enTitle: "Treating the PIN as minor",
    zh: "對臺灣旅客，這格常常就是關鍵欄位之一。",
    en: "For Taiwan travelers, this is often one of the key fields.",
  },
  {
    tone: "red",
    icon: "passport",
    zhTitle: "完全相信 OCR",
    enTitle: "Trusting OCR completely",
    zh: "OCR 可以幫忙帶入，但不能替你承擔護照號碼、姓名與日期輸錯的風險。",
    en: "OCR may help with input, but it does not carry the risk of a wrong passport number, name, or date.",
  },
  {
    tone: "red",
    icon: "calendar",
    zhTitle: "日期格式看錯",
    enTitle: "Misreading the date format",
    zh: "月與日顛倒，是最常見又最容易拖出後續麻煩的錯誤之一。",
    en: "Month and day reversal is one of the most common mistakes that creates avoidable downstream trouble.",
  },
  {
    tone: "amber",
    icon: "plane",
    zhTitle: "以為轉機不用 ESTA",
    enTitle: "Assuming transit does not need ESTA",
    zh: "在 VWP 規則下，轉機經過美國通常仍屬需要處理的情境。",
    en: "Under VWP rules, transiting the United States is still generally a case that needs to be handled.",
  },
  {
    tone: "amber",
    icon: "refresh",
    zhTitle: "被拒後一直重送",
    enTitle: "Re-filing after a denial with no change",
    zh: "如果情況沒變，再送同樣內容通常不會改變結果。",
    en: "If nothing has changed, filing the same content again usually will not change the result.",
  },
];

const faqs = [
  {
    id: "faq1",
    qZh: "官方 App 能完全取代網站嗎",
    qEn: "Can the official app fully replace the website",
    aZh: "不建議這樣理解。官方 App 目前主要寫明新個人申請與查既有申請。若是多人案件，網站通常仍較直覺。",
    aEn: "It is better not to read it that way. The app currently highlights new individual filing and existing lookup. For multiple travelers, the website is still usually clearer.",
  },
  {
    id: "faq2",
    qZh: "自拍照現在是不是所有人都一律強制",
    qEn: "Is the selfie mandatory for everyone now",
    aZh: "不宜寫得這麼絕對。官方首頁目前標示為 If Applicable，比較準的理解是系統可能要求影像驗證，所以先把合格照片備好。",
    aEn: "That is too absolute. The official homepage currently labels it If Applicable. The better reading is that image verification may appear, so prepare a compliant photo in advance.",
  },
  {
    id: "faq3",
    qZh: "ESTA 核准後就一定能入境嗎",
    qEn: "Does ESTA approval guarantee entry",
    aZh: "不一定。它先讓你能搭符合規定的承運人赴美並在口岸請求入境，最後仍由 CBP 官員判斷。",
    aEn: "No. It lets you board an eligible carrier and request admission at the port of entry, but final admission is still decided by CBP.",
  },
  {
    id: "faq4",
    qZh: "紙本 ESTA 一定要印出來嗎",
    qEn: "Do I have to print the ESTA",
    aZh: "官方說明 ESTA 是全電子化，不一定要帶紙本。不過實務上，保留 Application Number 與畫面截圖仍很值得做。",
    aEn: "Official guidance says ESTA is fully electronic, so a printout is not required. In practice, keeping the Application Number and screenshots is still very useful.",
  },
  {
    id: "faq5",
    qZh: "兒童也需要自己的 ESTA 嗎",
    qEn: "Do children need their own ESTA too",
    aZh: "是。每位旅客都要有自己的護照，兒童也要各自符合 ESTA 或簽證條件。",
    aEn: "Yes. Each traveler needs a passport of their own, and children must separately meet ESTA or visa requirements.",
  },
  {
    id: "faq6",
    qZh: "用私人飛機赴美也能走 ESTA 嗎",
    qEn: "Can ESTA be used for entry by private aircraft",
    aZh: "通常不行。這類案件多半要改做簽證判斷。",
    aEn: "Usually not. Cases like this generally move to visa evaluation.",
  },
];

const links = [
  {
    title: "ESTA 官方網站",
    url: "https://esta.cbp.dhs.gov/",
    noteZh: "申請、查狀態、看官方首頁。",
    noteEn: "Apply, check status, and review the official homepage.",
    group: "core",
  },
  {
    title: "ESTA 官方 FAQ",
    url: "https://esta.cbp.dhs.gov/faq?lang=zh",
    noteZh: "中文 FAQ，適合先確認概念。",
    noteEn: "Chinese FAQ for quick concept checks.",
    group: "core",
  },
  {
    title: "Visa Waiver Program",
    url: "https://travel.state.gov/content/travel/en/us-visas/tourism-visit/visa-waiver-program.html",
    noteZh: "VWP 適用範圍、用途、限制情境與 90 天規則。",
    noteEn: "VWP scope, allowed uses, restricted cases, and the 90-day rule.",
    group: "rules",
  },
  {
    title: "查 ESTA 狀態",
    url: "https://www.help.cbp.gov/s/article/Article-1445?language=en_US",
    noteZh: "查 Approved、Pending、Not Authorized。",
    noteEn: "Check Approved, Pending, and Not Authorized.",
    group: "status",
  },
  {
    title: "更新 ESTA 資料",
    url: "https://www.help.cbp.gov/s/article/Article-1255?language=en_US",
    noteZh: "哪些通常可更新，哪些通常要重辦。",
    noteEn: "What usually can be updated and what requires reapplication.",
    group: "status",
  },
  {
    title: "更正 ESTA 錯誤",
    url: "https://www.help.cbp.gov/s/article/Article-1439?language=en_US",
    noteZh: "送出前可重看與更正資料。",
    noteEn: "Review and correct data before submission.",
    group: "status",
  },
  {
    title: "是否需要紙本 ESTA",
    url: "https://www.help.cbp.gov/s/article/Article-1262?language=en_US",
    noteZh: "官方說明不必攜帶紙本。",
    noteEn: "Official guidance says a printout is not required.",
    group: "status",
  },
  {
    title: "ESTA 費用與付款",
    url: "https://www.help.cbp.gov/s/article/Article-1281?language=en_US",
    noteZh: "查看目前官方費用與重送說明。",
    noteEn: "Check the current official fee and re-filing guidance.",
    group: "status",
  },
  {
    title: "iPhone 官方 App",
    url: "https://apps.apple.com/us/app/esta-mobile/id1529604353",
    noteZh: "官方行動入口之一。",
    noteEn: "One official mobile entry point.",
    group: "apps",
  },
  {
    title: "Android 官方 App",
    url: "https://play.google.com/store/apps/details?id=gov.dhs.cbp.esta",
    noteZh: "官方行動入口之一。",
    noteEn: "One official mobile entry point.",
    group: "apps",
  },
];

function cn(...parts) {
  return parts.filter(Boolean).join(" ");
}

function toneStyle(tone = "default") {
  if (tone === "green") return { bg: theme.greenSoft, text: theme.green, border: "rgba(92,107,66,0.18)" };
  if (tone === "red") return { bg: theme.redSoft, text: theme.red, border: "rgba(169,90,77,0.18)" };
  if (tone === "amber") return { bg: theme.amberSoft, text: theme.amber, border: "rgba(154,115,50,0.18)" };
  if (tone === "blue") return { bg: theme.blueSoft, text: theme.blue, border: "rgba(93,116,135,0.18)" };
  if (tone === "plum") return { bg: theme.plumSoft, text: theme.plum, border: "rgba(107,91,110,0.18)" };
  return { bg: theme.brownSoft, text: theme.deep, border: "rgba(107,73,60,0.14)" };
}

function Icon({ name, size = 20, className = "", strokeWidth = 1.7 }) {
  const shapes = iconPaths[name] || iconPaths.file;
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {shapes.map((shape, index) => {
        const { type, props } = shape;
        if (type === "circle") return <circle key={index} {...props} />;
        if (type === "rect") return <rect key={index} {...props} />;
        return <path key={index} {...props} />;
      })}
    </svg>
  );
}

function Surface({ children, className = "", style = {} }) {
  return (
    <div
      className={cn("rounded-[26px] border shadow-[0_10px_32px_rgba(53,45,39,0.05)]", className)}
      style={{ background: theme.card, borderColor: theme.line, ...style }}
    >
      {children}
    </div>
  );
}

function Pill({ children, tone = "default", className = "" }) {
  const t = toneStyle(tone);
  return (
    <span
      className={cn("inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold", className)}
      style={{ background: t.bg, color: t.text }}
    >
      {children}
    </span>
  );
}

function Bilingual({ mode, zh, en, className = "", enClassName = "" }) {
  if (mode === "zh") return <div className={className}>{zh}</div>;
  if (mode === "en") return <div className={className}>{en}</div>;
  return (
    <div className={className}>
      <div>{zh}</div>
      <div className={cn("mt-1.5", enClassName)}>{en}</div>
    </div>
  );
}

function SectionTitle({ mode, kickerZh, kickerEn, titleZh, titleEn, noteZh, noteEn }) {
  return (
    <div className="mb-5 md:mb-6">
      <div
        className="mb-3 inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em]"
        style={{ background: theme.brownSoft, color: theme.deep }}
      >
        <span>{mode === "en" ? kickerEn : kickerZh}</span>
        {mode === "both" && (
          <>
            <span className="opacity-40">/</span>
            <span>{kickerEn}</span>
          </>
        )}
      </div>
      <h2 className="text-[26px] font-semibold leading-tight md:text-[36px]" style={{ color: theme.ink }}>
        {mode === "en" ? titleEn : titleZh}
      </h2>
      {mode === "both" && <p className="mt-2 text-sm md:text-base" style={{ color: theme.muted }}>{titleEn}</p>}
      {(noteZh || noteEn) && (
        <Bilingual
          mode={mode}
          className="mt-3 max-w-4xl text-sm leading-7 md:text-[15px]"
          enClassName="text-[#5F5852]"
          zh={noteZh}
          en={noteEn}
        />
      )}
    </div>
  );
}

function ReadingSettings({ mode, setMode, compact, setCompact, focus, setFocus }) {
  const [open, setOpen] = useState(false);
  const modeOptions = [
    { id: "zh", label: "中文" },
    { id: "en", label: "English" },
    { id: "both", label: "雙語 / Bilingual" },
  ];
  const focusOptions = [
    { id: "reader", labelZh: "一般讀者", labelEn: "Reader mode" },
    { id: "filing", labelZh: "填寫重點", labelEn: "Filing mode" },
  ];

  return (
    <div className="fixed bottom-5 right-5 z-30 md:bottom-6 md:right-6">
      <div className="relative">
        {open && (
          <div
            className="absolute bottom-14 right-0 w-[min(292px,calc(100vw-2.25rem))] rounded-[24px] border p-3 shadow-[0_14px_38px_rgba(44,41,38,0.12)]"
            style={{ background: theme.card, borderColor: theme.line }}
          >
            <div className="px-2 pb-2 text-xs font-semibold uppercase tracking-[0.14em]" style={{ color: theme.deep }}>
              Reading settings
            </div>

            <div className="space-y-1">
              {modeOptions.map((opt) => {
                const active = mode === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setMode(opt.id)}
                    className="flex w-full items-center justify-between rounded-2xl px-3 py-3 text-sm text-left"
                    style={{ background: active ? theme.brownSoft : "transparent", color: theme.ink }}
                  >
                    <span>{opt.label}</span>
                    {active && <Icon name="check" size={16} />}
                  </button>
                );
              })}
            </div>

            <div className="mt-3 border-t pt-3" style={{ borderColor: theme.line }}>
              <div className="px-2 pb-2 text-xs font-semibold uppercase tracking-[0.14em]" style={{ color: theme.deep }}>
                Focus
              </div>
              <div className="space-y-1">
                {focusOptions.map((opt) => {
                  const active = focus === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setFocus(opt.id)}
                      className="flex w-full items-center justify-between rounded-2xl px-3 py-3 text-sm text-left"
                      style={{ background: active ? theme.brownSoft : "transparent", color: theme.ink }}
                    >
                      <span>{mode === "en" ? opt.labelEn : opt.labelZh}</span>
                      {active && <Icon name="check" size={16} />}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mt-3 border-t pt-3" style={{ borderColor: theme.line }}>
              <button
                type="button"
                onClick={() => setCompact((v) => !v)}
                className="flex w-full items-center justify-between rounded-2xl px-3 py-3 text-sm text-left"
                style={{ background: compact ? theme.brownSoft : "transparent", color: theme.ink }}
              >
                <span>{mode === "en" ? "Compact tables" : "精簡表格"}</span>
                {compact ? <Icon name="check" size={16} /> : <Icon name="arrowRight" size={16} />}
              </button>
            </div>
          </div>
        )}

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-12 w-12 items-center justify-center rounded-full border shadow-md"
          style={{ background: theme.deep, borderColor: theme.deep, color: theme.white }}
          aria-label="Open reading settings"
        >
          <Icon name="settings" size={18} />
        </button>
      </div>
    </div>
  );
}

function StatCard({ mode, item }) {
  const t = toneStyle(item.tone);
  return (
    <Surface className="p-4" style={{ background: t.bg }}>
      <div className="flex items-start gap-3">
        <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl" style={{ background: "rgba(255,255,255,0.7)", color: t.text }}>
          <Icon name={item.icon} size={18} />
        </div>
        <div className="min-w-0">
          <Bilingual mode={mode} className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#6C645D]" zh={item.zhLabel} en={item.enLabel} />
          <Bilingual mode={mode} className="mt-2 text-base font-semibold leading-7 text-[#2D2A27]" zh={item.zhValue} en={item.enValue} />
        </div>
      </div>
    </Surface>
  );
}

function NoteCard({ mode, item }) {
  const t = toneStyle(item.tone);
  return (
    <Surface className="p-5" style={{ background: t.bg }}>
      <div className="flex items-start gap-3">
        <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl" style={{ background: "rgba(255,255,255,0.68)", color: t.text }}>
          <Icon name={item.icon} size={18} />
        </div>
        <div className="min-w-0">
          <Bilingual
            mode={mode}
            className=""
            enClassName="text-[#5F5852]"
            zh={
              <>
                <p className="font-semibold leading-7">{item.zhTitle}</p>
                <p className="mt-2 text-sm leading-7">{item.zh}</p>
              </>
            }
            en={
              <>
                <p className="font-semibold leading-7">{item.enTitle}</p>
                <p className="mt-2 text-sm leading-7">{item.en}</p>
              </>
            }
          />
        </div>
      </div>
    </Surface>
  );
}

function RiskLegend({ mode }) {
  return (
    <div className="flex flex-wrap gap-2">
      <Pill tone="red">{mode === "en" ? "High risk" : "高風險"}</Pill>
      <Pill tone="amber">{mode === "en" ? "Medium risk" : "中風險"}</Pill>
      <Pill tone="green">{mode === "en" ? "Low risk" : "低風險"}</Pill>
    </div>
  );
}

function MobileFieldCards({ mode, rows }) {
  return (
    <div className="space-y-3 md:hidden">
      {rows.map((row) => {
        const tone = row.risk === "high" ? "red" : row.risk === "medium" ? "amber" : "green";
        return (
          <Surface key={row.field} className="p-4">
            <div className="flex items-start justify-between gap-3">
              <p className="min-w-0 break-words font-semibold leading-6">{row.field}</p>
              <Pill tone={tone}>{mode === "en" ? row.risk : row.risk === "high" ? "高" : row.risk === "medium" ? "中" : "低"}</Pill>
            </div>
            <Bilingual
              mode={mode}
              className="mt-3 text-sm leading-7"
              enClassName="text-[#5F5852]"
              zh={<p>{row.zh}</p>}
              en={<p>{row.en}</p>}
            />
          </Surface>
        );
      })}
    </div>
  );
}

function FieldTable({ mode, compact, rows }) {
  const showEnglish = mode === "both" && !compact;
  return (
    <Surface className="hidden overflow-hidden md:block">
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead style={{ background: theme.brownSoft }}>
            <tr>
              <th className="px-5 py-4 font-semibold md:px-6">Field</th>
              <th className="px-5 py-4 font-semibold md:px-6">{mode === "en" ? "Primary note" : "中文重點"}</th>
              {showEnglish && <th className="px-5 py-4 font-semibold md:px-6">English note</th>}
              <th className="px-5 py-4 font-semibold md:px-6">{mode === "en" ? "Risk" : "風險"}</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => {
              const odd = index % 2 === 1;
              const tone = row.risk === "high" ? "red" : row.risk === "medium" ? "amber" : "green";
              return (
                <tr key={row.field} className={odd ? "bg-[#FFFEFB]" : ""} style={{ borderTop: `1px solid ${theme.line}` }}>
                  <td className="px-5 py-4 align-top font-medium md:px-6">{row.field}</td>
                  <td className="px-5 py-4 align-top leading-7 md:px-6">{mode === "en" ? row.en : row.zh}</td>
                  {showEnglish && <td className="px-5 py-4 align-top leading-7 text-[#5F5852] md:px-6">{row.en}</td>}
                  <td className="px-5 py-4 align-top md:px-6">
                    <Pill tone={tone}>{mode === "en" ? row.risk : row.risk === "high" ? "高" : row.risk === "medium" ? "中" : "低"}</Pill>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Surface>
  );
}

function UpdateCards({ mode, rows }) {
  return (
    <div className="space-y-3 md:hidden">
      {rows.map((row) => {
        const tone = row.result === "update" ? "green" : "red";
        return (
          <Surface key={row.label} className="p-4">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="break-words font-semibold leading-6">{mode === "en" ? row.labelEn : row.label}</p>
                {mode === "both" && <p className="mt-1 text-sm text-[#7A6F65]">{row.labelEn}</p>}
              </div>
              <Pill tone={tone}>{row.result === "update" ? (mode === "en" ? "Update" : "更新") : (mode === "en" ? "Reapply" : "重辦")}</Pill>
            </div>
            <Bilingual mode={mode} className="mt-3 text-sm leading-7" enClassName="text-[#5F5852]" zh={<p>{row.zh}</p>} en={<p>{row.en}</p>} />
          </Surface>
        );
      })}
    </div>
  );
}

function UpdateTable({ mode, compact, rows }) {
  const showEnglish = mode === "both" && !compact;
  return (
    <Surface className="hidden overflow-hidden md:block">
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead style={{ background: theme.brownSoft }}>
            <tr>
              <th className="px-5 py-4 font-semibold md:px-6">{mode === "en" ? "Item" : "項目"}</th>
              <th className="px-5 py-4 font-semibold md:px-6">{mode === "en" ? "Result" : "處理方式"}</th>
              <th className="px-5 py-4 font-semibold md:px-6">{mode === "en" ? "Primary note" : "中文說明"}</th>
              {showEnglish && <th className="px-5 py-4 font-semibold md:px-6">English note</th>}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => {
              const odd = index % 2 === 1;
              const tone = row.result === "update" ? "green" : "red";
              return (
                <tr key={row.label} className={odd ? "bg-[#FFFEFB]" : ""} style={{ borderTop: `1px solid ${theme.line}` }}>
                  <td className="px-5 py-4 align-top font-medium md:px-6">{mode === "en" ? row.labelEn : row.label}</td>
                  <td className="px-5 py-4 align-top md:px-6">
                    <Pill tone={tone}>{row.result === "update" ? (mode === "en" ? "Update" : "更新") : (mode === "en" ? "Reapply" : "重辦")}</Pill>
                  </td>
                  <td className="px-5 py-4 align-top leading-7 md:px-6">{mode === "en" ? row.en : row.zh}</td>
                  {showEnglish && <td className="px-5 py-4 align-top leading-7 text-[#5F5852] md:px-6">{row.en}</td>}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Surface>
  );
}

function FAQItem({ mode, item, open, onToggle }) {
  return (
    <Surface className="overflow-hidden">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left md:px-6"
      >
        <Bilingual mode={mode} zh={<p className="font-semibold leading-7">{item.qZh}</p>} en={<p className="font-semibold leading-7">{item.qEn}</p>} />
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border" style={{ borderColor: theme.line, color: theme.deep }}>
          <Icon name="arrowDown" size={16} className={open ? "rotate-180 transition-transform" : "transition-transform"} />
        </div>
      </button>
      {open && (
        <div className="border-t px-5 py-4 md:px-6" style={{ borderColor: theme.line }}>
          <Bilingual mode={mode} className="text-sm leading-7" enClassName="text-[#5F5852]" zh={<p>{item.aZh}</p>} en={<p>{item.aEn}</p>} />
        </div>
      )}
    </Surface>
  );
}

function LinkCard({ mode, item }) {
  const groupTone = item.group === "apps" ? "blue" : item.group === "rules" ? "amber" : item.group === "status" ? "green" : "default";
  const t = toneStyle(groupTone);
  return (
    <Surface className="p-5 transition-transform hover:-translate-y-[1px]">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl" style={{ background: t.bg, color: t.text }}>
              <Icon name={item.group === "apps" ? "app" : "link"} size={16} />
            </div>
            <p className="font-semibold leading-7">{item.title}</p>
          </div>
        </div>
        <a
          href={item.url}
          target="_blank"
          rel="noreferrer"
          className="inline-flex shrink-0 items-center gap-1 rounded-full border px-3 py-1.5 text-sm font-semibold"
          style={{ borderColor: theme.line, color: theme.deep }}
        >
          <span>{mode === "en" ? "Open" : "開啟"}</span>
          <Icon name="arrowRight" size={14} />
        </a>
      </div>
      <Bilingual mode={mode} className="mt-3 text-sm leading-7" enClassName="text-[#5F5852]" zh={item.noteZh} en={item.noteEn} />
      <div className="mt-3 break-all text-xs leading-6" style={{ color: theme.soft }}>{item.url}</div>
    </Surface>
  );
}

function FlowConnector() {
  return (
    <div className="hidden h-10 items-center justify-center md:flex">
      <div className="h-10 w-px" style={{ background: `linear-gradient(to bottom, transparent, ${theme.lineStrong}, transparent)` }} />
    </div>
  );
}

export default function ESTAInfrastructureRebuiltV2() {
  const [mode, setMode] = useState("zh");
  const [compact, setCompact] = useState(false);
  const [focus, setFocus] = useState("reader");
  const [riskFilter, setRiskFilter] = useState("all");
  const [openFaq, setOpenFaq] = useState("faq1");

  const displayTitle = useMemo(() => {
    if (mode === "en") return "ESTA Guide for ROC Passport Holders";
    return "中華民國護照 ESTA 申請完整指引";
  }, [mode]);

  const filteredFields = useMemo(() => {
    if (riskFilter === "all") return fieldGuide;
    return fieldGuide.filter((row) => row.risk === riskFilter);
  }, [riskFilter]);

  const heroIntro = mode === "en"
    ? "Standard path most ROC passport holders actually use to apply ESTA."
    : "最常用的 ESTA 路徑";

  const heroSub = mode === "en"
    ? "official logic"
    : "官方邏輯";

  const riskHighlightTitle = mode === "en" ? "Field risk board" : "欄位風險板";
  const filteredCountText = mode === "en"
    ? `${filteredFields.length} field${filteredFields.length > 1 ? "s" : ""}`
    : `共 ${filteredFields.length} 項`;

  return (
    <div className="min-h-screen" style={{ background: theme.bg, color: theme.ink }}>
      <div className="sticky top-0 z-20 border-b backdrop-blur" style={{ background: "rgba(252,250,242,0.94)", borderColor: theme.line }}>
        <div className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-4 py-3 md:px-6">
          {sections.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className="inline-flex shrink-0 items-center gap-2 rounded-full border px-3 py-2 text-sm transition hover:-translate-y-[1px]"
              style={{ borderColor: theme.line, color: theme.ink, background: theme.card }}
            >
              <span>{section.zh}</span>
              <span className="hidden opacity-40 sm:inline">/</span>
              <span className="hidden sm:inline">{section.en}</span>
            </a>
          ))}
        </div>
      </div>

      <ReadingSettings mode={mode} setMode={setMode} compact={compact} setCompact={setCompact} focus={focus} setFocus={setFocus} />

      <main className="mx-auto max-w-7xl space-y-8 px-4 py-6 pb-24 md:px-6 md:py-8 md:pb-28">
        <Surface className="overflow-hidden">
          <div className="grid gap-6 p-5 md:grid-cols-[1.15fr_0.85fr] md:p-8">
            <div>
              <div className="mb-4 flex flex-wrap items-center gap-2">
                <Pill tone="green"><Icon name="plane" size={14} />{mode === "en" ? "Tourism" : "觀光"}</Pill>
                <Pill><Icon name="users" size={14} />{mode === "en" ? "Business" : "商務"}</Pill>
                <Pill tone="amber"><Icon name="link" size={14} />{mode === "en" ? "Transit" : "過境"}</Pill>
                <Pill><Icon name="clock" size={14} />{mode === "en" ? "Up to 90 days" : "最長 90 天"}</Pill>
              </div>

              <h1 className="text-[34px] font-semibold leading-tight md:text-[58px]" style={{ color: theme.ink }}>
                {displayTitle}
              </h1>

              <div className="mt-4 max-w-3xl">
                <p className="text-[15px] leading-8 md:text-[18px]" style={{ color: theme.deep }}>{heroIntro}</p>
                <p className="mt-2 text-[15px] leading-8 md:text-[17px]" style={{ color: theme.muted }}>{heroSub}</p>
              </div>

              <div className="mt-5 flex flex-wrap gap-3">
                <a
                  href="https://esta.cbp.dhs.gov/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full px-4 py-3 text-sm font-semibold text-white"
                  style={{ background: theme.deep }}
                >
                  <Icon name="link" size={15} />
                  <span>{mode === "en" ? "Official ESTA" : "官方網站"}</span>
                </a>
                <a
                  href="https://apps.apple.com/us/app/esta-mobile/id1529604353"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border px-4 py-3 text-sm font-semibold"
                  style={{ borderColor: theme.line, color: theme.ink, background: theme.card }}
                >
                  <Icon name="app" size={15} />
                  <span>iPhone</span>
                </a>
                <a
                  href="https://play.google.com/store/apps/details?id=gov.dhs.cbp.esta"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border px-4 py-3 text-sm font-semibold"
                  style={{ borderColor: theme.line, color: theme.ink, background: theme.card }}
                >
                  <Icon name="app" size={15} />
                  <span>Android</span>
                </a>
                <a
                  href="https://esta.cbp.dhs.gov/faq?lang=zh"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border px-4 py-3 text-sm font-semibold"
                  style={{ borderColor: theme.line, color: theme.ink, background: theme.card }}
                >
                  <Icon name="file" size={15} />
                  <span>{mode === "en" ? "Official FAQ" : "官方 FAQ"}</span>
                </a>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                {facts.map((item) => <StatCard key={item.zhLabel} mode={mode} item={item} />)}
              </div>
            </div>

            <Surface className="h-full p-5 md:p-6" style={{ background: theme.cardAlt }}>
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold" style={{ color: theme.deep }}>
                    {mode === "en" ? "Three-second answer" : "三秒先判斷"}
                  </p>
                  <p className="mt-1 text-sm leading-7" style={{ color: theme.muted }}>
                    {mode === "en"
                      ? "Use this before reading the full page."
                      : "先用這一格判斷大方向，再往下看細節。"}
                  </p>
                </div>
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl" style={{ background: theme.brownSoft, color: theme.deep }}>
                  <Icon name="sparkle" size={20} />
                </div>
              </div>

              <div className="mt-4 grid gap-3">
                {routeCards.map((card) => {
                  const t = toneStyle(card.tone);
                  return (
                    <div key={card.zhTitle} className="rounded-[22px] border p-4" style={{ borderColor: t.border, background: t.bg }}>
                      <div className="flex items-start gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl" style={{ background: "rgba(255,255,255,0.7)", color: t.text }}>
                          <Icon name={card.icon} size={18} />
                        </div>
                        <div className="min-w-0">
                          <p className="font-semibold leading-7">{mode === "en" ? card.enTitle : card.zhTitle}</p>
                          <p className="mt-1 text-sm leading-7">{mode === "en" ? card.en : card.zh}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-4 rounded-[22px] border p-4" style={{ borderColor: theme.line, background: theme.white }}>
                <p className="font-semibold">{mode === "en" ? "Bottom line" : "最重要底線"}</p>
                <p className="mt-2 text-sm leading-7" style={{ color: theme.muted }}>
                  {mode === "en"
                    ? "ESTA approval does not equal guaranteed entry. It gets you to boarding eligibility first."
                    : "ESTA 核准不等於保證入境，它先讓你有資格登上符合規定的承運人。"}
                </p>
              </div>
            </Surface>
          </div>
        </Surface>

        <section id="start" className="scroll-mt-28">
          <SectionTitle
            mode={mode}
            kickerZh="快速判斷"
            kickerEn="Start Here"
            titleZh="先看這四步，方向通常就不會錯"
            titleEn="These four checks usually set the route correctly"
            noteZh="方向"
            noteEn="the route"
          />
          <div className="grid gap-4 lg:grid-cols-[0.96fr_1.04fr]">
            <Surface className="p-5 md:p-6">
              <div className="space-y-3">
                {decisionSteps.map((item, index) => (
                  <div key={item.zh} className="rounded-[22px] border p-4" style={{ borderColor: theme.line }}>
                    <div className="flex items-start gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-semibold text-white" style={{ background: theme.deep }}>
                        {index + 1}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-start gap-3">
                          <div className="mt-0.5 hidden sm:flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl" style={{ background: theme.brownSoft, color: theme.deep }}>
                            <Icon name={item.icon} size={16} />
                          </div>
                          <div className="min-w-0">
                            <p className="font-medium leading-7">{mode === "en" ? item.en : item.zh}</p>
                            <div className="mt-3 flex flex-wrap gap-2">
                              <Pill tone="green">{mode === "en" ? `Yes, ${item.yesEn}` : `是，${item.yesZh}`}</Pill>
                              <Pill tone="red">{mode === "en" ? `No, ${item.noEn}` : `否，${item.noZh}`}</Pill>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Surface>

            <div className="grid gap-4">
              <Surface className="p-5 md:p-6">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="font-semibold">{mode === "en" ? "What ESTA does cover" : "ESTA 主要涵蓋的用途"}</p>
                    <p className="mt-1 text-sm leading-7" style={{ color: theme.muted }}>
                      {mode === "en"
                        ? "These are the uses that fit the standard route."
                        : "這些是最常見、也最適合放進標準路徑的用途。"}
                    </p>
                  </div>
                  <Icon name="check" size={18} className="shrink-0" />
                </div>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {allowedUseItems.map((item, index) => {
                    const t = toneStyle(item.tone);
                    return (
                      <div key={index} className="rounded-[18px] border p-4 text-sm leading-7" style={{ borderColor: t.border, background: t.bg }}>
                        {mode === "en" ? item.en : item.zh}
                      </div>
                    );
                  })}
                </div>
              </Surface>

              <Surface className="p-5 md:p-6" style={{ background: theme.blueSoft }}>
                <p className="font-semibold" style={{ color: theme.blue }}>{mode === "en" ? "Two special reminders" : "兩個容易忽略的提醒"}</p>
                <div className="mt-4 grid gap-3">
                  {specialNotes.map((item, index) => {
                    const t = toneStyle(item.tone);
                    return (
                      <div key={index} className="rounded-[18px] border p-4" style={{ borderColor: t.border, background: "rgba(255,255,255,0.72)" }}>
                        <div className="flex items-start gap-3">
                          <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl" style={{ background: t.bg, color: t.text }}>
                            <Icon name={item.icon} size={16} />
                          </div>
                          <p className="text-sm leading-7">{mode === "en" ? item.en : item.zh}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Surface>
            </div>
          </div>
        </section>

        <section id="eligible" className="scroll-mt-28">
          <SectionTitle
            mode={mode}
            kickerZh="資格與限制"
            kickerEn="Eligibility"
            titleZh="限制條件要寫得精準，不要只寫模糊印象"
            titleEn="Restriction logic should be precise, not impressionistic"
            noteZh="-"
            noteEn="-"
          />
          <div className="grid gap-4 lg:grid-cols-[0.98fr_1.02fr]">
            <Surface className="p-5 md:p-6">
              <div className="rounded-[22px] border p-4" style={{ borderColor: theme.line, background: theme.redSoft }}>
                <p className="font-semibold" style={{ color: theme.red }}>{mode === "en" ? "The restriction list that matters most" : "真正要先看的限制清單"}</p>
                <p className="mt-2 text-sm leading-7" style={{ color: theme.muted }}>
                  {mode === "en"
                    ? "If one of these applies, the standard ESTA path may stop here."
                    : "只要踩到下列情境之一，標準 ESTA 路徑就可能直接停在這裡。"}
                </p>
              </div>

              <div className="mt-4 space-y-3">
                {restrictedItems.map((item, idx) => {
                  const t = toneStyle(item.tone);
                  return (
                    <div key={idx} className="rounded-[20px] border p-4" style={{ borderColor: t.border, background: t.bg }}>
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl" style={{ background: "rgba(255,255,255,0.7)", color: t.text }}>
                          <Icon name={item.tone === "red" ? "alert" : "shield"} size={16} />
                        </div>
                        <Bilingual mode={mode} className="text-sm leading-7" enClassName="text-[#5F5852]" zh={item.zh} en={item.en} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </Surface>

            <Surface className="p-5 md:p-6">
              <div className="grid gap-3 md:grid-cols-3">
                <div className="rounded-[20px] p-4" style={{ background: theme.greenSoft }}>
                  <p className="text-sm font-semibold" style={{ color: theme.green }}>{mode === "en" ? "Use ESTA" : "可走 ESTA"}</p>
                  <p className="mt-2 text-sm leading-7">{mode === "en" ? "Standard tourism, business, or transit, within 90 days." : "標準觀光、商務、過境，單次 90 天內。"}</p>
                </div>
                <div className="rounded-[20px] p-4" style={{ background: theme.redSoft }}>
                  <p className="text-sm font-semibold" style={{ color: theme.red }}>{mode === "en" ? "Use a visa" : "改走簽證"}</p>
                  <p className="mt-2 text-sm leading-7">{mode === "en" ? "Work, for-credit study, immigrant intent, private aircraft, or long stay." : "工作、學分課、移民目的、私人飛機、長期停留。"}</p>
                </div>
                <div className="rounded-[20px] p-4" style={{ background: theme.amberSoft }}>
                  <p className="text-sm font-semibold" style={{ color: theme.amber }}>{mode === "en" ? "Re-check now" : "立刻重看"}</p>
                  <p className="mt-2 text-sm leading-7">{mode === "en" ? "Any special history that may push you out of the VWP route." : "任何可能把你推出 VWP 路線的特殊背景。"}</p>
                </div>
              </div>

              <div className="mt-5 rounded-[22px] border p-4" style={{ borderColor: theme.line, background: theme.cardAlt }}>
                <p className="font-semibold">{mode === "en" ? "One practical rule" : "一條很實用的判斷規則"}</p>
                <p className="mt-2 text-sm leading-7" style={{ color: theme.muted }}>
                  {mode === "en"
                    ? "If the issue is not clerical but structural, such as travel history or nationality, do not treat repeated ESTA submissions as the main fix."
                    : "如果問題不是文書型的小錯，而是旅行史、國籍、身分這種結構問題，就不要把反覆重送 ESTA 當成主要修法。"}
                </p>
              </div>
            </Surface>
          </div>
        </section>

        <section id="prepare" className="scroll-mt-28">
          <SectionTitle
            mode={mode}
            kickerZh="申請前準備"
            kickerEn="Prepare"
            titleZh="先把資料備齊，再進官方頁面"
            titleEn="Gather the data first, then open the official page"
            noteZh="填寫速度更穩，欄位錯誤少很多。"
            noteEn="Smoother filing and fewer avoidable field errors."
          />
          <div className="grid gap-4 xl:grid-cols-[1.08fr_0.92fr]">
            <div className="space-y-4">
              {prepGroups.map((group) => (
                <Surface key={group.titleZh} className="p-5 md:p-6">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl" style={{ background: theme.brownSoft, color: theme.deep }}>
                      <Icon name={group.icon} size={18} />
                    </div>
                    <div>
                      <p className="font-semibold">{mode === "en" ? group.titleEn : group.titleZh}</p>
                      {mode === "both" && <p className="text-sm text-[#7B6F65]">{group.titleEn}</p>}
                    </div>
                  </div>

                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    {group.items.map((item) => (
                      <div key={item.zh} className="rounded-[18px] border p-4" style={{ borderColor: theme.line }}>
                        <div className="flex items-start gap-3">
                          <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl" style={{ background: theme.brownSoft, color: theme.deep }}>
                            <Icon name={item.icon} size={16} />
                          </div>
                          <Bilingual mode={mode} className="text-sm leading-7" enClassName="text-[#5F5852]" zh={item.zh} en={item.en} />
                        </div>
                      </div>
                    ))}
                  </div>
                </Surface>
              ))}
            </div>

            <div className="space-y-4">
              {practicalNotes.map((item) => <NoteCard key={item.zhTitle} mode={mode} item={item} />)}
            </div>
          </div>
        </section>

        <section id="flow" className="scroll-mt-28">
          <SectionTitle
            mode={mode}
            kickerZh="流程圖"
            kickerEn="Flow"
            titleZh="實際操作順序"
            titleEn="Practical flow"
            noteZh="-"
            noteEn="-"
          />
          <div className="grid gap-3 md:gap-0">
            {flowSteps.map((item, index) => (
              <React.Fragment key={item.step}>
                <Surface className="p-5 md:p-6">
                  <div className="flex flex-col gap-4 md:flex-row md:items-start">
                    <div className="flex items-center gap-3 md:w-[180px] md:flex-col md:items-start">
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl text-sm font-semibold text-white" style={{ background: theme.deep }}>
                        {item.step}
                      </div>
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl" style={{ background: theme.brownSoft, color: theme.deep }}>
                        <Icon name={item.icon} size={18} />
                      </div>
                    </div>

                    <div className="min-w-0 flex-1">
                      <Bilingual
                        mode={mode}
                        className=""
                        enClassName="text-[#5F5852]"
                        zh={
                          <>
                            <h3 className="text-lg font-semibold">{item.zh}</h3>
                            <p className="mt-2 text-sm leading-7">{item.noteZh}</p>
                          </>
                        }
                        en={
                          <>
                            <h3 className="text-lg font-semibold">{item.en}</h3>
                            <p className="mt-2 text-sm leading-7">{item.noteEn}</p>
                          </>
                        }
                      />
                    </div>
                  </div>
                </Surface>
                {index < flowSteps.length - 1 && <FlowConnector />}
              </React.Fragment>
            ))}
          </div>
        </section>

        <section id="fields" className="scroll-mt-28">
          <SectionTitle
            mode={mode}
            kickerZh="逐欄重點"
            kickerEn="Fields"
            titleZh="欄位本身，才是最常讓人重辦的地方"
            titleEn="The fields themselves are where re-filings usually begin"
            noteZh="把高風險欄位先抓出來，再看完整對照，會比從頭硬讀更有效率。"
            noteEn="Spot the high-risk fields first, then read the full table. It is more efficient than reading everything in one pass."
          />
          <div className="grid gap-4 lg:grid-cols-[0.92fr_1.08fr]">
            <Surface className="p-5 md:p-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="font-semibold">{riskHighlightTitle}</p>
                  <p className="mt-1 text-sm leading-7" style={{ color: theme.muted }}>{filteredCountText}</p>
                </div>
                <RiskLegend mode={mode} />
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {riskBands.map((band) => {
                  const active = riskFilter === band.id;
                  return (
                    <button
                      key={band.id}
                      type="button"
                      onClick={() => setRiskFilter(band.id)}
                      className="rounded-full border px-3 py-2 text-sm font-semibold transition"
                      style={{
                        borderColor: active ? theme.deep : theme.line,
                        background: active ? theme.deep : theme.card,
                        color: active ? theme.white : theme.ink,
                      }}
                    >
                      {mode === "en" ? band.en : band.zh}
                    </button>
                  );
                })}
              </div>

              <div className="mt-4 grid gap-3">
                {fieldHighlights.map((item, index) => {
                  const t = toneStyle(item.tone);
                  return (
                    <div key={index} className="rounded-[20px] border p-4" style={{ borderColor: t.border, background: t.bg }}>
                      <p className="text-sm leading-7">{mode === "en" ? item.en : item.zh}</p>
                    </div>
                  );
                })}
              </div>

              {focus === "filing" && (
                <div className="mt-4 rounded-[22px] border p-4" style={{ borderColor: theme.line, background: theme.cardAlt }}>
                  <p className="font-semibold">{mode === "en" ? "Filing mode tip" : "填寫模式提醒"}</p>
                  <p className="mt-2 text-sm leading-7" style={{ color: theme.muted }}>
                    {mode === "en"
                      ? "Open the table below and work line by line against the official screen, not from memory."
                      : "把下方表格當成核對清單，逐欄對著官方畫面看，不要靠記憶硬填。"}
                  </p>
                </div>
              )}
            </Surface>

            <div className="space-y-4">
              <MobileFieldCards mode={mode} rows={filteredFields} />
              <FieldTable mode={mode} compact={compact} rows={filteredFields} />
            </div>
          </div>
        </section>

        <section id="status" className="scroll-mt-28">
          <SectionTitle
            mode={mode}
            kickerZh="結果與後續"
            kickerEn="Status"
            titleZh="送出後，不是結束，是換成查詢與保存"
            titleEn="After submission, the job shifts to checking and saving"
            noteZh="很多人送出後就不管，真正穩的做法是把查詢與保存也當成流程的一部分。"
            noteEn="Many people stop after submission. The steadier approach is to treat lookup and record keeping as part of the process."
          />

          <div className="grid gap-4 lg:grid-cols-3">
            {statusCards.map((card) => {
              const t = toneStyle(card.tone);
              return (
                <Surface key={card.code} className="p-5" style={{ background: t.bg }}>
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl" style={{ background: "rgba(255,255,255,0.68)", color: t.text }}>
                      <Icon name={card.icon} size={18} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold" style={{ color: t.text }}>{card.code}</p>
                      <Bilingual mode={mode} className="mt-3 text-sm leading-7" enClassName="text-[#5F5852]" zh={card.zh} en={card.en} />
                    </div>
                  </div>
                </Surface>
              );
            })}
          </div>

          <div className="mt-4 grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
            <Surface className="p-5 md:p-6">
              <p className="font-semibold">{mode === "en" ? "Do these right after submission" : "送出後立刻做這四件事"}</p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {afterSubmit.map((item) => (
                  <div key={item.zh} className="rounded-[18px] border p-4" style={{ borderColor: theme.line }}>
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl" style={{ background: theme.brownSoft, color: theme.deep }}>
                        <Icon name={item.icon} size={16} />
                      </div>
                      <Bilingual mode={mode} className="text-sm leading-7" enClassName="text-[#5F5852]" zh={item.zh} en={item.en} />
                    </div>
                  </div>
                ))}
              </div>
            </Surface>

            <div className="space-y-4">
              <Surface className="p-5">
                <p className="font-semibold">{mode === "en" ? "Official lookup path" : "官方查詢路徑"}</p>
                <p className="mt-2 text-sm leading-7" style={{ color: theme.muted }}>
                  {mode === "en"
                    ? "Check Existing Application, then check individual or group status. Passport number, date of birth, and application number are often needed."
                    : "從 Check Existing Application 進去，再查個人或群組狀態。常見會用到護照號碼、生日、申請編號。"}
                </p>
              </Surface>
              <Surface className="p-5" style={{ background: theme.brownSoft }}>
                <p className="font-semibold">{mode === "en" ? "Timing that matters" : "要記住的時程"}</p>
                <p className="mt-2 text-sm leading-7" style={{ color: theme.muted }}>
                  {mode === "en"
                    ? "Apply when the trip is booked. Official guidance says no later than 72 hours before boarding. Pending cases are usually updated within 72 hours."
                    : "建議訂旅程時就申請。官方建議最晚不晚於登機前 72 小時。若顯示 Pending，通常 72 小時內更新。"}
                </p>
              </Surface>
            </div>
          </div>
        </section>

        <section id="update" className="scroll-mt-28">
          <SectionTitle
            mode={mode}
            kickerZh="更新或重辦"
            kickerEn="Update"
            titleZh="下一步到底是更新，還是乾脆重辦"
            titleEn="The next move is either update or reapply"
            noteZh="這一區的價值就在於避免走錯下一步。"
            noteEn="The point of this section is to stop the wrong next move."
          />
          <div className="grid gap-4">
            <UpdateCards mode={mode} rows={updateMatrix} />
            <UpdateTable mode={mode} compact={compact} rows={updateMatrix} />
          </div>
        </section>

        <section id="mistakes" className="scroll-mt-28">
          <SectionTitle
            mode={mode}
            kickerZh="常見錯誤"
            kickerEn="Mistakes"
            titleZh="最容易出事的錯，不一定複雜，通常只是太急"
            titleEn="The most expensive mistakes are often simple, not sophisticated"
            noteZh="多數問題不是看不懂，而是太快送出。"
            noteEn="Most problems come less from complexity and more from rushing."
          />
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {mistakes.map((item) => {
              const t = toneStyle(item.tone);
              return (
                <Surface key={item.zhTitle} className="p-5" style={{ background: t.bg }}>
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl" style={{ background: "rgba(255,255,255,0.68)", color: t.text }}>
                      <Icon name={item.icon} size={18} />
                    </div>
                    <div className="min-w-0">
                      <Bilingual
                        mode={mode}
                        className=""
                        enClassName="text-[#5F5852]"
                        zh={
                          <>
                            <p className="font-semibold leading-7">{item.zhTitle}</p>
                            <p className="mt-2 text-sm leading-7">{item.zh}</p>
                          </>
                        }
                        en={
                          <>
                            <p className="font-semibold leading-7">{item.enTitle}</p>
                            <p className="mt-2 text-sm leading-7">{item.en}</p>
                          </>
                        }
                      />
                    </div>
                  </div>
                </Surface>
              );
            })}
          </div>
        </section>

        <section id="faq" className="scroll-mt-28">
          <SectionTitle
            mode={mode}
            kickerZh="問答"
            kickerEn="FAQ"
            titleZh="最常被講錯的幾個問題"
            titleEn="The questions most often answered badly"
            noteZh="把這些地方先釐清，很多模糊焦慮就會消失。"
            noteEn="Once these points are clarified, much of the usual confusion disappears."
          />
          <div className="space-y-3">
            {faqs.map((item) => (
              <FAQItem
                key={item.id}
                mode={mode}
                item={item}
                open={openFaq === item.id}
                onToggle={() => setOpenFaq(openFaq === item.id ? "" : item.id)}
              />
            ))}
          </div>
        </section>

        <section id="links" className="scroll-mt-28">
          <SectionTitle
            mode={mode}
            kickerZh="官方連結"
            kickerEn="Links"
            titleZh="回到官方來源，不用自己到處找"
            titleEn="Go back to the official sources without hunting for them"
            noteZh="讀完這頁後，直接回到對應官方頁面處理即可。"
            noteEn="After reading this page, go straight back to the matching official source."
          />
          <div className="grid gap-4 lg:grid-cols-[1.06fr_0.94fr]">
            <div className="grid gap-4 md:grid-cols-2">
              {links.map((item) => <LinkCard key={item.url} mode={mode} item={item} />)}
            </div>

            <div className="space-y-4">
              <Surface className="p-5" style={{ background: theme.brownSoft }}>
                <p className="font-semibold">{mode === "en" ? "Who this page is mainly for" : "這份頁面主要適合誰"}</p>
                <p className="mt-2 text-sm leading-7" style={{ color: theme.muted }}>
                  {mode === "en"
                    ? "This page is built for the standard, high-frequency ESTA path used by most ROC passport holders. Website, app, and language versions may present fields in slightly different order."
                    : "這份頁面聚焦一般中華民國護照持有人最常遇到的標準 ESTA 路徑。網站、App、語言版本的畫面順序可能略有不同。"}
                </p>
              </Surface>

              <Surface className="p-5">
                <p className="font-semibold">{mode === "en" ? "When to stop using this page alone" : "甚麼時候不要只靠這一頁"}</p>
                <p className="mt-2 text-sm leading-7" style={{ color: theme.muted }}>
                  {mode === "en"
                    ? "If you have prior refusals, dual nationality issues, restricted travel history, private-aircraft travel, or another special profile, move back to the official rule pages directly and treat visa evaluation seriously."
                    : "如果你有拒簽史、特殊雙重國籍、限制旅行史、私人飛機赴美、或其他非標準身分，請直接回到官方規則頁面，並認真改做簽證評估。"}
                </p>
              </Surface>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
