import SplitWords from '@/components/ui/SplitWords';
import { PROCESS_STEPS } from '@/components/experience/layers';

// Top-down "blueprint" chapter: the camera flattens onto the dial and each
// step block rotates it to the matching marker.
export default function ProcessScene() {
  return (
    <section className="exp-section exp-dark exp-process" id="process">
      <div className="container exp-process-head" data-reveal>
        <div className="eyebrow exp-fade">Our process</div>
        <h2 className="exp-title">
          <SplitWords text="A clearer path from idea to growth." />
        </h2>
      </div>

      {PROCESS_STEPS.map((step, i) => (
        <div key={step.n} className="exp-step" data-kf={`process-${i + 1}`}>
          <div className="container" data-reveal>
            <div className="exp-step-count exp-fade">
              {step.n} <span>/ 0{PROCESS_STEPS.length}</span>
            </div>
            <h3 className="exp-step-title">
              <SplitWords text={step.title} />
            </h3>
            <p className="exp-lead exp-fade" style={{ '--d': '0.25s' } as React.CSSProperties}>
              {step.description}
            </p>
          </div>
        </div>
      ))}
    </section>
  );
}
