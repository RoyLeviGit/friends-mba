"use client";

import { Heart } from "lucide-react";

type DonateContent = {
  badge: string;
  heading: string;
  headingHighlight: string;
  description: string;
  legalNote: string;
  legalOrg: string;
  legalSuffix: string;
};

export default function DonateClient({ content: c }: { content: DonateContent }) {
  return (
    <section id="donate" className="bg-gradient-to-br from-primary/5 via-white to-primary/10 py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary">
              <Heart className="h-4 w-4" />
              {c.badge}
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl lg:text-5xl">
              {c.heading} <span className="text-primary">{c.headingHighlight}</span>
            </h2>
            <p className="text-lg text-slate-600">{c.description}</p>
            <p className="text-sm text-slate-500">
              {c.legalNote}{" "}
              <a
                href="https://www.p3israel.org/give"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-primary underline underline-offset-2 hover:text-primary/80"
              >
                {c.legalOrg}
              </a>
              {c.legalSuffix}
            </p>
          </div>

          <div className="mx-auto w-fit self-start rounded-2xl bg-white p-2 shadow-xl ring-1 ring-slate-200">
            <iframe
              src="/api/donate"
              name="donorbox"
              allowPaymentRequest
              allow="payment"
              className="rounded-xl"
              style={{ width: 370, height: 900, border: "none" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
