"use client";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Hero3DCanvas from "./Hero3DCanvas";

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const typographyRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      const progress = Math.min(1, Math.max(0, -rect.top / rect.height));
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      ref={heroRef}
      aria-label="Hero"
      style={{
        minHeight: "100svh",
        position: "relative",
        background: "#F8F7F4",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "7.5rem 0 4rem",
        overflow: "hidden",
      }}
    >
      {/* Background Radial Light */}
      <div className="grid-bg" style={{ position: "absolute", inset: 0, opacity: 0.35, pointerEvents: "none" }} />
      <div
        style={{
          position: "absolute",
          top: "20%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "75vw",
          height: "45vw",
          background: "radial-gradient(ellipse at center, rgba(109,61,245,0.12) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div className="container" style={{ position: "relative", zIndex: 2 }}>
        
        {/* Top Eyebrow */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "2rem" }}>
          <div className="animate-hero-eyebrow" style={{ display: "inline-flex", alignItems: "center", gap: "0.625rem" }}>
            <span style={{
              width: "8px", height: "8px", borderRadius: "50%", background: "#22C55E",
              boxShadow: "0 0 12px rgba(34,197,94,0.8)"
            }} className="animate-pulse-soft" />
            <span style={{ fontSize: "0.6875rem", fontWeight: 800, letterSpacing: "0.16em", textTransform: "uppercase", color: "#6D3DF5" }}>
              3D WEBGL CREATIVE STUDIO
            </span>
          </div>

          <div className="hide-mobile animate-hero-eyebrow" style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <Sparkles size={14} color="#6D3DF5" />
            <span style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--text-secondary)" }}>
              Digital Growth. Designed to Perform.
            </span>
          </div>
        </div>

        {/* ── Kinetic Typography & WebGL 3D Canvas Grid Composition ── */}
        <div
          ref={typographyRef}
          style={{
            position: "relative",
            zIndex: 3,
            transform: `translateY(${scrollProgress * -40}px)`,
            opacity: 1 - scrollProgress * 0.6,
          }}
        >
          <div style={{
            display: "grid",
            gridTemplateColumns: "1.1fr 0.9fr",
            gap: "2.5rem",
            alignItems: "center",
          }} className="contact-row">

            {/* Left Kinetic Editorial Headline */}
            <div>
              <h1
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 900,
                  fontSize: "clamp(3.5rem, 7.5vw, 7rem)",
                  lineHeight: 0.95,
                  letterSpacing: "-0.04em",
                  color: "#111113",
                  margin: 0,
                }}
              >
                <div style={{ overflow: "hidden", display: "inline-block" }}>
                  <span className="hero-word hero-word-1">TURN </span>
                </div>
                <br />
                <div style={{ overflow: "hidden", display: "inline-block" }}>
                  <span
                    className="hero-word hero-word-2"
                    style={{
                      transform: `translateX(${scrollProgress * 25}px)`,
                      transition: "transform 0.1s linear",
                    }}
                  >
                    ATTENTION
                  </span>
                </div>
                <br />
                <div style={{ overflow: "hidden", display: "inline-block" }}>
                  <span className="hero-word hero-word-3" style={{ color: "var(--text-secondary)", fontWeight: 700 }}>
                    INTO{" "}
                  </span>
                </div>
                <div style={{ overflow: "hidden", display: "inline-block" }}>
                  <span
                    className="hero-word hero-word-4 gradient-text-anim"
                    style={{
                      background: "linear-gradient(135deg, #6D3DF5 0%, #A78BFA 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    GROWTH.
                  </span>
                </div>
              </h1>

              {/* Supporting Text */}
              <p
                className="hero-copy"
                style={{
                  marginTop: "1.75rem",
                  fontSize: "clamp(1.0625rem, 1.3vw, 1.25rem)",
                  color: "var(--text-secondary)",
                  maxWidth: "460px",
                  lineHeight: 1.6,
                }}
              >
                We help ambitious brands get seen, attract qualified customers, and scale online revenue with creative 3D strategies and AI-driven growth systems.
              </p>

              {/* Action Buttons */}
              <div className="hero-ctas" style={{ marginTop: "2.25rem", display: "flex", gap: "1rem", flexWrap: "wrap", alignItems: "center" }}>
                <Link
                  href="/contact"
                  className="btn btn-primary"
                  style={{
                    padding: "1.125rem 2.5rem",
                    fontSize: "1.0625rem",
                    boxShadow: "0 10px 30px rgba(109,61,245,0.32)",
                  }}
                  data-cursor="cta"
                >
                  Start a Project <ArrowRight size={18} />
                </Link>
                <Link
                  href="/work"
                  className="btn btn-outline"
                  style={{
                    padding: "1.125rem 2.25rem",
                    fontSize: "1.0625rem",
                    background: "rgba(255,255,255,0.7)",
                    backdropFilter: "blur(8px)",
                  }}
                >
                  Explore Portfolio
                </Link>
              </div>
            </div>

            {/* ── Right Canvas: Real 3D WebGL Growth Core & Orbiting Ecosystem ── */}
            <div style={{ position: "relative" }}>
              <Hero3DCanvas />

              {/* Overlapping Floating Metric Badges */}
              <div
                style={{
                  position: "absolute",
                  top: "0rem",
                  right: "0rem",
                  background: "#FFFFFF",
                  border: "1px solid #E7E5EA",
                  borderRadius: "var(--radius-md)",
                  padding: "0.75rem 1.25rem",
                  boxShadow: "0 20px 48px rgba(0,0,0,0.08)",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.875rem",
                  zIndex: 5,
                  pointerEvents: "none",
                }}
                className="animate-float"
              >
                <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#22C55E" }} />
                <div>
                  <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.125rem", color: "#111113" }}>+140%</div>
                  <div style={{ fontSize: "0.625rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.08em" }}>Organic Reach</div>
                </div>
              </div>

              <div
                style={{
                  position: "absolute",
                  bottom: "0rem",
                  left: "0rem",
                  background: "#FFFFFF",
                  border: "1.5px solid #A78BFA",
                  borderRadius: "var(--radius-md)",
                  padding: "0.875rem 1.375rem",
                  boxShadow: "0 24px 50px rgba(109,61,245,0.14)",
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                  zIndex: 5,
                  pointerEvents: "none",
                }}
                className="animate-float"
              >
                <div style={{
                  width: "36px", height: "36px", borderRadius: "50%",
                  background: "rgba(109,61,245,0.1)", color: "#6D3DF5",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontWeight: 800, fontSize: "0.875rem"
                }}>
                  ⚡
                </div>
                <div>
                  <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.125rem", color: "#6D3DF5" }}>3.8× ROAS</div>
                  <div style={{ fontSize: "0.625rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.08em" }}>Paid Campaign Return</div>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
