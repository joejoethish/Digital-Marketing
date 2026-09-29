'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Instagram } from 'lucide-react';
import { navStore, pulseStage } from '@/components/experience/stageStore';
import { CONTACT, whatsappLink } from '@/lib/contact';

const LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'Work', href: '/work' },
  { label: 'About', href: '/about' },
  { label: 'Insights', href: '/insights' },
  { label: 'Contact', href: '/contact' },
];

const wa = whatsappLink('Hi DEEYORA, I’d like to talk about growing my business.');

/** Official WhatsApp mark (lucide has no brand icon for it). */
function WhatsAppGlyph() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
    </svg>
  );
}

const EDGES = [0, 1, 2, 3, 4, 5];
const MAX_TILT = 28; // degrees

/**
 * A 3D coin link (see the .sh-icon block in nav.css): stacked edge discs give
 * it thickness, it sways at rest, spins on hover and tilts toward the mouse.
 */
function SocialCoin({
  href,
  className,
  label,
  tip,
  children,
}: {
  href: string;
  className: string;
  label: string;
  tip: string;
  children: React.ReactNode;
}) {
  const tilt = (e: React.PointerEvent<HTMLAnchorElement>) => {
    if (e.pointerType !== 'mouse') return;
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.setProperty('--ry', `${(x * 2 * MAX_TILT).toFixed(1)}deg`);
    el.style.setProperty('--rx', `${(-y * 2 * MAX_TILT).toFixed(1)}deg`);
  };

  const reset = (e: React.PointerEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.removeProperty('--rx');
    e.currentTarget.style.removeProperty('--ry');
  };

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`sh-icon ${className}`}
      aria-label={label}
      onPointerMove={tilt}
      onPointerLeave={reset}
    >
      <span className="sh-shadow" aria-hidden="true" />
      <span className="sh-tilt" aria-hidden="true">
        <span className="sh-spin">
          <span className="sh-coin">
            {EDGES.map((i) => (
              <span key={i} className="sh-edge" style={{ '--i': i } as React.CSSProperties} />
            ))}
            <span className="sh-face sh-front">{children}</span>
            <span className="sh-face sh-back">{children}</span>
          </span>
        </span>
      </span>
      <span className="sh-tip" aria-hidden="true">
        {tip}
      </span>
    </a>
  );
}

/**
 * Every page is one click away. Hovering a link makes the big WebGL engine on
 * the page preview that page (its layer slides out), and a glass indicator
 * glides to the hovered link.
 */
export default function Navbar() {
  const pathname = usePathname();
  const dockRef = useRef<HTMLElement>(null);
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const [hover, setHover] = useState(-1);
  const [indicator, setIndicator] = useState<{ x: number; w: number } | null>(null);

  const activeIndex = LINKS.findIndex((l) => l.href === pathname);
  const focusIndex = hover >= 0 ? hover : activeIndex;

  const measure = useCallback(() => {
    const el = linkRefs.current[focusIndex];
    setIndicator(el ? { x: el.offsetLeft, w: el.offsetWidth } : null);
  }, [focusIndex]);

  useLayoutEffect(measure, [measure]);

  useEffect(() => {
    window.addEventListener('resize', measure);
    document.fonts?.ready.then(measure);
    return () => window.removeEventListener('resize', measure);
  }, [measure]);

  const enter = (i: number) => {
    setHover(i);
    navStore.setHover(i);
    pulseStage(0.25);
  };

  const leave = () => {
    setHover(-1);
    navStore.setHover(-1);
  };

  // Scroll progress drawn along the bottom edge of the dock.
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      dockRef.current?.style.setProperty('--progress', String(max > 0 ? Math.min(1, window.scrollY / max) : 0));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, [pathname]);

  // Clear any hover preview once the new page is showing.
  useEffect(() => {
    setHover(-1);
    navStore.setHover(-1);
  }, [pathname]);

  return (
    <header className="site-header">
      <Link href="/" className="sh-pill sh-brand" aria-label="DEEYORA home">
        <span className="brand-d">D</span>EEYORA
      </Link>

      <nav ref={dockRef} className="dock" aria-label="Primary" onMouseLeave={leave}>
        {indicator && (
          <span
            className="dock-indicator"
            aria-hidden="true"
            style={{ transform: `translateX(${indicator.x}px)`, width: indicator.w }}
          />
        )}
        {LINKS.map((link, i) => {
          const active = i === activeIndex;
          return (
            <Link
              key={link.href}
              ref={(el) => {
                linkRefs.current[i] = el;
              }}
              href={link.href}
              className={`dock-link ${active ? 'is-active' : ''} ${hover === i ? 'is-hover' : ''}`}
              aria-current={active ? 'page' : undefined}
              onMouseEnter={() => enter(i)}
              onFocus={() => enter(i)}
              onBlur={leave}
              onClick={() => pulseStage(0.9)}
            >
              <span className="dock-label">
                <span className="roll" data-text={link.label}>
                  {link.label}
                </span>
              </span>
            </Link>
          );
        })}
      </nav>

      <div className="sh-end">
        {(wa || CONTACT.instagram) && (
          <div className="sh-pill sh-social">
            {wa && (
              <SocialCoin href={wa} className="sh-wa" label="Chat with us on WhatsApp" tip="Chat on WhatsApp">
                <WhatsAppGlyph />
              </SocialCoin>
            )}
            {CONTACT.instagram && (
              <SocialCoin href={CONTACT.instagram} className="sh-ig" label="DEEYORA on Instagram" tip="Follow on Instagram">
                <Instagram size={19} strokeWidth={2.2} aria-hidden="true" />
              </SocialCoin>
            )}
          </div>
        )}

        <Link href="/contact" className="sh-pill sh-cta">
          Start a project <span aria-hidden="true">→</span>
        </Link>
      </div>
    </header>
  );
}
