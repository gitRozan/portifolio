import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nicolas Belchior | SAP Fiori & BTP Developer",
  description: "Nicolas Belchior — SAP Full Stack Developer, especialista em Fiori e SAP BTP.",
  openGraph: {
    title: "Nicolas Belchior | SAP Fiori & BTP Developer",
    description: "Nicolas Belchior — SAP Full Stack Developer, especialista em Fiori e SAP BTP.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} antialiased`}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
