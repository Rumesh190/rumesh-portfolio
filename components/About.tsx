"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

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

    // Capabilities hover — identical to original initCaps
    const rows = root.querySelectorAll<HTMLElement>("[data-caprow]");
    const coarse = matchMedia("(pointer:coarse)").matches;
    if (coarse) {
      rows.forEach((r) => {
        const desc = r.querySelector<HTMLElement>("[data-cap-desc]");
        if (desc) desc.style.opacity = ".8";
      });
    } else {
      rows.forEach((r) => {
        const title = r.querySelector<HTMLElement>("[data-cap-title]");
        const desc = r.querySelector<HTMLElement>("[data-cap-desc]");
        const num = r.querySelector<HTMLElement>("[data-cap-num]");
        r.addEventListener("mouseenter", () => {
          r.style.paddingLeft = "clamp(14px,2.4vw,40px)";
          if (title) { title.style.transform = "translateX(6px)"; title.style.color = "var(--accent)"; }
          if (desc) desc.style.opacity = "1";
          if (num) num.style.opacity = "1";
        });
        r.addEventListener("mouseleave", () => {
          r.style.paddingLeft = "";
          if (title) { title.style.transform = ""; title.style.color = ""; }
          if (desc) desc.style.opacity = ".55";
          if (num) num.style.opacity = ".5";
        });
      });
    }

    // Toolbox — identical to original buildTools
    const sets: Record<string, string[]> = {
      craft: ["Figma","FigJam","Framer","ProtoPie","Spline 3D","Photoshop","Illustrator","After Effects","Zeplin"],
      craft2: ["Wireframes","Motion","Prototyping","Design Ops","Handoff","Accessibility","Systems","Tokens"],
      ai: ["Figma AI","Claude","ChatGPT","Midjourney","v0","Galileo AI","Uizard","Cursor","Runway","Krea"],
    };
    const speeds: Record<string, number> = { craft: 52, craft2: 60, ai: 46 };

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
        w.style.cssText = `font-family:'Bricolage Grotesque';font-weight:800;text-transform:uppercase;letter-spacing:-.03em;line-height:1;font-size:clamp(32px,5.5vw,90px);padding:0 clamp(20px,2.6vw,52px);white-space:nowrap;cursor:default;transition:color .3s,-webkit-text-stroke-color .3s,transform .3s`;
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
      <section id="about" style={{background:"#141210",color:"#f1ece1",padding:"clamp(90px,14vh,180px) clamp(20px,4vw,56px)",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",top:"-40px",right:"-40px",fontFamily:"'Bricolage Grotesque'",fontWeight:800,fontSize:"clamp(80px,15vw,210px)",color:"rgba(255,255,255,.04)",lineHeight:.8,pointerEvents:"none",userSelect:"none"}}>
          HELLO
        </div>
        <div style={{maxWidth:"1500px",margin:"0 auto",position:"relative",zIndex:2}}>
          <span data-reveal="" style={{fontFamily:"'Space Mono'",fontSize:"13px",textTransform:"uppercase",letterSpacing:".1em",opacity:.6,display:"block",marginBottom:"20px"}}>
            / 01 — Who I am
          </span>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(min(100%,300px),1fr))",gap:"clamp(30px,5vw,70px)",alignItems:"center"}}>
            <div data-reveal="" style={{position:"relative"}}>
              <div style={{position:"absolute",inset:"-10% -8%",background:"radial-gradient(circle at 50% 40%,var(--accent),transparent 68%)",filter:"blur(55px)",opacity:.6,zIndex:0,animation:"floaty 8s ease-in-out infinite"}} />
              <div style={{position:"relative",zIndex:2,border:"2px solid rgba(255,255,255,.14)",borderRadius:"24px",overflow:"hidden",aspectRatio:"4/5",boxShadow:"0 34px 70px rgba(0,0,0,.55)"}}>
                <Image src="/assets/image-1.png" alt="Rumesh Ravi" fill style={{objectFit:"cover",objectPosition:"50% 40%"}} sizes="(max-width:768px) 100vw, 40vw" />
              </div>
            </div>
            <div>
              <h2 data-reveal="" style={{fontFamily:"'Bricolage Grotesque'",fontWeight:800,fontSize:"clamp(30px,5vw,72px)",lineHeight:.9,letterSpacing:"-.03em",textTransform:"uppercase",marginBottom:"14px"}}>
                The best part<br />of design
              </h2>
              <p data-reveal="" style={{fontFamily:"'Bricolage Grotesque'",fontWeight:600,fontSize:"clamp(16px,1.9vw,26px)",lineHeight:1.05,letterSpacing:"-.02em",maxWidth:"20ch",marginBottom:"clamp(40px,6vh,80px)"}}>
                is putting myself in<span style={{color:"var(--accent)"}}> someone else&apos;s shoes.</span>
              </p>
              <div style={{display:"flex",flexDirection:"column",gap:"clamp(28px,4vw,48px)"}}>
                <div data-reveal="">
                  <p style={{fontSize:"clamp(16px,1.4vw,19px)",lineHeight:1.6,opacity:.85}}>
                    Eleven years,<span style={{color:"var(--accent)"}}> real products people use every day</span> — not concepts, not dribbble shots. I put myself in the user&apos;s shoes and trust that good ideas plus better design change how things work.
                  </p>
                </div>
                <div data-reveal="">
                  <p style={{fontFamily:"'Space Mono'",fontSize:"12px",letterSpacing:".1em",textTransform:"uppercase",opacity:.6,marginBottom:"16px"}}>
                    Domains I&apos;ve shipped in
                  </p>
                  <div style={{display:"flex",flexWrap:"wrap",gap:"10px"}}>
                    {["SaaS","Customer Service","Cloud Computing","Help Desk","iOS / Android","User Onboarding"].map((tag) => (
                      <span key={tag} data-domain-tag="" style={{border:"1.5px solid rgba(255,255,255,.35)",borderRadius:"100px",padding:"8px 16px",fontSize:"14px",cursor:"default"}}>{tag}</span>
                    ))}
                  </div>
                  <div style={{display:"flex",gap:"36px",marginTop:"44px",flexWrap:"wrap"}}>
                    <div>
                      <div data-count="" data-to="11" style={{fontFamily:"'Bricolage Grotesque'",fontWeight:800,fontSize:"clamp(30px,3.4vw,50px)",color:"var(--accent)",lineHeight:1}}>11+</div>
                      <div style={{fontFamily:"'Space Mono'",fontSize:"12px",textTransform:"uppercase",letterSpacing:".08em",opacity:.6,marginTop:"6px"}}>Years</div>
                    </div>
                    <div>
                      <div data-count="" data-to="3" style={{fontFamily:"'Bricolage Grotesque'",fontWeight:800,fontSize:"clamp(30px,3.4vw,50px)",color:"var(--accent)",lineHeight:1}}>3</div>
                      <div style={{fontFamily:"'Space Mono'",fontSize:"12px",textTransform:"uppercase",letterSpacing:".08em",opacity:.6,marginTop:"6px"}}>Companies</div>
                    </div>
                    <div>
                      <div data-count="" data-to="10" style={{fontFamily:"'Bricolage Grotesque'",fontWeight:800,fontSize:"clamp(30px,3.4vw,50px)",color:"var(--accent)",lineHeight:1}}>10+</div>
                      <div style={{fontFamily:"'Space Mono'",fontSize:"12px",textTransform:"uppercase",letterSpacing:".08em",opacity:.6,marginTop:"6px"}}>Products shipped</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div style={{background:"var(--accent)",color:"var(--bg)",padding:"22px 0",overflow:"hidden",transform:"rotate(-2deg)",margin:"0 -3vw",width:"106vw"}}>
        <div style={{display:"flex",width:"max-content",animation:"marq 26s linear infinite",fontFamily:"'Bricolage Grotesque'",fontWeight:800,fontSize:"clamp(22px,3.6vw,44px)",textTransform:"uppercase",letterSpacing:"-.02em"}}>
          {["UI / UX ✦","Design Systems ✦","User Research ✦","SaaS ✦","Mobile ✦","Product Vision ✦","UI / UX ✦","Design Systems ✦","User Research ✦","SaaS ✦","Mobile ✦","Product Vision ✦"].map((item, i) => (
            <span key={i} style={{padding:"0 30px"}}>{item}</span>
          ))}
        </div>
      </div>

      {/* CAPABILITIES */}
      <section style={{padding:"clamp(80px,12vh,150px) clamp(20px,4vw,56px)"}}>
        <div style={{maxWidth:"1500px",margin:"0 auto"}}>
          <div data-reveal="" style={{marginBottom:"clamp(36px,6vh,72px)"}}>
            <span style={{fontFamily:"'Space Mono'",fontSize:"13px",textTransform:"uppercase",letterSpacing:".1em",opacity:.6}}>/ 02 — Capabilities</span>
            <h2 style={{fontFamily:"'Bricolage Grotesque'",fontWeight:800,fontSize:"clamp(30px,5vw,72px)",lineHeight:.9,letterSpacing:"-.03em",textTransform:"uppercase",marginTop:"14px"}}>
              I can&apos;t do<br />just one thing
            </h2>
            <p style={{fontFamily:"'Bricolage Grotesque'",fontWeight:600,fontSize:"clamp(15px,1.5vw,21px)",opacity:.55,marginTop:"12px"}}>
              so here&apos;s everything I bring to the table&nbsp;
            </p>
          </div>
          <div data-caplist="" style={{borderTop:"1.5px solid var(--ink)"}}>
            {[
              {num:"01",title:"Product Vision",desc:"Defining the vision across key modules and turning fuzzy ideas into shipped features — reading specs and user psychology in equal measure."},
              {num:"02",title:"Design Systems",desc:"Building & scaling the Zoho Design System — the kind of foundation that keeps teams fast and products consistent."},
              {num:"03",title:"Research & Testing",desc:"Concept & usability testing, personas, information architecture — chasing feedback until the model actually works."},
              {num:"04",title:"Interaction Model",desc:"Defining the right interaction model, then evaluating its success — wireframes and prototypes built around customer needs."},
              {num:"05",title:"Strategy & Market",desc:"Competitor analysis, market opportunities, prioritising requirements and building the business case — then mentoring the team to ship it."},
            ].map(({num, title, desc}) => (
              <div key={num} data-caprow="" data-reveal="" style={{position:"relative",display:"flex",flexWrap:"wrap",alignItems:"baseline",gap:"clamp(14px,3vw,44px)",padding:"clamp(24px,3.6vh,44px) clamp(4px,1vw,16px)",borderBottom:"1.5px solid var(--ink)",cursor:"default",transition:"padding .4s cubic-bezier(.2,.8,.25,1)"}}>
                <div style={{display:"flex",alignItems:"baseline",gap:"clamp(14px,1.6vw,26px)",flex:"1 1 300px",minWidth:0}}>
                  <span data-cap-num="" style={{fontFamily:"'Space Mono'",fontSize:"clamp(12px,1vw,14px)",opacity:.5,flexShrink:0}}>{num}</span>
                  <h3 data-cap-title="" style={{fontFamily:"'Bricolage Grotesque'",fontWeight:800,fontSize:"clamp(24px,3.6vw,48px)",letterSpacing:"-.03em",lineHeight:.92,textTransform:"uppercase",transition:"transform .45s cubic-bezier(.2,.8,.25,1),color .35s"}}>{title}</h3>
                </div>
                <p data-cap-desc="" style={{flex:"1 1 320px",fontSize:"clamp(15px,1.15vw,18px)",lineHeight:1.55,opacity:.55,maxWidth:"46ch",transition:"opacity .4s"}}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TOOLBOX */}
      <section style={{padding:"clamp(70px,10vh,130px) 0",overflow:"hidden"}}>
        <div data-reveal="" style={{maxWidth:"1500px",margin:"0 auto",padding:"0 clamp(20px,4vw,56px)",marginBottom:"clamp(34px,6vh,68px)"}}>
          <span style={{fontFamily:"'Space Mono'",fontSize:"13px",textTransform:"uppercase",letterSpacing:".1em",opacity:.6}}>/ 03 — Toolbox</span>
          <h2 style={{fontFamily:"'Bricolage Grotesque'",fontWeight:800,fontSize:"clamp(30px,5vw,72px)",lineHeight:.9,letterSpacing:"-.03em",textTransform:"uppercase",marginTop:"14px"}}>
            DESIGN AI-POWERED
          </h2>
          <p style={{fontFamily:"'Bricolage Grotesque'",fontWeight:600,fontSize:"clamp(15px,1.5vw,21px)",opacity:.55,marginTop:"12px",maxWidth:"56ch"}}>
            not just the exact answer — the<span style={{color:"var(--accent)"}}> best</span> one. AI is baked into how I research, ideate and ship&nbsp;
          </p>
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:"clamp(6px,1.4vw,20px)"}}>
          <div data-toolstrip="craft" style={{transform:"rotate(-2.2deg)",margin:"0 -4vw",width:"108vw"}} />
          <div data-toolstrip="ai" style={{transform:"rotate(1.6deg)",margin:"0 -4vw",width:"108vw"}} />
          <div data-toolstrip="craft2" style={{transform:"rotate(-1.2deg)",margin:"0 -4vw",width:"108vw"}} />
        </div>
      </section>
    </div>
  );
}
