"use client";

import { useState } from "react";
import Image from "next/image";
import { Briefcase, GraduationCap, Users, LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/Button";

const iconMap: Record<string, LucideIcon> = { Briefcase, GraduationCap, Users };
const colorMap: Record<string, string> = {
    Briefcase: "bg-blue-100 text-blue-600",
    GraduationCap: "bg-purple-100 text-purple-600",
    Users: "bg-orange-100 text-orange-600",
};

type CommunityContent = {
    heroTitle: string;
    heroTitleHighlight: string;
    heroDescription: string;
    heroImageAlt: string;
    benefits: { title: string; description: string; icon: string }[];
    formTitle: string;
    nameLabel: string;
    namePlaceholder: string;
    phoneLabel: string;
    phonePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    roleLabel: string;
    rolePlaceholder: string;
    roles: { value: string; label: string }[];
    professionLabel: string;
    professionPlaceholder: string;
    professionHint: string;
    submitButton: string;
    successMessage: string;
};

export default function CommunityClient({ content: c }: { content: CommunityContent }) {
    const [formData, setFormData] = useState({ fullName: "", phone: "", email: "", role: "", profession: "" });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert(c.successMessage);
        setFormData({ fullName: "", phone: "", email: "", role: "", profession: "" });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900">
            <section className="relative overflow-hidden bg-slate-900 py-20 text-white md:py-32">
                <div className="absolute inset-0 z-0">
                    <Image src="/images/community.png" alt={c.heroImageAlt} fill className="object-cover opacity-40 mix-blend-overlay" priority />
                    <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/50 to-primary/30" />
                </div>
                <div className="container relative z-10 mx-auto px-4 text-center md:px-6">
                    <h1 className="mb-6 text-4xl font-black leading-tight tracking-tight md:text-5xl lg:text-6xl">
                        {c.heroTitle} <br className="hidden md:block" />
                        <span className="text-primary-foreground">{c.heroTitleHighlight}</span>
                    </h1>
                    <p className="mx-auto mb-8 max-w-2xl text-lg text-slate-300 md:text-xl">{c.heroDescription}</p>
                </div>
            </section>

            <section className="py-16 md:py-24">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="grid gap-8 md:grid-cols-3">
                        {c.benefits.map((b, i) => {
                            const Icon = iconMap[b.icon] || Users;
                            const color = colorMap[b.icon] || "bg-blue-100 text-blue-600";
                            return (
                                <div key={i} className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition-shadow hover:shadow-md">
                                    <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${color}`}>
                                        <Icon className="h-6 w-6" />
                                    </div>
                                    <h3 className="mb-3 text-xl font-bold">{b.title}</h3>
                                    <p className="text-slate-600">{b.description}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            <section className="bg-slate-100 py-16 md:py-24">
                <div className="container mx-auto max-w-2xl px-4 md:px-6">
                    <div className="rounded-2xl bg-white p-8 shadow-lg md:p-12">
                        <h2 className="mb-8 text-center text-3xl font-bold">{c.formTitle}</h2>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="fullName" className="mb-2 block text-sm font-medium text-slate-700">{c.nameLabel}</label>
                                <input type="text" id="fullName" name="fullName" required value={formData.fullName} onChange={handleChange} className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:border-green-600 focus:outline-none focus:ring-1 focus:ring-green-600" placeholder={c.namePlaceholder} />
                            </div>
                            <div className="grid gap-6 md:grid-cols-2">
                                <div>
                                    <label htmlFor="phone" className="mb-2 block text-sm font-medium text-slate-700">{c.phoneLabel}</label>
                                    <input type="tel" id="phone" name="phone" required value={formData.phone} onChange={handleChange} className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:border-green-600 focus:outline-none focus:ring-1 focus:ring-green-600" placeholder={c.phonePlaceholder} />
                                </div>
                                <div>
                                    <label htmlFor="email" className="mb-2 block text-sm font-medium text-slate-700">{c.emailLabel}</label>
                                    <input type="email" id="email" name="email" required value={formData.email} onChange={handleChange} className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:border-green-600 focus:outline-none focus:ring-1 focus:ring-green-600" placeholder={c.emailPlaceholder} />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="role" className="mb-2 block text-sm font-medium text-slate-700">{c.roleLabel}</label>
                                <div className="relative">
                                    <select id="role" name="role" required value={formData.role} onChange={handleChange} className="w-full appearance-none rounded-lg border border-slate-300 bg-white px-4 py-3 focus:border-green-600 focus:outline-none focus:ring-1 focus:ring-green-600">
                                        <option value="" disabled>{c.rolePlaceholder}</option>
                                        {c.roles.map((r) => <option key={r.value} value={r.value}>{r.label}</option>)}
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center px-4 text-slate-500">
                                        <svg className="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <label htmlFor="profession" className="mb-2 block text-sm font-medium text-slate-700">{c.professionLabel}</label>
                                <input type="text" id="profession" name="profession" value={formData.profession} onChange={handleChange} className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:border-green-600 focus:outline-none focus:ring-1 focus:ring-green-600" placeholder={c.professionPlaceholder} />
                                <p className="mt-1 text-sm text-slate-500">{c.professionHint}</p>
                            </div>
                            <Button type="submit" size="lg" className="w-full bg-green-600 text-lg font-bold hover:bg-green-700">{c.submitButton}</Button>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
}
