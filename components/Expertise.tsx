import SectionLabel from "./SectionLabel";

const EXPERTISE = [
  {
    title: "Backend",
    items: ["Java", "Spring Boot", "REST APIs", "Microservices", "JWT & Security", "Kafka"],
    path: "M6 5h12v5H6zM6 14h12v5H6zM9 7.5h.01M9 16.5h.01",
  },
  {
    title: "Databases",
    items: ["PostgreSQL", "MySQL", "Redis", "Schema Design", "Query Optimization", "Migrations"],
    path: "M5 6c0-2 14-2 14 0s-14 2-14 0v12c0 2 14 2 14 0V6M5 12c0 2 14 2 14 0",
  },
  {
    title: "Systems",
    items: ["Distributed Systems", "Scalable Architecture", "Caching Strategies", "Idempotency", "Retry & Fault Tolerance", "Load Handling"],
    path: "M12 3v6m0 6v6M3 12h6m6 0h6M7.5 7.5l2.2 2.2m4.6 4.6 2.2 2.2m0-9-2.2 2.2m-4.6 4.6-2.2 2.2",
  },
  {
    title: "Frontend",
    items: ["React.js", "Next.js", "TypeScript", "Tailwind CSS", "State Management", "Responsive Design"],
    path: "M4 5h16v12H4zM8 21h8M12 17v4m-4-12-2 2 2 2m8-4 2 2-2 2",
  },
  {
    title: "DevOps",
    items: ["Docker", "GitHub Actions", "CI / CD Pipelines", "Vercel", "Nginx", "Monitoring"],
    path: "M12 3v12m0 0 4-4m-4 4-4-4M5 19h14",
  },
  {
    title: "Integrations",
    items: ["UPI / Payments", "Razorpay", "Webhooks", "Third-party APIs", "Email / SMS", "Background Jobs"],
    path: "M8 12h8M9 8l-3 4 3 4m6-8 3 4-3 4M5 4h14v16H5z",
  },
] as const;

export default function Expertise() {
  return (
    <section id="expertise" className="expertise" aria-labelledby="expertise-title">
      <SectionLabel index="03">Expertise</SectionLabel>
      <div className="expertise__inner">
        <div className="expertise__intro">
          <h2 id="expertise-title" className="section-heading" data-reveal="">
            <span>I design. I develop. </span>
            <span className="expertise__accent">I deploy.</span>
          </h2>
          <p className="section-subheading" data-reveal="">
            From idea to production — I handle everything in between so products don&apos;t just look good, they work reliably and scale.
          </p>
        </div>

        <div className="expertise__grid">
          {EXPERTISE.map((category) => (
            <article className="expertise__category" data-reveal="" key={category.title}>
              <div className="expertise__icon" aria-hidden="true">
                <svg viewBox="0 0 24 24"><path d={category.path} /><circle cx="19" cy="5" r="1.4" /></svg>
              </div>
              <h3>{category.title}</h3>
              <ul>
                {category.items.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
