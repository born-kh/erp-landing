import { useState, type FormEvent } from "react";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "./Button";
import { cn } from "../lib/cn";
import { leadEndpoint, siteConfig } from "../lib/config";
import { track } from "../lib/track";
import type { Copy } from "../lib/copy";
import type { Lang } from "../lib/lang";

type State = "idle" | "sending" | "done" | "error";

/** Where a request goes when there is no form endpoint: a prefilled message to the first contact set. */
function fallbackHref(text: string) {
  const c = siteConfig.contacts;
  const enc = encodeURIComponent(text);
  if (c.telegramHref) return `${c.telegramHref}?text=${enc}`;
  if (c.whatsappHref) return `${c.whatsappHref}?text=${enc}`;
  if (c.emailHref) return `${c.emailHref}?subject=${encodeURIComponent("ERP demo")}&body=${enc}`;
  return "";
}

export function DemoForm({ copy, lang }: { copy: Copy["form"]; lang: Lang }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [type, setType] = useState(0);
  const [trap, setTrap] = useState("");
  const [state, setState] = useState<State>("idle");
  const [error, setError] = useState("");

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (trap) return; // a bot filled the hidden field
    if (!name.trim() || !phone.trim()) {
      setError(copy.required);
      return;
    }
    setError("");
    setState("sending");
    const payload = { name: name.trim(), phone: phone.trim(), company: company.trim(), type: copy.types[type], lang };
    try {
      if (leadEndpoint) {
        const res = await fetch(leadEndpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error(String(res.status));
      } else {
        const text = [copy.message, `${copy.name}: ${payload.name}`, `${copy.phone}: ${payload.phone}`, payload.company && `${copy.company}: ${payload.company}`, `${copy.type}: ${payload.type}`]
          .filter(Boolean)
          .join("\n");
        const href = fallbackHref(text);
        if (!href) throw new Error("no channel");
        window.open(href, "_blank", "noopener");
      }
      track("demo_submit");
      setState("done");
    } catch {
      setState("error");
    }
  };

  if (state === "done") {
    return (
      <div className="grid place-items-center gap-3 rounded-2xl border border-border bg-background/60 p-8 text-center">
        <CheckCircle2 className="size-10 text-[var(--success)]" />
        <div className="text-lg font-semibold">{copy.success}</div>
        <p className="m-0 max-w-xs text-sm text-muted-foreground">{copy.successText}</p>
      </div>
    );
  }

  const input =
    "h-11 w-full rounded-lg border border-input bg-background px-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-[var(--terra)] focus:ring-2 focus:ring-[var(--terra)]/20";

  return (
    <form onSubmit={submit} noValidate className="grid gap-3 rounded-2xl border border-border bg-background/60 p-5 sm:p-6">
      <h3 className="m-0 text-lg font-semibold">{copy.title}</h3>
      <input className={input} name="name" autoComplete="name" placeholder={copy.name} value={name} onChange={(e) => setName(e.target.value)} />
      <input className={input} name="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder={copy.phone} value={phone} onChange={(e) => setPhone(e.target.value)} />
      <input className={input} name="company" autoComplete="organization" placeholder={copy.company} value={company} onChange={(e) => setCompany(e.target.value)} />
      <div>
        <div className="mb-1.5 text-xs text-muted-foreground">{copy.type}</div>
        <div role="radiogroup" className="flex flex-wrap gap-2">
          {copy.types.map((label, i) => (
            <button
              key={label}
              type="button"
              role="radio"
              aria-checked={type === i}
              onClick={() => setType(i)}
              className={cn(
                "rounded-full border px-3.5 py-1.5 text-sm transition-colors",
                type === i ? "border-foreground bg-foreground text-background" : "border-border bg-card text-muted-foreground hover:text-foreground",
              )}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
      {/* Honeypot: invisible to people, tempting to bots. */}
      <input tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 opacity-0" name="website" value={trap} onChange={(e) => setTrap(e.target.value)} />
      {(error || state === "error") && <p className="m-0 text-sm text-destructive">{error || copy.error}</p>}
      <Button type="submit" size="lg" disabled={state === "sending"} className="group">
        {state === "sending" ? (
          <>
            <Loader2 className="size-4 animate-spin" />
            {copy.sending}
          </>
        ) : (
          <>
            {copy.submit}
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </>
        )}
      </Button>
      <p className="m-0 text-xs leading-relaxed text-muted-foreground">{copy.consent}</p>
    </form>
  );
}
