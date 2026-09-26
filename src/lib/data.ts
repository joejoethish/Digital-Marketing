export interface ServiceItem {
  id: string;
  n: string;
  title: string;
  headline: string;
  description: string;
  services: string[];
}

export interface ConceptWorkItem {
  id: string;
  badge: 'CONCEPT PROJECT';
  title: string;
  category: string;
  summary: string;
  challenge: string;
  approach: string;
  execution: string;
  outcome: string;
  tags: string[];
}

export interface FAQItem {
  q: string;
  a: string;
}

export interface InsightItem {
  n: string;
  title: string;
  excerpt: string;
}

export const services: ServiceItem[] = [
  {
    id: 'brand-strategy',
    n: '01',
    title: 'BRAND STRATEGY',
    headline: 'BUILD A BRAND PEOPLE CAN UNDERSTAND.',
    description:
      'A strong digital presence starts with clarity. We help define your positioning, messaging, audience, and digital direction.',
    services: [
      'Brand positioning',
      'Audience research',
      'Messaging direction',
      'Content direction',
      'Digital strategy',
    ],
  },
  {
    id: 'social-content',
    n: '02',
    title: 'SOCIAL MEDIA & CONTENT',
    headline: 'CREATE CONTENT WITH A PURPOSE.',
    description:
      'We create content systems designed to communicate your brand, engage your audience, and support your wider marketing goals.',
    services: [
      'Content strategy',
      'Social media content',
      'Short-form video',
      'Creative concepts',
      'Content planning',
    ],
  },
  {
    id: 'performance-marketing',
    n: '03',
    title: 'PERFORMANCE MARKETING',
    headline: 'REACH THE PEOPLE WHO MATTER.',
    description:
      'We plan, launch, monitor, and optimize digital advertising around clear business objectives.',
    services: [
      'Meta advertising',
      'Google advertising',
      'Campaign strategy',
      'Audience targeting',
      'Creative testing',
      'Performance optimization',
    ],
  },
  {
    id: 'website-conversion',
    n: '04',
    title: 'WEBSITE & CONVERSION',
    headline: 'TURN MORE VISITORS INTO CUSTOMERS.',
    description:
      'We create and improve digital experiences that make your offer clearer and the next step easier.',
    services: [
      'Landing pages',
      'Website design',
      'Conversion strategy',
      'User experience',
      'CTA optimization',
    ],
  },
  {
    id: 'seo-organic',
    n: '05',
    title: 'SEO & ORGANIC GROWTH',
    headline: 'BUILD VISIBILITY THAT CAN COMPOUND.',
    description:
      'We build practical SEO foundations that help businesses become easier to discover when customers are actively searching.',
    services: [
      'Keyword research',
      'On-page SEO',
      'Technical SEO foundations',
      'SEO content',
      'Local SEO',
    ],
  },
  {
    id: 'analytics-reporting',
    n: '06',
    title: 'ANALYTICS & REPORTING',
    headline: 'KNOW WHAT YOUR MARKETING IS DOING.',
    description:
      'We help create the measurement foundations needed to understand traffic, engagement, conversions, and campaign performance.',
    services: [
      'Analytics setup',
      'Conversion tracking',
      'KPI tracking',
      'Performance reporting',
      'Marketing insights',
    ],
  },
];

