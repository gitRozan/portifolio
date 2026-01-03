"use client";

import type { Project } from "@/content/portfolio";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/cn";
import { TechBadge } from "@/components/ui/tech-badge";

type Props = {
  project: Project;
  onClick: () => void;
  ctaLabel: string;
  className?: string;
};

export function ProjectCard({ project, onClick, ctaLabel, className }: Props) {
  const t = useTranslations();
  const title = t(`content.projects.${project.id}.title`);
  const summary = t(`content.projects.${project.id}.summary`);
  const badge = project.category === "sap" ? t("projects.badgeSap") : t("projects.badgeWeb");

  return (
    <button
      className={cn(
        "group relative text-left rounded-lg border border-slate-200/70 bg-white/50 p-6 backdrop-blur-sm transition-[transform,box-shadow,border-color] hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-lg active:scale-[0.99] dark:border-slate-800 dark:bg-slate-900/50 dark:hover:border-slate-700",
        className
      )}
      onClick={onClick}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="truncate text-sm font-semibold tracking-tight">{title}</div>
          <div className="mt-1 text-sm text-slate-600 dark:text-slate-300">{summary}</div>
        </div>
        <div className="shrink-0 rounded-md border border-slate-200 bg-white/60 px-2 py-1 text-[11px] font-semibold tracking-tight text-slate-600 transition-colors group-hover:border-slate-300 group-hover:text-slate-900 dark:border-slate-800 dark:bg-slate-950/20 dark:text-slate-300 dark:group-hover:border-slate-700 dark:group-hover:text-slate-100">
          {badge}
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {project.stack.slice(0, 4).map((s) => (
          <TechBadge key={s} label={s} />
        ))}
      </div>

      <div className="mt-5 flex items-center justify-between gap-3">
        <div className="text-xs font-medium text-slate-500 dark:text-slate-400">
          {project.stack.length > 4 ? `+${project.stack.length - 4}` : ""}
        </div>
        <div
          className={cn(
            "inline-flex items-center justify-center rounded-md border border-slate-200 bg-white/60 px-3 py-2 text-xs font-semibold tracking-tight text-slate-800 transition-[opacity,transform,background-color,border-color,box-shadow] opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:border-slate-300 group-hover:shadow-md dark:border-slate-800 dark:bg-slate-950/20 dark:text-slate-100 dark:group-hover:border-slate-700"
          )}
        >
          {ctaLabel}
        </div>
      </div>
    </button>
  );
}


