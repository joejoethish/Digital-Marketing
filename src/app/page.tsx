import Hero from "@/components/sections/Hero";
import FirstImpression from "@/components/sections/FirstImpression";
import ServicesSection from "@/components/sections/ServicesSection";
import GrowthSystem from "@/components/sections/GrowthSystem";
import WhyDeeyora from "@/components/sections/WhyDeeyora";
import AIAdvantage from "@/components/sections/AIAdvantage";
import PerformanceDashboard from "@/components/sections/PerformanceDashboard";
import WorkSection from "@/components/sections/WorkSection";
import Industries from "@/components/sections/Industries";
import Process from "@/components/sections/Process";
import Pricing from "@/components/sections/Pricing";
import Insights from "@/components/sections/Insights";
import CTASection from "@/components/sections/CTASection";
import ScrollRevealInit from "@/components/ScrollRevealInit";

export default function HomePage() {
  return (
    <>
      <ScrollRevealInit />
      
      {/* 01. Hero */}
      <Hero />

      {/* 02. First Impression Banner */}
      <FirstImpression />

      {/* 03. Services */}
      <ServicesSection />

      {/* 04. Growth System */}
      <GrowthSystem />

      {/* 05. Why DEEYORA */}
      <WhyDeeyora />

      {/* 06. AI Advantage */}
      <AIAdvantage />

      {/* 07. Performance Marketing Analytics */}
      <PerformanceDashboard />

      {/* 08. Industry Focus */}
      <Industries />

      {/* 09. Work That Speaks */}
      <WorkSection />

      {/* 10. Process */}
      <Process />

      {/* 11. Pricing & Engagement */}
      <Pricing />

      {/* 12. Insights */}
      <Insights />

      {/* 13. Final CTA */}
      <CTASection />
    </>
  );
}
