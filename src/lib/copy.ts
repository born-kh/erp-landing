import type { Lang } from "./lang";

export type Copy = {
  login: string;
  eyebrow: string;
  title: string;
  accent: string;
  lead: string;
  cta: string;
  more: string;
  featuresTitle: string;
  features: [string, string][];
  legend: [string, string, string];
  chips: [string, string, string];
  form: {
    title: string;
    name: string;
    phone: string;
    company: string;
    type: string;
    types: [string, string, string];
    submit: string;
    sending: string;
    success: string;
    successText: string;
    error: string;
    consent: string;
    required: string;
    message: string;
  };
  minute: {
    title: string;
    text: string;
    steps: [string, string, string, string];
    client: string;
    clientValue: string;
    unit: string;
    docTitle: string;
    docFields: [string, string, string];
    docValues: [string, string, string];
    ready: string;
    pdf: string;
    word: string;
  };
  contact: { nav: string; title: string; text: string; demo: string; phone: string; email: string; telegram: string; whatsapp: string; address: string };
  sticky: string;
  meta: { title: string; description: string };
  tour: {
    title: string;
    text: string;
    tabs: [string, string, string];
    menu: string[];
    stats: [string, string, string];
    paid: string;
    balance: string;
    status: [string, string, string];
    docTitle: string;
    docFields: [string, string, string];
    docValues: [string, string, string];
    pdf: string;
    word: string;
  };
  mobile: { title: string; text: string; points: [string, string, string]; entrance: string; unit: string; screen: string };
  demo: {
    title: string;
    text: string;
    pick: string;
    price: string;
    down: string;
    term: string;
    monthly: string;
    schedule: string;
    months: string;
    area: string;
    note: string;
    total: string;
  };
  footer: string;
};

