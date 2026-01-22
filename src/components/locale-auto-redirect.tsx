"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { detectLocaleFromNavigatorLanguage } from "@/i18n/locales";

export function LocaleAutoRedirect() {
  const router = useRouter();

  useEffect(() => {
    const locale = detectLocaleFromNavigatorLanguage(navigator.language);
    router.replace(`/${locale}`);
  }, [router]);

  return null;
}
