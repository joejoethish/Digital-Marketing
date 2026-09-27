import HomeExperience from '@/components/experience/HomeExperience';
import HeroScene from '@/components/home/HeroScene';
import EngineScene from '@/components/home/EngineScene';
import MeasureScene from '@/components/home/MeasureScene';
import ProcessScene from '@/components/home/ProcessScene';
import PrinciplesScene from '@/components/home/PrinciplesScene';
import FinalScene from '@/components/home/FinalScene';
import FAQSection from '@/components/FAQSection';

// Immersive home page. A single WebGL "Growth Engine" stays on screen while the
// sections scroll past; each `data-kf` anchor tells it which pose to take.
export default function Home() {
  return (
    <>
      <HomeExperience />

      {/* 01 — Hero: the assembled engine */}
      <HeroScene />

      {/* 02 — Exploded view: five layers */}
      <EngineScene />

      {/* 03 — Macro close-up on the performance layer */}
      <MeasureScene />

      {/* 04 — Top-down process dial (3D → 2D) */}
      <ProcessScene />

      {/* 05 — Flip: why DEEYORA */}
      <PrinciplesScene />

      {/* 06 — FAQ */}
      <div className="exp-section exp-faq" data-kf="faq">
        <FAQSection />
      </div>

      {/* 07 — Final CTA */}
      <FinalScene />
    </>
  );
}
