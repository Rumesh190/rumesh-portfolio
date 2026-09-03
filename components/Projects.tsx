"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import SectionLabel from "./SectionLabel";

type FlowStep = { number: string; title: string; description: string; detail: string; points: [string, string][]; icon: string };

const AUDIT_STEPS: FlowStep[] = [
  { number:"01", title:"Create Audit", description:"Auditor creates a new audit.", detail:"A new audit starts with the right operational context already in place.", points:[["Plant populated","Pulled from the user context."],["Audit ID generated","A traceable ID is created."],["Leader resolved","The Zone Leader is identified."]], icon:"M5 5h14v15H5zM8 3h8v4H8zM8 11h8m-8 4h5" },
  { number:"02", title:"Select Zone", description:"Auditor selects the zone.", detail:"The audit is scoped to a zone and its accountable leader.", points:[["Zone A / B / C / D","The operating area is selected."],["Leader identified","Ownership follows the zone."],["Conflict prevented","Auditors cannot audit their own zone."]], icon:"M12 21s6-5.2 6-11a6 6 0 1 0-12 0c0 5.8 6 11 6 11Zm0-8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" },
  { number:"03", title:"Run 5S Audit", description:"Auditor inspects and records.", detail:"A structured inspection captures consistent scores and evidence.", points:[["5S questions","A repeatable audit structure."],["Compliance scoring","Responses update the score."],["Evidence capture","Images support each response."]], icon:"M4 5h16v15H4zM8 3h8v4H8zM8 12l2 2 5-5m-7 8h8" },
  { number:"04", title:"Raise Finding", description:"Observations are captured as findings.", detail:"Every non-compliance becomes a clear, evidence-backed finding.", points:[["Issue recorded","Non-compliance is documented."],["Observation captured","Context explains the issue."],["Evidence attached","Visual proof stays connected."]], icon:"M12 4 3 20h18L12 4Zm0 6v4m0 3h.01" },
  { number:"05", title:"Create Action", description:"Finding is converted into an action.", detail:"Finding is converted into an accountable action.", points:[["Zone Leader auto assigned","Automatically based on the zone."],["Priority & due date","Priority determines the due date."],["Responsible ownership","One person owns it until closure."]], icon:"M4 12h16M12 4v16M7 7l10 10" },
  { number:"06", title:"Add Evidence", description:"Responsible person submits evidence.", detail:"The responsible person records the fix and proves the outcome.", points:[["Action updated","Work completed is documented."],["Evidence uploaded","Proof of correction is attached."],["Saving recorded","Cost impact can be retained."]], icon:"M5 4h10l4 4v12H5zM15 4v5h4M8 15l2-2 2 2 3-4" },
  { number:"07", title:"Auditor Review", description:"Auditor verifies the action.", detail:"The original auditor reviews the submission before closure.", points:[["Submission reviewed","Evidence and notes are checked."],["Close or Send Back","The reviewer chooses the next state."],["Remarks supported","Decisions retain their context."]], icon:"M3 12s3.5-6 9-6 9 6 9 6-3.5 6-9 6-9-6-9-6Zm9 3a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" },
  { number:"08", title:"Close Action", description:"Action is verified and closed.", detail:"Verified work closes with its ownership and history intact.", points:[["Closure verified","The correction is confirmed."],["Completed-by retained","Accountability remains visible."],["Full history","Every transition is available."]], icon:"M4 12l5 5L20 6" },
  { number:"09", title:"Generate Report", description:"Performance and trend reports.", detail:"Connected records become useful audit and action reporting.", points:[["Audit report","Scores and findings together."],["Action report","Ownership and completion status."],["Evidence & trends","Proof and performance over time."]], icon:"M5 20V10m7 10V4m7 16v-7M3 20h18" },
];

const ACTION_STEPS = [
  ["Auditor","Identifies issue during audit."], ["Finding","Observation is recorded."], ["Zone Leader","Action automatically assigned."],
  ["Responsible Person","Action executed with evidence."], ["Submit for Review","Action submitted for verification."],
  ["Auditor Review","Auditor verifies and closes."], ["Closed / Sent Back","Action closed or returned with remarks."],
] as const;

