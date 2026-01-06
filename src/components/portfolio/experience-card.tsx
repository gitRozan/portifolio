"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/cn";
import type { Experience } from "@/content/portfolio";

type Props = {
  experience: Experience;
  className?: string;
};

function initialsFromCompany(company: string) {
  const parts = company
    .split(/[\s/&.-]+/g)
    .map((x) => x.trim())
    .filter(Boolean);
  const first = parts[0]?.[0] ?? "";
  const second = parts[1]?.[0] ?? parts[0]?.[1] ?? "";
  return (first + second).toUpperCase();
}

export function ExperienceCard({ experience, className }: Props) {
  const t = useTranslations();
  const [imgOk, setImgOk] = useState(true);
  const initials = useMemo(() => initialsFromCompany(experience.company), [experience.company]);
  const showImage = Boolean(experience.logoUrl) && imgOk;
  const role = t(`content.experience.${experience.id}.role`);
  const start = t(`content.experience.${experience.id}.start`);
  const end = t(`content.experience.${experience.id}.end`);
  const highlights = useMemo(() => {
    const key = `content.experience.${experience.id}.highlights`;
    const raw = "has" in t && typeof (t as unknown as { has: (k: string) => boolean }).has === "function" && !(t as unknown as { has: (k: string) => boolean }).has(key)
      ? []
      : t.raw(key);
    return Array.isArray(raw) ? raw.filter((x): x is string => typeof x === "string") : [];
  }, [experience.id, t]);
  const subtopics = useMemo(() => {
    const key = `content.experience.${experience.id}.subtopics`;
    const raw = "has" in t && typeof (t as unknown as { has: (k: string) => boolean }).has === "function" && !(t as unknown as { has: (k: string) => boolean }).has(key)
      ? []
      : t.raw(key);
    if (!Array.isArray(raw)) return [];
    return raw
      .map((x) => {
        if (!x || typeof x !== "object") return null;
        const title = (x as Record<string, unknown>).title;
        const items = (x as Record<string, unknown>).items;
        if (typeof title !== "string") return null;
        const list = Array.isArray(items) ? items.filter((i): i is string => typeof i === "string") : [];
        return { title, items: list };
      })
      .filter((x): x is { title: string; items: string[] } => Boolean(x));
  }, [experience.id, t]);

  return (
    <div
      className={cn(
        "group rounded-lg border border-slate-200/70 bg-white/50 p-6 backdrop-blur-sm transition-[transform,box-shadow,border-color] hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900/50 dark:hover:border-slate-700",
        className
      )}
    >
      <div className="flex gap-4">
        <div className="h-11 w-11 shrink-0 overflow-hidden rounded-md border border-slate-200 bg-white/60 dark:border-slate-800 dark:bg-slate-950/30">
          {showImage ? (
            <Image
              src={experience.logoUrl as string}
              alt={experience.company}
              width={44}
              height={44}
              className="h-full w-full object-contain p-2 grayscale transition duration-200 group-hover:grayscale-0"
              onError={() => setImgOk(false)}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-xs font-semibold tracking-tight text-slate-700 dark:text-slate-200">
              {initials}
            </div>
          )}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <div className="min-w-0">
              <div className="truncate text-sm font-semibold tracking-tight">{experience.company}</div>
              <div className="mt-1 text-sm text-slate-600 dark:text-slate-300">{role}</div>
            </div>
            <div className="text-xs font-medium text-slate-500 dark:text-slate-400">
              {start} — {end}
            </div>
          </div>
          {highlights.length ? (
            <ul className="mt-3 grid gap-1 text-sm text-slate-600 dark:text-slate-300">
              {highlights.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          ) : null}
          {subtopics.length ? (
            <div className="mt-4 grid gap-3">
              {subtopics.map((s) => (
                <div
                  key={s.title}
                  className="rounded-md border border-slate-200/70 bg-white/40 px-4 py-3 dark:border-slate-800 dark:bg-slate-950/20"
                >
                  <div className="text-sm font-semibold tracking-tight">{s.title}</div>
                  {s.items.length ? (
                    <ul className="mt-2 grid gap-1 text-sm text-slate-600 dark:text-slate-300">
                      {s.items.map((x) => (
                        <li key={x}>{x}</li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}


