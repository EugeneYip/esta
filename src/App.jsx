import React, { useState } from "react";

const theme = {
  bg: "#FCFAF2",
  card: "#FFFDF8",
  line: "#DDD3C5",
  ink: "#2C2926",
  muted: "#6D645C",
  deep: "#6A4B3C",
  warm: "#F4ECE2",
  green: "#65724D",
  red: "#B85C4D",
  amber: "#A97831",
  softGreen: "#EEF2E5",
  softRed: "#FAECE9",
  softAmber: "#F8F0E4",
};

const sections = [
  { id: "overview", zh: "總覽", en: "Overview" },
  { id: "eligibility", zh: "適用判斷", en: "Eligibility" },
  { id: "prepare", zh: "申請前準備", en: "Before You Start" },
  { id: "flow", zh: "流程圖", en: "Flow" },
  { id: "fields", zh: "逐欄對照", en: "Field Guide" },
  { id: "status", zh: "結果與後續", en: "Status" },
  { id: "update", zh: "更新或重辦", en: "Update" },
  { id: "mistakes", zh: "常見錯誤", en: "Mistakes" },
  { id: "links", zh: "官方連結", en: "Links" },
];

const keyCards = [
  {
    tone: "green",
    zhTitle: "適用情境",
    enTitle: "Best Fit",
    zh: "中華民國電子護照，赴美觀光、商務、過境，單次停留不超過 90 天。",
    en: "ROC e-passport holders traveling for tourism, business, or transit, with each stay capped at 90 days.",
  },
  {
    tone: "red",
    zhTitle: "不適用情境",
    enTitle: "Not for ESTA",
    zh: "工作、正式修課讀書、長期停留、移民，或其他超出 VWP 範圍的目的。",
    en: "Not for work, for-credit study, long stays, immigration, or other purposes outside the VWP.",
  },
  {
    tone: "amber",
    zhTitle: "高風險限制",
    enTitle: "High-Risk Restrictions",
    zh: "若有特定國家旅行史、停留史，或兼具特定國籍，通常要改走簽證流程。",
    en: "Certain travel histories, presence histories, or dual nationalities usually push you into the visa track.",
  },
  {
    tone: "amber",
    zhTitle: "重要原則",
    enTitle: "Critical Rule",
    zh: "ESTA 核准不等於保證入境。最終仍由口岸 CBP 官員決定。",
    en: "ESTA approval does not guarantee admission. Final entry is decided by the CBP officer at the port of entry.",
  },
];

const restrictions = [
  {
    zh: "2011 年 3 月 1 日後曾前往或停留伊朗、伊拉克、北韓、利比亞、索馬利亞、蘇丹、敘利亞、葉門。",
    en: "Traveled to or was present in Iran, Iraq, North Korea, Libya, Somalia, Sudan, Syria, or Yemen on or after March 1, 2011.",
  },
  {
    zh: "2021 年 1 月 12 日後曾前往或停留古巴。",
    en: "Traveled to or was present in Cuba on or after January 12, 2021.",
  },
  {
    zh: "同時具有古巴、北韓、伊朗、伊拉克、蘇丹、敘利亞國籍。",
    en: "Also a national of Cuba, North Korea, Iran, Iraq, Sudan, or Syria.",
  },
  {
    zh: "若曾遭簽證拒發或資格有灰色地帶，直接評估簽證通常比盲目重送 ESTA 更穩。",
    en: "If you have prior visa refusals or a borderline eligibility profile, assessing the visa route is usually safer than repeatedly re-submitting ESTA.",
  },
];

const prepItems = [
  { zh: "中華民國電子護照正本", en: "Your ROC e-passport" },
  { zh: "護照號碼、英文姓名、發照日、到期日", en: "Passport number, legal English name, issue date, expiration date" },
  { zh: "國民身分證統一編號", en: "Your National ID number" },
  { zh: "可即時收信的 Email", en: "An email address you can actually access" },
  { zh: "住家地址與電話", en: "Home address and phone" },
  { zh: "緊急聯絡人姓名、電話、Email", en: "Emergency contact details" },
  { zh: "在美聯絡人或第一晚住宿地址", en: "U.S. point of contact or first-night stay" },
  { zh: "雇主或學校資訊", en: "Employer or school information, if applicable" },
  { zh: "付款工具", en: "Payment method" },
  { zh: "近期清楚正面人像照，若流程要求影像驗證可直接使用", en: "A recent, clear, front-facing photo in case the flow requests image verification" },
];

const quickFacts = [
  { zhLabel: "官方費用", zhValue: "US$40.27", enLabel: "Official fee", enValue: "US$40.27", tone: "amber" },
  { zhLabel: "平均填寫時間", zhValue: "約 23 分鐘", enLabel: "Estimated completion time", enValue: "About 23 minutes", tone: "default" },
  { zhLabel: "建議申請時點", zhValue: "訂旅程時就申請，最晚不晚於登機前 72 小時", enLabel: "When to apply", enValue: "Apply when travel is booked and no later than 72 hours before boarding", tone: "default" },
  { zhLabel: "有效期", zhValue: "通常 2 年，或到護照到期為止，以較早者為準", enLabel: "Validity", enValue: "Usually 2 years, or until passport expiry, whichever comes first", tone: "green" },
];