type Project = { title:string; category:string; descriptor:string; cta:string; icon:string; system?:boolean; summary?:string; challenge?:string; approach?:readonly string[]; outcome?:string; role?:string; year?:string; domain?:string; behanceUrl?:string; thumbnail?:string };

const PROJECTS: Project[] = [
  { title:"5S Audit & Actions", category:"Full-stack product", descriptor:"Audit · Actions · Continuous Improvement", cta:"Explore System ↗", icon:"M5 6h14M5 12h9M5 18h12", system:true },
  { title:"Sharing UI\nPermissions & Scope", category:"Enterprise UX", descriptor:"A clearer model for granting, scoping and revoking access across a large SaaS suite.", cta:"View case ↗", icon:"M8 12h8m-6-5-5 5 5 5m4-10 5 5-5 5", summary:"Redesigned how users grant, scope and revoke access across a large SaaS suite — turning a confusing permissions dialog into a model people trust.", challenge:"Sharing controls were scattered and phrased in engineering terms. Users over-shared by accident and couldn't tell who could see what, which quietly became a security and support problem.", approach:["Mapped every permission state and the mental model behind ‘who can do what’.","Rebuilt the flow around plain-language scopes instead of raw toggles.","Added a live preview so users see the effect before they confirm.","Ran usability rounds until the model held up without explanation."], outcome:"A single, predictable sharing pattern that reduced accidental over-sharing and became a reusable pattern across modules.", role:"Lead UX/UI · Zoho", year:"2024", domain:"SaaS · Access control", behanceUrl:"https://www.behance.net/gallery/191517113/Sharing-UI-User-permission-Scope-UIUX", thumbnail:"https://mir-s3-cdn-cf.behance.net/projects/404/74bef6191517113.Y3JvcCwxMzY2LDEwNjgsMTYsMA.png" },
  { title:"Hemohub", category:"Healthcare Platform", descriptor:"An end-to-end blood-bank experience connecting donors, hospitals and banks.", cta:"View case ↗", icon:"M12 21s7-4.4 7-11a7 7 0 0 0-14 0c0 6.6 7 11 7 11Zm0-14v6m-3-3h6", summary:"An end-to-end UX case study for a blood-bank platform connecting donors, hospitals and banks in one real-time network.", challenge:"Finding the right blood group in an emergency meant phone calls and guesswork. Donors, banks and hospitals had no shared, trustworthy source of availability.", approach:["Interviewed donors and bank staff to map the real emergency journey.","Built personas and an information architecture around urgency.","Designed request, match and fulfilment flows with clear status.","Prototyped and tested the critical ‘need blood now’ path."], outcome:"A concept that makes availability visible in real time and turns a frantic, manual process into a few guided steps.", role:"Product Designer", year:"2023", domain:"Healthcare · 0→1", behanceUrl:"https://www.behance.net/gallery/158315555/UX-Case-Study-Hemohub", thumbnail:"https://mir-s3-cdn-cf.behance.net/projects/404/6731e3158315555.Y3JvcCwyNTAzLDE5NTcsMTU0LDA.png" },
  { title:"Comment Section", category:"Product UX", descriptor:"Contextual collaboration through threads, mentions and clear resolution states.", cta:"View case ↗", icon:"M4 5h16v12H9l-5 4V5Zm4 4h8m-8 4h5", summary:"A commenting and mentions system that lets teams discuss work in context instead of scattering feedback across email and chat.", challenge:"Feedback lived everywhere except next to the thing it was about. Context got lost, threads went stale and nobody knew what was resolved.", approach:["Designed inline threads, mentions and resolve states.","Balanced density so conversations don't drown the content.","Defined empty, loading and notification states end-to-end.","Tuned micro-interactions for a fast, native feel."], outcome:"Feedback now happens where the work is, with clear resolution — keeping discussion tied to context and reducing back-and-forth.", role:"UX/UI · Zoho", year:"2023", domain:"SaaS · Collaboration", behanceUrl:"https://www.behance.net/gallery/171862713/Comment-section-UI-Collaboration-through-commments", thumbnail:"https://mir-s3-cdn-cf.behance.net/projects/404/113248171862713.Y3JvcCwxMTkzLDkzMywwLDEyMQ.png" },
  { title:"Meeting Scheduler", category:"Productivity Tool", descriptor:"A focused scheduling experience for availability, time zones and conflicts.", cta:"View case ↗", icon:"M5 5h14v15H5zM8 3v4m8-4v4M5 9h14m-10 4h2m2 0h2m-6 3h2", summary:"A scheduling interface that makes picking a time across people and time zones feel effortless.", challenge:"Coordinating a meeting meant juggling availability, time zones and back-and-forth messages — high friction for a task people do constantly.", approach:["Designed a clear availability grid with smart defaults.","Handled time zones and conflicts visually, not in text.","Streamlined invite, confirm and reschedule flows.","Built responsive layouts for desktop and mobile."], outcome:"Booking a slot went from a chore to a couple of confident taps, with fewer scheduling mistakes.", role:"UX/UI · Zoho", year:"2022", domain:"Productivity", behanceUrl:"https://www.behance.net/gallery/169851235/Meeting-scheduler-UI-design", thumbnail:"https://mir-s3-cdn-cf.behance.net/projects/404/d94a77169851235.Y3JvcCwzNDAwLDI2NjAsMjE4LDA.png" },
  { title:"Realistic Calculator UI", category:"UI/UX Design", descriptor:"A tactile interface study in light, depth, shadow and responsive feedback.", cta:"View case ↗", icon:"M6 3h12v18H6zM8 6h8v3H8zm1 7h.01m3 0h.01m3 0h.01m-6 4h.01m3 0h.01m3 0h.01", summary:"A skeuomorphic-meets-modern calculator — a pure craft study in light, depth, shadow and tactile detail.", challenge:"Make a boring, everyday tool feel delightful and physical without hurting usability.", approach:["Studied real light and material behaviour.","Built layered shadows and soft depth for tactility.","Kept legibility and hit targets uncompromised.","Refined the small details of every key."], outcome:"A UI that feels genuinely pressable — a focused demonstration of pixel-level visual craft.", role:"UI / Visual craft", year:"2022", domain:"Craft study", behanceUrl:"https://www.behance.net/gallery/170993449/Realistic-calculator-ui-design-UIUX", thumbnail:"https://mir-s3-cdn-cf.behance.net/projects/404/5ae2a8170993449.Y3JvcCwyMDg2LDE2MzEsMCwxODU.png" },
] as const;

