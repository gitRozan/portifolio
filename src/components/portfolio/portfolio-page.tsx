"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { Moon, Sun, Languages, Download, Mail, Github, Linkedin } from "lucide-react";
import { useTheme } from "next-themes";
import { usePathname, useRouter } from "next/navigation";
import type { Locale } from "@/i18n/locales";
import { isLocale } from "@/i18n/locales";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { TechBadge } from "@/components/ui/tech-badge";
import { experiences, projects, skills, type Project, type ProjectCategory } from "@/content/portfolio";
import { ExperienceCard } from "@/components/portfolio/experience-card";
import { ProjectCard } from "@/components/portfolio/project-card";

function useCurrentLocale(): Locale {
  const pathname = usePathname();
  const seg = pathname.split("/").filter(Boolean)[0] ?? "en";
  return isLocale(seg) ? seg : "en";
}

export function PortfolioPage() {
  const t = useTranslations();
  const router = useRouter();
  const pathname = usePathname();
  const locale = useCurrentLocale();
  const { theme, setTheme } = useTheme();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cvOpen, setCvOpen] = useState(false);
  const [tab, setTab] = useState<ProjectCategory>("sap");
  const [selected, setSelected] = useState<Project | null>(null);

  const projectsFiltered = useMemo(
    () => projects.filter((p) => p.category === tab),
    [tab]
  );

  const experiencesSorted = useMemo(() => {
    const copy = [...experiences];
    copy.sort((a, b) => b.startYM.localeCompare(a.startYM));
    return copy;
  }, []);

  const switchLocale = (nextLocale: Locale) => {
    const segments = pathname.split("/").filter(Boolean);
    if (segments.length === 0) {
      router.push(`/${nextLocale}`);
      return;
    }
    if (isLocale(segments[0])) segments[0] = nextLocale;
    router.push(`/${segments.join("/")}`);
  };

  const navItems = [
    { id: "about", label: t("nav.about") },
    { id: "experience", label: t("nav.experience") },
    { id: "projects", label: t("nav.projects") },
    { id: "skills", label: t("nav.skills") },
    { id: "contact", label: t("nav.contact") }
  ];

  const toStringArray = (value: unknown) =>
    Array.isArray(value) ? value.filter((x): x is string => typeof x === "string") : [];

  return (
    <div className="min-h-screen bg-bg text-fg">
      <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-bg/70 backdrop-blur-md dark:border-slate-800">
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-4 py-3.5">
          <div className="min-w-0">
            <div className="truncate text-sm font-semibold">{t("hero.name")}</div>
            <div className="truncate text-xs text-slate-500 dark:text-slate-400">{t("hero.role")}</div>
          </div>

          <div className="hidden items-center gap-2 md:flex">
            <nav className="mr-2 flex items-center gap-1">
              {navItems.map((it) => (
                <a
                  key={it.id}
                  href={`#${it.id}`}
                  className="rounded-md px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-950/5 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-100/10 dark:hover:text-slate-50"
                >
                  {it.label}
                </a>
              ))}
            </nav>

            <div className="relative">
              <Button variant="secondary" onClick={() => setCvOpen((v) => !v)}>
                <Download className="mr-2 h-4 w-4" />
                {t("hero.ctaDownload")}
              </Button>
              {cvOpen ? (
                <div className="absolute right-0 mt-2 w-56 overflow-hidden rounded-lg border border-slate-200/70 bg-white/70 shadow-soft backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/70">
                  <a
                    className="block px-4 py-3 text-sm text-slate-700 hover:bg-slate-950/5 dark:text-slate-200 dark:hover:bg-slate-100/10"
                    href="/assets/cv/Profile.pdf"
                    download
                    onClick={() => setCvOpen(false)}
                  >
                    {t("hero.cvSimple")}
                  </a>
                  <a
                    className="block px-4 py-3 text-sm text-slate-700 hover:bg-slate-950/5 dark:text-slate-200 dark:hover:bg-slate-100/10"
                    href="/assets/cv/Nicolas_Belchior_Visual.pdf"
                    download
                    onClick={() => setCvOpen(false)}
                  >
                    {t("hero.cvVisual")}
                  </a>
                </div>
              ) : null}
            </div>

            <a href="#contact">
              <Button variant="primary">
                <Mail className="mr-2 h-4 w-4" />
                {t("hero.ctaContact")}
              </Button>
            </a>

            <Button
              variant="ghost"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>

            <div className="flex items-center gap-1 rounded-lg border border-slate-200/70 bg-white/60 p-1 backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/40">
              <button
                className={cn(
                  "inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium tracking-tight transition-colors",
                  locale === "pt"
                    ? "bg-slate-950/5 text-slate-900 dark:bg-slate-100/10 dark:text-slate-50"
                    : "text-slate-600 hover:bg-slate-950/5 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-100/10 dark:hover:text-slate-50"
                )}
                onClick={() => switchLocale("pt")}
              >
                <Languages className="h-4 w-4" />
                PT
              </button>
              <button
                className={cn(
                  "inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium tracking-tight transition-colors",
                  locale === "en"
                    ? "bg-slate-950/5 text-slate-900 dark:bg-slate-100/10 dark:text-slate-50"
                    : "text-slate-600 hover:bg-slate-950/5 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-100/10 dark:hover:text-slate-50"
                )}
                onClick={() => switchLocale("en")}
              >
                EN
              </button>
            </div>
          </div>

          <button
            className="md:hidden rounded-md border border-slate-200/70 bg-white/60 px-3 py-2 text-sm font-medium tracking-tight backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/40"
            onClick={() => setMobileMenuOpen((v) => !v)}
            aria-label="Open menu"
          >
            {t("nav.menu")}
          </button>
        </div>

        {mobileMenuOpen ? (
          <div className="md:hidden border-t border-slate-200/70 bg-bg/80 backdrop-blur-md dark:border-slate-800">
            <div className="mx-auto w-full max-w-5xl px-4 py-3">
              <div className="grid gap-2">
                {navItems.map((it) => (
                  <a
                    key={it.id}
                    href={`#${it.id}`}
                    className="rounded-md px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-950/5 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-100/10 dark:hover:text-slate-50"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {it.label}
                  </a>
                ))}

                <div className="grid gap-2 pt-2">
                  <Button variant="secondary" onClick={() => setCvOpen((v) => !v)}>
                    <Download className="mr-2 h-4 w-4" />
                    {t("hero.ctaDownload")}
                  </Button>
                  {cvOpen ? (
                    <div className="overflow-hidden rounded-lg border border-slate-200/70 bg-white/70 backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/70">
                      <a
                        className="block px-4 py-3 text-sm text-slate-700 hover:bg-slate-950/5 dark:text-slate-200 dark:hover:bg-slate-100/10"
                        href="/assets/cv/Profile.pdf"
                        download
                      >
                        {t("hero.cvSimple")}
                      </a>
                      <a
                        className="block px-4 py-3 text-sm text-slate-700 hover:bg-slate-950/5 dark:text-slate-200 dark:hover:bg-slate-100/10"
                        href="/assets/cv/Nicolas_Belchior_Visual.pdf"
                        download
                      >
                        {t("hero.cvVisual")}
                      </a>
                    </div>
                  ) : null}

                  <a href="#contact">
                    <Button variant="primary">
                      <Mail className="mr-2 h-4 w-4" />
                      {t("hero.ctaContact")}
                    </Button>
                  </a>

                  <div className="flex gap-2">
                    <Button variant="ghost" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
                      {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                    </Button>
                    <Button variant="ghost" onClick={() => switchLocale(locale === "pt" ? "en" : "pt")}>
                      <Languages className="mr-2 h-4 w-4" />
                      {locale === "pt" ? "EN" : "PT"}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </header>

      <main className="mx-auto w-full max-w-5xl px-4 py-12">
        <section className="relative overflow-hidden rounded-lg border border-slate-200/70 bg-white/45 p-8 backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/35">
          <div
            className={cn(
              "pointer-events-none absolute inset-0 opacity-80",
              "[mask-image:radial-gradient(ellipse_at_top,black,transparent_65%)]",
              "bg-[linear-gradient(to_right,rgba(15,23,42,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.08)_1px,transparent_1px)] bg-[size:56px_56px]",
              "dark:bg-[linear-gradient(to_right,rgba(148,163,184,0.10)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.10)_1px,transparent_1px)]"
            )}
          />

          <div className="relative grid gap-4">
            <h1 className="text-balance text-3xl font-semibold tracking-tight md:text-4xl">
              {t("hero.name")}
            </h1>
            <p className="max-w-2xl text-pretty text-base text-slate-600 dark:text-slate-300 md:text-lg">
              {t("hero.role")}
            </p>
            <div className="flex flex-col gap-2 sm:flex-row">
              <a href="#projects">
                <Button variant="primary" className="w-full sm:w-auto">
                  {t("nav.projects")}
                </Button>
              </a>
              <a href="#contact">
                <Button variant="secondary" className="w-full sm:w-auto">
                  {t("nav.contact")}
                </Button>
              </a>
            </div>
          </div>
        </section>

        <div className="mt-10 grid gap-10">
          <section id="about" className="rounded-lg border border-slate-200/70 bg-white/50 p-6 backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/50">
            <div className="text-sm font-semibold tracking-tight">{t("about.title")}</div>
            <div className="mt-4 grid gap-2 text-sm text-slate-600 dark:text-slate-300">
              <p>{t("about.summary")}</p>
              <p className="text-slate-500 dark:text-slate-400">{t("about.location")}</p>
              <p className="text-fg">{t("about.hook")}</p>
            </div>
          </section>

          <section id="experience" className="rounded-lg border border-slate-200/70 bg-white/50 p-6 backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/50">
            <div className="flex items-baseline justify-between gap-4">
              <div className="text-sm font-semibold tracking-tight">{t("experience.title")}</div>
              <div className="text-xs font-medium text-slate-500 dark:text-slate-400">{t("experience.since")}</div>
            </div>
            <ol className="mt-5 grid gap-3">
              {experiencesSorted.map((e) => (
                <li key={e.id}>
                  <ExperienceCard experience={e} />
                </li>
              ))}
            </ol>
          </section>

          <section id="projects" className="rounded-lg border border-slate-200/70 bg-white/50 p-6 backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/50">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="text-sm font-semibold tracking-tight">{t("projects.title")}</div>
              <div className="flex items-center gap-1 rounded-lg border border-slate-200/70 bg-white/60 p-1 backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/40">
                <button
                  className={cn(
                    "rounded-md px-3 py-2 text-sm font-medium tracking-tight transition-colors",
                    tab === "sap"
                      ? "bg-slate-950/5 text-slate-900 dark:bg-slate-100/10 dark:text-slate-50"
                      : "text-slate-600 hover:bg-slate-950/5 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-100/10 dark:hover:text-slate-50"
                  )}
                  onClick={() => setTab("sap")}
                >
                  {t("projects.tabSap")}
                </button>
                <button
                  className={cn(
                    "rounded-md px-3 py-2 text-sm font-medium tracking-tight transition-colors",
                    tab === "web"
                      ? "bg-slate-950/5 text-slate-900 dark:bg-slate-100/10 dark:text-slate-50"
                      : "text-slate-600 hover:bg-slate-950/5 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-100/10 dark:hover:text-slate-50"
                  )}
                  onClick={() => setTab("web")}
                >
                  {t("projects.tabWeb")}
                </button>
              </div>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {projectsFiltered.map((p) => (
                <ProjectCard key={p.id} project={p} onClick={() => setSelected(p)} ctaLabel={t("projects.viewProject")} />
              ))}
            </div>
          </section>

          <section id="skills" className="rounded-lg border border-slate-200/70 bg-white/50 p-6 backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/50">
            <div className="text-sm font-semibold tracking-tight">{t("skills.title")}</div>
            <div className="mt-5 grid gap-6 md:grid-cols-3">
              <div>
                <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">{t("skills.primary")}</div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {skills.primary.map((s) => (
                    <TechBadge key={s} label={s} />
                  ))}
                </div>
              </div>
              <div>
                <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">{t("skills.secondary")}</div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {skills.secondary.map((s) => (
                    <TechBadge key={s} label={s} />
                  ))}
                </div>
              </div>
              <div>
                <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">{t("skills.languages")}</div>
                <div className="mt-3 grid gap-2">
                  {toStringArray(t.raw("content.skills.languages")).map((s) => (
                    <div
                      key={s}
                      className="rounded-md border border-slate-200/70 bg-white/50 px-3 py-2 text-xs font-medium text-slate-700 backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/40 dark:text-slate-200"
                    >
                      {s}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <footer id="contact" className="rounded-lg border border-slate-200/70 bg-white/50 p-6 backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/50">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <div className="text-sm font-semibold tracking-tight">{t("nav.contact")}</div>
                <div className="mt-1 text-sm text-slate-500 dark:text-slate-400">dev@nicolasbelchior.com</div>
              </div>
              <div className="flex flex-wrap gap-2">
                <a
                  className="inline-flex items-center gap-2 rounded-md border border-slate-200/70 bg-white/60 px-4 py-2 text-sm font-semibold tracking-tight text-slate-800 transition-[transform,box-shadow,border-color,background-color] hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md active:scale-95 dark:border-slate-800 dark:bg-slate-950/20 dark:text-slate-100 dark:hover:border-slate-700"
                  href="mailto:dev@nicolasbelchior.com"
                >
                  <Mail className="h-4 w-4" />
                  {t("footer.email")}
                </a>
                <a
                  className="inline-flex items-center gap-2 rounded-md border border-slate-200/70 bg-white/60 px-4 py-2 text-sm font-semibold tracking-tight text-slate-800 transition-[transform,box-shadow,border-color,background-color] hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md active:scale-95 dark:border-slate-800 dark:bg-slate-950/20 dark:text-slate-100 dark:hover:border-slate-700"
                  href="https://api.whatsapp.com/send?phone=5535997434763"
                  target="_blank"
                  rel="noreferrer"
                >
                  {t("footer.whatsapp")}
                </a>
                <a
                  className="inline-flex items-center gap-2 rounded-md border border-slate-200/70 bg-white/60 px-4 py-2 text-sm font-semibold tracking-tight text-slate-800 transition-[transform,box-shadow,border-color,background-color] hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md active:scale-95 dark:border-slate-800 dark:bg-slate-950/20 dark:text-slate-100 dark:hover:border-slate-700"
                  href="https://linkedin.com/in/nicolas-belchior/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Linkedin className="h-4 w-4" />
                  {t("footer.linkedin")}
                </a>
                <a
                  className="inline-flex items-center gap-2 rounded-md border border-slate-200/70 bg-white/60 px-4 py-2 text-sm font-semibold tracking-tight text-slate-800 transition-[transform,box-shadow,border-color,background-color] hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md active:scale-95 dark:border-slate-800 dark:bg-slate-950/20 dark:text-slate-100 dark:hover:border-slate-700"
                  href="https://github.com/gitRozan"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Github className="h-4 w-4" />
                  {t("footer.github")}
                </a>
              </div>
            </div>
          </footer>
        </div>
      </main>

      <Modal
        open={selected !== null}
        onClose={() => setSelected(null)}
        title={selected ? t(`content.projects.${selected.id}.title`) : ""}
      >
        {selected ? (
          <div className="grid gap-5">
            <div className="flex flex-wrap gap-2">
              {selected.stack.map((s) => (
                <TechBadge key={s} label={s} />
              ))}
            </div>

            <div className="grid gap-2">
              <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">{t("projects.deepDive")}</div>
              <ul className="grid gap-1 text-sm text-slate-600 dark:text-slate-300">
                {toStringArray(t.raw(`content.projects.${selected.id}.technicalDeepDive`)).map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
            </div>

            <div className="grid gap-2">
              <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">{t("projects.impact")}</div>
              <ul className="grid gap-1 text-sm text-slate-600 dark:text-slate-300">
                {toStringArray(t.raw(`content.projects.${selected.id}.businessImpact`)).map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
            </div>

            <div className="grid gap-2">
              <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">{t("projects.gallery")}</div>
              <div className="grid grid-cols-3 gap-2">
                <div className="aspect-[4/3] rounded-lg border border-slate-200/70 bg-slate-950/5 dark:border-slate-800 dark:bg-slate-100/10" />
                <div className="aspect-[4/3] rounded-lg border border-slate-200/70 bg-slate-950/5 dark:border-slate-800 dark:bg-slate-100/10" />
                <div className="aspect-[4/3] rounded-lg border border-slate-200/70 bg-slate-950/5 dark:border-slate-800 dark:bg-slate-100/10" />
              </div>
            </div>
          </div>
        ) : null}
      </Modal>
    </div>
  );
}


