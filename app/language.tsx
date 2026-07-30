"use client";
import { createContext, useContext, useEffect, useRef, useState } from "react";

type Language = "en" | "ar";
const LanguageContext = createContext<{
  lang: Language;
  setLang: (value: Language) => void;
  t: (value: string) => string;
}>({ lang: "en", setLang: () => {}, t: (v) => v });

export const arabic: Record<string, string> = {
  Verdant: "فيردانت",
  Home: "الرئيسية",
  Platform: "المنصة",
  Handbook: "الدليل",
  "Sign in": "تسجيل الدخول",
  "Start free": "ابدأ مجاناً",
  "Open app": "فتح التطبيق",
  "Open your farm": "افتح مزرعتك",
  "Need help?": "هل تحتاج إلى مساعدة؟",
  "Sign out": "تسجيل الخروج",
  Today: "اليوم",
  "All records current": "جميع السجلات محدّثة",
  "Tuesday, July 29": "الثلاثاء، ٢٩ يوليو",
  "Two priorities need attention before the afternoon shift.":
    "هناك أولويتان تحتاجان إلى اهتمام قبل مناوبة بعد الظهر.",
  "Check water line · North Barn": "افحص خط المياه · الحظيرة الشمالية",
  "Assigned to Omar · Due 10:30": "مسندة إلى عمر · الموعد ١٠:٣٠",
  "Review feed delivery": "راجع توريد الأعلاف",
  "1.8 days of dairy ration remaining": "متبقي ١٫٨ يوم من حصة الأبقار الحلوب",
  Open: "فتح",
  "EVERYTHING IN ITS PLACE": "كل شيء في مكانه",
  "MADE FOR DAILY FARM WORK": "مصمم للعمل اليومي في المزرعة",
  "A BETTER OPERATING RHYTHM": "وتيرة تشغيل أفضل",
  "START WITH WHAT YOU HAVE": "ابدأ بما لديك",
  "Bring the whole farm into focus.": "اجعل صورة المزرعة كاملة وواضحة.",
  "Set up your workspace and give every day a clear plan.":
    "جهّز مساحة عملك وامنح كل يوم خطة واضحة.",
  "THE FARM MANAGEMENT PLATFORM": "منصة إدارة المزارع",
  "One farm. One clear plan.": "مزرعة واحدة. خطة واضحة.",
  "Run daily operations, protect margins, and keep your entire team aligned—from the field to the office.":
    "أدِر العمليات اليومية، واحمِ هوامش الربح، وحافظ على تنسيق فريقك بالكامل—من الحقل إلى المكتب.",
  "Start managing your farm": "ابدأ إدارة مزرعتك",
  "See how Verdant works →": "اكتشف كيف يعمل فيردانت ←",
  "Everything your farm needs to move forward": "كل ما تحتاجه مزرعتك للتقدم",
  "Verdant brings livestock, labour, resources, finances, and daily work into one dependable system—so fewer things fall through the cracks.":
    "يجمع فيردانت الثروة الحيوانية والعمالة والموارد والمال والعمل اليومي في نظام واحد موثوق—حتى لا تضيع أي تفاصيل مهمة.",
  "Built for the people who keep farms running":
    "مصمم لمن يديرون المزارع فعلياً",
  "Spend less time chasing updates. Give every worker a clear next step, spot problems earlier, and make decisions from records you can trust.":
    "اقضِ وقتاً أقل في ملاحقة التحديثات. امنح كل عامل خطوة تالية واضحة، واكتشف المشكلات مبكراً، واتخذ قرارات مبنية على سجلات موثوقة.",
  "Know what needs attention": "اعرف ما يحتاج إلى اهتمام",
  "See overdue work, animal concerns, low supplies, and unusual costs before they become bigger problems.":
    "شاهد الأعمال المتأخرة ومخاوف الحيوانات ونقص الإمدادات والتكاليف غير المعتادة قبل أن تتحول إلى مشكلات أكبر.",
  "Give the team a clear day": "امنح الفريق يوماً واضحاً",
  "Turn farm priorities into assigned work with owners, due dates, status, and a shared record of completion.":
    "حوّل أولويات المزرعة إلى أعمال مسندة بمسؤولين ومواعيد وحالات وسجل مشترك للإنجاز.",
  "Protect every dollar and litre": "احمِ كل دولار وكل لتر",
  "Connect spending, feed, water, energy, and production records to understand where the farm is gaining or losing ground.":
    "اربط الإنفاق والأعلاف والمياه والطاقة وسجلات الإنتاج لتفهم أين تتقدم المزرعة وأين تتراجع.",
  "From morning checks to monthly decisions":
    "من فحوصات الصباح إلى القرارات الشهرية",
  "Set up your operation": "جهّز عملياتك",
  "Create the farm, invite the team, and register the animals and resources you manage.":
    "أنشئ المزرعة، وأضف الفريق، وسجّل الحيوانات والموارد التي تديرها.",
  "Run the day": "أدِر يومك",
  "Assign work, record events, and keep the right people informed as conditions change.":
    "أسند الأعمال، وسجّل الأحداث، وأبقِ الأشخاص المناسبين على اطلاع مع تغيّر الظروف.",
  "Improve with evidence": "تحسّن بالأدلة",
  "Use consistent records to find waste, compare performance, and plan the next season with confidence.":
    "استخدم سجلات منتظمة لاكتشاف الهدر ومقارنة الأداء والتخطيط للموسم القادم بثقة.",
  Livestock: "الثروة الحيوانية",
  Workforce: "فريق العمل",
  Resources: "الموارد",
  Finance: "المالية",
  Analytics: "التحليلات",
  Automations: "الأتمتة",
  Overview: "نظرة عامة",
  "A complete record for every animal": "سجل متكامل لكل حيوان",
  "Start empty, follow a short setup guide, and build an accurate operating history over time.":
    "ابدأ بمساحة فارغة، واتبع دليل إعداد قصيراً، وابنِ سجلاً تشغيلياً دقيقاً مع مرور الوقت.",
  "Keep identity, health, weight, nutrition, production, and care history together for faster, safer decisions.":
    "احتفظ بالهوية والصحة والوزن والتغذية والإنتاج وسجل الرعاية معاً لاتخاذ قرارات أسرع وأكثر أماناً.",
  "Work that reaches the right person": "عمل يصل إلى الشخص المناسب",
  "Plan shifts and tasks, clarify responsibility, and preserve a reliable record of what was done and when.":
    "خطط للمناوبات والمهام، وحدد المسؤوليات، واحتفظ بسجل موثوق لما أُنجز وموعد إنجازه.",
  "A true view of farm consumption": "صورة حقيقية لاستهلاك المزرعة",
  "Track water, electricity, feed, fuel, and waste by area to reveal leaks, shortages, and avoidable cost.":
    "تتبّع المياه والكهرباء والأعلاف والوقود والنفايات حسب المنطقة لكشف التسربات والنقص والتكاليف القابلة للتجنب.",
  "Simple finances for real operations": "إدارة مالية بسيطة للعمليات الحقيقية",
  "Record income, bills, purchases, and payroll in the same place where operational decisions are made.":
    "سجّل الدخل والفواتير والمشتريات والرواتب في المكان نفسه الذي تُتخذ فيه القرارات التشغيلية.",
  "Useful from day one. Stronger every season.":
    "مفيد من اليوم الأول. أقوى مع كل موسم.",
  "Verdant starts with your operation—not a generic demo. Add what you manage today, then build a dependable farm history one action at a time.":
    "يبدأ فيردانت بعملياتك أنت—لا بعرض تجريبي عام. أضف ما تديره اليوم، ثم ابنِ سجلاً موثوقاً للمزرعة خطوة بخطوة.",
  "Start your farm workspace": "ابدأ مساحة عمل مزرعتك",
  "© 2026 Verdant Farm OS": "© ٢٠٢٦ نظام فيردانت للمزارع",
  "WELCOME BACK": "مرحباً بعودتك",
  "START YOUR FARM": "ابدأ مزرعتك",
  "Create your account": "أنشئ حسابك",
  "Sign in to Verdant": "سجّل الدخول إلى فيردانت",
  "Your farm records stay private to your workspace.":
    "تبقى سجلات مزرعتك خاصة بمساحة عملك.",
  "Full name": "الاسم الكامل",
  "Email address": "البريد الإلكتروني",
  Password: "كلمة المرور",
  "Create account": "إنشاء الحساب",
  "Please wait…": "يرجى الانتظار…",
  "New to Verdant? Create an account": "جديد في فيردانت؟ أنشئ حساباً",
  "Already have an account? Sign in": "لديك حساب؟ سجّل الدخول",
  "ONE CLEAR WORKSPACE": "مساحة عمل واحدة واضحة",
  "Real farm data.": "بيانات مزرعة حقيقية.",
  "Nothing invented.": "لا شيء مُختلق.",
  "Start with your own operation, follow a short setup guide, and build an accurate working history over time.":
    "ابدأ بعملياتك، واتبع دليل إعداد قصيراً، وابنِ سجلاً عملياً دقيقاً مع الوقت.",
  "Explore the complete handbook →": "استكشف الدليل الكامل ←",
  "Loading your farm…": "جارٍ تحميل مزرعتك…",
  "Check your email to confirm your account, then sign in.":
    "تحقق من بريدك لتأكيد الحساب، ثم سجّل الدخول.",
  "Farm setup": "إعداد المزرعة",
  "Name your workspace": "سمِّ مساحة العمل",
  "Describe the operation": "صِف العمليات",
  "Set the team size": "حدد حجم الفريق",
  "Your empty farm is ready": "مزرعتك الفارغة جاهزة",
  "This is the farm name your team will see.":
    "هذا هو اسم المزرعة الذي سيراه فريقك.",
  "We use this only to organize your workspace—not to create pretend data.":
    "نستخدم هذا فقط لتنظيم مساحة العمل—ولا ننشئ بيانات وهمية.",
  "You can add each person after setup.": "يمكنك إضافة كل شخص بعد الإعداد.",
  "Next, the dashboard will guide you to register animals, add people and log the first records.":
    "بعد ذلك سترشدك لوحة التحكم لتسجيل الحيوانات وإضافة الأشخاص وتدوين السجلات الأولى.",
  "Farm or operation name": "اسم المزرعة أو المنشأة",
  Country: "الدولة",
  "Province, state or region": "المحافظة أو الولاية أو المنطقة",
  "Primary operation type": "نوع النشاط الرئيسي",
  "Approximate land area": "مساحة الأرض التقريبية",
  "Approximate number of people": "العدد التقريبي للأشخاص",
  "No sample animals or transactions": "لا حيوانات أو معاملات تجريبية",
  "Guided first actions": "خطوات أولى موجهة",
  "All modules available": "جميع الأقسام متاحة",
  Back: "رجوع",
  Continue: "متابعة",
  "Creating…": "جارٍ الإنشاء…",
  "Enter dashboard": "دخول لوحة التحكم",
  TODAY: "اليوم",
  "Good morning.": "صباح الخير.",
  "Finish the setup guide to make this dashboard useful.":
    "أكمل دليل الإعداد لتصبح لوحة التحكم مفيدة.",
  "Your farm records are ready for today’s work.":
    "سجلات مزرعتك جاهزة لعمل اليوم.",
  "Start here": "ابدأ هنا",
  "Each step creates a real record. Skip anything that does not apply.":
    "كل خطوة تنشئ سجلاً حقيقياً. تجاوز ما لا ينطبق عليك.",
  "Register your first animal": "سجّل أول حيوان",
  "Create the first individual livestock record.":
    "أنشئ أول سجل فردي للثروة الحيوانية.",
  "Add a team member": "أضف عضواً للفريق",
  "Build the team before assigning work.": "كوّن الفريق قبل إسناد العمل.",
  "Plan today’s work": "خطط لعمل اليوم",
  "Create and assign the first farm task.": "أنشئ وأسند أول مهمة في المزرعة.",
  "Log a resource reading": "سجّل قراءة مورد",
  "Start measuring water, power, feed or fuel.":
    "ابدأ قياس المياه أو الكهرباء أو الأعلاف أو الوقود.",
  "Record farm finances": "سجّل مالية المزرعة",
  "Add the first real income or expense.": "أضف أول دخل أو مصروف حقيقي.",
  Complete: "مكتمل",
  View: "عرض",
  Start: "ابدأ",
  "Farm at a glance": "المزرعة في لمحة",
  Animals: "الحيوانات",
  People: "الأشخاص",
  "Open tasks": "المهام المفتوحة",
  "Resource readings": "قراءات الموارد",
  Transactions: "المعاملات",
  "Open →": "فتح ←",
  "setup steps": "خطوات إعداد",
  "Every animal and its current care information.":
    "كل حيوان ومعلومات رعايته الحالية.",
  "Register animal": "تسجيل حيوان",
  "Your farm team and the work assigned to them.":
    "فريق مزرعتك والأعمال المسندة إليهم.",
  "Add person": "إضافة شخص",
  "Actual utility, supply and consumption readings.":
    "قراءات فعلية للمرافق والإمدادات والاستهلاك.",
  "Log reading": "تسجيل قراءة",
  "Income and expenses recorded by your farm.":
    "الدخل والمصروفات المسجلة في مزرعتك.",
  "Add transaction": "إضافة معاملة",
  "Simple rules for repeatable farm operations.":
    "قواعد بسيطة لعمليات المزرعة المتكررة.",
  "Create automation": "إنشاء أتمتة",
  "Patterns calculated only from records in your workspace.":
    "أنماط محسوبة فقط من سجلات مساحة عملك.",
  "No analytics yet": "لا توجد تحليلات بعد",
  "Analytics appears after you add livestock, resource, or finance records. Nothing is estimated or invented.":
    "تظهر التحليلات بعد إضافة سجلات الثروة الحيوانية أو الموارد أو المالية. لا توجد تقديرات أو بيانات مختلقة.",
  "Learn what to record →": "تعرّف على ما يجب تسجيله ←",
  "Livestock recorded": "الحيوانات المسجلة",
  "Total resource readings": "إجمالي قراءات الموارد",
  "Net recorded cash flow": "صافي التدفق النقدي المسجل",
  "More useful trends appear as you consistently record weights, consumption, production and transactions.":
    "تظهر اتجاهات أكثر فائدة عند تسجيل الأوزان والاستهلاك والإنتاج والمعاملات بانتظام.",
  "No livestock records yet": "لا توجد سجلات حيوانات بعد",
  "No workforce records yet": "لا توجد سجلات فريق بعد",
  "No resources records yet": "لا توجد سجلات موارد بعد",
  "No finance records yet": "لا توجد سجلات مالية بعد",
  "No automations records yet": "لا توجد سجلات أتمتة بعد",
  "This area stays empty until you add real farm information. Your first record will appear here immediately.":
    "تبقى هذه المساحة فارغة حتى تضيف معلومات حقيقية عن المزرعة. سيظهر سجلك الأول هنا فوراً.",
  "How this section works →": "كيف يعمل هذا القسم ←",
  "Newest first": "الأحدث أولاً",
  record: "سجل",
  records: "سجلات",
  Active: "نشط",
  "NEW RECORD": "سجل جديد",
  Cancel: "إلغاء",
  "Save record": "حفظ السجل",
  "Saving…": "جارٍ الحفظ…",
  RECORD: "سجل",
  "Record details": "تفاصيل السجل",
  "Every value shown here comes from this saved farm record.":
    "كل قيمة معروضة هنا مأخوذة من سجل المزرعة المحفوظ.",
  "Tag / ID": "الوسم / المعرّف",
  Name: "الاسم",
  Species: "النوع",
  Breed: "السلالة",
  "Weight (kg)": "الوزن (كغ)",
  "Daily feed (kg)": "العلف اليومي (كغ)",
  Role: "الدور",
  Email: "البريد الإلكتروني",
  Phone: "الهاتف",
  Type: "النوع",
  "Area / zone": "المنطقة",
  Amount: "المبلغ",
  Unit: "الوحدة",
  Notes: "ملاحظات",
  "Income or expense": "دخل أم مصروف",
  "Supplier / customer": "المورّد / العميل",
  Category: "الفئة",
  Description: "الوصف",
  "Rule name": "اسم القاعدة",
  "When should it run?": "متى يجب تشغيلها؟",
  "Task title": "عنوان المهمة",
  Instructions: "التعليمات",
  Status: "الحالة",
  Priority: "الأولوية",
  "Due date and time": "تاريخ ووقت الاستحقاق",
  income: "دخل",
  expense: "مصروف",
  water: "مياه",
  electricity: "كهرباء",
  feed: "أعلاف",
  fuel: "وقود",
  waste: "نفايات",
  other: "أخرى",
  cattle: "أبقار",
  sheep: "أغنام",
  goat: "ماعز",
  poultry: "دواجن",
  horse: "خيول",
  scheduled: "مجدولة",
  "in progress": "قيد التنفيذ",
  blocked: "متوقفة",
  completed: "مكتملة",
  low: "منخفضة",
  normal: "عادية",
  high: "عالية",
  urgent: "عاجلة",
  "VERDANT HANDBOOK": "دليل فيردانت",
  "How to run every part": "كيفية إدارة كل جزء",
  "of your farm workspace.": "من مساحة عمل مزرعتك.",
  "Practical instructions for first setup, daily work, unusual situations, privacy and reliable records.":
    "تعليمات عملية للإعداد الأول والعمل اليومي والحالات غير المعتادة والخصوصية والسجلات الموثوقة.",
  Contents: "المحتويات",
  "Getting started": "البدء",
  "Livestock management": "إدارة الثروة الحيوانية",
  "Workforce and tasks": "فريق العمل والمهام",
  "Resource tracking": "تتبّع الموارد",
  "Financial records": "السجلات المالية",
  "Using analytics": "استخدام التحليلات",
  "Safe automations": "الأتمتة الآمنة",
  "Common situations": "الحالات الشائعة",
  "Privacy, access and recovery": "الخصوصية والوصول والاستعادة",
  "Ready to work?": "جاهز للعمل؟",
  "Open Verdant and follow the first incomplete setup action.":
    "افتح فيردانت واتبع أول خطوة إعداد غير مكتملة.",
};

