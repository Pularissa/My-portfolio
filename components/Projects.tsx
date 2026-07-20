'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useScrollReveal } from './useScrollReveal';

const projects = [
  {
    id: 1,
    number: "01",
    featured: true,
    title: "UmuhinziLink",
    subtitle: "AgriTech Platform",
    description:
      "A digital platform connecting Rwandan smallholder farmers directly with buyers — cutting out middlemen, improving market access, and delivering AI-powered farming advice, live market prices, and digital payment support.",
    techs: ["Next.js", "React", "Node.js", "PostgreSQL", "Tailwind CSS", "AI Integration"],
    highlights: ["Farmer & buyer marketplace", "AI farming assistant", "Secure auth & payments"],
    bgImage: "/images/bus.png",
    fgImage: "/images/me.png",
    link: "#",
  },
  {
    id: 2,
    number: "02",
    featured: false,
    title: "YNT Rwanda",
    subtitle: "NGO Website",
    description:
      "A modern website for Youth for National Transformation Rwanda — showcasing the organisation's mission, managing memberships, collecting donations, publishing events, and supporting multi-language audiences.",
    techs: ["React.js", "Tailwind CSS", "React Router", "i18next", "JavaScript"],
    highlights: ["Multi-language (i18next)", "Membership & donations", "Events management"],
    bgImage: "/images/me.png",
    fgImage: "/images/bus.png",
    link: "#",
  },
  {
    id: 3,
    number: "03",
    featured: false,
    title: "Hotel & Flight Booking",
    subtitle: "Full-Stack App",
    description:
      "A full-stack booking application letting users search, book, and manage hotel and flight reservations with secure authentication, booking history, and automated scheduler reports.",
    techs: ["Spring Boot", "Java", "PostgreSQL", "Hibernate", "REST API"],
    highlights: ["Hotel & flight search", "User auth & history", "Scheduler reports"],
    bgImage: "/images/bus.png",
    fgImage: "/images/me.png",
    link: "#",
  },
  {
    id: 4,
    number: "04",
    featured: false,
    title: "Smart Garden Monitor",
    subtitle: "IoT / Embedded System",
    description:
      "An embedded IoT solution that monitors environmental conditions for smart farming — tracking temperature, humidity, and soil conditions with real-time LCD display and ESP8266 WiFi connectivity.",
    techs: ["Arduino", "C++", "DHT11", "LM35", "LCD I2C", "ESP8266"],
    highlights: ["Real-time sensor readings", "LCD display", "IoT connectivity"],
    bgImage: "/images/me.png",
    fgImage: "/images/bus.png",
    link: "#",
  },
  {
    id: 5,
    number: "05",
    featured: false,
    title: "Rwanda Traffic Signs",
    subtitle: "Educational Platform",
    description:
      "An interactive learning platform helping learner drivers prepare for Rwanda driving theory exams — with hundreds of traffic sign questions, practice mode, quiz mode, score tracking, and instant feedback.",
    techs: ["React", "JavaScript", "CSS"],
    highlights: ["Hundreds of questions", "Practice & quiz modes", "Score tracking"],
    bgImage: "/images/bus.png",
    fgImage: "/images/me.png",
    link: "#",
  },
  {
    id: 6,
    number: "06",
    featured: false,
    title: "Library Management System",
    subtitle: "Desktop Application",
    description:
      "A desktop application for managing books, borrowing, returns, and student records — with full search functionality and report generation, built with Java Swing and PostgreSQL.",
    techs: ["Java", "Java Swing", "JDBC", "PostgreSQL"],
    highlights: ["Book & student management", "Borrow/return tracking", "Report generation"],
    bgImage: "/images/me.png",
    fgImage: "/images/bus.png",
    link: "#",
  },
];

