import Hero from '@/components/Hero';
import JourneyStage from '@/components/JourneyStage';
import CTASection from '@/components/CTASection';

export default function Home() {
  return (
    <>
      <Hero />

      <JourneyStage
        number="01"
        total="06"
        label="STRATEGY"
        title="The right direction turns ideas into plans."
        description="Before moving, you need to know where you're going. We map the landscape, find the opportunity and build a strategy that connects your brand to the people who matter most."
      />

      <JourneyStage
        number="02"
        total="06"
        label="CREATIVE"
        title="Bold ideas. Beautifully brought to life."
        description="We capture what makes your brand worth remembering. From visual identity to content systems, every creative decision is designed to stop the scroll and start a conversation."
      />

      <JourneyStage
        number="03"
        total="06"
        label="PERFORMANCE"
        title="More reach. More clicks. More results."
        description="Strategy and creative mean nothing without momentum. We turn campaigns into measurable growth engines — moving your brand forward with precision and speed."
      />

      <JourneyStage
        number="04"
        total="06"
        label="TECHNOLOGY"
        title="Smarter tools. Seamless growth."
        description="We connect your brand to the right platforms, tools and systems. Data flows, audiences connect, and every touchpoint works together to drive intelligent growth."
      />

      <JourneyStage
        number="05"
        total="06"
        label="GROWTH"
        title="The journey was the growth story."
        description="Every step you've taken — discovering, planning, creating, performing, connecting — leads here. A brand that doesn't just exist, but grows with purpose and clarity."
      />

      <CTASection />
    </>
  );
}
