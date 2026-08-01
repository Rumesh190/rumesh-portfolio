"use client";

import { useEffect, useRef } from "react";
import RotatingWords from "./RotatingWords";

function useMagnetic() {
  const ref = useRef<HTMLElement | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || matchMedia("(pointer:coarse)").matches) return;
    el.style.transition = "transform .3s cubic-bezier(.2,.7,.2,1)";
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const mx = e.clientX - r.left - r.width / 2;
      const my = e.clientY - r.top - r.height / 2;
      el.style.transform = `translate(${mx * 0.35}px,${my * 0.5}px)`;
    };
    const onLeave = () => { el.style.transform = ""; };
    el.addEventListener("mousemove", onMove as EventListener);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove as EventListener);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, []);
  return ref;
}

export default function Hero() {
  const word0 = useRef<HTMLSpanElement>(null);
  const word1 = useRef<HTMLSpanElement>(null);
  const word2 = useRef<HTMLSpanElement>(null);
  const heartRef = useRef<HTMLSpanElement>(null);
  const floatingCircleRef = useRef<HTMLDivElement>(null);
  const revealRef1 = useRef<HTMLDivElement>(null);
  const revealRef2 = useRef<HTMLDivElement>(null);
  const seeWorkRef = useMagnetic();
  const resumeRef = useMagnetic();

  useEffect(() => {
    // Hero word entrance animation
    const words = [word0.current, word1.current, word2.current, heartRef.current];
    words.forEach((w, i) => {
      if (!w) return;
      w.style.transform = "translateY(115%) rotate(6deg)";
      w.style.transition = "transform 1s cubic-bezier(.2,.85,.25,1)";
      setTimeout(() => { w.style.transform = "none"; }, 180 + i * 130);
    });

    // Heart wobble after words reveal
    const heartTimer = setTimeout(() => {
      if (heartRef.current) {
        heartRef.current.style.animation = "wobble 1.2s ease-in-out infinite";
        heartRef.current.style.transformOrigin = "center";
      }
    }, 1400);

    // Word hover effects
    words.forEach((w) => {
      if (!w) return;
      w.addEventListener("mouseenter", () => {
        w.style.transform = "translateY(-10px) rotate(-3deg) scale(1.05)";
      });
      w.addEventListener("mouseleave", () => {
        w.style.transform = "none";
      });
    });

    // Parallax on the floating circle on scroll
    const onScroll = () => {
      const s = window.scrollY;
      if (floatingCircleRef.current) {
        floatingCircleRef.current.style.marginTop = s * 0.12 + "px";
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    // Hero reveal elements animate in on load (they're always in/near the viewport)
    const reveals = [revealRef1.current, revealRef2.current];
    reveals.forEach((el, i) => {
      if (!el) return;
      el.style.opacity = "0";
      el.style.transform = "translateY(46px)";
      el.style.transition =
        "opacity .9s cubic-bezier(.2,.7,.2,1),transform .9s cubic-bezier(.2,.7,.2,1)";
      setTimeout(() => {
        el.style.opacity = "1";
        el.style.transform = "none";
      }, 300 + i * 120);
    });

    return () => {
      clearTimeout(heartTimer);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <header
      id="top"
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "120px clamp(20px,4vw,56px) 80px",
      }}
    >
      {/* Floating red circle */}
      <div
        ref={floatingCircleRef}
        style={{
          display: "none"
        }}
      />

      {/* Main content */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          maxWidth: "1600px",
          width: "100%",
          margin: "0 auto",
        }}
      >
        {/* Status indicator */}
        <div
          ref={revealRef1}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "14px",
            fontFamily: "var(--font-space-mono)",
            fontSize: "clamp(11px,1.1vw,14px)",
            textTransform: "uppercase",
            letterSpacing: "0.14em",
            marginBottom: "clamp(24px,5vh,56px)",
          }}
        >
          <span
            style={{
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              background: "rgb(22,163,74)",
              animation: "blink 1.6s ease infinite",
              flexShrink: 0,
            }}
          />
          <b>Rumesh Babu · UX/UI Designer · Chennai · 11+ yrs</b>
        </div>

        {/* Headline */}
        <h1
          style={{
            fontFamily: "var(--font-bricolage)",
            fontWeight: 800,
            lineHeight: 0.82,
            letterSpacing: "-0.04em",
            fontSize: "clamp(48px,15vw,270px)",
            textTransform: "uppercase",
          }}
        >
          <span
            data-line=""
            style={{ display: "block", overflow: "hidden" }}
          >
            <span
              ref={word0}
              data-word=""
              style={{
                display: "inline-block",
                fontSize: "clamp(48px,15vw,200px)",
              }}
            >
              I&nbsp;design
            </span>
          </span>
          <span
            data-line=""
            style={{ display: "block", overflow: "hidden" }}
          >
            <span
              ref={word1}
              data-word=""
              style={{
                display: "inline-block",
                color: "var(--accent)",
                fontSize: "clamp(48px,15vw,200px)",
              }}
            >
              things&nbsp;people
            </span>
          </span>
          <span
            data-line=""
            style={{ display: "block", overflow: "hidden" }}
          >
            <RotatingWords />
          </span>
        </h1>

        {/* Description + CTAs */}
        <div
          ref={revealRef2}
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "flex-end",
            justifyContent: "space-between",
            gap: "24px",
            marginTop: "clamp(32px,6vh,64px)",
          }}
        >
          <p
            style={{
              maxWidth: "600px",
              fontSize: "clamp(16px,1.5vw,22px)",
              lineHeight: 1.45,
              fontFamily: "var(--font-space-grotesk)",
              width: "100%",
            }}
          >
            I design mobile &amp; SaaS products that users love — 11+ years
            turning complex systems into things people genuinely enjoy.
          </p>

          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <a
              ref={seeWorkRef as React.RefObject<HTMLAnchorElement>}
              href="#work"
              data-magnetic=""
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "12px",
                background: "var(--ink)",
                color: "var(--bg)",
                fontFamily: "var(--font-space-mono)",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                fontSize: "13px",
                padding: "18px 26px",
                borderRadius: "100px",
              }}
            >
              See the work
              <span style={{ fontSize: "18px" }}>↓</span>
            </a>
            <a
              ref={resumeRef as React.RefObject<HTMLAnchorElement>}
              href="/assets/Rumesh-Babu-Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              data-magnetic=""
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "12px",
                border: "2px solid var(--ink)",
                fontFamily: "var(--font-space-mono)",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                fontSize: "13px",
                padding: "18px 26px",
                borderRadius: "100px",
              }}
            >
              Résumé ↗
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        style={{
          position: "absolute",
          bottom: "26px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "22px",
          height: "38px",
          border: "2px solid var(--ink)",
          borderRadius: "14px",
          zIndex: 2,
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "6px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "4px",
            height: "8px",
            borderRadius: "2px",
            background: "var(--ink)",
            animation: "cuedot 1.6s infinite",
          }}
        />
      </div>
    </header>
  );
}
