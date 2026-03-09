import { getContent, Locale } from "@/lib/content";
import TimelineClient from "./TimelineClient";

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

export default function Timeline({ locale }: { locale: Locale }) {
    const content = getContent<TimelineContent>("pages/timeline.md", locale);
    return <TimelineClient content={content} />;
}
