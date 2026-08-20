"use client";
import { useEffect, useRef, useState } from "react";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const [cursorText, setCursorText] = useState("");
  const [cursorType, setCursorType] = useState<"default" | "hover" | "cta" | "project">("default");

  useEffect(() => {
    // Only run cursor logic if fine pointer (desktop)
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let raf: number;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX - 4}px, ${mouseY - 4}px, 0)`;
      }
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const projectEl = target.closest("[data-cursor='project'], .work-card");
      const ctaEl = target.closest(".btn-primary, [data-cursor='cta']");
      const interactiveEl = target.closest("a, button, [role='button'], input, textarea, select, .pill, [data-cursor='hover']");

      if (projectEl) {
        setCursorType("project");
        setCursorText("VIEW →");
      } else if (ctaEl) {
        setCursorType("cta");
        setCursorText("");
      } else if (interactiveEl) {
        setCursorType("hover");
        setCursorText("");
      } else {
        setCursorType("default");
        setCursorText("");
      }
    };

    const animate = () => {
      ringX += (mouseX - ringX) * 0.16;
      ringY += (mouseY - ringY) * 0.16;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX - 18}px, ${ringY - 18}px, 0)`;
      }
      raf = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    raf = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseover", onOver);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <style>{`
        @media (pointer: fine) {
          body { cursor: default; }
          a, button, [role="button"], input, textarea, select { cursor: pointer; }
          .cursor-dot {
            position: fixed; top: 0; left: 0; width: 8px; height: 8px;
            background: #6D3DF5; border-radius: 50%; pointer-events: none;
            z-index: 9999; will-change: transform; transition: background 0.2s, transform 0.1s ease;
          }
          .cursor-ring {
            position: fixed; top: 0; left: 0; width: 36px; height: 36px;
            border: 1.5px solid rgba(109,61,245,0.45); border-radius: 50%; pointer-events: none;
            z-index: 9998; will-change: transform; display: flex; align-items: center; justify-content: center;
            transition: width 0.25s cubic-bezier(0.22,1,0.36,1), height 0.25s cubic-bezier(0.22,1,0.36,1),
                        background 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease, border-radius 0.25s ease;
          }
          .cursor-ring.cursor-hover {
            width: 48px; height: 48px;
            border-color: #6D3DF5;
            background: rgba(109,61,245,0.06);
            margin-left: -6px; margin-top: -6px;
          }
          .cursor-ring.cursor-cta {
            width: 54px; height: 54px;
            border-color: #6D3DF5;
            background: rgba(109,61,245,0.15);
            box-shadow: 0 0 20px rgba(109,61,245,0.35);
            margin-left: -9px; margin-top: -9px;
          }
          .cursor-ring.cursor-project {
            width: 72px; height: 72px;
            border-color: #6D3DF5;
            background: #6D3DF5;
            margin-left: -18px; margin-top: -18px;
            box-shadow: 0 8px 24px rgba(109,61,245,0.4);
          }
          .cursor-label {
            font-size: 0.625rem; font-weight: 800; color: #FFFFFF; letter-spacing: 0.08em;
            pointer-events: none; white-space: nowrap; font-family: var(--font-sans);
          }
        }
        @media (pointer: coarse) { .cursor-dot, .cursor-ring { display: none !important; } }
      `}</style>
      <div ref={dotRef} className={`cursor-dot cursor-${cursorType}`} aria-hidden="true" />
      <div ref={ringRef} className={`cursor-ring cursor-${cursorType}`} aria-hidden="true">
        {cursorType === "project" && (
          <span ref={labelRef} className="cursor-label">{cursorText}</span>
        )}
      </div>
    </>
  );
}
