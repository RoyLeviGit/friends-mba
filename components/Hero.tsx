import { getContent, Locale } from "@/lib/content";
import HeroClient from "./HeroClient";

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

export default function Hero({ locale }: { locale: Locale }) {
    const content = getContent<HeroContent>("pages/hero.md", locale);
    return <HeroClient content={content} locale={locale} />;
}
