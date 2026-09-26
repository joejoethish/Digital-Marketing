import WorkSection from '@/components/WorkSection';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function WorkPage() {
  return (
    <>
      <div className="container subhero" style={{ paddingBottom: 20 }}>
        <div className="eyebrow">OUR WORK</div>
        <h1 className="hero-headline" style={{ fontSize: 'clamp(36px, 5.5vw, 68px)', margin: '16px 0 20px', lineHeight: 1.1 }}>
          WE'RE BUILDING <span className="accent">OUR STORY.</span>
        </h1>
        <p className="section-copy" style={{ fontSize: 18, maxWidth: 720, color: 'var(--muted)', lineHeight: 1.6 }}>
          DEEYORA is a growing digital studio. We're building our portfolio through real projects, real collaboration, and work we can stand behind.
        </p>
      </div>

      {/* Methodology framework & Concept studies */}
      <WorkSection />

      {/* Work Page Final CTA */}
      <div className="container" style={{ paddingBottom: 80 }}>
        <div
          className="calculator-card"
          style={{ padding: '48px 36px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}
        >
          <div className="eyebrow">COLLABORATION</div>
          <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(26px, 4vw, 42px)', color: 'var(--navy)' }}>
            HAVE A PROJECT YOU'D LIKE TO BUILD WITH US?
          </h2>
          <p className="section-copy" style={{ fontSize: 16, maxWidth: 600 }}>
            Let's discuss your current digital goals and build a practical roadmap together.
          </p>
          <Link href="/contact" className="btn-primary" style={{ marginTop: 8 }}>
            <span>START A PROJECT</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </>
  );
}
