"use client";
import { useEffect, useState } from "react";

export default function PageLoader() {
  const [loading, setLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Check if session already loaded to avoid annoying repeat on page navigation
    const hasLoaded = sessionStorage.getItem("deeyora_intro_shown");
    if (hasLoaded) {
      setLoading(false);
      return;
    }

    const timer1 = setTimeout(() => setFadeOut(true), 750);
    const timer2 = setTimeout(() => {
      setLoading(false);
      sessionStorage.setItem("deeyora_intro_shown", "1");
    }, 1050);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  if (!loading) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 99999,
        background: "#F8F7F4",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        transition: "opacity 0.35s cubic-bezier(0.4,0,0.2,1), visibility 0.35s ease",
        opacity: fadeOut ? 0 : 1,
        visibility: fadeOut ? "hidden" : "visible",
        pointerEvents: fadeOut ? "none" : "all",
      }}
      aria-label="Loading DEEYORA"
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.875rem",
          animation: "scalePulse 0.8s cubic-bezier(0.22,1,0.36,1) forwards",
        }}
      >
        <div
          style={{
            width: "38px",
            height: "38px",
            background: "linear-gradient(135deg, #6D3DF5 0%, #A78BFA 100%)",
            borderRadius: "9px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 8px 24px rgba(109,61,245,0.35)",
          }}
        >
          <svg width="20" height="20" viewBox="0 0 16 16" fill="none">
            <path d="M2 14L8 2L14 14" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M4.5 10H11.5" stroke="white" strokeWidth="2.2" strokeLinecap="round" />
          </svg>
        </div>
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 800,
            fontSize: "1.75rem",
            color: "#111113",
            letterSpacing: "-0.03em",
          }}
        >
          DEEYORA
        </span>
      </div>

      <div
        style={{
          marginTop: "1.5rem",
          width: "120px",
          height: "2px",
          background: "#E7E5EA",
          borderRadius: "100px",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(90deg, #6D3DF5, #A78BFA)",
            borderRadius: "100px",
            animation: "loaderLine 0.75s ease-in-out forwards",
          }}
        />
      </div>

      <style>{`
        @keyframes scalePulse {
          0% { transform: scale(0.92); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes loaderLine {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}
