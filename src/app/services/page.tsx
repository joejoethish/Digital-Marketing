import ServicesExplorer from '@/components/ServicesExplorer';
import Link from 'next/link';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { services } from '@/lib/data';

export default function ServicesPage() {
  return (
    <>
      <div className="container subhero" style={{ paddingBottom: 40 }}>
        <div className="eyebrow">OUR SERVICES</div>
        <h1 className="hero-headline" style={{ fontSize: 'clamp(36px, 5.5vw, 68px)', margin: '16px 0 20px', lineHeight: 1.1 }}>
          DIGITAL GROWTH, <span className="accent">BUILT AROUND YOUR BUSINESS.</span>
        </h1>
        <p className="section-copy" style={{ fontSize: 18, maxWidth: 740, color: 'var(--muted)', lineHeight: 1.6 }}>
          Not every business needs every marketing channel. We identify what matters most for your goals and build the right combination of strategy, creative, performance, digital experience, and data.
        </p>

        {/* Interactive Explorer for Desktop & Mobile */}
        <ServicesExplorer />

        {/* Full Detailed Grid of All 6 Services */}
        <div style={{ marginTop: 80 }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div className="eyebrow">COMPLETE CAPABILITIES OVERVIEW</div>
            <h2 className="section-title" style={{ fontSize: 36, marginTop: 8 }}>
              6 Core Pillars of Growth
            </h2>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: 24,
            }}
          >
            {services.map((service) => (
              <div
                key={service.id}
                className="service-detail-card"
                style={{ padding: 32, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                    <span className="accent" style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 24, fontWeight: 700 }}>
                      {service.n}
                    </span>
                    <span className="badge" style={{ background: 'rgba(139,111,192,0.12)', color: 'var(--navy)', fontWeight: 600, padding: '4px 10px', borderRadius: 4, fontSize: 11 }}>
                      {service.title}
                    </span>
                  </div>

                  <h3 style={{ fontSize: 20, color: 'var(--navy)', marginBottom: 10, lineHeight: 1.3 }}>
                    {service.headline}
                  </h3>

                  <p style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.6, marginBottom: 20 }}>
                    {service.description}
                  </p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {service.services.map((item, idx) => (
                      <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'var(--navy)' }}>
                        <CheckCircle2 size={14} className="accent" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ marginTop: 24, paddingTop: 16, borderTop: '1px solid var(--line)' }}>
                  <Link href="/contact" className="btn-secondary btn-sm" style={{ width: '100%', justifyContent: 'center' }}>
                    <span>Discuss Capability</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Services Page Final CTA */}
        <div
          className="calculator-card"
          style={{ marginTop: 80, padding: '48px 36px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}
        >
          <div className="eyebrow">TAILORED DIRECTION</div>
          <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(26px, 4vw, 42px)', color: 'var(--navy)' }}>
            NOT SURE WHAT YOUR BUSINESS NEEDS?
          </h2>
          <p className="section-copy" style={{ fontSize: 16, maxWidth: 600 }}>
            Start with a conversation. We'll help identify where digital can create the most useful opportunity.
          </p>
          <Link href="/contact" className="btn-primary" style={{ marginTop: 8 }}>
            <span>TALK TO DEEYORA</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </>
  );
}
