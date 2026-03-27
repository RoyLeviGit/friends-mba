import Link from "next/link";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Locale } from "@/lib/content";

export type Section = { heading: string; paragraphs?: string[]; items?: string[]; links?: { text: string; href: string }[] };
export type SectionsPageContent = {
  title: string;
  subtitle: string;
  backButton: string;
  sections: Section[];
};

const SectionsPage = ({ content: c, locale }: { content: SectionsPageContent; locale: Locale }) => {
  const Arrow = locale === "he" ? ArrowRight : ArrowLeft;

  return (
    <div className="min-h-screen bg-slate-50 pb-20 pt-24 font-sans text-slate-900">
      <div className="container mx-auto max-w-4xl px-4 md:px-6">
        <div className="mb-8 flex justify-end">
          <Link href={`/${locale}`}>
            <Button variant="ghost" className="gap-2">
              {c.backButton}
              <Arrow className="h-4 w-4" />
            </Button>
          </Link>
        </div>
        <header className="mb-12 text-center">
          <h1 className="mb-4 text-3xl font-black tracking-tight text-slate-900 md:text-4xl lg:text-5xl">
            {c.title}
          </h1>
          <p className="text-xl text-slate-600">{c.subtitle}</p>
        </header>
        <div className="space-y-12">
          {c.sections.map((s, i) => (
            <section key={i} className="rounded-2xl bg-white p-8 shadow-sm md:p-12">
              <h2 className="mb-6 text-2xl font-bold text-slate-900">{s.heading}</h2>
              {s.paragraphs && (
                <div className="space-y-4 text-lg leading-relaxed text-slate-600">
                  {s.paragraphs.map((p, j) => <p key={j}>{p}</p>)}
                </div>
              )}
              {s.items && (
                <ul className="mt-4 space-y-3 text-lg leading-relaxed text-slate-600">
                  {s.items.map((item, j) => (
                    <li key={j} className="flex gap-2">
                      <span className="mt-1 text-primary">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}
              {s.links && (
                <div className="mt-6 flex flex-wrap gap-4">
                  {s.links.map((link, j) => (
                    <Link key={j} href={`/${locale}${link.href}`} className="text-primary font-medium hover:underline">
                      {link.text}
                    </Link>
                  ))}
                </div>
              )}
            </section>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SectionsPage;
