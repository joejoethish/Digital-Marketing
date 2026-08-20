"use client";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";


const footerServices = ["Social Media", "SEO", "Performance Marketing", "Google Ads", "Meta Ads", "Content Marketing", "Brand Strategy", "Website Design & Dev", "AI Marketing"];
const company = [{ label: "About", href: "/about" }, { label: "Work", href: "/work" }, { label: "Insights", href: "/insights" }, { label: "Contact", href: "/contact" }];
const legal = [{ label: "Privacy Policy", href: "/privacy" }, { label: "Terms of Service", href: "/terms" }];

const SocialIcons = [
  {
    label: "X / Twitter", href: "#",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.742l7.742-8.858L1.5 2.25h6.936l4.265 5.641 5.543-5.641zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: "Instagram", href: "#",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: "LinkedIn", href: "#",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer style={{ background: "var(--bg-dark)", color: "var(--text-inverse)", paddingTop: "5rem", paddingBottom: "2rem" }}>
      <div className="container">
        {/* Top CTA Band */}
        <div style={{
          borderRadius: "var(--radius-lg)", border: "1px solid rgba(255,255,255,0.07)",
          background: "var(--bg-dark-surface)", padding: "2.5rem",
          display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "1.75rem",
          marginBottom: "4rem",
        }}>
          <div>
            <p style={{ fontSize: "0.6875rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--accent)", marginBottom: "0.625rem" }}>Ready to grow?</p>
            <h2 className="display-md" style={{ color: "#fff", maxWidth: "420px", lineHeight: 1.1 }}>Digital Growth.<br />Designed to Perform.</h2>
          </div>
          <div style={{ display: "flex", gap: "0.875rem", flexWrap: "wrap" }}>
            <Link href="/contact" className="btn btn-primary">Start a Project <ArrowUpRight size={15} /></Link>
            <Link href="/contact" className="btn btn-outline" style={{ borderColor: "rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.75)" }}>Talk to Us</Link>
          </div>
        </div>

        {/* Main footer grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "3rem", marginBottom: "4rem" }}>
          {/* Brand */}
          <div style={{ gridColumn: "span 2" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1rem" }}>
              <div style={{ width: "26px", height: "26px", background: "var(--accent)", borderRadius: "5px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M2 14L8 2L14 14" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /><path d="M4.5 10H11.5" stroke="white" strokeWidth="2.2" strokeLinecap="round" /></svg>
              </div>
              <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.1rem", letterSpacing: "-0.02em" }}>DEEYORA</span>
            </div>
            <p style={{ color: "rgba(255,255,255,0.38)", fontSize: "0.875rem", lineHeight: 1.65, maxWidth: "240px", marginBottom: "1.5rem" }}>
              Smart strategy. Better creative.<br />Measurable growth.
            </p>
            <div style={{ display: "flex", gap: "0.75rem" }}>
              {SocialIcons.map(s => (
                <a key={s.label} href={s.href} aria-label={s.label} style={{
                  width: "36px", height: "36px", border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center",
                  color: "rgba(255,255,255,0.5)", textDecoration: "none", transition: "all 0.2s ease",
                }}
                  onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "var(--accent)"; el.style.color = "var(--accent)"; }}
                  onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "rgba(255,255,255,0.1)"; el.style.color = "rgba(255,255,255,0.5)"; }}
                >{s.icon}</a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 style={{ fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: "1.25rem" }}>Services</h3>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              {footerServices.slice(0, 6).map(s => (
                <li key={s}>
                  <Link href="/services" style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.875rem", textDecoration: "none", transition: "color 0.2s" }}
                    onMouseEnter={e => (e.target as HTMLElement).style.color = "#fff"}
                    onMouseLeave={e => (e.target as HTMLElement).style.color = "rgba(255,255,255,0.5)"}
                  >{s}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 style={{ fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: "1.25rem" }}>Company</h3>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              {company.map(c => (
                <li key={c.href}>
                  <Link href={c.href} style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.875rem", textDecoration: "none", transition: "color 0.2s" }}
                    onMouseEnter={e => (e.target as HTMLElement).style.color = "#fff"}
                    onMouseLeave={e => (e.target as HTMLElement).style.color = "rgba(255,255,255,0.5)"}
                  >{c.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 style={{ fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: "1.25rem" }}>Contact</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              <a href="mailto:hello@deeyora.com" style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.875rem", textDecoration: "none", transition: "color 0.2s" }}
                onMouseEnter={e => (e.target as HTMLElement).style.color = "var(--accent)"}
                onMouseLeave={e => (e.target as HTMLElement).style.color = "rgba(255,255,255,0.5)"}
              >hello@deeyora.com</a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "1.5rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
          <p style={{ color: "rgba(255,255,255,0.25)", fontSize: "0.8125rem" }}>© 2026 DEEYORA. All rights reserved.</p>
          <div style={{ display: "flex", gap: "1.5rem" }}>
            {legal.map(l => (
              <Link key={l.href} href={l.href} style={{ color: "rgba(255,255,255,0.25)", fontSize: "0.8125rem", textDecoration: "none", transition: "color 0.2s" }}
                onMouseEnter={e => (e.target as HTMLElement).style.color = "rgba(255,255,255,0.6)"}
                onMouseLeave={e => (e.target as HTMLElement).style.color = "rgba(255,255,255,0.25)"}
              >{l.label}</Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
