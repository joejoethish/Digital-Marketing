"use client";
import { useEffect } from "react";

// Initializes scroll reveal observer globally
export default function ScrollRevealInit() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );

    const els = document.querySelectorAll(".reveal");
    els.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return null;
}
