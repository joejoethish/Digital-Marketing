import Link from 'next/link';
import { ArrowRight, Compass, ShieldCheck, Sparkles, LineChart, RefreshCw } from 'lucide-react';

const HOW_WE_THINK = [
  {
    icon: Compass,
    title: 'UNDERSTAND BEFORE EXECUTING',
    desc: 'Good marketing starts with understanding the business, audience, and problem.',
  },
  {
    icon: ShieldCheck,
    title: 'QUALITY OVER NOISE',
    desc: "More content, more ads, or more channels don't automatically mean better marketing.",
  },
  {
    icon: Sparkles,
    title: 'CREATIVE WITH PURPOSE',
    desc: 'Creative decisions should support a clear objective.',
  },
  {
    icon: LineChart,
    title: 'TRANSPARENCY BUILDS TRUST',
    desc: 'Clients should understand what is happening with their marketing and why.',
  },
  {
    icon: RefreshCw,
    title: 'LEARN, IMPROVE, REPEAT',
    desc: 'Digital marketing is an ongoing process of testing, learning, and optimization.',
  },
];

const APPROACH_STEPS = [
  { num: '01', title: 'DISCOVER' },
  { num: '02', title: 'PLAN' },
  { num: '03', title: 'CREATE' },
  { num: '04', title: 'LAUNCH' },
  { num: '05', title: 'OPTIMIZE' },
];

export default function About() {
  return (
    <div className="container subhero" style={{ paddingBottom: 80 }}>
      {/* Hero */}
      <div className="eyebrow">ABOUT DEEYORA</div>
      <h1 className="hero-headline" style={{ fontSize: 'clamp(36px, 5.5vw, 68px)', margin: '16px 0 24px', lineHeight: 1.1 }}>
        WE'RE <span className="accent">DEEYORA.</span>
      </h1>

      <p className="section-copy" style={{ fontSize: 20, fontWeight: 500, color: 'var(--navy)', maxWidth: 740, marginBottom: 20 }}>
        A digital growth studio focused on helping businesses build, improve, and scale their presence online.
      </p>

      <p className="section-copy" style={{ fontSize: 16, lineHeight: 1.7, color: 'var(--muted)', maxWidth: 760 }}>
        We bring together strategy, content, performance marketing, digital experiences, and data to create a more connected approach to growth. We're not here to sell every service to every business. We're here to understand what your business needs, identify where digital can create an opportunity, and build a practical path forward.
      </p>

      {/* HOW WE THINK */}
      <div style={{ marginTop: 80 }}>
        <div className="eyebrow">PHILOSOPHY</div>
        <h2 className="section-title" style={{ fontSize: 'clamp(28px, 4vw, 42px)', marginBottom: 32 }}>
          HOW WE THINK
        </h2>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: 24,
          }}
        >
          {HOW_WE_THINK.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="service-detail-card"
                style={{ padding: 28, display: 'flex', flexDirection: 'column', gap: 14 }}
              >
                <Icon className="accent" size={24} />
                <h3 style={{ fontSize: 15, fontWeight: 700, letterSpacing: '0.05em', color: 'var(--navy)' }}>
                  {item.title}
                </h3>
                <p style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.5 }}>
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* OUR APPROACH */}
      <div style={{ marginTop: 80 }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div className="eyebrow">OUR METHODOLOGY</div>
          <h2 className="section-title" style={{ fontSize: 'clamp(28px, 4vw, 42px)', marginTop: 8 }}>
            OUR APPROACH
          </h2>
        </div>

        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 16,
            marginTop: 24,
          }}
        >
          {APPROACH_STEPS.map((step, idx) => (
            <div key={step.num} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <div
                className="service-detail-card"
                style={{
                  padding: '20px 28px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  minWidth: 160,
                }}
              >
                <span className="accent" style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 18, fontWeight: 700 }}>
                  {step.num}
                </span>
                <span style={{ fontSize: 14, fontWeight: 700, letterSpacing: '0.05em', color: 'var(--navy)' }}>
                  {step.title}
                </span>
              </div>
              {idx < APPROACH_STEPS.length - 1 && (
                <span className="accent" style={{ fontSize: 20, fontWeight: 700 }}>
                  →
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* HONEST PROMISE */}
      <div
        className="calculator-card"
        style={{ marginTop: 80, padding: '48px 36px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}
      >
        <div className="eyebrow">OUR COMMITMENT</div>
        <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(26px, 4vw, 40px)', color: 'var(--navy)' }}>
          NO OVERNIGHT PROMISES. JUST BETTER WORK.
        </h2>
        <p className="section-copy" style={{ fontSize: 16, maxWidth: 640, lineHeight: 1.6 }}>
          We won't promise overnight success. We will focus on a clear process, honest communication, thoughtful execution, and continuous improvement.
        </p>
      </div>

      {/* Final CTA */}
      <div style={{ marginTop: 60, textAlign: 'center' }}>
        <h3 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 28, color: 'var(--navy)', marginBottom: 12 }}>
          HAVE A BUSINESS TO GROW?
        </h3>
        <p className="section-copy" style={{ fontSize: 16, maxWidth: 560, margin: '0 auto 24px auto' }}>
          Let's start with a conversation about where you are, where you want to go, and what needs to change.
        </p>
        <Link href="/contact" className="btn-primary" style={{ display: 'inline-flex' }}>
          <span>START A CONVERSATION</span>
          <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}
