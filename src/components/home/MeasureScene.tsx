import SplitWords from '@/components/ui/SplitWords';

const POINTS = [
  ['Tracked', 'Every campaign is set up with clear goals and measurement from day one.'],
  ['Reported', "Know what we're doing, why we're doing it, and what we're measuring."],
  ['Improved', 'Real performance data guides the next decision.'],
];

export default function MeasureScene() {
  return (
    <section className="exp-section exp-sticky-wrap exp-measure" data-kf="measure" id="measure">
      <div className="exp-sticky">
        <div className="container exp-measure-inner" data-reveal>
          <div className="eyebrow exp-fade">Measurable work</div>
          <h2 className="exp-title">
            <SplitWords text="Growth you can actually measure." />
          </h2>
          <p className="exp-lead exp-fade" style={{ '--d': '0.3s' } as React.CSSProperties}>
            We focus on meaningful business outcomes rather than vanity metrics.
          </p>
          <ul className="exp-points">
            {POINTS.map(([title, copy], i) => (
              <li key={title} className="exp-fade" style={{ '--d': `${0.4 + i * 0.1}s` } as React.CSSProperties}>
                <strong>{title}</strong>
                <span>{copy}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
