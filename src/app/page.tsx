import type { Locale } from "@/i18n/locales";
import { getMessages } from "@/i18n/messages";
import { IntlProvider } from "@/components/providers/intl-provider";
import { PortfolioPage } from "@/components/portfolio/portfolio-page";
import { LocaleAutoRedirect } from "@/components/locale-auto-redirect";

const defaultLocale: Locale = "pt";

export default async function Home() {
  const messages = await getMessages(defaultLocale);

  return (
    <IntlProvider locale={defaultLocale} messages={messages}>
      <LocaleAutoRedirect />
      <PortfolioPage />
    </IntlProvider>
  );
}
