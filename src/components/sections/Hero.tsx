"use client";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const nodes = [
  { id: "brand",     label: "BRAND",     x: 10, y: 30, color: "#6D3DF5" },
  { id: "content",   label: "CONTENT",   x: 32, y: 15, color: "#A78BFA" },
  { id: "seo",       label: "SEO",       x: 62, y: 18, color: "#6D3DF5" },
  { id: "social",    label: "SOCIAL",    x: 88, y: 30, color: "#A78BFA" },
  { id: "ads",       label: "ADS",       x: 88, y: 70, color: "#6D3DF5" },
  { id: "ai",        label: "AI",        x: 62, y: 85, color: "#5426D9" },
  { id: "analytics", label: "ANALYTICS",x: 32, y: 82, color: "#A78BFA" },
  { id: "leads",     label: "LEADS",     x: 10, y: 68, color: "#6D3DF5" },
  { id: "growth",    label: "GROWTH",    x: 48, y: 48, color: "#6D3DF5" },
];

const connections = [
  ["brand", "content"],
  ["content", "seo"],
  ["seo", "social"],
  ["social", "ads"],
  ["ads", "ai"],
  ["ai", "analytics"],
  ["analytics", "leads"],
  ["leads", "growth"],
  ["growth", "brand"],
  ["brand", "seo"],
  ["content", "growth"],
  ["ads", "leads"],
];

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const networkRef = useRef<HTMLDivElement>(null);
  const typographyRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });

  const [mounted, setMounted] = useState(false);
  const [activeNode, setActiveNode] = useState<string | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    setMounted(true);

    const handleMouseMove = (e: MouseEvent) => {
      if (window.innerWidth < 1024) return;
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      mouseRef.current = { x, y };

      if (networkRef.current) {
        const transX = (x - 0.5) * 24;
        const transY = (y - 0.5) * 24;
        networkRef.current.style.transform = `translate3d(${transX}px, ${transY}px, 0)`;
      }

      if (typographyRef.current) {
        const transX = (x - 0.5) * -12;
        const transY = (y - 0.5) * -8;
        typographyRef.current.style.transform = `translate3d(${transX}px, ${transY}px, 0)`;
      }
    };

    const handleScroll = () => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      const progress = Math.min(1, Math.max(0, -rect.top / rect.height));
      setScrollProgress(progress);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const pos = (node: typeof nodes[0], W: number, H: number) => {
    const mx = mounted ? (mouseRef.current.x - 0.5) * 16 : 0;
    const my = mounted ? (mouseRef.current.y - 0.5) * 16 : 0;
    return { cx: (node.x / 100) * W + mx, cy: (node.y / 100) * H + my };
  };

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
      {/* Dynamic Background Grid & Radial Violet Light */}
      <div className="grid-bg" style={{ position: "absolute", inset: 0, opacity: 0.35, pointerEvents: "none" }} />
      <div
        style={{
          position: "absolute",
          top: "15%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "70vw",
          height: "40vw",
          background: "radial-gradient(ellipse at center, rgba(109,61,245,0.09) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div className="container" style={{ position: "relative", zIndex: 2 }}>
        
        {/* Top Eyebrow Pill */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "2rem" }}>
          <div className="animate-hero-eyebrow" style={{ display: "inline-flex", alignItems: "center", gap: "0.625rem" }}>
            <span style={{
              width: "8px", height: "8px", borderRadius: "50%", background: "#22C55E",
              boxShadow: "0 0 10px rgba(34,197,94,0.8)"
            }} className="animate-pulse-soft" />
            <span style={{ fontSize: "0.6875rem", fontWeight: 800, letterSpacing: "0.16em", textTransform: "uppercase", color: "#6D3DF5" }}>
              DIGITAL GROWTH STUDIO
            </span>
          </div>

          <div className="hide-mobile animate-hero-eyebrow" style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <Sparkles size={14} color="#6D3DF5" />
            <span style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--text-secondary)" }}>
              Digital Growth. Designed to Perform.
            </span>
          </div>
        </div>

        {/* ── Oversized Kinetic Typography Composition ── */}
        <div
          ref={typographyRef}
          style={{
            position: "relative",
            zIndex: 3,
            transition: "transform 0.2s cubic-bezier(0.2, 0, 0, 1)",
            transform: `translateY(${scrollProgress * -40}px)`,
            opacity: 1 - scrollProgress * 0.6,
          }}
        >
          <div style={{
            display: "grid",
            gridTemplateColumns: "1.1fr 0.9fr",
            gap: "2.5rem",
            alignItems: "center",
          }}>

            {/* Left kinetic headline words */}
            <div>
              <h1
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 900,
                  fontSize: "clamp(3.5rem, 8vw, 7.25rem)",
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
                We help ambitious brands get seen, attract qualified customers, and scale online revenue with creative digital strategies.
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

            {/* ── Right Canvas: Layered Digital Growth Network (No rigid card border) ── */}
            <div
              ref={networkRef}
              className="hide-mobile hero-visual-entrance"
              style={{
                position: "relative",
                height: "460px",
                transition: "transform 0.2s ease-out",
              }}
            >
              {/* Floating SVG Connections & Nodes Canvas */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "rgba(255,255,255,0.75)",
                  backdropFilter: "blur(16px)",
                  border: "1px solid rgba(231,229,234,0.8)",
                  borderRadius: "var(--radius-xl)",
                  padding: "1.5rem",
                  boxShadow: "0 28px 70px rgba(109,61,245,0.08), 0 4px 16px rgba(0,0,0,0.03)",
                  overflow: "hidden",
                }}
              >
                {/* Header Status Bar inside visual */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#6D3DF5" }} />
                    <span style={{ fontSize: "0.625rem", fontWeight: 800, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--text-muted)" }}>
                      LIVE ECOSYSTEM MAP
                    </span>
                  </div>
                  <span style={{
                    fontSize: "0.625rem",
                    fontWeight: 700,
                    color: "#6D3DF5",
                    background: "rgba(109,61,245,0.08)",
                    border: "1px solid rgba(109,61,245,0.18)",
                    padding: "0.2rem 0.6rem",
                    borderRadius: "100px",
                  }}>
                    {activeNode ? `ACTIVE: ${activeNode.toUpperCase()}` : "HOVER NODES"}
                  </span>
                </div>

                {/* SVG Connections & Particle Stream */}
                <svg viewBox="0 0 480 340" style={{ width: "100%", height: "300px" }} aria-hidden="true">
                  <defs>
                    <filter id="glow-node">
                      <feGaussianBlur stdDeviation="3" result="blur" />
                      <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                    </filter>
                  </defs>

                  {/* Lines */}
                  {connections.map(([a, b], i) => {
                    const na = nodes.find(n => n.id === a)!;
                    const nb = nodes.find(n => n.id === b)!;
                    const pA = pos(na, 480, 340);
                    const pB = pos(nb, 480, 340);
                    const isHighlighted = activeNode === a || activeNode === b;

                    return (
                      <line
                        key={i}
                        x1={pA.cx} y1={pA.cy} x2={pB.cx} y2={pB.cy}
                        stroke={isHighlighted ? "#6D3DF5" : "rgba(109,61,245,0.14)"}
                        strokeWidth={isHighlighted ? "2.2" : "1.2"}
                        strokeDasharray={isHighlighted ? "none" : "4 6"}
                        style={{ transition: "stroke 0.3s ease, stroke-width 0.3s ease" }}
                      />
                    );
                  })}

                  {/* Traveling Pulses */}
                  {mounted && connections.map(([a, b], i) => {
                    const na = nodes.find(n => n.id === a)!;
                    const nb = nodes.find(n => n.id === b)!;
                    const pA = pos(na, 480, 340);
                    const pB = pos(nb, 480, 340);
                    const t = ((Date.now() / 2400 + i * 0.15) % 1);

                    return (
                      <circle
                        key={`pulse-${i}`}
                        cx={pA.cx + (pB.cx - pA.cx) * t}
                        cy={pA.cy + (pB.cy - pA.cy) * t}
                        r="3.5"
                        fill="#6D3DF5"
                        filter="url(#glow-node)"
                        opacity="0.85"
                      />
                    );
                  })}

                  {/* Interactive Nodes */}
                  {nodes.map(node => {
                    const p = mounted ? pos(node, 480, 340) : { cx: (node.x / 100) * 480, cy: (node.y / 100) * 340 };
                    const isCurrent = activeNode === node.id;

                    return (
                      <g
                        key={node.id}
                        transform={`translate(${p.cx},${p.cy})`}
                        onMouseEnter={() => setActiveNode(node.id)}
                        onMouseLeave={() => setActiveNode(null)}
                        style={{ cursor: "pointer" }}
                      >
                        <circle r={isCurrent ? "26" : "20"} fill={node.color} opacity={isCurrent ? "0.22" : "0.08"} style={{ transition: "all 0.3s ease" }} />
                        <circle r={isCurrent ? "14" : "10"} fill={node.color} opacity="0.3" style={{ transition: "all 0.3s ease" }} />
                        <circle r="6" fill={node.color} filter="url(#glow-node)" />
                        
                        <text y="24" textAnchor="middle" fill={isCurrent ? "#111113" : "#66666F"} fontSize="9" fontFamily="Inter,sans-serif" fontWeight="800" letterSpacing="0.06em">
                          {node.label}
                        </text>
                      </g>
                    );
                  })}
                </svg>

                {/* Pipeline Flow Banner */}
                <div style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  background: "#F8F7F4",
                  border: "1px solid var(--border)",
                  borderRadius: "var(--radius-sm)",
                  padding: "0.5rem 0.875rem",
                }}>
                  <span style={{ fontSize: "0.625rem", fontWeight: 800, color: "var(--text-muted)", letterSpacing: "0.1em" }}>ECOSYSTEM PATH:</span>
                  <span style={{ fontSize: "0.6875rem", fontWeight: 700, color: "#6D3DF5", letterSpacing: "0.04em" }}>
                    Brand → Content → SEO → Ads → Leads → Scale
                  </span>
                </div>
              </div>

              {/* Layered Floating Metric Pill 1 (Top Right) */}
              <div
                style={{
                  position: "absolute",
                  top: "-1.25rem",
                  right: "-1.25rem",
                  background: "#FFFFFF",
                  border: "1px solid #E7E5EA",
                  borderRadius: "var(--radius-md)",
                  padding: "0.75rem 1.25rem",
                  boxShadow: "0 20px 48px rgba(0,0,0,0.08)",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.875rem",
                  zIndex: 5,
                }}
                className="animate-float"
              >
                <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#22C55E" }} />
                <div>
                  <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.125rem", color: "#111113" }}>+140%</div>
                  <div style={{ fontSize: "0.625rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.08em" }}>Organic Reach</div>
                </div>
              </div>

              {/* Layered Floating Metric Pill 2 (Bottom Left) */}
              <div
                style={{
                  position: "absolute",
                  bottom: "-1.5rem",
                  left: "-1.5rem",
                  background: "#FFFFFF",
                  border: "1.5px solid #A78BFA",
                  borderRadius: "var(--radius-md)",
                  padding: "0.875rem 1.375rem",
                  boxShadow: "0 24px 50px rgba(109,61,245,0.14)",
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                  zIndex: 5,
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
