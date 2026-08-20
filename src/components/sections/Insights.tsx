"use client";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { blogPosts } from "@/lib/data";

export default function Insights() {
  return (
    <section aria-label="Insights" className="section-pad" style={{ background: "var(--bg-surface)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
      <div className="container">
        
        {/* Header */}
        <div style={{ maxWidth: "560px", marginBottom: "3.5rem" }}>
          <p className="section-label reveal">Studio Perspectives</p>
          <h2 className="display-lg reveal reveal-delay-1" style={{ marginBottom: "1rem" }}>
            Ideas That<br />
            <span className="gradient-text">Help You Grow.</span>
          </h2>
        </div>

        {/* 3 Featured Articles Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "1.25rem",
        }} className="contact-row">
          {blogPosts.slice(0, 3).map((post, idx) => (
            <Link
              key={post.id}
              href={`/insights/${post.slug}`}
              className={`reveal reveal-delay-${idx + 1}`}
              style={{
                display: "flex",
                flexDirection: "column",
                background: "var(--bg-primary)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius-lg)",
                overflow: "hidden",
                textDecoration: "none",
                transition: "all 0.3s cubic-bezier(0.22,1,0.36,1)",
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.transform = "translateY(-4px)";
                el.style.boxShadow = "0 20px 48px rgba(0,0,0,0.07)";
                el.style.borderColor = "var(--accent)";
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.transform = "translateY(0)";
                el.style.boxShadow = "none";
                el.style.borderColor = "var(--border)";
              }}
            >
              {/* Editorial Header Banner */}
              <div style={{
                height: "110px",
                background: "linear-gradient(135deg, var(--accent-dim) 0%, rgba(168,85,247,0.06) 100%)",
                display: "flex",
                alignItems: "flex-end",
                padding: "1rem 1.25rem",
                borderBottom: "1px solid var(--border)",
              }}>
                <span className="pill" style={{ fontSize: "0.6875rem" }}>
                  {post.category}
                </span>
              </div>

              {/* Card Body */}
              <div style={{ padding: "1.5rem", flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <div>
                  <h3 style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 700,
                    fontSize: "1.125rem",
                    lineHeight: 1.35,
                    color: "var(--text-primary)",
                    marginBottom: "0.5rem",
                  }}>
                    {post.title}
                  </h3>

                  <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                    {post.excerpt}
                  </p>
                </div>

                {/* Footer Meta */}
                <div style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: "1.5rem",
                  paddingTop: "0.875rem",
                  borderTop: "1px solid var(--border)",
                }}>
                  <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontWeight: 500 }}>
                    {post.readTime}
                  </span>

                  <span style={{ fontSize: "0.8125rem", fontWeight: 600, color: "var(--accent)", display: "flex", alignItems: "center", gap: "0.25rem" }}>
                    Read Article <ArrowRight size={13} />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View All Insights Link */}
        <div style={{ textAlign: "center", marginTop: "3rem" }} className="reveal">
          <Link href="/insights" className="btn btn-outline" style={{ padding: "0.875rem 2rem" }}>
            Explore All Insights →
          </Link>
        </div>

      </div>
    </section>
  );
}
