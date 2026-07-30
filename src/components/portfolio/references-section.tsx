"use client";

import { Briefcase, ExternalLink, MapPin } from "lucide-react";
import { useTranslations } from "next-intl";
import { references } from "@/content/portfolio";

function linkedInLabel(url: string) {
  return url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");
}

export function ReferencesSection() {
  const t = useTranslations("references");
  const tRoot = useTranslations();

  return (
    <section
      id="references"
      aria-labelledby="references-title"
      className="rounded-md border border-slate-200/70 bg-white/50 p-6 backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/50"
    >
      <h2 id="references-title" className="text-sm font-semibold tracking-tight">
        {t("title")}
      </h2>
      <div className="mt-5 grid gap-3 md:grid-cols-3">
        {references.map((person) => {
          const roleLine = [person.role, person.company].filter(Boolean).join(" · ");
          const contextKey = `content.references.${person.id}.context` as const;
          const context = tRoot.has(contextKey) ? tRoot(contextKey) : null;

          return (
            <article
              key={person.id}
              className="rounded-lg border border-slate-200/70 bg-white/50 p-5 backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/50"
            >
              <h3 className="text-sm font-semibold tracking-tight text-slate-900 dark:text-slate-100">
                {person.name}
              </h3>

              <dl className="mt-4 grid gap-3 text-xs">
                {roleLine ? (
                  <div className="flex items-start gap-2.5">
                    <Briefcase className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand" aria-hidden />
                    <div>
                      <dt className="sr-only">{t("role")}</dt>
                      <dd className="font-medium text-slate-700 dark:text-slate-200">{roleLine}</dd>
                      {context ? (
                        <dd className="mt-1 text-slate-600 dark:text-slate-400">{context}</dd>
                      ) : null}
                    </div>
                  </div>
                ) : null}

                <div className="flex items-start gap-2.5">
                  <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand" aria-hidden />
                  <div>
                    <dt className="sr-only">{t("location")}</dt>
                    <dd className="font-medium text-slate-600 dark:text-slate-300">{person.location}</dd>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <ExternalLink className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand" aria-hidden />
                  <div>
                    <dt className="sr-only">{t("linkedin")}</dt>
                    <dd>
                      <a
                        href={person.linkedin}
                        className="inline-flex items-center gap-1 font-medium text-brand transition-colors hover:text-brand/80"
                        target="_blank"
                        rel="noreferrer"
                      >
                        {linkedInLabel(person.linkedin)}
                      </a>
                    </dd>
                  </div>
                </div>
              </dl>
            </article>
          );
        })}
      </div>
      <p className="mt-4 text-xs text-slate-500 dark:text-slate-400">{t("onRequest")}</p>
    </section>
  );
}
