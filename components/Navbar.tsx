"use client";

import { useEffect, useRef, useState } from "react";
import ContactModal from "./ContactModal";

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
    const onLeave = () => {
      el.style.transform = "";
    };
    el.addEventListener("mousemove", onMove as EventListener);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove as EventListener);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, []);
  return ref;
}

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
}

function NavLink({ href, children, onClick }: NavLinkProps) {
  const ref = useMagnetic();
  const underlineRef = useRef<HTMLSpanElement>(null);

  const onEnter = () => {
    const u = underlineRef.current;
    if (u) {
      u.style.transformOrigin = "left";
      u.style.transform = "scaleX(1)";
    }
  };
  const onLeave = () => {
    const u = underlineRef.current;
    if (u) {
      u.style.transformOrigin = "right";
      u.style.transform = "scaleX(0)";
    }
  };

  return (
    <a
      ref={ref as React.RefObject<HTMLAnchorElement>}
      href={href}
      onClick={onClick}
      style={{ display: "inline-block", position: "relative" }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      data-magnetic=""
    >
      {children}
      <span
        ref={underlineRef}
        style={{
          position: "absolute",
          left: 0,
          bottom: "-4px",
          height: "2px",
          width: "100%",
          background: "currentColor",
          transform: "scaleX(0)",
          transformOrigin: "left",
          transition: "transform .35s cubic-bezier(.2,.7,.2,1)",
        }}
      />
    </a>
  );
}

export default function Navbar() {
  const [isDark, setIsDark] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const ctaRef = useMagnetic();

  useEffect(() => {
    try {
      const saved = localStorage.getItem("rb_theme");
      applyMode(saved === "dark");
    } catch {
      applyMode(false);
    }
  }, []);

  // Lock body scroll when mobile menu is open; close when resizing to desktop
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  useEffect(() => {
    const mq = matchMedia("(max-width:680px)");
    const handler = () => { if (!mq.matches) setMenuOpen(false); };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  function applyMode(dark: boolean) {
    const r = document.documentElement.style;
    if (dark) {
      r.setProperty("--bg", "#120c0b");
      r.setProperty("--ink", "#f4ece2");
      r.setProperty("--card", "#211613");
    } else {
      r.setProperty("--bg", "#f1ece1");
      r.setProperty("--ink", "#17150f");
      r.setProperty("--card", "#f7f3ea");
    }
    setIsDark(dark);
    try {
      localStorage.setItem("rb_theme", dark ? "dark" : "light");
    } catch {}
  }

  const toggleTheme = () => applyMode(!isDark);
  const closeMenu = () => setMenuOpen(false);

  const themeToggle = (
    <button
      onClick={toggleTheme}
      aria-label="Toggle day / night"
      style={{
        position: "relative",
        width: "44px",
        height: "20px",
        border: "1.5px solid currentColor",
        background: "none",
        color: "inherit",
        borderRadius: "100px",
        cursor: "pointer",
        padding: 0,
        flexShrink: 0,
        alignSelf: "center",
      }}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        style={{
          position: "absolute",
          top: "50%",
          left: "5px",
          transform: "translateY(-50%)",
          width: "9px",
          height: "9px",
          transition: "opacity .3s",
          opacity: isDark ? 0.4 : 1,
        }}
      >
        <circle cx="12" cy="12" r="4.5" />
        <path d="M12 1.5v3M12 19.5v3M4 4l2 2M18 18l2 2M1.5 12h3M19.5 12h3M4 20l2-2M18 6l2-2" />
      </svg>
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{
          position: "absolute",
          top: "50%",
          right: "5px",
          transform: "translateY(-50%)",
          width: "8.5px",
          height: "8.5px",
          transition: "opacity .3s",
          opacity: isDark ? 1 : 0.4,
        }}
      >
        <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
      </svg>
      <span
        style={{
          position: "absolute",
          top: "1.5px",
          left: "1.5px",
          width: "15px",
          height: "15px",
          borderRadius: "50%",
          background: "currentColor",
          transition: "transform .38s cubic-bezier(.2,.8,.25,1)",
          transform: isDark ? "translateX(24px)" : "translateX(0)",
        }}
      />
    </button>
  );

  return (
    <>
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          zIndex: 900,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "18px clamp(16px,4vw,56px)",
          mixBlendMode: "difference",
          color: "#fff",
        }}
      >
        {/* Logo */}
        <a
          href="#top"
          style={{
            fontFamily: "'Bricolage Grotesque'",
            fontWeight: 800,
            fontSize: "clamp(18px,5vw,22px)",
            letterSpacing: "-0.02em",
            display: "inline-block",
          }}
        >
          Eleven°
        </a>

        {/* Right side */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "clamp(9px,2vw,34px)",
            fontFamily: "'Space Mono'",
            fontSize: "clamp(10px,2.6vw,13px)",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
          }}
        >
          {/* Desktop: nav links + CTA — hidden at ≤680px via CSS */}
          <div
            className="nav-desktop-links"
            style={{
              display: "contents",
            }}
          >
            <NavLink href="#about">About</NavLink>
            <NavLink href="#work">Work</NavLink>
            <NavLink href="#experience">Path</NavLink>
            <NavLink href="#contact">Contact</NavLink>

            <button
              ref={ctaRef as React.RefObject<HTMLButtonElement>}
              data-magnetic=""
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                padding: "10px 18px",
                marginLeft: "8px",
                border: "none",
                borderRadius: "999px",
                background: "#ff8a00",
                color: "#fff",
                fontFamily: "'Space Mono'",
                fontSize: "12px",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                cursor: "pointer",
                transition: "all .25s ease",
                boxShadow: "0 8px 24px rgba(255,138,0,.25)",
              }}
              onClick={() => setModalOpen(true)}
              onMouseOver={(e) => {
                (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-2px)";
                (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 14px 30px rgba(255,138,0,.35)";
              }}
              onMouseOut={(e) => {
                (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
                (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 8px 24px rgba(255,138,0,.25)";
              }}
            >
              Let&apos;s Build Together →
            </button>
          </div>

          {/* Theme toggle — always visible */}
          {themeToggle}

          {/* Hamburger — visible at ≤680px via CSS */}
          <button
            className="nav-hamburger"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            style={{
              background: "none",
              border: "1.5px solid currentColor",
              color: "inherit",
              cursor: "pointer",
              padding: "3px 10px",
              borderRadius: "6px",
            }}
          >
            <span
              style={{
                display: "block",
                width: "18px",
                height: "1.5px",
                background: "currentColor",
                transition: "transform .3s cubic-bezier(.2,.7,.2,1)",
                transform: menuOpen ? "translateY(4.5px) rotate(45deg)" : "none",
              }}
            />
            <span
              style={{
                display: "block",
                width: "18px",
                height: "1.5px",
                background: "currentColor",
                transition: "opacity .3s",
                opacity: menuOpen ? 0 : 1,
              }}
            />
            <span
              style={{
                display: "block",
                width: "18px",
                height: "1.5px",
                background: "currentColor",
                transition: "transform .3s cubic-bezier(.2,.7,.2,1)",
                transform: menuOpen ? "translateY(-4.5px) rotate(-45deg)" : "none",
              }}
            />
          </button>
        </div>
      </nav>

      <ContactModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />

      {/* Mobile menu overlay — sibling to <nav> to avoid mix-blend-mode inheritance */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 800,
          background: "var(--bg)",
          color: "var(--ink)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "36px",
          fontFamily: "'Space Mono'",
          fontSize: "clamp(20px,5vw,28px)",
          textTransform: "uppercase",
          letterSpacing: ".08em",
          pointerEvents: menuOpen ? "all" : "none",
          opacity: menuOpen ? 1 : 0,
          transition: "opacity .3s cubic-bezier(.2,.7,.2,1)",
        }}
      >
        <a href="#about" onClick={closeMenu}>About</a>
        <a href="#work" onClick={closeMenu}>Work</a>
        <a href="#experience" onClick={closeMenu}>Path</a>
        <a href="#contact" onClick={closeMenu}>Contact</a>
        <a
          href="#"
          style={{
            marginTop: "8px",
            display: "inline-flex",
            alignItems: "center",
            gap: "10px",
            padding: "16px 28px",
            borderRadius: "999px",
            background: "#ff8a00",
            color: "#fff",
            fontFamily: "'Space Mono'",
            fontSize: "13px",
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: ".08em",
          }}
          onClick={(e) => { e.preventDefault(); closeMenu(); setModalOpen(true); }}
        >
          Let&apos;s Build Together →
        </a>
      </div>
    </>
  );
}
