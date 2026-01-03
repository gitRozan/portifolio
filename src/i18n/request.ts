import { getRequestConfig } from "next-intl/server";
import { notFound } from "next/navigation";
import { getMessages } from "@/i18n/messages";
import { isLocale } from "@/i18n/locales";

export default getRequestConfig(async ({ locale }) => {
  if (!locale || !isLocale(locale)) notFound();
  return { locale, messages: await getMessages(locale) };
});


