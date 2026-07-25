'use client';

import Image from 'next/image';
import { useState, useEffect, useCallback } from 'react';

const projects = [
  {
    id: 1, number: "01", featured: true,
    title: "UmuhinziLink", subtitle: "AgriTech Platform",
    description: "A digital platform connecting Rwandan smallholder farmers directly with buyers — cutting out middlemen, improving market access, and delivering AI-powered farming advice, live market prices, and digital payment support.",
    techs: ["Next.js", "React", "Node.js", "PostgreSQL", "Tailwind CSS", "AI Integration"],
    highlights: ["Farmer & buyer marketplace", "AI farming assistant", "Secure auth & payments"],
    bgImage: "/images/bus.png", fgImage: "/images/me.png", link: "#",
  },
  {
    id: 2, number: "02", featured: false,
    title: "YNT Rwanda", subtitle: "NGO Website",
    description: "A modern website for Youth for National Transformation Rwanda — showcasing the organisation's mission, managing memberships, collecting donations, publishing events, and supporting multi-language audiences.",
    techs: ["React.js", "Tailwind CSS", "React Router", "i18next", "JavaScript"],
    highlights: ["Multi-language (i18next)", "Membership & donations", "Events management"],
    bgImage: "/images/me.png", fgImage: "/images/bus.png", link: "#",
  },
  {
    id: 3, number: "03", featured: false,
    title: "Hotel & Flight Booking", subtitle: "Full-Stack App",
    description: "A full-stack booking application letting users search, book, and manage hotel and flight reservations with secure authentication, booking history, and automated scheduler reports.",
    techs: ["Spring Boot", "Java", "PostgreSQL", "Hibernate", "REST API"],
    highlights: ["Hotel & flight search", "User auth & history", "Scheduler reports"],
    bgImage: "/images/bus.png", fgImage: "/images/me.png", link: "#",
  },
  {
    id: 4, number: "04", featured: false,
    title: "Smart Garden Monitor", subtitle: "IoT / Embedded System",
    description: "An embedded IoT solution monitoring environmental conditions for smart farming — tracking temperature, humidity, and soil conditions with real-time LCD display and ESP8266 WiFi connectivity.",
    techs: ["Arduino", "C++", "DHT11", "LM35", "LCD I2C", "ESP8266"],
    highlights: ["Real-time sensor readings", "LCD display", "IoT connectivity"],
    bgImage: "/images/me.png", fgImage: "/images/bus.png", link: "#",
  },
  {
    id: 5, number: "05", featured: false,
    title: "Rwanda Traffic Signs", subtitle: "Educational Platform",
    description: "An interactive learning platform helping learner drivers prepare for Rwanda driving theory exams — with hundreds of traffic sign questions, practice mode, quiz mode, score tracking, and instant feedback.",
    techs: ["React", "JavaScript", "CSS"],
    highlights: ["Hundreds of questions", "Practice & quiz modes", "Score tracking"],
    bgImage: "/images/bus.png", fgImage: "/images/me.png", link: "#",
  },
  {
    id: 6, number: "06", featured: false,
    title: "Library Management System", subtitle: "Desktop Application",
    description: "A desktop application for managing books, borrowing, returns, and student records — with full search functionality and report generation, built with Java Swing and PostgreSQL.",
    techs: ["Java", "Java Swing", "JDBC", "PostgreSQL"],
    highlights: ["Book & student management", "Borrow/return tracking", "Report generation"],
    bgImage: "/images/me.png", fgImage: "/images/bus.png", link: "#",
  },
  {
    id: 7, number: "07", featured: false,
    title: "pBeFree", subtitle: "Drug Prevention App",
    description: "A youth-focused platform helping prevent drug abuse through education, peer support, AI-powered counseling, and access to healthy activities — empowering young people to build a drug-free future.",
    techs: ["React.js", "Node.js", "Express.js", "MongoDB", "JWT", "OpenAI API", "Firebase", "Google Maps API", "Tailwind CSS"],
    highlights: ["AI chatbot & personalized guidance", "Find nearby rehab centres (Maps)", "Push notifications & reminders"],
    bgImage: "/images/bus.png", fgImage: "/images/me.png", link: "#",
  },
];

