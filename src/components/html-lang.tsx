"use client";

import { useEffect } from "react";
import type { Locale } from "@/i18n/locales";

const HTML_LANG: Record<Locale, string> = { pt: "pt-BR", en: "en" };

/**
 * O root layout (src/app/layout.tsx) e' unico e nao conhece o locale da rota,
 * entao serve sempre lang="pt-BR". Isso sincroniza o atributo no cliente para
 * que leitores de tela e o Google recebam o idioma correto em /en/.
 */
export function HtmlLang({ locale }: { locale: Locale }) {
  useEffect(() => {
    document.documentElement.lang = HTML_LANG[locale];
  }, [locale]);

  return null;
}
