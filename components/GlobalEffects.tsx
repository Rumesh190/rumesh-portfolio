"use client";

import { useEffect, useRef } from "react";

export default function GlobalEffects() {
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Progress bar
    const bar = progressRef.current;
    const updateProgress = () => {
      if (!bar) return;
      const h = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.width = h > 0 ? (window.scrollY / h) * 100 + "%" : "0%";
    };
    window.addEventListener("scroll", updateProgress, { passive: true });
    updateProgress();

    return () => {
      window.removeEventListener("scroll", updateProgress);
    };
  }, []);

  return (
    <>
      {/* One continuous atmospheric layer behind the complete portfolio. */}
      <div className="site-aurora" aria-hidden="true">
        <span className="site-aurora__blade site-aurora__blade--one" />
        <span className="site-aurora__blade site-aurora__blade--two" />
        <span className="site-aurora__blade site-aurora__blade--three" />
        <span className="site-aurora__blade site-aurora__blade--four" />
      </div>

      {/* Scroll progress bar */}
      <div
        ref={progressRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          height: "4px",
          width: "0%",
          background: "var(--accent)",
          zIndex: 9999,
        }}
      />
    </>
  );
}
