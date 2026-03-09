import Image from "next/image";
import { getContent, Locale } from "@/lib/content";

type AboutContent = {
    heading: string;
    headingHighlight: string;
    headingSuffix: string;
    imageAlt: string;
    paragraphs: string[];
};

const About = ({ locale }: { locale: Locale }) => {
    const c = getContent<AboutContent>("pages/about.md", locale);

    return (
        <section id="about" className="bg-white py-16 md:py-24">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
                    <div className="space-y-6">
                        <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl lg:text-5xl">
                            {c.heading} <span className="text-primary">{c.headingHighlight}</span> {c.headingSuffix}
                        </h2>
                        <div className="space-y-4 text-lg text-slate-600">
                            {c.paragraphs.map((p, i) => (
                                <p key={i} className={i === c.paragraphs.length - 1 ? "font-medium text-slate-900" : ""}>
                                    {p}
                                </p>
                            ))}
                        </div>
                    </div>

                    <div className="relative mx-auto aspect-video w-full overflow-hidden rounded-2xl shadow-xl lg:order-first">
                        <Image src="/images/team.jpg" alt={c.imageAlt} fill className="object-cover transition-transform duration-500 hover:scale-105" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