function translate(value: string) {
  const clean = value.trim();
  if (arabic[clean]) return arabic[clean];
  const step = clean.match(/^STEP (\d+) OF (\d+)$/);
  if (step) return `الخطوة ${step[1]} من ${step[2]}`;
  const count = clean.match(/^(\d+) (record|records)$/);
  if (count) return `${count[1]} ${Number(count[1]) === 1 ? "سجل" : "سجلات"}`;
  return clean;
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>("en");
  const originalsRef = useRef(new WeakMap<Node, string>());
  const appliedRef = useRef(new WeakMap<Node, string>());
  useEffect(() => {
    setLangState(
      (localStorage.getItem("verdant-language") as Language) || "en",
    );
  }, []);
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    document.body.classList.toggle("rtl", lang === "ar");
    localStorage.setItem("verdant-language", lang);
    const originals = originalsRef.current;
    const applied = appliedRef.current;
    const run = () => {
      const walker = document.createTreeWalker(
        document.body,
        NodeFilter.SHOW_TEXT,
      );
      let node;
      while ((node = walker.nextNode())) {
        if (
          node.parentElement?.closest("[data-language-control]") ||
          !node.textContent?.trim()
        )
          continue;
        const current = node.textContent || "";
        if (
          !originals.has(node) ||
          (applied.has(node) && applied.get(node) !== current)
        )
          originals.set(node, current);
        const source = originals.get(node) || current;
        const lead = source.match(/^\s*/)?.[0] || "",
          trail = source.match(/\s*$/)?.[0] || "";
        const result =
          lang === "ar" ? lead + translate(source) + trail : source;
        if (current !== result) node.textContent = result;
        applied.set(node, result);
      }
      document
        .querySelectorAll<HTMLInputElement>("input[placeholder]")
        .forEach((el) => {
          if (!el.dataset.enPlaceholder)
            el.dataset.enPlaceholder = el.placeholder;
          el.placeholder =
            lang === "ar"
              ? translate(el.dataset.enPlaceholder)
              : el.dataset.enPlaceholder;
        });
    };
    run();
    const observer = new MutationObserver(() => requestAnimationFrame(run));
    observer.observe(document.body, {
      subtree: true,
      childList: true,
      characterData: true,
    });
    return () => observer.disconnect();
  }, [lang]);
  const setLang = (value: Language) => setLangState(value);
  return (
    <LanguageContext.Provider
      value={{ lang, setLang, t: (v) => (lang === "ar" ? translate(v) : v) }}
    >
      {children}
      <button
        data-language-control
        className="language-control"
        onClick={() => setLang(lang === "en" ? "ar" : "en")}
        aria-label={
          lang === "en" ? "Switch to Arabic" : "التبديل إلى الإنجليزية"
        }
      >
        <b>{lang === "en" ? "ع" : "EN"}</b>
        <span>{lang === "en" ? "العربية" : "English"}</span>
      </button>
    </LanguageContext.Provider>
  );
}
export const useLanguage = () => useContext(LanguageContext);
