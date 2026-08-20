"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X, ArrowRight } from "lucide-react";
import { usePathname } from "next/navigation";

const navLinks = [
  { label: "Home",     href: "/" },
  { label: "Services", href: "/services" },
  { label: "Work",     href: "/work" },
  { label: "About",    href: "/about" },
  { label: "Insights", href: "/insights" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <header
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 900,
          transition: "all 0.4s cubic-bezier(0.4,0,0.2,1)",
          background: scrolled ? "rgba(248,247,244,0.92)" : "transparent",
          backdropFilter: scrolled ? "saturate(180%) blur(20px)" : "none",
          WebkitBackdropFilter: scrolled ? "saturate(180%) blur(20px)" : "none",
          borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
          padding: scrolled ? "0.625rem 0" : "1.375rem 0",
        }}
      >
        <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          {/* ── Logo ── */}
          <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "0.625rem" }}>
            <div style={{
              width: "30px", height: "30px",
              background: "linear-gradient(135deg, #6D3DF5 0%, #A78BFA 100%)",
              borderRadius: "7px",
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 4px 14px rgba(109,61,245,0.32)",
            }}>
              <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
                <path d="M2 14L8 2L14 14" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M4.5 10H11.5" stroke="white" strokeWidth="2.2" strokeLinecap="round" />
              </svg>
            </div>
            <span style={{
              fontFamily: "var(--font-display)", fontWeight: 800,
              fontSize: "1.2rem", color: "var(--text-primary)",
              letterSpacing: "-0.03em",
            }}>
              DEEYORA
            </span>
          </Link>

          {/* ── Desktop Nav ── */}
          <nav className="hide-mobile" aria-label="Main navigation" style={{
            display: "flex", alignItems: "center", gap: "0.125rem",
            background: scrolled ? "transparent" : "rgba(255,255,255,0.72)",
            border: scrolled ? "none" : "1px solid var(--border)",
            borderRadius: "100px",
            padding: scrolled ? "0" : "0.375rem",
            backdropFilter: scrolled ? "none" : "blur(8px)",
            transition: "all 0.4s ease",
          }}>
            {navLinks.map(link => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{
                    position: "relative",
                    padding: "0.5rem 1rem",
                    textDecoration: "none",
                    fontSize: "0.875rem",
                    fontWeight: isActive ? 600 : 500,
                    color: isActive ? "var(--accent)" : "var(--text-secondary)",
                    transition: "color 0.2s ease",
                    borderRadius: "100px",
                    background: isActive ? "rgba(109,61,245,0.08)" : "transparent",
                    border: `1px solid ${isActive ? "rgba(109,61,245,0.18)" : "transparent"}`,
                  }}
                  onMouseEnter={e => {
                    if (!isActive) (e.currentTarget as HTMLElement).style.color = "var(--text-primary)";
                  }}
                  onMouseLeave={e => {
                    if (!isActive) (e.currentTarget as HTMLElement).style.color = "var(--text-secondary)";
                  }}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* ── CTA + Hamburger ── */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.875rem" }}>
            <Link href="/contact" className="btn btn-primary hide-mobile" style={{
              padding: "0.625rem 1.375rem", fontSize: "0.875rem",
            }}>
              Let&apos;s Talk <ArrowRight size={14} />
            </Link>
            <button
              className="show-mobile"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              style={{
                width: "40px", height: "40px",
                background: "var(--bg-surface)",
                border: "1px solid var(--border)",
                borderRadius: "10px",
                display: "flex", alignItems: "center", justifyContent: "center",
                cursor: "pointer", color: "var(--text-primary)",
              }}
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile Menu Overlay ── */}
      <div
        style={{
          position: "fixed", inset: 0, zIndex: 1000,
          background: "var(--bg-dark)",
          display: "flex", flexDirection: "column",
          transform: menuOpen ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.45s cubic-bezier(0.22,1,0.36,1)",
        }}
        aria-hidden={!menuOpen}
      >
        {/* Mobile header */}
        <div style={{
          padding: "1.5rem",
          display: "flex", justifyContent: "space-between", alignItems: "center",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <div style={{
              width: "28px", height: "28px",
              background: "linear-gradient(135deg, #6D3DF5, #A78BFA)",
              borderRadius: "6px", display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M2 14L8 2L14 14" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M4.5 10H11.5" stroke="white" strokeWidth="2.2" strokeLinecap="round" />
              </svg>
            </div>
            <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.2rem", color: "#fff", letterSpacing: "-0.03em" }}>DEEYORA</span>
          </div>
          <button
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
            style={{
              width: "36px", height: "36px",
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "8px",
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", color: "#fff",
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Nav links */}
        <nav style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", padding: "2rem" }}>
          {navLinks.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              style={{
                display: "block",
                fontFamily: "var(--font-display)", fontWeight: 700,
                fontSize: "clamp(2rem, 8vw, 3rem)",
                color: pathname === link.href ? "var(--accent)" : "rgba(255,255,255,0.5)",
                textDecoration: "none",
                padding: "0.625rem 0",
                borderBottom: "1px solid rgba(255,255,255,0.05)",
                transition: "color 0.2s ease",
                animationDelay: `${i * 0.06}s`,
              }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "#fff"}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.color = pathname === link.href ? "var(--accent)" : "rgba(255,255,255,0.5)";
              }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Mobile CTA */}
        <div style={{ padding: "2rem" }}>
          <Link href="/contact" className="btn btn-primary" style={{
            width: "100%", justifyContent: "center",
            padding: "1.125rem", fontSize: "1rem",
          }} onClick={() => setMenuOpen(false)}>
            Let&apos;s Talk <ArrowRight size={16} />
          </Link>
          <p style={{ marginTop: "1.25rem", color: "rgba(255,255,255,0.25)", fontSize: "0.8125rem", textAlign: "center" }}>
            Digital Growth. Designed to Perform.
          </p>
        </div>
      </div>
    </>
  );
}
