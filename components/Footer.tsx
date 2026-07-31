"use client";

import { useEffect, useRef } from "react";

const quotes = [
  {t:"Takes a brief, adds his own touch, and returns with something far better than I imagined.",n:"Arun Kumar",r:"Product Lead"},
  {t:"Rare combo of sharp design sense and real business thinking on every project.",n:"Divya Ramesh",r:"Design Manager"},
  {t:"Puts the user first in every single decision. That empathy is contagious.",n:"Karthik Nair",r:"Product Manager"},
];
const allQuotes = [...quotes, ...quotes];

export default function Footer() {
  const rootRef = useRef<HTMLDivElement>(null);
  const quoteScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    // Reveal
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

    // Quote card hover — identical to original initHovers
    const qs = quoteScrollRef.current;
    root.querySelectorAll<HTMLElement>("[data-quotescroll] > div").forEach((card) => {
      card.style.transition = "transform .4s cubic-bezier(.2,.7,.2,1),border-color .3s,box-shadow .3s";
      card.addEventListener("mouseenter", () => {
        card.style.transform = "translateY(-10px) rotate(-1.5deg)";
        card.style.borderColor = "var(--accent)";
        card.style.boxShadow = "10px 12px 0 var(--accent)";
        if (qs) qs.style.animationPlayState = "paused";
      });
      card.addEventListener("mouseleave", () => {
        card.style.transform = "";
        card.style.borderColor = "";
        card.style.boxShadow = "";
        if (qs) qs.style.animationPlayState = "running";
      });
    });

    return () => io.disconnect();
  }, []);

  return (
    <div ref={rootRef}>
      {/* TESTIMONIALS */}
      <section style={{padding:"clamp(80px,12vh,140px) 0",overflow:"hidden"}}>
        <div style={{maxWidth:"1500px",margin:"0 auto",padding:"0 clamp(20px,4vw,56px)"}}>
          <div data-reveal="" style={{marginBottom:"clamp(30px,5vh,56px)"}}>
            <span style={{fontFamily:"'Space Mono'",fontSize:"13px",textTransform:"uppercase",letterSpacing:".1em",opacity:.6}}>/ 06 — People</span>
            <h2 style={{fontFamily:"'Bricolage Grotesque'",fontWeight:800,fontSize:"clamp(28px,4.4vw,60px)",lineHeight:.9,letterSpacing:"-.03em",textTransform:"uppercase",marginTop:"14px"}}>
              Design is all<br />about people
            </h2>
            <p style={{fontFamily:"'Bricolage Grotesque'",fontWeight:600,fontSize:"clamp(15px,1.5vw,21px)",opacity:.55,marginTop:"12px"}}>
              and thankfully, a few of them like working with me
            </p>
          </div>
        </div>
        <div data-quotescroll="" ref={quoteScrollRef} style={{display:"flex",gap:"22px",width:"max-content",padding:"0 clamp(20px,4vw,56px)",animation:"marq 42s linear infinite"}}>
          {allQuotes.map((it, i) => (
            <div key={i} style={{flex:"0 0 clamp(300px,32vw,440px)",background:"var(--card)",border:"2px solid var(--ink)",borderRadius:"22px",padding:"32px",display:"flex",flexDirection:"column",justifyContent:"space-between",minHeight:"240px"}}>
              <p style={{fontFamily:"'Bricolage Grotesque'",fontWeight:600,fontSize:"clamp(18px,1.8vw,24px)",lineHeight:1.3,letterSpacing:"-.01em"}}>
                &ldquo;{it.t}&rdquo;
              </p>
              <div style={{display:"flex",alignItems:"center",gap:"12px",marginTop:"22px"}}>
                <div style={{width:"42px",height:"42px",borderRadius:"50%",background:"var(--accent)",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'Bricolage Grotesque'",fontWeight:800,color:"#fff"}}>{it.n[0]}</div>
                <div>
                  <div style={{fontWeight:600,fontSize:"15px"}}>{it.n}</div>
                  <div style={{fontFamily:"'Space Mono'",fontSize:"11px",textTransform:"uppercase",letterSpacing:".08em",opacity:.6}}>{it.r}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <p data-reveal="" style={{maxWidth:"1500px",margin:"16px auto 0",padding:"0 clamp(20px,4vw,56px)",fontFamily:"'Space Mono'",fontSize:"12px",opacity:.5}}>
          ↑ swap in real quotes from teammates &amp; clients anytime
        </p>
      </section>

      {/* CONTACT */}
      <section id="contact" style={{background:"var(--accent)",color:"var(--ink)",padding:"clamp(90px,16vh,200px) clamp(20px,4vw,56px)",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",bottom:"-8vw",left:"-2vw",fontFamily:"'Bricolage Grotesque'",fontWeight:800,fontSize:"clamp(80px,16vw,230px)",color:"rgba(0,0,0,.06)",lineHeight:.7,pointerEvents:"none",userSelect:"none",whiteSpace:"nowrap"}}>
          SAY HI
        </div>
        <div style={{maxWidth:"1500px",margin:"0 auto",position:"relative",zIndex:2}}>
          <span data-reveal="" style={{fontFamily:"'Space Mono'",fontSize:"13px",textTransform:"uppercase",letterSpacing:".1em",opacity:.7,display:"block",marginBottom:"28px"}}>/ 07 — Let&apos;s build something</span>
          <h2 data-reveal="" style={{fontFamily:"'Bricolage Grotesque'",fontWeight:800,fontSize:"clamp(40px,8.5vw,118px)",lineHeight:.85,letterSpacing:"-.04em",textTransform:"uppercase"}}>
            Let&apos;s<br />talk.
          </h2>
          <p data-reveal="" style={{fontFamily:"'Space Mono'",fontSize:"clamp(13px,1.4vw,16px)",marginTop:"20px",letterSpacing:".04em"}}>
            Chennai, India · +91 97898 57256 · r.rumeshbabu@gmail.com
          </p>
          <div data-reveal="" style={{display:"flex",flexWrap:"wrap",gap:"16px",marginTop:"clamp(28px,5vh,48px)"}}>
            <a data-magnetic="" href="mailto:r.rumeshbabu@gmail.com" style={{display:"inline-flex",alignItems:"center",gap:"12px",background:"var(--ink)",color:"var(--bg)",fontFamily:"'Space Mono'",textTransform:"uppercase",letterSpacing:".06em",fontSize:"14px",padding:"20px 30px",borderRadius:"100px"}}>Email me ↗</a>
            <a data-magnetic="" href="/assets/Rumesh-Babu-Resume.pdf" target="_blank" rel="noopener noreferrer" style={{display:"inline-flex",alignItems:"center",border:"2px solid var(--ink)",fontFamily:"'Space Mono'",textTransform:"uppercase",letterSpacing:".06em",fontSize:"14px",padding:"20px 30px",borderRadius:"100px"}}>Résumé ↗</a>
            <a data-magnetic="" href="https://www.linkedin.com/in/rumesh-ravichandran-241793112/" target="_blank" rel="noopener noreferrer" style={{display:"inline-flex",alignItems:"center",border:"2px solid var(--ink)",fontFamily:"'Space Mono'",textTransform:"uppercase",letterSpacing:".06em",fontSize:"14px",padding:"20px 30px",borderRadius:"100px"}}>LinkedIn ↗</a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{background:"#141210",color:"#f1ece1",padding:"36px clamp(20px,4vw,56px)",display:"flex",flexWrap:"wrap",gap:"16px",justifyContent:"space-between",alignItems:"center",fontFamily:"'Space Mono'",fontSize:"12px",textTransform:"uppercase",letterSpacing:".08em"}}>
        <span>© 2026 Rumesh Babu — UX/UI Designer</span>
        <span style={{opacity:.6}}>Made with love, curiosity &amp; too much coffee</span>
        <a href="#top" style={{opacity:.9}}>Back to top ↑</a>
      </footer>
    </div>
  );
}
