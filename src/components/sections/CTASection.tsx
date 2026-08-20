"use client";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import CTA3DCanvas from "./CTA3DCanvas";

export default function CTASection() {
  return (
    <section
      aria-label="Call to Action"
      style={{
        padding: "8rem 0",
        background: "#111113",
        color: "#FFFFFF",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background Radial Light */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "70vw",
          height: "40vw",
          background: "radial-gradient(ellipse at center, rgba(109,61,245,0.22) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div className="container" style={{ position: "relative", zIndex: 2, textAlign: "center" }}>
        
        {/* Converging 3D Growth Core WebGL Scene */}
        <div style={{ maxWidth: "600px", margin: "0 auto 1.5rem auto" }}>
          <CTA3DCanvas />
        </div>

        <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", marginBottom: "1.25rem" }}>
          <Sparkles size={16} color="#A78BFA" />
          <span style={{ fontSize: "0.75rem", fontWeight: 800, letterSpacing: "0.16em", textTransform: "uppercase", color: "#A78BFA" }}>
            START YOUR 3D GROWTH JOURNEY
          </span>
        </div>

        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 900,
            fontSize: "clamp(2.75rem, 6.5vw, 5.5rem)",
            lineHeight: 1.0,
            letterSpacing: "-0.04em",
            color: "#FFFFFF",
            maxWidth: "900px",
            margin: "0 auto 1.5rem auto",
          }}
        >
          READY TO <span style={{ color: "#A78BFA" }}>GROW?</span>
        </h2>

        <p
          style={{
            fontSize: "clamp(1.125rem, 1.5vw, 1.375rem)",
            color: "rgba(255,255,255,0.7)",
            maxWidth: "580px",
            margin: "0 auto 3rem auto",
            lineHeight: 1.6,
          }}
        >
          Turn attention into predictable revenue. Talk to our growth team today and unlock custom 3D strategies for your brand.
        </p>

        <div style={{ display: "flex", justifyContent: "center", gap: "1.25rem", flexWrap: "wrap" }}>
          <Link
            href="/contact"
            className="btn"
            style={{
              padding: "1.25rem 3rem",
              fontSize: "1.125rem",
              fontWeight: 800,
              background: "#FFFFFF",
              color: "#111113",
              borderRadius: "100px",
              boxShadow: "0 12px 36px rgba(255,255,255,0.25)",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.75rem",
              transition: "transform 0.25s cubic-bezier(0.22, 1, 0.36, 1)",
            }}
            data-cursor="cta"
          >
            START A PROJECT <ArrowRight size={20} color="#6D3DF5" />
          </Link>
        </div>

      </div>
    </section>
  );
}
