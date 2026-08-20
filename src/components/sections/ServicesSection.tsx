"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Sparkles, ArrowRight } from "lucide-react";
import { services } from "@/lib/data";
import Services3DCanvas from "./Services3DCanvas";

export default function ServicesSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeService = services[activeIndex] || services[0];

  return (
    <section
      id="services"
      aria-label="Services Index"
      style={{
        padding: "8rem 0",
        background: "#F8F7F4",
        position: "relative",
      }}
    >
      <div className="container">
        
        {/* Section Header */}
        <div style={{ marginBottom: "4rem", maxWidth: "680px" }} className="reveal">
          <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", marginBottom: "1rem" }}>
            <Sparkles size={16} color="#6D3DF5" />
            <span style={{ fontSize: "0.75rem", fontWeight: 800, letterSpacing: "0.14em", textTransform: "uppercase", color: "#6D3DF5" }}>
              CAPABILITIES INDEX
            </span>
          </div>

          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 900,
              fontSize: "clamp(2.5rem, 5vw, 4.25rem)",
              lineHeight: 1.05,
              color: "#111113",
              letterSpacing: "-0.03em",
              margin: "0 0 1rem 0",
            }}
          >
            Built <br />
            <span style={{ color: "#6D3DF5" }}>To Perform.</span>
          </h2>
          <p style={{ fontSize: "1.125rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>
            Explore our specialized digital growth capabilities. Select any service to inspect its interactive 3D visual system.
          </p>
        </div>

        {/* ── Editorial Vertical Index + Interactive 3D Service Visual Showcase ── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.1fr 0.9fr",
            gap: "3.5rem",
            alignItems: "start",
          }}
          className="contact-row"
        >

          {/* Left Vertical Editorial Index (01 to 09) */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            {services.map((service, idx) => {
              const isActive = idx === activeIndex;
              const formattedNum = String(idx + 1).padStart(2, "0");

              return (
                <div
                  key={service.id}
                  onMouseEnter={() => setActiveIndex(idx)}
                  onClick={() => setActiveIndex(idx)}
                  data-cursor="explore"
                  style={{
                    padding: "1.5rem 1.75rem",
                    borderRadius: "var(--radius-md)",
                    background: isActive ? "#FFFFFF" : "transparent",
                    borderLeft: isActive ? "4px solid #6D3DF5" : "4px solid transparent",
                    boxShadow: isActive ? "0 16px 40px rgba(0,0,0,0.06)" : "none",
                    cursor: "pointer",
                    transition: "all 0.3s cubic-bezier(0.22, 1, 0.36, 1)",
                  }}
                  className="editorial-item"
                >
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
                      <span
                        style={{
                          fontFamily: "var(--font-display)",
                          fontWeight: 800,
                          fontSize: "1.125rem",
                          color: isActive ? "#6D3DF5" : "var(--text-muted)",
                        }}
                      >
                        {formattedNum}
                      </span>
                      <h3
                        style={{
                          fontFamily: "var(--font-sans)",
                          fontWeight: 800,
                          fontSize: "clamp(1.25rem, 2vw, 1.75rem)",
                          color: isActive ? "#111113" : "var(--text-secondary)",
                          margin: 0,
                          letterSpacing: "-0.02em",
                        }}
                      >
                        {service.name}
                      </h3>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                      <span style={{ fontSize: "1.25rem" }}>{service.icon}</span>
                      <div
                        style={{
                          width: "36px",
                          height: "36px",
                          borderRadius: "50%",
                          background: isActive ? "#6D3DF5" : "rgba(0,0,0,0.04)",
                          color: isActive ? "#FFFFFF" : "var(--text-muted)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          transition: "all 0.25s ease",
                        }}
                      >
                        {isActive ? <ArrowRight size={16} /> : <ArrowUpRight size={16} />}
                      </div>
                    </div>
                  </div>

                  {/* Expanded Capability Tags on Active */}
                  {isActive && (
                    <div
                      style={{
                        marginTop: "1.25rem",
                        paddingTop: "1rem",
                        borderTop: "1px solid rgba(0,0,0,0.06)",
                        animation: "heroFadeIn 0.3s ease forwards",
                      }}
                    >
                      <p style={{ fontSize: "0.9375rem", color: "var(--text-secondary)", marginBottom: "1rem", lineHeight: 1.6 }}>
                        {service.description}
                      </p>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                        {service.capabilities.map((deliv: string, dIdx: number) => (
                          <span
                            key={dIdx}
                            style={{
                              fontSize: "0.75rem",
                              fontWeight: 700,
                              background: "rgba(109,61,245,0.08)",
                              color: "#5426D9",
                              padding: "0.375rem 0.75rem",
                              borderRadius: "100px",
                            }}
                          >
                            {deliv}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right Sticky Visual Showcase with 3D WebGL Canvas */}
          <div style={{ position: "sticky", top: "7rem" }}>
            <div
              style={{
                background: "#FFFFFF",
                border: "1px solid #E7E5EA",
                borderRadius: "var(--radius-lg)",
                padding: "2rem",
                boxShadow: "0 24px 60px rgba(0,0,0,0.08)",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* 3D WebGL Canvas for Active Service */}
              <Services3DCanvas activeServiceIndex={activeIndex} />

              <div style={{ marginTop: "1.5rem" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                  <span style={{ fontSize: "0.75rem", fontWeight: 800, color: "#6D3DF5", letterSpacing: "0.1em" }}>
                    SERVICE {String(activeIndex + 1).padStart(2, "0")}
                  </span>
                  <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)" }}>
                    DEEYORA GROWTH CAPABILITY
                  </span>
                </div>

                <h4 style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "1.75rem", color: "#111113", margin: "0 0 0.5rem 0" }}>
                  {activeService.name}
                </h4>

                <p style={{ fontSize: "0.9375rem", color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: "1.5rem" }}>
                  {activeService.description}
                </p>

                <Link
                  href="/services"
                  className="btn btn-primary"
                  style={{ width: "100%", justifyContent: "center", padding: "0.875rem 1.5rem" }}
                  data-cursor="cta"
                >
                  View Full Capability Details <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
