"use client";
import { useState } from "react";
import { ArrowRight, CheckCircle } from "lucide-react";

const helpOptions = [
  "Social Media Marketing", "SEO", "Google Ads", "Meta Ads",
  "Website Design & Development", "Brand Strategy", "Content Marketing",
  "AI Marketing & Automation", "Full Digital Marketing", "Not Sure Yet",
];

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "", business: "", email: "", help: "", message: "",
    phone: "", website: "", budget: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    setLoading(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div style={{
        background: "var(--bg-surface)", border: "1px solid var(--border)",
        borderRadius: "var(--radius-lg)", padding: "4rem 2.5rem",
        textAlign: "center", display: "flex", flexDirection: "column",
        alignItems: "center", gap: "1.25rem",
      }}>
        <div style={{
          width: "60px", height: "60px", borderRadius: "50%",
          background: "rgba(34,197,94,0.1)",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <CheckCircle size={28} color="var(--success)" />
        </div>
        <h2 className="display-md">Message Received.</h2>
        <p className="body-lg" style={{ color: "var(--text-secondary)", maxWidth: "360px" }}>
          Thanks for reaching out. We&apos;ll get back to you soon.
        </p>
        <a href="/work" className="btn btn-outline">
          Explore Our Work <ArrowRight size={14} />
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.125rem" }}>

      {/* Name + Business */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
        <div>
          <label style={{ display: "block", fontSize: "0.8125rem", fontWeight: 600, color: "var(--text-secondary)", marginBottom: "0.375rem" }}>
            Name *
          </label>
          <input name="name" required value={form.name} onChange={handleChange} placeholder="Your name" className="input" />
        </div>
        <div>
          <label style={{ display: "block", fontSize: "0.8125rem", fontWeight: 600, color: "var(--text-secondary)", marginBottom: "0.375rem" }}>
            Business Name *
          </label>
          <input name="business" required value={form.business} onChange={handleChange} placeholder="Your business" className="input" />
        </div>
      </div>

      {/* Email */}
      <div>
        <label style={{ display: "block", fontSize: "0.8125rem", fontWeight: 600, color: "var(--text-secondary)", marginBottom: "0.375rem" }}>
          Email *
        </label>
        <input name="email" type="email" required value={form.email} onChange={handleChange} placeholder="you@company.com" className="input" />
      </div>

      {/* What do you need */}
      <div>
        <label style={{ display: "block", fontSize: "0.8125rem", fontWeight: 600, color: "var(--text-secondary)", marginBottom: "0.375rem" }}>
          What do you need help with? *
        </label>
        <select name="help" required value={form.help} onChange={handleChange} className="input" style={{ appearance: "none" }}>
          <option value="">Select...</option>
          {helpOptions.map(o => <option key={o} value={o}>{o}</option>)}
        </select>
      </div>

      {/* Message */}
      <div>
        <label style={{ display: "block", fontSize: "0.8125rem", fontWeight: 600, color: "var(--text-secondary)", marginBottom: "0.375rem" }}>
          Message *
        </label>
        <textarea
          name="message" required value={form.message} onChange={handleChange}
          placeholder="Tell us about your business and what you're trying to achieve."
          rows={4} className="input" style={{ resize: "vertical" }}
        />
      </div>

      {/* Optional fields */}
      <details style={{ fontSize: "0.875rem" }}>
        <summary style={{ cursor: "pointer", color: "var(--text-muted)", fontWeight: 500, marginBottom: "0.75rem", userSelect: "none" }}>
          Optional details (phone, website, budget)
        </summary>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem", paddingTop: "0.5rem" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <div>
              <label style={{ display: "block", fontSize: "0.8125rem", fontWeight: 600, color: "var(--text-secondary)", marginBottom: "0.375rem" }}>Phone</label>
              <input name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="+91 98765 43210" className="input" />
            </div>
            <div>
              <label style={{ display: "block", fontSize: "0.8125rem", fontWeight: 600, color: "var(--text-secondary)", marginBottom: "0.375rem" }}>Website</label>
              <input name="website" type="url" value={form.website} onChange={handleChange} placeholder="https://yoursite.com" className="input" />
            </div>
          </div>
          <div>
            <label style={{ display: "block", fontSize: "0.8125rem", fontWeight: 600, color: "var(--text-secondary)", marginBottom: "0.375rem" }}>Monthly Budget</label>
            <select name="budget" value={form.budget} onChange={handleChange} className="input" style={{ appearance: "none" }}>
              <option value="">Select range...</option>
              {["Under ₹25,000/mo", "₹25,000–₹75,000/mo", "₹75,000–₹2L/mo", "₹2L+/mo", "Let's discuss"].map(b => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
          </div>
        </div>
      </details>

      {/* Submit */}
      <button
        type="submit"
        className="btn btn-primary"
        style={{ padding: "1rem 2rem", fontSize: "1rem", justifyContent: "center" }}
        disabled={loading}
      >
        {loading ? (
          <span style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <span style={{ width: "16px", height: "16px", border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "#fff", borderRadius: "50%", display: "inline-block", animation: "spin-slow 0.7s linear infinite" }} />
            Sending...
          </span>
        ) : (
          <span style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            Send Message <ArrowRight size={16} />
          </span>
        )}
      </button>

      <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", textAlign: "center" }}>
        No commitment required. We&apos;ll respond within 24 hours.
      </p>
    </form>
  );
}
