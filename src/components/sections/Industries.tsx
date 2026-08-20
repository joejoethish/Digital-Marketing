"use client";
import { useState } from "react";
import { industries } from "@/lib/data";

export default function Industries() {
  const [activeIndex, setActiveIndex] = useState(0);
  const current = industries[activeIndex];

  return (
    <section aria-label="Industries" className="section-pad" style={{ background: "var(--bg-surface)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
      <div className="container">
        
        {/* Header */}
        <div style={{ maxWidth: "560px", marginBottom: "3rem" }}>
          <p className="section-label reveal">Industry Expertise</p>
          <h2 className="display-lg reveal reveal-delay-1" style={{ marginBottom: "1rem" }}>
            Built for<br />
            <span className="gradient-text">Different Businesses.</span>
          </h2>
          <p className="body-lg reveal reveal-delay-2" style={{ color: "var(--text-secondary)" }}>
            Different businesses. Different growth strategies.
          </p>
        </div>

        {/* Interactive Industry Selector Pills */}
        <div className="reveal reveal-delay-2" style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "0.625rem",
          marginBottom: "2.5rem",
        }}>
          {industries.map((ind, i) => {
            const isSelected = activeIndex === i;
            return (
              <button
                key={ind.name}
                onClick={() => setActiveIndex(i)}
                style={{
                  padding: "0.6rem 1.375rem",
                  borderRadius: "100px",
                  border: `1.5px solid ${isSelected ? "var(--accent)" : "var(--border)"}`,
                  background: isSelected ? "var(--accent)" : "var(--bg-primary)",
                  color: isSelected ? "#fff" : "var(--text-secondary)",
                  fontWeight: 600,
                  fontSize: "0.875rem",
                  cursor: "pointer",
                  transition: "all 0.2s cubic-bezier(0.22,1,0.36,1)",
                  transform: isSelected ? "scale(1.03)" : "scale(1)",
                  boxShadow: isSelected ? "0 8px 24px var(--accent-glow)" : "none",
                }}
              >
                {ind.name}
              </button>
            );
          })}
        </div>

        {/* Selected Strategy Reveal Panel */}
        <div className="reveal reveal-delay-3" style={{
          background: "var(--bg-primary)",
          border: "1.5px solid var(--border)",
          borderRadius: "var(--radius-lg)",
          padding: "2rem 2.5rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "1.5rem",
        }}>
          <div>
            <div style={{ fontSize: "0.6875rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--accent)", marginBottom: "0.5rem" }}>
              Strategy Focus — {current.name}
            </div>
            <h3 className="heading-md" style={{ color: "var(--text-primary)" }}>
              Proven Channels That Move The Needle
            </h3>
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
            {current.strategies.map(strat => (
              <span key={strat} className="pill" style={{ padding: "0.45rem 1rem", fontSize: "0.875rem", fontWeight: 600 }}>
                {strat}
              </span>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
