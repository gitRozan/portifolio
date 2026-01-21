import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-bg text-fg">
      <div className="mx-auto flex min-h-screen w-full max-w-4xl flex-col items-center justify-center gap-6 px-6 py-12 text-center">
        <h1 className="text-balance text-3xl font-semibold tracking-tight md:text-4xl">Nicolas Belchior</h1>
        <p className="max-w-2xl text-pretty text-sm text-slate-600 dark:text-slate-300 md:text-base">
          Selecione o idioma / Select your language
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/pt"
            className="rounded-md border border-slate-200/70 bg-white/60 px-5 py-2 text-sm font-semibold tracking-tight text-slate-900 transition-colors hover:bg-white/80 dark:border-slate-800 dark:bg-slate-900/40 dark:text-slate-100 dark:hover:bg-slate-900/60"
          >
            Português
          </Link>
          <Link
            href="/en"
            className="rounded-md border border-slate-200/70 bg-white/60 px-5 py-2 text-sm font-semibold tracking-tight text-slate-900 transition-colors hover:bg-white/80 dark:border-slate-800 dark:bg-slate-900/40 dark:text-slate-100 dark:hover:bg-slate-900/60"
          >
            English
          </Link>
        </div>
      </div>
    </main>
  );
}
