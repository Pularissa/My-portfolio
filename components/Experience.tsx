'use client';
import { useScrollReveal } from './useScrollReveal';

const experiences = [
  {
    id: "01",
    company: "Rwanda Coding Academy",
    role: "Software Programming & Embedded Systems Student",
    period: "2023 — Present",
    type: "Education",
    description: "Studying software engineering and embedded systems at one of Rwanda's top coding academies. Building real-world projects spanning web apps, desktop software, IoT devices, and AI-assisted systems.",
  },
  {
    id: "02",
    company: "UmuhinziLink",
    role: "Founder & Lead Developer",
    period: "2024 — Present",
    type: "Project",
    description: "Designed and built a full-stack AgriTech platform connecting Rwandan farmers with buyers. Integrated AI farming advice, live market pricing, and digital payments using Next.js, Node.js, and PostgreSQL.",
  },
  {
    id: "03",
    company: "YNT Rwanda",
    role: "Frontend Developer",
    period: "2024",
    type: "Project",
    description: "Developed a modern NGO website with multi-language support (i18next), membership registration, donation handling, and an events management system using React and Tailwind CSS.",
  },
  {
    id: "04",
    company: "Independent Projects",
    role: "Self-directed Developer",
    period: "2023 — Present",
    type: "Personal",
    description: "Built 10+ projects across web (React, Spring Boot), desktop (Java Swing), and hardware (Arduino, ESP8266). Topics include traffic education, library management, IoT smart gardens, and personal safety apps.",
  },
];

function TimelineItem({ exp, index }: { exp: typeof experiences[0]; index: number }) {
  const [ref, visible] = useScrollReveal<HTMLDivElement>({ threshold: 0.18 });
  const isEven = index % 2 === 0;
  const words = exp.description.split(' ');

  const typeColor: Record<string, string> = {
    Education: '#6ee7b7',
    Project:   'var(--gold)',
    Personal:  'rgba(245,240,235,0.45)',
  };

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

        <div className="timeline-card-header">
          <div style={{ overflow: 'hidden' }}>
            <h3 className="timeline-company" style={{
              transform: visible ? 'translateY(0)' : 'translateY(100%)',
              transition: `transform 0.6s cubic-bezier(0.16,1,0.3,1) ${index * 110 + 80}ms`,
            }}>
              {exp.company}
            </h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px' }}>
            <span className="timeline-period" style={{
              opacity: visible ? 1 : 0,
              transition: `opacity 0.6s ease ${index * 110 + 200}ms`,
            }}>
              {exp.period}
            </span>
            <span style={{
              fontSize: '0.62rem', fontWeight: 600, letterSpacing: '0.14em',
              textTransform: 'uppercase', color: typeColor[exp.type] ?? 'var(--gold)',
              opacity: visible ? 0.9 : 0,
              transition: `opacity 0.6s ease ${index * 110 + 240}ms`,
            }}>
              {exp.type}
            </span>
          </div>
        </div>

        <p className="timeline-role" style={{
          opacity: visible ? 0.75 : 0,
          transition: `opacity 0.6s ease ${index * 110 + 260}ms`,
        }}>
          {exp.role}
        </p>

        {/* Word-by-word stagger */}
        <p className="timeline-desc" aria-label={exp.description}>
          {words.map((word, wi) => (
            <span key={wi} style={{
              display: 'inline-block',
              marginRight: '0.28em',
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(10px)',
              transition: `opacity 0.4s ease ${index * 110 + 300 + wi * 18}ms,
                           transform 0.4s ease ${index * 110 + 300 + wi * 18}ms`,
            }}>
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
  const [lineRef,   lineVisible]   = useScrollReveal<HTMLDivElement>({ threshold: 0.5 });

  return (
    <section id="experience" className="experience-section">
      <div className="experience-inner">

        <div ref={headerRef} className="experience-header" style={{
          opacity: headerVisible ? 1 : 0,
          transform: headerVisible ? 'translateY(0)' : 'translateY(36px)',
          transition: 'opacity 0.8s ease, transform 0.8s cubic-bezier(0.25,1,0.5,1)',
        }}>
          <div className="section-label">
            <span className="section-label-line" />
            <span className="section-label-text">Education & Experience</span>
          </div>
          <h2 className="section-heading">My <em>Journey</em></h2>
          <div ref={lineRef} className="line-draw" style={{
            marginTop: '24px',
            width: lineVisible ? '100%' : '0%',
            transition: 'width 1.2s cubic-bezier(0.25,1,0.5,1) 0.3s',
          }} />
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
