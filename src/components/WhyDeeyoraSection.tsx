'use client';

import { ShieldCheck, Eye, Sparkles, LineChart } from 'lucide-react';

const PRINCIPLES = [
  {
    icon: ShieldCheck,
    title: 'CLEAR STRATEGY',
    description: 'Start with the problem before choosing the channel.',
  },
  {
    icon: Eye,
    title: 'TRANSPARENT COMMUNICATION',
    description: "Know what we're doing, why we're doing it, and what we're measuring.",
  },
  {
    icon: Sparkles,
    title: 'PURPOSEFUL CREATIVE',
    description: 'Creative should not only look good. It should have a reason behind it.',
  },
  {
    icon: LineChart,
    title: 'MEASURABLE WORK',
    description: 'Focus on meaningful business outcomes rather than vanity metrics.',
  },
];

export default function WhyDeeyoraSection() {
  return (
    <section className="section" id="why-deeyora">
      <div className="container">
        <div style={{ maxWidth: 760, margin: '0 auto 48px auto', textAlign: 'center' }}>
          <div className="eyebrow">WHY DEEYORA</div>
          <h2 className="section-title" style={{ fontSize: 'clamp(28px, 4vw, 48px)', margin: '12px 0 20px' }}>
            A SMALL STUDIO. A SERIOUS APPROACH.
          </h2>
          <p className="section-copy" style={{ fontSize: 17, lineHeight: 1.6, color: 'var(--muted)' }}>
            Your marketing should be clear, purposeful, and measurable. We focus on understanding the business first, communicating clearly, executing carefully, and using real performance data to guide the next decision.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: 24,
          }}
        >
          {PRINCIPLES.map((p) => {
            const Icon = p.icon;
            return (
              <div
                key={p.title}
                className="service-detail-card"
                style={{ padding: '32px 24px', display: 'flex', flexDirection: 'column', gap: 16 }}
              >
                <Icon className="accent" size={26} />
                <h3 style={{ fontSize: 16, fontWeight: 700, letterSpacing: '0.05em', color: 'var(--navy)' }}>
                  {p.title}
                </h3>
                <p style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.5 }}>
                  {p.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
