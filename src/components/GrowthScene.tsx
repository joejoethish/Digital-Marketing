'use client';

import dynamic from 'next/dynamic';

const CinematicCanvas = dynamic(() => import('./3d/CinematicCanvas'), { 
  ssr: false,
  loading: () => <div className="growth-canvas" style={{ background: '#f7f5f0' }} />
});

export default function GrowthScene() {
  return <CinematicCanvas />;
}
