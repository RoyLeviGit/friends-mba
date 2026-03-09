import type { Metadata } from "next";
import { Heebo } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getContent, Locale } from "@/lib/content";
import "../globals.css";

const heebo = Heebo({
  subsets: ["hebrew", "latin"],
  variable: "--font-heebo",
  weight: ["300", "400", "500", "700", "900"],
  display: "swap",
});

type Params = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale } = await params;
  const site = getContent<{ title: string; description: string }>("pages/site.md", locale as Locale);
  return {
    title: site.title,
    description: site.description,
    icons: { icon: "/images/logo.png" },
  };
}

export function generateStaticParams() {
  return [{ locale: "he" }, { locale: "en" }];
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const l = locale as Locale;
  const isRtl = l === "he";

  return (
    <html lang={l} dir={isRtl ? "rtl" : "ltr"}>
      <body className={`${heebo.variable} font-sans antialiased flex flex-col min-h-screen`}>
        <Navbar locale={l} />
        <main className="flex-grow">{children}</main>
        <Footer locale={l} />
      </body>
    </html>
  );
}
