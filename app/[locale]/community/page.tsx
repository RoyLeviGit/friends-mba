import { getContent, Locale } from "@/lib/content";
import CommunityClient from "./CommunityClient";

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

type Params = { params: Promise<{ locale: string }> };

export default async function CommunityPage({ params }: Params) {
    const { locale } = await params;
    const content = getContent<CommunityContent>("pages/community.md", locale as Locale);
    return <CommunityClient content={content} />;
}
