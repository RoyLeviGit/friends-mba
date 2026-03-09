"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, Globe } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Locale } from "@/lib/content";

type NavbarContent = {
    navLinks: { name: string; href: string }[];
    logoAlt: string;
    logoText: string;
    donateButton: string;
};

function localizeHref(href: string, locale: string): string {
    // For hash-only links like /#about, prefix with locale
    if (href.startsWith("/#")) return `/${locale}${href}`;
    if (href === "/") return `/${locale}`;
    return `/${locale}${href}`;
}

const NavbarClient = ({ content: c, locale }: { content: NavbarContent; locale: Locale }) => {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    const otherLocale = locale === "he" ? "en" : "he";
    const otherLocaleLabel = locale === "he" ? "EN" : "עב";
    // Replace current locale prefix with the other locale
    const switchPath = pathname.replace(/^\/(he|en)/, `/${otherLocale}`);

    return (
        <nav className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex h-16 items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Link href={`/${locale}`} className="flex items-center gap-2">
                            <div className="relative h-10 w-10 overflow-hidden rounded-full border border-gray-200">
                                <Image src="/images/logo.svg" alt={c.logoAlt} fill className="object-contain" />
                            </div>
                            <span className="hidden text-xl font-bold text-primary md:inline-block">{c.logoText}</span>
                        </Link>
                    </div>

                    <div className="hidden md:flex md:items-center md:gap-6">
                        {c.navLinks.map((link) => (
                            <Link key={link.name} href={localizeHref(link.href, locale)} className="text-sm font-medium text-slate-700 transition-colors hover:text-primary">
                                {link.name}
                            </Link>
                        ))}
                        <Link href={localizeHref("/donate", locale)}>
                            <Button variant="secondary" size="sm" className="font-bold shadow-sm">{c.donateButton}</Button>
                        </Link>
                        <Link href={switchPath} className="flex items-center gap-1 rounded-md border border-slate-200 px-2 py-1 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900">
                            <Globe className="h-4 w-4" />
                            {otherLocaleLabel}
                        </Link>
                    </div>

                    <button className="md:hidden" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
                        {isOpen ? <X className="h-6 w-6 text-slate-700" /> : <Menu className="h-6 w-6 text-slate-700" />}
                    </button>
                </div>
            </div>

            {isOpen && (
                <div className="border-b bg-white md:hidden">
                    <div className="container flex flex-col gap-4 p-4">
                        {c.navLinks.map((link) => (
                            <Link key={link.name} href={localizeHref(link.href, locale)} className="text-base font-medium text-slate-700 hover:text-primary" onClick={() => setIsOpen(false)}>
                                {link.name}
                            </Link>
                        ))}
                        <Link href={localizeHref("/donate", locale)} onClick={() => setIsOpen(false)}>
                            <Button variant="secondary" className="w-full font-bold shadow-sm">{c.donateButton}</Button>
                        </Link>
                        <Link href={switchPath} onClick={() => setIsOpen(false)} className="flex items-center justify-center gap-2 rounded-md border border-slate-200 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100">
                            <Globe className="h-4 w-4" />
                            {otherLocaleLabel}
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default NavbarClient;
