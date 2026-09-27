'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import MagneticElement from '@/components/ui/MagneticElement';

const PILLARS = ['STRATEGY', 'CREATIVE', 'PERFORMANCE', 'CONVERSION', 'DATA'];

export default function Hero() {
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const words = headlineRef.current?.querySelectorAll<HTMLSpanElement>('.hero-word');
    words?.forEach((word, i) => {
      word.style.animationDelay = `${i * 0.08 + 0.2}s`;
      word.classList.add('hero-word-animate');
    });

    const elems = containerRef.current?.querySelectorAll<HTMLElement>('.hero-fadein');
    elems?.forEach((el, i) => {
      el.style.animationDelay = `${i * 0.12 + 0.4}s`;
      el.classList.add('hero-fadein-animate');
    });
  }, []);

  return (
    <section className="journey-section hero-section" id="hero-discover">
      <div className="container hero-layout" ref={containerRef}>
        <div className="hero-content">
          <div className="eyebrow hero-fadein" style={{ letterSpacing: '0.2em', fontWeight: 700 }}>
            DIGITAL GROWTH STUDIO
          </div>

          <h1 ref={headlineRef} className="hero-headline" style={{ fontSize: 'clamp(36px, 5.5vw, 68px)', lineHeight: 1.1, margin: '20px 0' }}>
            <span className="hero-word">TURN YOUR DIGITAL PRESENCE INTO GROWTH.</span>
          </h1>

          <p className="hero-body hero-fadein" style={{ fontSize: '18px', lineHeight: 1.6, maxWidth: '640px', color: 'var(--muted)', marginBottom: '32px' }}>
            We help businesses build a stronger digital presence through strategy, creative content, performance marketing, and conversion-focused digital experiences.
          </p>

          <div className="actions hero-fadein">
            <MagneticElement strength={0.25}>
              <Link
                className="btn-primary btn-primary-hero"
                href="/contact"
                data-cursor-label="Start"
              >
                <span>START A CONVERSATION</span>
                <span className="btn-arrow">→</span>
              </Link>
            </MagneticElement>

            <Link className="btn-secondary" href="/services" data-cursor-label="Services">
              EXPLORE OUR SERVICES →
            </Link>
          </div>
        </div>

        {/* Pillar tags */}
        <div className="hero-pillars">
          {PILLARS.map((p, i) => (
            <div
              key={p}
              className="pillar-tag hero-fadein"
              style={{ '--delay': `${i * 0.1 + 0.6}s` } as React.CSSProperties}
            >
              <span className="pillar-num">0{i + 1}</span>
              <span>{p}</span>
            </div>
          ))}

          {/* Scroll indicator */}
          <div className="scroll-indicator hero-fadein">
            <div className="scroll-line" />
            <span>SCROLL TO EXPLORE</span>
          </div>
        </div>
      </div>
    </section>
  );
}
