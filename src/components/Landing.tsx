import { useEffect, useRef, useState, type CSSProperties, type MouseEvent, type ReactNode } from "react";
import {
  ArrowRight,
  Building2,
  Check,
  FileSpreadsheet,
  MessagesSquare,
  NotebookPen,
  CalendarClock,
  CheckCircle2,
  ChevronDown,
  Download,
  History,
  Upload,
  FileText,
  FileSignature,
  LayoutGrid,
  LineChart,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
  ShieldCheck,
  Smartphone,
  Users,
  Wallet,
} from "lucide-react";
import { BrandLogo } from "./BrandLogo";
import { ContractMinute } from "./ContractMinute";
import { DemoForm } from "./DemoForm";
import { Button } from "./Button";
import { SiteMenu } from "./SiteMenu";
import { cn } from "../lib/cn";
import { COPY, type Copy } from "../lib/copy";
import { CONTENT, type Content } from "../lib/content";
import { demoHref, hasDemo, leadEndpoint, siteConfig } from "../lib/config";
import { track } from "../lib/track";
import type { Lang } from "../lib/lang";

/** Same output on the server and in the browser (Intl differs between Node and browsers, which breaks hydration). */
const formatMoney = (n: number) => String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, "\u00a0");

const FEATURE_ICONS = [LayoutGrid, Building2, FileSignature, Wallet, CalendarClock, FileText, LineChart, ShieldCheck] as const;

type Cell = "a" | "r" | "s";

/** Adds `data-in` once the element scrolls into view, which the .lp-reveal CSS animates. */
function Reveal({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      el.setAttribute("data-in", "");
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.setAttribute("data-in", "");
          io.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className={cn("lp-reveal", className)} style={{ "--d": `${delay}s` } as CSSProperties}>
      {children}
    </div>
  );
}

/** Like Reveal, but a pure CSS entrance for content that is visible on first paint. */
function Rise({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <div className={cn("lp-rise", className)} style={{ "--d": `${delay}s` } as CSSProperties}>
      {children}
    </div>
  );
}

/** Card that lights up under the cursor. */
function SpotCard({ children, className }: { children: ReactNode; className?: string }) {
  const onMove = (e: MouseEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };
  return (
    <article onMouseMove={onMove} className={cn("lp-card group rounded-2xl border border-border bg-card", className)}>
      {children}
    </article>
  );
}

const START: Cell[][] = [
  ["s", "a", "r", "a", "a", "s"],
  ["a", "s", "s", "r", "a", "a"],
  ["s", "s", "a", "a", "s", "r"],
  ["a", "r", "s", "s", "a", "a"],
  ["s", "a", "a", "s", "r", "s"],
];
const NEXT: Record<Cell, Cell> = { a: "r", r: "s", s: "a" };
const CELL_STYLE: Record<Cell, string> = {
  a: "border-[var(--success)]/50 bg-card text-[var(--success)]",
  r: "border-[var(--warning)]/50 bg-[var(--warning-bg)] text-[var(--warning)]",
  s: "border-transparent bg-foreground/70 text-background/85",
};

/** The chessboard comes alive: cells pop in, then one apartment at a time changes status. */
function Board({ legend, chips }: { legend: [string, string, string]; chips: [string, string, string] }) {
  const [grid, setGrid] = useState(START);
  const [hot, setHot] = useState<[number, number, number] | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let tick = 0;
    const id = window.setInterval(() => {
      const r = Math.floor(Math.random() * START.length);
      const c = Math.floor(Math.random() * START[0].length);
      setGrid((g) => g.map((row, i) => (i === r ? row.map((v, j) => (j === c ? NEXT[v] : v)) : row)));
      setHot([r, c, ++tick]);
    }, 1500);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="relative">
      <div className="rounded-2xl border border-border bg-card p-4 shadow-[0_30px_70px_-30px_rgba(30,44,41,0.5)] sm:p-5">
        <div className="mb-3 flex items-center gap-3 text-xs text-muted-foreground">
          {([["a", legend[0]], ["r", legend[1]], ["s", legend[2]]] as const).map(([k, label]) => (
            <span key={k} className="inline-flex items-center gap-1.5">
              <span className={cn("size-3 rounded-[4px] border", CELL_STYLE[k])} />
              {label}
            </span>
          ))}
        </div>
        <div className="grid grid-cols-6 gap-1.5">
          {grid.flatMap((row, r) =>
            row.map((cell, c) => {
              const isHot = hot?.[0] === r && hot[1] === c;
              return (
                <div
                  key={`${r}-${c}${isHot ? `-${hot[2]}` : ""}`}
                  style={{ "--d": isHot ? "0s" : `${(r * 6 + c) * 0.025}s` } as CSSProperties}
                  className={cn(
                    "lp-pop grid h-9 place-items-center rounded-md border text-xs font-semibold tabular-nums transition-colors duration-500 sm:h-11 sm:text-sm",
                    CELL_STYLE[cell],
                    isHot && "lp-ring",
                  )}
                >
                  {(START.length - r) * 10 + c + 1}
                </div>
              );
            }),
          )}
        </div>
      </div>
      <div className="lp-float absolute -top-4 -right-2 hidden items-center gap-2 rounded-xl border border-border bg-card px-3 py-2 text-xs font-medium shadow-lg sm:flex">
        <CheckCircle2 className="size-4 text-[var(--success)]" />
        {chips[0]}
      </div>
      <div
        className="lp-float absolute -bottom-4 -left-3 hidden items-center gap-2 rounded-xl border border-border bg-card px-3 py-2 text-xs font-medium shadow-lg sm:flex"
        style={{ "--d": "-3s" } as CSSProperties}
      >
        <FileSignature className="size-4 text-[var(--terra)]" />
        {chips[1]}
      </div>
    </div>
  );
}

