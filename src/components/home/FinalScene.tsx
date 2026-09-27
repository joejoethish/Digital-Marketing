import Link from 'next/link';
import SplitWords from '@/components/ui/SplitWords';

export default function FinalScene() {
  return (
    <section className="exp-section exp-dark exp-final" data-kf="cta" id="stage-cta">
      <div className="container exp-final-inner" data-reveal>
        <div className="exp-final-top">
          <div className="eyebrow exp-fade">Start the conversation</div>
          <h2 className="exp-display exp-final-title">
            <SplitWords text="Have a business to grow?" />
          </h2>
        </div>
        <div className="exp-final-bottom exp-fade" style={{ '--d': '0.4s' } as React.CSSProperties}>
          <p className="exp-lead">
            Let&apos;s start with a conversation about where you are, where you want to go, and what needs to change.
          </p>
          <div className="exp-actions">
            <Link href="/contact" className="btn-primary" data-cursor-label="Start">
              <span>Start a conversation</span>
              <span className="btn-arrow">→</span>
            </Link>
            <Link href="/services" className="exp-link">
              Explore our services <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
