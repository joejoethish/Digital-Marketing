import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ScrollRevealInit from "@/components/ScrollRevealInit";
import CTASection from "@/components/sections/CTASection";
import Process from "@/components/sections/Process";

export const metadata: Metadata = {
  title: "About DEEYORA — Digital Growth. Designed to Perform.",
  description: "DEEYORA is a modern digital marketing studio helping businesses grow online with strategy, creative marketing, technology and AI.",
};

const philosophy = [
  { icon: "🎯", title: "Start with the goal", body: "Every decision traces back to a business outcome, not a preference." },
  { icon: "🔬", title: "Test, then scale", body: "We experiment small before committing budget. Data decides what we amplify." },
  { icon: "🤝", title: "Partner, not vendor", body: "We work as an extension of your team. Your growth is our success metric." },
  { icon: "🤖", title: "AI is a tool, not the answer", body: "AI makes us faster. Strategy and creativity stay human." },
];

const values = [
  { v: "Clarity",       d: "No jargon. No vanity metrics. Just clear goals and real results." },
  { v: "Accountability", d: "We own our work. If something isn't working, we say so and fix it." },
  { v: "Creativity",    d: "Great marketing is creative at its core. We never settle for default." },
  { v: "Speed",         d: "We move fast without cutting corners." },
  { v: "Honesty",       d: "We won't promise what we can't deliver." },
  { v: "Curiosity",     d: "The digital landscape changes. We stay curious and keep learning." },
];

export default function AboutPage() {
  return (
    <>
      <ScrollRevealInit />
      <div style={{ paddingTop: "8rem", background: "var(--bg-primary)" }}>

        {/* Hero section */}
        <div className="container" style={{ paddingBottom: "5rem" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "center" }}>

            <div>
              <p className="section-label reveal">About</p>
              <h1 className="display-lg reveal reveal-delay-1" style={{ marginBottom: "1.25rem" }}>
                A small studio.<br />
                <span className="gradient-text">Serious about growth.</span>
              </h1>
              <p className="body-lg reveal reveal-delay-2" style={{ color: "var(--text-secondary)", marginBottom: "1.25rem" }}>
                DEEYORA helps businesses grow online with smart marketing, creative content, powerful websites and AI.
              </p>
              <p className="body-lg reveal reveal-delay-3" style={{ color: "var(--text-secondary)", marginBottom: "2rem" }}>
                We work best with founders and teams who want marketing that actually moves the numbers.
              </p>
              <Link href="/contact" className="btn btn-primary reveal reveal-delay-4">
                Work With Us <ArrowRight size={15} />
              </Link>
            </div>

            {/* Philosophy card */}
            <div className="reveal reveal-delay-2">
              <div style={{
                background: "var(--bg-surface)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius-lg)",
                padding: "2rem",
              }}>
                <p className="section-label" style={{ marginBottom: "1.5rem" }}>How We Think</p>
                {philosophy.map((p, i) => (
                  <div key={p.title} style={{
                    display: "flex", gap: "1rem",
                    marginBottom: i < philosophy.length - 1 ? "1.25rem" : "0",
                    paddingBottom: i < philosophy.length - 1 ? "1.25rem" : "0",
                    borderBottom: i < philosophy.length - 1 ? "1px solid var(--border)" : "none",
                  }}>
                    <span style={{ fontSize: "1.25rem", flexShrink: 0 }}>{p.icon}</span>
                    <div>
                      <h3 style={{ fontWeight: 600, fontSize: "0.9375rem", marginBottom: "0.2rem" }}>{p.title}</h3>
                      <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>{p.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* Values */}
        <section style={{ background: "var(--bg-surface)", padding: "5rem 0" }}>
          <div className="container">
            <div style={{ textAlign: "center", marginBottom: "3rem" }}>
              <p className="section-label reveal">Values</p>
              <h2 className="display-md reveal reveal-delay-1">What We Stand For</h2>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.25rem" }}>
              {values.map((item, i) => (
                <div key={item.v} className={`card reveal reveal-delay-${(i % 3) + 1}`}>
                  <h3 className="heading-md" style={{ color: "var(--accent)", marginBottom: "0.5rem" }}>{item.v}</h3>
                  <p className="body-sm" style={{ color: "var(--text-secondary)" }}>{item.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Process />
        <CTASection />
      </div>
    </>
  );
}
