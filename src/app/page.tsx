"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { detectLocaleFromNavigatorLanguage } from "@/i18n/locales";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const locale = detectLocaleFromNavigatorLanguage(navigator.language);
    router.replace(`/${locale}`);
  }, [router]);

  return <div className="min-h-screen bg-bg" />;
}
