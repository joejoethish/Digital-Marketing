// The five layers of the DEEYORA Growth Engine, listed top → bottom.
// Shared by the 3D object (geometry order) and the HTML annotations.

export interface EngineLayer {
  n: string;
  title: string;
  description: string;
}

export const ENGINE_LAYERS: EngineLayer[] = [
  {
    n: '01',
    title: 'STRATEGY',
    description: 'Find the right position, audience, and direction for your business.',
  },
  {
    n: '02',
    title: 'CREATIVE',
    description: 'Create content and visual experiences designed to earn attention.',
  },
  {
    n: '03',
    title: 'PERFORMANCE',
    description: 'Reach the right audience through focused digital campaigns.',
  },
  {
    n: '04',
    title: 'CONVERSION',
    description: 'Turn more visitors into meaningful actions and customers.',
  },
  {
    n: '05',
    title: 'DATA',
    description: 'Understand what is working and make better marketing decisions.',
  },
];

export const PROCESS_STEPS = [
  { n: '01', title: 'DISCOVER', description: 'Understand the business, audience, market, and goals.' },
  { n: '02', title: 'PLAN', description: 'Define the right strategy and priorities.' },
  { n: '03', title: 'CREATE', description: 'Build the content, campaigns, and digital experiences.' },
  { n: '04', title: 'LAUNCH', description: 'Put the strategy into action.' },
  { n: '05', title: 'OPTIMIZE', description: 'Measure, learn, and improve continuously.' },
];