function FlowIcon({ path }: { path: string }) {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d={path} /></svg>;
}

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const [selected, setSelected] = useState(4);
  const [activeAction, setActiveAction] = useState(3);
  const [routeStep, setRouteStep] = useState<number | null>(null);
  const [openProject, setOpenProject] = useState<number | null>(null);
  const [activeProject, setActiveProject] = useState(0);
  const [leavingProject, setLeavingProject] = useState<number | null>(null);
  const [autoplayPaused, setAutoplayPaused] = useState(false);
  const transitionTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const autoplayResumeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      AUDIT_STEPS.forEach((_, index) => timers.push(setTimeout(() => setRouteStep(index), index * 300)));
      timers.push(setTimeout(() => { setRouteStep(null); setSelected(4); }, AUDIT_STEPS.length * 300 + 250));
    }, { threshold: .28 });
    observer.observe(section);
    return () => { observer.disconnect(); timers.forEach(clearTimeout); };
  }, []);

  useEffect(() => {
    if (openProject === null) return;
    document.body.style.overflow = "hidden";
    const close = (event: KeyboardEvent) => { if (event.key === "Escape") setOpenProject(null); };
    window.addEventListener("keydown", close);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", close); };
  }, [openProject]);

  useEffect(() => () => {
    if (transitionTimer.current) clearTimeout(transitionTimer.current);
    if (autoplayResumeTimer.current) clearTimeout(autoplayResumeTimer.current);
  }, []);

  useEffect(() => {
    if (openProject !== null || autoplayPaused || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const cycleTimer = setTimeout(() => {
      if (transitionTimer.current) clearTimeout(transitionTimer.current);
      setLeavingProject(activeProject);
      setActiveProject((activeProject + 1) % PROJECTS.length);
      transitionTimer.current = setTimeout(() => setLeavingProject(null), 620);
    }, 1500);
    return () => clearTimeout(cycleTimer);
  }, [activeProject, autoplayPaused, openProject]);

  const current = AUDIT_STEPS[selected];
  const modalProject = openProject === null ? null : PROJECTS[openProject];
  const pauseAutoplay = () => {
    if (autoplayResumeTimer.current) clearTimeout(autoplayResumeTimer.current);
    setAutoplayPaused(true);
  };
  const resumeAutoplayAfter = (delay = 4500) => {
    if (autoplayResumeTimer.current) clearTimeout(autoplayResumeTimer.current);
    setAutoplayPaused(true);
    autoplayResumeTimer.current = setTimeout(() => setAutoplayPaused(false), delay);
  };
  const activateProject = (nextProject: number) => {
    if (nextProject === activeProject) return;
    resumeAutoplayAfter(6000);
    if (transitionTimer.current) clearTimeout(transitionTimer.current);
    setLeavingProject(activeProject);
    setActiveProject(nextProject);
    transitionTimer.current = setTimeout(() => setLeavingProject(null), 620);
  };
  const moveSelection = (direction: number) => activateProject((activeProject + direction + PROJECTS.length) % PROJECTS.length);
  return (
    <>
      <section id="work" className="merged-work page-section" ref={sectionRef} aria-labelledby="work-title">
        <SectionLabel index="02">Systems &amp; Selected Work</SectionLabel>
        <div className="merged-work__inner">
          <header className="merged-work__intro">
            <h2 id="work-title" className="section-heading"><span>I design the experience.</span><span>I build <em>the system.</em></span></h2>
            <p className="section-subheading">Selected products and case studies — from UX problems to working software.</p>
          </header>
          <div className="project-accordion" role="tablist" aria-label="Selected projects" onPointerEnter={pauseAutoplay} onPointerLeave={() => resumeAutoplayAfter()} onFocusCapture={pauseAutoplay} onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) resumeAutoplayAfter(); }} onKeyDown={(event) => {
            if (event.key === "ArrowRight") { event.preventDefault(); moveSelection(1); }
            if (event.key === "ArrowLeft") { event.preventDefault(); moveSelection(-1); }
          }}>
            {PROJECTS.map((project, index) => (
              <article className={`project-panel${activeProject === index ? " is-active" : ""}${leavingProject === index ? " is-leaving" : ""}`} key={project.title}>
                <button className="project-rail" type="button" role="tab" aria-selected={activeProject === index} onClick={() => activateProject(index)}>
                  <span>{String(index + 1).padStart(2,"0")}</span><i aria-hidden="true" /><strong>{project.title.replace("\n"," — ")}</strong><b aria-hidden="true" />
                </button>
                <div className="project-panel__content" aria-hidden={activeProject !== index}>
                  <button className="project-panel__open" type="button" onClick={() => setOpenProject(index)} aria-label={`Open ${project.title.replace("\n"," ")} project`} />
                  <div className="project-panel__copy">
                    <span className="project-panel__icon" aria-hidden="true">{project.system ? <strong>5S<i /></strong> : <FlowIcon path={project.icon} />}</span>
                    <span className="project-panel__number">{String(index + 1).padStart(2,"0")}</span>
                    <h3>{project.title.replace("\n"," — ")}</h3>
                    <b>{project.category}</b>
                    <p>{project.system ? "A connected system for audits, findings, corrective actions and continuous improvement." : project.descriptor}</p>
                    <small>{project.system ? "Audit  ·  Actions  ·  Continuous Improvement" : project.category}</small>
                    <span className="project-panel__cta">{project.cta}</span>
                  </div>
                  <div className={`project-panel__visual${project.system ? " is-system" : ""}`} aria-hidden="true">
                    {project.system ? <div className="project-dashboard"><span /><span /><span /><i /><i /><i /><b /><b /><b /></div> : <Image src={`/assets/w${index === 5 ? 6 : index}.png`} alt="" fill sizes="(max-width: 1024px) 90vw, 45vw" />}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {modalProject && <div className="work-modal" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setOpenProject(null); }}>
        <div className={`work-modal__panel${modalProject.system ? " work-modal__panel--system" : " work-modal__panel--case"}`} role="dialog" aria-modal="true" aria-labelledby="work-modal-title">
          <button className="work-modal__close" type="button" onClick={() => setOpenProject(null)} aria-label="Close project">×</button>
          <header className="work-modal__header">
            <span>{modalProject.category}</span>
            <h2 id="work-modal-title">{modalProject.title.replace("\n"," ")}</h2>
            <p>{modalProject.system ? "A complete system for structured audits, corrective actions and continuous improvement." : modalProject.summary}</p>
            {!modalProject.system && <a className="work-modal__behance" href={modalProject.behanceUrl} target="_blank" rel="noreferrer">View full project on Behance <span aria-hidden="true">↗</span></a>}
          </header>
          {modalProject.system ? <div className="work-modal__flows">
            <article className="systems-panel systems-panel--audit">
          <aside className="systems-panel__aside" aria-live="polite">
            <span className="systems-panel__eyebrow">5S Audit Flow</span>
            <div className="systems-detail__heading"><strong>{current.number}</strong><h3>{current.title}</h3></div>
            <p>{current.detail}</p>
            <ul>{current.points.map(([title, copy]) => <li key={title}><i aria-hidden="true" /><span><b>{title}</b><small>{copy}</small></span></li>)}</ul>
          </aside>
          <div className="audit-flow" aria-label="5S audit workflow">
            {AUDIT_STEPS.map((step, index) => (
              <button className={`audit-step audit-step--${index + 1}${selected === index ? " is-selected" : ""}${routeStep === index ? " is-route-active" : ""}`} type="button" aria-pressed={selected === index} onClick={() => setSelected(index)} key={step.number}>
                <span className="audit-step__meta"><FlowIcon path={step.icon} /><b>{step.number}</b></span>
                <strong>{step.title}</strong><small>{step.description}</small>
              </button>
            ))}
          </div>
            </article>
            <article className="systems-panel systems-panel--action">
          <aside className="systems-panel__aside systems-panel__aside--simple">
            <span className="systems-panel__eyebrow">Action Workflow</span>
            <h3>Clear ownership.<br />Defined flow.<br />Closed loop accountability.</h3>
          </aside>
          <div className="action-flow" aria-label="Action accountability workflow">
            {ACTION_STEPS.map(([title, copy], index) => (
              <button type="button" className={`action-step${activeAction === index ? " is-selected" : ""}`} aria-pressed={activeAction === index} onClick={() => setActiveAction(index)} key={title}>
                <span aria-hidden="true">{String(index + 1).padStart(2,"0")}</span><strong>{title}</strong><small>{copy}</small>
              </button>
            ))}
            <div className="action-flow__return" aria-label="Sent back: Action returned for updates"><span>Sent back</span><small>Action returned for updates</small></div>
          </div>
            </article>
          </div> : <div className="case-study">
            <div className="case-study__hero">
              <Image src={modalProject.thumbnail || `/assets/w${openProject === 5 ? 6 : openProject}.png`} alt={`${modalProject.title.replace("\n"," ")} project thumbnail`} fill sizes="(max-width: 900px) 90vw, 940px" />
            </div>
            <dl className="case-study__meta">
              <div><dt>Role</dt><dd>{modalProject.role}</dd></div>
              <div><dt>Year</dt><dd>{modalProject.year}</dd></div>
              <div><dt>Domain</dt><dd>{modalProject.domain}</dd></div>
            </dl>
            <div className="case-detail">
              <div><span>The challenge</span><p>{modalProject.challenge}</p></div>
              <div><span>What I did</span><ul>{modalProject.approach?.map(item => <li key={item}>{item}</li>)}</ul></div>
              <div><span>Outcome</span><p>{modalProject.outcome}</p></div>
            </div>
          </div>}
        </div>
      </div>}
    </>
  );
}
