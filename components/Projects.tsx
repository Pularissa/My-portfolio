'use client';

import Image from 'next/image';
import { useState } from 'react';

const projects = [
  {
    id: 1,
    number: "01",
    title: "Transit Connect",
    description:
      "A real-time transit management platform that streamlines bus scheduling, passenger tracking, and route optimisation. Built with Next.js and a robust REST API layer.",
    techs: ["Next.js", "TypeScript", "REST API", "Tailwind"],
    bgImage: "/images/bus.png",
    fgImage: "/images/me.png",
    link: "#",
  },
  {
    id: 2,
    number: "02",
    title: "Developer Portfolio",
    description:
      "A thoughtfully designed personal portfolio built with React and Next.js, showcasing projects and skills through a refined, minimal interface.",
    techs: ["React", "Next.js", "TypeScript", "CSS"],
    bgImage: "/images/me.png",
    fgImage: "/images/bus.png",
    link: "#",
  },
  {
    id: 3,
    number: "03",
    title: "Smart Analytics",
    description:
      "A data analytics dashboard powered by machine learning insights. Offers real-time reporting, trend prediction, and interactive visualisations.",
    techs: ["Python", "ML", "React", "Node.js"],
    bgImage: "/images/bus.png",
    fgImage: "/images/me.png",
    link: "#",
  },
];

export default function Projects() {
  const [current, setCurrent] = useState(0);
  const project = projects[current];

  return (
    <section id="projects" className="projects-section">
      <div className="projects-inner">

        {/* Header */}
        <div className="projects-header">
          <div className="section-label">
            <span className="section-label-line" />
            <span className="section-label-text">Portfolio</span>
          </div>
          <h2 className="section-heading">
            Featured <em>Projects</em>
          </h2>
        </div>

        {/* Showcase */}
        <div className="project-showcase">

          {/* Stacked images */}
          <div className="project-images">
            <div className="project-img-back">
              <Image src={project.bgImage} alt={project.title}
                fill className="object-cover" sizes="340px" />
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(135deg,rgba(201,169,110,0.12) 0%,transparent 60%)',
              }} />
            </div>
            <div className="project-img-front">
              <Image src={project.fgImage} alt={`${project.title} detail`}
                fill className="object-cover" sizes="320px" />
            </div>
          </div>

          {/* Content */}
          <div className="project-content">
            <span className="project-number">Project {project.number}</span>
            <h3 className="project-title">{project.title}</h3>
            <p className="project-desc">{project.description}</p>

            <div>
              <p className="tech-label">Technologies</p>
              <div className="tech-tags">
                {project.techs.map((t) => <span key={t}>{t}</span>)}
              </div>
            </div>

            <div className="project-actions" style={{ display: 'flex', gap: '12px' }}>
              <a href={project.link} className="btn-demo">
                View Project
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M7 17L17 7M17 7H7M17 7v10" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Pagination */}
        <div className="projects-pagination">
          {projects.map((_, i) => (
            <button key={i}
              className={`proj-dot${i === current ? ' active' : ''}`}
              onClick={() => setCurrent(i)}
              aria-label={`Go to project ${i + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
