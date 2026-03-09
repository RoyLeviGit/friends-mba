import { Button } from "@/components/ui/Button";
import { getContent, Locale } from "@/lib/content";

type AlumniContent = {
    heading: string;
    description: string;
    button: string;
};

const AlumniCTA = ({ locale }: { locale: Locale }) => {
    const c = getContent<AlumniContent>("pages/alumni-cta.md", locale);

    return (
        <section id="community" className="bg-green-50 py-16 md:py-24 text-center">
            <div className="container mx-auto px-4 md:px-6">
                <h2 className="mb-4 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">{c.heading}</h2>
                <p className="mx-auto mb-8 max-w-2xl text-lg text-slate-700">{c.description}</p>
                <Button size="lg" className="text-lg">{c.button}</Button>
            </div>
        </section>
    );
};

export default AlumniCTA;
