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
  title: "Nicolas Belchior | SAP Fiori & BTP Developer",
  description: "Nicolas Belchior — SAP Full Stack Developer, especialista em Fiori e SAP BTP.",
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
    title: "Nicolas Belchior | SAP Fiori & BTP Developer",
    description: "Nicolas Belchior — SAP Full Stack Developer, especialista em Fiori e SAP BTP.",
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
    title: "Nicolas Belchior | SAP Fiori & BTP Developer",
    description: "Nicolas Belchior — SAP Full Stack Developer, especialista em Fiori e SAP BTP.",
    images: [ogImage],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${inter.variable} antialiased`}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
