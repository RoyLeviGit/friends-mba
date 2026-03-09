import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Calendar, User, Tag } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { getContentIfExists, Locale } from "@/lib/content";

type BlogArticle = {
    title: string;
    date: string;
    author: string;
    category: string;
    image: string;
    backButton: string;
    content: string;
};

type Params = { params: Promise<{ locale: string; slug: string }> };

export async function generateMetadata({ params }: Params) {
    const { locale, slug } = await params;
    const article = getContentIfExists<BlogArticle>(`blog/${slug}.md`, locale as Locale);
    if (!article) return { title: "Article Not Found" };
    return { title: `${article.title} | Friends MBA` };
}

function markdownToHtml(md: string): string {
    return md
        .replace(/^## (.+)$/gm, '<h2>$1</h2>')
        .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
        .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-primary hover:underline">$1</a>')
        .replace(/^---$/gm, '<hr class="my-8 border-slate-200" />')
        .replace(/^(?!<[hHaA]|<hr|<strong)(.+)$/gm, '<p>$1</p>')
        .replace(/<p><\/p>/g, '');
}

export default async function BlogPost({ params }: Params) {
    const { locale, slug } = await params;
    const article = getContentIfExists<BlogArticle>(`blog/${slug}.md`, locale as Locale);

    if (!article) notFound();
    const c = article!;

    return (
        <div className="min-h-screen bg-slate-50 pb-20 pt-24 font-sans text-slate-900">
            <div className="container mx-auto max-w-4xl px-4 md:px-6">
                <div className="mb-8 flex justify-end">
                    <Link href={`/${locale}`}><Button variant="ghost" className="gap-2">{c.backButton}<ArrowRight className="h-4 w-4" /></Button></Link>
                </div>
                <header className="mb-10 text-center md:text-right">
                    <div className="relative mb-6 h-64 w-full overflow-hidden rounded-2xl bg-slate-200 shadow-lg md:h-96">
                        <Image src={c.image} alt={c.title} fill priority className="object-cover" />
                    </div>
                    <div className="mb-4 flex flex-wrap items-center justify-center gap-3 md:justify-start">
                        <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800">
                            <Tag className="ml-1 h-3 w-3" />{c.category}
                        </span>
                    </div>
                    <h1 className="mb-4 text-3xl font-black leading-tight tracking-tight text-slate-900 md:text-4xl lg:text-5xl">{c.title}</h1>
                    <div className="flex flex-wrap items-center justify-center gap-6 text-slate-500 md:justify-start">
                        <div className="flex items-center gap-2"><Calendar className="h-4 w-4" /><span>{c.date}</span></div>
                        <div className="flex items-center gap-2"><User className="h-4 w-4" /><span>{c.author}</span></div>
                    </div>
                </header>
                <article className="prose prose-lg prose-slate max-w-none rounded-2xl bg-white p-8 shadow-sm md:p-12">
                    <div dangerouslySetInnerHTML={{ __html: markdownToHtml(c.content) }} className="leading-relaxed" />
                </article>
            </div>
        </div>
    );
}
