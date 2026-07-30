import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const siteUrl = "https://nicolasbelchior.com";
const ogImage = `${siteUrl}/assets/profile.jpg`;

export const metadata: Metadata = {
  title: "Nicolas Belchior | Desenvolvedor ABAP Fiori Senior",
  description: "Nicolas Belchior — Desenvolvedor ABAP Fiori Senior na EY. RAP, SAP BTP, CAP e Clean Core em projetos ECC e S/4HANA. Certificado SAP Fiori Application Developer.",
  metadataBase: new URL(siteUrl),
  icons: {
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
    icon: [
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
    ],
  },
  manifest: "/site.webmanifest",
  openGraph: {
    title: "Nicolas Belchior | Desenvolvedor ABAP Fiori Senior",
    description: "Nicolas Belchior — Desenvolvedor ABAP Fiori Senior na EY. RAP, SAP BTP, CAP e Clean Core em projetos ECC e S/4HANA. Certificado SAP Fiori Application Developer.",
    type: "website",
    url: `${siteUrl}/`,
    siteName: "Nicolas Belchior",
    locale: "pt_BR",
    alternateLocale: ["en_US"],
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
    title: "Nicolas Belchior | Desenvolvedor ABAP Fiori Senior",
    description: "Nicolas Belchior — Desenvolvedor ABAP Fiori Senior na EY. RAP, SAP BTP, CAP e Clean Core em projetos ECC e S/4HANA. Certificado SAP Fiori Application Developer.",
    images: [ogImage],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="dark" suppressHydrationWarning>
      <body className={`${inter.variable} antialiased`}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
