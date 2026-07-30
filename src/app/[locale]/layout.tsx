import type { ReactNode } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { isLocale, locales, type Locale } from "@/i18n/locales";
import { getMessages } from "@/i18n/messages";
import { IntlProvider } from "@/components/providers/intl-provider";
import { HtmlLang } from "@/components/html-lang";

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
  const ogImage = `${siteUrl}/assets/profile.jpg`;
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
        "x-default": `${siteUrl}/pt/`,
      },
    },
    openGraph: {
      title,
      description,
      url: pageUrl,
      type: "website",
      siteName: "Nicolas Belchior",
      locale: ogLocale,
      alternateLocale: ogLocale === "pt_BR" ? ["en_US"] : ["pt_BR"],
      images: [
        {
          url: ogImage,
          width: 512,
          height: 512,
          alt: "Nicolas Belchior",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

function personJsonLd(locale: Locale) {
  const siteUrl = "https://nicolasbelchior.com";
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Nicolas Belchior",
    url: `${siteUrl}/${locale}/`,
    image: `${siteUrl}/assets/profile.jpg`,
    email: "mailto:dev@nicolasbelchior.com",
    jobTitle: locale === "pt" ? "Desenvolvedor ABAP Fiori Senior" : "Senior ABAP Fiori Developer",
    worksFor: { "@type": "Organization", name: "EY (Ernst & Young)" },
    alumniOf: { "@type": "CollegeOrUniversity", name: "Universidade São Judas Tadeu" },
    address: { "@type": "PostalAddress", addressRegion: "MG", addressCountry: "BR" },
    sameAs: [
      "https://www.linkedin.com/in/nicolas-belchior/",
      "https://www.credly.com/badges/d91a7f87-8e0b-4445-af47-daac97fb2cec",
    ],
    hasCredential: {
      "@type": "EducationalOccupationalCredential",
      name: "SAP Certified - SAP Fiori Application Developer",
      credentialCategory: "certification",
      recognizedBy: { "@type": "Organization", name: "SAP" },
      url: "https://www.credly.com/badges/d91a7f87-8e0b-4445-af47-daac97fb2cec",
    },
    knowsAbout: [
      "SAP ABAP",
      "SAP RAP",
      "ABAP Cloud",
      "SAP Fiori",
      "SAPUI5",
      "CDS Views",
      "OData",
      "SAP BTP",
      "SAP CAP",
      "SAP Integration Suite",
      "SAP HANA Cloud",
      "SAP S/4HANA",
      "Clean Core",
    ],
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const messages = await getMessages(locale as Locale);

  return (
    <IntlProvider locale={locale as Locale} messages={messages}>
      <HtmlLang locale={locale as Locale} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd(locale as Locale)) }}
      />
      {children}
    </IntlProvider>
  );
}


