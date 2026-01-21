"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/button";

export function AboutSection({ className }: { className?: string }) {
  const t = useTranslations();
  const [imgOk, setImgOk] = useState(true);

  const paragraphs = useMemo(() => {
    const raw = t("about.body");
    return raw
      .split(/\n\s*\n/g)
      .map((x) => x.trim())
      .filter(Boolean);
  }, [t]);

  return (
    <section id="about" aria-labelledby="about-title" className={cn("relative", className)}>
      <div className="pointer-events-none absolute inset-0 opacity-80 [mask-image:radial-gradient(ellipse_at_top,black,transparent_65%)]">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(15,23,42,0.10)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.10)_1px,transparent_1px)] bg-[size:44px_44px] dark:bg-[linear-gradient(to_right,rgba(148,163,184,0.10)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.10)_1px,transparent_1px)]" />
      </div>

      <div className="overflow-hidden rounded-lg border border-slate-200/70 bg-white/50 backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/50">
        <div className="grid gap-6 p-6 md:p-7">
          <div className="grid gap-6 md:grid-cols-12 md:items-start">
            <div className="md:col-span-8">
              <div className="grid gap-5">
                <div className="text-[11px] font-semibold tracking-[0.18em] text-slate-500 dark:text-slate-400">
                  {t("about.kicker")}
                </div>
                <div className="grid gap-3">
                  <h1 id="about-title" className="text-balance text-3xl font-semibold tracking-tight md:text-4xl">
                    {t("hero.name")}
                  </h1>
                  <div className="max-w-2xl text-pretty text-base font-semibold tracking-tight text-slate-600 dark:text-slate-300 md:text-lg">
                    {highlightKeywords(t("hero.role"))}
                  </div>
                </div>

                <div className="flex flex-col gap-2 sm:flex-row">
                  <a href="#projects" className="w-full sm:w-auto">
                    <Button variant="primary" className="w-full sm:w-auto">
                      {t("nav.projects")}
                    </Button>
                  </a>
                  <a href="#contact" className="w-full sm:w-auto">
                    <Button variant="secondary" className="w-full sm:w-auto">
                      {t("nav.contact")}
                    </Button>
                  </a>
                </div>

                <div className="grid gap-1">
                  <div className="text-[11px] font-semibold tracking-[0.18em] text-slate-500 dark:text-slate-400">
                    {t("about.locationLabel")}
                  </div>
                  <div className="text-sm font-semibold tracking-tight text-slate-900 dark:text-slate-100 md:text-base">
                    {t("about.location")}
                  </div>
                </div>
              </div>
            </div>

            <div className="md:col-span-4 md:flex md:justify-end">
              <div className="w-full max-w-[300px] overflow-hidden rounded-lg border border-slate-200/70 bg-white/50 dark:border-slate-800 dark:bg-slate-950/20">
                <div className="relative aspect-[4/5]">
                  {imgOk ? (
                    <Image
                      src="/assets/profile.jpg"
                      alt={t("about.photoAlt")}
                      fill
                      sizes="(min-width: 768px) 300px, 100vw"
                      className="object-cover"
                      onError={() => setImgOk(false)}
                      priority
                    />
                  ) : (
                    <div className="absolute inset-0 grid place-items-center text-3xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
                      {t("about.photoFallback")}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-12 md:items-start">
            <div className="md:col-span-8">
              <div className="grid gap-3">
                <div className="text-[11px] font-semibold tracking-[0.18em] text-slate-500 dark:text-slate-400">
                  {t("about.headline")}
                </div>
                <div className="grid gap-3">
                  {paragraphs.map((p, i) => (
                    <p key={`${i}-${p}`} className="text-pretty text-sm text-slate-600 dark:text-slate-300 md:text-base">
                      {p}
                    </p>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid gap-3 md:col-span-4">
              <HardFact label={t("about.facts.xpLabel")} value={t("about.facts.xpValue")} />
              <HardFact label={t("about.facts.focusLabel")} value={t("about.facts.focusValue")} />
              <HardFact label={t("about.facts.stackLabel")} value={t("about.facts.stackValue")} />
            </div>
          </div>

          <div className="rounded-lg border border-slate-200/70 bg-white/40 px-4 py-3 text-xs font-semibold tracking-tight text-slate-600 dark:border-slate-800 dark:bg-slate-950/20 dark:text-slate-300">
            {t("about.facts.signalValue")}
          </div>
        </div>
      </div>
    </section>
  );
}

function escapeRegExp(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function highlightKeywords(text: string) {
  const keywords = ["SAP", "BTP", "ABAP", "RAP", "Fiori", "SAPUI5", "OData", "CDS"];
  const re = new RegExp(`(${keywords.map(escapeRegExp).join("|")})`, "gi");
  const parts = text.split(re);
  return parts.map((part, i) => {
    const isKw = keywords.some((k) => k.toLowerCase() === part.toLowerCase());
    return isKw ? (
      <span key={`${part}-${i}`} className="font-semibold text-brand">
        {part}
      </span>
    ) : (
      <span key={`${part}-${i}`}>{part}</span>
    );
  });
}

function HardFact({
  label,
  value,
  className,
}: {
  label: string;
  value: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-lg border border-slate-200/70 bg-white/40 p-4 dark:border-slate-800 dark:bg-slate-950/20",
        className
      )}
    >
      <div className="grid gap-1">
        <div className="text-[11px] font-semibold tracking-[0.18em] text-slate-500 dark:text-slate-400">{label}</div>
        <div className="text-lg font-semibold tracking-tight text-slate-900 dark:text-slate-100 md:text-xl">
          {highlightKeywords(value)}
        </div>
      </div>
    </div>
  );
}


