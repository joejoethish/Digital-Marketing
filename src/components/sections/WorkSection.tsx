"use client";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { caseStudies } from "@/lib/data";

const projectGradients = [
  "linear-gradient(135deg, #6D3DF5 0%, #5426D9 100%)",
  "linear-gradient(135deg, #111113 0%, #6D3DF5 100%)",
  "linear-gradient(135deg, #5426D9 0%, #A78BFA 100%)",
];

export default function WorkSection() {
  return (
    <section aria-label="Work That Speaks" className="section-pad" style={{ background: "#F8F7F4" }}>
      <div className="container">
        
        {/* Header */}
        <div style={{ maxWidth: "600px", marginBottom: "4rem" }}>
          <p className="section-label reveal">Editorial Portfolio</p>
          <h2 className="display-lg reveal reveal-delay-1" style={{ marginBottom: "1rem" }}>
            Work That<br />
            <span className="gradient-text">Speaks.</span>
          </h2>
          <p className="body-lg reveal reveal-delay-2" style={{ color: "var(--text-secondary)" }}>
            Explore our featured client case studies and digital growth campaigns.
          </p>
        </div>

        {/* ── Large Editorial Viewport Project Showcases ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: "3.5rem" }}>
          {caseStudies.map((study, idx) => {
            const isEven = idx % 2 === 0;

            return (
              <div
                key={study.id}
                data-cursor="project"
                className={`work-card reveal reveal-delay-${idx + 1}`}
                style={{
                  background: "#FFFFFF",
                  border: "1.5px solid var(--border)",
                  borderRadius: "var(--radius-xl)",
                  overflow: "hidden",
                  boxShadow: "0 24px 60px rgba(0,0,0,0.05)",
                  display: "grid",
                  gridTemplateColumns: isEven ? "1.1fr 0.9fr" : "0.9fr 1.1fr",
                  alignItems: "center",
                  transition: "all 0.4s cubic-bezier(0.22,1,0.36,1)",
                  cursor: "pointer",
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.transform = "translateY(-6px)";
                  el.style.borderColor = "#A78BFA";
                  el.style.boxShadow = "0 32px 80px rgba(109,61,245,0.12)";
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.transform = "translateY(0)";
                  el.style.borderColor = "var(--border)";
                  el.style.boxShadow = "0 24px 60px rgba(0,0,0,0.05)";
                }}
              >
                {/* Large Visual Frame (Swaps side depending on even/odd) */}
                <div
                  style={{
                    order: isEven ? 1 : 2,
                    height: "340px",
                    background: projectGradients[idx] || projectGradients[0],
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    padding: "2rem",
                    color: "#FFFFFF",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: "0.75rem", fontWeight: 800, letterSpacing: "0.14em", textTransform: "uppercase", background: "rgba(255,255,255,0.15)", padding: "0.25rem 0.75rem", borderRadius: "100px" }}>
                      {study.category}
                    </span>
                    <span style={{ fontSize: "0.875rem", fontWeight: 800, opacity: 0.8 }}>
                      {study.number}
                    </span>
                  </div>

                  {/* Big Impact Metric / Outcome display */}
                  <div>
                    <div style={{ fontSize: "0.6875rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", opacity: 0.8, marginBottom: "0.25rem" }}>
                      PRIMARY OUTCOME
                    </div>
                    <div style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "clamp(1.5rem, 3vw, 2.25rem)", lineHeight: 1.1 }}>
                      {study.outcome}
                    </div>
                  </div>

                  <div style={{
                    position: "absolute",
                    bottom: "-20%", right: "-10%",
                    fontSize: "12rem", opacity: 0.08, pointerEvents: "none"
                  }}>
                    {study.number}
                  </div>
                </div>

                {/* Editorial Details Column */}
                <div style={{ order: isEven ? 2 : 1, padding: "3rem 2.5rem" }}>
                  <div style={{ fontSize: "0.6875rem", fontWeight: 800, color: "#6D3DF5", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "0.75rem" }}>
                    DEEYORA CASE STUDY
                  </div>

                  <h3
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 800,
                      fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
                      color: "#111113",
                      marginBottom: "1rem",
                      lineHeight: 1.1,
                    }}
                  >
                    {study.title}
                  </h3>

                  <div style={{ fontSize: "1rem", color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: "1.75rem" }}>
                    <strong style={{ color: "#111113" }}>Strategy Execution: </strong>
                    {study.strategy}
                  </div>

                  <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "2rem" }}>
                    {study.tags.map(t => (
                      <span
                        key={t}
                        style={{
                          fontSize: "0.8125rem",
                          fontWeight: 600,
                          padding: "0.35rem 0.875rem",
                          borderRadius: "100px",
                          background: "#F0EEF9",
                          color: "#5426D9",
                          border: "1px solid rgba(109,61,245,0.18)",
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <Link
                    href="/work"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      fontSize: "0.9375rem",
                      fontWeight: 700,
                      color: "#6D3DF5",
                      textDecoration: "none",
                    }}
                  >
                    <span>VIEW CASE STUDY</span>
                    <ArrowUpRight size={18} />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Link to Full Work Page */}
        <div style={{ textAlign: "center", marginTop: "4rem" }} className="reveal">
          <Link href="/work" className="btn btn-outline" style={{ padding: "1rem 2.25rem", fontSize: "1rem" }}>
            Explore All Client Work & Concepts →
          </Link>
        </div>

      </div>
    </section>
  );
}
