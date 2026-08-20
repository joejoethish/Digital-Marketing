"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Check, ChevronDown, ChevronUp } from "lucide-react";
import { pricingPlans } from "@/lib/data";

export default function Pricing() {
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedCard(prev => (prev === id ? null : id));
  };

  return (
    <section aria-label="Pricing & Engagement" className="section-pad" style={{ background: "var(--bg-primary)" }}>
      <div className="container">
        
        {/* Header */}
        <div style={{ maxWidth: "560px", marginBottom: "3.5rem" }}>
          <p className="section-label reveal">Engagement Models</p>
          <h2 className="display-lg reveal reveal-delay-1" style={{ marginBottom: "1rem" }}>
            Choose Your<br />
            <span className="gradient-text">Starting Point.</span>
          </h2>
        </div>

        {/* 3 Pricing Cards Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "1.5rem",
          alignItems: "start",
        }} className="contact-row">
          {pricingPlans.map((plan, idx) => {
            const isExpanded = expandedCard === plan.id;
            const isHighlighted = plan.highlighted;

            return (
              <div
                key={plan.id}
                className={`reveal reveal-delay-${idx + 1}`}
                style={{
                  background: "var(--bg-surface)",
                  border: isHighlighted ? "2px solid var(--accent)" : "1px solid var(--border)",
                  borderRadius: "var(--radius-xl)",
                  padding: "2.25rem 1.75rem",
                  position: "relative",
                  boxShadow: isHighlighted
                    ? "0 24px 60px rgba(108,61,255,0.12), 0 0 0 1px rgba(108,61,255,0.15)"
                    : "0 2px 12px rgba(0,0,0,0.03)",
                  transition: "all 0.3s cubic-bezier(0.22,1,0.36,1)",
                }}
              >
                {/* Popular Recommended Badge */}
                {isHighlighted && (
                  <div style={{
                    position: "absolute",
                    top: "-0.875rem",
                    left: "50%",
                    transform: "translateX(-50%)",
                    background: "var(--accent)",
                    color: "#fff",
                    fontSize: "0.6875rem",
                    fontWeight: 800,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    padding: "0.25rem 1rem",
                    borderRadius: "100px",
                    boxShadow: "0 4px 14px var(--accent-glow)",
                    whiteSpace: "nowrap",
                  }}>
                    MOST POPULAR
                  </div>
                )}

                {/* Plan Name & Tagline */}
                <div style={{ marginBottom: "1.5rem" }}>
                  <h3 style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 800,
                    fontSize: "1.25rem",
                    color: "var(--text-primary)",
                    letterSpacing: "0.05em",
                    marginBottom: "0.5rem",
                  }}>
                    {plan.name}
                  </h3>
                  <p style={{ fontWeight: 600, fontSize: "0.9375rem", color: "var(--accent)" }}>
                    {plan.tagline}
                  </p>
                </div>

                <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: "2rem" }}>
                  {plan.bestFor}
                </p>

                {/* Main CTA */}
                <Link
                  href="/contact"
                  className={isHighlighted ? "btn btn-primary" : "btn btn-outline"}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    width: "100%",
                    padding: "0.875rem 1.25rem",
                    fontSize: "0.9375rem",
                    marginBottom: "1.5rem",
                  }}
                >
                  Get a Custom Quote <ArrowRight size={15} />
                </Link>

                {/* Expand Features Toggle Button */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleExpand(plan.id);
                  }}
                  style={{
                    background: "var(--bg-primary)",
                    border: "1px solid var(--border)",
                    borderRadius: "var(--radius-sm)",
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.5rem",
                    fontSize: "0.8125rem",
                    fontWeight: 600,
                    color: "var(--accent)",
                    cursor: "pointer",
                    padding: "0.625rem 1rem",
                    transition: "all 0.2s ease",
                  }}
                >
                  <span>{isExpanded ? "Hide details" : "See what's included"}</span>
                  {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                </button>

                {/* Progressive Disclosure: Feature List */}
                {isExpanded && (
                  <div style={{
                    marginTop: "1.25rem",
                    paddingTop: "1rem",
                    borderTop: "1px solid var(--border)",
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.625rem"
                  }} className="animate-fadeIn">
                    {plan.features.map(f => (
                      <div key={f} style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.8125rem", color: "var(--text-secondary)" }}>
                        <span style={{ color: "var(--accent)", flexShrink: 0 }}><Check size={14} /></span>
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                )}

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
