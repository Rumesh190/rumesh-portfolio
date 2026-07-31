"use client";

import { useEffect, useRef } from "react";

const timelineItems = [
  {y:"Dec 2019 → now",r:"UX/UI Designer",o:"Zoho Corporation",d:"Converting ideas into features, defining interaction models, running usability testing, and building the Zoho Design System.",now:true},
  {y:"Jun – Dec 2019",r:"Product Designer",o:"PipeCandy",d:"Startup life: product research, personas, information architecture, wireframes, prototyping and a design system from scratch.",now:false},
  {y:"Apr 2014 – Jun 2019",r:"Senior UX/UI Designer",o:"BORN · TechM XDS",d:"Rough drafts to stakeholders, UX troubleshooting, layout & style standards, and original graphics + eCommerce imaging.",now:false},
];

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Reveal
    const els = section.querySelectorAll<HTMLElement>("[data-reveal]");
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

    // Timeline hover — identical to original initHovers
    section.querySelectorAll<HTMLElement>("[data-timeline] > div").forEach((node) => {
      node.style.transition = "transform .4s cubic-bezier(.2,.7,.2,1)";
      const h = node.querySelector<HTMLElement>("h3");
      node.addEventListener("mouseenter", () => { node.style.transform = "translateX(10px)"; if (h) h.style.color = "var(--accent)"; });
      node.addEventListener("mouseleave", () => { node.style.transform = ""; if (h) h.style.color = ""; });
    });

    return () => io.disconnect();
  }, []);

  return (
    <section id="experience" ref={sectionRef} style={{background:"var(--card)",padding:"clamp(80px,12vh,150px) clamp(20px,4vw,56px)"}}>
      <div style={{maxWidth:"1500px",margin:"0 auto"}}>
        <div data-reveal="" style={{marginBottom:"clamp(40px,7vh,80px)"}}>
          <span style={{fontFamily:"'Space Mono'",fontSize:"13px",textTransform:"uppercase",letterSpacing:".1em",opacity:.6}}>/ 05 — Experience &amp; education</span>
          <h2 style={{fontFamily:"'Bricolage Grotesque'",fontWeight:800,fontSize:"clamp(30px,5vw,72px)",lineHeight:.9,letterSpacing:"-.03em",textTransform:"uppercase",marginTop:"14px"}}>
            The 10-year<br />trail
          </h2>
        </div>
        <div data-timeline="" style={{position:"relative",maxWidth:"1000px",borderLeft:"2px solid var(--ink)",paddingLeft:"clamp(24px,4vw,48px)",display:"flex",flexDirection:"column",gap:"clamp(36px,5vh,58px)"}}>
          {timelineItems.map((it) => (
            <div key={it.y} data-reveal="" style={{position:"relative"}}>
              <span style={{position:"absolute",left:"calc(-1 * clamp(24px,4vw,48px) - 9px)",top:"6px",width:"16px",height:"16px",borderRadius:"50%",background:it.now?"var(--accent)":"var(--ink)",border:"3px solid var(--card)",boxShadow:"0 0 0 2px var(--ink)"}} />
              <div style={{fontFamily:"'Space Mono'",fontSize:"12px",textTransform:"uppercase",letterSpacing:".1em",opacity:.55,marginBottom:"8px"}}>{it.y}</div>
              <h3 style={{fontFamily:"'Bricolage Grotesque'",fontWeight:700,fontSize:"clamp(24px,3.4vw,42px)",letterSpacing:"-.02em",lineHeight:1}}>
                {it.r} <span style={{color:"var(--accent)"}}>· {it.o}</span>
              </h3>
              <p style={{fontSize:"15px",lineHeight:1.55,opacity:.8,marginTop:"10px",maxWidth:"60ch"}}>{it.d}</p>
            </div>
          ))}
        </div>
        <div data-reveal="" style={{maxWidth:"1000px",marginTop:"clamp(40px,6vh,70px)",display:"flex",flexWrap:"wrap",gap:"16px"}}>
          <div style={{flex:1,minWidth:"240px",border:"2px solid var(--ink)",borderRadius:"18px",padding:"22px 26px"}}>
            <div style={{fontFamily:"'Space Mono'",fontSize:"12px",textTransform:"uppercase",letterSpacing:".08em",opacity:.55,marginBottom:"6px"}}>Education</div>
            <div style={{fontFamily:"'Bricolage Grotesque'",fontWeight:700,fontSize:"clamp(18px,1.8vw,24px)"}}>Masters in Computer Application</div>
            <div style={{fontSize:"14px",opacity:.7,marginTop:"2px"}}>Major in Computer Science</div>
          </div>
          <div style={{flex:1,minWidth:"240px",border:"2px solid var(--ink)",borderRadius:"18px",padding:"22px 26px"}}>
            <div style={{fontFamily:"'Space Mono'",fontSize:"12px",textTransform:"uppercase",letterSpacing:".08em",opacity:.55,marginBottom:"6px"}}>Certified</div>
            <div style={{fontFamily:"'Bricolage Grotesque'",fontWeight:700,fontSize:"clamp(18px,1.8vw,24px)"}}>Interaction Designer</div>
            <div style={{fontSize:"14px",opacity:.7,marginTop:"2px"}}>English (fluent) · German (beginner)</div>
          </div>
        </div>
      </div>
    </section>
  );
}
