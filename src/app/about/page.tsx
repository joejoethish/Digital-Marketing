import Link from 'next/link';
import SplitWords from '@/components/ui/SplitWords';
import { PROCESS_STEPS } from '@/components/experience/layers';

export const metadata = {
  title: 'About — DEEYORA',
  description:
    'A digital growth studio focused on helping businesses build, improve, and scale their presence online.',
};

const HOW_WE_THINK = [
  ['Understand before executing', 'Good marketing starts with understanding the business, audience, and problem.'],
  ['Quality over noise', "More content, more ads, or more channels don't automatically mean better marketing."],
  ['Creative with purpose', 'Creative decisions should support a clear objective.'],
  ['Transparency builds trust', 'Clients should understand what is happening with their marketing and why.'],
  ['Learn, improve, repeat', 'Digital marketing is an ongoing process of testing, learning, and optimization.'],
];

// Three moves for the Growth Engine (keyframes `about-*`): a flat monogram
// seen from above, a fanned deck for the five beliefs, and a wheel that rolls
// across the five steps of the approach.
export default function About() {
  return (
    <>
      <section className="exp-section xp-hero" data-kf="about-hero">
        <div className="container">
          <div className="xp-hero-copy" data-reveal>
            <div className="eyebrow exp-fade">About DEEYORA</div>
            <h1 className="exp-display">
              <SplitWords text="We're DEEYORA." offset={2} />
            </h1>
            <p className="exp-lead exp-fade" style={{ '--d': '0.5s', color: 'var(--navy)' } as React.CSSProperties}>
              A digital growth studio focused on helping businesses build, improve, and scale their presence online.
            </p>
            <p className="exp-lead exp-fade" style={{ '--d': '0.65s', fontSize: 16 } as React.CSSProperties}>
              We bring together strategy, content, performance marketing, digital experiences, and data to create a
              more connected approach to growth. We&apos;re not here to sell every service to every business.
              We&apos;re here to understand what your business needs, identify where digital can create an
              opportunity, and build a practical path forward.
            </p>
          </div>
        </div>
      </section>

      <section className="exp-section xp-block" data-kf="about-think">
        <div className="container">
          <div className="xp-block-copy" data-reveal>
            <div className="eyebrow exp-fade">Philosophy</div>
            <h2 className="exp-title">
              <SplitWords text="How we think." />
            </h2>
            <ol className="xp-list">
              {HOW_WE_THINK.map(([title, copy], i) => (
                <li key={title} className="exp-fade" style={{ '--d': `${0.2 + i * 0.08}s` } as React.CSSProperties}>
                  <span className="exp-num">0{i + 1}</span>
                  <strong>{title}</strong>
                  <span>{copy}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="exp-section xp-approach">
        <div className="xp-anchor xp-anchor-start" data-kf="about-approach-start" />
        <div className="xp-anchor xp-anchor-end" data-kf="about-approach-end" />
        <div className="xp-approach-sticky">
          <div className="container" data-reveal>
            <div className="eyebrow exp-fade">Our methodology</div>
            <h2 className="exp-title">
              <SplitWords text="Our approach." />
            </h2>
          </div>
          <div className="container" data-reveal>
            <ol className="xp-steps">
              {PROCESS_STEPS.map((step, i) => (
                <li key={step.n} className="exp-fade" style={{ '--d': `${0.1 + i * 0.08}s` } as React.CSSProperties}>
                  <span className="exp-num">{step.n}</span>
                  <strong>{step.title.charAt(0) + step.title.slice(1).toLowerCase()}</strong>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="exp-section xp-cta" data-kf="about-promise">
        <div className="container">
          <div className="xp-card" data-reveal>
            <div className="eyebrow exp-fade">Our commitment</div>
            <h2 className="exp-title">
              <SplitWords text="No overnight promises. Just better work." />
            </h2>
            <p className="exp-lead exp-fade" style={{ '--d': '0.3s' } as React.CSSProperties}>
              We won&apos;t promise overnight success. We will focus on a clear process, honest communication,
              thoughtful execution, and continuous improvement.
            </p>
            <div className="exp-actions exp-fade" style={{ '--d': '0.4s' } as React.CSSProperties}>
              <Link href="/contact" className="btn-primary">
                <span>Start a conversation</span>
                <span className="btn-arrow">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
