"use client";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export default function CTASection() {
  return (
    <section
      aria-label="Call to Action"
      className="section-pad"
      style={{
        background: "linear-gradient(135deg, #6D3DF5 0%, #5426D9 100%)",
        color: "#FFFFFF",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background Glow */}
      <div
        style={{
          position: "absolute",
          top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
          width: "900px", height: "500px",
          background: "radial-gradient(ellipse at center, rgba(255,255,255,0.15) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <div className="grid-bg" style={{ position: "absolute", inset: 0, opacity: 0.1, pointerEvents: "none" }} />

      <div className="container" style={{ position: "relative", zIndex: 2, textAlign: "center" }}>
        
        {/* Top Eyebrow */}
        <div className="reveal" style={{ display: "inline-flex", alignItems: "center", gap: "0.625rem", background: "rgba(255,255,255,0.14)", border: "1px solid rgba(255,255,255,0.25)", padding: "0.4rem 1.125rem", borderRadius: "100px", marginBottom: "2rem" }}>
          <Sparkles size={14} color="#A78BFA" />
          <span style={{ fontSize: "0.75rem", fontWeight: 800, letterSpacing: "0.14em", textTransform: "uppercase", color: "#FFFFFF" }}>
            READY TO SCALE YOUR BRAND?
          </span>
        </div>

        {/* Big Bold Headline */}
        <h2
          className="display-xl reveal reveal-delay-1"
          style={{
            color: "#FFFFFF",
            maxWidth: "900px",
            margin: "0 auto 1.5rem",
            lineHeight: 1.05,
          }}
        >
          Let’s Build Your<br />
          <span style={{
            background: "linear-gradient(135deg, #FFFFFF 0%, #A78BFA 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}>
            Digital Growth Engine.
          </span>
        </h2>

        {/* Copy */}
        <p
          className="body-lg reveal reveal-delay-2"
          style={{
            maxWidth: "540px",
            margin: "0 auto 3rem",
            color: "rgba(255,255,255,0.85)",
          }}
        >
          Partner with DEEYORA for strategy, marketing, creative, and performance solutions designed to move the needle.
        </p>

        {/* Primary CTA Buttons */}
        <div
          className="reveal reveal-delay-3"
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "1.25rem",
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          <Link
            href="/contact"
            className="btn"
            style={{
              background: "#FFFFFF",
              color: "#6D3DF5",
              fontWeight: 800,
              fontSize: "1.125rem",
              padding: "1.25rem 2.75rem",
              borderRadius: "100px",
              boxShadow: "0 16px 40px rgba(0,0,0,0.25)",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.75rem",
              transition: "all 0.3s cubic-bezier(0.22,1,0.36,1)",
              textDecoration: "none",
            }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLElement;
              el.style.transform = "scale(1.05) translateY(-3px)";
              el.style.boxShadow = "0 24px 60px rgba(0,0,0,0.35)";
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLElement;
              el.style.transform = "scale(1) translateY(0)";
              el.style.boxShadow = "0 16px 40px rgba(0,0,0,0.25)";
            }}
          >
            <span>START A PROJECT</span>
            <ArrowRight size={20} />
          </Link>

          <Link
            href="/services"
            className="btn"
            style={{
              background: "rgba(255,255,255,0.1)",
              border: "1.5px solid rgba(255,255,255,0.3)",
              color: "#FFFFFF",
              fontWeight: 700,
              fontSize: "1.0625rem",
              padding: "1.25rem 2.5rem",
              borderRadius: "100px",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.75rem",
              backdropFilter: "blur(8px)",
              transition: "all 0.3s ease",
              textDecoration: "none",
            }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLElement;
              el.style.background = "rgba(255,255,255,0.2)";
              el.style.borderColor = "#FFFFFF";
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLElement;
              el.style.background = "rgba(255,255,255,0.1)";
              el.style.borderColor = "rgba(255,255,255,0.3)";
            }}
          >
            <span>EXPLORE SERVICES</span>
          </Link>
        </div>

      </div>
    </section>
  );
}
