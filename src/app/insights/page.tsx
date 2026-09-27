import Link from 'next/link';
import SplitWords from '@/components/ui/SplitWords';
import { insights } from '@/lib/data';
import { sentenceCase } from '@/lib/text';

export const metadata = {
  title: 'Insights — DEEYORA',
  description: 'Practical thoughts on strategy, content, performance, websites, and building a stronger online presence.',
};

// The Growth Engine's layers stand in a row like records on a shelf; each
// article brings its matching layer to the front (keyframes `insights-*`).
export default function Insights() {
  return (
    <>
      <section className="exp-section xp-hero" data-kf="insights-hero">
        <div className="container">
          <div className="xp-hero-copy" data-reveal>
            <div className="eyebrow exp-fade">Editorial insights</div>
            <h1 className="exp-display">
              <SplitWords text="Ideas for better digital growth." offset={2} />
            </h1>
            <p className="exp-lead exp-fade" style={{ '--d': '0.6s' } as React.CSSProperties}>
              Practical thoughts on strategy, content, performance, websites, and building a stronger online presence.
            </p>
          </div>
        </div>
      </section>

      {insights.map((article, i) => (
        <article key={article.n} className="exp-section xp-block xp-article" data-kf={`insights-article-${i + 1}`}>
          <div className="container">
            <div className="xp-block-copy" data-reveal>
              <div className="xp-count exp-fade">
                {article.n.replace('ARTICLE', 'Article')} <span>/ 0{insights.length}</span>
              </div>
              <h2 className="exp-title">
                <SplitWords text={sentenceCase(article.title)} />
              </h2>
              <p className="exp-lead exp-fade" style={{ '--d': '0.3s' } as React.CSSProperties}>
                {article.excerpt}
              </p>
            </div>
          </div>
        </article>
      ))}

      <section className="exp-section xp-cta" data-kf="insights-cta">
        <div className="container">
          <div className="xp-card" data-reveal>
            <div className="eyebrow exp-fade">Apply these ideas</div>
            <h2 className="exp-title">
              <SplitWords text="Want to discuss strategy for your brand?" />
            </h2>
            <p className="exp-lead exp-fade" style={{ '--d': '0.3s' } as React.CSSProperties}>
              Let&apos;s map out how these principles apply directly to your business goals.
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
