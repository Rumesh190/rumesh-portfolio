"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

const cases = [
  {id:"w1",t:"Sharing UI — Permissions & Scope",tag:"Enterprise UX",role:"Lead UX/UI · Zoho",year:"2024",domain:"SaaS · Access control",
    summary:"Redesigned how users grant, scope and revoke access across a large SaaS suite — turning a confusing permissions dialog into a model people trust.",
    challenge:"Sharing controls were scattered and phrased in engineering terms. Users over-shared by accident and couldn't tell who could see what, which quietly became a security & support problem.",
    approach:["Mapped every permission state and the mental model behind “who can do what”","Rebuilt the flow around plain-language scopes instead of raw toggles","Added a live preview so users see the effect before they confirm","Ran usability rounds until the model held up without explanation"],
    outcome:"A single, predictable sharing pattern that dropped accidental over-sharing and cut sharing-related support tickets — now reused as a shared component across modules.",
    img:"https://mir-s3-cdn-cf.behance.net/projects/404/74bef6191517113.Y3JvcCwxMzY2LDEwNjgsMTYsMA.png",url:"https://www.behance.net/gallery/191517113/Sharing-UI-User-permission-Scope-UIUX"},
  {id:"w2",t:"Hemohub — Blood Bank UX",tag:"Case Study",role:"Product Designer",year:"2023",domain:"Healthcare · 0→1",
    summary:"End-to-end UX case study for a blood-bank platform connecting donors, hospitals and banks in one real-time network.",
    challenge:"Finding the right blood group in an emergency meant phone calls and guesswork. Donors, banks and hospitals had no shared, trustworthy source of availability.",
    approach:["Interviewed donors and bank staff to map the real emergency journey","Built personas and an information architecture around urgency","Designed request → match → fulfilment flows with clear status","Prototyped and tested the critical “need blood now” path"],
    outcome:"A concept that makes availability visible in real time and turns a frantic, manual process into a few guided steps — the case study that best shows my 0→1 thinking.",
    img:"https://mir-s3-cdn-cf.behance.net/projects/404/6731e3158315555.Y3JvcCwyNTAzLDE5NTcsMTU0LDA.png",url:"https://www.behance.net/gallery/158315555/UX-Case-Study-Hemohub"},
  {id:"w3",t:"Comment Section — Collaboration",tag:"Collaboration",role:"UX/UI · Zoho",year:"2023",domain:"SaaS · Collaboration",
    summary:"A commenting & mentions system that lets teams discuss work in context instead of scattering feedback across email and chat.",
    challenge:"Feedback lived everywhere except next to the thing it was about. Context got lost, threads went stale and nobody knew what was resolved.",
    approach:["Designed inline threads, mentions and resolve states","Balanced density so conversations don’t drown the content","Defined empty, loading and notification states end-to-end","Tuned micro-interactions for a fast, native feel"],
    outcome:"Feedback now happens where the work is, with clear resolution — keeping discussion tied to context and reducing back-and-forth.",
    img:"https://mir-s3-cdn-cf.behance.net/projects/404/113248171862713.Y3JvcCwxMTkzLDkzMywwLDEyMQ.png",url:"https://www.behance.net/gallery/171862713/Comment-section-UI-Collaboration-through-commments"},
  {id:"w4",t:"Meeting Scheduler UI",tag:"Product UI",role:"UX/UI · Zoho",year:"2022",domain:"Productivity",
    summary:"A scheduling interface that makes picking a time across people and time-zones feel effortless.",
    challenge:"Coordinating a meeting meant juggling availability, time-zones and back-and-forth messages — high friction for a task people do constantly.",
    approach:["Designed a clear availability grid with smart defaults","Handled time-zones and conflicts visually, not in text","Streamlined invite, confirm and reschedule flows","Built responsive layouts for desktop and mobile"],
    outcome:"Booking a slot went from a chore to a couple of confident taps, with fewer scheduling mistakes.",
    img:"https://mir-s3-cdn-cf.behance.net/projects/404/d94a77169851235.Y3JvcCwzNDAwLDI2NjAsMjE4LDA.png",url:"https://www.behance.net/gallery/169851235/Meeting-scheduler-UI-design"},
  {id:"w5",t:"Landing Page UI",tag:"Web Design",role:"Visual & UI",year:"2022",domain:"Marketing web",
    summary:"A conversion-focused landing page with a bold hero, clear value story and a rhythm that guides the eye to the CTA.",
    challenge:"The page had to explain the product and earn a click in seconds, without feeling like a template.",
    approach:["Set a strong type & layout system for hierarchy","Sequenced sections around one clear conversion goal","Designed responsive states and motion cues","Kept the visual language distinctive, not generic"],
    outcome:"A landing experience that reads clearly top-to-bottom and pushes attention toward action.",
    img:"https://mir-s3-cdn-cf.behance.net/projects/404/e9ed05172511153.Y3JvcCwyNTEwLDE5NjQsMjU0LDA.png",url:"https://www.behance.net/gallery/172511153/Landing-page-UI-web-page-design"},
  {id:"w6",t:"Realistic Calculator UI",tag:"UI Craft",role:"UI / Visual craft",year:"2022",domain:"Craft study",
    summary:"A skeuomorphic-meets-modern calculator — a pure craft study in light, depth, shadow and tactile detail.",
    challenge:"Make a boring, everyday tool feel delightful and physical without hurting usability.",
    approach:["Studied real light and material behaviour","Built layered shadows and soft depth for tactility","Kept legibility and hit targets uncompromised","Obsessed over the small details of every key"],
    outcome:"A UI that feels genuinely pressable — my go-to piece for showing pixel-level craft.",
    img:"https://mir-s3-cdn-cf.behance.net/projects/404/5ae2a8170993449.Y3JvcCwyMDg2LDE2MzEsMCwxODU.png",url:"https://www.behance.net/gallery/170993449/Realistic-calculator-ui-design-UIUX"},
];

