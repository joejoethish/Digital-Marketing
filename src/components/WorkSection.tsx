'use client';

import Link           from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { useState }  from 'react';
import { work }      from '@/lib/data';

export default function WorkSection() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section className="section">
      <div className="container">
        <div className="work-head">
          <div>
            <div className="eyebrow">Selected Work</div>
            <h2 className="section-title">WORK THAT MOVES.</h2>
          </div>
          <Link href="/work" className="accent" data-cursor-label="See all">
            View All Work →
          </Link>
        </div>

        <div className="work-grid">
          {work.map((w, i) => (
            <article
              key={w.title}
              className="work-card"
              onClick={() => setActive(i)}
              // Cursor context: VIEW PROJECT label
              data-cursor-label="VIEW"
              tabIndex={0}
              role="button"
              aria-label={`View ${w.title}`}
              onKeyDown={e => e.key === 'Enter' && setActive(i)}
            >
              <div className="work-image">
                <ArrowUpRight
                  color="white"
                  size={18}
                  className="work-card-arrow"
                  aria-hidden="true"
                />
              </div>
              <div className="work-body">
                <span className="badge">{w.industry}</span>
                <h3>{w.title}</h3>
                <div className="metric">{w.metric}</div>
                <div className="tags">{w.tags}</div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Case study modal */}
      {active !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={work[active].title}
          onClick={() => setActive(null)}
          className="work-modal-overlay"
        >
          <div
            onClick={e => e.stopPropagation()}
            className="work-modal"
          >
            <span className="eyebrow">{work[active].industry}</span>
            <h2 className="section-title" style={{ fontSize: 45 }}>
              {work[active].title}
            </h2>
            <p className="section-copy">
              A DEEYORA growth system combining strategy, creative, performance and measurement into one unified engine.
            </p>
            <strong className="accent">{work[active].metric}</strong>
            <div className="actions" style={{ marginTop: 28 }}>
              <button className="btn-primary" onClick={() => setActive(null)}>
                <span>Close</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
