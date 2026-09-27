import Link from 'next/link';
import SplitWords from '@/components/ui/SplitWords';
import { ENGINE_LAYERS } from '@/components/experience/layers';

export default function HeroScene() {
  return (
    <section className="exp-section exp-hero" data-kf="hero" id="hero-discover">
      <div className="container exp-hero-inner">
        <div className="exp-hero-copy" data-reveal>
          <div className="eyebrow exp-fade" style={{ '--d': '0.1s' } as React.CSSProperties}>
            Digital Growth Studio
          </div>
          <h1 className="exp-display">
            <SplitWords text="Turn your digital presence into growth." offset={2} />
          </h1>
          <p className="exp-lead exp-fade" style={{ '--d': '0.7s' } as React.CSSProperties}>
            We help businesses build a stronger digital presence through strategy, creative content, performance
            marketing, and conversion-focused digital experiences.
          </p>
          <div className="exp-actions exp-fade" style={{ '--d': '0.85s' } as React.CSSProperties}>
            <Link className="btn-primary" href="/contact" data-cursor-label="Start">
              <span>Start a conversation</span>
              <span className="btn-arrow">→</span>
            </Link>
            <Link className="exp-link" href="/services">
              Explore our services <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>

        <div className="exp-hero-foot" data-reveal>
          <ul className="exp-spec exp-fade" style={{ '--d': '1s' } as React.CSSProperties}>
            {ENGINE_LAYERS.map((l) => (
              <li key={l.n}>
                <span>{l.n}</span>
                {l.title}
              </li>
            ))}
          </ul>
          <div className="exp-scroll-hint exp-fade" style={{ '--d': '1.1s' } as React.CSSProperties}>
            <span className="exp-scroll-line" />
            Scroll to explore
          </div>
        </div>
      </div>
    </section>
  );
}
