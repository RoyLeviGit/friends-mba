"use client";

import React, { useState } from "react";
import { Mail, ChevronDown, ChevronUp, MessageSquare, Phone } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";

type ContactContent = {
    heroTitle: string;
    heroSubtitle: string;
    contactTitle: string;
    emailLabel: string;
    email: string;
    phoneLabel: string;
    phone: string;
    faqTitle: string;
    faqs: { question: string; answer: string }[];
    formTitle: string;
    nameLabel: string;
    namePlaceholder: string;
    emailFieldLabel: string;
    emailPlaceholder: string;
    subjectLabel: string;
    subjects: string[];
    messageLabel: string;
    messagePlaceholder: string;
    submitButton: string;
    successMessage: string;
};

export default function ContactClient({ content: c }: { content: ContactContent }) {
    const [formData, setFormData] = useState({ name: "", email: "", subject: c.subjects[0], message: "" });
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert(c.successMessage);
        setFormData({ name: "", email: "", subject: c.subjects[0], message: "" });
    };

    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
            <section className="relative flex min-h-[40vh] items-center justify-center overflow-hidden bg-slate-900 text-white">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-900/95 to-slate-800/90" />
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
                </div>
                <div className="container relative z-10 mx-auto px-4 text-center md:px-6">
                    <h1 className="text-4xl font-black leading-tight tracking-tight md:text-5xl lg:text-6xl">{c.heroTitle}</h1>
                    <p className="mt-4 max-w-2xl mx-auto text-lg font-medium text-slate-200 md:text-xl">{c.heroSubtitle}</p>
                </div>
            </section>

            <section className="py-16 md:py-24 -mt-16 relative z-20">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                        <div className="space-y-6 lg:col-span-1">
                            <Card className="border-none shadow-lg">
                                <CardContent className="p-8">
                                    <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                                        <MessageSquare className="h-5 w-5 text-primary" />{c.contactTitle}
                                    </h3>
                                    <div className="space-y-6">
                                        <div className="flex items-start gap-4">
                                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-700"><Mail className="h-5 w-5" /></div>
                                            <div>
                                                <p className="text-sm font-medium text-slate-500">{c.emailLabel}</p>
                                                <a href={`mailto:${c.email}`} className="text-lg font-bold text-slate-900 hover:text-primary transition-colors">{c.email}</a>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-4">
                                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-700"><Phone className="h-5 w-5" /></div>
                                            <div>
                                                <p className="text-sm font-medium text-slate-500">{c.phoneLabel}</p>
                                                <span className="text-lg font-medium text-slate-900">{c.phone}</span>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="border-none shadow-lg">
                                <CardContent className="p-8">
                                    <h3 className="text-xl font-bold text-slate-900 mb-6">{c.faqTitle}</h3>
                                    <div className="space-y-3">
                                        {c.faqs.map((faq, index) => (
                                            <div key={index} className="overflow-hidden rounded-lg border border-slate-100 bg-slate-50">
                                                <button onClick={() => setOpenFaq(openFaq === index ? null : index)} className="flex w-full items-center justify-between px-4 py-3 text-right font-medium text-slate-900 hover:bg-slate-100 transition-colors focus:outline-none">
                                                    <span>{faq.question}</span>
                                                    {openFaq === index ? <ChevronUp className="h-4 w-4 text-slate-500" /> : <ChevronDown className="h-4 w-4 text-slate-500" />}
                                                </button>
                                                {openFaq === index && (
                                                    <div className="border-t border-slate-100 bg-white px-4 py-3 text-sm text-slate-600 animate-in slide-in-from-top-1 fade-in duration-200">{faq.answer}</div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        <div className="lg:col-span-2">
                            <Card className="border-none shadow-xl h-full">
                                <CardContent className="p-8 md:p-12">
                                    <h2 className="mb-8 text-2xl font-bold text-slate-900">{c.formTitle}</h2>
                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div className="grid gap-6 md:grid-cols-2">
                                            <div>
                                                <label htmlFor="name" className="mb-2 block text-sm font-medium text-slate-700">{c.nameLabel}</label>
                                                <input type="text" id="name" name="name" required value={formData.name} onChange={handleChange} className="w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-900 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-shadow" placeholder={c.namePlaceholder} />
                                            </div>
                                            <div>
                                                <label htmlFor="email" className="mb-2 block text-sm font-medium text-slate-700">{c.emailFieldLabel}</label>
                                                <input type="email" id="email" name="email" required value={formData.email} onChange={handleChange} className="w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-900 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-shadow" placeholder={c.emailPlaceholder} />
                                            </div>
                                        </div>
                                        <div>
                                            <label htmlFor="subject" className="mb-2 block text-sm font-medium text-slate-700">{c.subjectLabel}</label>
                                            <div className="relative">
                                                <select id="subject" name="subject" value={formData.subject} onChange={handleChange} className="w-full appearance-none rounded-lg border border-slate-300 bg-white px-4 py-3 pr-10 text-slate-900 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-shadow">
                                                    {c.subjects.map((s) => <option key={s} value={s}>{s}</option>)}
                                                </select>
                                                <ChevronDown className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                                            </div>
                                        </div>
                                        <div>
                                            <label htmlFor="message" className="mb-2 block text-sm font-medium text-slate-700">{c.messageLabel}</label>
                                            <textarea id="message" name="message" required rows={6} value={formData.message} onChange={handleChange} className="w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-900 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-shadow" placeholder={c.messagePlaceholder} />
                                        </div>
                                        <Button type="submit" variant="primary" className="w-full md:w-auto md:min-w-[200px] text-lg font-bold py-6">{c.submitButton}</Button>
                                    </form>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
