"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Expertise from "./Expertise";
import Projects from "./Projects";
import SectionLabel from "./SectionLabel";

export default function About() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    // Reveal animation — identical to original initReveal
    const els = root.querySelectorAll<HTMLElement>("[data-reveal]");
    els.forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(46px)";
      el.style.transition = "opacity .9s cubic-bezier(.2,.7,.2,1),transform .9s cubic-bezier(.2,.7,.2,1)";
    });
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const t = e.target as HTMLElement;
            t.style.opacity = "1";
            t.style.transform = "none";
            io.unobserve(t);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );
    els.forEach((el) => io.observe(el));

    // Count-up — identical to original initCounters
    const counters = root.querySelectorAll<HTMLElement>("[data-count]");
    const cio = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const el = e.target as HTMLElement;
            const to = parseInt(el.getAttribute("data-to") || "0", 10);
            const suffix = (el.textContent || "").replace(/[0-9]/g, "");
            let n = 0;
            const inc = Math.max(1, Math.ceil(to / 40));
            const step = () => {
              n += inc;
              if (n >= to) { el.textContent = to + suffix; }
              else { el.textContent = n + suffix; requestAnimationFrame(step); }
            };
            step();
            cio.unobserve(el);
          }
        });
      },
      { threshold: 0.6 }
    );
    counters.forEach((el) => cio.observe(el));

    // Toolbox — identical to original buildTools
    const sets: Record<string, string[]> = {
      craft: ["Product Strategy","UX Research","User Flows","Information Architecture","Wireframing","Figma","FigJam","Prototyping","Interaction Design","Design Systems","Accessibility","Developer Handoff"],
      ai: ["HTML5","CSS3","JavaScript","TypeScript","React.js","Next.js","Tailwind CSS","Responsive Design","State Management","REST Integration","Performance","Testing"],
      craft2: ["Java","Spring Boot","Spring Security","REST APIs","Microservices","Hibernate / JPA","PostgreSQL","MySQL","Redis","Kafka","JWT","Docker","GitHub Actions","CI / CD","AWS","Vercel","Nginx","Webhooks","Razorpay","Monitoring"],
    };
    const speeds: Record<string, number> = { craft: 96, craft2: 112, ai: 104 };

    Object.keys(sets).forEach((key) => {
      const strip = root.querySelector<HTMLElement>(`[data-toolstrip="${key}"]`);
      if (!strip || strip.childElementCount) return;
      const ai = key === "ai";
      const track = document.createElement("div");
      track.style.cssText = `display:flex;align-items:center;width:max-content;gap:0;animation:marq ${speeds[key]}s linear infinite${key === "craft2" ? " reverse" : ""};will-change:transform`;
      const items = [...sets[key], ...sets[key]];
      items.forEach((name) => {
        const w = document.createElement("span");
        w.setAttribute("data-toolword", ai ? "ai" : "");
        w.textContent = name;
        w.style.cssText = `font-family:var(--font-display);font-weight:800;text-transform:uppercase;letter-spacing:-.03em;line-height:1;font-size:clamp(32px,5.5vw,90px);padding:0 clamp(20px,2.6vw,52px);white-space:nowrap;cursor:default;transition:color .3s,-webkit-text-stroke-color .3s,transform .3s`;
        if (ai) { w.style.color = "var(--accent)"; }
        else { w.style.color = "transparent"; (w.style as CSSStyleDeclaration & { webkitTextStroke: string }).webkitTextStroke = "2px var(--ink)"; }
        const sep = document.createElement("span");
        sep.textContent = "✦";
        sep.style.cssText = `font-size:clamp(20px,2.4vw,44px);color:var(--accent);opacity:${ai ? ".5" : ".7"};flex-shrink:0`;
        track.appendChild(w);
        track.appendChild(sep);
      });
      strip.appendChild(track);
      strip.addEventListener("mouseenter", () => { track.style.animationPlayState = "paused"; });
      strip.addEventListener("mouseleave", () => { track.style.animationPlayState = "running"; });
    });

    root.querySelectorAll<HTMLElement>("[data-toolword]").forEach((w) => {
      const ai = w.getAttribute("data-toolword") === "ai";
      w.addEventListener("mouseenter", () => {
        w.style.transform = "translateY(-6px) scale(1.04)";
        w.style.color = ai ? "#fff" : "var(--ink)";
      });
      w.addEventListener("mouseleave", () => {
        w.style.transform = "";
        w.style.color = ai ? "var(--accent)" : "transparent";
      });
    });

    return () => { io.disconnect(); cio.disconnect(); };
  }, []);

  return (
    <div ref={rootRef}>
      {/* ABOUT */}
      <section id="about" className="about-rework page-section">
        <div className="about-rework__ambient" aria-hidden="true" />
        <SectionLabel index="01">About me</SectionLabel>
        <div className="about-rework__inner">
          <div className="about-rework__layout">
            <div className="about-rework__portrait" data-reveal="">
              <Image
                src="/assets/image-1.png"
                alt="Rumesh Ravi"
                fill
                priority={false}
                style={{ objectFit: "cover", objectPosition: "50% 40%" }}
                sizes="(max-width: 760px) calc(100vw - 40px), 42vw"
              />
            </div>

            <div className="about-rework__content">
              <h2 className="about-rework__headline section-heading" data-reveal="">
                <span>I don&apos;t just</span>
                <span>design products.</span>
                <span><em>I build</em> them.</span>
              </h2>

              <p className="about-rework__support section-subheading" data-reveal="">
                <span aria-hidden="true" />From interface to infrastructure.
              </p>

              <p className="about-rework__copy" data-reveal="">
                I work across product thinking, frontend, backend, databases and deployment to turn ideas into real, usable software. My design background helps me obsess over the experience; my development work lets me take that experience all the way to production.
              </p>

              <div className="about-rework__capabilities" data-reveal="">
                <h3>What I build with</h3>
                <div className="about-rework__card-grid">
                  {[
                    { title: "Product", items: ["Strategy", "UX Design", "Systems Thinking"], path: "M4 7h16M7 4v16m10-16v16M4 17h16" },
                    { title: "Frontend", items: ["React", "Next.js", "TypeScript"], path: "m8 9-4 3 4 3m8-6 4 3-4 3m-3-9-2 12" },
                    { title: "Backend", items: ["Node.js", "Java", "PostgreSQL"], path: "M5 6c0-2 14-2 14 0s-14 2-14 0v12c0 2 14 2 14 0V6M5 12c0 2 14 2 14 0" },
                    { title: "Ship", items: ["Git", "Vercel", "CI / CD"], path: "M12 3v12m0 0 4-4m-4 4-4-4M5 19h14" },
                  ].map((capability) => (
                    <article className="about-rework__card" key={capability.title}>
                      <svg viewBox="0 0 24 24" aria-hidden="true">
                        <path d={capability.path} />
                        <circle cx="19" cy="5" r="1.5" />
                      </svg>
                      <h4>{capability.title}</h4>
                      <ul>{capability.items.map((item) => <li key={item}>{item}</li>)}</ul>
                    </article>
                  ))}
                </div>
              </div>

              <div className="about-rework__stats" data-reveal="">
                {[
                  { value: "11", plus: true, label: <>Years<br />building products</> },
                  { value: "3", plus: false, label: <>Product<br />companies</> },
                  { value: "10", plus: true, label: <>Products<br />shipped</> },
                ].map((stat) => (
                  <div className="about-rework__stat" key={stat.value + String(stat.plus)}>
                    <strong><span data-count="" data-to={stat.value}>{stat.value}</span>{stat.plus && <em>+</em>}</strong>
                    <span>{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Projects />

      <div className="expertise-chapter">
        <Expertise />
      </div>

      {/* TOOLBOX */}
      <section style={{padding:"clamp(64px,8vh,96px) var(--page-gutter) clamp(70px,10vh,130px)",overflow:"hidden"}}>
        <div data-reveal="" style={{width:"min(100%, var(--section-shell-width))",margin:"0 auto",marginBottom:"clamp(34px,6vh,68px)"}}>
          <span className="section-kicker"><span aria-hidden="true">/</span> 03 — Expertise · Toolbox</span>
          <h2 className="section-heading" style={{fontFamily:"var(--font-display)",fontWeight:800,lineHeight:.9,letterSpacing:"-.03em",textTransform:"uppercase",marginTop:"14px"}}>
            <span style={{color:"var(--text-primary)"}}>FULL-STACK </span><span style={{color:"var(--accent)"}}>TOOLBOX</span>
          </h2>
          <p className="section-subheading">
            The development and design stack I use to take products from<span style={{color:"var(--accent)"}}> idea to production.</span>
          </p>
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:"clamp(6px,1.4vw,20px)",marginRight:"calc(var(--page-gutter) * -1)",marginLeft:"calc(var(--page-gutter) * -1)"}}>
          <div data-toolstrip="craft" style={{transform:"rotate(-2.2deg)",margin:"0 -4vw",width:"108vw"}} />
          <div data-toolstrip="ai" style={{transform:"rotate(1.6deg)",margin:"0 -4vw",width:"108vw"}} />
          <div data-toolstrip="craft2" style={{transform:"rotate(-1.2deg)",margin:"0 -4vw",width:"108vw"}} />
        </div>
      </section>

    </div>
  );
}
