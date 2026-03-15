import { getContent, Locale } from "@/lib/content";
import DonateClient from "./DonateClient";

type DonateContent = {
  badge: string;
  heading: string;
  headingHighlight: string;
  description: string;
  legalNote: string;
  legalOrg: string;
  legalSuffix: string;
  commentInstruction: string;
  commentValue: string;
  copyButton: string;
};

export default function Donate({ locale }: { locale: Locale }) {
  const content = getContent<DonateContent>("pages/donate.md", locale);
  return <DonateClient content={content} />;
}
