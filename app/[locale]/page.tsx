import Hero from "@/components/Hero";
import About from "@/components/About";
import Timeline from "@/components/Timeline";
import BlogGrid from "@/components/BlogGrid";
import Donate from "@/components/Donate";
import { Locale } from "@/lib/content";

type Params = { params: Promise<{ locale: string }> };

export default async function Home({ params }: Params) {
  const { locale } = await params;
  const l = locale as Locale;

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <Hero locale={l} />
      <About locale={l} />
      <Timeline locale={l} />
      <BlogGrid locale={l} />
      <Donate locale={l} />
    </div>
  );
}
