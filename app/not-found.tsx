import Link from 'next/link';
import Image from 'next/image';
import { getContent } from '@/lib/content';

type NotFoundContent = {
    notFoundTitle: string;
    notFoundDescription: string;
    notFoundButton: string;
    notFoundImageAlt: string;
};

export default function NotFound() {
    // not-found.tsx can't access route params; default to Hebrew
    const c = getContent<NotFoundContent>("pages/not-found.md", "he");

    return (
        <html lang="he" dir="rtl">
            <body>
                <div className="min-h-screen flex flex-col items-center justify-center p-4 text-center bg-gray-50">
                    <div className="max-w-2xl w-full flex flex-col items-center space-y-8">
                        <div className="relative w-full aspect-video max-w-lg overflow-hidden rounded-2xl shadow-xl">
                            <Image src="/images/404.png" alt={c.notFoundImageAlt} fill className="object-cover" priority />
                        </div>
                        <div className="space-y-4">
                            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">{c.notFoundTitle}</h1>
                            <p className="text-xl text-gray-600 leading-relaxed md:max-w-lg mx-auto whitespace-pre-line">{c.notFoundDescription}</p>
                        </div>
                        <Link href="/he" className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all transform bg-green-600 rounded-full shadow-lg hover:bg-green-700 hover:scale-105 active:scale-95 hover:shadow-green-500/25 ring-offset-2 focus:ring-2 focus:ring-green-500">
                            {c.notFoundButton}
                        </Link>
                    </div>
                </div>
            </body>
        </html>
    );
}