export default function Projects() {
  const [current, setCurrent] = useState(0);
  const project = projects[current];

  const [headerRef, headerVisible] = useScrollReveal<HTMLDivElement>();
  const [imgRef,    imgVisible]    = useScrollReveal<HTMLDivElement>({ threshold: 0.2 });
  const [contentRef, contentVisible] = useScrollReveal<HTMLDivElement>({ threshold: 0.2 });

  return (
    <section id="projects" className="projects-section">
      <div className="projects-inner">

        {/* Header */}
        <div
          ref={headerRef}
          className="projects-header"
          style={{
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? 'translateY(0)' : 'translateY(40px)',
            transition: 'opacity 0.8s ease, transform 0.8s cubic-bezier(0.25,1,0.5,1)',
          }}
        >
          <div className="section-label">
            <span className="section-label-line" />
            <span className="section-label-text">My Work</span>
          </div>
          <h2 className="section-heading">
            Real <em>Projects</em>
          </h2>
          <p style={{ marginTop: '12px', fontSize: '0.95rem', color: 'var(--white-dim)', maxWidth: '500px', lineHeight: 1.7 }}>
            10+ academic and personal projects built at Rwanda Coding Academy and beyond — solving real problems with real code.
          </p>
        </div>

        <div className="project-showcase">

          {/* Images — slide from left */}
          <div
            ref={imgRef}
            className="project-images"
            style={{
              opacity: imgVisible ? 1 : 0,
              transform: imgVisible ? 'translateX(0) scale(1)' : 'translateX(-60px) scale(0.96)',
              transition: 'opacity 0.9s ease 0.1s, transform 0.9s cubic-bezier(0.25,1,0.5,1) 0.1s',
            }}
          >
            <div className="project-img-back">
              <Image src={project.bgImage} alt={project.title}
                fill className="object-cover" sizes="340px" />
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(135deg, rgba(201,169,110,0.14) 0%, transparent 60%)',
              }} />
            </div>
            <div className="project-img-front">
              <Image src={project.fgImage} alt={`${project.title} detail`}
                fill className="object-cover" sizes="320px" />
            </div>
            {/* Featured badge */}
            {project.featured && (
              <div style={{
                position: 'absolute', top: '-12px', right: '20px', zIndex: 10,
                background: 'var(--gold)', color: '#080808',
                fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.18em',
                textTransform: 'uppercase', padding: '5px 14px', borderRadius: '50px',
              }}>
                Featured
              </div>
            )}
          </div>

          {/* Content — slide from right */}
          <div
            ref={contentRef}
            className="project-content"
            style={{
              opacity: contentVisible ? 1 : 0,
              transform: contentVisible ? 'translateX(0)' : 'translateX(60px)',
              transition: 'opacity 0.9s ease 0.2s, transform 0.9s cubic-bezier(0.25,1,0.5,1) 0.2s',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span className="project-number">Project {project.number}</span>
              <span style={{
                fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase',
                color: 'var(--white-dim)', opacity: 0.6,
              }}>
                {project.subtitle}
              </span>
            </div>

            <h3 className="project-title">{project.title}</h3>
            <p className="project-desc">{project.description}</p>

            {/* Highlights */}
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {project.highlights.map((h, i) => (
                <li key={i} style={{
                  display: 'flex', alignItems: 'center', gap: '10px',
                  fontSize: '0.85rem', color: 'var(--white-dim)',
                  opacity: contentVisible ? 1 : 0,
                  transform: contentVisible ? 'translateX(0)' : 'translateX(16px)',
                  transition: `opacity 0.5s ease ${0.35 + i * 0.08}s, transform 0.5s ease ${0.35 + i * 0.08}s`,
                }}>
                  <span style={{ color: 'var(--gold)', fontSize: '0.5rem' }}>◆</span>
                  {h}
                </li>
              ))}
            </ul>

            <div>
              <p className="tech-label">Technologies</p>
              <div className="tech-tags">
                {project.techs.map((t, i) => (
                  <span key={t} style={{
                    opacity: contentVisible ? 1 : 0,
                    transform: contentVisible ? 'translateY(0)' : 'translateY(12px)',
                    transition: `opacity 0.5s ease ${0.4 + i * 0.07}s, transform 0.5s ease ${0.4 + i * 0.07}s`,
                  }}>
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <a href={project.link} className="btn-demo">
              View Project
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M7 17L17 7M17 7H7M17 7v10" />
              </svg>
            </a>
          </div>
        </div>

        {/* Pagination */}
        <div className="projects-pagination">
          {projects.map((p, i) => (
            <button
              key={i}
              className={`proj-dot${i === current ? ' active' : ''}`}
              onClick={() => setCurrent(i)}
              aria-label={`Go to project: ${p.title}`}
              title={p.title}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
