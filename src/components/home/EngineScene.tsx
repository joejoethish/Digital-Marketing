import SplitWords from '@/components/ui/SplitWords';
import { ENGINE_LAYERS } from '@/components/experience/layers';

// The exploded view. Layer annotations are drawn by the WebGL stage on desktop;
// the list below is the accessible / mobile version of the same content.
export default function EngineScene() {
  return (
    <section className="exp-section exp-sticky-wrap exp-engine" data-kf="engine" id="what-we-help-with">
      <div className="exp-sticky">
        <div className="container exp-engine-inner">
          <div className="exp-engine-head" data-reveal>
            <div className="eyebrow exp-fade">What we help with</div>
            <h2 className="exp-title">
              <SplitWords text="Building the system behind better digital growth." />
            </h2>
          </div>

          <p className="exp-engine-note exp-fade" data-reveal>
            Five layers, engineered to work as one. Each part of your marketing supports the next — from the
            first strategic decision to the data that shapes what happens after.
          </p>

          <ol className="exp-engine-list">
            {ENGINE_LAYERS.map((l) => (
              <li key={l.n}>
                <span className="exp-num">{l.n}</span>
                <div>
                  <strong>{l.title}</strong>
                  <p>{l.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
