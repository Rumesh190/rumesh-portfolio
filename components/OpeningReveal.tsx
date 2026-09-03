"use client";

import { useEffect, useRef, useState } from "react";

export default function OpeningReveal() {
  const [revealed, setRevealed] = useState(false);
  const [hidden, setHidden] = useState(false);
  const touchStart = useRef<number | null>(null);
  const siteIsOpen = useRef(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setHidden(true);
      return;
    }

    window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}`);
    const resetToHero = () => {
      const root = document.documentElement;
      const previousBehavior = root.style.scrollBehavior;
      root.style.scrollBehavior = "auto";
      window.scrollTo(0, 0);
      root.style.scrollBehavior = previousBehavior;
    };
    resetToHero();
    document.body.style.overflow = "hidden";
    let hasMovedIntoSite = false;
    let canClose = false;
    let downwardIntent = 0;
    let unlockTimer: number | undefined;
    let closeReadyTimer: number | undefined;

    const openSite = () => {
      if (siteIsOpen.current) return;
      if (unlockTimer) window.clearTimeout(unlockTimer);
      if (closeReadyTimer) window.clearTimeout(closeReadyTimer);
      window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}`);
      resetToHero();
      siteIsOpen.current = true;
      canClose = false;
      setRevealed(true);
      unlockTimer = window.setTimeout(() => {
        resetToHero();
        document.body.style.overflow = "";
      }, 940);
      closeReadyTimer = window.setTimeout(() => {
        canClose = true;
      }, 1450);
    };
    const closeSite = () => {
      if (!siteIsOpen.current) return;
      if (unlockTimer) window.clearTimeout(unlockTimer);
      if (closeReadyTimer) window.clearTimeout(closeReadyTimer);
      siteIsOpen.current = false;
      canClose = false;
      hasMovedIntoSite = false;
      document.body.style.overflow = "hidden";
      resetToHero();
      setRevealed(false);
    };
    const onWheel = (event: WheelEvent) => {
      if (!siteIsOpen.current) {
        if (event.deltaY <= 0) {
          downwardIntent = 0;
          return;
        }
        event.preventDefault();
        downwardIntent += event.deltaY;
        if (downwardIntent >= 2) openSite();
      } else if (canClose && event.deltaY < 0 && window.scrollY <= 2) {
        event.preventDefault();
        closeSite();
      }
    };
    const onScroll = () => {
      if (!siteIsOpen.current || !canClose) return;
      if (window.scrollY > 24) {
        hasMovedIntoSite = true;
        return;
      }
      if (hasMovedIntoSite && window.scrollY <= 1) closeSite();
    };
    const onTouchStart = (event: TouchEvent) => { touchStart.current = event.touches[0]?.clientY ?? null; };
    const onTouchMove = (event: TouchEvent) => {
      if (touchStart.current === null) return;
      const movement = (event.touches[0]?.clientY ?? touchStart.current) - touchStart.current;
      if (Math.abs(movement) < 10) return;
      if (!siteIsOpen.current) {
        event.preventDefault();
        openSite();
      } else if (canClose && movement > 0 && window.scrollY <= 2) {
        event.preventDefault();
        closeSite();
      }
      touchStart.current = null;
    };
    const onKey = (event: KeyboardEvent) => {
      if (!siteIsOpen.current && ["ArrowDown","PageDown"," ","Enter"].includes(event.key)) {
        event.preventDefault();
        openSite();
      } else if (siteIsOpen.current && canClose && window.scrollY <= 2 && ["ArrowUp","PageUp","Home"].includes(event.key)) {
        event.preventDefault();
        closeSite();
      }
    };

    document.addEventListener("wheel", onWheel, { passive:false, capture:true });
    window.addEventListener("touchstart", onTouchStart, { passive:true });
    window.addEventListener("touchmove", onTouchMove, { passive:false });
    window.addEventListener("keydown", onKey);
    window.addEventListener("scroll", onScroll, { passive:true });
    return () => {
      if (unlockTimer) window.clearTimeout(unlockTimer);
      if (closeReadyTimer) window.clearTimeout(closeReadyTimer);
      document.body.style.overflow = "";
      document.removeEventListener("wheel", onWheel, { capture:true });
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  if (hidden) return null;

  return <div className={`opening-reveal${revealed ? " is-revealed" : ""}`} aria-label="Scroll to enter the portfolio">
    <div className="opening-reveal__half opening-reveal__half--top">
      <div className="intelligence-hero__aurora" aria-hidden="true">
        <span className="intelligence-hero__blade intelligence-hero__blade--one" />
        <span className="intelligence-hero__blade intelligence-hero__blade--two" />
        <span className="intelligence-hero__blade intelligence-hero__blade--three" />
        <span className="intelligence-hero__blade intelligence-hero__blade--four" />
      </div>
      <p className="opening-reveal__name">Rumesh <span>Ravi</span></p>
    </div>
    <div className="opening-reveal__half opening-reveal__half--bottom">
      <div className="intelligence-hero__aurora" aria-hidden="true">
        <span className="intelligence-hero__blade intelligence-hero__blade--one" />
        <span className="intelligence-hero__blade intelligence-hero__blade--two" />
        <span className="intelligence-hero__blade intelligence-hero__blade--three" />
        <span className="intelligence-hero__blade intelligence-hero__blade--four" />
      </div>
      <p className="opening-reveal__name">Rumesh <span>Ravi</span></p>
      <div className="opening-reveal__badge" aria-hidden="true">
        <svg viewBox="0 0 100 100"><defs><path id="opening-circle" d="M50 50m-37 0a37 37 0 1 1 74 0a37 37 0 1 1-74 0"/></defs><text><textPath href="#opening-circle">SCROLL · SCROLL · SCROLL · </textPath></text></svg>
        <span>↓</span>
      </div>
    </div>
    <span className="opening-reveal__cue">Scroll to enter</span>
    <style jsx>{`
      .opening-reveal{position:fixed;z-index:20000;inset:0;overflow:hidden;overscroll-behavior:none;background:transparent;color:#080708;isolation:isolate}
      .opening-reveal__half{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;overflow:hidden;background:radial-gradient(circle at 72% 48%,rgba(122,0,8,.13),transparent 34%),radial-gradient(circle at 18% 72%,rgba(78,0,5,.12),transparent 30%),#050505;will-change:transform;transition:transform .68s cubic-bezier(.32,.72,0,1)}
      .opening-reveal__half:after{position:absolute;z-index:1;inset:0;background:radial-gradient(ellipse at 50% 48%,rgba(5,5,5,.28),transparent 42%),linear-gradient(180deg,rgba(5,5,5,.28),transparent 34%,transparent 70%,rgba(5,5,5,.34));content:"";pointer-events:none}
      .opening-reveal__half--top{clip-path:inset(0 0 50% 0)}
      .opening-reveal__half--bottom{clip-path:inset(50% 0 0 0)}
      .opening-reveal__name{position:relative;z-index:2;color:var(--text-primary);font:italic 800 clamp(54px,11.5vw,184px)/1 var(--font-display),serif;letter-spacing:-.055em;text-transform:uppercase;text-shadow:0 10px 60px rgba(0,0,0,.4);white-space:nowrap;user-select:none}
      .opening-reveal__name span{color:var(--accent)}
      .opening-reveal__badge{position:absolute;z-index:3;bottom:7vh;left:calc(50% - 50px);width:100px;height:100px;animation:opening-spin 9s linear infinite}
      .opening-reveal__badge svg{width:100%;height:100%;overflow:visible;fill:rgba(244,236,226,.78)}.opening-reveal__badge text{font:600 10px/1 var(--font-body),sans-serif;letter-spacing:3px}.opening-reveal__badge>span{position:absolute;inset:0;display:grid;place-items:center;color:var(--accent);font-size:19px;animation:opening-spin 9s linear infinite reverse}
      .opening-reveal__cue{position:absolute;z-index:4;top:25px;left:50%;color:rgba(244,236,226,.62);font:600 10px/1 var(--font-body),sans-serif;letter-spacing:.25em;text-transform:uppercase;transform:translateX(-50%);transition:opacity .25s ease}
      .opening-reveal.is-revealed{pointer-events:none}.opening-reveal.is-revealed .opening-reveal__half{transition-duration:.86s}.opening-reveal.is-revealed .opening-reveal__half--top{transform:translateY(-100%)}.opening-reveal.is-revealed .opening-reveal__half--bottom{transform:translateY(100%)}.opening-reveal.is-revealed .opening-reveal__cue{opacity:0}
      @keyframes opening-spin{to{transform:rotate(360deg)}}
      @media(max-width:600px){.opening-reveal__name{max-width:calc(100vw - 40px);font-size:clamp(34px,11.5vw,54px);letter-spacing:-.065em}.opening-reveal__badge{bottom:9vh;width:88px;height:88px;left:calc(50% - 44px)}}
    `}</style>
  </div>;
}