const TOUR_TABS = [LayoutGrid, FileSignature, FileText] as const;
const TOUR_BOARD: Cell[][] = [
  ["s", "a", "a", "r"],
  ["a", "s", "a", "a"],
  ["a", "a", "r", "s"],
  ["s", "a", "a", "a"],
];

/** A faithful, crisp mock of the web app: sidebar plus one of three screens, rotating on its own. */
function ProductTour({ copy }: { copy: Copy["tour"] }) {
  const [tab, setTab] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setTimeout(() => setTab((t) => (t + 1) % 3), 5500);
    return () => window.clearTimeout(id);
  }, [tab, paused]);

  const rows = [
    { pct: 100, st: 0 },
    { pct: 100, st: 0 },
    { pct: 45, st: 1 },
    { pct: 0, st: 2 },
    { pct: 0, st: 2 },
  ];

  return (
    <section className="mx-auto max-w-6xl scroll-mt-20 px-4 py-14 sm:px-6 md:py-24" id="tour">
      <Reveal>
        <h2 className="m-0 mb-3 max-w-2xl text-3xl font-semibold tracking-[-0.03em] text-balance sm:text-4xl">{copy.title}</h2>
        <p className="m-0 mb-8 max-w-2xl text-base leading-relaxed text-muted-foreground">{copy.text}</p>
      </Reveal>
      <Reveal delay={0.1}>
        <div role="tablist" className="mb-5 inline-flex rounded-xl border border-border bg-card p-1">
          {copy.tabs.map((label, i) => {
            const Icon = TOUR_TABS[i];
            return (
              <button
                key={label}
                type="button"
                role="tab"
                aria-selected={tab === i}
                aria-label={label}
                onClick={() => setTab(i)}
                className={cn(
                  "inline-flex items-center gap-2 rounded-lg px-3.5 py-2 text-sm font-medium transition-all",
                  tab === i ? "bg-primary text-primary-foreground shadow" : "text-muted-foreground hover:text-foreground",
                )}
              >
                <Icon className="size-4" />
                <span className="hidden sm:inline">{label}</span>
              </button>
            );
          })}
        </div>
        <div
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          className="overflow-hidden rounded-2xl border border-border bg-card shadow-[0_40px_90px_-40px_rgba(30,44,41,0.55)]"
        >
          <div className="flex items-center gap-1.5 border-b border-border bg-secondary/60 px-4 py-2.5">
            <span className="size-2.5 rounded-full bg-[#e5484d]/70" />
            <span className="size-2.5 rounded-full bg-[#e5a32f]/70" />
            <span className="size-2.5 rounded-full bg-[#46a758]/70" />
            <span className="ml-3 rounded-md bg-card px-3 py-0.5 text-[11px] text-muted-foreground">erp.tj / {copy.tabs[tab].toLowerCase()}</span>
          </div>
          <div className="grid min-h-[360px] md:grid-cols-[180px_1fr]">
            <aside className="hidden bg-[var(--cedar)] p-3 text-[var(--limestone)] md:block">
              <ul className="m-0 grid list-none gap-0.5 p-0 text-sm">
                {copy.menu.map((item, i) => {
                  const active = (tab === 0 && i === 1) || (tab === 1 && i === 3) || (tab === 2 && i === 4);
                  return (
                    <li
                      key={item}
                      className={cn(
                        "rounded-md px-3 py-2 transition-colors",
                        active ? "bg-[var(--terra)]/25 text-[#f0a074]" : "text-[var(--limestone)]/65",
                      )}
                    >
                      {item}
                    </li>
                  );
                })}
              </ul>
            </aside>
            <div key={tab} className="lp-pop p-4 sm:p-6" style={{ animationDuration: "0.45s" }}>
              {tab === 0 && (
                <div>
                  <div className="mb-4 flex flex-wrap gap-6">
                    {[
                      [copy.stats[0], "57", "text-[var(--success)]"],
                      [copy.stats[1], "0", "text-[var(--warning)]"],
                      [copy.stats[2], "3", "text-foreground"],
                    ].map(([label, value, color]) => (
                      <div key={label}>
                        <div className={cn("text-2xl font-semibold tabular-nums", color)}>{value}</div>
                        <div className="text-xs text-muted-foreground">{label}</div>
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-6">
                    {[1, 2].map((entrance) => (
                      <div key={entrance} className="grid gap-1.5">
                        <div className="rounded-md border border-border bg-card py-1 text-center text-xs font-semibold">
                          {entrance === 1 ? "1" : "2"}
                        </div>
                        {TOUR_BOARD.map((row, r) => (
                          <div key={r} className="grid grid-cols-4 gap-1.5">
                            {row.map((cell, c) => (
                              <div
                                key={c}
                                className={cn(
                                  "grid h-9 w-11 place-items-center rounded-md border text-xs font-semibold tabular-nums",
                                  CELL_STYLE[(entrance === 2 ? NEXT[NEXT[cell]] : cell) as Cell],
                                )}
                              >
                                {(TOUR_BOARD.length - r) * 10 + c + 1 + (entrance - 1) * 4}
                              </div>
                            ))}
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {tab === 1 && (
                <div>
                  <div className="mb-1 flex items-baseline justify-between text-sm">
                    <span className="text-muted-foreground">{copy.paid} TJS 60 000 / 546 000</span>
                    <b className="tabular-nums">11%</b>
                  </div>
                  <div className="mb-4 h-2 overflow-hidden rounded-full bg-secondary">
                    <div className="lp-bar h-full rounded-full bg-[var(--success)]" style={{ width: "11%" }} />
                  </div>
                  <div className="mb-4 text-sm text-muted-foreground">
                    {copy.balance}: <b className="text-lg text-foreground tabular-nums">TJS 486 000</b>
                  </div>
                  <ul className="m-0 grid list-none gap-1.5 p-0 text-sm">
                    {rows.map((row, i) => (
                      <li key={i} className="grid grid-cols-[1.5rem_1fr_auto_auto] items-center gap-3 rounded-lg bg-muted/40 px-3 py-2">
                        <span className="tabular-nums text-muted-foreground">{i + 1}</span>
                        <span className="h-1.5 overflow-hidden rounded-full bg-secondary">
                          <span
                            className="lp-bar block h-full rounded-full bg-[var(--success)]"
                            style={{ width: `${row.pct}%`, "--d": `${0.2 + i * 0.15}s` } as CSSProperties}
                          />
                        </span>
                        <b className="tabular-nums">TJS 22 750</b>
                        <span className="w-24 text-right text-xs text-muted-foreground">{copy.status[row.st]}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {tab === 2 && (
                <div className="grid gap-4 lg:grid-cols-[1fr_auto]">
                  <div className="rounded-lg border border-border bg-white p-5 font-serif text-[13px] leading-relaxed text-[#111] shadow-sm">
                    <div className="mb-3 text-center text-sm font-bold">{copy.docTitle}</div>
                    {copy.docFields.map((field, i) => (
                      <p key={field} className="m-0 mb-1.5">
                        {field}:{" "}
                        <span className="rounded bg-[#e8efff] px-1.5 py-0.5 font-sans text-xs font-medium text-[#2a4fd6]">
                          {copy.docValues[i]}
                        </span>
                      </p>
                    ))}
                    <div className="mt-4 h-2 w-4/5 rounded bg-black/10" />
                    <div className="mt-2 h-2 w-3/5 rounded bg-black/10" />
                    <div className="mt-2 h-2 w-2/3 rounded bg-black/10" />
                  </div>
                  <div className="flex flex-row gap-2 lg:flex-col">
                    <span className="inline-flex items-center gap-2 rounded-lg bg-primary px-3.5 py-2 text-sm font-medium text-primary-foreground">
                      <FileText className="size-4" />
                      {copy.pdf}
                    </span>
                    <span className="inline-flex items-center gap-2 rounded-lg border border-border px-3.5 py-2 text-sm font-medium">
                      <FileText className="size-4" />
                      {copy.word}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

/** Store links of the mobile apps; a badge is shown only when its link is set. */
const APP_LINKS = { android: siteConfig.androidUrl, ios: siteConfig.iosUrl };

const PHONE_ROWS: { n: string; color: string; area: number }[][] = [
  [
    { n: "1", color: "#4f7cff", area: 86 },
    { n: "2", color: "#2fb457", area: 65 },
  ],
  [
    { n: "1", color: "#d9972b", area: 52 },
    { n: "2", color: "#e5484d", area: 42 },
    { n: "3", color: "#9b5de5", area: 54 },
  ],
];

function MobileApps({ copy }: { copy: Copy["mobile"] }) {
  return (
    <section className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-14 sm:px-6 md:grid-cols-2 md:py-24">
      <Reveal className="order-2 md:order-1">
        <div className="relative mx-auto w-[260px]">
          <div aria-hidden className="lp-blob absolute -inset-10 -z-10 rounded-full bg-[var(--terra)]/20 blur-3xl" />
          <div className="lp-float rounded-[2.4rem] border-[7px] border-[#111] bg-[#111] shadow-[0_40px_80px_-30px_rgba(0,0,0,0.6)]">
            <div className="h-[470px] overflow-hidden rounded-[1.9rem] bg-black px-4 pt-6 text-white">
              <div className="mx-auto mb-4 h-1.5 w-16 rounded-full bg-white/20" />
              <div className="mb-3 text-lg font-semibold">{copy.screen} 2</div>
              {PHONE_ROWS.map((rows, g) => (
                <div key={g} className="mb-3">
                  <div className="mb-1.5 text-xs text-white/50">
                    {copy.entrance} {g + 1}
                  </div>
                  <div className="divide-y divide-white/5 overflow-hidden rounded-2xl bg-white/[0.07]">
                    {rows.map((row) => (
                      <div key={row.n} className="flex items-center gap-3 px-3 py-2.5">
                        <span className="size-5 rounded-md" style={{ backgroundColor: row.color }} />
                        <span className="min-w-0 flex-1">
                          <span className="block text-sm font-medium">
                            {row.n}. {copy.unit}
                          </span>
                          <span className="block text-xs text-white/50">{row.area} м²</span>
                        </span>
                        <span className="h-0.5 w-4 bg-white/30" />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Reveal>
      <Reveal delay={0.1} className="order-1 md:order-2">
        <h2 className="m-0 mb-4 text-3xl font-semibold tracking-[-0.03em] text-balance sm:text-4xl">{copy.title}</h2>
        <p className="m-0 mb-6 max-w-md text-base leading-relaxed text-muted-foreground">{copy.text}</p>
        <ul className="m-0 mb-7 grid list-none gap-2.5 p-0">
          {copy.points.map((point) => (
            <li key={point} className="flex items-start gap-2.5 text-sm">
              <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-[var(--success)]" />
              {point}
            </li>
          ))}
        </ul>
        <div className="flex flex-wrap gap-3">
          {(
            [
              ["Android", APP_LINKS.android],
              ["iOS", APP_LINKS.ios],
            ] as const
          ).map(([name, href]) =>
            href ? (
              <Button key={name} asChild variant="outline">
                <a href={href} target="_blank" rel="noreferrer">
                  <Smartphone className="size-4" />
                  {name}
                </a>
              </Button>
            ) : (
              <span
                key={name}
                className="inline-flex h-9 items-center gap-2 rounded-md border border-border bg-card px-4 text-sm font-medium"
              >
                <Smartphone className="size-4" />
                {name}
              </span>
            ),
          )}
        </div>
      </Reveal>
    </section>
  );
}

/** Demo building: area per apartment and a fixed status mix; only free ones can be picked. */
const DEMO_AREAS = [
  [64, 42, 78, 55, 92, 38],
  [58, 71, 46, 83, 49, 66],
  [88, 52, 61, 74, 40, 57],
  [45, 69, 85, 51, 77, 63],
];
const DEMO_STATUS: Cell[][] = [
  ["s", "a", "r", "a", "a", "s"],
  ["a", "s", "a", "r", "a", "a"],
  ["a", "a", "s", "a", "s", "r"],
  ["s", "a", "a", "s", "a", "a"],
];
const PRICE_PER_M2 = 7000;
const LOCALE: Record<Lang, string> = { ru: "ru-RU", tg: "tg-TJ", en: "en-US" };

function InstallmentDemo({ copy, lang }: { copy: Copy["demo"]; lang: Lang }) {
  const rows = DEMO_AREAS.length;
  const [sel, setSel] = useState<[number, number]>([0, 1]);
  const [downPct, setDownPct] = useState(30);
  const [months, setMonths] = useState(24);

  const area = DEMO_AREAS[sel[0]][sel[1]];
  const price = area * PRICE_PER_M2;
  const down = Math.round((price * downPct) / 100);
  const rest = price - down;
  const monthly = Math.round(rest / months);
  const money = (value: number) => `TJS ${formatMoney(value)}`;
  const flat = (r: number, c: number) => (rows - r) * 10 + c + 1;

  // Month names depend on today's date, so they are filled in after hydration to match server HTML.
  const [dates, setDates] = useState<string[]>([]);
  useEffect(() => {
    setDates(
      Array.from({ length: 4 }, (_, i) => {
        const d = new Date();
        d.setDate(1);
        d.setMonth(d.getMonth() + i + 1);
        const text = d.toLocaleDateString(LOCALE[lang], { month: "long", year: "numeric" });
        return text.charAt(0).toUpperCase() + text.slice(1);
      }),
    );
  }, [lang]);

  return (
    <section className="mx-auto max-w-6xl scroll-mt-20 px-4 py-14 sm:px-6 md:py-24" id="demo">
      <Reveal>
        <h2 className="m-0 mb-3 max-w-2xl text-3xl font-semibold tracking-[-0.03em] text-balance sm:text-4xl">{copy.title}</h2>
        <p className="m-0 mb-10 max-w-2xl text-base leading-relaxed text-muted-foreground">{copy.text}</p>
      </Reveal>
      <Reveal delay={0.1}>
        <div className="grid gap-6 rounded-3xl border border-border bg-card p-4 shadow-[0_30px_70px_-40px_rgba(30,44,41,0.5)] sm:p-6 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <div className="mb-3 text-sm font-medium">{copy.pick}</div>
            <div className="grid grid-cols-6 gap-1.5">
              {DEMO_AREAS.flatMap((row, r) =>
                row.map((a, c) => {
                  const status = DEMO_STATUS[r][c];
                  const picked = sel[0] === r && sel[1] === c;
                  return (
                    <button
                      key={`${r}-${c}`}
                      type="button"
                      disabled={status !== "a"}
                      aria-pressed={picked}
                      onClick={() => setSel([r, c])}
                      className={cn(
                        "grid h-14 place-items-center rounded-lg border text-sm font-semibold tabular-nums leading-none transition-all duration-200",
                        picked
                          ? "scale-105 border-foreground bg-foreground text-background shadow-lg"
                          : status === "a"
                            ? "border-[var(--success)]/50 bg-card text-[var(--success)] hover:-translate-y-0.5 hover:border-[var(--success)]"
                            : cn("cursor-not-allowed", CELL_STYLE[status], "opacity-80"),
                      )}
                    >
                      <span>{flat(r, c)}</span>
                      <span className="mt-1 text-[10px] font-normal opacity-70">
                        {a} {copy.area}
                      </span>
                    </button>
                  );
                }),
              )}
            </div>
            <p className="m-0 mt-4 text-xs text-muted-foreground">{copy.note}</p>
          </div>

          <div className="grid content-start gap-5">
            <div className="flex items-baseline justify-between gap-3 rounded-2xl bg-secondary/60 px-4 py-3">
              <span className="text-sm text-muted-foreground">{copy.price}</span>
              <b key={price} className="lp-pop text-xl tabular-nums">
                {money(price)}
              </b>
            </div>
            <label className="grid gap-2 text-sm">
              <span className="flex justify-between">
                <span className="text-muted-foreground">{copy.down}</span>
                <b className="tabular-nums">
                  {downPct}% · {money(down)}
                </b>
              </span>
              <input
                type="range"
                min={0}
                max={70}
                step={5}
                value={downPct}
                onChange={(e) => setDownPct(Number(e.target.value))}
                className="w-full accent-[var(--terra)]"
              />
            </label>
            <label className="grid gap-2 text-sm">
              <span className="flex justify-between">
                <span className="text-muted-foreground">{copy.term}</span>
                <b className="tabular-nums">
                  {months} {copy.months}
                </b>
              </span>
              <input
                type="range"
                min={6}
                max={60}
                step={6}
                value={months}
                onChange={(e) => setMonths(Number(e.target.value))}
                className="w-full accent-[var(--terra)]"
              />
            </label>
            <div className="rounded-2xl bg-[var(--cedar)] px-5 py-4 text-[var(--limestone)]">
              <div className="text-sm text-[var(--limestone)]/70">{copy.monthly}</div>
              <div key={monthly} className="lp-pop text-3xl font-semibold tracking-tight tabular-nums">
                {money(monthly)}
              </div>
            </div>
            <div>
              <div className="mb-2 text-sm font-medium">{copy.schedule}</div>
              <ul className="m-0 grid list-none gap-1 p-0 text-sm">
                {(dates.length ? dates : ["\u00a0", "\u00a0", "\u00a0", "\u00a0"]).map((date, i) => (
                  <li key={i} className="grid grid-cols-[1.5rem_1fr_auto] gap-2 rounded-md bg-muted/40 px-3 py-1.5">
                    <span className="tabular-nums text-muted-foreground">{i + 1}</span>
                    <span>{date}</span>
                    <b className="tabular-nums">{money(monthly)}</b>
                  </li>
                ))}
                <li className="px-3 pt-1 text-xs text-muted-foreground">
                  … {copy.total}: {months} × {money(monthly)}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

/** Counts a number like "120+" or "100%" up from zero when it first scrolls into view. */
function Stat({ value, label }: { value: string; label: string }) {
  const match = value.match(/^(\d+)(.*)$/);
  const target = match ? Number(match[1]) : 0;
  const suffix = match ? match[2] : "";
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(target);

  useEffect(() => {
    const el = ref.current;
    if (!el || !match || typeof IntersectionObserver === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      io.disconnect();
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / 1300);
        setShown(Math.round(target * (1 - Math.pow(1 - t, 3))));
        if (t < 1) frame = requestAnimationFrame(tick);
      };
      setShown(0);
      frame = requestAnimationFrame(tick);
    });
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [target]);

  return (
    <div ref={ref}>
      <div className="text-4xl font-semibold tracking-tight tabular-nums sm:text-5xl">
        {match ? shown : value}
        {suffix}
      </div>
      <div className="mt-1 text-sm text-muted-foreground">{label}</div>
    </div>
  );
}

function Proof({ content }: { content: Content["proof"] }) {
  const { quote } = content;
  const initials = quote.name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2);
  return (
    <section className="border-y border-border bg-card/60">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 md:py-16">
        <Reveal>
          <p className="m-0 mb-6 text-center text-sm font-medium text-muted-foreground">{content.title}</p>
          <ul className="m-0 mb-12 flex list-none flex-wrap items-center justify-center gap-x-10 gap-y-4 p-0">
            {content.logos.map((logo) => (
              <li key={logo} className="text-lg font-semibold tracking-tight text-foreground/35 transition-colors hover:text-foreground/70 sm:text-xl">
                {logo}
              </li>
            ))}
          </ul>
        </Reveal>
        <div className="grid items-stretch gap-6 lg:grid-cols-[1.1fr_1fr]">
          <Reveal className="grid content-center gap-3 sm:grid-cols-3">
            {content.stats.map((stat) => (
              <div key={stat.label} className="rounded-2xl border border-border bg-card p-5 text-center">
                <Stat {...stat} />
              </div>
            ))}
          </Reveal>
          <Reveal delay={0.1}>
            <figure className="m-0 h-full rounded-2xl border border-border bg-card p-6 shadow-[0_24px_60px_-36px_rgba(30,44,41,0.5)]">
              <span aria-hidden className="block text-4xl leading-none text-[var(--terra)]">“</span>
              <blockquote className="m-0 mb-5 text-base leading-relaxed">{quote.text}</blockquote>
              <figcaption className="flex items-center gap-3">
                <span className="grid size-10 place-items-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">{initials}</span>
                <span>
                  <span className="block text-sm font-semibold">{quote.name}</span>
                  <span className="block text-xs text-muted-foreground">{quote.role}</span>
                </span>
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

const PROBLEM_ICONS = [FileSpreadsheet, MessagesSquare, FileText, NotebookPen] as const;

function Problem({ content }: { content: Content["problem"] }) {
  return (
    <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 md:py-24">
      <Reveal>
        <h2 className="m-0 mb-3 max-w-2xl text-3xl font-semibold tracking-[-0.03em] text-balance sm:text-4xl">{content.title}</h2>
        <p className="m-0 mb-10 max-w-2xl text-base leading-relaxed text-muted-foreground">{content.text}</p>
      </Reveal>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {content.items.map(([title, text], i) => {
          const Icon = PROBLEM_ICONS[i] ?? FileText;
          return (
            <Reveal key={title} delay={i * 0.07}>
              <SpotCard className="h-full p-5">
                <span className="relative mb-4 grid size-11 place-items-center rounded-xl bg-secondary text-[var(--terra)]">
                  <Icon className="size-5" />
                </span>
                <h3 className="relative m-0 mb-1.5 text-base font-semibold">{title}</h3>
                <p className="relative m-0 text-sm leading-relaxed text-muted-foreground">{text}</p>
              </SpotCard>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}


function Pricing({ content }: { content: Content["pricing"] }) {
  const [period, setPeriod] = useState(0);
  const discount = content.discounts[period];
  const months = content.months[period];
  return (
    <section id="pricing" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-14 sm:px-6 md:py-24">
      <Reveal className="mb-10 text-center">
        <h2 className="m-0 mb-3 text-3xl font-semibold tracking-[-0.03em] text-balance sm:text-4xl">{content.title}</h2>
        <p className="mx-auto mb-6 max-w-2xl text-base leading-relaxed text-muted-foreground">{content.text}</p>
        <div role="group" className="inline-flex rounded-full border border-border bg-card p-1">
          {content.periods.map((label, i) => (
            <button
              key={label}
              type="button"
              aria-pressed={period === i}
              onClick={() => setPeriod(i)}
              className={cn(
                "cursor-pointer rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
                period === i ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground",
              )}
            >
              {label}
              {content.discounts[i] > 0 && <span className="ml-1.5 text-xs opacity-80">−{content.discounts[i]}%</span>}
            </button>
          ))}
        </div>
      </Reveal>
      <div className="grid items-stretch gap-4 lg:grid-cols-3">
        {content.plans.map((plan, i) => {
          const monthly = plan.price === null ? null : Math.round(plan.price * (1 - discount / 100));
          return (
            <Reveal key={plan.name} delay={i * 0.07} className="h-full">
              <div
                className={cn(
                  "relative flex h-full flex-col rounded-2xl border bg-card p-6",
                  plan.popular ? "border-[var(--terra)] shadow-[0_24px_60px_-36px_rgba(30,44,41,0.5)]" : "border-border",
                )}
              >
                {plan.popular && (
                  <span className="absolute -top-3 left-6 rounded-full bg-[var(--terra)] px-3 py-0.5 text-xs font-semibold text-white">{content.popular}</span>
                )}
                <h3 className="m-0 mb-1 text-lg font-semibold">{plan.name}</h3>
                <p className="m-0 mb-5 min-h-10 text-sm leading-relaxed text-muted-foreground">{plan.desc}</p>
                {monthly === null ? (
                  <div className="mb-1 text-3xl font-semibold tracking-tight">{content.onRequest}</div>
                ) : (
                  <>
                    <div className="mb-1 flex items-baseline gap-1.5">
                      <span className="text-4xl font-semibold tracking-tight tabular-nums">{formatMoney(monthly)}</span>
                      <span className="text-sm text-muted-foreground">
                        {content.currency} {content.perMonth}
                      </span>
                    </div>
                    <p className="m-0 min-h-5 text-xs text-muted-foreground">
                      {months > 1 && `${content.billed}: ${formatMoney(monthly * months)} ${content.currency}`}
                    </p>
                  </>
                )}
                <ul className="m-0 my-6 grid flex-1 list-none content-start gap-2.5 p-0">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5 text-sm">
                      <Check className="mt-0.5 size-4 shrink-0 text-[var(--success)]" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button asChild size="lg" variant={plan.popular ? "default" : "outline"} className="w-full">
                  {hasDemo ? (
                    <a href="#contacts" onClick={() => track("demo_click")}>
                      {content.cta}
                    </a>
                  ) : (
                    <a href={siteConfig.appUrl} onClick={() => track("login_click")}>
                      {content.cta}
                    </a>
                  )}
                </Button>
              </div>
            </Reveal>
          );
        })}
      </div>
      <p className="mt-6 mb-10 text-center text-sm font-medium text-[var(--terra)]">{content.note}</p>
      <Reveal>
        <h3 className="m-0 mb-4 text-base font-semibold">{content.extrasTitle}</h3>
        <dl className="m-0 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {content.extras.map(([name, price]) => (
            <div key={name} className="rounded-xl border border-border bg-card px-4 py-3">
              <dt className="text-sm text-muted-foreground">{name}</dt>
              <dd className="m-0 mt-1 text-sm font-semibold">{price}</dd>
            </div>
          ))}
        </dl>
      </Reveal>
    </section>
  );
}

const SECURITY_ICONS = [ShieldCheck, History, Download, Upload] as const;

function Security({ content }: { content: Content["security"] }) {
  return (
    <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 md:py-24">
      <Reveal>
        <h2 className="m-0 mb-3 max-w-2xl text-3xl font-semibold tracking-[-0.03em] text-balance sm:text-4xl">{content.title}</h2>
        <p className="m-0 mb-10 max-w-2xl text-base leading-relaxed text-muted-foreground">{content.text}</p>
      </Reveal>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {content.items.map(([title, text], i) => {
          const Icon = SECURITY_ICONS[i] ?? ShieldCheck;
          return (
            <Reveal key={title} delay={i * 0.07}>
              <SpotCard className="h-full p-5">
                <span className="relative mb-4 grid size-11 place-items-center rounded-xl bg-secondary text-[var(--terra)] transition-colors duration-300 group-hover:bg-[var(--terra)] group-hover:text-white">
                  <Icon className="size-5" />
                </span>
                <h3 className="relative m-0 mb-1.5 text-base font-semibold">{title}</h3>
                <p className="relative m-0 text-sm leading-relaxed text-muted-foreground">{text}</p>
              </SpotCard>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

function Faq({ content }: { content: Content["faq"] }) {
  return (
    <section id="faq" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-14 sm:px-6 md:py-24">
      <div className="grid gap-10 lg:grid-cols-[1fr_1.6fr]">
        <Reveal>
          <h2 className="m-0 text-3xl font-semibold tracking-[-0.03em] text-balance sm:text-4xl">{content.title}</h2>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="grid gap-3">
            {content.items.map(([question, answer]) => (
              <details key={question} className="group rounded-2xl border border-border bg-card px-5 py-4 transition-colors open:border-[var(--terra)]/40 open:shadow-sm">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-medium [&::-webkit-details-marker]:hidden">
                  {question}
                  <ChevronDown className="size-5 shrink-0 text-muted-foreground transition-transform duration-300 group-open:rotate-180" />
                </summary>
                <p className="m-0 mt-3 text-sm leading-relaxed text-muted-foreground">{answer}</p>
              </details>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Contacts({ copy, form, lang }: { copy: Copy["contact"]; form: Copy["form"]; lang: Lang }) {
  const c = siteConfig.contacts;
  const items = [
    { icon: Phone, label: copy.phone, value: c.phone, href: c.phoneHref },
    { icon: Send, label: copy.telegram, value: c.telegram ? `@${c.telegram}` : "", href: c.telegramHref },
    { icon: MessageCircle, label: copy.whatsapp, value: c.whatsapp ? `+${c.whatsapp}` : "", href: c.whatsappHref },
    { icon: Mail, label: copy.email, value: c.email, href: c.emailHref },
    { icon: MapPin, label: copy.address, value: c.address, href: "" },
  ].filter((item) => item.value);
  const withForm = Boolean(leadEndpoint || demoHref);

  return (
    <section id="contacts" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-14 sm:px-6 md:py-24">
      <Reveal>
        <div className="grid gap-8 rounded-3xl border border-border bg-card p-6 sm:p-10 md:grid-cols-2">
          <div>
            <h2 className="m-0 mb-3 text-3xl font-semibold tracking-[-0.03em] text-balance sm:text-4xl">{copy.title}</h2>
            <p className="m-0 mb-6 max-w-md text-base leading-relaxed text-muted-foreground">{copy.text}</p>
            <ul className="m-0 grid list-none gap-3 p-0">
              {items.map(({ icon: Icon, label, value, href }) => {
                const inner = (
                  <>
                    <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-secondary text-[var(--terra)]">
                      <Icon className="size-5" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-xs text-muted-foreground">{label}</span>
                      <span className="block truncate text-sm font-medium">{value}</span>
                    </span>
                  </>
                );
                return (
                  <li key={label}>
                    {href ? (
                      <a
                        href={href}
                        target={href.startsWith("http") ? "_blank" : undefined}
                        rel="noreferrer"
                        onClick={() => track("demo_click")}
                        className="flex items-center gap-3 rounded-xl border border-border bg-background/60 p-3 transition-colors hover:border-[var(--terra)]/40 hover:bg-secondary/60"
                      >
                        {inner}
                      </a>
                    ) : (
                      <div className="flex items-center gap-3 rounded-xl border border-border bg-background/60 p-3">{inner}</div>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
          {withForm && <DemoForm copy={form} lang={lang} />}
        </div>
      </Reveal>
    </section>
  );
}

function MinuteSection({ copy }: { copy: Copy["minute"] }) {
  return (
    <section className="border-y border-border bg-secondary/50">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 md:py-24">
        <Reveal>
          <h2 className="m-0 mb-3 max-w-2xl text-3xl font-semibold tracking-[-0.03em] text-balance sm:text-4xl">{copy.title}</h2>
          <p className="m-0 mb-10 max-w-2xl text-base leading-relaxed text-muted-foreground">{copy.text}</p>
        </Reveal>
        <Reveal delay={0.1}>
          <ContractMinute copy={copy} />
        </Reveal>
      </div>
    </section>
  );
}

export function Landing({ lang }: { lang: Lang }) {
  const copy = COPY[lang];
  const content = CONTENT[lang];
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const login = (
    <a href={siteConfig.appUrl} onClick={() => track("login_click")}>
      {copy.login}
    </a>
  );
  const demo = (
    <a href="#contacts" onClick={() => track("demo_click")}>
      {copy.contact.demo}
    </a>
  );

  return (
    <div className="min-h-dvh overflow-x-clip bg-background text-foreground">
      <header
        className={cn(
          "sticky top-0 z-20 border-b backdrop-blur transition-all duration-300",
          scrolled ? "border-border bg-background/85 shadow-sm" : "border-transparent bg-transparent",
        )}
      >
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 sm:px-6">
          <BrandLogo size="sm" />
          <nav className="flex items-center gap-1.5 sm:gap-2">
            <a href="#features" className="hidden px-3 text-sm text-muted-foreground transition-colors hover:text-foreground md:inline">
              {copy.more}
            </a>
            <a href="#pricing" className="hidden px-3 text-sm text-muted-foreground transition-colors hover:text-foreground md:inline">
              {content.pricing.title}
            </a>
            <a href="#faq" className="hidden px-3 text-sm text-muted-foreground transition-colors hover:text-foreground md:inline">
              {content.faq.title}
            </a>
            <SiteMenu lang={lang} />
            {/* Visitors get the demo as the one primary action; signing in is a quiet secondary link. */}
            {hasDemo ? (
              <>
                <Button asChild size="sm" variant="outline" className="hidden sm:inline-flex">
                  {login}
                </Button>
                <Button asChild size="sm">
                  {demo}
                </Button>
              </>
            ) : (
              <Button asChild size="sm">
                {login}
              </Button>
            )}
          </nav>
        </div>
      </header>

      <main>
        <section className="relative">
          <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
            <div className="lp-blob absolute -top-32 left-1/2 h-[420px] w-[820px] -translate-x-1/2 rounded-full bg-[var(--terra)]/20 blur-3xl" />
            <div
              className="lp-blob absolute top-40 -right-24 size-[360px] rounded-full bg-[var(--majolica)]/15 blur-3xl"
              style={{ animationDelay: "-6s" }}
            />
            <div
              className="absolute inset-0 opacity-[0.35]"
              style={{
                backgroundImage: "radial-gradient(rgba(30,44,41,0.12) 1px, transparent 1px)",
                backgroundSize: "22px 22px",
                maskImage: "radial-gradient(ellipse at 50% 20%, black, transparent 65%)",
                WebkitMaskImage: "radial-gradient(ellipse at 50% 20%, black, transparent 65%)",
              }}
            />
          </div>
          <div className="mx-auto max-w-6xl px-4 pt-14 pb-10 text-center sm:px-6 md:pt-24">
            <Rise>
              <span className="text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase">{copy.eyebrow}</span>
            </Rise>
            <Rise delay={0.08}>
              <h1 className="mx-auto mt-5 mb-5 max-w-4xl text-4xl leading-[1.05] font-semibold tracking-[-0.04em] text-balance sm:text-6xl lg:text-7xl">
                {copy.title} <span className="lp-gradient-text">{copy.accent}</span>
              </h1>
            </Rise>
            <Rise delay={0.16}>
              <p className="mx-auto m-0 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">{copy.lead}</p>
            </Rise>
            <Rise delay={0.24} className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Button asChild size="lg" className="group shadow-lg shadow-[var(--cedar)]/20 transition-transform hover:-translate-y-0.5">
                {hasDemo ? (
                  <a href="#contacts" onClick={() => track("demo_click")}>
                    {copy.contact.demo}
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </a>
                ) : (
                  <a href={siteConfig.appUrl} onClick={() => track("login_click")}>
                    {copy.cta}
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </a>
                )}
              </Button>
              <Button asChild size="lg" variant="outline">
                <a href="#features">{copy.more}</a>
              </Button>
            </Rise>
            <Rise delay={0.3} className="mx-auto mt-14 max-w-xl text-left">
              <Board legend={copy.legend} chips={copy.chips} />
            </Rise>
          </div>
        </section>

        <Proof content={content.proof} />

        <Problem content={content.problem} />

        <ProductTour copy={copy.tour} />

        <section id="features" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-14 sm:px-6 md:py-24">
          <Reveal>
            <h2 className="m-0 mb-10 max-w-2xl text-3xl font-semibold tracking-[-0.03em] text-balance sm:text-4xl">
              {copy.featuresTitle}
            </h2>
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {copy.features.map(([title, text], i) => {
              const Icon = FEATURE_ICONS[i] ?? Users;
              return (
                <Reveal key={title} delay={(i % 4) * 0.07}>
                  <SpotCard className="h-full p-5">
                    <span className="relative mb-4 grid size-11 place-items-center rounded-xl bg-secondary text-[var(--terra)] transition-colors duration-300 group-hover:bg-[var(--terra)] group-hover:text-white">
                      <Icon className="size-5" />
                    </span>
                    <h3 className="relative m-0 mb-1.5 text-base font-semibold">{title}</h3>
                    <p className="relative m-0 text-sm leading-relaxed text-muted-foreground">{text}</p>
                  </SpotCard>
                </Reveal>
              );
            })}
          </div>
        </section>

        <MinuteSection copy={copy.minute} />

        <InstallmentDemo copy={copy.demo} lang={lang} />

        <Security content={content.security} />

        <Pricing content={content.pricing} />

        <MobileApps copy={copy.mobile} />

        <Faq content={content.faq} />

        {hasDemo && <Contacts copy={copy.contact} form={copy.form} lang={lang} />}
      </main>

      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 pt-6 pb-24 text-sm text-muted-foreground sm:px-6 sm:pb-6">
          <BrandLogo size="sm" className="opacity-80" />
          <span>{copy.footer}</span>
          <a href={siteConfig.appUrl} onClick={() => track("login_click")} className="transition-colors hover:text-foreground">
            {copy.login}
          </a>
        </div>
      </footer>

      <div
        className={cn(
          "fixed inset-x-0 bottom-0 z-30 border-t border-border bg-background/90 p-3 backdrop-blur transition-transform duration-300 sm:hidden",
          scrolled ? "translate-y-0" : "translate-y-full",
        )}
        style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
      >
        <Button asChild size="lg" className="w-full">
          {hasDemo ? (
            <a href="#contacts" onClick={() => track("demo_click")}>
              {copy.contact.demo}
              <ArrowRight className="size-4" />
            </a>
          ) : (
            <a href={siteConfig.appUrl} onClick={() => track("login_click")}>
              {copy.sticky}
              <ArrowRight className="size-4" />
            </a>
          )}
        </Button>
      </div>
    </div>
  );
}
