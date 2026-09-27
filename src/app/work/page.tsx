import Link from 'next/link';
import SplitWords from '@/components/ui/SplitWords';
import WorkProjects from '@/components/work/WorkProjects';

export const metadata = {
  title: 'Work — DEEYORA',
  description: "DEEYORA is a growing digital studio. See how we document our work and the concept studies we're building.",
};

const FRAMEWORK_STEPS = [
  { title: 'The challenge', desc: 'What the business needed to solve.' },
  { title: 'The approach', desc: 'How we identified the opportunity.' },
  { title: 'The execution', desc: 'What we planned and built.' },
  { title: 'The outcome', desc: 'What changed and what we learned.' },
];

// A dark gallery: the camera orbits the Growth Engine through the four parts
// of every case study (keyframes `work-*`).
export default function WorkPage() {
  return (
    <div className="xp-work">
      <section className="exp-section exp-dark xp-hero" data-kf="work-hero">
        <div className="container">
          <div className="xp-hero-copy" data-reveal>
            <div className="eyebrow exp-fade">Our work</div>
            <h1 className="exp-display">
              <SplitWords text="We're building our story." offset={2} />
            </h1>
            <p className="exp-lead exp-fade" style={{ '--d': '0.6s' } as React.CSSProperties}>
              DEEYORA is a growing digital studio. We&apos;re building our portfolio through real projects, real
              collaboration, and work we can stand behind.
            </p>
          </div>
        </div>
      </section>

      <section className="exp-section exp-dark xp-intro">
        <div className="container" data-reveal>
          <div className="eyebrow exp-fade">Our methodology</div>
          <h2 className="exp-title">
            <SplitWords text="How we document our work." />
          </h2>
          <p className="exp-lead exp-fade" style={{ '--d': '0.3s' } as React.CSSProperties}>
            Every case study published by DEEYORA follows a transparent 4-part structure focused on real
            problem-solving and honest findings.
          </p>
        </div>
      </section>

      {FRAMEWORK_STEPS.map((step, i) => (
        <section key={step.title} className="exp-section exp-dark xp-block" data-kf={`work-step-${i + 1}`}>
          <div className="container">
            <div className="xp-block-copy" data-reveal>
              <div className="xp-count exp-fade">
                0{i + 1} <span>/ 0{FRAMEWORK_STEPS.length}</span>
              </div>
              <h2 className="exp-step-title">
                <SplitWords text={step.title} />
              </h2>
              <p className="exp-lead exp-fade" style={{ '--d': '0.25s' } as React.CSSProperties}>
                {step.desc}
              </p>
            </div>
          </div>
        </section>
      ))}

      <WorkProjects />

      <section className="exp-section exp-dark xp-cta" data-kf="work-cta">
        <div className="container">
          <div className="xp-card" data-reveal>
            <div className="eyebrow exp-fade">Collaboration</div>
            <h2 className="exp-title">
              <SplitWords text="Have a project you'd like to build with us?" />
            </h2>
            <p className="exp-lead exp-fade" style={{ '--d': '0.3s' } as React.CSSProperties}>
              Let&apos;s discuss your current digital goals and build a practical roadmap together.
            </p>
            <div className="exp-actions exp-fade" style={{ '--d': '0.4s' } as React.CSSProperties}>
              <Link href="/contact" className="btn-primary">
                <span>Start a project</span>
                <span className="btn-arrow">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
