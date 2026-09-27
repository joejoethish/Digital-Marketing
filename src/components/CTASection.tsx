import Link from 'next/link';
import MagneticElement from '@/components/ui/MagneticElement';

export default function CTASection() {
  return (
    <section className="journey-section cta-section" id="stage-cta">
      <div className="container">
        <div className="cta">
          {/* Decorative orbs */}
          <div className="cta-orb cta-orb-1" aria-hidden="true" />
          <div className="cta-orb cta-orb-2" aria-hidden="true" />

          <div className="cta-body">
            <div className="eyebrow cta-eyebrow">START THE CONVERSATION</div>
            <h2 className="cta-title" style={{ fontSize: 'clamp(32px, 5vw, 56px)' }}>
              HAVE A BUSINESS TO <span className="cta-accent">GROW?</span>
            </h2>
            <p className="cta-desc" style={{ fontSize: 17, maxWidth: 640 }}>
              Let's start with a conversation about where you are, where you want to go, and what needs to change.
            </p>
          </div>

          <div className="cta-actions">
            <MagneticElement strength={0.22}>
              <Link
                href="/contact"
                className="btn-primary btn-cta"
                data-cursor-label="Start"
              >
                <span>START A CONVERSATION</span>
                <span className="btn-arrow">→</span>
              </Link>
            </MagneticElement>

            <Link href="/services" className="btn-ghost">
              EXPLORE OUR SERVICES →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
