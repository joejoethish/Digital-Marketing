import Link from 'next/link';
import WordmarkZoom from './WordmarkZoom';

const NAV_LINKS = [
  ['HOME', '/'],
  ['SERVICES', '/services'],
  ['WORK', '/work'],
  ['ABOUT', '/about'],
  ['INSIGHTS', '/insights'],
  ['CONTACT', '/contact'],
];

const WORDMARK = [...'Deeyora'];

export default function Footer() {
  return (
    <footer className="footer-wrap footer-zoom-wrap">
      <div className="container footer">
        {/* Status indicator bar */}
        <div className="footer-status-bar">
          <div className="status-pill">
            <span className="status-dot-pulse" />
            <span>Digital Growth Studio · India · Working Globally</span>
          </div>
        </div>

        <div className="footer-grid">
          {/* Brand column */}
          <div className="footer-brand-col">
            <Link href="/" className="brand footer-brand">
              <span className="footer-brand-accent">D</span>EEYORA
            </Link>
            <p className="footer-tagline">
              Digital Growth. Designed to Perform.
            </p>
            <p style={{ fontSize: 14, color: 'var(--muted)', marginTop: 8 }}>
              Strategy · Creative · Performance · Technology
            </p>
            <div style={{ marginTop: 16, fontSize: 14 }}>
              <a href="mailto:hello@deeyora.com" className="accent" style={{ textDecoration: 'none', fontWeight: 600 }}>
                hello@deeyora.com
              </a>
            </div>
          </div>

          {/* Navigation column */}
          <div className="footer-nav-col">
            <div className="footer-col-label">Navigation</div>
            <nav className="footer-nav" aria-label="Footer navigation">
              {NAV_LINKS.map(([name, href]) => (
                <Link key={href} href={href} className="footer-link">
                  {name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact & Location column */}
          <div className="footer-nav-col">
            <div className="footer-col-label">Studio</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: 14, color: 'var(--muted)' }}>
              <span>India · Working Globally</span>
              <a href="mailto:hello@deeyora.com" style={{ color: 'var(--navy)', textDecoration: 'none' }}>
                hello@deeyora.com
              </a>
              <Link href="/contact" className="footer-cta" style={{ marginTop: 8 }}>
                Start a project →
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Finale: the wordmark lands from a 400% fish-eye zoom (pinned stage) */}
      <WordmarkZoom>
        <div className="container footer-end">
          {/* Giant wordmark — the "r" floats above the line */}
          <div className="footer-wordmark" role="img" aria-label="Deeyora">
            {WORDMARK.map((ch, i) => (
              <span key={i} aria-hidden="true" className={ch === 'r' ? 'is-lifted' : undefined}>
                {ch}
              </span>
            ))}
          </div>

          {/* Bottom strip */}
          <div className="footer-bottom">
            <span>© {new Date().getFullYear()} DEEYORA. All rights reserved.</span>
            <div className="footer-bottom-right">
              <span>Digital Growth Studio</span>
            </div>
          </div>
        </div>
      </WordmarkZoom>
    </footer>
  );
}
