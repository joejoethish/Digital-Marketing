'use client';

import { useEffect, useState } from 'react';
import { conceptProjects, type ConceptWorkItem } from '@/lib/data';
import CaseStudyModal from '@/components/ui/CaseStudyModal';
import SplitWords from '@/components/ui/SplitWords';

/** Concept studies on dark glass cards; the 3D engine glows through them. */
export default function WorkProjects() {
  const [active, setActive] = useState<ConceptWorkItem | null>(null);

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setActive(null);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [active]);

  return (
    <section className="exp-section exp-dark xp-projects" data-kf="work-projects">
      <div className="container">
        <div className="xp-projects-head" data-reveal>
          <div>
            <div className="eyebrow exp-fade">Exploratory architecture &amp; concept projects</div>
            <h2 className="exp-title">
              <SplitWords text="Concept studies & strategic benchmarks." />
            </h2>
          </div>
          <p className="xp-projects-note exp-fade">Transparently labelled as concept exploratory work.</p>
        </div>

        <div className="xp-projects-grid" data-reveal>
          {conceptProjects.map((project, i) => (
            <button
              key={project.id}
              type="button"
              className="xp-project exp-fade"
              style={{ '--d': `${0.1 + i * 0.1}s` } as React.CSSProperties}
              onClick={() => setActive(project)}
              data-cursor="project"
            >
              <span className="xp-project-badge">{project.badge}</span>
              <span className="xp-project-cat">{project.category}</span>
              <h3>{project.title}</h3>
              <p>{project.summary}</p>
              <span className="xp-tags">
                {project.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </span>
              <span className="xp-project-more">Explore breakdown →</span>
            </button>
          ))}
        </div>
      </div>

      <CaseStudyModal item={active} onClose={() => setActive(null)} />
    </section>
  );
}
