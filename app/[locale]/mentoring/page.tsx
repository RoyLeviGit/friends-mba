import SectionsPage, { SectionsPageContent } from "@/components/SectionsPage";
import { getContent, Locale } from "@/lib/content";

type Params = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Params) {
  const { locale } = await params;
  const c = getContent<SectionsPageContent>("pages/mentoring.md", locale as Locale);
  return { title: `${c.title} | Friends MBA` };
}

export default async function MentoringPage({ params }: Params) {
  const { locale } = await params;
  const l = locale as Locale;
  return <SectionsPage content={getContent<SectionsPageContent>("pages/mentoring.md", l)} locale={l} />;
}
