"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { services } from "@/lib/data";

const serviceVisualGradients = [
  "linear-gradient(135deg, #6D3DF5 0%, #A78BFA 100%)",
  "linear-gradient(135deg, #5426D9 0%, #6D3DF5 100%)",
  "linear-gradient(135deg, #6D3DF5 0%, #3B82F6 100%)",
  "linear-gradient(135deg, #A78BFA 0%, #5426D9 100%)",
  "linear-gradient(135deg, #6D3DF5 0%, #EC4899 100%)",
  "linear-gradient(135deg, #38BDF8 0%, #6D3DF5 100%)",
  "linear-gradient(135deg, #5426D9 0%, #A78BFA 100%)",
  "linear-gradient(135deg, #6D3DF5 0%, #10B981 100%)",
  "linear-gradient(135deg, #8B5CF6 0%, #6D3DF5 100%)",
];

export default function ServicesSection() {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const activeService = services[activeIndex] || services[0];

  return (
    <section
      aria-label="What We Do"
      className="section-pad"
      style={{
        background: "#F8F7F4",
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
        position: "relative",
      }}
    >
      <div className="container">
        
        {/* Header */}
        <div style={{ maxWidth: "600px", marginBottom: "4rem" }}>
          <p className="section-label reveal">Capabilities Index</p>
          <h2 className="display-lg reveal reveal-delay-1" style={{ marginBottom: "1rem" }}>
            Capabilities Built<br />
            <span className="gradient-text">To Perform.</span>
          </h2>
          <p className="body-lg reveal reveal-delay-2" style={{ color: "var(--text-secondary)" }}>
            Explore our specialized digital growth capabilities.
          </p>
        </div>

        {/* ── Editorial Vertical Interactive Index Layout ── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.2fr 0.8fr",
            gap: "3.5rem",
            alignItems: "start",
          }}
          className="contact-row"
        >
          {/* Left: Editorial Vertical Index List */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            {services.map((service, idx) => {
              const isActive = activeIndex === idx;

              return (
                <div
                  key={service.id}
                  onMouseEnter={() => setActiveIndex(idx)}
                  onClick={() => setActiveIndex(idx)}
                  className={`reveal reveal-delay-${(idx % 4) + 1}`}
                  style={{
                    padding: "1.5rem 1rem",
                    borderBottom: "1px solid var(--border)",
                    cursor: "pointer",
                    transition: "all 0.35s cubic-bezier(0.22,1,0.36,1)",
                    background: isActive ? "rgba(109,61,245,0.04)" : "transparent",
                    borderLeft: `4px solid ${isActive ? "#6D3DF5" : "transparent"}`,
                    paddingLeft: isActive ? "1.5rem" : "1rem",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "1.25rem" }}>
                      <span
                        style={{
                          fontFamily: "var(--font-display)",
                          fontWeight: 800,
                          fontSize: isActive ? "1.25rem" : "0.9375rem",
                          color: isActive ? "#6D3DF5" : "var(--text-muted)",
                          letterSpacing: "0.06em",
                          transition: "all 0.25s ease",
                          width: "36px",
                        }}
                      >
                        {service.number}
                      </span>

                      <h3
                        style={{
                          fontFamily: "var(--font-display)",
                          fontWeight: isActive ? 800 : 700,
                          fontSize: isActive ? "1.5rem" : "1.25rem",
                          color: isActive ? "#111113" : "var(--text-secondary)",
                          transition: "all 0.25s ease",
                          margin: 0,
                        }}
                      >
                        {service.name}
                      </h3>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                      <span style={{ fontSize: "1.25rem" }}>{service.icon}</span>
                      <span
                        style={{
                          width: "34px",
                          height: "34px",
                          borderRadius: "50%",
                          background: isActive ? "#6D3DF5" : "rgba(255,255,255,0.8)",
                          color: isActive ? "#FFFFFF" : "var(--text-muted)",
                          border: `1px solid ${isActive ? "#6D3DF5" : "var(--border)"}`,
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          transition: "all 0.3s ease",
                          transform: isActive ? "rotate(45deg)" : "rotate(0deg)",
                        }}
                      >
                        <ArrowUpRight size={16} />
                      </span>
                    </div>
                  </div>

                  {/* Active expanded capabilities inline for mobile or detail view */}
                  {isActive && (
                    <div
                      style={{
                        marginTop: "1rem",
                        paddingTop: "0.875rem",
                        animation: "heroFadeIn 0.35s ease forwards",
                      }}
                    >
                      <p style={{ fontSize: "0.9375rem", color: "var(--text-secondary)", marginBottom: "1rem", lineHeight: 1.5 }}>
                        {service.description}
                      </p>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                        {service.capabilities.map(cap => (
                          <span
                            key={cap}
                            style={{
                              fontSize: "0.75rem",
                              fontWeight: 600,
                              padding: "0.25rem 0.75rem",
                              borderRadius: "100px",
                              background: "#FFFFFF",
                              color: "#6D3DF5",
                              border: "1px solid rgba(109,61,245,0.25)",
                            }}
                          >
                            {cap}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right: Sticky Editorial Visual Showcase Card */}
          <div className="hide-mobile reveal reveal-delay-2" style={{ position: "sticky", top: "120px" }}>
            <div
              style={{
                background: "#FFFFFF",
                border: "1.5px solid #A78BFA",
                borderRadius: "var(--radius-xl)",
                padding: "2.25rem",
                boxShadow: "0 32px 70px rgba(109,61,245,0.12)",
                transition: "all 0.4s cubic-bezier(0.22,1,0.36,1)",
              }}
            >
              {/* Graphic Banner */}
              <div
                style={{
                  height: "180px",
                  borderRadius: "var(--radius-lg)",
                  background: serviceVisualGradients[activeIndex] || serviceVisualGradients[0],
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#FFFFFF",
                  fontSize: "3.5rem",
                  marginBottom: "1.75rem",
                  boxShadow: "0 12px 32px rgba(109,61,245,0.3)",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div style={{ position: "relative", zIndex: 2 }}>{activeService.icon}</div>
                <div style={{
                  position: "absolute",
                  inset: 0,
                  background: "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.3) 0%, transparent 60%)",
                }} />
              </div>

              {/* Service Details Header */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
                <span style={{ fontSize: "0.75rem", fontWeight: 800, color: "#6D3DF5", letterSpacing: "0.12em" }}>
                  SERVICE {activeService.number}
                </span>
                <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase" }}>
                  DEEYORA GROWTH CAPABILITY
                </span>
              </div>

              <h4
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 800,
                  fontSize: "1.625rem",
                  color: "#111113",
                  marginBottom: "0.75rem",
                }}
              >
                {activeService.name}
              </h4>

              <p style={{ fontSize: "1rem", color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: "1.5rem" }}>
                {activeService.description}
              </p>

              <div style={{ borderTop: "1px solid var(--border)", paddingTop: "1.25rem", marginBottom: "1.75rem" }}>
                <div style={{ fontSize: "0.6875rem", fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: "0.75rem" }}>
                  CORE DELIVERABLES
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                  {activeService.capabilities.map(c => (
                    <span
                      key={c}
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
                      {c}
                    </span>
                  ))}
                </div>
              </div>

              <Link
                href="/services"
                className="btn btn-primary btn-full-mobile"
                style={{ width: "100%", justifyContent: "center", padding: "0.875rem 1.5rem" }}
              >
                Explore {activeService.name} <ArrowUpRight size={16} />
              </Link>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
