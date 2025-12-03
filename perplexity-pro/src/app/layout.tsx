import type { Metadata } from "next";
import { Vazirmatn } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";

// تنظیم فونت وزیرمتن با متغیر CSS
const vazirmatn = Vazirmatn({ 
  subsets: ["arabic", "latin"],
  variable: "--font-vazir", // تعریف متغیر
  display: "swap",
});

export const metadata: Metadata = {
  title: "Perplexity Pro - خرید اشتراک",
  description: "دسترسی به قدرتمندترین مدل‌های هوش مصنوعی جهان",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl" suppressHydrationWarning>
      <body className={`${vazirmatn.variable} font-sans`} suppressHydrationWarning>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}