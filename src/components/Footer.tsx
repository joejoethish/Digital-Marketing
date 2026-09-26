import Link from 'next/link';

const NAV_LINKS = [
  ['Home', '/'],
  ['Services', '/services'],
  ['Work', '/work'],
  ['About', '/about'],
];

const LEGAL_LINKS = [
  ['Insights', '/insights'],
  ['Contact', '/contact'],
];

export default function Footer() {
  return (
    <footer className="footer-wrap">
      <div className="container footer">
        {/* Brand column */}
        <div className="footer-brand-col">
          <div className="brand footer-brand">
            <span className="footer-brand-accent">D</span>EEYORA
          </div>
          <p className="footer-tagline">
            Digital Growth.<br />Designed to Perform.
          </p>
          <Link href="/contact" className="footer-cta">
            Start a project →
          </Link>
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

        {/* Company column */}
        <div className="footer-nav-col">
          <div className="footer-col-label">Company</div>
          <nav className="footer-nav" aria-label="Footer company links">
            {LEGAL_LINKS.map(([name, href]) => (
              <Link key={href} href={href} className="footer-link">
                {name}
              </Link>
            ))}
          </nav>
        </div>

        {/* Bottom strip */}
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} DEEYORA. All rights reserved.</span>
          <div className="footer-bottom-right">
            <span className="footer-bottom-link">Privacy Policy</span>
            <span className="footer-bottom-link">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
