'use client';

import { useEffect, useRef, ReactNode } from 'react';

type HeadingTag = 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'div' | 'span';

interface RevealTextProps {
  children: ReactNode;
  as?: HeadingTag;
  className?: string;
  /** ms delay before animation triggers after intersection */
  delay?: number;
  /** IntersectionObserver threshold (0–1) */
  threshold?: number;
}

/**
 * Wraps content in a scroll-triggered reveal:
 *   initial: opacity 0 + translateY 28px + blur 6px
 *   final:   opacity 1 + translateY 0   + blur 0
 * Instantly reveals if prefers-reduced-motion is set.
 */
export default function RevealText({
  children,
  as: Tag = 'div',
  className = '',
  delay = 0,
  threshold = 0.12,
}: RevealTextProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Skip animation for reduced-motion users
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.classList.add('rt-visible');
      return;
    }

    let timer: ReturnType<typeof setTimeout> | null = null;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          timer = setTimeout(() => el.classList.add('rt-visible'), delay);
          observer.disconnect();
        }
      },
      { threshold }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
      if (timer) clearTimeout(timer);
    };
  }, [delay, threshold]);

  return (
    // @ts-expect-error polymorphic ref
    <Tag ref={ref} className={`rt ${className}`}>
      {children}
    </Tag>
  );
}
