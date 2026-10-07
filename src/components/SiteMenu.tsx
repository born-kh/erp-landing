import { useEffect, useRef, useState } from "react";
import { Check, Moon, Settings2, Sun } from "lucide-react";
import { langCodes, langLabels, langPath, langs, type Lang } from "../lib/lang";
import { cn } from "../lib/cn";

const THEME_KEY = "erp-landing-theme";
const labels: Record<Lang, { light: string; dark: string; menu: string }> = {
  ru: { light: "Светлая тема", dark: "Тёмная тема", menu: "Язык и тема" },
  tg: { light: "Мавзӯи равшан", dark: "Мавзӯи торик", menu: "Забон ва мавзӯъ" },
  en: { light: "Light theme", dark: "Dark theme", menu: "Language and theme" },
};

/** Language links (each language is its own URL, good for search engines) and a theme switch. */
export function SiteMenu({ lang }: { lang: Lang }) {
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const toggleTheme = () => {
    const next = !dark;
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem(THEME_KEY, next ? "dark" : "light");
    } catch {
      /* private mode: the choice just is not remembered */
    }
    setDark(next);
  };

  const t = labels[lang];
  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        aria-label={t.menu}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="grid size-9 place-items-center rounded-md border border-border bg-card text-foreground transition-colors hover:bg-secondary"
      >
        <Settings2 className="size-4" />
      </button>
      {open && (
        <div className="absolute right-0 z-40 mt-2 w-52 rounded-xl border border-border bg-card p-1.5 text-sm shadow-xl">
          {langs.map((code) => (
            <a
              key={code}
              href={langPath(code)}
              hrefLang={code}
              className={cn(
                "flex items-center justify-between rounded-lg px-3 py-2 transition-colors hover:bg-secondary",
                code === lang && "font-semibold",
              )}
            >
              <span>
                <span className="mr-2 text-xs text-muted-foreground">{langCodes[code]}</span>
                {langLabels[code]}
              </span>
              {code === lang && <Check className="size-4 text-[var(--terra)]" />}
            </a>
          ))}
          <div className="my-1 border-t border-border" />
          <button
            type="button"
            onClick={toggleTheme}
            className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left transition-colors hover:bg-secondary"
          >
            {dark ? <Sun className="size-4" /> : <Moon className="size-4" />}
            {dark ? t.light : t.dark}
          </button>
        </div>
      )}
    </div>
  );
}