const screenFlow = [
  {
    step: "01",
    zh: "選申請路徑",
    en: "Choose the application path",
    noteZh: "第一次申請通常是 Create New Application → Individual Application。多人一起辦改走網站上的 Group of Applications。",
    noteEn: "Most first-time applicants use Create New Application → Individual Application. Group filings are better handled on the website.",
  },
  {
    step: "02",
    zh: "驗證 Email",
    en: "Verify your email",
    noteZh: "務必用你真的收得到信的信箱。驗證碼沒看到，先查垃圾郵件匣。",
    noteEn: "Use an email account you can actually access. Check spam first if the code does not arrive.",
  },
  {
    step: "03",
    zh: "掃描護照與可能的影像驗證",
    en: "Scan the passport and complete any image check",
    noteZh: "系統若自動帶入資料，不可直接相信 OCR。護照號碼、姓名、生日、發照日、到期日都要重查。",
    noteEn: "Never trust OCR blindly. Re-check the passport number, name, birth date, issue date, and expiration date.",
  },
  {
    step: "04",
    zh: "填 Applicant Information",
    en: "Complete applicant information",
    noteZh: "核心欄位全部照護照逐字填。中華民國護照持有人特別留意 PIN。",
    noteEn: "Core fields should match the passport exactly. ROC passport holders should pay special attention to PIN.",
  },
  {
    step: "05",
    zh: "填聯絡、父母、雇主、緊急聯絡人",
    en: "Add contact, parent, work, and emergency details",
    noteZh: "這些區塊目前可見於官方申請頁，不是推測欄位。",
    noteEn: "These blocks are visible on the current application flow. They are not hypothetical fields.",
  },
  {
    step: "06",
    zh: "填 Travel Information",
    en: "Add travel information",
    noteZh: "如只是經美國轉機，地址欄可填 In Transit。",
    noteEn: "If you are only transiting the U.S., you can write In Transit in the address field.",
  },
  {
    step: "07",
    zh: "回答 Eligibility Questions",
    en: "Answer eligibility questions",
    noteZh: "全部照實回答。誤填的風險通常高於被拒本身。",
    noteEn: "Answer honestly. Misrepresentation usually creates more damage than a denial by itself.",
  },
  {
    step: "08",
    zh: "Review、付款、保存申請編號",
    en: "Review, pay, and save the application number",
    noteZh: "付款後立刻截圖並保存 Application Number。ESTA 是電子化，不一定要紙本，但號碼一定要留。",
    noteEn: "After payment, save the Application Number immediately. A paper copy is not required, but the number matters.",
  },
];

const fieldGuide = [
  { field: "Issuing Country / Nationality", zh: "選 TAIWAN。", en: "Select TAIWAN.", risk: "high" },
  { field: "Passport Number", zh: "照護照資料頁逐字填。特別小心 O 與 0、I 與 1。", en: "Match the passport exactly. Be careful with O vs 0 and I vs 1.", risk: "high" },
  { field: "Family Name / First (Given) Name", zh: "依護照英文欄位拆開填，不要自行調整。", en: "Split the names exactly as shown on the passport.", risk: "high" },
  { field: "Date of Birth", zh: "依系統格式填，最常見錯誤是把月與日顛倒。", en: "Follow the system format. Month and day reversals are common.", risk: "high" },
  { field: "National Identification Number", zh: "通常填國民身分證統一編號。", en: "Usually your National ID number.", risk: "high" },
  { field: "Personal Identification Number (PIN)", zh: "對中華民國護照持有人，實務上就是國民身分證統一編號。這格不要漏。", en: "For ROC passport holders, this is practically your National ID number. Do not skip it.", risk: "high" },
  { field: "City / Country of Birth", zh: "照系統要求填。", en: "Complete as requested by the form.", risk: "medium" },
  { field: "Other Citizenship / Nationality", zh: "現在或過去若有其他國籍，必須照實填。", en: "Disclose current or former additional nationality truthfully.", risk: "high" },
  { field: "Your Contact Information", zh: "填可辨識、可對應的英文地址與聯絡方式。", en: "Use a clear English-format address and reachable contact details.", risk: "medium" },
  { field: "Social Media", zh: "目前官方頁面顯示 Optional。看到欄位時以當下畫面標示為準。", en: "Currently shown as Optional on the official page. Follow the live label on your screen.", risk: "low" },
  { field: "Parents", zh: "父母姓名欄位目前可見，建議事先想好正式英文拼法。", en: "Parent name fields are currently visible. Decide on the formal English spelling before you start.", risk: "medium" },
  { field: "Employment Information", zh: "有工作填公司資訊，是學生就填學校資訊，不要亂編。", en: "Use your real employer data, or school details if you are a student.", risk: "medium" },
  { field: "Emergency Contact Information", zh: "填一位你真的聯絡得到的人，不一定要在美國。", en: "Use someone who can genuinely be reached. They do not have to be in the U.S.", risk: "low" },
  { field: "Travel Information", zh: "有在美聯絡人或住宿就照實填。純轉機可填 In Transit。", en: "Use real U.S. contact or lodging details. Transit-only travelers can write In Transit.", risk: "medium" },
  { field: "Eligibility Questions", zh: "全部誠實作答。這是資格審查區。", en: "Answer honestly. This is the eligibility screening block.", risk: "high" },
];

const updateMatrix = [
  { label: "聯絡方式與部分旅行資訊", labelEn: "Contact details and some travel details", result: "update", zh: "通常可線上更新。", en: "Usually can be updated online." },
  { label: "護照資料", labelEn: "Passport details", result: "reapply", zh: "通常要重送新申請。", en: "Usually requires a new application." },
  { label: "國籍", labelEn: "Country of citizenship", result: "reapply", zh: "通常要重送新申請。", en: "Usually requires a new application." },
  { label: "出生日期", labelEn: "Date of birth", result: "reapply", zh: "通常要重送新申請。", en: "Usually requires a new application." },
  { label: "新護照", labelEn: "New passport", result: "reapply", zh: "必須重新申請。", en: "You must apply again." },
  { label: "姓名、性別、國籍變更", labelEn: "Name, gender, or citizenship change", result: "reapply", zh: "通常要重新申請。", en: "Usually requires reapplication." },
  { label: "ESTA 到期", labelEn: "ESTA expired", result: "reapply", zh: "無法延長或續期，需新申請。", en: "It cannot be extended or renewed. File a new application." },
];

