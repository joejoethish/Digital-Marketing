'use client';

import { ShieldCheck, MessageSquare, Target } from 'lucide-react';

const VALUES = [
  {
    icon: Target,
    title: 'SERIOUS APPROACH',
    desc: 'Focusing on understanding your business goals and market position before recommending tactics.',
  },
  {
    icon: MessageSquare,
    title: 'TRANSPARENT COMMUNICATION',
    desc: 'Clear expectations, regular updates, and honest reporting on what the data shows.',
  },
  {
    icon: ShieldCheck,
    title: 'PROFESSIONAL EXECUTION',
    desc: 'Thoughtful strategy, quality creative, and careful campaign optimization.',
  },
];

export default function TestimonialsSection() {
  return (
    <section className="testimonials-section" id="studio-commitment">
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <span className="eyebrow">THE DEEYORA STANDARD</span>
          <h2 className="section-title" style={{ fontSize: 'clamp(26px, 3.5vw, 40px)', marginTop: 8 }}>
            OUR STUDIO COMMITMENT
          </h2>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: 20,
          }}
        >
          {VALUES.map((val) => {
            const Icon = val.icon;
            return (
              <div key={val.title} className="testimonial-card" style={{ padding: 28, margin: 0 }}>
                <Icon size={28} className="accent" style={{ marginBottom: 12 }} />
                <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--navy)', marginBottom: 8 }}>
                  {val.title}
                </h3>
                <p style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.5 }}>
                  {val.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
