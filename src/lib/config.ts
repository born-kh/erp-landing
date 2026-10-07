/** Everything that differs between deployments comes from PUBLIC_* environment variables. */
const env = import.meta.env;
const clean = (value: unknown) => (typeof value === "string" ? value.trim() : "");

const phone = clean(env.PUBLIC_CONTACT_PHONE);
const email = clean(env.PUBLIC_CONTACT_EMAIL);
const telegram = clean(env.PUBLIC_CONTACT_TELEGRAM).replace(/^@/, "");
const whatsapp = clean(env.PUBLIC_CONTACT_WHATSAPP).replace(/[^\d]/g, "");
const address = clean(env.PUBLIC_CONTACT_ADDRESS);

export const analytics = {
  yandexId: clean(env.PUBLIC_YANDEX_METRIKA_ID),
  gaId: clean(env.PUBLIC_GA_ID),
};

/** Where the demo request form posts JSON ({ name, phone, company, type, lang }); optional. */
export const leadEndpoint = clean(env.PUBLIC_LEAD_ENDPOINT);

export const siteConfig = {
  /** The login page of the ERP web app. */
  appUrl: clean(env.PUBLIC_APP_URL) || "https://developer-erp-frontend.vercel.app/login",
  androidUrl: clean(env.PUBLIC_APP_ANDROID_URL),
  iosUrl: clean(env.PUBLIC_APP_IOS_URL),
  contacts: {
    phone,
    phoneHref: phone ? `tel:${phone.replace(/[^\d+]/g, "")}` : "",
    email,
    emailHref: email ? `mailto:${email}` : "",
    telegram,
    telegramHref: telegram ? `https://t.me/${telegram}` : "",
    whatsapp,
    whatsappHref: whatsapp ? `https://wa.me/${whatsapp}` : "",
    address,
  },
};

/** The best way to reach the team for a demo, or "" when no contact is configured. */
export const demoHref =
  siteConfig.contacts.telegramHref ||
  siteConfig.contacts.whatsappHref ||
  siteConfig.contacts.phoneHref ||
  siteConfig.contacts.emailHref;

export const hasContacts = Boolean(demoHref || siteConfig.contacts.address);

/** The demo section is shown when requests can reach the team: a form endpoint or at least one contact. */
export const hasDemo = Boolean(leadEndpoint || hasContacts);
