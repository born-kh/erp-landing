import type { Lang } from "./lang";

/**
 * Proof, security and FAQ content.
 *
 * `placeholder: true` marks EXAMPLE content (invented client names, numbers, a sample testimonial,
 * FAQ answers to confirm). Replace it with real data and set the flag to false.
 * A production build (real SITE_URL) refuses to run while a flag is still true, see scripts/check-content.mjs.
 */
export type Plan = {
  name: string;
  desc: string;
  /** Monthly price in the local currency; null means "on request". */
  price: number | null;
  features: string[];
  popular?: boolean;
};

export type Content = {
  problem: { title: string; text: string; items: [string, string][] };
  pricing: {
    placeholder: boolean;
    title: string;
    text: string;
    /** Labels of the month / half-year / year switch. */
    periods: [string, string, string];
    /** Discount in percent for each period. */
    discounts: [number, number, number];
    months: [number, number, number];
    currency: string;
    perMonth: string;
    billed: string;
    onRequest: string;
    popular: string;
    cta: string;
    note: string;
    plans: Plan[];
    extrasTitle: string;
    extras: [string, string][];
  };
  proof: {
    placeholder: boolean;
    title: string;
    logos: string[];
    stats: { value: string; label: string }[];
    quote: { text: string; name: string; role: string };
  };
  security: { title: string; text: string; items: [string, string][] };
  faq: { placeholder: boolean; title: string; items: [string, string][] };
};

