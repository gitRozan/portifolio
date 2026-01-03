import { getTranslations } from "next-intl/server";

export default async function Page() {
  const t = await getTranslations();
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-5xl items-center px-4 py-16">
      <div className="grid gap-3">
        <div className="text-sm font-semibold tracking-tight">{t("meta.title")}</div>
        <div className="text-sm text-slate-600 dark:text-slate-300">{t("meta.description")}</div>
      </div>
    </main>
  );
}
