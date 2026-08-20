import type { Metadata } from "next";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact DEEYORA — Start a Project or Book a Call",
  description: "Tell us where you are. We'll help you figure out what's next. No commitment required.",
};

const steps = [
  { n: "01", t: "We review your message", d: "Every submission is read carefully before we respond." },
  { n: "02", t: "We get in touch", d: "You'll hear from us within 24 hours with initial thoughts." },
  { n: "03", t: "We talk about your goals", d: "A quick call to understand what you need properly." },
  { n: "04", t: "We send a clear proposal", d: "Scope, timeline and investment — no surprises." },
];

export default function ContactPage() {
  return (
    <div style={{ paddingTop: "8rem", paddingBottom: "6rem", background: "var(--bg-primary)", minHeight: "100vh" }}>
      <div className="container">

        {/* Header */}
        <div style={{ maxWidth: "520px", marginBottom: "3.5rem" }}>
          <p className="section-label">Contact</p>
          <h1 className="display-lg" style={{ marginBottom: "1rem" }}>
            Ready to Grow?
          </h1>
          <p className="body-lg" style={{ color: "var(--text-secondary)" }}>
            Tell us where you are. We&apos;ll help you figure out what&apos;s next.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: "4rem", alignItems: "start" }}>

          {/* Form */}
          <ContactForm />

          {/* Sidebar */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>

            {/* What happens next */}
            <div style={{
              background: "var(--bg-surface)", border: "1px solid var(--border)",
              borderRadius: "var(--radius-md)", padding: "1.625rem",
            }}>
              <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1rem", marginBottom: "1.25rem" }}>
                What happens next?
              </h3>
              {steps.map((s, i) => (
                <div key={s.n} style={{
                  display: "flex", gap: "0.875rem",
                  marginBottom: i < steps.length - 1 ? "1rem" : "0",
                  paddingBottom: i < steps.length - 1 ? "1rem" : "0",
                  borderBottom: i < steps.length - 1 ? "1px solid var(--border)" : "none",
                }}>
                  <span style={{
                    fontWeight: 800, fontSize: "0.625rem", letterSpacing: "0.06em",
                    color: "var(--accent)", paddingTop: "3px", minWidth: "20px",
                  }}>{s.n}</span>
                  <div>
                    <p style={{ fontWeight: 600, fontSize: "0.875rem", color: "var(--text-primary)", marginBottom: "2px" }}>{s.t}</p>
                    <p style={{ fontSize: "0.8125rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>{s.d}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Book a call */}
            <div style={{
              background: "var(--accent-dim)", border: "1px solid rgba(108,61,255,0.15)",
              borderRadius: "var(--radius-md)", padding: "1.625rem",
            }}>
              <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1rem", marginBottom: "0.375rem", color: "var(--accent)" }}>
                Book a Strategy Call
              </h3>
              <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)", marginBottom: "1.125rem", lineHeight: 1.6 }}>
                Prefer to talk first? Book a free 30-minute call.
              </p>
              <a
                href="mailto:hello@deeyora.com?subject=Strategy Call Request"
                className="btn btn-primary"
                style={{ display: "flex", justifyContent: "center", fontSize: "0.875rem" }}
              >
                Book a Call →
              </a>
            </div>

            {/* Email */}
            <div style={{
              padding: "1rem", borderRadius: "var(--radius-sm)",
              border: "1px solid var(--border)", background: "var(--bg-surface)",
              textAlign: "center",
            }}>
              <p style={{ fontSize: "0.8125rem", color: "var(--text-muted)" }}>
                Or email us at{" "}
                <a href="mailto:hello@deeyora.com" style={{ color: "var(--accent)", textDecoration: "none", fontWeight: 600 }}>
                  hello@deeyora.com
                </a>
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
