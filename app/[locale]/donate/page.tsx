import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Heart, Stethoscope, Users, Building, LucideIcon } from "lucide-react";
import { getContent, Locale } from "@/lib/content";

const iconMap: Record<string, LucideIcon> = { Users, Stethoscope, Building };

type DonateContent = {
    heroTitle: string;
    heroTitleHighlight: string;
    heroDescription: string;
    projectsTitle: string;
    projectsSubtitle: string;
    projects: { title: string; description: string; image: string; icon: string }[];
    disclaimer: string;
    bankTitle: string;
    bankFields: { label: string; value: string }[];
    bankNote: string;
};

type Params = { params: Promise<{ locale: string }> };

export default async function DonatePage({ params }: Params) {
    const { locale } = await params;
    const c = getContent<DonateContent>("pages/donate.md", locale as Locale);

    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
            <section className="relative flex min-h-[60vh] items-center justify-center overflow-hidden bg-slate-900 text-white">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-[url('/images/donate/hero-bg.jpg')] bg-cover bg-center opacity-30" />
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-900/90 to-slate-800/80" />
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
                </div>
                <div className="container relative z-10 mx-auto px-4 text-center md:px-6">
                    <div className="flex flex-col items-center space-y-6">
                        <Heart className="h-16 w-16 text-red-500/80 animate-pulse" />
                        <h1 className="text-4xl font-black leading-tight tracking-tight md:text-5xl lg:text-6xl">
                            {c.heroTitle}
                            <span className="block text-primary-foreground/90">{c.heroTitleHighlight}</span>
                        </h1>
                        <p className="max-w-2xl text-lg font-medium text-slate-200 md:text-xl">{c.heroDescription}</p>
                    </div>
                </div>
            </section>

            <section className="py-16 md:py-24">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="mb-12 text-center">
                        <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">{c.projectsTitle}</h2>
                        <p className="mt-4 text-lg text-slate-600">{c.projectsSubtitle}</p>
                    </div>
                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {c.projects.map((project, i) => {
                            const Icon = iconMap[project.icon] || Users;
                            const colors = ["bg-blue-600", "bg-red-600", "bg-amber-500"];
                            return (
                                <Card key={i} className="overflow-hidden border-slate-200 transition-all hover:shadow-lg">
                                    <div className="relative h-48 w-full bg-slate-200">
                                        <Image src={project.image} alt={project.title} fill className="object-cover" />
                                        <div className={`absolute top-4 right-4 rounded-full ${colors[i]} p-2 text-white shadow-md`}>
                                            <Icon className="h-5 w-5" />
                                        </div>
                                    </div>
                                    <CardHeader><CardTitle className="text-xl">{project.title}</CardTitle></CardHeader>
                                    <CardContent><p className="text-slate-600">{project.description}</p></CardContent>
                                </Card>
                            );
                        })}
                    </div>
                    <div className="mt-12 text-center">
                        <p className="text-sm font-medium text-slate-500">{c.disclaimer}</p>
                    </div>
                </div>
            </section>

            <section className="bg-slate-100 py-16">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="mx-auto max-w-3xl rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
                        <div className="mb-6 flex items-center justify-between border-b border-slate-100 pb-4">
                            <h2 className="text-2xl font-bold text-slate-800">{c.bankTitle}</h2>
                            <Building className="h-6 w-6 text-slate-400" />
                        </div>
                        <div className="grid gap-6 md:grid-cols-2">
                            {c.bankFields.map((field, i) => (
                                <div key={i} className="flex items-center justify-between rounded-lg bg-slate-50 p-3">
                                    <span className="font-medium text-slate-500">{field.label}</span>
                                    <span className="font-bold text-slate-800">{field.value}</span>
                                </div>
                            ))}
                        </div>
                        <div className="mt-6 flex items-start gap-3 rounded-md bg-blue-50 p-4 text-sm text-blue-700">
                            <div className="mt-0.5">ℹ️</div>
                            <p>{c.bankNote}</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
