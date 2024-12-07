import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { notFound } from "next/navigation";
import { getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import AuthProvider from "@/providers/AuthProvider";
import { Toaster } from "@/components/ui/toaster";

const locales = ["en"];


export const metadata: Metadata = {
  title: "CollabNest",
  description: "A Productivity app",
};

export default async function RootLayout({
  children,
  params 
}: Readonly<{
  children: React.ReactNode;
  params : {locale : string};
}>) {
  const locale = (await params).locale;
  const isValidLocale = locales.some((curr) => curr === locale);
  if(!isValidLocale) notFound();

  //@ts-ignore
  const messages = await getMessages({locale});

  return (
    <html lang={locale}>
      
      <body
        className={` antialiased`}
      >
        <NextIntlClientProvider locale={locale} messages={messages}>
          <AuthProvider>
         <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Toaster/>
            {children}
          </ThemeProvider>
          </AuthProvider>
        </NextIntlClientProvider>
        
      </body>
    </html>
  );
}
