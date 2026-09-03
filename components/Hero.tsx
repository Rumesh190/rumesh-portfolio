"use client";

import { useEffect, useRef } from "react";
import { HeroActions } from "./HeroClient";
import RotatingWords from "./RotatingWords";

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero || matchMedia("(pointer: coarse)").matches || matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const onMove = (event: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const bounds = hero.getBoundingClientRect();
        const x = Math.min(1, Math.max(0, (event.clientX - bounds.left) / bounds.width));
        const y = Math.min(1, Math.max(0, (event.clientY - bounds.top) / bounds.height));
        const dx = x - .5;
        const dy = y - .5;
        hero.style.setProperty("--hero-pointer-x", `${x * 100}%`);
        hero.style.setProperty("--hero-pointer-y", `${y * 100}%`);
        hero.style.setProperty("--hero-line-x", `${dx * 18}px`);
        hero.style.setProperty("--hero-line-y", `${dy * 10}px`);
        hero.style.setProperty("--hero-line-tilt", `${dx * .8}deg`);
        hero.style.setProperty("--hero-line-two-x", `${dx * -10}px`);
        hero.style.setProperty("--hero-line-two-y", `${dy * -4.5}px`);
        hero.style.setProperty("--hero-line-two-tilt", `${dx * -.48}deg`);
        hero.style.setProperty("--hero-line-three-x", `${dx * 5.5}px`);
        hero.style.setProperty("--hero-line-three-y", `${dy * 2.5}px`);
        hero.style.setProperty("--hero-line-three-tilt", `${dx * .28}deg`);
        hero.style.setProperty("--hero-glow-opacity", "1");
      });
    };
    const onLeave = () => {
      cancelAnimationFrame(frame);
      hero.style.setProperty("--hero-line-x", "0px");
      hero.style.setProperty("--hero-line-y", "0px");
      hero.style.setProperty("--hero-line-tilt", "0deg");
      hero.style.setProperty("--hero-line-two-x", "0px");
      hero.style.setProperty("--hero-line-two-y", "0px");
      hero.style.setProperty("--hero-line-two-tilt", "0deg");
      hero.style.setProperty("--hero-line-three-x", "0px");
      hero.style.setProperty("--hero-line-three-y", "0px");
      hero.style.setProperty("--hero-line-three-tilt", "0deg");
      hero.style.setProperty("--hero-glow-opacity", "0");
    };

    hero.addEventListener("pointermove", onMove);
    hero.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(frame);
      hero.removeEventListener("pointermove", onMove);
      hero.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <section ref={heroRef} id="top" className="intelligence-hero page-section" aria-labelledby="hero-title">
      <div className="intelligence-hero__aurora" aria-hidden="true">
        <span className="intelligence-hero__blade intelligence-hero__blade--one" />
        <span className="intelligence-hero__blade intelligence-hero__blade--two" />
        <span className="intelligence-hero__blade intelligence-hero__blade--three" />
        <span className="intelligence-hero__blade intelligence-hero__blade--four" />
      </div>
      <div className="intelligence-hero__shade" aria-hidden="true" />
      <div className="intelligence-hero__grain" aria-hidden="true" />
      <div className="intelligence-hero__pointer-glow" aria-hidden="true" />

      <div className="intelligence-hero__nav-row" aria-hidden="true" />

      <div className="intelligence-hero__content">
        <div className="intelligence-trust hero-enter" style={{ "--enter-delay": ".05s" } as React.CSSProperties}>
          <span className="intelligence-trust__status" aria-hidden="true" />
          <span className="intelligence-trust__pill">
            Rumesh Babu · Full-Stack Product Developer · Chennai
            <span>11+ years of product experience</span>
          </span>
        </div>

        <h1 id="hero-title" className="intelligence-hero__headline" aria-label="I build digital products that work, scale, ship, perform and grow">
          <span>I Build Digital</span>
          <span>Products</span>
          <span>That <RotatingWords /></span>
        </h1>

        <div className="hero-editorial__support">
          <div className="intelligence-hero__intro hero-enter" style={{ "--enter-delay": ".28s" } as React.CSSProperties}>
            <span>↗ Product to Production</span>
            <p>
              From idea to production — I design and build modern SaaS, web applications
              and internal tools across frontend, backend, database and deployment.
            </p>
          </div>
        </div>

        <HeroActions />
      </div>
    </section>
  );
}
