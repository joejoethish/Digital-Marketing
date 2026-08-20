"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { blogPosts } from "@/lib/data";
import ScrollRevealInit from "@/components/ScrollRevealInit";
import CTASection from "@/components/sections/CTASection";

const categories = ["All", "Marketing", "SEO", "Performance", "AI", "Branding"];

export default function InsightsPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = activeCategory === "All"
    ? blogPosts
    : blogPosts.filter(p => p.category === activeCategory);

  return (
    <>
      <ScrollRevealInit />
      <div style={{ paddingTop: "8rem", background: "var(--bg-primary)" }}>
        <div className="container" style={{ paddingBottom: "5rem" }}>

          {/* Header */}
          <div style={{ maxWidth: "560px", marginBottom: "3.5rem" }}>
            <p className="section-label reveal">Insights</p>
            <h1 className="display-lg reveal reveal-delay-1" style={{ marginBottom: "1rem" }}>
              Ideas That Help<br />
              <span className="gradient-text">You Grow.</span>
            </h1>
            <p className="body-lg reveal reveal-delay-2" style={{ color: "var(--text-secondary)" }}>
              Practical insights on marketing, technology, AI and business growth.
            </p>
          </div>

          {/* Category filter */}
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "2.75rem" }} className="reveal">
            {categories.map(cat => {
              const isA = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  style={{
                    padding: "0.45rem 1rem", borderRadius: "100px",
                    border: `1.5px solid ${isA ? "var(--accent)" : "var(--border)"}`,
                    background: isA ? "var(--accent)" : "var(--bg-surface)",
                    color: isA ? "#fff" : "var(--text-secondary)",
                    fontSize: "0.875rem", fontWeight: 500, cursor: "pointer",
                    transition: "all 0.2s cubic-bezier(0.22,1,0.36,1)",
                    transform: isA ? "scale(1.03)" : "scale(1)",
                  }}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1.25rem" }}>
            {filtered.map((post, i) => (
              <Link
                key={post.id}
                href={`/insights/${post.slug}`}
                className={`reveal reveal-delay-${i % 3 + 1}`}
                style={{
                  display: "flex", flexDirection: "column",
                  background: "var(--bg-surface)", border: "1px solid var(--border)",
                  borderRadius: "var(--radius-md)", overflow: "hidden",
                  textDecoration: "none",
                  transition: "all 0.3s cubic-bezier(0.22,1,0.36,1)",
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.transform = "translateY(-3px)";
                  el.style.boxShadow = "0 12px 36px rgba(0,0,0,0.08)";
                  el.style.borderColor = "rgba(108,61,255,0.15)";
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.transform = "translateY(0)";
                  el.style.boxShadow = "none";
                  el.style.borderColor = "var(--border)";
                }}
              >
                {/* Card header */}
                <div style={{
                  height: "100px",
                  background: "linear-gradient(135deg, var(--accent-dim) 0%, rgba(168,85,247,0.05) 100%)",
                  display: "flex", alignItems: "flex-end", padding: "1rem 1.25rem",
                  borderBottom: "1px solid var(--border)",
                }}>
                  <span className="pill" style={{ fontSize: "0.6875rem" }}>{post.category}</span>
                </div>

                <div style={{ padding: "1.375rem", flex: 1, display: "flex", flexDirection: "column" }}>
                  <h2 style={{
                    fontFamily: "var(--font-display)", fontWeight: 700,
                    fontSize: "1rem", lineHeight: 1.3, letterSpacing: "-0.01em",
                    color: "var(--text-primary)", marginBottom: "0.625rem",
                  }}>
                    {post.title}
                  </h2>
                  <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)", lineHeight: 1.65, flex: 1 }}>
                    {post.excerpt}
                  </p>
                  <div style={{
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                    marginTop: "1.125rem", paddingTop: "0.875rem", borderTop: "1px solid var(--border)",
                  }}>
                    <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>{post.readTime} · {post.date}</span>
                    <span style={{ fontSize: "0.8125rem", fontWeight: 600, color: "var(--accent)", display: "flex", alignItems: "center", gap: "0.25rem" }}>
                      Read <ArrowRight size={12} />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* More coming soon */}
          <div className="reveal" style={{
            textAlign: "center", marginTop: "3.5rem",
            padding: "2.5rem", border: "1.5px dashed var(--border-strong)",
            borderRadius: "var(--radius-md)",
          }}>
            <p style={{ fontSize: "1.375rem", marginBottom: "0.5rem" }}>✍️</p>
            <h3 className="heading-md" style={{ marginBottom: "0.375rem" }}>More coming soon.</h3>
            <p className="body-sm" style={{ color: "var(--text-secondary)" }}>
              We publish practical marketing insights regularly.
            </p>
          </div>
        </div>
      </div>
      <CTASection />
    </>
  );
}
