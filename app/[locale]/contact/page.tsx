import { getContent, Locale } from "@/lib/content";
import ContactClient from "./ContactClient";

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

type Params = { params: Promise<{ locale: string }> };

export default async function ContactPage({ params }: Params) {
    const { locale } = await params;
    const content = getContent<ContactContent>("pages/contact.md", locale as Locale);
    return <ContactClient content={content} />;
}
