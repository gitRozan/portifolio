"use client";

import { useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Languages, Download, Mail, Linkedin } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import type { Locale } from "@/i18n/locales";
import { isLocale } from "@/i18n/locales";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { TechBadge } from "@/components/ui/tech-badge";
import { experiences, projects, skills, credentials, type Project, type ProjectCategory } from "@/content/portfolio";
import { ExperienceCard } from "@/components/portfolio/experience-card";
import { ProjectCard } from "@/components/portfolio/project-card";
import { AboutSection } from "@/components/portfolio/about-section";
import { CredentialsSection } from "@/components/portfolio/credentials-section";
import { ContactFab } from "@/components/portfolio/contact-fab";
import { generateCVHTML, downloadPDF, getAssetAsDataUrl } from "@/lib/generate-cv";

export function PortfolioPage() {
  const t = useTranslations();
  const currentLocale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const locale = isLocale(currentLocale) ? currentLocale : "en";

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
    { id: "credentials", label: t("nav.credentials"), shortLabel: t("nav.credentialsShort") },
    { id: "skills", label: t("nav.skills") },
    { id: "contact", label: t("nav.contact") },
  ];

  const isRecord = (v: unknown): v is Record<string, unknown> => typeof v === "object" && v !== null;

  const toStringArray = (value: unknown) =>
    Array.isArray(value) ? value.filter((x): x is string => typeof x === "string") : [];

  const handleDownloadCV = async () => {
    const photoDataUrl = await getAssetAsDataUrl("/assets/profile.jpg");

    const highlightsTitle = locale === "pt" ? "Destaques" : "Highlights";
    const recommendationsTitle = locale === "pt" ? "Referências" : "References";

    const highlights = [
      { label: t("about.facts.xpLabel"), value: t("about.facts.xpValue") },
      { label: t("about.facts.focusLabel"), value: t("about.facts.focusValue") },
      { label: t("about.facts.stackLabel"), value: t("about.facts.stackValue") },
    ];

    const recommendationGroups = [
      {
        title: "SAPUI5/FIORI/BTP",
        people: [
          { name: "Maylon de Oliveira Zanardi", phone: "+55 041 99980-8928", email: "maylonzanardi@hotmail.com" },
          { name: "Mauricio Eduardo de Oliveira Filho", phone: "+55 041 99971-4773", email: "meofi1993@gmail.com" },
          { name: "João Henrique Moreira Gabardo", phone: "+55 041 99884-5186", email: "joaohmgabardo@gmail.com" },
        ],
      },
    ];

    const cvData = {
      name: t("hero.name"),
      role: t("hero.role"),
      photoDataUrl: photoDataUrl ?? undefined,
      photoAlt: t("about.photoAlt"),
      email: "dev@nicolasbelchior.com",
      phone: "+55 35 99743-4763",
      location: t("about.location"),
      linkedin: "linkedin.com/in/nicolas-belchior",
      about: t("about.body"),
      highlightsTitle,
      highlights,
      experienceTitle: t("experience.title"),
      experienceSections: experiencesSorted.map((exp) => {
        let subtopics;
        const subtopicsKey = `content.experience.${exp.id}.subtopics` as const;
        if (t.has(subtopicsKey)) {
          const rawSubtopics = t.raw(subtopicsKey);
          if (rawSubtopics && Array.isArray(rawSubtopics)) {
            subtopics = rawSubtopics
              .filter(isRecord)
              .map((sub) => ({
                title: typeof sub.title === "string" ? sub.title : "",
                items: toStringArray(sub.items),
              }))
              .filter((sub) => sub.title.length > 0 && sub.items.length > 0);
          }
        }

        return {
          company: exp.company,
          role: t(`content.experience.${exp.id}.role`),
          period: `${t(`content.experience.${exp.id}.start`)} - ${t(`content.experience.${exp.id}.end`)}`,
          highlights: toStringArray(t.raw(`content.experience.${exp.id}.highlights`)),
          subtopics,
        };
      }),
      skillsTitle: t("skills.title"),
      skillsPrimary: skills.primary,
      skillsSecondary: skills.secondary,
      languages: toStringArray(t.raw("content.skills.languages")),
      projectsTitle: t("projects.title"),
      projectsSections: projects.map((proj) => ({
        title: t(`content.projects.${proj.id}.title`),
        summary: t(`content.projects.${proj.id}.summary`),
        stack: proj.stack,
      })),
      credentialsTitle: t("credentials.title"),
      credentialsSections: credentials.map((cred) => ({
        title: cred.title,
        issuer: cred.issuer,
        period: cred.issueYM,
        status: cred.status === "inProgress" ? t("credentials.statusInProgress") : undefined,
      })),
      recommendationsTitle,
      recommendationGroups,
    };

    const html = generateCVHTML(cvData);
    const fileName = `${t("hero.name").replace(/\s+/g, "_")}_CV_${new Date().toISOString().split("T")[0]}.pdf`;
    await downloadPDF(html, fileName);
  };

  return (
    <div className="min-h-screen bg-bg text-fg">
      <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-bg/70 backdrop-blur-md dark:border-slate-800">
        <div className="mx-auto flex w-full max-w-5xl items-center gap-3 px-4 py-3.5">
          <a
            href="#about"
            className="shrink-0 font-mono text-sm font-black tracking-tight text-fg"
            aria-label={t("hero.name")}
          >
            NBP
          </a>

          <div className="hidden min-w-0 flex-1 items-center gap-2 md:flex">
            <nav className="min-w-0 flex-1">
              <div className="flex min-w-0 items-center gap-0.5 overflow-hidden">
                {navItems.map((it) => (
                  <a
                    key={it.id}
                    href={`#${it.id}`}
                    className="whitespace-nowrap rounded-md px-2 py-1.5 text-xs font-semibold tracking-tight text-slate-600 transition-colors hover:bg-slate-950/5 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-100/10 dark:hover:text-slate-50"
                  >
                    {it.shortLabel ? (
                      <>
                        <span className="inline xl:hidden">{it.shortLabel}</span>
                        <span className="hidden xl:inline">{it.label}</span>
                      </>
                    ) : (
                      it.label
                    )}
                  </a>
                ))}
              </div>
            </nav>

            <div className="flex shrink-0 items-center gap-1.5">
              <Button
                variant="secondary"
                size="sm"
                className="px-2"
                onClick={handleDownloadCV}
                aria-label={t("hero.ctaDownload")}
              >
                <Download className="h-4 w-4" />
                <span className="hidden xl:inline">{t("hero.ctaDownload")}</span>
              </Button>

              <a href="#contact">
                <Button variant="primary" size="sm" className="px-2" aria-label={t("hero.ctaContact")}>
                  <Mail className="h-4 w-4" />
                  <span className="hidden xl:inline">{t("hero.ctaContact")}</span>
                </Button>
              </a>

              <div className="flex items-center gap-1 rounded-lg border border-slate-200/70 bg-white/60 p-1 backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/40">
                <button
                  className={cn(
                    "inline-flex items-center rounded-md px-2 py-1.5 text-xs font-semibold tracking-tight transition-colors",
                    locale === "pt"
                      ? "bg-slate-950/5 text-slate-900 dark:bg-slate-100/10 dark:text-slate-50"
                      : "text-slate-600 hover:bg-slate-950/5 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-100/10 dark:hover:text-slate-50"
                  )}
                  onClick={() => switchLocale("pt")}
                >
                  PT
                </button>
                <button
                  className={cn(
                    "inline-flex items-center rounded-md px-2 py-1.5 text-xs font-semibold tracking-tight transition-colors",
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
                  <Button
                    variant="secondary"
                    onClick={() => {
                      handleDownloadCV();
                      setMobileMenuOpen(false);
                    }}
                  >
                    <Download className="mr-2 h-4 w-4" />
                    {t("hero.ctaDownload")}
                  </Button>

                  <a href="#contact">
                    <Button variant="primary">
                      <Mail className="mr-2 h-4 w-4" />
                      {t("hero.ctaContact")}
                    </Button>
                  </a>

                  <div className="flex gap-2">
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
        <div className="grid gap-10">
          <AboutSection />

          <section
            id="experience"
            aria-labelledby="experience-title"
            className="rounded-md border border-slate-200/70 bg-white/50 p-6 backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/50"
          >
            <div className="flex items-baseline justify-between gap-4">
              <h2 id="experience-title" className="text-sm font-semibold tracking-tight">
                {t("experience.title")}
              </h2>
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

          <section
            id="projects"
            aria-labelledby="projects-title"
            className="rounded-md border border-slate-200/70 bg-white/50 p-6 backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/50"
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 id="projects-title" className="text-sm font-semibold tracking-tight">
                {t("projects.title")}
              </h2>
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

          <CredentialsSection />

          <section
            id="skills"
            aria-labelledby="skills-title"
            className="rounded-md border border-slate-200/70 bg-white/50 p-6 backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/50"
          >
            <h2 id="skills-title" className="text-sm font-semibold tracking-tight">
              {t("skills.title")}
            </h2>
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

          <footer
            id="contact"
            aria-labelledby="contact-title"
            className="rounded-md border border-slate-200/70 bg-white/50 p-6 backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/50"
          >
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 id="contact-title" className="text-sm font-semibold tracking-tight">
                  {t("nav.contact")}
                </h2>
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
              </div>
            </div>
          </footer>
        </div>
      </main>

      <ContactFab onDownloadCV={handleDownloadCV} />

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


