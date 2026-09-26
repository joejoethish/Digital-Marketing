'use client';

import Link from 'next/link';
import { ArrowRight, Layers } from 'lucide-react';
import { conceptProjects } from '@/lib/data';

export default function WorkPreviewSection() {
  return (
    <section className="section" id="work-preview">
      <div className="container">
        <div className="calculator-card" style={{ padding: '48px 36px', margin: 0 }}>
          <div style={{ maxWidth: 680 }}>
            <div className="eyebrow">OUR WORK</div>
            <h2 className="section-title" style={{ fontSize: 'clamp(28px, 4vw, 44px)', margin: '12px 0 16px' }}>
              WORK IN PROGRESS.
            </h2>
            <p className="section-copy" style={{ fontSize: 16, lineHeight: 1.6, color: 'var(--muted)', marginBottom: 28 }}>
              We're building DEEYORA through real projects, thoughtful collaboration, and measurable work. As projects launch, this space will document the challenge, approach, execution, and outcome behind each one.
            </p>

            <Link href="/contact" className="btn-primary btn-sm" style={{ display: 'inline-flex' }}>
              <span>START A PROJECT</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          {/* Concept Exploratory Cards */}
          <div style={{ marginTop: 40, paddingTop: 32, borderTop: '1px solid var(--line)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
              <Layers size={16} className="accent" />
              <span style={{ fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600, color: 'var(--navy)' }}>
                Sample Architecture & Concept Studies
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20 }}>
              {conceptProjects.map((item) => (
                <div key={item.id} className="service-detail-card" style={{ padding: 24 }}>
                  <span className="badge" style={{ background: 'rgba(139,111,192,0.12)', color: 'var(--accent)', fontWeight: 700, padding: '4px 8px', borderRadius: 4, fontSize: 11 }}>
                    {item.badge}
                  </span>
                  <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--navy)', margin: '12px 0 8px' }}>
                    {item.title}
                  </h3>
                  <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.5 }}>
                    {item.summary}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
