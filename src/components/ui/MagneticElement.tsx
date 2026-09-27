'use client';

import React from 'react';

interface Props {
  children: React.ReactNode;
  strength?: number;
}

export default function MagneticElement({ children }: Props) {
  return <>{children}</>;
}
