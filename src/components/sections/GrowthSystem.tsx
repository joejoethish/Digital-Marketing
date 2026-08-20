"use client";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { growthStages } from "@/lib/data";
import GrowthSystem3DCanvas from "./GrowthSystem3DCanvas";

export default function GrowthSystem() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStage, setActiveStage] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      const totalScrollable = rect.height - windowHeight;
      if (totalScrollable <= 0) return;

      const currentProgress = Math.max(0, Math.min(1, -rect.top / totalScrollable));
      const stageIndex = Math.min(
        growthStages.length - 1,
        Math.floor(currentProgress * growthStages.length)
      );

      setActiveStage(stageIndex);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const currentData = growthStages[activeStage] || growthStages[0];

  return (
    <section
      ref={containerRef}
      id="growth-system"
      aria-label="Growth System Storytelling"
      style={{
        position: "relative",
        background: "#111113",
        color: "#FFFFFF",
        minHeight: "300vh",
      }}
    >
      {/* Pinned Sticky Viewport Container */}
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          display: "flex",
          alignItems: "center",
          overflow: "hidden",
          padding: "4rem 0",
        }}
      >
        {/* Background Ambient Radial Light */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "60vw",
            height: "60vw",
            background: "radial-gradient(circle, rgba(109,61,245,0.18) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        <div className="container" style={{ position: "relative", zIndex: 2 }}>
          
          {/* Header */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "3rem" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
              <Sparkles size={16} color="#A78BFA" />
              <span style={{ fontSize: "0.75rem", fontWeight: 800, letterSpacing: "0.16em", textTransform: "uppercase", color: "#A78BFA" }}>
                3D SCROLL STORYTELLING
              </span>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <span style={{ fontSize: "0.875rem", fontWeight: 700, color: "rgba(255,255,255,0.5)" }}>STAGE</span>
              <span style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "1.5rem", color: "#6D3DF5" }}>
                {String(activeStage + 1).padStart(2, "0")} / {String(growthStages.length).padStart(2, "0")}
              </span>
            </div>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "4rem",
              alignItems: "center",
            }}
            className="contact-row"
          >
            {/* Left Content Side */}
            <div>
              <div style={{ marginBottom: "1.5rem" }}>
                <span
                  style={{
                    fontSize: "0.8125rem",
                    fontWeight: 800,
                    letterSpacing: "0.12em",
                    color: "#A78BFA",
                    textTransform: "uppercase",
                  }}
                >
                  STAGE {currentData.number} — {currentData.label}
                </span>
                <h2
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 900,
                    fontSize: "clamp(2.5rem, 4.5vw, 4rem)",
                    lineHeight: 1.05,
                    color: "#FFFFFF",
                    letterSpacing: "-0.03em",
                    margin: "0.5rem 0 1.25rem 0",
                  }}
                >
                  {currentData.goal}
                </h2>
                <p style={{ fontSize: "1.125rem", color: "rgba(255,255,255,0.7)", lineHeight: 1.6, maxWidth: "520px" }}>
                  {currentData.whatWeDo}
                </p>
              </div>

              {/* Execution Points */}
              <div style={{ margin: "2rem 0", display: "flex", flexDirection: "column", gap: "0.875rem" }}>
                {currentData.tools.map((item: string, idx: number) => (
                  <div key={idx} style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                    <CheckCircle2 size={18} color="#6D3DF5" />
                    <span style={{ fontSize: "0.9375rem", color: "rgba(255,255,255,0.9)", fontWeight: 600 }}>
                      {item}
                    </span>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: "2.5rem" }}>
                <Link
                  href="/contact"
                  className="btn btn-primary"
                  style={{ padding: "1rem 2rem", fontSize: "1rem" }}
                  data-cursor="cta"
                >
                  Deploy This System <ArrowRight size={18} />
                </Link>
              </div>
            </div>

            {/* Right Side: Interactive 3D WebGL Morphing Stage Canvas */}
            <div
              style={{
                background: "rgba(255, 255, 255, 0.03)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                borderRadius: "var(--radius-lg)",
                padding: "2rem",
                boxShadow: "0 30px 80px rgba(0,0,0,0.5)",
                backdropFilter: "blur(16px)",
                position: "relative",
              }}
            >
              {/* 3D WebGL Canvas for Pinned Stages */}
              <GrowthSystem3DCanvas activeStageIndex={activeStage} />

              <div
                style={{
                  marginTop: "1.5rem",
                  paddingTop: "1.25rem",
                  borderTop: "1px solid rgba(255,255,255,0.08)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <div style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                    EXPECTED OUTCOME
                  </div>
                  <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.125rem", color: "#22C55E", marginTop: "0.25rem" }}>
                    {currentData.outcome}
                  </div>
                </div>

                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                    STRATEGY FOCUS
                  </div>
                  <div style={{ fontWeight: 700, fontSize: "0.875rem", color: "#A78BFA", marginTop: "0.25rem" }}>
                    {currentData.whatWeDo}
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Bottom Progress Bar Line */}
          <div style={{ marginTop: "4rem", width: "100%", height: "4px", background: "rgba(255,255,255,0.1)", borderRadius: "2px" }}>
            <div
              style={{
                height: "100%",
                background: "linear-gradient(90deg, #6D3DF5 0%, #A78BFA 100%)",
                width: `${((activeStage + 1) / growthStages.length) * 100}%`,
                transition: "width 0.3s ease-out",
                borderRadius: "2px",
              }}
            />
          </div>

        </div>
      </div>
    </section>
  );
}
