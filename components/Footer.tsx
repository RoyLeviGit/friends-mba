import Link from "next/link";
import { getContent, Locale } from "@/lib/content";

type FooterContent = {
    copyright: string;
    links: { name: string; href: string }[];
};

const Footer = ({ locale }: { locale: Locale }) => {
    const c = getContent<FooterContent>("pages/footer.md", locale);

    return (
        <footer id="footer" className="bg-slate-900 py-8 text-slate-400 text-sm">
            <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 md:flex-row md:px-6">
                <p className="text-center md:text-right">{c.copyright}</p>
                <div className="flex gap-6">
                    {c.links.map((link) => (
                        <Link key={link.name} href={link.href} className="hover:text-white transition-colors">{link.name}</Link>
                    ))}
                </div>
            </div>
        </footer>
    );
};

export default Footer;