const covers = [
  {bg:"var(--bg)",fg:"var(--ink)",tag:"var(--ink)",ta:.5,dot:"rgba(23,21,15,.13)",glow:"color-mix(in srgb,var(--accent) 55%,transparent)",pan:"patpan",gdur:"15s"},
  {bg:"var(--ink)",fg:"var(--bg)",tag:"var(--accent)",ta:1,dot:"rgba(255,255,255,.14)",glow:"var(--accent)",pan:"patpan2",gdur:"18s"},
  {bg:"var(--accent)",fg:"#fff",tag:"rgba(255,255,255,.8)",ta:1,dot:"rgba(255,255,255,.2)",glow:"rgba(255,255,255,.45)",pan:"patpan",gdur:"13s"},
];

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Reveal — same as original, staggered within worklist
    const els = section.querySelectorAll<HTMLElement>("[data-reveal]");
    els.forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(46px)";
      el.style.transition = "opacity .9s cubic-bezier(.2,.7,.2,1),transform .9s cubic-bezier(.2,.7,.2,1)";
    });
    section.querySelectorAll<HTMLElement & {__d?:number}>("[data-worklist] [data-reveal]").forEach((el, i) => {
      el.__d = (i % 6) * 80;
    });
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const t = e.target as HTMLElement & {__d?:number};
            setTimeout(() => { t.style.opacity = "1"; t.style.transform = "none"; }, t.__d || 0);
            io.unobserve(t);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );
    els.forEach((el) => io.observe(el));

    return () => io.disconnect();
  }, []);

  // Case overlay — identical to original buildCaseOverlay / openCase
  const openCase = (i: number) => {
    const it = cases[i];
    const ov = overlayRef.current;
    const panel = panelRef.current;
    const body = bodyRef.current;
    if (!ov || !panel || !body) return;

    const meta = (l: string, v: string) =>
      `<div><div style="font-family:'Space Mono';font-size:10px;text-transform:uppercase;letter-spacing:.09em;opacity:.5;margin-bottom:4px">${l}</div><div style="font-family:'Bricolage Grotesque';font-weight:700;font-size:clamp(14px,1.3vw,17px)">${v}</div></div>`;
    const block = (l: string, v: string) =>
      `<div style="margin-top:26px"><div style="font-family:'Space Mono';font-size:11px;text-transform:uppercase;letter-spacing:.09em;color:var(--accent);margin-bottom:10px">${l}</div>${v}</div>`;

    body.innerHTML = `
      <div style="position:relative;aspect-ratio:16/9;background:var(--card);overflow:hidden">
        <img src="${it.img}" alt="${it.t}" style="width:100%;height:100%;object-fit:cover;display:block">
        <span style="position:absolute;inset:0;background:linear-gradient(180deg,transparent 40%,var(--bg))"></span>
        <span style="position:absolute;top:16px;left:16px;font-family:'Space Mono';font-size:11px;text-transform:uppercase;letter-spacing:.07em;background:var(--accent);color:#fff;padding:6px 13px;border-radius:100px">${it.tag}</span>
      </div>
      <div style="padding:clamp(22px,3.4vw,44px);padding-top:0;margin-top:clamp(-30px,-3vw,-20px);position:relative">
        <h2 style="font-family:'Bricolage Grotesque';font-weight:800;font-size:clamp(30px,4.6vw,60px);line-height:.95;letter-spacing:-.03em">${it.t}</h2>
        <p style="font-size:clamp(16px,1.6vw,20px);line-height:1.5;opacity:.85;margin-top:16px;max-width:60ch">${it.summary}</p>
        <div style="display:flex;flex-wrap:wrap;gap:clamp(26px,4vw,54px);margin-top:26px;padding:20px 0;border-top:1.5px solid rgba(128,128,128,.3);border-bottom:1.5px solid rgba(128,128,128,.3)">
          ${meta("Role", it.role)}${meta("Year", it.year)}${meta("Domain", it.domain)}
        </div>
        ${block("The challenge", `<p style="font-size:clamp(15px,1.4vw,18px);line-height:1.6;opacity:.85;max-width:62ch">${it.challenge}</p>`)}
        ${block("What I did", `<ul style="list-style:none;display:flex;flex-direction:column;gap:10px">${it.approach.map((a) => `<li style="display:flex;gap:12px;font-size:clamp(15px,1.4vw,18px);line-height:1.5;opacity:.88"><span style="color:var(--accent);flex-shrink:0">→</span><span>${a}</span></li>`).join("")}</ul>`)}
        ${block("Outcome", `<p style="font-family:'Bricolage Grotesque';font-weight:700;font-size:clamp(18px,2vw,26px);line-height:1.25;letter-spacing:-.01em;max-width:52ch">${it.outcome}</p>`)}
        <a href="${it.url}" target="_blank" rel="noopener" style="display:inline-flex;align-items:center;gap:10px;margin-top:32px;background:var(--ink);color:var(--bg);font-family:'Space Mono';text-transform:uppercase;letter-spacing:.06em;font-size:13px;padding:16px 24px;border-radius:100px">See full project on Behance ↗</a>
      </div>
    `;

    ov.style.display = "flex";
    // eslint-disable-next-line react-hooks/immutability
    document.body.style.overflow = "hidden";
    ov.scrollTop = 0;
    requestAnimationFrame(() => {
      panel.style.transform = "none";
      panel.style.opacity = "1";
    });
  };

  const hideCase = () => {
    const panel = panelRef.current;
    const ov = overlayRef.current;
    if (!panel || !ov) return;
    panel.style.transform = "translateY(30px) scale(.98)";
    panel.style.opacity = "0";
    setTimeout(() => { ov.style.display = "none"; }, 260);
    document.body.style.overflow = "";
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const ov = overlayRef.current;
      if (e.key === "Escape" && ov && ov.style.display !== "none") hideCase();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      {/* WORK */}
      <section id="work" ref={sectionRef} style={{padding:"clamp(80px,12vh,150px) clamp(20px,4vw,56px)"}}>
        <div style={{maxWidth:"1500px",margin:"0 auto",position:"static"}}>
          <div data-reveal="" style={{marginBottom:"clamp(30px,5vh,60px)"}}>
            <span style={{fontFamily:"'Space Mono'",fontSize:"13px",textTransform:"uppercase",letterSpacing:".1em",opacity:.6}}>/ 04 — Selected work</span>
            <h2 style={{fontFamily:"'Bricolage Grotesque'",fontWeight:800,fontSize:"clamp(30px,5vw,72px)",lineHeight:.9,letterSpacing:"-.03em",textTransform:"uppercase",marginTop:"14px"}}>
              Case studies, right here
            </h2>
            <p style={{fontFamily:"'Bricolage Grotesque'",fontWeight:600,fontSize:"clamp(15px,1.5vw,21px)",opacity:.55,marginTop:"12px"}}>
              Tap a project and read the whole story.
            </p>
          </div>
          <div data-worklist="" style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(min(100%,400px),1fr))",gap:"clamp(18px,2vw,28px)",width:"100%"}}>
            {cases.map((it, i) => {
              const c = covers[i % 3];
              return (
                <button
                  key={it.id}
                  type="button"
                  data-reveal=""
                  onClick={() => openCase(i)}
                  style={{position:"relative",display:"flex",flexDirection:"column",textAlign:"left",cursor:"pointer",padding:0,font:"inherit",color:"var(--ink)",background:"var(--card)",border:"1.5px solid color-mix(in srgb,var(--ink) 14%,transparent)",borderRadius:"16px",overflow:"hidden",boxShadow:"0 10px 30px rgba(0,0,0,.06)",transition:"transform .45s cubic-bezier(.2,.8,.25,1),box-shadow .45s,border-color .3s"}}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget;
                    el.style.transform = "translateY(-6px)";
                    el.style.boxShadow = "0 22px 48px rgba(0,0,0,.14)";
                    el.style.borderColor = "color-mix(in srgb,var(--accent) 55%,transparent)";
                    const ar = el.querySelector<HTMLElement>("[data-ar]");
                    if (ar) ar.style.transform = "translateX(5px)";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget;
                    el.style.transform = "";
                    el.style.boxShadow = "0 10px 30px rgba(0,0,0,.06)";
                    el.style.borderColor = "color-mix(in srgb,var(--ink) 14%,transparent)";
                    const ar = el.querySelector<HTMLElement>("[data-ar]");
                    if (ar) ar.style.transform = "";
                  }}
                >
                  <span style={{position:"absolute",top:"-8px",left:"50%",transform:"translateX(-50%) rotate(-1.5deg)",width:"74px",height:"18px",background:"color-mix(in srgb,var(--ink) 8%,transparent)",border:"1px solid color-mix(in srgb,var(--ink) 12%,transparent)",borderRadius:"2px",zIndex:4}} />
                  <div style={{position:"relative",overflow:"hidden",aspectRatio:"4/3",padding:"clamp(18px,1.8vw,26px)",display:"flex",flexDirection:"column",justifyContent:"space-between",background:c.bg}}>
                    <span style={{position:"absolute",top:"-14%",right:"-12%",width:"62%",height:"72%",borderRadius:"50%",background:`radial-gradient(circle,${c.glow},transparent 68%)`,filter:"blur(24px)",opacity:.6,animation:`patglow ${c.gdur} ease-in-out infinite`,pointerEvents:"none"}} />
                    <span style={{position:"absolute",inset:0,backgroundImage:`radial-gradient(${c.dot} 1.6px,transparent 1.7px)`,backgroundSize:"24px 24px",animation:`${c.pan} 5.5s linear infinite`,pointerEvents:"none"}} />
                    <span style={{position:"relative",zIndex:1,fontFamily:"'Space Mono'",fontSize:"11px",textTransform:"uppercase",letterSpacing:".1em",color:c.tag,opacity:c.ta}}>{it.tag}</span>
                    <h3 style={{position:"relative",zIndex:1,fontFamily:"'Bricolage Grotesque'",fontWeight:800,fontSize:"clamp(22px,1.9vw,29px)",lineHeight:.98,letterSpacing:"-.025em",color:c.fg}}>{it.t}</h3>
                  </div>
                  <div style={{display:"flex",flexDirection:"column",gap:"11px",padding:"clamp(18px,1.8vw,24px)",flex:1}}>
                    <span style={{fontFamily:"'Space Mono'",fontSize:"12px",letterSpacing:".06em",opacity:.5}}>N° 0{i + 1}</span>
                    <p style={{fontSize:"clamp(14px,1vw,15px)",lineHeight:1.5,opacity:.75,display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical",overflow:"hidden"} as React.CSSProperties}>{it.summary}</p>
                    <div style={{marginTop:"auto",paddingTop:"16px",borderTop:"1px solid color-mix(in srgb,var(--ink) 14%,transparent)",display:"flex",alignItems:"center",justifyContent:"space-between",gap:"10px"}}>
                      <span style={{fontFamily:"'Space Mono'",fontSize:"10px",textTransform:"uppercase",letterSpacing:".08em",background:"color-mix(in srgb,var(--ink) 9%,transparent)",padding:"7px 12px",borderRadius:"100px"}}>{it.domain.split(" · ")[0]}</span>
                      <span style={{display:"inline-flex",alignItems:"center",gap:"7px",fontFamily:"'Space Mono'",fontSize:"12px",textTransform:"uppercase",letterSpacing:".04em",color:"var(--accent)"}}>
                        View case <span data-ar="" style={{transition:"transform .35s cubic-bezier(.2,.8,.25,1)"}}>→</span>
                      </span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* CASE OVERLAY — identical to original buildCaseOverlay */}
      <div
        ref={overlayRef}
        onClick={(e) => { if (e.target === overlayRef.current) hideCase(); }}
        style={{position:"fixed",inset:0,zIndex:10000,background:"rgba(10,7,6,.7)",backdropFilter:"blur(6px)",display:"none",justifyContent:"center",alignItems:"flex-start",overflowY:"auto",padding:"clamp(14px,4vw,60px)"}}
      >
        <div ref={panelRef} style={{position:"relative",width:"100%",maxWidth:"900px",background:"var(--bg)",color:"var(--ink)",border:"2px solid var(--ink)",borderRadius:"24px",overflow:"hidden",boxShadow:"0 40px 90px rgba(0,0,0,.5)",transform:"translateY(30px) scale(.98)",opacity:0,transition:"transform .5s cubic-bezier(.2,.8,.25,1),opacity .5s"}}>
          <button onClick={hideCase} style={{position:"sticky",top:"14px",left:"100%",zIndex:5,margin:"14px 14px 0",transform:"translateX(-100%)",width:"44px",height:"44px",borderRadius:"50%",border:"2px solid var(--ink)",background:"var(--bg)",color:"var(--ink)",cursor:"pointer",fontSize:"18px",lineHeight:1}}>✕</button>
          <div ref={bodyRef} style={{marginTop:"-58px"}} />
        </div>
      </div>
    </>
  );
}
