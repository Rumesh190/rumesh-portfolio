"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, BriefcaseBusiness, Copy, Download, Link2, Mail } from "lucide-react";
import SectionLabel from "./SectionLabel";

const testimonials = [
  {quote:"Takes a brief, adds his own touch, and returns with something far better than I imagined.",name:"Arun Kumar",role:"Product Lead"},
  {quote:"A rare combination of sharp design sense and real product thinking in every project.",name:"Divya Ramesh",role:"Design Manager"},
  {quote:"Puts the user first in every decision and works closely with the team to carry the idea through.",name:"Karthik Nair",role:"Product Manager"},
] as const;

export default function Footer() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    await navigator.clipboard.writeText("r.rumeshbabu@gmail.com");
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

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

    return () => io.disconnect();
  }, []);

  return (
    <div ref={rootRef}>
      {/* TESTIMONIALS */}
      <section className="people-section">
        <div className="people-section__inner">
          <div data-reveal="" style={{marginBottom:"clamp(28px,4vh,44px)"}}>
            <span className="section-kicker"><span aria-hidden="true">/</span> 05 — People</span>
            <h2 className="section-heading" style={{marginTop:"14px"}}>
              Design is all <span style={{color:"var(--accent)"}}>about people</span>
            </h2>
            <p className="section-subheading">
              A few words from the people I&apos;ve designed, built and shipped products with.
            </p>
          </div>
        </div>
        <div className="testimonial-grid">
          {testimonials.map((item,index) => (
            <article className="testimonial-card" data-reveal="" key={item.name}>
              <div className="testimonial-card__top"><span>{String(index + 1).padStart(2,"0")}</span><b aria-hidden="true">“</b></div>
              <blockquote>{item.quote}</blockquote>
              <div className="testimonial-card__person">
                <span className="testimonial-card__avatar" aria-hidden="true">{item.name[0]}</span>
                <span><strong>{item.name}</strong><small>{item.role}</small></span>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="page-section contact-section">
        <SectionLabel index="06">Contact</SectionLabel>
        <div className="contact-section__inner">
          <h2 className="section-heading" data-reveal="">
            Let&apos;s build products that <span>work and scale.</span>
          </h2>
          <p className="section-subheading" data-reveal="">
            Open to product design and full-stack development opportunities. If you&apos;re building a thoughtful digital product, let&apos;s talk.
          </p>
          <div className="contact-cards" data-reveal="">
            <a className="contact-card" href="https://www.linkedin.com/in/rumesh-ravichandran-241793112/" target="_blank" rel="noopener noreferrer"><span className="contact-card__icon"><Link2/></span><span><strong>LinkedIn</strong><small>rumesh-ravichandran</small></span><ArrowUpRight className="contact-card__arrow"/></a>
            <a className="contact-card" href="https://www.behance.net/rumeshravi" target="_blank" rel="noopener noreferrer"><span className="contact-card__icon"><BriefcaseBusiness/></span><span><strong>Behance</strong><small>UX/UI case studies</small></span><ArrowUpRight className="contact-card__arrow"/></a>
            <a className="contact-card" href="mailto:r.rumeshbabu@gmail.com"><span className="contact-card__icon"><Mail/></span><span><strong>Email</strong><small>r.rumeshbabu@gmail.com</small></span><ArrowUpRight className="contact-card__arrow"/></a>
          </div>
          <div className="contact-actions" data-reveal="">
            <button className="contact-action" type="button" onClick={copyEmail}><Copy/>{copied ? "Email copied" : "Copy email"}</button>
            <a className="contact-action" href="/assets/Rumesh-Babu-Resume.pdf" target="_blank" rel="noopener noreferrer"><Download/>Résumé</a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="site-footer">
        <div className="site-footer__inner">
          <div className="site-footer__brand"><strong><span>R</span> Rumesh Babu</strong><p>Designing experiences and building scalable digital products from interface to infrastructure.</p><small>© 2026 Rumesh Babu</small></div>
          <nav className="site-footer__nav" aria-label="Footer navigation"><b>Navigate</b><a href="#about">About</a><a href="#work">Work</a><a href="#expertise">Expertise</a><a href="#experience">Process</a></nav>
          <div className="site-footer__connect"><b>Connect</b><a href="https://www.linkedin.com/in/rumesh-ravichandran-241793112/" target="_blank" rel="noopener noreferrer"><Link2/> LinkedIn</a><a href="https://www.behance.net/rumeshravi" target="_blank" rel="noopener noreferrer"><BriefcaseBusiness/> Behance</a><a href="mailto:r.rumeshbabu@gmail.com"><Mail/> Email</a></div>
          <a className="site-footer__top" href="#top" aria-label="Back to top">↑</a>
        </div>
      </footer>
      <style jsx global>{`
        .people-section{position:relative;padding:clamp(68px,8vh,96px) 0 clamp(76px,9vh,108px);overflow:hidden;color:var(--text-primary);border-top:1px solid var(--border);background:color-mix(in srgb,var(--bg-primary) 34%,transparent)}
        .people-section:before{position:absolute;inset:-20% -8% auto 48%;width:55vw;height:55vw;border-radius:50%;background:radial-gradient(circle,rgba(104,11,15,.12),transparent 68%);content:"";pointer-events:none}
        .people-section__inner{position:relative;width:min(100%,var(--section-shell-width));margin:0 auto;padding:0 var(--page-gutter)}
        .testimonial-grid{position:relative;display:grid;width:min(100%,var(--section-shell-width));grid-template-columns:repeat(3,minmax(0,1fr));gap:12px;margin:0 auto;padding:0 var(--page-gutter)}
        .testimonial-card{position:relative;display:flex;min-height:260px;flex-direction:column;padding:clamp(23px,2vw,28px);overflow:hidden;border:1px solid rgba(255,255,255,.09);border-radius:16px;background:linear-gradient(145deg,rgba(255,255,255,.032),rgba(20,13,14,.72));box-shadow:0 20px 55px rgba(0,0,0,.16);transition:transform .35s cubic-bezier(.22,1,.36,1),border-color .3s ease,background .3s ease}
        .testimonial-card:hover{border-color:rgba(255,31,42,.28);background:linear-gradient(145deg,rgba(255,31,42,.045),rgba(20,13,14,.8));transform:translateY(-5px)}
        .testimonial-card__top{display:flex;align-items:flex-start;justify-content:space-between;color:var(--text-secondary);font-size:10px;letter-spacing:.12em}.testimonial-card__top b{height:42px;color:var(--accent);font:500 58px/.8 Georgia,serif;opacity:.85}
        .testimonial-card blockquote{max-width:29ch;margin-top:clamp(22px,2.6vh,30px);color:var(--text-primary);font:600 clamp(17px,1.4vw,21px)/1.42 var(--font-display);letter-spacing:-.015em}
        .testimonial-card__person{display:flex;align-items:center;gap:12px;margin-top:auto;padding-top:22px;color:var(--text-primary);background:transparent!important}.testimonial-card__avatar{display:grid;width:38px;height:38px;place-items:center;border:1px solid rgba(255,31,42,.34);border-radius:50%;color:var(--accent);background:rgba(255,31,42,.07);font-size:13px;font-weight:750}.testimonial-card__person>span:last-child{display:grid;gap:4px}.testimonial-card__person strong{font-size:14px}.testimonial-card__person small{color:var(--text-secondary);font-size:10px;letter-spacing:.09em;text-transform:uppercase}
        .contact-section{position:relative;min-height:auto!important;padding:var(--section-label-offset) var(--page-gutter) clamp(80px,10vh,120px)!important;overflow:hidden;color:var(--text-primary);border-top:1px solid var(--border);background:linear-gradient(145deg,rgba(10,8,9,.96),rgba(35,8,10,.82) 68%,rgba(8,7,8,.98))!important}
        .contact-section:before{position:absolute;inset:auto -8% -48% auto;width:65vw;height:65vw;border-radius:50%;background:radial-gradient(circle,rgba(255,31,42,.12),transparent 65%);content:"";pointer-events:none}.contact-section__inner{position:relative;z-index:2;width:min(100%,var(--section-shell-width));margin:0 auto}.contact-section .section-heading{max-width:17ch}.contact-section .section-heading span{color:var(--accent)}.contact-section .section-subheading{max-width:820px!important;color:var(--text-secondary)}
        .contact-cards{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px;margin-top:clamp(42px,6vh,68px)}.contact-card{position:relative;display:grid;min-width:0;grid-template-columns:auto minmax(0,1fr) auto;align-items:center;gap:16px;padding:22px;border:1px solid rgba(255,255,255,.1);border-radius:14px;color:var(--text-primary);background:rgba(255,255,255,.018);transition:transform .3s cubic-bezier(.22,1,.36,1),border-color .25s ease,background .25s ease}.contact-card:hover{border-color:rgba(255,31,42,.34);background:rgba(255,31,42,.045);transform:translateY(-3px)}.contact-card__icon{display:grid;width:48px;height:48px;place-items:center;border:1px solid rgba(255,255,255,.11);border-radius:12px;background:rgba(255,255,255,.025)}.contact-card__icon svg{width:21px;height:21px;stroke-width:1.7}.contact-card>span:nth-child(2){display:grid;min-width:0;gap:6px}.contact-card strong{font-size:15px}.contact-card small{overflow:hidden;color:var(--text-secondary);font-size:12px;text-overflow:ellipsis;white-space:nowrap}.contact-card__arrow{width:17px;height:17px;color:var(--accent);opacity:.75;transition:transform .25s ease}.contact-card:hover .contact-card__arrow{transform:translate(3px,-3px)}
        .contact-actions{display:flex;flex-wrap:wrap;gap:10px;margin-top:18px}.contact-action{display:inline-flex;min-width:210px;align-items:center;justify-content:center;gap:10px;padding:14px 22px;border:1px solid rgba(255,255,255,.14);border-radius:12px;color:var(--text-primary);background:rgba(255,255,255,.02);font:600 12px/1 var(--font-body);letter-spacing:.05em;cursor:pointer;transition:transform .25s ease,border-color .25s ease,background .25s ease}.contact-action svg{width:17px;height:17px;stroke-width:1.7}.contact-action:hover{border-color:rgba(255,31,42,.46);background:rgba(255,31,42,.07);transform:translateY(-2px)}
        .site-footer{padding:clamp(54px,7vh,82px) var(--page-gutter) 34px;color:var(--text-secondary);border-top:1px solid rgba(255,255,255,.07);background:#090809}.site-footer__inner{position:relative;display:grid;width:min(100%,var(--section-shell-width));grid-template-columns:minmax(0,1.5fr) minmax(130px,.35fr) minmax(140px,.35fr);gap:clamp(40px,8vw,120px);margin:0 auto}.site-footer__brand strong{display:flex;align-items:center;gap:11px;color:var(--text-primary);font-size:17px}.site-footer__brand strong span{display:grid;width:34px;height:34px;place-items:center;border:1px solid rgba(255,31,42,.35);border-radius:10px;color:var(--accent);font-size:13px}.site-footer__brand p{max-width:48ch;margin-top:20px;font-size:14px;line-height:1.65}.site-footer__brand small{display:block;margin-top:32px;font-size:10px;letter-spacing:.08em;text-transform:uppercase}.site-footer__nav,.site-footer__connect{display:flex;align-items:flex-start;flex-direction:column;gap:13px}.site-footer__nav b,.site-footer__connect b{margin-bottom:5px;color:rgba(255,255,255,.4);font-size:10px;letter-spacing:.12em;text-transform:uppercase}.site-footer__nav a,.site-footer__connect a{color:var(--text-secondary);font-size:13px;transition:color .2s ease}.site-footer__nav a:hover,.site-footer__connect a:hover{color:var(--accent)}.site-footer__connect a{display:flex;align-items:center;gap:8px}.site-footer__connect svg{width:15px;height:15px}.site-footer__top{position:absolute;right:0;bottom:0;display:grid;width:38px;height:38px;place-items:center;border:1px solid rgba(255,255,255,.1);border-radius:50%;color:var(--text-primary);background:rgba(255,255,255,.02)}
        @media(max-width:900px){.testimonial-grid{grid-template-columns:1fr}.testimonial-card{min-height:230px}}
        @media(max-width:900px){.contact-cards{grid-template-columns:1fr}.site-footer__inner{grid-template-columns:1fr 1fr}.site-footer__brand{grid-column:1/-1}}
        @media(max-width:600px){.people-section__inner{padding:0 var(--page-gutter)}.contact-section .section-heading{max-width:13ch;white-space:normal}.contact-actions{align-items:stretch;flex-direction:column}.contact-action{width:100%}.site-footer__inner{grid-template-columns:1fr;gap:34px}.site-footer__brand{grid-column:auto}.site-footer__top{right:0;bottom:0}}
        @media(prefers-reduced-motion:reduce){.testimonial-card:hover,.contact-action:hover{transform:none}}
      `}</style>
    </div>
  );
}
