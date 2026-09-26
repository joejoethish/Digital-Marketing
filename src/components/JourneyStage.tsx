'use client';

import { useEffect, useRef } from 'react';

interface JourneyStageProps {
  number: string;
  total: string;
  label: string;
  title: string;
  description: string;
}

export default function JourneyStage({
  number,
  total,
  label,
  title,
  description,
}: JourneyStageProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('stage-visible');
          observer.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="journey-section stage-section"
      id={`stage-${label.toLowerCase()}`}
    >
      {/* Vertical progress line */}
      <div className="stage-vline" aria-hidden="true" />

      <div className="container stage-content">
        {/* Counter */}
        <div className="stage-indicator">
          <span className="stage-number">{number}</span>
          <span className="stage-divider">/</span>
          <span className="stage-total">{total}</span>
        </div>

        {/* Label pill */}
        <div className="stage-label-wrap">
          <span className="stage-label">{label}</span>
        </div>

        {/* Headline */}
        <h2 className="stage-title">{title}</h2>

        {/* Description */}
        <p className="stage-description">{description}</p>

        {/* Decorative number */}
        <div className="stage-bg-number" aria-hidden="true">{number}</div>
      </div>
    </section>
  );
}
