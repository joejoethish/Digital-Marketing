'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Compass, Sparkles, TrendingUp, Target, Search, BarChart } from 'lucide-react';

const CAPABILITY_FOCUS = [
  {
    id: 'strategy',
    label: 'Brand Strategy & Positioning',
    icon: Compass,
    recommendation: 'Focus on market positioning, messaging framework, audience research, and digital direction.',
    deliverables: ['Positioning Framework', 'Messaging Direction', 'Audience Research', 'Digital Strategy'],
  },
  {
    id: 'content',
    label: 'Social Media & Content',
    icon: Sparkles,
    recommendation: 'Focus on short-form video systems, brand storytelling, and visual content planning.',
    deliverables: ['Content Strategy', 'Short-Form Video', 'Creative Concepts', 'Content Calendar'],
  },
  {
    id: 'performance',
    label: 'Paid Performance Media',
    icon: TrendingUp,
    recommendation: 'Focus on Meta & Google advertising campaigns, creative testing, and audience targeting.',
    deliverables: ['Meta & Google Ads', 'Campaign Strategy', 'Creative Testing', 'Performance Optimization'],
  },
  {
    id: 'conversion',
    label: 'Website & Conversion (CRO)',
    icon: Target,
    recommendation: 'Focus on high-speed landing pages, UX friction removal, and conversion flow optimization.',
    deliverables: ['Landing Pages', 'UX Optimization', 'Conversion Strategy', 'CTA Design'],
  },
  {
    id: 'seo',
    label: 'SEO & Organic Growth',
    icon: Search,
    recommendation: 'Focus on practical technical SEO, keyword architecture, and high-intent organic content.',
    deliverables: ['Keyword Research', 'Technical SEO', 'On-Page SEO', 'Search Architecture'],
  },
  {
    id: 'analytics',
    label: 'Analytics & Measurement',
    icon: BarChart,
    recommendation: 'Focus on accurate conversion tracking setup, KPI dashboards, and marketing data clarity.',
    deliverables: ['GA4 & Pixel Setup', 'Conversion Tracking', 'KPI Dashboards', 'Performance Insights'],
  },
];

export default function GrowthCalculator() {
  const [selectedId, setSelectedId] = useState('strategy');

  const selectedCapability = CAPABILITY_FOCUS.find((c) => c.id === selectedId) || CAPABILITY_FOCUS[0];
  const Icon = selectedCapability.icon;

  return (
    <div className="calculator-card" style={{ margin: 0, padding: 36 }}>
      <div className="calculator-header" style={{ marginBottom: 28 }}>
        <div className="eyebrow">INTERACTIVE FOCUS EXPLORER</div>
        <h3 className="calculator-title" style={{ fontSize: 28, color: 'var(--navy)', margin: '8px 0' }}>
          Explore Your Strategic Focus
        </h3>
        <p className="calculator-subtitle" style={{ fontSize: 15, color: 'var(--muted)' }}>
          Select your primary digital objective to preview recommended capabilities and deliverables.
        </p>
      </div>

      {/* Selector pills */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 28 }}>
        {CAPABILITY_FOCUS.map((c) => (
          <button
            key={c.id}
            type="button"
            className={`calc-type-btn ${selectedId === c.id ? 'active' : ''}`}
            onClick={() => setSelectedId(c.id)}
            style={{ fontSize: 13, padding: '8px 16px' }}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Result Card */}
      <div
        style={{
          background: 'rgba(255,255,255,0.6)',
          borderRadius: 16,
          border: '1px solid var(--line)',
          padding: 24,
          marginBottom: 28,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 8,
              background: 'rgba(139,111,192,0.12)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Icon className="accent" size={20} />
          </div>
          <h4 style={{ fontSize: 18, color: 'var(--navy)', fontWeight: 700 }}>
            {selectedCapability.label}
          </h4>
        </div>

        <p style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.5, marginBottom: 16 }}>
          {selectedCapability.recommendation}
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {selectedCapability.deliverables.map((d) => (
            <span
              key={d}
              style={{
                fontSize: 12,
                fontWeight: 600,
                color: 'var(--navy)',
                background: 'var(--card-bg)',
                padding: '4px 10px',
                borderRadius: 6,
                border: '1px solid var(--line)',
              }}
            >
              ✓ {d}
            </span>
          ))}
        </div>
      </div>

      {/* Footer CTA */}
      <div className="calc-footer" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
        <span className="calc-footer-note" style={{ fontSize: 13, color: 'var(--muted)' }}>
          Transparent planning aligned with your business goals.
        </span>
        <Link href={`/contact?focus=${selectedId}`} className="btn-primary btn-sm">
          <span>Discuss This Focus</span>
          <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
}