const statusCards = [
  {
    code: "Approved",
    tone: "green",
    zh: "Authorization Approved。通常可在有效期內多次旅行，但每次停留仍受 VWP 規則限制。",
    en: "Authorization Approved. You may usually travel multiple times within the validity window, but each stay still follows VWP limits.",
  },
  {
    code: "Pending",
    tone: "amber",
    zh: "Authorization Pending。官方表示更新通常會在 72 小時內有結果。",
    en: "Authorization Pending. Official guidance says an update will usually be available within 72 hours.",
  },
  {
    code: "Not Authorized",
    tone: "red",
    zh: "Travel Not Authorized。若情況未改變，再送相同資料通常也不會改變結果，應評估簽證流程。",
    en: "Travel Not Authorized. If your circumstances have not changed, re-submitting the same profile will usually not change the outcome. Evaluate the visa route.",
  },
];

const mistakeList = [
  ["用了第三方網站或代辦頁面", "Using a third-party site instead of the official portal"],
  ["把 PIN 漏掉，或把 PIN 填錯", "Skipping or mis-entering the PIN"],
  ["自動辨識後沒有重查 OCR 結果", "Trusting OCR without re-checking"],
  ["把姓與名填反", "Reversing family name and given name"],
  ["日期格式看錯", "Using the wrong date order"],
  ["以為只是轉機就不用 ESTA", "Assuming transit does not require ESTA"],
  ["以為核准就一定能入境", "Assuming approval guarantees entry"],
  ["已被拒卻在情況未變下反覆重送", "Re-submitting after a denial when nothing has changed"],
  ["沒有保存 Application Number", "Failing to save the Application Number"],
  ["忽略兒童也要有自己的護照與 ESTA 資格", "Forgetting that children also need their own passport and ESTA eligibility"],
];

const faqs = [
  {
    id: "q1",
    qZh: "官方 App 能完全取代網站嗎？",
    qEn: "Can the official app fully replace the website?",
    aZh: "不建議這樣理解。官方 App 目前主打新個人申請與查既有申請。若你要幫一家人一起辦，網站的 Group of Applications 仍然更直接。",
    aEn: "Not entirely. The official app currently focuses on new individual applications and existing-application search. For family filings, the website remains the cleaner route because it clearly supports Group of Applications.",
  },
  {
    id: "q2",
    qZh: "自拍照現在是不是所有人都一律強制？",
    qEn: "Is the selfie now mandatory for everyone?",
    aZh: "不應這樣寫。官方首頁目前把旅客自拍列為 If Applicable。比較準確的寫法是，系統可能要求影像驗證，所以建議先準備近期、清楚、正面、未修圖的人像照。",
    aEn: "The official homepage currently labels the traveler selfie as If Applicable. The accurate reading is that image verification may appear in some flows, so you should prepare a recent, clear, front-facing photo in advance.",
  },
  {
    id: "q3",
    qZh: "ESTA 核准後一定可以入境嗎？",
    qEn: "Does ESTA approval guarantee entry?",
    aZh: "不一定。ESTA 只代表你可以搭乘符合規定的承運人赴美並在口岸請求入境。最後是否准許入境，仍由 CBP 官員決定。",
    aEn: "No. ESTA approval allows you to board an eligible carrier and request entry at the port of entry. Final admission is still decided by CBP.",
  },
  {
    id: "q4",
    qZh: "紙本 ESTA 一定要印出來嗎？",
    qEn: "Do I need to print my ESTA?",
    aZh: "官方表示 ESTA 是全電子化，不一定要帶紙本到機場。不過實務上，保存 Application Number 與核准畫面截圖仍然非常值得做。",
    aEn: "Official guidance says ESTA is fully electronic, so you do not have to bring a printed copy to the airport. In practice, keeping your Application Number and screenshots is still smart.",
  },
  {
    id: "q5",
    qZh: "兒童也需要自己的 ESTA 嗎？",
    qEn: "Do children need their own ESTA too?",
    aZh: "是。不要只替成人處理。兒童也需要自己的有效護照，並符合 ESTA 或簽證條件。",
    aEn: "Yes. Do not process only the adults. Children need their own valid passport and must separately meet ESTA or visa requirements.",
  },
];

const links = [
  { title: "ESTA 官方網站", url: "https://esta.cbp.dhs.gov/", noteZh: "申請、查狀態、看官方首頁資訊。", noteEn: "Apply, check status, and read the official homepage." },
  { title: "ESTA 官方 FAQ", url: "https://esta.cbp.dhs.gov/faq?lang=zh", noteZh: "中文 FAQ，適合先確認概念。", noteEn: "Chinese FAQ for concept checks." },
  { title: "Visa Waiver Program", url: "https://travel.state.gov/content/travel/en/us-visas/tourism-visit/visa-waiver-program.html", noteZh: "適用範圍、限制條件、VWP 說明。", noteEn: "VWP rules, purpose limits, and restriction logic." },
  { title: "如何查 ESTA 狀態", url: "https://www.help.cbp.gov/s/article/Article-1445?language=en_US", noteZh: "查詢狀態與常見結果。", noteEn: "Status lookup and outcome definitions." },
  { title: "如何更新 ESTA 資料", url: "https://www.help.cbp.gov/s/article/Article-1255?language=en_US", noteZh: "哪些欄位可更新，哪些通常要重辦。", noteEn: "What can be updated and what usually requires reapplication." },
  { title: "如何更正 ESTA 錯誤", url: "https://www.help.cbp.gov/s/article/Article-1439?language=en_US", noteZh: "送出前的更正與重查重點。", noteEn: "Pre-submission correction guidance." },
  { title: "是否需要紙本 ESTA", url: "https://www.help.cbp.gov/s/article/Article-1262?language=en_US", noteZh: "官方說明不必帶紙本，但建議留紀錄。", noteEn: "Official guidance says a printout is not required, though keeping records is wise." },
  { title: "ESTA Mobile iPhone App", url: "https://apps.apple.com/us/app/esta-mobile/id1529604353", noteZh: "目前主打新個人申請與查既有申請。", noteEn: "Currently focused on new individual applications and existing-application search." },
  { title: "ESTA Mobile Android App", url: "https://play.google.com/store/apps/details?id=gov.dhs.cbp.esta", noteZh: "官方行動版入口。", noteEn: "Official mobile entry point." },
];

