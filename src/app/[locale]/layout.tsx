import type { ReactNode } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { isLocale, locales, type Locale } from "@/i18n/locales";
import { getMessages } from "@/i18n/messages";
import { IntlProvider } from "@/components/providers/intl-provider";

type Props = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Pick<Props, "params">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};

  const t = await getTranslations({ locale: locale as Locale });
  const title = t("meta.title");
  const description = t("meta.description");
  const siteUrl = "https://nicolasbelchior.com";
  const pageUrl = `${siteUrl}/${locale}/`;
  const imageUrl = `${siteUrl}/assets/profile.jpg`;
  const ogLocale = locale === "pt" ? "pt_BR" : "en_US";

  return {
    metadataBase: new URL(siteUrl),
    title,
    description,
    alternates: {
      canonical: pageUrl,
      languages: {
        pt: `${siteUrl}/pt/`,
        en: `${siteUrl}/en/`,
      },
    },
    openGraph: {
      title,
      description,
      url: pageUrl,
      type: "website",
      locale: ogLocale,
      images: [imageUrl],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const messages = await getMessages(locale as Locale);

  return (
    <IntlProvider locale={locale as Locale} messages={messages}>
      {children}
    </IntlProvider>
  );
}


