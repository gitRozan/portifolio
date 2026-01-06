"use client";

import { useMemo } from "react";
import { useTranslations } from "next-intl";
import { Award, GraduationCap, BadgeCheck, ExternalLink, FileText } from "lucide-react";
import { cn } from "@/lib/cn";
import { credentials, type Credential, type CredentialKind } from "@/content/portfolio";

function kindIcon(kind: CredentialKind) {
  if (kind === "badge") return <BadgeCheck className="h-4 w-4 text-brand" />;
  if (kind === "certification") return <Award className="h-4 w-4 text-brand" />;
  return <GraduationCap className="h-4 w-4 text-brand" />;
}

function safeYM(ym: string) {
  return /^\d{4}-\d{2}$/.test(ym) ? ym : "";
}

function formatYM(ym: string) {
  const safe = safeYM(ym);
  if (!safe) return "";
  const [y, m] = safe.split("-");
  const dt = new Date(Number(y), Number(m) - 1, 1);
  try {
    return new Intl.DateTimeFormat(undefined, { year: "numeric", month: "short" }).format(dt);
  } catch {
    return safe;
  }
}

function Card({ item, label }: { item: Credential; label: string }) {
  const t = useTranslations();
  const date = item.issueYM ? formatYM(item.issueYM) : "";
  const proof = item.proof?.href && item.proof.href.trim().length ? item.proof : null;
  return (
    <div className="group rounded-lg border border-slate-200/70 bg-white/50 p-6 backdrop-blur-sm transition-[transform,box-shadow,border-color] hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900/50 dark:hover:border-slate-700">
      <div className="flex items-start justify-between gap-4">
        <div className="grid gap-1">
          <div className="text-[11px] font-semibold tracking-tight text-slate-500 dark:text-slate-400">{label}</div>
          <div className="text-sm font-semibold tracking-tight text-slate-900 dark:text-slate-100">{item.title}</div>
          <div className="text-xs font-semibold tracking-tight text-slate-500 dark:text-slate-400">
            {item.issuer}
            {item.status === "inProgress" ? ` • ${t("credentials.statusInProgress")}` : ""}
            {date ? ` • ${date}` : ""}
          </div>
        </div>
        <div className="shrink-0">{kindIcon(item.kind)}</div>
      </div>
      {proof ? (
        <a
          href={proof.href}
          target="_blank"
          rel="noreferrer"
          className="inline-flex w-fit items-center gap-2 rounded-md border border-slate-200/70 bg-white/60 px-3 py-2 text-xs font-semibold tracking-tight text-slate-800 transition-[transform,box-shadow,border-color,background-color] hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md active:scale-95 dark:border-slate-800 dark:bg-slate-950/20 dark:text-slate-100 dark:hover:border-slate-700"
        >
          {proof.type === "pdf" ? <FileText className="h-4 w-4 text-brand" /> : <ExternalLink className="h-4 w-4 text-brand" />}
          {proof.type === "pdf" ? t("credentials.proofPdf") : t("credentials.proofExternal")}
        </a>
      ) : null}
    </div>
  );
}

export function CredentialsSection({ className }: { className?: string }) {
  const t = useTranslations();

  const groups = useMemo(() => {
    const sorted = [...credentials].sort((a, b) => (b.issueYM || "").localeCompare(a.issueYM || ""));
    const byKind = new Map<CredentialKind, Credential[]>();
    for (const c of sorted) {
      const arr = byKind.get(c.kind) ?? [];
      arr.push(c);
      byKind.set(c.kind, arr);
    }
    return byKind;
  }, []);

  const kinds: CredentialKind[] = ["higherEducation", "course", "certification", "badge"];
  const total = credentials.length;

  return (
    <section id="credentials" aria-labelledby="credentials-title" className={cn(className)}>
      <div className="rounded-md border border-slate-200/70 bg-white/50 p-6 backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/50">
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <h2 id="credentials-title" className="text-sm font-semibold tracking-tight">
            {t("credentials.title")}
          </h2>
          <div className="text-xs font-semibold tracking-tight text-slate-500 dark:text-slate-400 tabular-nums">
            {total ? t("credentials.count", { n: total }) : t("credentials.emptyKicker")}
          </div>
        </div>

        {total ? (
          <div className="mt-5 grid gap-6">
            {kinds.map((k) => {
              const list = groups.get(k) ?? [];
              if (!list.length) return null;
              const label =
                k === "higherEducation"
                  ? t("credentials.kindHigherEducation")
                  : k === "certification"
                    ? t("credentials.kindCertification")
                    : k === "badge"
                      ? t("credentials.kindBadge")
                      : t("credentials.kindCourse");
              return (
                <div key={k} className="grid gap-3">
                  <div className="text-xs font-semibold tracking-tight text-slate-500 dark:text-slate-400">{label}</div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {list.map((item) => (
                      <Card key={item.id} item={item} label={label} />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="mt-4 rounded-md border border-slate-200/70 bg-white/40 p-5 text-sm text-slate-600 dark:border-slate-800 dark:bg-slate-950/20 dark:text-slate-300">
            {t("credentials.emptyBody")}
          </div>
        )}
      </div>
    </section>
  );
}


