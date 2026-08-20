"use client";
import { useState, useEffect, useRef } from "react";
import { growthStages } from "@/lib/data";

export default function GrowthSystem() {
  const [activeStageId, setActiveStageId] = useState("brand");
  const sectionRef = useRef<HTMLDivElement>(null);

  const activeStage = growthStages.find(s => s.id === activeStageId) || growthStages[0];
  const activeIndex = growthStages.findIndex(s => s.id === activeStageId);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const sectionHeight = rect.height - window.innerHeight;
      if (sectionHeight <= 0) return;

      const scrolled = -rect.top;
      const progress = Math.min(1, Math.max(0, scrolled / sectionHeight));
      const stageIdx = Math.min(growthStages.length - 1, Math.floor(progress * growthStages.length));
      
      if (growthStages[stageIdx]) {
        setActiveStageId(growthStages[stageIdx].id);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-label="Growth System"
      style={{
        background: "#111113",
        color: "#FFFFFF",
        position: "relative",
        minHeight: "180vh", // Enables pinned scroll storytelling
      }}
    >
      {/* Ambient Violet Radial Pulse */}
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "800px",
            height: "500px",
            background: "radial-gradient(ellipse at center, rgba(109,61,245,0.22) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <div className="grid-bg" style={{ position: "absolute", inset: 0, opacity: 0.12, pointerEvents: "none" }} />

        <div className="container" style={{ position: "relative", zIndex: 2 }}>
          
          {/* Header */}
          <div style={{ maxWidth: "640px", marginBottom: "3rem" }}>
            <p className="section-label" style={{ color: "#A78BFA" }}>
              PINNED SCROLL STORYTELLING
            </p>
            <h2 className="display-lg" style={{ color: "#FFFFFF", marginBottom: "0.75rem" }}>
              The DEEYORA<br />
              <span
                style={{
                  background: "linear-gradient(135deg, #6D3DF5 0%, #A78BFA 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Growth System.
              </span>
            </h2>
            <p className="body-lg" style={{ color: "rgba(255,255,255,0.65)" }}>
              Scroll down to watch attention convert into measurable revenue.
            </p>
          </div>

          {/* Interactive Timeline Journey Bar */}
          <div style={{ position: "relative", marginBottom: "2.5rem" }}>
            {/* Base line */}
            <div style={{
              position: "absolute",
              top: "22px",
              left: "4%",
              right: "4%",
              height: "2px",
              background: "rgba(255,255,255,0.12)",
              zIndex: 1,
            }} />
            {/* Progress line */}
            <div style={{
              position: "absolute",
              top: "22px",
              left: "4%",
              width: `${(activeIndex / (growthStages.length - 1)) * 92}%`,
              height: "3px",
              background: "linear-gradient(90deg, #6D3DF5, #A78BFA)",
              zIndex: 2,
              transition: "width 0.4s cubic-bezier(0.22,1,0.36,1)",
              boxShadow: "0 0 16px rgba(109,61,245,0.8)",
            }} />

            <div style={{ display: "flex", justifyContent: "space-between", position: "relative", zIndex: 3 }}>
              {growthStages.map((stage, idx) => {
                const isActive = stage.id === activeStageId;
                const isPassed = idx <= activeIndex;

                return (
                  <button
                    key={stage.id}
                    onClick={() => setActiveStageId(stage.id)}
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: "0.5rem",
                      padding: "0.25rem 0.5rem",
                    }}
                  >
                    <div
                      style={{
                        width: "44px",
                        height: "44px",
                        borderRadius: "50%",
                        background: isActive ? "#6D3DF5" : isPassed ? "rgba(109,61,245,0.25)" : "rgba(255,255,255,0.06)",
                        border: isActive ? "2px solid #A78BFA" : isPassed ? "2px solid #6D3DF5" : "2px solid rgba(255,255,255,0.15)",
                        color: isActive ? "#FFFFFF" : isPassed ? "#A78BFA" : "rgba(255,255,255,0.4)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontWeight: 800,
                        fontSize: "0.875rem",
                        boxShadow: isActive ? "0 0 24px rgba(109,61,245,0.75)" : "none",
                        transition: "all 0.3s ease",
                      }}
                    >
                      {stage.number}
                    </div>
                    <span
                      style={{
                        fontSize: "0.8125rem",
                        fontWeight: isActive ? 700 : 500,
                        color: isActive ? "#A78BFA" : "rgba(255,255,255,0.5)",
                        transition: "color 0.2s ease",
                      }}
                    >
                      {stage.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Stage Dark Glass Card Showcase */}
          <div
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: "var(--radius-xl)",
              padding: "2.25rem 2.5rem",
              backdropFilter: "blur(16px)",
              boxShadow: "0 24px 64px rgba(0,0,0,0.5)",
              transition: "all 0.35s ease",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.75rem", paddingBottom: "1rem", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.875rem" }}>
                <span style={{ fontSize: "2rem" }}>{activeStage.emoji}</span>
                <div>
                  <span style={{ fontSize: "0.6875rem", fontWeight: 800, color: "#A78BFA", letterSpacing: "0.12em" }}>
                    STAGE {activeStage.number} OF 06
                  </span>
                  <h3 className="heading-lg" style={{ color: "#FFFFFF", margin: 0 }}>
                    {activeStage.label}
                  </h3>
                </div>
              </div>

              <span
                style={{
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  color: "#A78BFA",
                  background: "rgba(109,61,245,0.22)",
                  border: "1px solid rgba(167,139,250,0.35)",
                  padding: "0.3rem 0.875rem",
                  borderRadius: "100px",
                }}
              >
                System Active Node
              </span>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.5rem" }} className="contact-row">
              {/* Goal */}
              <div style={{ background: "rgba(0,0,0,0.35)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "var(--radius-md)", padding: "1.375rem" }}>
                <div style={{ fontSize: "0.6875rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.12em", color: "#A78BFA", marginBottom: "0.5rem" }}>
                  OBJECTIVE
                </div>
                <p style={{ fontWeight: 600, fontSize: "1rem", color: "rgba(255,255,255,0.92)", lineHeight: 1.5, margin: 0 }}>
                  {activeStage.goal}
                </p>
              </div>

              {/* What We Do */}
              <div style={{ background: "rgba(0,0,0,0.35)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "var(--radius-md)", padding: "1.375rem" }}>
                <div style={{ fontSize: "0.6875rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.12em", color: "#A78BFA", marginBottom: "0.5rem" }}>
                  STRATEGY EXECUTION
                </div>
                <p style={{ fontWeight: 600, fontSize: "1rem", color: "rgba(255,255,255,0.92)", lineHeight: 1.5, margin: 0 }}>
                  {activeStage.whatWeDo}
                </p>
              </div>

              {/* Outcome */}
              <div style={{ background: "rgba(0,0,0,0.35)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "var(--radius-md)", padding: "1.375rem" }}>
                <div style={{ fontSize: "0.6875rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.12em", color: "#A78BFA", marginBottom: "0.5rem" }}>
                  SYSTEM OUTCOME
                </div>
                <p style={{ fontWeight: 600, fontSize: "1rem", color: "rgba(255,255,255,0.92)", lineHeight: 1.5, margin: 0 }}>
                  {activeStage.outcome}
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