export const conceptProjects: ConceptWorkItem[] = [
  {
    id: 'ecom-growth-system',
    badge: 'CONCEPT PROJECT',
    title: 'D2C Brand Identity & Performance Architecture',
    category: 'Brand Strategy & Conversion',
    summary:
      'Exploratory framework detailing how modular creative assets and ultra-fast landing pages combine to improve purchase intent.',
    challenge:
      'How to position a modern premium skincare offer in a crowded market without relying on aggressive discount tactics.',
    approach:
      'Mapped customer buying triggers, simplified messaging hierarchy, and developed direct product clarity.',
    execution:
      'Created short-form video hooks, redesigned product landing page flow, and optimized checkout CTAs.',
    outcome:
      'Established a clear reference architecture for performance testing and brand retention.',
    tags: ['Brand Positioning', 'Landing Page UX', 'Paid Social Strategy'],
  },
  {
    id: 'b2b-saas-positioning',
    badge: 'CONCEPT PROJECT',
    title: 'B2B Software Positioning & Digital Funnel Concept',
    category: 'Strategy & UX Design',
    summary:
      'Architectural study on converting technical B2B feature specs into clear customer-value propositions.',
    challenge:
      'Complex technical products often struggle with high landing page bounce rates due to unclear value communication.',
    approach:
      'Replaced technical jargon with direct business benefits, structured clear demo paths, and highlighted core ROI pillars.',
    execution:
      'Built a minimal interactive demo landing page, refined hero messaging, and designed a streamlined lead intake form.',
    outcome:
      'Demonstrated a higher conversion UX model for SaaS demo requests.',
    tags: ['B2B Messaging', 'Conversion UX', 'Search Strategy'],
  },
  {
    id: 'lifestyle-content-system',
    badge: 'CONCEPT PROJECT',
    title: 'Omnichannel Content System for Premium Lifestyle Brand',
    category: 'Content & Social Strategy',
    summary:
      'A structured content framework for scaling organic reach while driving consistent audience engagement.',
    challenge:
      'Posting content without a clear narrative structure leads to inconsistent brand perception and lost interest.',
    approach:
      'Developed 4 core content pillars balancing brand storytelling, educational hooks, and direct product call-to-actions.',
    execution:
      'Designed short-form video templates, automated content scheduling workflows, and optimized visual aesthetic guidelines.',
    outcome:
      'Formed a repeatable, high-quality content production system for boutique lifestyle brands.',
    tags: ['Content Strategy', 'Short-Form Video', 'Visual Identity'],
  },
];

export const insights: InsightItem[] = [
  {
    n: 'ARTICLE 01',
    title: 'HOW TO BUILD A DIGITAL MARKETING STRATEGY FROM SCRATCH',
    excerpt:
      'The essential building blocks every growing business should understand before investing in marketing.',
  },
  {
    n: 'ARTICLE 02',
    title: 'WHAT MAKES A SOCIAL MEDIA STRATEGY ACTUALLY WORK?',
    excerpt:
      'Moving beyond random posting to content with a clear purpose.',
  },
  {
    n: 'ARTICLE 03',
    title: 'BEFORE YOU SPEND ON ADS, FIX THESE 5 THINGS',
    excerpt:
      'The fundamentals businesses should have in place before investing in paid acquisition.',
  },
  {
    n: 'ARTICLE 04',
    title: 'WHY YOUR WEBSITE MATTERS BEYOND DESIGN',
    excerpt:
      'How clarity, trust, usability, and conversion work together to create a better digital experience.',
  },
];

export const faqs: FAQItem[] = [
  {
    q: 'DO YOU WORK WITH NEW BUSINESSES?',
    a: 'Yes. We work with businesses at different stages, including brands building their digital presence from the ground up.',
  },
  {
    q: 'DO I NEED TO KNOW WHICH SERVICE I NEED?',
    a: "No. Tell us about your business and your goal first. We'll help identify where digital marketing can make the most sense.",
  },
  {
    q: 'HOW DOES A PROJECT START?',
    a: 'We begin with a conversation to understand your business, goals, audience, and current digital presence. From there, we recommend the appropriate next steps.',
  },
  {
    q: 'DO YOU GUARANTEE RESULTS?',
    a: 'No responsible marketing partner can guarantee a specific revenue, ROAS, or growth outcome. We focus on building a clear strategy, measuring performance, and continuously optimizing based on what the data tells us.',
  },
  {
    q: 'DO YOU OFFER CUSTOM PACKAGES?',
    a: 'Yes. Our approach is based on the business, goals, scope, and level of support required rather than forcing every client into the same package.',
  },
];
