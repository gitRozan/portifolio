export function safeYM(ym: string) {
  return /^\d{4}-\d{2}$/.test(ym) ? ym : "";
}

export type FormatYMLocale = "pt" | "en";

export function formatYM(ym: string, locale?: FormatYMLocale) {
  const safe = safeYM(ym);
  if (!safe) return "";
  const [y, m] = safe.split("-");
  const dt = new Date(Number(y), Number(m) - 1, 1);
  try {
    const intlLocale = locale === "pt" ? "pt-BR" : locale === "en" ? "en-US" : undefined;
    return new Intl.DateTimeFormat(intlLocale, { year: "numeric", month: "short" }).format(dt);
  } catch {
    return safe;
  }
}
