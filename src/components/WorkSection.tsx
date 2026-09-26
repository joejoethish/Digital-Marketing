'use client';

import Link from 'next/link';
import { useState } from 'react';
import { conceptProjects, ConceptWorkItem } from '@/lib/data';
import CaseStudyModal from '@/components/ui/CaseStudyModal';
import { Layers, ArrowRight, ShieldCheck } from 'lucide-react';

const FRAMEWORK_STEPS = [
  {
    title: 'THE CHALLENGE',
    desc: 'What the business needed to solve.',
  },
  {
    title: 'THE APPROACH',
    desc: 'How we identified the opportunity.',
  },
  {
    title: 'THE EXECUTION',
    desc: 'What we planned and built.',
  },
  {
    title: 'THE OUTCOME',
    desc: 'What changed and what we learned.',
  },
];

export default function WorkSection() {
  const [activeModalItem, setActiveModalItem] = useState<ConceptWorkItem | null>(null);

  return (
    <section className="section work-section">
      <div className="container">
        {/* Case Study Presentation Framework */}
        <div style={{ marginBottom: 60 }}>
          <div style={{ textAlign: 'center', marginBottom: 32 }}>
            <span className="eyebrow">OUR METHODOLOGY</span>
            <h2 className="section-title" style={{ fontSize: 'clamp(26px, 4vw, 40px)', marginTop: 8 }}>
              HOW WE DOCUMENT OUR WORK
            </h2>
            <p className="section-copy" style={{ fontSize: 16, maxWidth: 640, margin: '12px auto 0 auto' }}>
              Every case study published by DEEYORA follows a strict, transparent 4-part structure focused on real problem-solving and empirical findings.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: 20,
            }}
          >
            {FRAMEWORK_STEPS.map((step, idx) => (
              <div
                key={step.title}
                className="service-detail-card"
                style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 10 }}
              >
                <span className="accent" style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 18, fontWeight: 700 }}>
                  0{idx + 1}
                </span>
                <h3 style={{ fontSize: 15, fontWeight: 700, letterSpacing: '0.05em', color: 'var(--navy)' }}>
                  {step.title}
                </h3>
                <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.5 }}>
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Concept Exploratory Work Grid */}
        <div style={{ marginTop: 60 }}>
          <div className="work-head" style={{ marginBottom: 24 }}>
            <div>
              <div className="eyebrow" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <Layers size={14} className="accent" />
                <span>EXPLORATORY ARCHITECTURE & CONCEPT PROJECTS</span>
              </div>
              <h2 className="section-title" style={{ fontSize: 32, marginTop: 4 }}>
                Concept Studies & Strategic Benchmarks
              </h2>
            </div>
            <div style={{ fontSize: 13, color: 'var(--muted)', display: 'flex', alignItems: 'center', gap: 6 }}>
              <ShieldCheck size={16} className="accent" />
              <span>Transparently labeled as concept exploratory work</span>
            </div>
          </div>

          <div className="work-grid">
            {conceptProjects.map((w) => (
              <article
                key={w.id}
                className="work-card"
                onClick={() => setActiveModalItem(w)}
                data-cursor-label="VIEW"
                tabIndex={0}
                role="button"
                aria-label={`View ${w.title}`}
                onKeyDown={(e) => e.key === 'Enter' && setActiveModalItem(w)}
                style={{ cursor: 'pointer' }}
              >
                <div className="work-image-wrap" style={{ height: 180, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: 20 }}>
                  <div className="badge" style={{ background: 'rgba(139,111,192,0.15)', color: 'var(--accent)', fontWeight: 700, padding: '4px 10px', borderRadius: 4, width: 'fit-content', fontSize: 11 }}>
                    {w.badge}
                  </div>
                  <div style={{ fontSize: 12, color: 'white', opacity: 0.9, fontWeight: 600 }}>
                    {w.category}
                  </div>
                </div>
                <div className="work-body" style={{ padding: 24 }}>
                  <h3 style={{ fontSize: 18, color: 'var(--navy)', marginBottom: 8 }}>{w.title}</h3>
                  <p className="work-card-summary" style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.5, marginBottom: 16 }}>
                    {w.summary}
                  </p>
                  <div className="tags">
                    {w.tags.map((t) => (
                      <span key={t} className="tag-micro">
                        {t}
                      </span>
                    ))}
                  </div>
                  <div style={{ marginTop: 16, display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 600, color: 'var(--accent)' }}>
                    <span>Explore Breakdown</span>
                    <ArrowRight size={14} />
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>

      {/* Case study modal */}
      <CaseStudyModal item={activeModalItem} onClose={() => setActiveModalItem(null)} />
    </section>
  );
}
