import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import Link from "next/link";
import Image from "next/image";
import { getContent, Locale } from "@/lib/content";

type BlogPost = {
    title: string;
    excerpt: string;
    tag: string;
    color: string;
    slug: string;
    image: string;
};

type BlogGridContent = {
    sectionTitle: string;
    sectionSubtitle: string;
    readMore: string;
    comingSoon: string;
    posts: BlogPost[];
};

const BlogCard = ({ post, index, readMore, comingSoon }: { post: BlogPost; index: number; readMore: string; comingSoon: string }) => (
    <Card className="group flex h-full flex-col overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1 cursor-pointer">
        <div className="h-48 w-full bg-slate-200 relative overflow-hidden">
            {post.image ? (
                <Image src={post.image} alt={post.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
            ) : (
                <div className={`absolute inset-0 bg-gradient-to-br opacity-50 ${index === 0 ? 'from-blue-400 to-slate-500' : index === 1 ? 'from-primary to-slate-800' : 'from-purple-500 to-pink-500'}`} />
            )}
            <div className="absolute bottom-4 right-4 z-10">
                <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${post.color}`}>{post.tag}</span>
            </div>
        </div>
        <CardHeader className="pb-2">
            <CardTitle className="text-xl group-hover:text-primary transition-colors">{post.title}</CardTitle>
        </CardHeader>
        <CardContent className="flex-grow flex flex-col justify-between">
            <p className="text-slate-600 mb-4">{post.excerpt}</p>
            <span className="text-sm font-medium text-primary hover:underline">{post.slug ? readMore : comingSoon}</span>
        </CardContent>
    </Card>
);

const BlogGrid = ({ locale }: { locale: Locale }) => {
    const c = getContent<BlogGridContent>("pages/blog-grid.md", locale);

    return (
        <section id="blog" className="bg-white py-16 md:py-24">
            <div className="container mx-auto px-4 md:px-6">
                <div className="mb-12 text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl text-center">{c.sectionTitle}</h2>
                    <p className="mt-4 text-lg text-slate-600">{c.sectionSubtitle}</p>
                </div>
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {c.posts.map((post, index) => (
                        <div key={index} className="h-full">
                            {post.slug ? (
                                <Link href={`/${locale}/blog/${post.slug}`} className="block h-full">
                                    <BlogCard post={post} index={index} readMore={c.readMore} comingSoon={c.comingSoon} />
                                </Link>
                            ) : (
                                <div className="block h-full">
                                    <BlogCard post={post} index={index} readMore={c.readMore} comingSoon={c.comingSoon} />
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BlogGrid;
