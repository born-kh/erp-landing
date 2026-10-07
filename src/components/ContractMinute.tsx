import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { CheckCircle2, FileText } from "lucide-react";
import { cn } from "../lib/cn";
import type { Copy } from "../lib/copy";

const STEP_MS = 3000;
const BOARD = [
  ["s", "a", "a", "r"],
  ["a", "s", "a", "a"],
  ["a", "a", "r", "s"],
] as const;

function useInView<T extends Element>() {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, inView] as const;
}

/** Four steps that loop while the block is on screen: client -> apartment -> document builds -> download. */
export function ContractMinute({ copy }: { copy: Copy["minute"] }) {
  const [ref, inView] = useInView<HTMLDivElement>();
  const [step, setStep] = useState(0);
  const [manual, setManual] = useState(false);

  useEffect(() => {
    if (!inView || manual || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setTimeout(() => setStep((s) => (s + 1) % 4), STEP_MS);
    return () => window.clearTimeout(id);
  }, [step, inView, manual]);

  const panel: ReactNode =
    step === 0 ? (
      <div className="grid gap-3">
        <div className="text-xs text-muted-foreground">{copy.client}</div>
        <div className="rounded-lg border border-[var(--terra)]/50 bg-card px-3 py-2.5 text-sm font-medium ring-2 ring-[var(--terra)]/15">
          <span className="lp-typing inline-block max-w-full align-bottom">{copy.clientValue}</span>
        </div>
        <div className="grid gap-1.5 text-sm text-muted-foreground">
          <div className="rounded-md bg-muted/50 px-3 py-2">{copy.clientValue}</div>
          <div className="rounded-md bg-muted/30 px-3 py-2 opacity-60">••• ••••••</div>
          <div className="rounded-md bg-muted/30 px-3 py-2 opacity-40">••• ••••••</div>
        </div>
      </div>
    ) : step === 1 ? (
      <div className="grid gap-3">
        <div className="text-xs text-muted-foreground">{copy.unit}</div>
        <div className="grid grid-cols-4 gap-1.5">
          {BOARD.flatMap((row, r) =>
            row.map((cell, c) => {
              const picked = r === 1 && c === 2;
              return (
                <div
                  key={`${r}-${c}`}
                  className={cn(
                    "grid h-11 place-items-center rounded-md border text-sm font-semibold tabular-nums transition-all duration-500",
                    picked
                      ? "scale-105 border-foreground bg-foreground text-background shadow-lg"
                      : cell === "a"
                        ? "border-[var(--success)]/50 bg-card text-[var(--success)]"
                        : cell === "r"
                          ? "border-[var(--warning)]/50 bg-[var(--warning-bg)] text-[var(--warning)]"
                          : "border-transparent bg-foreground/70 text-background/85 dark:bg-foreground/25 dark:text-foreground/55",
                  )}
                >
                  {(3 - r) * 10 + c + 23}
                </div>
              );
            }),
          )}
        </div>
      </div>
    ) : (
      <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
        <div className="rounded-lg border border-border bg-white p-4 font-serif text-[13px] leading-relaxed text-[#111] shadow-sm dark:bg-[#f6f3ec]">
          <div className="mb-2 text-center text-sm font-bold">{copy.docTitle}</div>
          {copy.docFields.map((field, i) => (
            <p key={field} className="m-0 mb-1.5">
              {field}:{" "}
              <span
                className="lp-pop rounded bg-[#e8efff] px-1.5 py-0.5 font-sans text-xs font-medium text-[#2a4fd6]"
                style={{ "--d": `${0.2 + i * 0.35}s` } as CSSProperties}
              >
                {copy.docValues[i]}
              </span>
            </p>
          ))}
          {[80, 60, 70].map((w, i) => (
            <div
              key={i}
              className="lp-line mt-2 h-2 rounded bg-black/10"
              style={{ width: `${w}%`, "--d": `${1.2 + i * 0.2}s` } as CSSProperties}
            />
          ))}
        </div>
        {step === 3 && (
          <div className="flex flex-row items-start gap-2 sm:flex-col">
            <div className="lp-pop inline-flex items-center gap-1.5 rounded-lg bg-[var(--success-bg)] px-3 py-2 text-sm font-medium text-[var(--success)]">
              <CheckCircle2 className="size-4" />
              {copy.ready}
            </div>
            {[copy.pdf, copy.word].map((label, i) => (
              <div
                key={label}
                className="lp-pop inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-2 text-sm font-medium"
                style={{ "--d": `${0.2 + i * 0.15}s` } as CSSProperties}
              >
                <FileText className="size-4" />
                {label}
              </div>
            ))}
          </div>
        )}
      </div>
    );

  return (
    <div ref={ref} className="grid items-center gap-8 lg:grid-cols-[1fr_1.1fr]">
      <ol className="m-0 grid list-none gap-2 p-0">
        {copy.steps.map((label, i) => (
          <li key={label}>
            <button
              type="button"
              onClick={() => {
                setManual(true);
                setStep(i);
              }}
              className={cn(
                "relative flex w-full items-center gap-3 overflow-hidden rounded-xl border px-4 py-3 text-left transition-colors",
                step === i ? "border-[var(--terra)]/40 bg-card shadow-sm" : "border-transparent text-muted-foreground hover:bg-card/60",
              )}
            >
              <span
                className={cn(
                  "grid size-8 shrink-0 place-items-center rounded-full text-sm font-semibold transition-colors",
                  step === i ? "bg-primary text-primary-foreground" : i < step ? "bg-[var(--success)] text-white" : "bg-secondary",
                )}
              >
                {i < step ? "✓" : i + 1}
              </span>
              <span className={cn("text-sm font-medium sm:text-base", step === i && "text-foreground")}>{label}</span>
              {step === i && !manual && inView && (
                <span key={step} className="lp-bar absolute bottom-0 left-0 h-0.5 bg-[var(--terra)]" style={{ width: "100%", animationDuration: `${STEP_MS}ms`, animationTimingFunction: "linear" }} />
              )}
            </button>
          </li>
        ))}
      </ol>
      <div className="rounded-2xl border border-border bg-card p-4 shadow-[0_30px_70px_-40px_rgba(30,44,41,0.5)] sm:p-6">
        <div key={step} className="lp-pop min-h-[230px]" style={{ animationDuration: "0.4s" }}>
          {panel}
        </div>
      </div>
    </div>
  );
}
