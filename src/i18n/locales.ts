export const locales = ["pt", "en"] as const;

export type Locale = (typeof locales)[number];

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export function detectLocaleFromNavigatorLanguage(language: string | undefined): Locale {
  if (!language) return "en";
  const normalized = language.toLowerCase();
  if (normalized.startsWith("pt")) return "pt";
  return "en";
}

