'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { navStore, pulseStage } from '@/components/experience/stageStore';

const LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'Work', href: '/work' },
  { label: 'About', href: '/about' },
  { label: 'Insights', href: '/insights' },
  { label: 'Contact', href: '/contact' },
];

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

      <Link href="/contact" className="sh-pill sh-cta">
        Start a project <span aria-hidden="true">→</span>
      </Link>
    </header>
  );
}
