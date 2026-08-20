"use client";
import { Sparkles, TrendingUp, Zap, BarChart3 } from "lucide-react";
import Performance3DCanvas from "./Performance3DCanvas";

export default function PerformanceDashboard() {
  const metrics = [
    { label: "ORGANIC REACH", val: "+140%", desc: "Average organic traffic gain within 90 days", icon: <TrendingUp size={20} color="#22C55E" /> },
    { label: "PAID CAMPAIGN ROAS", val: "3.8×", desc: "Average Return on Ad Spend for Meta & Google", icon: <Zap size={20} color="#6D3DF5" /> },
    { label: "QUALIFIED LEADS", val: "+68%", desc: "Increase in bottom-of-funnel lead velocity", icon: <BarChart3 size={20} color="#A78BFA" /> },
  ];

  return (
    <section
      aria-label="Performance Dashboard"
      style={{
        padding: "7.5rem 0",
        background: "#F8F7F4",
        borderTop: "1px solid #E7E5EA",
        borderBottom: "1px solid #E7E5EA",
      }}
    >
      <div className="container">
        
        {/* Header */}
        <div style={{ textAlign: "center", maxWidth: "640px", margin: "0 auto 4rem auto" }} className="reveal">
          <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", marginBottom: "1rem" }}>
            <Sparkles size={16} color="#6D3DF5" />
            <span style={{ fontSize: "0.75rem", fontWeight: 800, letterSpacing: "0.14em", textTransform: "uppercase", color: "#6D3DF5" }}>
              3D ANALYTICS & CONVERSION ENGINE
            </span>
          </div>

          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 900,
              fontSize: "clamp(2.25rem, 4vw, 3.5rem)",
              lineHeight: 1.08,
              color: "#111113",
              letterSpacing: "-0.03em",
              margin: "0 0 1rem 0",
            }}
          >
            Engineered For <br />
            <span style={{ color: "#6D3DF5" }}>Measurable Growth.</span>
          </h2>
          <p style={{ fontSize: "1.0625rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>
            Every strategy, campaign, and 3D experience is continuously optimized to maximize bottom-line ROI.
          </p>
        </div>

        {/* ── 3D Canvas + Metric Cards Grid ── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "3rem",
            alignItems: "center",
            marginBottom: "3rem",
          }}
          className="contact-row"
        >
          {/* Left Side: 3D Conversion Funnel & Analytics Environment */}
          <div
            style={{
              background: "#FFFFFF",
              border: "1px solid #E7E5EA",
              borderRadius: "var(--radius-lg)",
              padding: "2rem",
              boxShadow: "0 24px 60px rgba(0,0,0,0.06)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
              <span style={{ fontSize: "0.75rem", fontWeight: 800, color: "#6D3DF5", letterSpacing: "0.1em" }}>
                3D CONVERSION FUNNEL
              </span>
              <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "#22C55E" }}>
                ● REAL-TIME DATA SIMULATION
              </span>
            </div>

            <Performance3DCanvas />
          </div>

          {/* Right Side: Oversized Metric Highlights */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {metrics.map((m, idx) => (
              <div
                key={idx}
                style={{
                  background: "#FFFFFF",
                  border: "1px solid #E7E5EA",
                  borderRadius: "var(--radius-md)",
                  padding: "1.75rem",
                  boxShadow: "0 12px 32px rgba(0,0,0,0.04)",
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "1.5rem",
                }}
                className="editorial-item"
              >
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "var(--radius-sm)",
                    background: "rgba(109,61,245,0.08)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  {m.icon}
                </div>

                <div>
                  <div style={{ fontSize: "0.6875rem", fontWeight: 800, color: "var(--text-muted)", letterSpacing: "0.1em" }}>
                    {m.label}
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 900,
                      fontSize: "2.5rem",
                      lineHeight: 1,
                      color: "#111113",
                      margin: "0.25rem 0",
                    }}
                  >
                    {m.val}
                  </div>
                  <div style={{ fontSize: "0.875rem", color: "var(--text-secondary)", lineHeight: 1.5 }}>
                    {m.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