function cn(...parts) {
  return parts.filter(Boolean).join(" ");
}

function cardTone(tone) {
  if (tone === "green") return { bg: theme.softGreen, text: theme.green };
  if (tone === "red") return { bg: theme.softRed, text: theme.red };
  if (tone === "amber") return { bg: theme.softAmber, text: theme.amber };
  return { bg: theme.warm, text: theme.deep };
}

function Surface({ children, className = "", style = {} }) {
  return (
    <div className={cn("rounded-[24px] border shadow-sm", className)} style={{ background: theme.card, borderColor: theme.line, ...style }}>
      {children}
    </div>
  );
}

function Bilingual({ mode, zh, en, className = "" }) {
  if (mode === "zh") return <div className={className}>{zh}</div>;
  if (mode === "en") return <div className={className}>{en}</div>;
  return (
    <div className={className}>
      <div>{zh}</div>
      <div className="mt-1 text-[#5E564F]">{en}</div>
    </div>
  );
}

function Pill({ children, tone = "default" }) {
  const t = cardTone(tone);
  return (
    <span className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold" style={{ background: t.bg, color: t.text }}>
      {children}
    </span>
  );
}

function SectionTitle({ mode, kickerZh, kickerEn, titleZh, titleEn }) {
  return (
    <div className="mb-5">
      <div className="mb-2 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em]" style={{ background: theme.warm, color: theme.deep }}>
        <span>{kickerZh}</span>
        {mode === "both" && <><span className="opacity-50">/</span><span>{kickerEn}</span></>}
      </div>
      <h2 className="text-2xl font-semibold md:text-3xl" style={{ color: theme.ink }}>
        {mode === "en" ? titleEn : titleZh}
      </h2>
      {mode === "both" && <p className="mt-1 text-sm md:text-base" style={{ color: theme.muted }}>{titleEn}</p>}
    </div>
  );
}

function ReadingSettings({ mode, setMode, compact, setCompact }) {
  const [open, setOpen] = useState(false);
  const options = [
    { id: "both", label: "雙語 / Bilingual" },
    { id: "zh", label: "中文" },
    { id: "en", label: "English" },
  ];

  return (
    <div className="fixed bottom-5 right-5 z-30 md:bottom-6 md:right-6">
      <div className="relative">
        {open && (
          <div className="absolute bottom-14 right-0 rounded-[24px] border p-3 shadow-lg" style={{ width: "min(240px, calc(100vw - 2.5rem))", background: theme.card, borderColor: theme.line }}>
            <p className="px-2 pb-2 text-xs font-semibold uppercase tracking-[0.14em]" style={{ color: theme.deep }}>
              Reading settings
            </p>
            <div className="space-y-1">
              {options.map((opt) => {
                const active = mode === opt.id;
                return (
                  <button key={opt.id} type="button" onClick={() => setMode(opt.id)} className="flex w-full items-center justify-between rounded-2xl px-3 py-3 text-sm" style={{ background: active ? theme.warm : "transparent", color: theme.ink }}>
                    <span>{opt.label}</span>
                    {active && <span>✓</span>}
                  </button>
                );
              })}
              <button type="button" onClick={() => setCompact((v) => !v)} className="flex w-full items-center justify-between rounded-2xl px-3 py-3 text-sm" style={{ background: compact ? theme.warm : "transparent", color: theme.ink }}>
                <span>精簡模式 / Compact tables</span>
                <span>{compact ? "✓" : "+"}</span>
              </button>
            </div>
          </div>
        )}
        <button type="button" onClick={() => setOpen((v) => !v)} className="inline-flex h-12 w-12 items-center justify-center rounded-full border shadow-md" style={{ background: theme.deep, borderColor: theme.deep, color: "#FFFDF8" }} aria-label="Open reading settings">
          ⚙
        </button>
      </div>
    </div>
  );
}

function MobileInfoCards({ mode, rows, type = "field" }) {
  return (
    <div className="space-y-3 md:hidden">
      {rows.map((row) => (
        <Surface key={type === "field" ? row.field : row.label} className="p-4">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="break-words font-semibold leading-6">
                {type === "field" ? row.field : mode === "en" ? row.labelEn : row.label}
              </p>
              {mode === "both" && type !== "field" && <p className="mt-1 break-words text-sm text-[#7A6E64]">{row.labelEn}</p>}
            </div>
            {type === "field" ? <Pill tone={row.risk === "high" ? "red" : row.risk === "medium" ? "amber" : "green"}>{row.risk}</Pill> : <Pill tone={row.result === "update" ? "green" : "red"}>{row.result === "update" ? "Update" : "Reapply"}</Pill>}
          </div>
          <Bilingual mode={mode} className="mt-3 text-sm leading-7" zh={<p>{row.zh}</p>} en={<p>{row.en}</p>} />
        </Surface>
      ))}
    </div>
  );
}

