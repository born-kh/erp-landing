export const langs = ["ru", "tg", "en"] as const;
export type Lang = (typeof langs)[number];

export const langLabels: Record<Lang, string> = { ru: "Русский", tg: "Тоҷикӣ", en: "English" };
export const langCodes: Record<Lang, string> = { ru: "RU", tg: "TJ", en: "EN" };

/** URL of the landing page in a language: Russian is the default and lives at the root. */
export const langPath = (lang: Lang) => (lang === "ru" ? "/" : `/${lang}/`);
