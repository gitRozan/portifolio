"use client";

import { useMemo, useState, useRef, useCallback, useEffect } from "react";
import { createPortal } from "react-dom";
import { useTranslations } from "next-intl";
import { Award, GraduationCap, BadgeCheck, ExternalLink, FileText } from "lucide-react";
import { cn } from "@/lib/cn";
import { credentials, type Credential, type CredentialKind } from "@/content/portfolio";
import { Modal } from "@/components/ui/modal";

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

const HOVER_PREVIEW_DELAY_MS = 400;
const PREVIEW_Z_INDEX = 100;

function Card({
  item,
  label,
  onOpenCertificate,
  onHoverStart,
  onHoverEnd,
  canHoverPreview,
}: {
  item: Credential;
  label: string;
  onOpenCertificate: (cred: Credential) => void;
  onHoverStart: (cred: Credential, rect: DOMRect) => void;
  onHoverEnd: () => void;
  canHoverPreview: boolean;
}) {
  const t = useTranslations();
  const cardRef = useRef<HTMLDivElement>(null);
  const date = item.issueYM ? formatYM(item.issueYM) : "";
  const proof = item.proof?.href && item.proof.href.trim().length ? item.proof : null;
  const isPdf = proof?.type === "pdf";

  const handleMouseEnter = useCallback(() => {
    if (!isPdf || !canHoverPreview || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    onHoverStart(item, rect);
  }, [isPdf, canHoverPreview, item, onHoverStart]);

  return (
    <div
      ref={cardRef}
      className={cn(
        "group relative rounded-lg border border-slate-200/70 bg-white/50 p-6 backdrop-blur-sm transition-[transform,box-shadow,border-color] hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900/50 dark:hover:border-slate-700",
        isPdf && "cursor-pointer"
      )}
      onClick={() => isPdf && onOpenCertificate(item)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={onHoverEnd}
      role={isPdf ? "button" : undefined}
      tabIndex={isPdf ? 0 : undefined}
      onKeyDown={(e) => isPdf && (e.key === "Enter" || e.key === " ") && (e.preventDefault(), onOpenCertificate(item))}
    >
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
        <div className="mt-3 flex flex-wrap items-center gap-2">
          {isPdf ? (
            <span className="inline-flex items-center gap-2 rounded-md border border-slate-200/70 bg-white/60 px-3 py-2 text-xs font-semibold tracking-tight text-slate-800 dark:border-slate-800 dark:bg-slate-950/20 dark:text-slate-100">
              <FileText className="h-4 w-4 text-brand" />
              {t("credentials.proofPdf")}
            </span>
          ) : (
            <a
              href={proof.href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex w-fit items-center gap-2 rounded-md border border-slate-200/70 bg-white/60 px-3 py-2 text-xs font-semibold tracking-tight text-slate-800 transition-[transform,box-shadow,border-color,background-color] hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md active:scale-95 dark:border-slate-800 dark:bg-slate-950/20 dark:text-slate-100 dark:hover:border-slate-700"
              onClick={(e) => e.stopPropagation()}
            >
              <ExternalLink className="h-4 w-4 text-brand" />
              {t("credentials.proofExternal")}
            </a>
          )}
        </div>
      ) : null}
    </div>
  );
}

type HoverPreviewState = { cred: Credential; rect: DOMRect } | null;

export function CredentialsSection({ className }: { className?: string }) {
  const t = useTranslations();
  const [modalCredential, setModalCredential] = useState<Credential | null>(null);
  const [hoverPreview, setHoverPreview] = useState<HoverPreviewState>(null);
  const [canHoverPreview, setCanHoverPreview] = useState(false);
  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover)");
    setCanHoverPreview(mq.matches);
    const handler = () => setCanHoverPreview(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (!hoverPreview) return;
    const onScroll = () => setHoverPreview(null);
    window.addEventListener("scroll", onScroll, true);
    return () => window.removeEventListener("scroll", onScroll, true);
  }, [hoverPreview]);

  const handleHoverStart = useCallback((cred: Credential, rect: DOMRect) => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    hoverTimeoutRef.current = setTimeout(() => setHoverPreview({ cred, rect }), HOVER_PREVIEW_DELAY_MS);
  }, []);

  const handleHoverEnd = useCallback(() => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    closeTimeoutRef.current = setTimeout(() => setHoverPreview(null), 120);
  }, []);

  const cancelClosePreview = useCallback(() => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  }, []);

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
                      <Card
                        key={item.id}
                        item={item}
                        label={label}
                        onOpenCertificate={setModalCredential}
                        onHoverStart={handleHoverStart}
                        onHoverEnd={handleHoverEnd}
                        canHoverPreview={canHoverPreview}
                      />
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

      {modalCredential?.proof?.type === "pdf" && modalCredential.proof.href && (
        <Modal
          open={!!modalCredential}
          onClose={() => setModalCredential(null)}
          title={modalCredential.title}
        >
          <iframe
            title={modalCredential.title}
            src={modalCredential.proof.href}
            className="h-[min(75vh,720px)] w-full rounded border-0 border-slate-200/70 dark:border-slate-700"
          />
        </Modal>
      )}

      {hoverPreview?.cred.proof?.type === "pdf" &&
        hoverPreview.cred.proof.href &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            className="fixed w-[min(320px,90vw)] overflow-hidden rounded-lg border border-slate-200/70 bg-white shadow-xl dark:border-slate-700 dark:bg-slate-900"
            style={{
              zIndex: PREVIEW_Z_INDEX,
              left: (() => {
                const w = Math.min(320, window.innerWidth * 0.9);
                return Math.max(8, Math.min(hoverPreview.rect.left, window.innerWidth - w - 16));
              })(),
              top: (() => {
                const h = 420;
                const pad = 8;
                if (hoverPreview.rect.bottom + pad + h <= window.innerHeight - pad) {
                  return hoverPreview.rect.bottom + pad;
                }
                return Math.max(pad, hoverPreview.rect.top - h - pad);
              })(),
            }}
            onMouseEnter={cancelClosePreview}
            onMouseLeave={() => setHoverPreview(null)}
          >
            <div className="border-b border-slate-200/70 px-3 py-2 text-xs font-semibold text-slate-700 dark:border-slate-700 dark:text-slate-200">
              {hoverPreview.cred.title}
            </div>
            <iframe
              title={hoverPreview.cred.title}
              src={hoverPreview.cred.proof.href}
              className="h-[min(420px,60vh)] w-full border-0"
            />
          </div>,
          document.body
        )}
    </section>
  );
}


