"use client";

import { Heart } from "lucide-react";

export default function Donate() {
  return (
    <section id="donate" className="bg-gradient-to-br from-primary/5 via-white to-primary/10 py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary">
              <Heart className="h-4 w-4" />
              Support Our Mission
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl lg:text-5xl">
              Help Us Save <span className="text-primary">Lives</span>
            </h2>
            <p className="text-lg text-slate-600">
              Your donation directly supports the soldiers of the Medical
              Battalion. Every contribution helps provide essential gear and
              morale for those who serve on the front lines.
            </p>
            <p className="text-sm text-slate-500">
              Donations are processed with the help of{" "}
              <a
                href="https://www.p3israel.org/give"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-primary underline underline-offset-2 hover:text-primary/80"
              >
                P3 Israel
              </a>
              , a U.S. based, 501(c)(3), non-profit, for purpose, organization.
              All donations made in the U.S. are tax deductible to the fullest extent of the law.
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