function DesktopFieldTable({ mode, compact }) {
  const showEnglish = mode === "both" && !compact;
  return (
    <Surface className="hidden overflow-hidden md:block">
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead style={{ background: theme.warm }}>
            <tr>
              <th className="px-4 py-4 font-semibold md:px-6">Field</th>
              <th className="px-4 py-4 font-semibold md:px-6">{mode === "en" ? "Primary note" : "中文重點"}</th>
              {showEnglish && <th className="px-4 py-4 font-semibold md:px-6">English note</th>}
              <th className="px-4 py-4 font-semibold md:px-6">Risk</th>
            </tr>
          </thead>
          <tbody>
            {fieldGuide.map((row, i) => (
              <tr key={row.field} className={i % 2 === 0 ? "" : "bg-[#FFFEFB]"} style={{ borderTop: `1px solid ${theme.line}` }}>
                <td className="px-4 py-4 align-top font-medium md:px-6">{row.field}</td>
                <td className="px-4 py-4 align-top leading-7 md:px-6">{mode === "en" ? row.en : row.zh}</td>
                {showEnglish && <td className="px-4 py-4 align-top leading-7 text-[#5E564F] md:px-6">{row.en}</td>}
                <td className="px-4 py-4 align-top md:px-6"><Pill tone={row.risk === "high" ? "red" : row.risk === "medium" ? "amber" : "green"}>{row.risk}</Pill></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Surface>
  );
}

function DesktopUpdateTable({ mode }) {
  const showEnglish = mode === "both";
  return (
    <Surface className="hidden overflow-hidden md:block">
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead style={{ background: theme.warm }}>
            <tr>
              <th className="px-4 py-4 font-semibold md:px-6">{mode === "en" ? "Item" : "項目"}</th>
              <th className="px-4 py-4 font-semibold md:px-6">Result</th>
              <th className="px-4 py-4 font-semibold md:px-6">{mode === "en" ? "Primary note" : "中文說明"}</th>
              {showEnglish && <th className="px-4 py-4 font-semibold md:px-6">English note</th>}
            </tr>
          </thead>
          <tbody>
            {updateMatrix.map((row, i) => (
              <tr key={row.label} className={i % 2 === 0 ? "" : "bg-[#FFFEFB]"} style={{ borderTop: `1px solid ${theme.line}` }}>
                <td className="px-4 py-4 align-top font-medium md:px-6">{mode === "en" ? row.labelEn : row.label}</td>
                <td className="px-4 py-4 align-top md:px-6"><Pill tone={row.result === "update" ? "green" : "red"}>{row.result === "update" ? "Update" : "Reapply"}</Pill></td>
                <td className="px-4 py-4 align-top leading-7 md:px-6">{mode === "en" ? row.en : row.zh}</td>
                {showEnglish && <td className="px-4 py-4 align-top leading-7 text-[#5E564F] md:px-6">{row.en}</td>}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Surface>
  );
}

export default function ESTAInfrastructure() {
  const [mode, setMode] = useState("both");
  const [compact, setCompact] = useState(false);
  const [openFaq, setOpenFaq] = useState("q1");

  return (
    <div className="min-h-screen" style={{ background: theme.bg, color: theme.ink }}>
      <div className="sticky top-0 z-20 border-b backdrop-blur" style={{ background: "rgba(252,250,242,0.92)", borderColor: theme.line }}>
        <div className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-4 py-3 md:px-6">
          {sections.map((s) => (
            <a key={s.id} href={`#${s.id}`} className="inline-flex shrink-0 items-center gap-2 rounded-full border px-3 py-2 text-sm transition hover:-translate-y-[1px]" style={{ borderColor: theme.line, color: theme.ink, background: theme.card }}>
              <span>{s.zh}</span>
              <span className="hidden opacity-40 sm:inline">/</span>
              <span className="hidden sm:inline">{s.en}</span>
            </a>
          ))}
        </div>
      </div>

      <ReadingSettings mode={mode} setMode={setMode} compact={compact} setCompact={setCompact} />

      <div className="mx-auto max-w-7xl space-y-8 px-4 py-6 pb-24 md:px-6 md:py-8 md:pb-28">
        <Surface className="overflow-hidden">
          <div className="grid gap-6 p-5 md:grid-cols-[1.18fr_0.82fr] md:p-8">
            <div>
              <div className="mb-4 flex flex-wrap items-center gap-2">
                <Pill tone="green">{mode === "en" ? "Tourism" : "觀光"}</Pill>
                <Pill>{mode === "en" ? "Business" : "商務"}</Pill>
                <Pill tone="amber">{mode === "en" ? "Transit" : "過境"}</Pill>
                <Pill>{mode === "en" ? "Up to 90 days" : "最長 90 天"}</Pill>
              </div>
              <h1 className="text-3xl font-semibold leading-tight md:text-5xl" style={{ color: theme.ink }}>
                中華民國護照 ESTA 申請完整指引
              </h1>
              {mode !== "zh" && <p className="mt-3 text-lg md:text-xl" style={{ color: theme.deep }}>ESTA Guide for ROC Passport Holders</p>}
              <div className="mt-5 flex flex-wrap gap-3">
                <a href="https://esta.cbp.dhs.gov/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full px-4 py-3 text-sm font-semibold text-white" style={{ background: theme.deep }}>
                  {mode === "en" ? "Official ESTA" : "官方網站"}
                </a>
                <a href="https://esta.cbp.dhs.gov/faq?lang=zh" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border px-4 py-3 text-sm font-semibold" style={{ borderColor: theme.line, color: theme.ink, background: theme.card }}>
                  {mode === "en" ? "Chinese FAQ" : "中文 FAQ"}
                </a>
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2">
              {quickFacts.map((item) => (
                <Surface key={item.zhLabel} className="p-4" style={{ background: cardTone(item.tone).bg }}>
                  <Bilingual mode={mode} className="text-xs font-semibold uppercase tracking-[0.14em] text-[#7A6E64]" zh={item.zhLabel} en={item.enLabel} />
                  <Bilingual mode={mode} className="mt-2 text-base font-semibold leading-7 text-[#2C2926]" zh={item.zhValue} en={item.enValue} />
                </Surface>
              ))}
            </div>
          </div>
        </Surface>

        <section id="overview" className="scroll-mt-28">
          <SectionTitle mode={mode} kickerZh="總覽" kickerEn="Overview" titleZh="先抓住四句話" titleEn="Four Lines to Anchor the Whole Process" />
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {keyCards.map((card) => (
              <Surface key={card.zhTitle} className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <Pill tone={card.tone}>{mode === "en" ? card.enTitle : card.zhTitle}</Pill>
                </div>
                <Bilingual mode={mode} className="mt-4" zh={<><h3 className="text-lg font-semibold">{card.zhTitle}</h3><p className="mt-2 text-sm leading-7 text-[#5E564F]">{card.zh}</p></>} en={<><h3 className="text-lg font-semibold">{card.enTitle}</h3><p className="mt-2 text-sm leading-7 text-[#5E564F]">{card.en}</p></>} />
              </Surface>
            ))}
          </div>
        </section>

        <section id="eligibility" className="scroll-mt-28">
          <SectionTitle mode={mode} kickerZh="適用判斷" kickerEn="Eligibility" titleZh="適用判斷與限制條件" titleEn="Eligibility and Restriction Logic" />
          <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
            <Surface className="p-5 md:p-6">
              <div className="grid gap-4 md:grid-cols-3">
                <div className="rounded-[20px] p-4" style={{ background: theme.softGreen }}>
                  <p className="text-sm font-semibold" style={{ color: theme.green }}>{mode === "en" ? "Use ESTA" : "可用 ESTA"}</p>
                  <p className="mt-2 text-sm leading-7">{mode === "en" ? "Tourism, business, or transit, with each stay capped at 90 days." : "觀光、商務、過境，且單次停留不超過 90 天。"}</p>
                </div>
                <div className="rounded-[20px] p-4" style={{ background: theme.softRed }}>
                  <p className="text-sm font-semibold" style={{ color: theme.red }}>{mode === "en" ? "Use a Visa" : "改走簽證"}</p>
                  <p className="mt-2 text-sm leading-7">{mode === "en" ? "Work, for-credit study, long stays, immigration, or other purposes outside the VWP." : "工作、正式讀書、長期停留、移民，或其他超出 VWP 的目的。"}</p>
                </div>
                <div className="rounded-[20px] p-4" style={{ background: theme.softAmber }}>
                  <p className="text-sm font-semibold" style={{ color: theme.amber }}>{mode === "en" ? "Re-check eligibility" : "先重看資格"}</p>
                  <p className="mt-2 text-sm leading-7">{mode === "en" ? "If you have restricted travel history, dual nationality, or prior refusal issues." : "有特定旅行史、停留史、雙重國籍、或拒簽紀錄時。"}</p>
                </div>
              </div>
              <div className="mt-5 space-y-3">
                {restrictions.map((item, idx) => (
                  <div key={idx} className="rounded-[18px] border p-4" style={{ borderColor: theme.line }}>
                    <Bilingual mode={mode} className="text-sm leading-7" zh={item.zh} en={item.en} />
                  </div>
                ))}
              </div>
            </Surface>
            <Surface className="p-5 md:p-6">
              <div className="space-y-3">
                {[
                  { qZh: "你是不是持有中華民國電子護照？", qEn: "Do you hold an ROC e-passport?", yesZh: "繼續", yesEn: "Continue", noZh: "先改看簽證或護照條件", noEn: "Check visa or passport rules first" },
                  { qZh: "目的是否為觀光、商務、過境？", qEn: "Is the purpose tourism, business, or transit?", yesZh: "繼續", yesEn: "Continue", noZh: "ESTA 不適合", noEn: "ESTA is not the right path" },
                  { qZh: "單次停留是否不超過 90 天？", qEn: "Will each stay be 90 days or less?", yesZh: "繼續", yesEn: "Continue", noZh: "改申請簽證", noEn: "Apply for a visa" },
                  { qZh: "是否有特定旅行史、古巴停留史、或特定雙重國籍？", qEn: "Do you have restricted travel history, Cuba presence, or restricted dual nationality?", yesZh: "高度可能要簽證", yesEn: "A visa is likely needed", noZh: "通常可走 ESTA", noEn: "ESTA is usually available" },
                ].map((node, i) => (
                  <div key={node.qZh} className="rounded-[22px] border p-4" style={{ borderColor: theme.line }}>
                    <div className="flex items-start gap-3">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-semibold text-white" style={{ background: theme.deep }}>{i + 1}</div>
                      <div>
                        <p className="font-medium">{mode === "en" ? node.qEn : node.qZh}</p>
                        <div className="mt-3 flex flex-wrap gap-2 text-sm">
                          <Pill tone="green">{mode === "en" ? `Yes → ${node.yesEn}` : `是 → ${node.yesZh}`}</Pill>
                          <Pill tone="red">{mode === "en" ? `No → ${node.noEn}` : `否 → ${node.noZh}`}</Pill>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Surface>
          </div>
        </section>

        <section id="prepare" className="scroll-mt-28">
          <SectionTitle mode={mode} kickerZh="申請前準備" kickerEn="Before You Start" titleZh="申請前先備好這些東西" titleEn="Prepare These Before You Start" />
          <div className="grid gap-4 lg:grid-cols-[1fr_0.88fr]">
            <Surface className="p-5 md:p-6">
              <div className="grid gap-3 sm:grid-cols-2">
                {prepItems.map((item) => (
                  <div key={item.zh} className="rounded-[20px] border p-4" style={{ borderColor: theme.line }}>
                    <Bilingual mode={mode} className="text-sm leading-7" zh={item.zh} en={item.en} />
                  </div>
                ))}
              </div>
            </Surface>
            <div className="space-y-4">
              <Surface className="p-5" style={{ background: theme.warm }}>
                <Bilingual mode={mode} zh={<><p className="font-semibold">自拍照這一題要怎麼理解才準</p><p className="mt-2 text-sm leading-7">官方目前把旅客自拍列為 If Applicable。比較穩的寫法不是「現在所有人一律強制自拍」，而是「系統可能要求影像驗證，所以建議事先準備好近期、清楚、正面、未修圖的人像照」。</p></>} en={<><p className="font-semibold">How to read the selfie requirement correctly</p><p className="mt-2 text-sm leading-7">The official site currently labels the traveler selfie as If Applicable. The safer reading is that image verification may appear in some flows, so a recent, clear, front-facing, unedited photo should be prepared in advance.</p></>} />
              </Surface>
              <Surface className="p-5">
                <Bilingual mode={mode} zh={<><p className="font-semibold">官方 App 與網站怎麼分工</p><p className="mt-2 text-sm leading-7">官方 App 目前主打新個人申請與查既有申請。若你要同時辦多位家人，網站的 Group of Applications 更完整也更直覺。</p></>} en={<><p className="font-semibold">App versus website</p><p className="mt-2 text-sm leading-7">The official app currently focuses on new individual applications and existing-application lookup. If you are filing for multiple family members, the website is more complete and more intuitive because it clearly supports group applications.</p></>} />
              </Surface>
              <Surface className="p-5">
                <Bilingual mode={mode} zh={<><p className="font-semibold">對臺灣旅客最特殊的一格</p><p className="mt-2 text-sm leading-7">官方 FAQ 明確指出，臺灣護照持有人必須提供 Passport Number 與 Personal Identification Number。實務上，PIN 對一般中華民國護照持有人就是國民身分證統一編號。</p></>} en={<><p className="font-semibold">The most Taiwan-specific field</p><p className="mt-2 text-sm leading-7">The official FAQ explicitly states that Taiwan passport holders must provide both the Passport Number and the Personal Identification Number. In practice, for most ROC passport holders, the PIN is the National ID number.</p></>} />
              </Surface>
            </div>
          </div>
        </section>

        <section id="flow" className="scroll-mt-28">
          <SectionTitle mode={mode} kickerZh="流程圖" kickerEn="Flow" titleZh="實際流程圖" titleEn="Practical Application Flow" />
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {screenFlow.map((item) => (
              <Surface key={item.step} className="p-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl text-sm font-semibold text-white" style={{ background: theme.deep }}>{item.step}</div>
                <Bilingual mode={mode} className="mt-4" zh={<><h3 className="font-semibold">{item.zh}</h3><p className="mt-2 text-sm leading-7 text-[#5E564F]">{item.noteZh}</p></>} en={<><h3 className="font-semibold">{item.en}</h3><p className="mt-2 text-sm leading-7 text-[#5E564F]">{item.noteEn}</p></>} />
              </Surface>
            ))}
          </div>
        </section>

        <section id="fields" className="scroll-mt-28">
          <SectionTitle mode={mode} kickerZh="逐欄對照" kickerEn="Field Guide" titleZh="逐欄對照版" titleEn="Field-by-Field Guidance" />
          <MobileInfoCards mode={mode} rows={fieldGuide} type="field" />
          <DesktopFieldTable mode={mode} compact={compact} />
        </section>

        <section id="status" className="scroll-mt-28">
          <SectionTitle mode={mode} kickerZh="結果與後續" kickerEn="Status" titleZh="查結果與送出後處理" titleEn="Checking Status and Handling the Result" />
          <div className="grid gap-4 lg:grid-cols-3">
            {statusCards.map((card) => (
              <Surface key={card.code} className="p-5" style={{ background: cardTone(card.tone).bg }}>
                <p className="text-sm font-semibold" style={{ color: cardTone(card.tone).text }}>{card.code}</p>
                <Bilingual mode={mode} className="mt-3 text-sm leading-7" zh={card.zh} en={card.en} />
              </Surface>
            ))}
          </div>
          <div className="mt-4 grid gap-4 lg:grid-cols-2">
            <Surface className="p-5">
              <Bilingual mode={mode} zh={<><p className="font-semibold">官方查詢路徑</p><p className="mt-2 text-sm leading-7">Check ESTA Status → Check Individual Status。通常會用到護照號碼、出生日期、申請編號。</p></>} en={<><p className="font-semibold">Official lookup path</p><p className="mt-2 text-sm leading-7">Check ESTA Status → Check Individual Status. You will usually need the passport number, birth date, and application number.</p></>} />
            </Surface>
            <Surface className="p-5">
              <Bilingual mode={mode} zh={<><p className="font-semibold">關鍵時程</p><p className="mt-2 text-sm leading-7">建議訂旅程時就申請。官方建議最晚不晚於登機前 72 小時。Pending 通常 72 小時內更新。</p></>} en={<><p className="font-semibold">Timing that matters</p><p className="mt-2 text-sm leading-7">Apply when the trip is booked. Official guidance says no later than 72 hours before boarding. Pending cases usually update within 72 hours.</p></>} />
            </Surface>
          </div>
        </section>

        <section id="update" className="scroll-mt-28">
          <SectionTitle mode={mode} kickerZh="更新或重辦" kickerEn="Update" titleZh="哪些可以更新，哪些通常要重辦" titleEn="What You Can Update and What Usually Requires Reapplication" />
          <MobileInfoCards mode={mode} rows={updateMatrix} type="update" />
          <DesktopUpdateTable mode={mode} />
        </section>

        <section id="mistakes" className="scroll-mt-28">
          <SectionTitle mode={mode} kickerZh="常見錯誤" kickerEn="Mistakes" titleZh="最容易出錯的地方" titleEn="The Mistakes That Cause the Most Trouble" />
          <div className="grid gap-4 lg:grid-cols-[1fr_0.88fr]">
            <Surface className="p-5 md:p-6">
              <div className="grid gap-3 sm:grid-cols-2">
                {mistakeList.map(([zh, en], idx) => (
                  <div key={zh} className="rounded-[20px] border p-4" style={{ borderColor: theme.line }}>
                    <div className="mb-2 inline-flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold text-white" style={{ background: theme.red }}>{idx + 1}</div>
                    <Bilingual mode={mode} className="text-sm leading-7" zh={zh} en={en} />
                  </div>
                ))}
              </div>
            </Surface>
            <div className="space-y-4">
              <Surface className="p-5" style={{ background: theme.softAmber }}>
                <Bilingual mode={mode} zh={<><p className="font-semibold">最實用的結論</p><p className="mt-2 text-sm leading-7">送出前最值得花時間的，不是多看一次首頁，而是逐格重查核心資料。若核心資料錯了，後面通常不是修改一下就好，而是整份要重辦。</p></>} en={<><p className="font-semibold">Most practical bottom line</p><p className="mt-2 text-sm leading-7">The best use of your time before submission is re-checking the core identity fields one by one. If those fields are wrong, the next step is often a fresh application.</p></>} />
              </Surface>
              <Surface className="p-5" style={{ background: theme.softRed }}>
                <Bilingual mode={mode} zh={<><p className="font-semibold">被拒後不要誤判</p><p className="mt-2 text-sm leading-7">若 ESTA 已被拒，而你的情況沒有改變，官方指引明確指出再送通常也會被拒。這種情況下，改評估簽證才是正路。</p></>} en={<><p className="font-semibold">Do not misread a denial</p><p className="mt-2 text-sm leading-7">If ESTA has already been denied and nothing in your circumstances has changed, official guidance says a new application will usually also be denied. At that point, the visa route is the realistic path forward.</p></>} />
              </Surface>
            </div>
          </div>
        </section>

        <section>
          <SectionTitle mode={mode} kickerZh="補充" kickerEn="FAQ" titleZh="常見問題" titleEn="Frequently Asked Questions" />
          <div className="space-y-3">
            {faqs.map((faq) => {
              const isOpen = openFaq === faq.id;
              return (
                <Surface key={faq.id} className="overflow-hidden">
                  <button type="button" onClick={() => setOpenFaq(isOpen ? "" : faq.id)} className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left md:px-6">
                    <Bilingual mode={mode} zh={<p className="font-semibold">{faq.qZh}</p>} en={<p className="font-semibold">{faq.qEn}</p>} />
                    <div className="shrink-0 rounded-full border px-2 py-1 text-sm" style={{ borderColor: theme.line }}>{isOpen ? "−" : "+"}</div>
                  </button>
                  {isOpen && (
                    <div className="border-t px-5 py-4 md:px-6" style={{ borderColor: theme.line }}>
                      <Bilingual mode={mode} zh={<p className="text-sm leading-7">{faq.aZh}</p>} en={<p className="text-sm leading-7">{faq.aEn}</p>} />
                    </div>
                  )}
                </Surface>
              );
            })}
          </div>
        </section>

        <section id="links" className="scroll-mt-28">
          <SectionTitle mode={mode} kickerZh="官方連結" kickerEn="Links" titleZh="官方連結與非標準情境提醒" titleEn="Official Links and Special-Case Notes" />
          <div className="grid gap-4 lg:grid-cols-[1fr_0.88fr]">
            <div className="grid gap-4 md:grid-cols-2">
              {links.map((item) => (
                <Surface key={item.url} className="p-5">
                  <div className="flex items-start justify-between gap-3">
                    <p className="font-semibold leading-7">{item.title}</p>
                    <a href={item.url} target="_blank" rel="noreferrer" className="text-sm font-semibold underline underline-offset-4" style={{ color: theme.deep }}>
                      Open
                    </a>
                  </div>
                  <Bilingual mode={mode} className="mt-2 text-sm leading-7 text-[#5E564F]" zh={item.noteZh} en={item.noteEn} />
                </Surface>
              ))}
            </div>
            <div className="space-y-4">
              <Surface className="p-5" style={{ background: theme.warm }}>
                <Bilingual mode={mode} zh={<><p className="font-semibold">這份頁面適用於誰</p><p className="mt-2 text-sm leading-7">聚焦一般中華民國護照持有人走標準 ESTA 流程的高頻情境。畫面順序可能因網站、App、語言版本略有差異。遇到差異時，以當下官方頁面為準。</p></>} en={<><p className="font-semibold">Who this page is for</p><p className="mt-2 text-sm leading-7">This page is built for the standard, high-frequency ESTA path used by most ROC passport holders. Screen order can vary slightly across the website, app, and language version. Follow the live official screen if it differs.</p></>} />
              </Surface>
              <Surface className="p-5">
                <Bilingual mode={mode} zh={<><p className="font-semibold">非標準情境要特別小心</p><p className="mt-2 text-sm leading-7">若你有拒簽史、雙重國籍、特殊身分、私人飛機承運、或其他非標準情境，請直接回到官方頁面或改走簽證判斷。若你換了新護照、姓名或國籍有變動，也不要把舊 ESTA 當成可直接沿用。</p></>} en={<><p className="font-semibold">Special cases that need extra caution</p><p className="mt-2 text-sm leading-7">If you have prior refusals, dual nationality, special status issues, private aircraft travel, or any non-standard profile, go back to the official source or evaluate the visa route directly. If you received a new passport or changed your name or citizenship, do not assume the old ESTA can simply continue to be used.</p></>} />
              </Surface>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
