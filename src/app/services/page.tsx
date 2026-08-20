"use client";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { services } from "@/lib/data";
import ScrollRevealInit from "@/components/ScrollRevealInit";
import CTASection from "@/components/sections/CTASection";

export default function ServicesPage() {
  return (
    <>
      <ScrollRevealInit />
      <div style={{ paddingTop: "8rem", background: "var(--bg-primary)" }}>
        <div className="container" style={{ paddingBottom: "4rem" }}>

          {/* Header */}
          <div style={{ maxWidth: "560px", marginBottom: "4rem" }}>
            <p className="section-label">What We Do</p>
            <h1 className="display-lg reveal" style={{ marginBottom: "1rem" }}>
              Everything you need<br />
              <span className="gradient-text">to grow online.</span>
            </h1>
            <p className="body-lg reveal reveal-delay-1" style={{ color: "var(--text-secondary)" }}>
              No guesswork. No bloat. Just what moves the needle for your business.
            </p>
          </div>

          {/* Services list */}
          <div style={{
            display: "flex", flexDirection: "column", gap: "1px",
            background: "var(--border)", border: "1px solid var(--border)",
            borderRadius: "var(--radius-lg)", overflow: "hidden",
          }}>
            {services.map((service, i) => (
              <div
                key={service.id}
                className={`reveal reveal-delay-${Math.min(i % 3 + 1, 3)}`}
                style={{
                  background: "var(--bg-primary)",
                  padding: "1.75rem 2rem",
                  transition: "background 0.22s ease",
                  cursor: "default",
                }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "var(--bg-surface)"}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "var(--bg-primary)"}
              >
                <div style={{ display: "grid", gridTemplateColumns: "64px 1fr 260px auto", gap: "1.75rem", alignItems: "center" }}>

                  {/* Icon */}
                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontSize: "0.625rem", fontWeight: 700, letterSpacing: "0.1em", color: "var(--text-muted)", marginBottom: "0.4rem" }}>{service.number}</div>
                    <div style={{ fontSize: "1.625rem" }}>{service.icon}</div>
                  </div>

                  {/* Name + description */}
                  <div>
                    <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.0625rem", letterSpacing: "-0.01em", marginBottom: "0.3rem" }}>
                      {service.name}
                    </h2>
                    <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                      {service.description}
                    </p>
                  </div>

                  {/* Capabilities */}
                  <div>
                    <p style={{ fontSize: "0.625rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: "0.5rem" }}>
                      How we help
                    </p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.3rem" }}>
                      {service.capabilities.map(c => (
                        <span key={c} className="pill" style={{ fontSize: "0.75rem" }}>{c}</span>
                      ))}
                    </div>
                  </div>

                  {/* CTA */}
                  <div>
                    <Link href="/contact" className="btn btn-outline" style={{ padding: "0.6rem 1.125rem", fontSize: "0.8125rem", whiteSpace: "nowrap" }}>
                      Get Started <ArrowRight size={13} />
                    </Link>
                  </div>

                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <CTASection />
    </>
  );
}
