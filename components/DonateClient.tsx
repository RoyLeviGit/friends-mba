"use client";

import { Heart } from "lucide-react";
import { useState, useEffect, useCallback } from "react";

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

export default function DonateClient({ content: c }: { content: DonateContent }) {
  const [height, setHeight] = useState(900);
  const [showForm, setShowForm] = useState(false);

  const onMessage = useCallback((e: MessageEvent) => {
    if (e.origin === "https://donorbox.org" && e.data?.height) {
      setHeight(e.data.height);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [onMessage]);

  const handleCopy = () => {
    navigator.clipboard.writeText(c.commentValue);
    setShowForm(true);
  };
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

          <div className="mx-auto w-fit self-start space-y-3">
            <div style={{ width: 386, fontFamily: "'Helvetica','Arial',sans-serif", background: "#fff9ed", border: "1px solid #fde68a", borderRadius: 12, padding: "12px 16px" }}>
              <p style={{ fontSize: 13, color: "#92400e", marginBottom: 10, fontWeight: 500 }}>{c.commentInstruction}</p>

              {/* Step 1: unchecked "Write us a comment" checkbox */}
              <div style={{ padding: "4px 0 8px", borderBottom: "1px solid #fde68a" }}>
                <span style={{ fontSize: 12, color: "#92400e", fontWeight: 600, marginBottom: 4, display: "block" }}>① ⬇</span>
                <label style={{ display: "inline-flex", alignItems: "center", cursor: "default", fontSize: 16 }}>
                  <span style={{
                    display: "inline-block", width: 18, height: 18, borderRadius: 2,
                    backgroundColor: "rgb(63,81,181)", marginInlineEnd: 8, boxSizing: "border-box",
                    position: "relative"
                  }}>
                    <svg viewBox="0 0 24 24" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
                      <path fill="none" stroke="#fff" strokeWidth="3.12" d="M1.73,12.91 8.1,19.28 22.79,4.59" />
                    </svg>
                  </span>
                  <span style={{ color: "rgba(0,0,0,.87)" }}>Write us a comment</span>
                </label>
              </div>

              {/* Step 2: filled textarea */}
              <div style={{ paddingTop: 8 }}>
                <span style={{ fontSize: 12, color: "#92400e", fontWeight: 600, marginBottom: 4, display: "block" }}>② ⬇</span>
                <div style={{ position: "relative", display: "inline-block", width: "100%", paddingTop: 4, paddingBottom: 16 }}>
                  <div style={{
                    width: "100%", padding: "4px 0", fontSize: 16, color: "rgba(0,0,0,.87)",
                    borderBottom: "1px solid rgba(0,0,0,.12)", fontWeight: 500, direction: "ltr"
                  }} className="select-all">{c.commentValue}</div>
                  <label style={{ position: "absolute", bottom: 0, left: 0, right: 0, fontSize: 12, color: "rgb(63,81,181)" }}>Your comment</label>
                </div>
              </div>

              <button
                onClick={handleCopy}
                style={{
                  width: "100%", marginTop: 12, padding: "10px 0", fontSize: 15, fontWeight: 600,
                  color: "#fff", backgroundColor: "rgb(63,81,181)", border: "none", borderRadius: 8,
                  cursor: "pointer"
                }}
              >{c.copyButton}</button>
            </div>
            {showForm && (
            <div className="rounded-2xl bg-white p-2 shadow-xl ring-1 ring-slate-200">
            <iframe
              src="https://donorbox.org/embed/give-page-donation?language=en&designation=Emergency+Relief"
              name="donorbox"
              allow="payment"
              className="rounded-xl"
              style={{ width: 370, height, border: "none", transition: "height 0.3s ease" }}
            />
            </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
