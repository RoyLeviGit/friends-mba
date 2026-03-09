import { getContent, Locale } from "@/lib/content";
import NavbarClient from "./NavbarClient";

type NavbarContent = {
    navLinks: { name: string; href: string }[];
    logoAlt: string;
    logoText: string;
    donateButton: string;
};

export default function Navbar({ locale }: { locale: Locale }) {
    const content = getContent<NavbarContent>("pages/navbar.md", locale);
    return <NavbarClient content={content} locale={locale} />;
}
