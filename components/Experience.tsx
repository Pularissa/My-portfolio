'use client';
import { useScrollReveal } from './useScrollReveal';

const experiences = [
  {
    id: "01",
    company: "KW Enterprise",
    role: "Frontend Developer",
    period: "2023 — Present",
    description: "Led the redesign of the client portal, improving engagement by 40%. Delivered pixel-perfect, accessible interfaces using React and TypeScript.",
  },
  {
    id: "02",
    company: "Freelance",
    role: "Full-Stack Developer",
    period: "2022 — 2023",
    description: "Delivered end-to-end web solutions for clients across logistics and education. Managed the full lifecycle from requirements through to deployment.",
  },
  {
    id: "03",
    company: "Tech Bootcamp",
    role: "Junior Developer",
    period: "2021 — 2022",
    description: "Intensive modern web development training. Shipped production-ready features in agile teams — React, Node.js, and database design.",
  },
  {
    id: "04",
    company: "Personal Projects",
    role: "Self-directed Learning",
    period: "2020 — 2021",
    description: "Explored Solidity, ML fundamentals, and mobile-first design. Built 8+ projects spanning different domains and stacks.",
  },
];

function TimelineItem({ exp, index }: { exp: typeof experiences[0]; index: number }) {
  const [ref, visible] = useScrollReveal<HTMLDivElement>({ threshold: 0.2 });
  const isEven = index % 2 === 0;
  const words = exp.description.split(' ');

  return (
    <div
      ref={ref}
      className="timeline-item"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateX(0)' : `translateX(${isEven ? '-52px' : '52px'})`,
        transition: `opacity 0.75s ease ${index * 110}ms, transform 0.75s cubic-bezier(0.16,1,0.3,1) ${index * 110}ms`,
      }}
    >
      <div className="timeline-node">{exp.id}</div>
      <div className="timeline-card">

        {/* Company + period — clip reveal */}
        <div className="timeline-card-header">
          <div style={{ overflow: 'hidden' }}>
            <h3 className="timeline-company"
              style={{
                transform: visible ? 'translateY(0)' : 'translateY(100%)',
                transition: `transform 0.6s cubic-bezier(0.16,1,0.3,1) ${index * 110 + 80}ms`,
              }}
            >{exp.company}</h3>
          </div>
          <span className="timeline-period"
            style={{
              opacity: visible ? 1 : 0,
              transition: `opacity 0.6s ease ${index * 110 + 200}ms`,
            }}
          >{exp.period}</span>
        </div>

        <p className="timeline-role"
          style={{
            opacity: visible ? 0.7 : 0,
            transition: `opacity 0.6s ease ${index * 110 + 250}ms`,
          }}
        >{exp.role}</p>

        {/* Description — word-by-word stagger */}
        <p className="timeline-desc" aria-label={exp.description}>
          {words.map((word, wi) => (
            <span
              key={wi}
              style={{
                display: 'inline-block',
                marginRight: '0.3em',
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(10px)',
                transition: `opacity 0.4s ease ${index * 110 + 300 + wi * 22}ms,
                             transform 0.4s ease ${index * 110 + 300 + wi * 22}ms`,
              }}
            >
              {word}
            </span>
          ))}
        </p>

      </div>
    </div>
  );
}

export default function Experience() {
  const [headerRef, headerVisible] = useScrollReveal<HTMLDivElement>();
  const [lineRef, lineVisible] = useScrollReveal<HTMLDivElement>({ threshold: 0.5 });

  return (
    <section id="experience" className="experience-section">
      <div className="experience-inner">

        <div
          ref={headerRef}
          className="experience-header"
          style={{
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? 'translateY(0)' : 'translateY(36px)',
            transition: 'opacity 0.8s ease, transform 0.8s cubic-bezier(0.25,1,0.5,1)',
          }}
        >
          <div className="section-label">
            <span className="section-label-line" />
            <span className="section-label-text">Background</span>
          </div>
          <h2 className="section-heading">Work <em>Experience</em></h2>

          {/* Animated line draw */}
          <div ref={lineRef} className="line-draw" style={{ marginTop: '24px', width: lineVisible ? '100%' : '0%', transition: 'width 1.2s cubic-bezier(0.25,1,0.5,1) 0.3s' }} />
        </div>

        <div className="timeline">
          {experiences.map((exp, i) => (
            <TimelineItem key={exp.id} exp={exp} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