export default function Projects() {
  const [current, setCurrent] = useState(0);
  const [sliding, setSliding] = useState(false);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');
  const [paused, setPaused] = useState(false);

  const goTo = useCallback((idx: number, dir: 'next' | 'prev' = 'next') => {
    if (sliding) return;
    setDirection(dir);
    setSliding(true);
    setTimeout(() => { setCurrent(idx); setSliding(false); }, 480);
  }, [sliding]);

  const next = useCallback(() => goTo((current + 1) % projects.length, 'next'), [current, goTo]);
  const prev = useCallback(() => goTo((current - 1 + projects.length) % projects.length, 'prev'), [current, goTo]);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(next, 3000);
    return () => clearInterval(t);
  }, [paused, next]);

  const p = projects[current];
  const exitX = direction === 'next' ? '-60px' : '60px';
  const entX  = direction === 'next' ?  '60px' : '-60px';

  const arrowStyle: React.CSSProperties = {
    width: 44, height: 44, borderRadius: '50%',
    border: '1px solid var(--border-hover)', background: 'transparent',
    color: 'var(--white-dim)', cursor: 'pointer',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    transition: 'all 0.3s ease',
  };

  return (
    <section
      id="projects"
      className="projects-section"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="projects-inner">

        {/* #1 Fade up header */}
        <div className="projects-header reveal">
          <div className="section-label">
            <span className="section-label-line" />
            <span className="section-label-text">My Work</span>
          </div>
          <div className="clip-wrap">
            <h2 className="section-heading reveal-clip">Real <em>Projects</em></h2>
          </div>
          <p style={{ marginTop: '12px', fontSize: '0.95rem', color: 'var(--white-dim)', maxWidth: '500px', lineHeight: 1.7 }}>
            10+ academic and personal projects built at Rwanda Coding Academy — solving real problems with real code.
          </p>
        </div>

        {/* #3 Scale + #5 slide on project change */}
        <div className="project-showcase reveal-scale" style={{ transitionDelay: '150ms' }}>

          {/* Images — slide transition */}
          <div
            className="project-images"
            style={{
              opacity: sliding ? 0 : 1,
              transform: sliding ? `translateX(${exitX}) scale(0.96)` : 'translateX(0) scale(1)',
              transition: sliding
                ? 'opacity 0.4s ease, transform 0.4s ease'
                : `opacity 0.5s ease, transform 0.5s ease`,
            }}
          >
            <div className="project-img-back">
              <Image src={p.bgImage} alt={p.title} fill className="object-cover" sizes="340px" />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg,rgba(201,169,110,0.14) 0%,transparent 60%)' }} />
            </div>
            <div className="project-img-front">
              <Image src={p.fgImage} alt={`${p.title} detail`} fill className="object-cover" sizes="320px" />
            </div>
            {p.featured && (
              <div style={{
                position: 'absolute', top: '-12px', right: '20px', zIndex: 10,
                background: 'var(--gold)', color: '#080808', fontSize: '0.6rem',
                fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase',
                padding: '5px 14px', borderRadius: '50px',
              }}>Featured</div>
            )}
          </div>

          {/* Content — opposite slide */}
          <div
            className="project-content"
            style={{
              opacity: sliding ? 0 : 1,
              transform: sliding ? `translateX(${entX})` : 'translateX(0)',
              transition: sliding
                ? 'opacity 0.4s ease, transform 0.4s ease'
                : 'opacity 0.5s ease 0.05s, transform 0.5s ease 0.05s',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span className="project-number">Project {p.number}</span>
              <span style={{ fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--white-dim)', opacity: 0.6 }}>
                {p.subtitle}
              </span>
            </div>

            <h3 className="project-title">{p.title}</h3>
            <p className="project-desc">{p.description}</p>

            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {p.highlights.map((h) => (
                <li key={h} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.85rem', color: 'var(--white-dim)' }}>
                  <span style={{ color: 'var(--gold)', fontSize: '0.5rem' }}>◆</span>
                  {h}
                </li>
              ))}
            </ul>

            <div>
              <p className="tech-label">Technologies</p>
              <div className="tech-tags">
                {p.techs.map((t) => <span key={t}>{t}</span>)}
              </div>
            </div>

            <a href={p.link} className="btn-demo">
              View Project
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M7 17L17 7M17 7H7M17 7v10" />
              </svg>
            </a>
          </div>
        </div>

        {/* Controls */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '56px' }}>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button onClick={prev} aria-label="Previous project" style={arrowStyle}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--gold)'; (e.currentTarget as HTMLButtonElement).style.color = 'var(--gold)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--border-hover)'; (e.currentTarget as HTMLButtonElement).style.color = 'var(--white-dim)'; }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M15 18l-6-6 6-6"/></svg>
            </button>
            <button onClick={next} aria-label="Next project" style={arrowStyle}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--gold)'; (e.currentTarget as HTMLButtonElement).style.color = 'var(--gold)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--border-hover)'; (e.currentTarget as HTMLButtonElement).style.color = 'var(--white-dim)'; }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M9 18l6-6-6-6"/></svg>
            </button>
          </div>

          <div className="projects-pagination">
            {projects.map((proj, i) => (
              <button key={i}
                className={`proj-dot${i === current ? ' active' : ''}`}
                onClick={() => goTo(i, i > current ? 'next' : 'prev')}
                aria-label={`Go to project: ${proj.title}`}
                title={proj.title}
              />
            ))}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.65rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--white-dim)', opacity: 0.5 }}>
            <span style={{
              width: 6, height: 6, borderRadius: '50%', display: 'block',
              background: paused ? 'var(--white-dim)' : 'var(--gold)',
              boxShadow: paused ? 'none' : '0 0 8px rgba(201,169,110,0.6)',
            }} />
            {paused ? 'Paused' : 'Auto'}
          </div>
        </div>

      </div>
    </section>
  );
}
