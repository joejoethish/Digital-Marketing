"use client";
import { useState } from "react";

const steps = [
  { n: "01", name: "Discover", desc: "Understand your business, audience, and growth objectives." },
  { n: "02", name: "Plan", desc: "Build an actionable roadmap across channel mix and content." },
  { n: "03", name: "Create", desc: "Craft high-performing assets, campaigns, and experiences." },
  { n: "04", name: "Launch", desc: "Deploy campaigns with real-time tracking and precision." },
  { n: "05", name: "Optimize", desc: "Measure performance data to double down on what works." },
];

export default function Process() {
  const [activeStep, setActiveStep] = useState<number | null>(null);

  return (
    <section
      aria-label="Process"
      className="section-pad"
      style={{
        background: "var(--bg-surface)",
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
      }}
    >
      <div className="container">
        
        {/* Header */}
        <div style={{ maxWidth: "560px", marginBottom: "3.5rem" }}>
          <p className="section-label reveal">How We Work</p>
          <h2 className="display-lg reveal reveal-delay-1" style={{ marginBottom: "1rem" }}>
            Simple Process.<br />
            <span className="gradient-text">Serious Work.</span>
          </h2>
        </div>

        {/* 5-Step Horizontal / Responsive Process Timeline */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(5, 1fr)",
            gap: "1rem",
            position: "relative",
          }}
          className="process-grid"
        >
          {steps.map((step, idx) => {
            const isCurrent = activeStep === idx;

            return (
              <div
                key={step.n}
                className={`reveal reveal-delay-${idx + 1}`}
                onMouseEnter={() => setActiveStep(idx)}
                onMouseLeave={() => setActiveStep(null)}
                style={{
                  background: isCurrent ? "var(--bg-surface)" : "var(--bg-primary)",
                  border: isCurrent ? "1.5px solid #A78BFA" : "1px solid var(--border)",
                  borderRadius: "var(--radius-lg)",
                  padding: "1.75rem 1.25rem",
                  position: "relative",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  minHeight: "200px",
                  transition: "all 0.3s cubic-bezier(0.22,1,0.36,1)",
                  transform: isCurrent ? "translateY(-6px)" : "translateY(0)",
                  boxShadow: isCurrent ? "0 20px 40px rgba(109,61,245,0.09)" : "none",
                  cursor: "pointer",
                }}
              >
                <div>
                  <span
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 800,
                      fontSize: "1.25rem",
                      color: isCurrent ? "#6D3DF5" : "var(--accent)",
                      display: "block",
                      marginBottom: "0.75rem",
                      transition: "color 0.2s ease",
                    }}
                  >
                    {step.n}
                  </span>

                  <h3
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 700,
                      fontSize: "1.125rem",
                      color: "var(--text-primary)",
                      marginBottom: "0.35rem",
                    }}
                  >
                    {step.name}
                  </h3>
                </div>

                <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)", lineHeight: 1.5 }}>
                  {step.desc}
                </p>

                {/* Progress bar line highlight on bottom */}
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: "3px",
                    background: isCurrent ? "linear-gradient(90deg, #6D3DF5, #A78BFA)" : "transparent",
                    borderRadius: "0 0 12px 12px",
                    transition: "all 0.3s ease",
                  }}
                />
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
