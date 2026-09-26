'use client';

const PROCESS_STEPS = [
  {
    num: '01',
    title: 'DISCOVER',
    description: 'Understand the business, audience, market, and goals.',
  },
  {
    num: '02',
    title: 'PLAN',
    description: 'Define the right strategy and priorities.',
  },
  {
    num: '03',
    title: 'CREATE',
    description: 'Build the content, campaigns, and digital experiences.',
  },
  {
    num: '04',
    title: 'LAUNCH',
    description: 'Put the strategy into action.',
  },
  {
    num: '05',
    title: 'OPTIMIZE',
    description: 'Measure, learn, and improve continuously.',
  },
];

export default function ProcessSection() {
  return (
    <section className="section process-section" id="process">
      <div className="container">
        <div style={{ marginBottom: 40, textAlign: 'center' }}>
          <div className="eyebrow">OUR PROCESS</div>
          <h2 className="section-title" style={{ fontSize: 'clamp(28px, 4vw, 48px)', marginTop: 8 }}>
            A CLEARER PATH FROM IDEA TO GROWTH.
          </h2>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: 20,
            marginTop: 40,
          }}
        >
          {PROCESS_STEPS.map((step) => (
            <div
              key={step.num}
              className="service-detail-card"
              style={{
                padding: '28px 24px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'transform 0.3s ease, border-color 0.3s ease',
              }}
            >
              <div>
                <div
                  className="accent"
                  style={{
                    fontFamily: 'Space Grotesk, sans-serif',
                    fontSize: 28,
                    fontWeight: 700,
                    marginBottom: 16,
                  }}
                >
                  {step.num}
                </div>
                <h3
                  style={{
                    fontSize: 16,
                    fontWeight: 700,
                    letterSpacing: '0.05em',
                    color: 'var(--navy)',
                    marginBottom: 10,
                  }}
                >
                  {step.title}
                </h3>
                <p
                  style={{
                    fontSize: 14,
                    color: 'var(--muted)',
                    lineHeight: 1.5,
                  }}
                >
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
