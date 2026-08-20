"use client";
import { useState, useEffect } from "react";

const metrics = [
  { val: "+140%", label: "Organic Reach Growth", tag: "SEO & Content" },
  { val: "3.8×",  label: "Average Lead ROAS",    tag: "Paid Campaigns" },
  { val: "+68%",  label: "Qualified Lead Volume",tag: "Funnel Optimization" },
  { val: "+210%", label: "Client Revenue Scale",  tag: "Full Ecosystem" },
];

export default function PerformanceDashboard() {
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    setAnimated(true);
  }, []);

  return (
    <section
      aria-label="Performance Analytics"
      className="section-pad"
      style={{
        background: "#F8F7F4",
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
      }}
    >
      <div className="container">
        
        {/* Header */}
        <div style={{ maxWidth: "600px", marginBottom: "4rem" }}>
          <p className="section-label reveal">Data & Analytics</p>
          <h2 className="display-lg reveal reveal-delay-1" style={{ marginBottom: "1rem" }}>
            Designed For<br />
            <span className="gradient-text">Measurable Impact.</span>
          </h2>
          <p className="body-lg reveal reveal-delay-2" style={{ color: "var(--text-secondary)" }}>
            We track metrics that directly impact your pipeline and revenue growth.
          </p>
        </div>

        {/* Oversized Kinetic Metrics Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "1.5rem",
            marginBottom: "3.5rem",
          }}
          className="contact-row"
        >
          {metrics.map((m, idx) => (
            <div
              key={m.label}
              className={`reveal reveal-delay-${idx + 1}`}
              style={{
                background: "#FFFFFF",
                border: "1.5px solid var(--border)",
                borderRadius: "var(--radius-xl)",
                padding: "2.25rem 1.75rem",
                boxShadow: "0 16px 40px rgba(0,0,0,0.03)",
                transition: "all 0.3s cubic-bezier(0.22,1,0.36,1)",
                position: "relative",
                overflow: "hidden",
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.transform = "translateY(-4px)";
                el.style.borderColor = "#A78BFA";
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.transform = "translateY(0)";
                el.style.borderColor = "var(--border)";
              }}
            >
              <div style={{ fontSize: "0.6875rem", fontWeight: 800, color: "#6D3DF5", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "1rem" }}>
                {m.tag}
              </div>

              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 900,
                  fontSize: "clamp(2.5rem, 4.5vw, 4rem)",
                  color: "#111113",
                  lineHeight: 1,
                  marginBottom: "0.75rem",
                }}
              >
                {m.val}
              </div>

              <div style={{ fontSize: "0.9375rem", fontWeight: 600, color: "var(--text-secondary)" }}>
                {m.label}
              </div>

              {/* Progress Line */}
              <div
                style={{
                  position: "absolute",
                  bottom: 0, left: 0, right: 0,
                  height: "3px",
                  background: "linear-gradient(90deg, #6D3DF5, #A78BFA)",
                }}
              />
            </div>
          ))}
        </div>

        {/* Progressive SVG Data Chart Composition */}
        <div
          className="reveal reveal-delay-3"
          style={{
            background: "#FFFFFF",
            border: "1.5px solid var(--border)",
            borderRadius: "var(--radius-xl)",
            padding: "2.5rem",
            boxShadow: "0 24px 60px rgba(0,0,0,0.04)",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
            <div>
              <span style={{ fontSize: "0.6875rem", fontWeight: 800, color: "#6D3DF5", letterSpacing: "0.12em", textTransform: "uppercase" }}>
                DEEYORA PERFORMANCE ENGINE
              </span>
              <h3 className="heading-md" style={{ color: "#111113", marginTop: "0.25rem" }}>
                Continuous Growth Trajectory
              </h3>
            </div>
            <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "#22C55E", background: "rgba(34,197,94,0.1)", padding: "0.3rem 0.875rem", borderRadius: "100px" }}>
              LIVE TRACKING
            </span>
          </div>

          <svg viewBox="0 0 800 180" style={{ width: "100%", height: "180px" }} aria-hidden="true">
            <defs>
              <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#6D3DF5" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#6D3DF5" stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {/* Grid lines */}
            <line x1="0" y1="40" x2="800" y2="40" stroke="#E7E5EA" strokeDasharray="4 4" />
            <line x1="0" y1="90" x2="800" y2="90" stroke="#E7E5EA" strokeDasharray="4 4" />
            <line x1="0" y1="140" x2="800" y2="140" stroke="#E7E5EA" strokeDasharray="4 4" />

            {/* Filled Area */}
            <path
              d="M 0 150 Q 200 120 400 70 T 800 20 L 800 180 L 0 180 Z"
              fill="url(#chartGrad)"
            />

            {/* Animated Draw Curve Line */}
            <path
              d="M 0 150 Q 200 120 400 70 T 800 20"
              fill="none"
              stroke="#6D3DF5"
              strokeWidth="4"
              strokeDasharray="1000"
              strokeDashoffset={animated ? "0" : "1000"}
              style={{ transition: "stroke-dashoffset 2s ease-out" }}
            />

            {/* Milestone Dots */}
            <circle cx="200" cy="120" r="5" fill="#6D3DF5" />
            <circle cx="400" cy="70" r="5" fill="#6D3DF5" />
            <circle cx="800" cy="20" r="7" fill="#6D3DF5" />
          </svg>
        </div>

      </div>
    </section>
  );
}
