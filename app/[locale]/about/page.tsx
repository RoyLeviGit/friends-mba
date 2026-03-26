import SectionsPage, { SectionsPageContent } from "@/components/SectionsPage";
import { getContent, Locale } from "@/lib/content";

type Params = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Params) {
  const { locale } = await params;
  const c = getContent<SectionsPageContent>("pages/about-full.md", locale as Locale);
  return { title: `${c.title} | Friends MBA` };
}

export default async function AboutPage({ params }: Params) {
  const { locale } = await params;
  const l = locale as Locale;
  return <SectionsPage content={getContent<SectionsPageContent>("pages/about-full.md", l)} locale={l} />;
}
