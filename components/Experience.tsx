"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Award, GraduationCap } from "lucide-react";
import { useRef, type ReactNode } from "react";
import SectionLabel from "./SectionLabel";

const careers = [
  { number:"01", date:"APR 2014 — JUN 2019", role:"UI Designer", company:"BORN · TechXDS", description:"Rough drafts to stakeholders, UX troubleshooting, layout and style standards, original graphics and eCommerce imaging." },
  { number:"02", date:"JUN — DEC 2019", role:"Product Designer", company:"PipeCandy", description:"Product research, personas, information architecture, wireframes, prototyping and a design system built from scratch." },
  { number:"03", date:"DEC 2019 — NOW", role:"Product Developer", company:"Zoho Corporation", description:"Bridging product thinking, design and development to build functional, scalable digital products from idea to production." },
] as const;

const ease = [0.22,1,0.36,1] as const;

export default function Experience(){
  const root = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const reveal = reduced ? false : {opacity:0,y:18};

  return <section id="experience" className="page-section process" ref={root}>
    <div className="process__sticky">
      <SectionLabel index="04">Process</SectionLabel>
      <div className="process__shell">
        <motion.header className="process__intro" initial={reveal} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.5}} transition={{duration:.75,ease}}>
          <h2 className="section-heading"><span>The product-building </span><em>trail.</em></h2>
          <p className="section-subheading">A decade of designing, building and shipping digital products<br/>that solve real problems.</p>
        </motion.header>

        <motion.div className="career-frame" initial={reveal} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.25}} transition={{duration:.8,delay:reduced ? 0 : .12,ease}}>
          <div className="career-flow" aria-label="Career progression from UI Designer to Product Developer">
            <JourneyPath className="career-path--desktop" d="M76 82 C250 82 326 316 580 316 C818 316 874 94 1122 94" viewBox="0 0 1200 430" />
            <JourneyPath className="career-path--mobile" d="M28 38 C28 176 92 190 92 340 C92 488 28 506 28 674" viewBox="0 0 120 720" />
            {careers.map((career,index) => <Milestone career={career} index={index} key={career.number}/>) }
          </div>
        </motion.div>

        <motion.div className="process__credentials" initial={reveal} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.4}} transition={{duration:.72,delay:reduced ? 0 : .2,ease}}>
          <Credential icon={<GraduationCap/>} label="Education" title="Masters in Computer Application" detail="Major in Computer Science"/>
          <Credential icon={<Award/>} label="Certified" title="Interaction Designer" detail="English (fluent) · German (beginner)"/>
        </motion.div>
      </div>
    </div>

    <style jsx global>{`
      .process{position:relative;min-height:100svh!important;padding-right:var(--page-gutter);padding-bottom:clamp(72px,9vh,110px)!important;padding-left:var(--page-gutter);overflow:clip;background:color-mix(in srgb,var(--bg-secondary) 76%,transparent)}
      .process:before{position:absolute;inset:19% 4% auto 38%;height:54%;background:radial-gradient(circle,rgba(92,10,14,.12),transparent 68%);filter:blur(48px);content:"";pointer-events:none}
      .process__sticky{position:relative;min-height:0}
      .process__shell{position:relative;width:min(100%,var(--section-shell-width));margin-inline:auto}
      .process__intro{display:block;padding-bottom:clamp(28px,3.5vh,40px);border-bottom:1px solid rgba(255,255,255,.075)}
      .process__intro h2{color:var(--text-primary);font:750 clamp(68px,6.5vw,112px)/.9 var(--font-display);letter-spacing:-.055em;text-transform:uppercase}
      .process__intro h2{white-space:nowrap}.process__intro h2 span,.process__intro h2 em{display:inline}.process__intro h2 em{color:var(--accent);font-style:normal}
      .process__intro p{max-width:760px;margin-top:20px;color:rgba(255,255,255,.62);font-size:clamp(16px,1.2vw,18px);line-height:1.6}
      .career-frame{margin-top:clamp(28px,3.8vh,48px)}
      .career-flow{position:relative;display:grid;grid-template-columns:repeat(12,minmax(0,1fr));min-height:430px}
      .career-path{position:absolute;inset:0;width:100%;height:100%;overflow:visible;fill:none;pointer-events:none}
      .career-path path{fill:none;stroke:rgba(255,255,255,.12);stroke-width:1.5;vector-effect:non-scaling-stroke}
      .career-path .career-path__active{stroke:var(--accent);stroke-width:2;stroke-dasharray:11 10;animation:career-line-flow 7s linear infinite}
      .career-path--mobile{display:none}
      .career-milestone{position:relative;z-index:1;align-self:start;width:100%;max-width:330px;min-height:220px;padding:20px 22px;border:1px solid rgba(255,255,255,.085);border-radius:14px;background:linear-gradient(145deg,rgba(24,20,21,.95),rgba(12,10,11,.94));box-shadow:0 18px 48px rgba(0,0,0,.24),inset 0 1px 0 rgba(255,255,255,.025)}
      .career-milestone--1{grid-column:1/span 3;margin-top:14px}
      .career-milestone--2{grid-column:5/span 4;margin-top:248px;justify-self:center}
      .career-milestone--3{grid-column:10/span 3;margin-top:26px;justify-self:end}
      .career-milestone__date,.career-milestone__number{color:var(--text-secondary);font:500 10px/1.25 var(--font-body);letter-spacing:.12em;text-transform:uppercase}
      .career-milestone__date{margin-bottom:11px}
      .career-milestone__marker{display:flex;align-items:center;gap:12px;margin-bottom:15px}
      .career-milestone__node{position:relative;display:grid;width:25px;height:25px;place-items:center;border:1px solid rgba(255,255,255,.2);border-radius:50%;box-shadow:0 0 20px rgba(255,35,45,.12)}
      .career-milestone__node:before{width:13px;height:13px;border:1px solid rgba(255,255,255,.38);border-radius:50%;content:""}
      .career-milestone__node i{position:absolute;width:5px;height:5px;border-radius:50%;background:var(--accent)}
      .career-milestone__pulse{display:none}
      .career-milestone h3{max-width:9ch;color:var(--text-primary);font:750 clamp(32px,2.7vw,42px)/.94 var(--font-display);letter-spacing:-.04em}
      .career-milestone__company{margin-top:10px;color:var(--accent);font-size:clamp(16px,1.25vw,20px);font-weight:650}
      .career-milestone__description{max-width:34ch;margin-top:13px;color:var(--text-secondary);font-size:clamp(13px,1vw,15px);line-height:1.58}
      .process__credentials{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:16px;max-width:840px;margin:clamp(24px,3vh,42px) auto 0}
      .process-credential{display:grid;grid-template-columns:auto 1fr;gap:15px;padding:21px 23px;border:1px solid rgba(255,255,255,.08);border-radius:14px;background:rgba(255,255,255,.012)}
      .process-credential__icon{color:var(--text-secondary)}.process-credential__icon svg{width:20px;height:20px;stroke-width:1.5}.process-credential__label{color:var(--accent);font:500 10px/1 var(--font-body);letter-spacing:.12em;text-transform:uppercase}.process-credential h3{margin-top:7px;color:var(--text-primary);font-size:clamp(17px,1.4vw,20px);line-height:1.15}.process-credential h3+p{margin-top:5px;color:var(--text-secondary);font-size:13px}
      @media(max-width:1000px){.career-milestone--1{grid-column:1/span 4}.career-milestone--2{grid-column:5/span 4}.career-milestone--3{grid-column:9/span 4}}
      @keyframes career-line-flow{to{stroke-dashoffset:-84}}
      @media(max-width:760px){.process{min-height:auto!important;padding-bottom:76px!important}.process__intro h2{font-size:clamp(46px,13vw,72px);white-space:normal}.process__intro p br{display:none}.career-flow{display:block;min-height:790px}.career-path--desktop{display:none}.career-path--mobile{display:block;left:8px;width:120px}.career-milestone{position:absolute;width:calc(100% - 72px);max-width:340px;min-height:0;padding:20px}.career-milestone--1{top:0;left:42px;margin:0}.career-milestone--2{top:292px;right:0;margin:0}.career-milestone--3{top:596px;left:42px;margin:0}.career-milestone h3{font-size:clamp(30px,9vw,39px)}.process__credentials{grid-template-columns:1fr;margin-top:28px}}
      @media(prefers-reduced-motion:reduce){.career-milestone,.career-frame,.process__intro,.process__credentials{opacity:1!important;transform:none!important}.career-path .career-path__active{animation:none}}
    `}</style>
  </section>
}

function JourneyPath({className,d,viewBox}:{className:string;d:string;viewBox:string}){
  return <svg className={`career-path ${className}`} viewBox={viewBox} preserveAspectRatio="none" aria-hidden="true"><path d={d}/><path className="career-path__active" d={d}/></svg>;
}

type Career = (typeof careers)[number];
function Milestone({career,index}:{career:Career;index:number}){
  return <article className={`career-milestone career-milestone--${index+1}`}>
    <p className="career-milestone__date">{career.date}</p>
    <div className="career-milestone__marker"><span className="career-milestone__node"><i/></span><span className="career-milestone__number">{career.number}</span></div>
    <h3>{career.role}</h3><p className="career-milestone__company">{career.company}</p><p className="career-milestone__description">{career.description}</p>
  </article>;
}

function Credential({icon,label,title,detail}:{icon:ReactNode;label:string;title:string;detail:string}){
  return <article className="process-credential"><div className="process-credential__icon">{icon}</div><div><p className="process-credential__label">{label}</p><h3>{title}</h3><p>{detail}</p></div></article>;
}
