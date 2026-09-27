import SplitWords from '@/components/ui/SplitWords';

const PRINCIPLES = [
  ['Clear strategy', 'Start with the problem before choosing the channel.'],
  ['Transparent communication', "Know what we're doing, why we're doing it, and what we're measuring."],
  ['Purposeful creative', 'Creative should not only look good. It should have a reason behind it.'],
  ['Measurable work', 'Focus on meaningful business outcomes rather than vanity metrics.'],
];

export default function PrinciplesScene() {
  return (
    <section className="exp-section exp-sticky-wrap exp-why" data-kf="why" id="why-deeyora">
      <div className="exp-sticky">
        <div className="container exp-why-inner" data-reveal>
          <div className="eyebrow exp-fade">Why DEEYORA</div>
          <h2 className="exp-title">
            <SplitWords text="A small studio. A serious approach." />
          </h2>
          <p className="exp-lead exp-fade" style={{ '--d': '0.3s' } as React.CSSProperties}>
            Your marketing should be clear, purposeful, and measurable. We focus on understanding the business
            first, communicating clearly, executing carefully, and using real performance data to guide the next
            decision.
          </p>
          <ol className="exp-principles">
            {PRINCIPLES.map(([title, copy], i) => (
              <li key={title} className="exp-fade" style={{ '--d': `${0.4 + i * 0.08}s` } as React.CSSProperties}>
                <span className="exp-num">0{i + 1}</span>
                <strong>{title}</strong>
                <span>{copy}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
