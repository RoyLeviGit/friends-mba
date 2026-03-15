"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { ArrowLeft, Instagram, Heart } from "lucide-react";
import { Locale } from "@/lib/content";

type HeroContent = {
    title: string;
    titleHighlight: string;
    subtitle: string;
    description: string;
    backgroundAlt: string;
    joinButton: string;
    instagramButton: string;
    donateButton: string;
};

const HeroClient = ({ content: c, locale }: { content: HeroContent; locale: Locale }) => {
    return (
        <section id="hero" className="relative flex min-h-[90vh] items-center justify-center overflow-hidden bg-slate-900 text-white">
            <div className="absolute inset-0 z-0">
                <Image src="/images/cover.jpg" alt={c.backgroundAlt} fill priority className="object-cover opacity-40 mix-blend-overlay" />
                <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/50 to-primary/30" />
            </div>

            <div className="container relative z-10 mx-auto px-4 text-center md:px-6">
                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }} className="flex flex-col items-center space-y-6">
                    <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.8 }} className="text-4xl font-black leading-tight tracking-tight md:text-6xl lg:text-7xl">
                        {c.title}
                        <span className="block text-primary-foreground/90">{c.titleHighlight}</span>
                    </motion.h1>

                    <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.8 }} className="text-xl font-medium text-slate-200 md:text-2xl">
                        {c.subtitle}
                    </motion.p>

                    <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.8 }} className="max-w-2xl text-base text-slate-300 md:text-lg">
                        {c.description}
                    </motion.p>

                    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.8, duration: 0.5 }} className="flex gap-4 pt-4">
                        <Link href={`/${locale}/#about`}>
                            <Button size="lg" className="gap-2 text-lg">
                                {c.joinButton}
                                <ArrowLeft className="h-4 w-4" />
                            </Button>
                        </Link>
                        <Link href={`/${locale}/#donate`}>
                            <Button size="lg" variant="secondary" className="gap-2 text-lg">
                                <Heart className="h-5 w-5" />
                                {c.donateButton}
                            </Button>
                        </Link>
                        <a href="https://www.instagram.com/friends_mba" target="_blank" rel="noopener noreferrer">
                            <Button size="lg" variant="outline" className="gap-2 text-lg">
                                <Instagram className="h-5 w-5" />
                                {c.instagramButton}
                            </Button>
                        </a>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default HeroClient;
