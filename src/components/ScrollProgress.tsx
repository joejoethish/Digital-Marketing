"use client";
import { useEffect, useState } from "react";

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentProgress = (window.scrollY / totalHeight) * 100;
        setProgress(Math.min(100, Math.max(0, currentProgress)));
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        right: 0,
        width: "3px",
        height: "100vh",
        zIndex: 9990,
        pointerEvents: "none",
        background: "rgba(109,61,245,0.08)",
      }}
      aria-hidden="true"
    >
      <div
        style={{
          width: "100%",
          height: `${progress}%`,
          background: "linear-gradient(180deg, #6D3DF5 0%, #A78BFA 100%)",
          boxShadow: "0 0 12px rgba(109,61,245,0.6)",
          transition: "height 0.1s linear",
        }}
      />
    </div>
  );
}
