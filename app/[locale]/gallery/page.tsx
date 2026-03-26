import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { getContent, Locale } from "@/lib/content";

type GalleryItem = { src: string; caption?: string };
type GalleryContent = {
  title: string;
  subtitle: string;
  backButton: string;
  comingSoon: string;
  items: GalleryItem[];
};

type Params = { params: Promise<{ locale: string }> };

const sizeClasses = [
  "col-span-2 row-span-2",
  "col-span-1 row-span-1",
  "col-span-1 row-span-1",
  "col-span-1 row-span-2",
  "col-span-1 row-span-1",
  "col-span-2 row-span-1",
];

export async function generateMetadata({ params }: Params) {
  const { locale } = await params;
  const c = getContent<GalleryContent>("pages/gallery.md", locale as Locale);
  return { title: `${c.title} | Friends MBA` };
}

export default async function GalleryPage({ params }: Params) {
  const { locale } = await params;
  const l = locale as Locale;
  const c = getContent<GalleryContent>("pages/gallery.md", l);
  const Arrow = l === "he" ? ArrowRight : ArrowLeft;

  return (
    <div className="min-h-screen bg-slate-50 pb-20 pt-24 font-sans text-slate-900">
      <div className="container mx-auto max-w-6xl px-4 md:px-6">
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
        {c.items.length === 0 ? (
          <div className="rounded-2xl bg-white p-16 text-center shadow-sm">
            <p className="text-lg text-slate-500">{c.comingSoon}</p>
          </div>
        ) : (
          <div className="grid auto-rows-[180px] grid-cols-2 gap-3 md:auto-rows-[220px] md:grid-cols-3 lg:auto-rows-[260px]">
            {c.items.map((item, i) => (
              <div
                key={i}
                className={`group relative overflow-hidden rounded-2xl bg-slate-200 shadow-sm ${sizeClasses[i % sizeClasses.length]}`}
              >
                <Image src={item.src} alt={item.caption || ""} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                {item.caption && (
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <p className="text-sm font-medium text-white">{item.caption}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
