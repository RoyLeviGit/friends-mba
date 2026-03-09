"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { Flag, Syringe, Shield, Heart, Activity, Thermometer, LucideIcon } from "lucide-react";

const iconMap: Record<string, LucideIcon> = { Flag, Syringe, Shield, Heart, Activity, Thermometer };

type TimelineEvent = {
    year: string;
    title: string;
    desc: string;
    icon: string;
    image: string;
};

type TimelineContent = {
    sectionTitle: string;
    events: TimelineEvent[];
};

const TimelineItem = ({ event, index }: { event: TimelineEvent; index: number }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const isEven = index % 2 === 0;
    const Icon = iconMap[event.icon] || Flag;

    return (
        <div ref={ref} className={`mb-16 flex flex-col md:flex-row justify-between items-center w-full ${isEven ? 'md:flex-row-reverse' : ''}`}>
            <motion.div initial={{ opacity: 0, x: isEven ? -50 : 50 }} animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isEven ? -50 : 50 }} transition={{ duration: 0.6, ease: "easeOut" }} className="w-full md:w-5/12 mb-6 md:mb-0">
                <div className="relative aspect-video w-full overflow-hidden rounded-lg shadow-lg group border border-slate-200">
                    <Image src={event.image} alt={event.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
            </motion.div>

            <motion.div initial={{ scale: 0 }} animate={isInView ? { scale: 1 } : { scale: 0 }} transition={{ duration: 0.5, delay: 0.2, type: "spring" }} className="hidden md:flex z-20 items-center justify-center bg-white shadow-xl w-16 h-16 rounded-full border-4 border-primary shrink-0">
                <Icon className="w-8 h-8 text-primary" />
            </motion.div>

            <motion.div initial={{ opacity: 0, x: isEven ? 50 : -50 }} animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isEven ? 50 : -50 }} transition={{ duration: 0.6, ease: "easeOut" }} className="w-full md:w-5/12 bg-white rounded-lg shadow-md px-6 py-6 border-t-4 border-primary relative">
                <div className="md:hidden absolute -top-8 right-1/2 translate-x-1/2 bg-white p-3 rounded-full border-4 border-primary shadow-lg z-10 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-primary" />
                </div>
                <span className="mb-2 block text-sm font-bold text-primary tracking-wide pt-4 md:pt-0">{event.year}</span>
                <h3 className="mb-3 font-bold text-slate-900 text-xl md:text-2xl">{event.title}</h3>
                <p className="text-base text-slate-600 leading-relaxed">{event.desc}</p>
            </motion.div>
        </div>
    );
};

const TimelineClient = ({ content: c }: { content: TimelineContent }) => {
    return (
        <section className="bg-slate-50 py-16 md:py-24 overflow-hidden">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex flex-col items-center justify-center text-center mb-16">
                    <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl text-center">{c.sectionTitle}</h2>
                    <div className="mt-2 h-1 w-20 bg-primary rounded-full" />
                </div>
                <div className="relative wrap h-full">
                    <div className="hidden md:block absolute border-2 border-slate-200 h-full left-1/2 -ml-[1px]"></div>
                    <div className="flex flex-col md:space-y-0">
                        {c.events.map((event, index) => (
                            <TimelineItem key={index} event={event} index={index} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TimelineClient;
