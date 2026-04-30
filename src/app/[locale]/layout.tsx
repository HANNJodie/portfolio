import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import "../globals.scss";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const clashDisplay = localFont({
  src: [
    {
      path: "../../../public/fonts/ClashDisplay-Variable.woff2",
      style: "normal",
    },
  ],
  variable: "--font-clash",
  display: "swap",
});

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://jodiehann.com";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Jodie Hann — Game Designer",
    template: "%s | Jodie Hann",
  },
  description:
    "Portfolio de Jodie Hann, Game Designer passionnée par le game design, le narrative design et le level design.",
  authors: [{ name: "Jodie Hann" }],
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    title: "Jodie Hann — Game Designer",
    description:
      "Portfolio de Jodie Hann, Game Designer passionnée par le game design, le narrative design et le level design.",
    url: BASE_URL,
    siteName: "Jodie Hann",
    type: "website",
    locale: "fr_FR",
    alternateLocale: ["en_GB"],
    images: [
      {
        url: "/og-image.png",
        width: 2395,
        height: 2395,
        alt: "Jodie Hann — Game Designer",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Jodie Hann — Game Designer",
    description:
      "Portfolio de Jodie Hann, Game Designer passionnée par le game design, le narrative design et le level design.",
    images: ["/og-image.png"],
  },
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className={`${inter.variable} ${clashDisplay.variable}`}>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
