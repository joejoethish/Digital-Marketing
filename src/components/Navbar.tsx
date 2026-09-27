'use client';

import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import MagneticElement from '@/components/ui/MagneticElement';

const LINKS: [string, string][] = [
  ['HOME',     '/'],
  ['SERVICES', '/services'],
  ['WORK',     '/work'],
  ['ABOUT',    '/about'],
  ['INSIGHTS', '/insights'],
  ['CONTACT',  '/contact'],
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', fn, { passive: true });
    fn();
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className={`nav-wrap ${scrolled ? 'nav-scrolled' : ''}`}>
      <div className="container nav">
        {/* Brand */}
        <Link href="/" className="brand" aria-label="DEEYORA Home">
          <span className="brand-d">D</span>EEYORA
        </Link>

        {/* Desktop nav */}
        <nav className="navlinks" aria-label="Primary">
          {LINKS.map(([name, href]) => (
            <Link
              key={href}
              href={href}
              className={`nav-link ${pathname === href ? 'nav-link-active' : ''}`}
            >
              <span className="nav-link-text">{name}</span>
              <span className="nav-link-line" aria-hidden="true" />
            </Link>
          ))}
        </nav>

        {/* CTA — magnetic on desktop */}
        <MagneticElement strength={0.28}>
          <Link href="/contact" className="nav-cta" data-cursor-label="Start">
            <span>START A PROJECT</span>
            <span className="nav-cta-arrow">→</span>
          </Link>
        </MagneticElement>

        {/* Mobile hamburger */}
        <button
          className="menu"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile drawer */}
      <nav
        className={`mobile-menu ${open ? 'mobile-menu-open' : ''}`}
        aria-label="Mobile navigation"
      >
        <div className="mobile-menu-inner">
          {LINKS.map(([name, href]) => (
            <Link
              key={href}
              href={href}
              className={`mobile-link ${pathname === href ? 'mobile-link-active' : ''}`}
              onClick={() => setOpen(false)}
            >
              {name}
            </Link>
          ))}
          <Link href="/contact" className="btn-primary mobile-cta" onClick={() => setOpen(false)}>
            START A PROJECT →
          </Link>
        </div>
      </nav>
    </header>
  );
}
