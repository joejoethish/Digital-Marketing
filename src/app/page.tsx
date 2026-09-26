import Hero from '@/components/Hero';
import WhatWeHelpWith from '@/components/WhatWeHelpWith';
import ProcessSection from '@/components/ProcessSection';
import WhyDeeyoraSection from '@/components/WhyDeeyoraSection';
import WorkPreviewSection from '@/components/WorkPreviewSection';
import FAQSection from '@/components/FAQSection';
import CTASection from '@/components/CTASection';

export default function Home() {
  return (
    <>
      {/* 01 HERO SECTION */}
      <Hero />

      {/* 02 HOME — WHAT WE HELP WITH */}
      <WhatWeHelpWith />

      {/* 03 HOME — PROCESS */}
      <ProcessSection />

      {/* 04 HOME — WHY DEEYORA */}
      <WhyDeeyoraSection />

      {/* 05 HOME — WORK PREVIEW */}
      <WorkPreviewSection />

      {/* 06 FREQUENTLY ASKED QUESTIONS */}
      <FAQSection />

      {/* 07 HOME — FINAL CTA */}
      <CTASection />
    </>
  );
}
