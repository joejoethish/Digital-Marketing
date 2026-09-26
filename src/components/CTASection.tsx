import Link          from 'next/link';
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
            <div className="eyebrow cta-eyebrow">The journey starts here</div>
            <h2 className="cta-title">
              READY TO <span className="cta-accent">GROW?</span>
            </h2>
            <p className="cta-desc">
              Tell us what you&apos;re building. We&apos;ll help you figure out what&apos;s next.
            </p>
          </div>

          <div className="cta-actions">
            <MagneticElement strength={0.22}>
              <Link
                href="/contact"
                className="btn-primary btn-cta"
                data-cursor-label="Let's talk"
              >
                <span>Start a Project</span>
                <span className="btn-arrow">→</span>
              </Link>
            </MagneticElement>

            <Link href="/work" className="btn-ghost">
              View Our Work →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
