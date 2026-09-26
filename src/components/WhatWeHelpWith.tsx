'use client';

import { Compass, Sparkles, TrendingUp, Target, BarChart2 } from 'lucide-react';

const CARDS = [
  {
    icon: Compass,
    title: 'STRATEGY',
    description: 'Find the right position, audience, and direction for your business.',
  },
  {
    icon: Sparkles,
    title: 'CREATIVE',
    description: 'Create content and visual experiences designed to earn attention.',
  },
  {
    icon: TrendingUp,
    title: 'PERFORMANCE',
    description: 'Reach the right audience through focused digital campaigns.',
  },
  {
    icon: Target,
    title: 'CONVERSION',
    description: 'Turn more visitors into meaningful actions and customers.',
  },
  {
    icon: BarChart2,
    title: 'DATA',
    description: 'Understand what is working and make better marketing decisions.',
  },
];

export default function WhatWeHelpWith() {
  return (
    <section className="section" id="what-we-help-with">
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div className="eyebrow">WHAT WE HELP WITH</div>
          <h2 className="section-title" style={{ fontSize: 'clamp(28px, 4vw, 48px)', marginTop: 8 }}>
            BUILDING THE SYSTEM BEHIND BETTER DIGITAL GROWTH.
          </h2>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 20,
            marginTop: 36,
          }}
        >
          {CARDS.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.title}
                className="service-detail-card"
                style={{
                  padding: '30px 24px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 16,
                }}
              >
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    background: 'rgba(139,111,192,0.12)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Icon className="accent" size={22} />
                </div>
                <h3 style={{ fontSize: 16, fontWeight: 700, letterSpacing: '0.05em', color: 'var(--navy)' }}>
                  {card.title}
                </h3>
                <p style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.5 }}>
                  {card.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
