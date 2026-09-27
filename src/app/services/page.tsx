import Link from 'next/link';
import SplitWords from '@/components/ui/SplitWords';
import { services } from '@/lib/data';
import { sentenceCase } from '@/lib/text';

export const metadata = {
  title: 'Services — DEEYORA',
  description:
    'Strategy, content, performance marketing, websites, SEO and analytics — combined around what your business actually needs.',
};

// Each service is a full-screen chapter; the 3D Growth Engine slides the
// matching layer out of its stack like a drawer (see keyframes `service-*`).
export default function ServicesPage() {
  return (
    <>
      <section className="exp-section xp-hero" data-kf="services-hero">
        <div className="container">
          <div className="xp-hero-copy" data-reveal>
            <div className="eyebrow exp-fade">Our services</div>
            <h1 className="exp-display">
              <SplitWords text="Digital growth, built around your business." offset={2} />
            </h1>
            <p className="exp-lead exp-fade" style={{ '--d': '0.6s' } as React.CSSProperties}>
              Not every business needs every marketing channel. We identify what matters most for your goals and build
              the right combination of strategy, creative, performance, digital experience, and data.
            </p>
            <div className="exp-actions exp-fade" style={{ '--d': '0.75s' } as React.CSSProperties}>
              <Link className="btn-primary" href="/contact">
                <span>Talk to DEEYORA</span>
                <span className="btn-arrow">→</span>
              </Link>
              <a className="exp-link" href={`#${services[0].id}`}>
                See all six <span aria-hidden="true">↓</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {services.map((service) => (
        <section
          key={service.id}
          id={service.id}
          className="exp-section xp-block"
          data-kf={`service-${service.id}`}
        >
          <div className="container">
            <div className="xp-block-copy" data-reveal>
              <div className="xp-count exp-fade">
                {service.n} <span>/ 0{services.length}</span> · {service.title}
              </div>
              <h2 className="exp-title">
                <SplitWords text={sentenceCase(service.headline)} />
              </h2>
              <p className="exp-lead exp-fade" style={{ '--d': '0.3s' } as React.CSSProperties}>
                {service.description}
              </p>
              <ul className="xp-checks exp-fade" style={{ '--d': '0.4s' } as React.CSSProperties}>
                {service.services.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <Link href="/contact" className="exp-link exp-fade" style={{ '--d': '0.5s' } as React.CSSProperties}>
                Discuss this with us <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </section>
      ))}

      <section className="exp-section xp-cta" data-kf="services-cta">
        <div className="container">
          <div className="xp-card" data-reveal>
            <div className="eyebrow exp-fade">Tailored direction</div>
            <h2 className="exp-title">
              <SplitWords text="Not sure what your business needs?" />
            </h2>
            <p className="exp-lead exp-fade" style={{ '--d': '0.3s' } as React.CSSProperties}>
              Start with a conversation. We&apos;ll help identify where digital can create the most useful opportunity.
            </p>
            <div className="exp-actions exp-fade" style={{ '--d': '0.4s' } as React.CSSProperties}>
              <Link href="/contact" className="btn-primary">
                <span>Talk to DEEYORA</span>
                <span className="btn-arrow">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