export const COPY: Record<Lang, Copy> = {
  ru: {
    login: "Войти",
    eyebrow: "Платформа для застройщиков",
    title: "Продажи квартир, рассрочка и платежи",
    accent: "в одном месте",
    lead: "Шахматка, контракты, график платежей и документы. Менеджеры видят свободные квартиры, бухгалтерия — кто и сколько должен, директор — всю картину.",
    cta: "Войти в систему",
    more: "Возможности",
    featuresTitle: "Всё, что нужно отделу продаж и бухгалтерии",
    features: [
      ["Шахматка", "Весь дом на одном экране: свободные, забронированные и проданные квартиры по подъездам и этажам."],
      ["Объекты и планировки", "Проекты, здания, этажи и поэтажные планировки с разметкой квартир прямо на чертеже."],
      ["Контракты и рассрочка", "Бронь, подписание, рассрочка с автоматическим графиком и контролем остатка долга."],
      ["Платежи", "Приём оплат и возвратов, история по каждому контракту, способ оплаты и отклонение от графика."],
      ["Календарь и должники", "Ближайшие платежи и просрочки: кому напомнить сегодня и сколько денег ждёт."],
      ["Документы по шаблонам", "Договор подставляет данные клиента, объекта и застройщика и сохраняется в PDF или Word."],
      ["Отчёты", "Платежи и брони за период, сводка по проектам и выгрузка в Excel."],
      ["Роли и права", "Владелец, менеджер по продажам, кассир: каждый видит и делает только своё."],
    ],
    legend: ["Свободна", "Бронь", "Продана"],
    chips: ["Платёж получен", "Контракт подписан", "Квартира забронирована"],
    form: {
      title: "Оставьте заявку",
      name: "Ваше имя",
      phone: "Телефон",
      company: "Компания",
      type: "Чем занимается компания",
      types: ["Застройщик", "Агентство недвижимости", "Другое"],
      submit: "Отправить заявку",
      sending: "Отправляем…",
      success: "Заявка отправлена",
      successText: "Мы свяжемся с вами в ближайшее время.",
      error: "Не удалось отправить. Попробуйте ещё раз или свяжитесь с нами напрямую.",
      consent: "Нажимая кнопку, вы соглашаетесь на обработку данных для связи с вами.",
      required: "Укажите имя и телефон",
      message: "Здравствуйте! Хочу демо системы.",
    },
    minute: {
      title: "Договор в несколько кликов",
      text: "Выбрали клиента и квартиру, система сама подставила данные, и документ готов к скачиванию в PDF или Word.",
      steps: ["Выберите клиента", "Выберите квартиру", "Договор собирается сам", "Скачайте PDF или Word"],
      client: "Клиент",
      clientValue: "Каримов Алишер Рустамович",
      unit: "Квартира",
      docTitle: "Договор купли-продажи",
      docFields: ["Покупатель", "Квартира", "Цена"],
      docValues: ["Каримов А. Р.", "№ 45 · 78 м²", "TJS 546 000"],
      ready: "Документ готов",
      pdf: "PDF",
      word: "Word",
    },
    contact: {
      nav: "Контакты",
      title: "Покажем систему на ваших данных",
      text: "Расскажем о возможностях, ответим на вопросы и подберём запуск под вашу компанию.",
      demo: "Запросить демо",
      phone: "Телефон",
      email: "Почта",
      telegram: "Telegram",
      whatsapp: "WhatsApp",
      address: "Адрес",
    },
    sticky: "Войти в систему",
    meta: {
      title: "ERP — платформа учёта квартир, рассрочки и платежей",
      description: "Платформа для застройщиков: шахматка, контракты, рассрочка с графиком платежей, должники, документы в PDF и Word, отчёты, роли и права.",
    },
    tour: {
      title: "Так выглядит система изнутри",
      text: "Шахматка для продаж, контракт с графиком платежей и готовый документ: всё в одном окне.",
      tabs: ["Шахматка", "Контракт", "Документ"],
      menu: ["Объекты", "Шахматка", "Брони", "Контракты", "Документы", "Платежи", "Должники"],
      stats: ["Свободно", "В резерве", "Продано"],
      paid: "Оплачено",
      balance: "Остаток долга",
      status: ["Оплачен", "Скоро", "Запланирован"],
      docTitle: "Договор купли-продажи № 000123",
      docFields: ["Покупатель", "Квартира", "Цена"],
      docValues: ["Каримов А. Р.", "№ 45 · 78 м²", "TJS 546 000"],
      pdf: "Скачать PDF",
      word: "Скачать Word",
    },
    mobile: {
      title: "Всё под рукой: приложения для Android и iOS",
      text: "Шахматка, объекты и планировки с телефона: на показе квартиры, на стройплощадке и в дороге.",
      points: ["Свободные квартиры и планировки всегда с вами", "Те же данные, что и в веб-версии, без дублей", "Один вход для сайта и приложения"],
      entrance: "Подъезд",
      unit: "1-комнатная",
      screen: "Планировка",
    },
    demo: {
      title: "Попробуйте прямо сейчас",
      text: "Выберите свободную квартиру на шахматке и подберите условия: система сразу посчитает платёж и построит график.",
      pick: "Выберите квартиру",
      price: "Цена квартиры",
      down: "Первый взнос",
      term: "Срок рассрочки",
      monthly: "Платёж в месяц",
      schedule: "График платежей",
      months: "мес.",
      area: "м²",
      note: "Демо-данные. В системе цены, планировки и графики ваши.",
      total: "Всего",
    },
    footer: "Платформа учёта квартир и продаж",
  },
  tg: {
    login: "Ворид шудан",
    eyebrow: "Платформа барои бунёдкорон",
    title: "Фурӯши хонаҳо, қарз ва пардохтҳо",
    accent: "дар як ҷо",
    lead: "Шахматка, шартномаҳо, ҷадвали пардохтҳо ва ҳуҷҷатҳо. Менеҷерон хонаҳои холиро мебинанд, ҳисобдор — кӣ чанд қарздор аст, директор — тамоми манзараро.",
    cta: "Ворид шудан ба система",
    more: "Имкониятҳо",
    featuresTitle: "Ҳар он чи шӯъбаи фурӯш ва ҳисобдорӣ ниёз доранд",
    features: [
      ["Шахматка", "Тамоми бино дар як экран: хонаҳои холӣ, брондошта ва фурӯхташуда аз рӯи даромадгоҳ ва ошёна."],
      ["Объектҳо ва нақшаҳо", "Лоиҳаҳо, бинохо, ошёнаҳо ва нақшаҳои ошёна бо нишонагузории хонаҳо рӯи нақша."],
      ["Шартномаҳо ва қарз", "Бронкунӣ, имзо, қарз бо ҷадвали худкор ва назорати боқимондаи қарз."],
      ["Пардохтҳо", "Қабули пардохт ва баргардонидан, таърих барои ҳар шартнома ва усули пардохт."],
      ["Тақвим ва қарздорон", "Пардохтҳои наздик ва таъхирҳо: ба кӣ имрӯз ёдрас кардан лозим аст."],
      ["Ҳуҷҷатҳо аз рӯи шаблон", "Шартнома маълумоти мизоҷ, объект ва бунёдкорро ҷой мекунад ва дар PDF ё Word нигоҳ дошта мешавад."],
      ["Ҳисоботҳо", "Пардохтҳо ва бронҳо барои давра, хулоса аз рӯи лоиҳаҳо ва содирот ба Excel."],
      ["Нақшҳо ва ҳуқуқҳо", "Соҳиб, менеҷери фурӯш, хазинадор: ҳар кас танҳо кори худро мебинад."],
    ],
    legend: ["Холӣ", "Бронкунӣ", "Фурӯхта"],
    chips: ["Пардохт қабул шуд", "Шартнома имзо шуд", "Хона бронкарда шуд"],
    form: {
      title: "Дархост гузоред",
      name: "Номи шумо",
      phone: "Телефон",
      company: "Ширкат",
      type: "Ширкат чӣ кор мекунад",
      types: ["Бунёдкор", "Агентии амвол", "Дигар"],
      submit: "Фиристодани дархост",
      sending: "Фиристода истодаем…",
      success: "Дархост фиристода шуд",
      successText: "Мо ба зудӣ бо шумо тамос мегирем.",
      error: "Фиристодан муяссар нашуд. Бори дигар кӯшиш кунед ё мустақиман тамос гиред.",
      consent: "Бо пахши тугма шумо ба коркарди маълумот барои тамос розӣ мешавед.",
      required: "Ном ва телефонро нишон диҳед",
      message: "Салом! Намоиши системаро мехоҳам.",
    },
    minute: {
      title: "Шартнома бо чанд пахш",
      text: "Мизоҷ ва хонаро интихоб кардед, система маълумотро худ ҷой кард ва ҳуҷҷат барои зеркашӣ дар PDF ё Word омода аст.",
      steps: ["Мизоҷро интихоб кунед", "Хонаро интихоб кунед", "Шартнома худ сохта мешавад", "PDF ё Word зеркашӣ кунед"],
      client: "Мизоҷ",
      clientValue: "Каримов Алишер Рустамович",
      unit: "Хона",
      docTitle: "Шартномаи хариду фурӯш",
      docFields: ["Харидор", "Хона", "Нарх"],
      docValues: ["Каримов А. Р.", "№ 45 · 78 м²", "TJS 546 000"],
      ready: "Ҳуҷҷат омода аст",
      pdf: "PDF",
      word: "Word",
    },
    contact: {
      nav: "Тамос",
      title: "Система дар маълумоти шумо нишон медиҳем",
      text: "Дар бораи имкониятҳо мегӯем, ба саволҳо ҷавоб медиҳем ва оғозро барои ширкати шумо интихоб мекунем.",
      demo: "Дархости намоиш",
      phone: "Телефон",
      email: "Почта",
      telegram: "Telegram",
      whatsapp: "WhatsApp",
      address: "Нишонӣ",
    },
    sticky: "Ворид шудан ба система",
    meta: {
      title: "ERP — платформаи ҳисоби хона, қарз ва пардохтҳо",
      description: "Платформа барои бунёдкорон: шахматка, шартномаҳо, қарз бо ҷадвали пардохтҳо, қарздорон, ҳуҷҷатҳо дар PDF ва Word, ҳисоботҳо.",
    },
    tour: {
      title: "Система аз дарун чунин аст",
      text: "Шахматка барои фурӯш, шартнома бо ҷадвали пардохтҳо ва ҳуҷҷати тайёр: ҳама дар як равзана.",
      tabs: ["Шахматка", "Шартнома", "Ҳуҷҷат"],
      menu: ["Объектҳо", "Шахматка", "Бронҳо", "Шартномаҳо", "Ҳуҷҷатҳо", "Пардохтҳо", "Қарздорон"],
      stats: ["Холӣ", "Дар захира", "Фурӯхта"],
      paid: "Пардохт шуд",
      balance: "Боқимонда",
      status: ["Пардохт шуд", "Ба зудӣ", "Банақшагирифта"],
      docTitle: "Шартномаи хариду фурӯш № 000123",
      docFields: ["Харидор", "Хона", "Нарх"],
      docValues: ["Каримов А. Р.", "№ 45 · 78 м²", "TJS 546 000"],
      pdf: "Зеркашии PDF",
      word: "Зеркашии Word",
    },
    mobile: {
      title: "Ҳамааш дар даст: барномаҳо барои Android ва iOS",
      text: "Шахматка, объектҳо ва нақшаҳо аз телефон: ҳангоми намоиши хона, дар сохтмон ва дар роҳ.",
      points: ["Хонаҳои холӣ ва нақшаҳо ҳамеша бо шумо", "Ҳамон маълумот ки дар версияи веб, бе такрор", "Як воридшавӣ барои сайт ва барнома"],
      entrance: "Даромадгоҳ",
      unit: "1-ҳуҷрагӣ",
      screen: "Нақша",
    },
    demo: {
      title: "Худи ҳозир санҷед",
      text: "Дар шахматка хонаи холиро интихоб кунед ва шартҳоро танзим намоед: система пардохтро ҳисоб мекунад ва ҷадвал месозад.",
      pick: "Хонаро интихоб кунед",
      price: "Нархи хона",
      down: "Пардохти аввал",
      term: "Мӯҳлати қарз",
      monthly: "Пардохти моҳона",
      schedule: "Ҷадвали пардохтҳо",
      months: "моҳ",
      area: "м²",
      note: "Маълумоти намоишӣ. Дар система нархҳо, нақшаҳо ва ҷадвалҳо аз они шумо.",
      total: "Ҳамагӣ",
    },
    footer: "Платформаи ҳисоби хона ва фурӯш",
  },
  en: {
    login: "Sign in",
    eyebrow: "Platform for property developers",
    title: "Apartment sales, installments and payments",
    accent: "in one place",
    lead: "Chessboard, contracts, payment schedules and documents. Sales see what is free, accounting sees who owes what, and the director sees the whole picture.",
    cta: "Sign in",
    more: "Features",
    featuresTitle: "Everything sales and accounting need",
    features: [
      ["Chessboard", "The whole building on one screen: free, reserved and sold apartments by entrance and floor."],
      ["Projects and floor plans", "Projects, buildings, floors and floor plans with apartments marked right on the drawing."],
      ["Contracts and installments", "Reservation, signing, installments with an automatic schedule and outstanding-balance control."],
      ["Payments", "Accept payments and refunds, per-contract history, payment method and deviation from the schedule."],
      ["Calendar and debtors", "Upcoming payments and overdue ones: who to remind today and how much is waiting."],
      ["Template documents", "A contract fills in the customer, unit and developer data and is saved as PDF or Word."],
      ["Reports", "Payments and reservations for a period, project summary and Excel export."],
      ["Roles and permissions", "Owner, sales manager, cashier: everyone sees and does only their part."],
    ],
    legend: ["Free", "Reserved", "Sold"],
    chips: ["Payment received", "Contract signed", "Apartment reserved"],
    form: {
      title: "Leave a request",
      name: "Your name",
      phone: "Phone",
      company: "Company",
      type: "What the company does",
      types: ["Developer", "Real estate agency", "Other"],
      submit: "Send request",
      sending: "Sending…",
      success: "Request sent",
      successText: "We will get back to you shortly.",
      error: "Could not send. Try again or contact us directly.",
      consent: "By pressing the button you agree to the processing of your data to contact you.",
      required: "Enter your name and phone",
      message: "Hello! I would like a demo of the system.",
    },
    minute: {
      title: "A contract in a few clicks",
      text: "Pick the customer and the apartment, the system fills in the data and the document is ready to download as PDF or Word.",
      steps: ["Pick the customer", "Pick the apartment", "The contract builds itself", "Download PDF or Word"],
      client: "Customer",
      clientValue: "Alisher Karimov",
      unit: "Apartment",
      docTitle: "Sale and purchase agreement",
      docFields: ["Buyer", "Apartment", "Price"],
      docValues: ["A. Karimov", "No. 45 · 78 m²", "TJS 546,000"],
      ready: "Document ready",
      pdf: "PDF",
      word: "Word",
    },
    contact: {
      nav: "Contacts",
      title: "We will show the system on your data",
      text: "We will walk you through the features, answer questions and plan the launch for your company.",
      demo: "Request a demo",
      phone: "Phone",
      email: "Email",
      telegram: "Telegram",
      whatsapp: "WhatsApp",
      address: "Address",
    },
    sticky: "Sign in",
    meta: {
      title: "ERP — apartment, installment and payment platform",
      description: "A platform for developers: chessboard, contracts, installments with payment schedules, debtors, PDF and Word documents, reports, roles and permissions.",
    },
    tour: {
      title: "What the system looks like inside",
      text: "A chessboard for sales, a contract with a payment schedule and a ready document: all in one window.",
      tabs: ["Chessboard", "Contract", "Document"],
      menu: ["Projects", "Chessboard", "Reservations", "Contracts", "Documents", "Payments", "Debtors"],
      stats: ["Free", "Reserved", "Sold"],
      paid: "Paid",
      balance: "Outstanding balance",
      status: ["Paid", "Soon", "Scheduled"],
      docTitle: "Sale and purchase agreement No. 000123",
      docFields: ["Buyer", "Apartment", "Price"],
      docValues: ["A. Karimov", "No. 45 · 78 m²", "TJS 546,000"],
      pdf: "Download PDF",
      word: "Download Word",
    },
    mobile: {
      title: "Everything at hand: Android and iOS apps",
      text: "Chessboard, projects and floor plans from your phone: at a viewing, on site and on the road.",
      points: ["Free apartments and plans always with you", "The same data as the web version, no duplicates", "One sign-in for the site and the app"],
      entrance: "Entrance",
      unit: "1-room",
      screen: "Floor plan",
    },
    demo: {
      title: "Try it right now",
      text: "Pick a free apartment on the chessboard and set the terms: the system calculates the payment and builds the schedule at once.",
      pick: "Pick an apartment",
      price: "Apartment price",
      down: "Down payment",
      term: "Installment term",
      monthly: "Monthly payment",
      schedule: "Payment schedule",
      months: "mo.",
      area: "m²",
      note: "Demo data. In the system, prices, plans and schedules are yours.",
      total: "Total",
    },
    footer: "Apartment and sales platform",
  },
};
