'use client';

import { useState } from 'react';
import { services } from '@/lib/data';
import Link from 'next/link';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export default function ServicesExplorer() {
  const [activeId, setActiveId] = useState(services[0].id);

  const activeService = services.find((s) => s.id === activeId) || services[0];

  return (
    <div className="services-explorer" style={{ marginTop: 40 }}>
      {/* Sidebar Tabs */}
      <div className="services-nav">
        {services.map((s) => (
          <button
            key={s.id}
            type="button"
            className={`service-tab ${activeId === s.id ? 'active' : ''}`}
            onClick={() => setActiveId(s.id)}
          >
            <span className="service-tab-num">{s.n}</span>
            <span className="service-tab-title">{s.title}</span>
          </button>
        ))}
      </div>

      {/* Main Detail Panel */}
      <div className="service-detail-card" style={{ padding: '36px 32px' }}>
        <div className="service-detail-header">
          <span className="eyebrow">{activeService.n} — SERVICE</span>
          <h3 className="service-detail-title" style={{ fontSize: 'clamp(22px, 3vw, 32px)', marginTop: 8 }}>
            {activeService.headline}
          </h3>
        </div>

        <p className="service-detail-desc" style={{ fontSize: 16, lineHeight: 1.6, color: 'var(--muted)', margin: '20px 0 28px' }}>
          {activeService.description}
        </p>

        {/* Core Capabilities Checklist */}
        <div className="service-deliverables">
          <h4 style={{ fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--navy)', marginBottom: 16 }}>
            What We Deliver:
          </h4>
          <div className="deliverables-grid">
            {activeService.services.map((item, idx) => (
              <div key={idx} className="deliverable-item" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <CheckCircle2 size={16} className="accent" />
                <span style={{ fontSize: 14, fontWeight: 500 }}>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer CTA */}
        <div className="service-detail-footer" style={{ marginTop: 36, paddingTop: 24, borderTop: '1px solid var(--line)' }}>
          <Link href="/contact" className="btn-primary btn-sm">
            <span>TALK TO DEEYORA</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}
