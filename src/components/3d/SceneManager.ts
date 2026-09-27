export interface ChapterConfig {
  id: string;
  number: string;
  label: string;
  title: string;
  image: string;
  lightColor: number;
  ambientColor: number;
  pointColor: number;
}

export const CHAPTERS: ChapterConfig[] = [
  {
    id: 'discover',
    number: '01',
    label: 'DISCOVER',
    title: 'DEEYORA — Digital Growth. Designed to Perform.',
    image: '/images/hero-discover.png',
    lightColor: 0x8b6fc0,
    ambientColor: 0xf7f5f0,
    pointColor: 0xffe8d6,
  },
  {
    id: 'strategy',
    number: '02',
    label: 'STRATEGY',
    title: 'Direction before acceleration.',
    image: '/images/strategy-map.png',
    lightColor: 0xa99bc7,
    ambientColor: 0xf3f0f8,
    pointColor: 0xc8bde0,
  },
  {
    id: 'create',
    number: '03',
    label: 'CREATE',
    title: 'Ideas becoming creative outcomes.',
    image: '/images/creative-capture.png',
    lightColor: 0x6060c0,
    ambientColor: 0xeef0fb,
    pointColor: 0x8080f0,
  },
  {
    id: 'perform',
    number: '04',
    label: 'PERFORM',
    title: 'Momentum and performance.',
    image: '/images/performance-vehicle.png',
    lightColor: 0x40b090,
    ambientColor: 0xf0f5f2,
    pointColor: 0x90e0c0,
  },
  {
    id: 'technology',
    number: '05',
    label: 'TECHNOLOGY',
    title: 'Smarter tools. Seamless growth.',
    image: '/images/technology-city.png',
    lightColor: 0x9050d0,
    ambientColor: 0xf5f0fb,
    pointColor: 0xd090f0,
  },
  {
    id: 'growth',
    number: '06',
    label: 'GROWTH',
    title: 'The destination.',
    image: '/images/growth-summit.png',
    lightColor: 0xd08040,
    ambientColor: 0xf7f5f0,
    pointColor: 0xffd0a0,
  },
];

export class SceneManager {
  public progress: number = 0; // Overall scroll progress 0 -> 1
  public activeChapterIndex: number = 0;
  public localProgress: number = 0; // 0 -> 1 within current active chapter transition

  constructor() {}

  public updateScroll(progress: number): void {
    this.progress = Math.max(0, Math.min(1, progress));
    const totalChapters = CHAPTERS.length - 1;
    const scaled = Math.min(this.progress * totalChapters, totalChapters - 0.0001);
    this.activeChapterIndex = Math.floor(scaled);
    this.localProgress = scaled - this.activeChapterIndex;
  }

  public getCurrentChapter(): ChapterConfig {
    return CHAPTERS[this.activeChapterIndex] || CHAPTERS[0];
  }

  public getNextChapter(): ChapterConfig {
    const nextIdx = Math.min(this.activeChapterIndex + 1, CHAPTERS.length - 1);
    return CHAPTERS[nextIdx];
  }
}
