'use client';

import Link            from 'next/link';
import { useEffect, useRef } from 'react';
import MagneticElement from '@/components/ui/MagneticElement';

const PILLARS = ['STRATEGY', 'CREATIVE', 'PERFORMANCE', 'TECHNOLOGY'];

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
      el.style.animationDelay = `${i * 0.12 + 0.5}s`;
      el.classList.add('hero-fadein-animate');
    });
  }, []);

  return (
    <section className="journey-section hero-section" id="hero-discover">
      <div className="container hero-layout" ref={containerRef}>
        <div className="hero-content">
          <div className="eyebrow hero-fadein">Digital Growth Studio</div>

          <h1 ref={headlineRef} className="hero-headline">
            {['TURN', 'ATTENTION', 'INTO'].map((w) => (
              <span key={w} className="hero-word">{w}</span>
            ))}
            <br />
            <span className="hero-word hero-accent-word">
              GROWTH<span className="hero-dot">.</span>
            </span>
          </h1>

          <p className="hero-body hero-fadein">
            Digital Growth. Designed to Perform. We build growth systems that
            connect brand, content, performance and technology into measurable
            business results.
          </p>

          <div className="actions hero-fadein">
            <MagneticElement strength={0.2}>
              <Link className="btn-primary btn-primary-hero" href="/contact" data-cursor-label="Let's go">
                <span>START A PROJECT</span>
                <span className="btn-arrow">→</span>
              </Link>
            </MagneticElement>
            <Link className="btn-secondary" href="/work">
              Explore Our Work →
            </Link>
          </div>

          {/* Trust strip */}
          <div className="hero-trust hero-fadein">
            <div className="trust-item">
              <strong>50+</strong>
              <span>Brands Grown</span>
            </div>
            <div className="trust-divider" />
            <div className="trust-item">
              <strong>5+</strong>
              <span>Years</span>
            </div>
            <div className="trust-divider" />
            <div className="trust-item">
              <strong>300%+</strong>
              <span>Avg. Growth</span>
            </div>
          </div>
        </div>

        {/* Pillar tags */}
        <div className="hero-pillars">
          {PILLARS.map((p, i) => (
            <div
              key={p}
              className="pillar-tag hero-fadein"
              style={{ '--delay': `${i * 0.1 + 0.7}s` } as React.CSSProperties}
            >
              <span className="pillar-num">0{i + 1}</span>
              <span>{p}</span>
            </div>
          ))}

          {/* Scroll indicator */}
          <div className="scroll-indicator hero-fadein">
            <div className="scroll-line" />
            <span>SCROLL</span>
          </div>
        </div>
      </div>
    </section>
  );
}
