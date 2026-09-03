"use client";

import { useEffect, useRef, useState } from "react";

const STATS = [
  { icon: "+", target: 11, suffix: "+", decimals: 0, label: "Years Experience" },
  { icon: "#", target: 3, suffix: "", decimals: 0, label: "Companies" },
  { icon: "↗", target: 10, suffix: "+", decimals: 0, label: "Products Shipped" },
] as const;

export function HeroActions() {
  return (
    <div className="intelligence-hero__actions hero-enter" style={{ "--enter-delay": ".4s" } as React.CSSProperties}>
      <a className="intelligence-hero__cta intelligence-hero__cta--work" href="#work">See Work <span aria-hidden="true">↓</span></a>
      <button
        type="button"
        className="intelligence-hero__cta"
        onClick={() => window.dispatchEvent(new Event("open-enquiry"))}
      >
        Get Started
      </button>
    </div>
  );
}

export function HeroStats() {
  const statsRef = useRef<HTMLDivElement>(null);
  const [values, setValues] = useState(() => STATS.map((stat) => (0).toFixed(stat.decimals)));

  useEffect(() => {
    const root = statsRef.current;
    if (!root) return;

    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const timeouts: number[] = [];
    const frames: number[] = [];
    let started = false;

    const start = () => {
      if (started) return;
      started = true;
      if (media.matches) {
        setValues(STATS.map((stat) => stat.target.toFixed(stat.decimals)));
        return;
      }

      STATS.forEach((stat, index) => {
        timeouts.push(window.setTimeout(() => {
          const beganAt = performance.now();
          const duration = 1500 + index * 80;
          const tick = (now: number) => {
            const progress = Math.min((now - beganAt) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setValues((current) => current.map((value, valueIndex) =>
              valueIndex === index ? (stat.target * eased).toFixed(stat.decimals) : value
            ));
            if (progress < 1) frames.push(requestAnimationFrame(tick));
          };
          frames.push(requestAnimationFrame(tick));
        }, 480 + index * 90));
      });
    };

    const observer = "IntersectionObserver" in window
      ? new IntersectionObserver((entries) => {
          if (entries.some((entry) => entry.isIntersecting)) {
            start();
            observer?.disconnect();
          }
        }, { threshold: 0.25 })
      : null;

    if (observer) observer.observe(root);
    else start();

    return () => {
      observer?.disconnect();
      timeouts.forEach(clearTimeout);
      frames.forEach(cancelAnimationFrame);
    };
  }, []);

  return (
    <div ref={statsRef} className="intelligence-stats" aria-label="Portfolio highlights">
      {STATS.map((stat, index) => (
        <div className="intelligence-stat hero-enter" style={{ "--enter-delay": `${0.5 + index * 0.08}s` } as React.CSSProperties} key={stat.label}>
          <span className="intelligence-stat__icon" aria-hidden="true">{stat.icon}</span>
          <strong>{values[index]}{stat.suffix}</strong>
          <span>{stat.label}</span>
        </div>
      ))}
    </div>
  );
}
