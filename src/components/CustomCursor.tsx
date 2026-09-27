"use client";
import { useEffect, useRef, useState } from "react";

export function CustomCursor() {
  const [mounted, setMounted] = useState(false);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [cursorText, setCursorText] = useState("");
  const [cursorType, setCursorType] = useState<"default" | "hover" | "cta" | "project" | "explore">("default");

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
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

      // Magnetic Button Effect
      const target = e.target as HTMLElement;
      const magBtn = target?.closest(".btn, [data-magnetic]") as HTMLElement | null;
      if (magBtn) {
        const rect = magBtn.getBoundingClientRect();
        const relX = mouseX - (rect.left + rect.width / 2);
        const relY = mouseY - (rect.top + rect.height / 2);
        magBtn.style.transform = `translate3d(${relX * 0.22}px, ${relY * 0.22}px, 0)`;
        magBtn.style.transition = "transform 0.1s ease-out";
      } else {
        document.querySelectorAll<HTMLElement>(".btn, [data-magnetic]").forEach((b) => {
          if (b.style.transform !== "") {
            b.style.transform = "translate3d(0,0,0)";
            b.style.transition = "transform 0.3s ease-out";
          }
        });
      }
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const projectEl = target.closest("[data-cursor='project'], .work-card");
      const exploreEl = target.closest("[data-cursor='explore'], .service-card, .editorial-item");
      const ctaEl = target.closest(".btn-primary, [data-cursor='cta']");
      const interactiveEl = target.closest("a, button, [role='button'], input, textarea, select, .pill, [data-cursor='hover']");

      if (projectEl) {
        setCursorType("project");
        setCursorText("VIEW →");
      } else if (exploreEl) {
        setCursorType("explore");
        setCursorText("EXPLORE");
      } else if (ctaEl) {
        setCursorType("cta");
        setCursorText("TALK →");
      } else if (interactiveEl) {
        setCursorType("hover");
        setCursorText("");
      } else {
        setCursorType("default");
        setCursorText("");
      }
    };

    const animate = () => {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;

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
  }, [mounted]);

  if (!mounted) return null;

  return (
    <>
      <div ref={dotRef} className={`cursor-dot cursor-${cursorType}`} aria-hidden="true" />
      <div ref={ringRef} className={`cursor-ring cursor-${cursorType}`} aria-hidden="true">
        {cursorText && <span className="cursor-label">{cursorText}</span>}
      </div>
    </>
  );
}

export default CustomCursor;
