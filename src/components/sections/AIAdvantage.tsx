"use client";
import { useState, useEffect } from "react";
import { aiWorkflowSteps } from "@/lib/data";

export default function AIAdvantage() {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep(prev => (prev + 1) % aiWorkflowSteps.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section aria-label="AI Advantage" className="section-pad" style={{ background: "var(--bg-surface)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
      <div className="container">
        
        {/* Header */}
        <div style={{ maxWidth: "560px", marginBottom: "3.5rem" }}>
          <p className="section-label reveal">Technology Integration</p>
          <h2 className="display-lg reveal reveal-delay-1" style={{ marginBottom: "1rem" }}>
            Smarter Marketing<br />
            <span className="gradient-text">With AI.</span>
          </h2>
          <p className="body-lg reveal reveal-delay-2" style={{ color: "var(--text-secondary)" }}>
            Research faster. Create better. Optimize continuously.
          </p>
        </div>

        {/* 4-Stage Visual Workflow */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "1rem",
          marginBottom: "2.5rem",
        }} className="contact-row reveal reveal-delay-2">
          {aiWorkflowSteps.map((item, idx) => {
            const isActive = activeStep === idx;

            return (
              <div
                key={item.step}
                onClick={() => setActiveStep(idx)}
                style={{
                  background: isActive ? "var(--accent-dim)" : "var(--bg-primary)",
                  border: isActive ? "1.5px solid var(--accent)" : "1px solid var(--border)",
                  borderRadius: "var(--radius-lg)",
                  padding: "1.5rem",
                  cursor: "pointer",
                  transition: "all 0.3s cubic-bezier(0.22,1,0.36,1)",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                  <span style={{ fontSize: "1.5rem" }}>{item.icon}</span>
                  <span style={{
                    fontSize: "0.6875rem",
                    fontWeight: 800,
                    color: isActive ? "var(--accent)" : "var(--text-muted)",
                    letterSpacing: "0.1em",
                  }}>
                    {item.step}
                  </span>
                </div>

                <h3 style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  fontSize: "1.125rem",
                  color: isActive ? "var(--accent)" : "var(--text-primary)",
                  marginBottom: "0.35rem",
                }}>
                  {item.name}
                </h3>

                <p style={{ fontSize: "0.8125rem", color: "var(--text-secondary)", lineHeight: 1.5 }}>
                  {item.desc}
                </p>

                {/* Progress indicator bar */}
                {isActive && (
                  <div style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: "3px",
                    background: "var(--accent)",
                  }} />
                )}
              </div>
            );
          })}
        </div>

        {/* Elegant Minimal AI Interface Banner */}
        <div className="reveal reveal-delay-3" style={{
          background: "var(--bg-primary)",
          border: "1px solid var(--border)",
          borderRadius: "var(--radius-xl)",
          padding: "1.75rem 2.25rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "1.5rem",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <div style={{
              width: "42px",
              height: "42px",
              borderRadius: "50%",
              background: "var(--accent-dim)",
              border: "1px solid rgba(108,61,255,0.2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1.25rem",
            }}>
              🤖
            </div>
            <div>
              <div style={{ fontSize: "0.875rem", fontWeight: 700, color: "var(--text-primary)" }}>
                Human Strategy + AI Velocity
              </div>
              <div style={{ fontSize: "0.8125rem", color: "var(--text-secondary)" }}>
                We use AI to speed up routine tasks so we can focus on growth strategy.
              </div>
            </div>
          </div>

          <div style={{ display: "flex", gap: "0.75rem" }}>
            <span className="pill" style={{ fontSize: "0.75rem" }}>Research Engine</span>
            <span className="pill" style={{ fontSize: "0.75rem" }}>Creative Automation</span>
            <span className="pill" style={{ fontSize: "0.75rem" }}>Smart Analytics</span>
          </div>
        </div>

      </div>
    </section>
  );
}
