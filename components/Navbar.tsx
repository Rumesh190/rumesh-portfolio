"use client";

import { useEffect, useRef, useState } from "react";
import ContactModal from "./ContactModal";

const LINKS = [
  { href: "#top", label: "Home", id: "top" },
  { href: "#about", label: "About", id: "about" },
  { href: "#work", label: "Work", id: "work" },
  { href: "#expertise", label: "Expertise", id: "expertise" },
  { href: "#experience", label: "Process", id: "experience" },
  { href: "#contact", label: "Contact", id: "contact" },
] as const;

type PortfolioTheme = "red" | "black";

function NavLink({ href, active, children, onClick }: {
  href: string;
  active?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <a className={`original-nav__link${active ? " is-active" : ""}`} href={href} onClick={onClick} data-magnetic="">
      {children}<span aria-hidden="true" />
    </a>
  );
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [activeId, setActiveId] = useState("top");
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState<PortfolioTheme>("red");
  const [themeOpen, setThemeOpen] = useState(false);
  const themeControlRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const current = document.documentElement.dataset.theme;
    const frame = requestAnimationFrame(() => {
      if (current === "red" || current === "black") setTheme(current);
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (!themeOpen) return;
    const closeOnOutsideClick = (event: MouseEvent) => {
      if (!themeControlRef.current?.contains(event.target as Node)) setThemeOpen(false);
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setThemeOpen(false);
    };
    document.addEventListener("mousedown", closeOnOutsideClick);
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("mousedown", closeOnOutsideClick);
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [themeOpen]);

  useEffect(() => {
    const updateScrolled = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", updateScrolled, { passive: true });
    updateScrolled();
    return () => window.removeEventListener("scroll", updateScrolled);
  }, []);

  useEffect(() => {
    // The original nav follows the visible portfolio section.
    const sections = LINKS.map(({ id }) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActiveId(visible.target.id);
    }, { rootMargin: "-25% 0px -60%", threshold: [0, .2, .6] });
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const openEnquiry = () => setModalOpen(true);
    window.addEventListener("open-enquiry", openEnquiry);
    return () => window.removeEventListener("open-enquiry", openEnquiry);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    const media = matchMedia("(min-width: 681px)");
    const closeOnDesktop = () => { if (media.matches) setMenuOpen(false); };
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === "Escape") setMenuOpen(false); };
    media.addEventListener("change", closeOnDesktop);
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = "";
      media.removeEventListener("change", closeOnDesktop);
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);
  const openModal = () => { closeMenu(); setModalOpen(true); };
  const selectTheme = (nextTheme: PortfolioTheme) => {
    document.documentElement.setAttribute("data-theme", nextTheme);
    localStorage.setItem("portfolio-theme", nextTheme);
    setTheme(nextTheme);
    setThemeOpen(false);
  };

  const themeIcon = (
    <svg className="original-nav__theme-icon" viewBox="0 0 20 20" aria-hidden="true">
      <circle cx="10" cy="10" r="7" />
      <path d="M10 3a7 7 0 0 1 0 14Z" />
    </svg>
  );

  return (
    <>
      <nav className={`original-nav${scrolled ? " is-scrolled" : ""}`} aria-label="Primary navigation">
        <div className="original-nav__inner">
          <div className="original-nav__brand">
            <a className="original-nav__logo" href="#top">Eleven°</a>
            <span className="original-nav__divider" aria-hidden="true" />
          </div>
          <div className="original-nav__desktop">
            {LINKS.map((link) => <NavLink href={link.href} active={activeId === link.id} key={link.id}>{link.label}</NavLink>)}
          </div>
          <div className="original-nav__right">
            <div className="original-nav__theme-control" ref={themeControlRef}>
              <button className="original-nav__theme-button" type="button" onClick={() => setThemeOpen((open) => !open)} aria-expanded={themeOpen} aria-haspopup="menu">
                <span>Theme</span>{themeIcon}
              </button>
              <div className={`original-nav__theme-popover${themeOpen ? " is-open" : ""}`} role="menu" aria-label="Portfolio theme">
                <span>Theme</span>
                {(["red", "black"] as const).map((option) => (
                  <button type="button" role="menuitemradio" aria-checked={theme === option} onClick={() => selectTheme(option)} key={option}>
                    <i className={theme === option ? "is-selected" : ""} aria-hidden="true" />{option}
                  </button>
                ))}
              </div>
            </div>
            <button className="original-nav__cta" type="button" onClick={openModal}>
              <span>Let&apos;s talk</span><span className="original-nav__cta-arrow" aria-hidden="true">↗</span>
            </button>
            <button className="original-nav__menu" type="button" onClick={() => setMenuOpen((open) => !open)} aria-expanded={menuOpen} aria-label={menuOpen ? "Close menu" : "Open menu"}>
              <span /><span /><span />
            </button>
          </div>
        </div>
      </nav>

      <div className={`original-nav__overlay${menuOpen ? " is-open" : ""}`} aria-hidden={!menuOpen}>
        {LINKS.map((link) => <a href={link.href} onClick={closeMenu} key={link.id}>{link.label}</a>)}
        <div className="original-nav__mobile-theme" aria-label="Portfolio theme">
          <span>Theme</span>
          {(["red", "black"] as const).map((option) => (
            <button className={theme === option ? "is-selected" : ""} type="button" onClick={() => selectTheme(option)} key={option}>{option}</button>
          ))}
        </div>
        <button type="button" onClick={openModal}>Let&apos;s talk</button>
      </div>
      <ContactModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
