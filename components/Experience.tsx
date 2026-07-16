'use client';

const experiences = [
  {
    id: "01",
    company: "KW Enterprise",
    role: "Frontend Developer",
    period: "2023 — Present",
    description:
      "Led the redesign of the client portal, improving engagement by 40%. Collaborated cross-functionally to deliver pixel-perfect, accessible interfaces using React and TypeScript.",
  },
  {
    id: "02",
    company: "Freelance",
    role: "Full-Stack Developer",
    period: "2022 — 2023",
    description:
      "Delivered end-to-end web solutions for clients across logistics and education sectors. Managed the full lifecycle from requirements through to deployment.",
  },
  {
    id: "03",
    company: "Tech Bootcamp",
    role: "Junior Developer",
    period: "2021 — 2022",
    description:
      "Intensive training in modern web development. Shipped production-ready features in agile teams, focusing on React, Node.js, and database design.",
  },
  {
    id: "04",
    company: "Personal Projects",
    role: "Self-directed Learning",
    period: "2020 — 2021",
    description:
      "Explored Solidity, machine learning fundamentals, and mobile-first design. Built a portfolio of 8+ projects across different domains.",
  },
];

export default function Experience() {
  return (
    <section id="experience" className="experience-section">
      <div className="experience-inner">

        {/* Header */}
        <div className="experience-header">
          <div className="section-label">
            <span className="section-label-line" />
            <span className="section-label-text">Background</span>
          </div>
          <h2 className="section-heading">
            Work <em>Experience</em>
          </h2>
        </div>

        {/* Timeline */}
        <div className="timeline">
          {experiences.map((exp) => (
            <div key={exp.id} className="timeline-item">
              <div className="timeline-node">{exp.id}</div>
              <div className="timeline-card">
                <div className="timeline-card-header">
                  <h3 className="timeline-company">{exp.company}</h3>
                  <span className="timeline-period">{exp.period}</span>
                </div>
                <p className="timeline-role">{exp.role}</p>
                <p className="timeline-desc">{exp.description}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
