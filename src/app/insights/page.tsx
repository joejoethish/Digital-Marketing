import { insights } from '@/lib/data';
import Link from 'next/link';
import { ArrowRight, BookOpen } from 'lucide-react';

export default function Insights() {
  return (
    <div className="container subhero" style={{ paddingBottom: 80 }}>
      {/* Hero */}
      <div className="eyebrow">EDITORIAL INSIGHTS</div>
      <h1 className="hero-headline" style={{ fontSize: 'clamp(36px, 5.5vw, 68px)', margin: '16px 0 20px', lineHeight: 1.1 }}>
        IDEAS FOR <span className="accent">BETTER DIGITAL GROWTH.</span>
      </h1>
      <p className="section-copy" style={{ fontSize: 18, maxWidth: 720, color: 'var(--muted)', lineHeight: 1.6 }}>
        Practical thoughts on strategy, content, performance, websites, and building a stronger online presence.
      </p>

      {/* Editorial Article Grid */}
      <div
        style={{
          marginTop: 60,
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 28,
        }}
      >
        {insights.map((article) => (
          <article
            key={article.n}
            className="service-detail-card"
            style={{
              padding: 36,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              transition: 'transform 0.3s ease, border-color 0.3s ease',
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                <BookOpen size={16} className="accent" />
                <span className="accent" style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 13, fontWeight: 700, letterSpacing: '0.1em' }}>
                  {article.n}
                </span>
              </div>

              <h3 style={{ fontSize: 18, color: 'var(--navy)', lineHeight: 1.4, marginBottom: 12, fontWeight: 700 }}>
                {article.title}
              </h3>

              <p style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.6, marginBottom: 24 }}>
                {article.excerpt}
              </p>
            </div>

            <div style={{ paddingTop: 16, borderTop: '1px solid var(--line)', display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 600, color: 'var(--navy)' }}>
              <span>READ PERSPECTIVE</span>
              <ArrowRight size={14} className="accent" />
            </div>
          </article>
        ))}
      </div>

      {/* Insights Bottom CTA */}
      <div
        className="calculator-card"
        style={{ marginTop: 80, padding: '48px 36px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}
      >
        <div className="eyebrow">APPLY THESE IDEAS</div>
        <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(24px, 3.5vw, 36px)', color: 'var(--navy)' }}>
          WANT TO DISCUSS STRATEGY FOR YOUR BRAND?
        </h2>
        <p className="section-copy" style={{ fontSize: 16, maxWidth: 580 }}>
          Let's map out how these principles apply directly to your business goals.
        </p>
        <Link href="/contact" className="btn-primary" style={{ marginTop: 8 }}>
          <span>START A CONVERSATION</span>
          <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}
