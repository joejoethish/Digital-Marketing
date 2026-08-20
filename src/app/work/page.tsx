"use client";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { caseStudies } from "@/lib/data";
import ScrollRevealInit from "@/components/ScrollRevealInit";
import CTASection from "@/components/sections/CTASection";

const emojis = ["🏪", "🛍️", "📱", "🛒"];

export default function WorkPage() {
  return (
    <>
      <ScrollRevealInit />
      <div style={{ paddingTop: "8rem", background: "var(--bg-primary)" }}>
        <div className="container" style={{ paddingBottom: "5rem" }}>
          {/* Header */}
          <div style={{ maxWidth: "580px", marginBottom: "3.5rem" }}>
            <p className="section-label reveal">Work</p>
            <h1 className="display-lg reveal reveal-delay-1" style={{ marginBottom: "1rem" }}>
              Ideas Worth Seeing.
            </h1>
            <p className="body-lg reveal reveal-delay-2" style={{ color: "var(--text-secondary)" }}>
              Explore concepts, campaigns and growth experiments built by Deyora.
            </p>
          </div>

          {/* Concept note */}
          <div className="reveal" style={{
            display: "inline-flex", alignItems: "center", gap: "0.5rem",
            marginBottom: "3rem", padding: "0.5rem 1rem",
            background: "rgba(217,119,6,0.07)", border: "1px solid rgba(217,119,6,0.18)",
            borderRadius: "var(--radius-sm)",
          }}>
            <span>💡</span>
            <span style={{ fontSize: "0.8125rem", color: "var(--warning)", fontWeight: 500 }}>
              These are clearly labelled concept projects, not real client campaigns.
            </span>
          </div>

          {/* Cards */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1.5rem" }}>
            {caseStudies.map((study, i) => (
              <div
                key={study.id}
                className={`reveal reveal-delay-${(i % 2) + 1}`}
                style={{
                  background: "var(--bg-surface)", border: "1px solid var(--border)",
                  borderRadius: "var(--radius-lg)", overflow: "hidden",
                  transition: "all 0.3s cubic-bezier(0.22,1,0.36,1)",
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.boxShadow = "0 16px 48px rgba(0,0,0,0.08)";
                  el.style.transform = "translateY(-3px)";
                  el.style.borderColor = "rgba(108,61,255,0.15)";
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.boxShadow = "none";
                  el.style.transform = "translateY(0)";
                  el.style.borderColor = "var(--border)";
                }}
              >
                {/* Visual */}
                <div style={{
                  height: "140px",
                  background: "linear-gradient(135deg, var(--accent-dim), rgba(168,85,247,0.07))",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "2.75rem", borderBottom: "1px solid var(--border)",
                }}>
                  {emojis[i]}
                </div>

                <div style={{ padding: "1.75rem" }}>
                  {/* Meta */}
                  <div style={{ marginBottom: "0.875rem" }}>
                    <p style={{ fontSize: "0.625rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: "0.3rem" }}>
                      {study.number} · {study.category}
                    </p>
                    <h2 className="heading-md">{study.title}</h2>
                  </div>

                  {/* Tags */}
                  <div style={{ display: "flex", gap: "0.375rem", flexWrap: "wrap", marginBottom: "1.375rem" }}>
                    {study.tags.map(t => (
                      <span key={t} className="pill" style={{ fontSize: "0.6875rem" }}>{t}</span>
                    ))}
                  </div>

                  {/* Info */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginBottom: "1.375rem" }}>
                    {[
                      { label: "Challenge", value: study.challenge },
                      { label: "Strategy", value: study.strategy },
                      { label: "Outcome", value: study.outcome },
                    ].map(item => (
                      <div key={item.label}>
                        <p style={{ fontSize: "0.625rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: "0.2rem" }}>
                          {item.label}
                        </p>
                        <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                          {item.value}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Link */}
                  <div style={{ paddingTop: "1.125rem", borderTop: "1px solid var(--border)" }}>
                    <Link href="/contact" style={{
                      display: "inline-flex", alignItems: "center", gap: "0.375rem",
                      fontSize: "0.875rem", fontWeight: 600, color: "var(--accent)", textDecoration: "none",
                    }}>
                      Explore a similar approach <ArrowRight size={13} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Coming soon */}
          <div className="reveal" style={{
            marginTop: "2.5rem", borderRadius: "var(--radius-md)",
            border: "1.5px dashed var(--border-strong)",
            padding: "2.5rem", textAlign: "center",
          }}>
            <p style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>🚀</p>
            <h3 className="heading-md" style={{ marginBottom: "0.375rem" }}>Real client work coming soon.</h3>
            <p className="body-sm" style={{ color: "var(--text-secondary)" }}>
              As Deyora works with clients, real results will be featured here.
            </p>
          </div>
        </div>
      </div>
      <CTASection />
    </>
  );
}