export const CONTENT: Record<Lang, Content> = {
  ru: {
    problem: {
      title: "Знакомая ситуация?",
      text: "Если хоть один пункт про вас, система заменит сразу несколько таблиц, чатов и стопок бумаги.",
      items: [
        ["Excel вместо CRM", "Каждый менеджер ведёт свой файл. Клиенты и история сделки теряются."],
        ["Договорённости в мессенджерах", "Бронь обещали в чате: кто, когда и на каких условиях? Никто уже не помнит."],
        ["Договоры вручную", "На каждый договор час правок: опечатки, неверные реквизиты, разные версии файла."],
        ["Рассрочка в тетради", "Кто и сколько заплатил, какой остаток и когда следующий платёж: считаем по тетради."],
      ],
    },
    pricing: {
      placeholder: true,
      title: "Простые тарифы",
      text: "Помесячная подписка без скрытых платежей. Все обновления входят в каждый тариф.",
      periods: ["Месяц", "Полгода", "Год"],
      discounts: [0, 10, 15],
      months: [1, 6, 12],
      currency: "сомони",
      perMonth: "в месяц",
      billed: "К оплате",
      onRequest: "По запросу",
      popular: "Популярный",
      cta: "Выбрать тариф",
      note: "14 дней бесплатно, без привязки карты.",
      plans: [
        {
          name: "Старт",
          desc: "Для небольшого застройщика с одним-двумя объектами",
          price: 400,
          features: ["1 объект", "3 пользователя", "Шахматка и клиенты", "Договоры в PDF и Word", "Рассрочка и график платежей", "Поддержка по email и в чате"],
        },
        {
          name: "Бизнес",
          desc: "Для растущей компании с несколькими объектами",
          price: 800,
          popular: true,
          features: ["До 5 объектов", "10 пользователей", "Всё из тарифа «Старт»", "Роли, права и журнал действий", "Расширенные отчёты и аналитика", "Мобильное приложение", "Приоритетная поддержка"],
        },
        {
          name: "Корпоративный",
          desc: "Для крупных застройщиков и холдингов",
          price: null,
          features: ["Без ограничений по объектам", "Без ограничений по пользователям", "Всё из тарифа «Бизнес»", "Интеграции (1С и другие)", "Перенос данных из Excel и 1С", "Персональный менеджер"],
        },
      ],
      extrasTitle: "Дополнительные услуги",
      extras: [
        ["Дополнительный пользователь", "40 сомони / мес"],
        ["Дополнительный объект", "100 сомони / мес"],
        ["Перенос данных из Excel или 1С", "от 1 500 сомони разово"],
        ["Интеграция по заданию", "от 8 000 сомони разово"],
      ],
    },
    proof: {
      placeholder: true,
      title: "Нам доверяют застройщики",
      logos: ["Строй Альфа", "Дом Групп", "Арка", "Горизонт", "Монолит", "Сфера"],
      stats: [
        { value: "120+", label: "квартир оформлено в системе" },
        { value: "3", label: "проекта на платформе" },
        { value: "100%", label: "платежей с графиком и остатком" },
      ],
      quote: {
        text: "С системой отдел продаж видит свободные квартиры в реальном времени, а бухгалтерия — график платежей без тетрадей и Excel.",
        name: "Фарход Рахимов",
        role: "Директор по продажам, Строй Альфа",
      },
    },
    security: {
      title: "Под контролем и без сюрпризов",
      text: "Роли и права, журнал действий и выгрузка данных: всё, чтобы спокойно доверить системе продажи и деньги.",
      items: [
        ["Роли и права", "Владелец, менеджер, кассир: каждый видит и делает только своё."],
        ["Журнал действий", "Кто и когда создал, изменил или удалил запись."],
        ["Ваши данные — ваши", "Отчёты в Excel и документы в PDF и Word в любой момент."],
        ["Импорт из Excel", "Клиентов можно загрузить из файла Excel или CSV за один шаг."],
      ],
    },
    faq: {
      placeholder: true,
      title: "Частые вопросы",
      items: [
        ["Как начать работу?", "Оставьте заявку на демо: покажем систему на вашем сценарии и поможем создать первый объект."],
        ["Сколько занимает запуск?", "Базовый запуск занимает от одного до нескольких дней, в зависимости от объёма данных и количества объектов."],
        ["Можно ли перенести клиентов из Excel?", "Да. Клиентов можно загрузить из файла Excel или CSV, система проверит колонки перед загрузкой."],
        ["Какие документы формирует система?", "Договоры по вашим шаблонам: данные клиента, объекта и застройщика подставляются сами, готовый файл скачивается в PDF или Word."],
        ["Есть ли мобильное приложение?", "Да, для Android и iOS: шахматка, объекты и планировки всегда под рукой."],
        ["Что с данными, если я перестану пользоваться системой?", "Данные остаются вашими. Перед отключением можно выгрузить основные отчёты и документы."],
      ],
    },
  },
  tg: {
    problem: {
      title: "Ҳолати шинос?",
      text: "Агар ҳатто як банд ба шумо рост ояд, система якбора якчанд ҷадвал, чат ва кӯҳи коғазро иваз мекунад.",
      items: [
        ["Excel ба ҷои CRM", "Ҳар менеҷер файли худро дорад. Мизоҷон ва таърихи муомила гум мешаванд."],
        ["Созишҳо дар мессенгерҳо", "Брон дар чат ваъда шуд: кӣ, кай ва бо кадом шартҳо? Касе дигар дар ёд надорад."],
        ["Шартномаҳо бо дасти худ", "Барои ҳар шартнома як соат ислоҳ: хатогиҳо, реквизитҳои нодуруст, версияҳои гуногун."],
        ["Қисмбандӣ дар дафтар", "Кӣ ва чӣ қадар пардохт кард, боқимонда чанд аст ва пардохти навбатӣ кай: аз дафтар ҳисоб мекунем."],
      ],
    },
    pricing: {
      placeholder: true,
      title: "Тарифҳои одӣ",
      text: "Обунаи моҳона бе пардохтҳои пинҳонӣ. Ҳамаи навсозиҳо дар ҳар тариф дохил аст.",
      periods: ["Моҳ", "Нимсола", "Сол"],
      discounts: [0, 10, 15],
      months: [1, 6, 12],
      currency: "сомонӣ",
      perMonth: "дар як моҳ",
      billed: "Барои пардохт",
      onRequest: "Аз рӯи дархост",
      popular: "Маъмул",
      cta: "Интихоби тариф",
      note: "14 рӯз ройгон, бе пайваст кардани корт.",
      plans: [
        {
          name: "Оғоз",
          desc: "Барои бунёдкори хурд бо як-ду объект",
          price: 400,
          features: ["1 объект", "3 корбар", "Шахматка ва мизоҷон", "Шартномаҳо дар PDF ва Word", "Қисмбандӣ ва ҷадвали пардохт", "Дастгирӣ тавассути email ва чат"],
        },
        {
          name: "Тиҷорат",
          desc: "Барои ширкати афзоянда бо якчанд объект",
          price: 800,
          popular: true,
          features: ["То 5 объект", "10 корбар", "Ҳамаи аз тарифи «Оғоз»", "Нақшҳо, ҳуқуқҳо ва ҷурнали амалҳо", "Ҳисоботи васеъ ва таҳлил", "Барномаи мобилӣ", "Дастгирии афзалиятнок"],
        },
        {
          name: "Корпоративӣ",
          desc: "Барои бунёдкорони калон ва ҳолдингҳо",
          price: null,
          features: ["Бе маҳдудият дар объектҳо", "Бе маҳдудият дар корбарон", "Ҳамаи аз тарифи «Тиҷорат»", "Интегратсия (1С ва дигарон)", "Интиқоли маълумот аз Excel ва 1С", "Менеҷери шахсӣ"],
        },
      ],
      extrasTitle: "Хизматҳои иловагӣ",
      extras: [
        ["Корбари иловагӣ", "40 сомонӣ / моҳ"],
        ["Объекти иловагӣ", "100 сомонӣ / моҳ"],
        ["Интиқоли маълумот аз Excel ё 1С", "аз 1 500 сомонӣ яқинбора"],
        ["Интегратсия аз рӯи супориш", "аз 8 000 сомонӣ яқинбора"],
      ],
    },
    proof: {
      placeholder: true,
      title: "Бунёдкорон ба мо боварӣ доранд",
      logos: ["Строй Альфа", "Дом Групп", "Арка", "Горизонт", "Монолит", "Сфера"],
      stats: [
        { value: "120+", label: "хона дар система расмӣ шудааст" },
        { value: "3", label: "лоиҳа дар платформа" },
        { value: "100%", label: "пардохтҳо бо ҷадвал ва боқимонда" },
      ],
      quote: {
        text: "Бо система шӯъбаи фурӯш хонаҳои холиро дар вақти воқеӣ мебинад, ҳисобдорӣ — ҷадвали пардохтҳоро бе дафтар ва Excel.",
        name: "Фарҳод Раҳимов",
        role: "Директори фурӯш, Строй Альфа",
      },
    },
    security: {
      title: "Зери назорат ва бе ҳайрат",
      text: "Нақшҳо ва ҳуқуқҳо, ҷурнали амалҳо ва содирот: ҳама барои боварии фурӯш ва пул ба система.",
      items: [
        ["Нақшҳо ва ҳуқуқҳо", "Соҳиб, менеҷер, хазинадор: ҳар кас танҳо кори худро мебинад ва мекунад."],
        ["Ҷурнали амалҳо", "Кӣ ва кай сабтро сохт, тағйир дод ё нест кард."],
        ["Маълумоти шумо — аз они шумо", "Ҳисоботҳо дар Excel ва ҳуҷҷатҳо дар PDF ва Word дар ҳар лаҳза."],
        ["Воридот аз Excel", "Мизоҷонро аз файли Excel ё CSV дар як қадам бор кардан мумкин аст."],
      ],
    },
    faq: {
      placeholder: true,
      title: "Саволҳои маъмул",
      items: [
        ["Чӣ тавр оғоз кунам?", "Дархости намоиш гузоред: система дар сенарияи шумо нишон дода мешавад ва объекти аввалро эҷод мекунем."],
        ["Оғоз чӣ қадар вақт мегирад?", "Оғози асосӣ аз як то якчанд рӯз, вобаста аз ҳаҷми маълумот ва шумораи объектҳо."],
        ["Оё мизоҷонро аз Excel интиқол додан мумкин аст?", "Бале. Мизоҷонро аз файли Excel ё CSV бор кардан мумкин аст, система сутунҳоро пеш аз бор санҷад."],
        ["Система кадом ҳуҷҷатҳоро месозад?", "Шартномаҳо аз рӯи шаблонҳои шумо: маълумоти мизоҷ, объект ва бунёдкор худ ҷой мешавад, файл дар PDF ё Word зеркашӣ мешавад."],
        ["Оё барномаи мобилӣ ҳаст?", "Бале, барои Android ва iOS: шахматка, объектҳо ва нақшаҳо ҳамеша дар даст."],
        ["Агар истифодаро қатъ кунам, маълумот чӣ мешавад?", "Маълумот аз они шумо мемонад. Пеш аз қатъ ҳисоботҳо ва ҳуҷҷатҳои асосиро бор кардан мумкин аст."],
      ],
    },
  },
  en: {
    problem: {
      title: "Sound familiar?",
      text: "If even one of these is you, the system replaces a pile of spreadsheets, chats and paper at once.",
      items: [
        ["Excel instead of a CRM", "Every manager keeps their own file. Customers and deal history get lost."],
        ["Deals agreed in messengers", "A reservation was promised in a chat: who, when, on what terms? Nobody remembers."],
        ["Contracts by hand", "An hour of edits per contract: typos, wrong details, different versions of the file."],
        ["Installments in a notebook", "Who paid how much, what is left and when the next payment is due: worked out from a notebook."],
      ],
    },
    pricing: {
      placeholder: true,
      title: "Simple pricing",
      text: "A monthly subscription with no hidden fees. Every update is included in every plan.",
      periods: ["Month", "6 months", "Year"],
      discounts: [0, 10, 15],
      months: [1, 6, 12],
      currency: "TJS",
      perMonth: "per month",
      billed: "Billed",
      onRequest: "On request",
      popular: "Popular",
      cta: "Choose plan",
      note: "14 days free, no card required.",
      plans: [
        {
          name: "Start",
          desc: "For a small developer with one or two projects",
          price: 400,
          features: ["1 project", "3 users", "Chessboard and customers", "Contracts in PDF and Word", "Installments and payment schedule", "Email and chat support"],
        },
        {
          name: "Business",
          desc: "For a growing company with several projects",
          price: 800,
          popular: true,
          features: ["Up to 5 projects", "10 users", "Everything in Start", "Roles, permissions and activity log", "Advanced reports and analytics", "Mobile app", "Priority support"],
        },
        {
          name: "Enterprise",
          desc: "For large developers and holdings",
          price: null,
          features: ["Unlimited projects", "Unlimited users", "Everything in Business", "Integrations (1C and others)", "Data migration from Excel and 1C", "A personal manager"],
        },
      ],
      extrasTitle: "Extras",
      extras: [
        ["Extra user", "40 TJS / month"],
        ["Extra project", "100 TJS / month"],
        ["Data migration from Excel or 1C", "from 1,500 TJS one-off"],
        ["Custom integration", "from 8,000 TJS one-off"],
      ],
    },
    proof: {
      placeholder: true,
      title: "Trusted by developers",
      logos: ["Stroy Alfa", "Dom Group", "Arka", "Horizon", "Monolit", "Sfera"],
      stats: [
        { value: "120+", label: "apartments handled in the system" },
        { value: "3", label: "projects on the platform" },
        { value: "100%", label: "payments with a schedule and balance" },
      ],
      quote: {
        text: "With the system, sales sees free apartments in real time and accounting sees the payment schedule, no notebooks or Excel.",
        name: "Farkhod Rakhimov",
        role: "Head of Sales, Stroy Alfa",
      },
    },
    security: {
      title: "In control, no surprises",
      text: "Roles and permissions, an activity log and data export: everything you need to trust the system with sales and money.",
      items: [
        ["Roles and permissions", "Owner, manager, cashier: everyone sees and does only their part."],
        ["Activity log", "Who created, changed or deleted a record, and when."],
        ["Your data stays yours", "Excel reports and PDF and Word documents at any time."],
        ["Import from Excel", "Load customers from an Excel or CSV file in one step."],
      ],
    },
    faq: {
      placeholder: true,
      title: "Frequently asked questions",
      items: [
        ["How do I get started?", "Leave a demo request: we will show the system on your scenario and help create the first project."],
        ["How long does the launch take?", "A basic launch takes from one to a few days, depending on the amount of data and number of projects."],
        ["Can I move customers over from Excel?", "Yes. Customers can be loaded from an Excel or CSV file, and the system checks the columns before loading."],
        ["What documents does the system produce?", "Contracts from your templates: customer, unit and developer data are filled in, and the file downloads as PDF or Word."],
        ["Is there a mobile app?", "Yes, for Android and iOS: the chessboard, projects and floor plans are always at hand."],
        ["What happens to my data if I stop using the system?", "Your data stays yours. Before disconnecting you can export the main reports and documents."],
      ],
    },
  },
};
