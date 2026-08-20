"use client";
import { useState } from "react";
import { whyDeeyoraCards } from "@/lib/data";

export default function WhyDeeyora() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section aria-label="Why DEEYORA" className="section-pad" style={{ background: "var(--bg-primary)" }}>
      <div className="container">
        
        {/* Header */}
        <div style={{ maxWidth: "560px", marginBottom: "3.5rem" }}>
          <p className="section-label reveal">Differentiators</p>
          <h2 className="display-lg reveal reveal-delay-1" style={{ marginBottom: "1rem" }}>
            Why DEEYORA?
          </h2>
          <p className="body-lg reveal reveal-delay-2" style={{ color: "var(--text-secondary)" }}>
            Smart strategy. Better creative. Measurable growth.
          </p>
        </div>

        {/* 4 Clean Visual Cards */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "1.5rem",
        }} className="contact-row">
          {whyDeeyoraCards.map((card, i) => {
            const isHovered = hoveredId === card.id;

            return (
              <div
                key={card.id}
                className={`reveal reveal-delay-${i + 1}`}
                onMouseEnter={() => setHoveredId(card.id)}
                onMouseLeave={() => setHoveredId(null)}
                style={{
                  background: "var(--bg-surface)",
                  border: isHovered ? "1.5px solid var(--accent)" : "1px solid var(--border)",
                  borderRadius: "var(--radius-lg)",
                  padding: "2.25rem",
                  position: "relative",
                  overflow: "hidden",
                  transition: "all 0.3s cubic-bezier(0.22,1,0.36,1)",
                  transform: isHovered ? "translateY(-4px)" : "translateY(0)",
                  boxShadow: isHovered
                    ? "0 24px 50px rgba(0,0,0,0.07), 0 0 0 1px rgba(108,61,255,0.08)"
                    : "0 2px 8px rgba(0,0,0,0.02)",
                  cursor: "pointer",
                }}
              >
                {/* Top Accent Line on Hover */}
                <div style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: "3px",
                  background: "var(--accent)",
                  opacity: isHovered ? 1 : 0,
                  transition: "opacity 0.25s ease",
                }} />

                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "1.25rem" }}>
                  <span style={{ fontSize: "2rem", transform: isHovered ? "scale(1.15) rotate(4deg)" : "scale(1)", transition: "transform 0.3s ease" }}>
                    {card.icon}
                  </span>
                  <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "0.8125rem", color: "var(--text-muted)" }}>
                    {card.number}
                  </span>
                </div>

                <h3 className="heading-md" style={{ color: "var(--text-primary)", marginBottom: "0.5rem" }}>
                  {card.title}
                </h3>

                <p style={{ fontWeight: 600, fontSize: "1rem", color: "var(--accent)", marginBottom: "0.5rem" }}>
                  {card.body}
                </p>

                <p className="body-sm" style={{ color: "var(--text-secondary)" }}>
                  {card.detail}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
