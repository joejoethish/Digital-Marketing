"use client";

const pillars = [
  { name: "Strategy", icon: "🎯" },
  { name: "Creative", icon: "✨" },
  { name: "Performance", icon: "📈" },
  { name: "Technology", icon: "💻" },
  { name: "AI", icon: "🤖" },
];

export default function FirstImpression() {
  return (
    <section
      aria-label="First Impression"
      style={{
        padding: "3.5rem 0",
        background: "var(--bg-surface)",
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
        position: "relative",
      }}
    >
      <div className="container">
        <div style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          gap: "1.5rem",
        }}>
          {/* Headline */}
          <h2 className="heading-lg reveal" style={{
            color: "var(--text-primary)",
            letterSpacing: "-0.02em",
            fontWeight: 700,
          }}>
            Marketing That Moves the Numbers.
          </h2>

          {/* Compact visual pill row */}
          <div className="reveal reveal-delay-1" style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.75rem",
            flexWrap: "wrap",
          }}>
            {pillars.map((p, i) => (
              <div
                key={p.name}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  padding: "0.5rem 1.25rem",
                  borderRadius: "100px",
                  background: "var(--bg-primary)",
                  border: "1px solid var(--border)",
                  fontSize: "0.875rem",
                  fontWeight: 600,
                  color: "var(--text-primary)",
                  transition: "all 0.25s cubic-bezier(0.22,1,0.36,1)",
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = "var(--accent)";
                  el.style.transform = "translateY(-2px)";
                  el.style.color = "var(--accent)";
                  el.style.boxShadow = "0 6px 20px var(--accent-dim)";
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = "var(--border)";
                  el.style.transform = "translateY(0)";
                  el.style.color = "var(--text-primary)";
                  el.style.boxShadow = "none";
                }}
              >
                <span>{p.icon}</span>
                <span>{p.name}</span>
                {i < pillars.length - 1 && (
                  <span style={{ marginLeft: "0.5rem", opacity: 0.3, color: "var(--text-muted)" }}>•</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
