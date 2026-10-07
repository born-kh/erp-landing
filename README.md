# ERP — landing site

A fast, static marketing site for the ERP platform: apartment sales, installments and payments.
Built with [Astro](https://astro.build) (static HTML for search engines), React islands for the interactive parts and Tailwind CSS 4.

Three languages, each at its own URL (good for SEO, with `hreflang` and a sitemap):

| Language | URL    |
| -------- | ------ |
| Russian  | `/`    |
| Tajik    | `/tg/` |
| English  | `/en/` |

## Run

```bash
npm install
cp .env.example .env   # then fill it in
npm run dev            # http://localhost:4321
npm run build          # static site in dist/
npm run preview
```

Node 20.3+ is required (Node 22 recommended).

## Configuration (`.env`)

Nothing is hard-coded, everything that changes per deployment is an environment variable.

| Variable                                                                                                                | What it does                                                                                              |
| ----------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| `SITE_URL`                                                                                                              | Public origin of this site (`https://your-domain.tj`). Used for canonical links, sitemap, `robots.txt` and share previews. **Set it for production builds.** |
| `PUBLIC_APP_URL`                                                                                                        | Where the "Sign in" buttons lead: the login page of the ERP web app.                                      |
| `PUBLIC_CONTACT_PHONE`, `PUBLIC_CONTACT_EMAIL`, `PUBLIC_CONTACT_TELEGRAM`, `PUBLIC_CONTACT_WHATSAPP`, `PUBLIC_CONTACT_ADDRESS` | Optional. A contacts block, a "Contacts" menu item and the main "Request a demo" button appear as soon as at least one is set (the button opens Telegram, then WhatsApp, phone or email, in that order). |
| `PUBLIC_LEAD_ENDPOINT` | Optional. URL that receives the demo form as a JSON `POST` (`name`, `phone`, `company`, `type`, `lang`): Formspree, a Telegram-bot webhook or your own API. Without it, submitting the form opens a prefilled message in Telegram, WhatsApp or email (whichever contact is set). |
| `PUBLIC_YANDEX_METRIKA_ID`, `PUBLIC_GA_ID` | Optional analytics. Goals sent: `demo_click`, `demo_submit`, `login_click`. |
| `PUBLIC_APP_ANDROID_URL`, `PUBLIC_APP_IOS_URL`                                                                          | Optional. Store links for the mobile app badges.                                                          |

## Deploy

It is a plain static site: upload `dist/` to any static host (Netlify, Vercel, Cloudflare Pages, nginx).
Set `SITE_URL` (and the other variables) in the host's build settings and use `npm run build` with the `dist` output directory.

## Where things are

- `src/lib/copy.ts` — all texts in the three languages.
- `src/components/Landing.tsx` — the page and its sections (hero, social proof, product tour, features, "contract in a few clicks" animation, installment calculator, security, mobile apps, FAQ, demo form and contacts).
- `src/layouts/Base.astro` — `<head>`: title, description, canonical, `hreflang`, Open Graph, JSON-LD.
- `src/components/DemoForm.tsx` — the demo request form (validation, honeypot, endpoint or messenger fallback).
- `src/styles/global.css` — design tokens (light and dark) and animations.
- `public/` — logo, favicon and the share images `og-ru.png`, `og-tg.png`, `og-en.png` (1200×630).

## Real content to replace before launch

`src/lib/content.ts` holds the sections that need real data. Right now they contain **example content**
(invented client logos, numbers, a sample testimonial and FAQ answers to confirm), marked `placeholder: true`:

- `proof` — client logos, three numbers, one testimonial with a name and role.
- `faq` — questions and answers (check that each answer is true for your company: launch time, data export, and so on).
- `security` — real features of the product (roles, activity log, exports, Excel import); edit freely.

Replace the examples in all three languages and set `placeholder: false`.
A production build (a real `SITE_URL`) **refuses to run** while any `placeholder: true` is left, so example content cannot go live by accident
(`ALLOW_PLACEHOLDERS=1` overrides this for a test build).

## Notes

- The mini chessboard, calculator, product tour and the phone are interface mock-ups with demo data, not real data.
- Animations respect `prefers-reduced-motion`.
- `npm audit` reports advisories for Astro 5 (server islands, image optimization, `define:vars`, spread attributes). This site is fully static and uses none of those features, so they do not apply here; they are fixed in Astro 7, which needs Node 22.12+. Upgrade when your build environment is on Node 22.
