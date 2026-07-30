"use client";

import { useEffect, useRef } from "react";

export default function GlobalEffects() {
  const cursorRef = useRef<HTMLDivElement>(null);
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

    // Custom cursor
    const c = cursorRef.current;
    if (!c || matchMedia("(pointer:coarse)").matches) return;

    let x = window.innerWidth / 2,
      y = window.innerHeight / 2,
      cx = x,
      cy = y;
    const onMove = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
    };
    window.addEventListener("mousemove", onMove);

    let rafId: number;
    const tick = () => {
      cx += (x - cx) * 0.2;
      cy += (y - cy) * 0.2;
      c.style.left = cx + "px";
      c.style.top = cy + "px";
      rafId = requestAnimationFrame(tick);
    };
    tick();

    const hov = "a,button,[data-tilt],[data-magnetic]";
    const onOver = (e: MouseEvent) => {
      if ((e.target as Element).closest(hov)) {
        c.style.width = "46px";
        c.style.height = "46px";
        c.style.background = "transparent";
        c.style.border = "2px solid var(--accent)";
      }
    };
    const onOut = (e: MouseEvent) => {
      if ((e.target as Element).closest(hov)) {
        c.style.width = "14px";
        c.style.height = "14px";
        c.style.background = "var(--accent)";
        c.style.border = "none";
      }
    };
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);

    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      {/* Animated background blobs */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: -1,
          pointerEvents: "none",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "-12%",
            left: "-8%",
            width: "52vw",
            height: "52vw",
            borderRadius: "50%",
            background:
              "radial-gradient(circle at 30% 30%,#ef1206,transparent 70%)",
            filter: "blur(70px)",
            opacity: 0.5,
            animation: "drift1 26s ease-in-out infinite",
            willChange: "transform",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "20%",
            right: "-14%",
            width: "46vw",
            height: "46vw",
            borderRadius: "50%",
            background:
              "radial-gradient(circle at 60% 40%,#ff6a2c,transparent 70%)",
            filter: "blur(70px)",
            opacity: 0.42,
            animation: "drift2 32s ease-in-out infinite",
            willChange: "transform",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-16%",
            left: "22%",
            width: "48vw",
            height: "48vw",
            borderRadius: "50%",
            background:
              "radial-gradient(circle at 50% 50%,#c3f53b,transparent 68%)",
            filter: "blur(70px)",
            opacity: 0.4,
            animation: "drift3 24s ease-in-out infinite",
            willChange: "transform",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "38%",
            left: "30%",
            width: "40vw",
            height: "40vw",
            borderRadius: "50%",
            background:
              "radial-gradient(circle at 40% 60%,#ff3ea5,transparent 70%)",
            filter: "blur(70px)",
            opacity: 0.36,
            animation: "drift4 29s ease-in-out infinite",
            willChange: "transform",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "6%",
            right: "12%",
            width: "34vw",
            height: "34vw",
            borderRadius: "50%",
            background:
              "radial-gradient(circle at 50% 40%,#ff9e2c,transparent 70%)",
            filter: "blur(70px)",
            opacity: 0.34,
            animation: "drift1 34s ease-in-out infinite reverse",
            willChange: "transform",
          }}
        />
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

      {/* Custom cursor */}
      <div
        ref={cursorRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "14px",
          height: "14px",
          borderRadius: "50%",
          background: "var(--accent)",
          pointerEvents: "none",
          zIndex: 9998,
          transform: "translate(-50%,-50%)",
          transition:
            "width .25s cubic-bezier(.2,.7,.2,1),height .25s cubic-bezier(.2,.7,.2,1),background .25s",
        }}
      />
    </>
  );
}
