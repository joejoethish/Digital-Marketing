"use client";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export default function Testimonials() {
  useScrollReveal();

  return (
    <section className="section-pad" style={{ background: "var(--bg-primary)" }}>
      <div className="container">
        <div style={{
          background: "linear-gradient(135deg, var(--bg-surface) 0%, var(--bg-surface-alt) 100%)",
          border: "1px solid var(--border)",
          borderRadius: "var(--radius-xl)",
          padding: "clamp(3rem, 6vw, 5rem)",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }} className="reveal">
          {/* Decorative dots */}
          <div style={{ position: "absolute", top: "2rem", left: "2rem", display: "flex", gap: "0.5rem", opacity: 0.4 }}>
            {[...Array(3)].map((_, i) => (
              <div key={i} style={{ width: "8px", height: "8px", borderRadius: "50%", background: "var(--accent)", opacity: 1 - i * 0.3 }} />
            ))}
          </div>
          <div style={{ position: "absolute", bottom: "2rem", right: "2rem", display: "flex", gap: "0.5rem", opacity: 0.4 }}>
            {[...Array(3)].map((_, i) => (
              <div key={i} style={{ width: "8px", height: "8px", borderRadius: "50%", background: "var(--accent)", opacity: i * 0.35 + 0.3 }} />
            ))}
          </div>

          {/* Quotation mark */}
          <div style={{
            width: "56px", height: "56px", borderRadius: "14px",
            background: "var(--accent-dim)", border: "1px solid rgba(108,61,255,0.15)",
            display: "flex", alignItems: "center", justifyContent: "center",
            margin: "0 auto 2rem",
            fontSize: "1.75rem", lineHeight: 1,
          }}>
            ✦
          </div>

          <h2 className="display-md" style={{ marginBottom: "1rem" }}>
            Your Success Story<br />Could Be Next.
          </h2>

          <p className="body-lg" style={{ color: "var(--text-secondary)", maxWidth: "420px", margin: "0 auto 2.5rem" }}>
            We&apos;re building our portfolio with businesses ready to grow. Let&apos;s create something worth talking about.
          </p>

          <Link href="/contact" className="btn btn-primary" style={{ padding: "0.9375rem 2.25rem" }}>
            Work With DEEYORA <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </section>
  );
}
