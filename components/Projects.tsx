'use client';

import Image from 'next/image';
import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

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
  const [current, setCurrent]     = useState(0);
  const [sliding, setSliding]     = useState(false);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');
  const [paused, setPaused]       = useState(false);

  const headerRef    = useRef(null);
  const showcaseRef  = useRef(null);
  const headerInView   = useInView(headerRef,   { once: true, margin: '-60px' });
  const showcaseInView = useInView(showcaseRef, { once: true, margin: '-80px' });

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
  const exitX = direction === 'next' ? -60 : 60;
  const entX  = direction === 'next' ?  60 : -60;

  const arrowBtn: React.CSSProperties = {
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

        {/* ── Header — Down #1 Fade Up ── */}
        <motion.div
          ref={headerRef}
          className="projects-header"
          initial={{ opacity: 0, y: 44 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="section-label">
            <span className="section-label-line" />
            <span className="section-label-text">My Work</span>
          </div>
          <h2 className="section-heading">Real <em>Projects</em></h2>
          <p style={{ marginTop: '12px', fontSize: '0.95rem', color: 'var(--white-dim)', maxWidth: '500px', lineHeight: 1.7 }}>
            10+ academic and personal projects built at Rwanda Coding Academy — solving real problems with real code.
          </p>
        </motion.div>

        {/* ── Showcase — Down #1 scale + slide in on enter ── */}
        <motion.div
          ref={showcaseRef}
          className="project-showcase"
          initial={{ opacity: 0, y: 56, scale: 0.97 }}
          animate={showcaseInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Images — Down #5 slide left/right on project change */}
          <motion.div
            className="project-images"
            key={`img-${p.id}`}
            initial={{ opacity: 0, x: entX, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: exitX, scale: 0.95 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
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
              }}>
                Featured
              </div>
            )}
          </motion.div>

          {/* Content — Down #8 blur reveal + slide */}
          <motion.div
            className="project-content"
            key={`content-${p.id}`}
            initial={{ opacity: 0, x: -entX, filter: 'blur(6px)' }}
            animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, x: -exitX }}
            transition={{ duration: 0.58, delay: 0.06, ease: [0.16, 1, 0.3, 1] }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span className="project-number">Project {p.number}</span>
              <span style={{ fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--white-dim)', opacity: 0.6 }}>
                {p.subtitle}
              </span>
            </div>

            <h3 className="project-title">{p.title}</h3>
            <p className="project-desc">{p.description}</p>

            {/* Highlights — Down #1 stagger */}
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {p.highlights.map((h, i) => (
                <motion.li
                  key={h}
                  style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.85rem', color: 'var(--white-dim)' }}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.12 + i * 0.08 }}
                >
                  <span style={{ color: 'var(--gold)', fontSize: '0.5rem' }}>◆</span>
                  {h}
                </motion.li>
              ))}
            </ul>

            <div>
              <p className="tech-label">Technologies</p>
              <div className="tech-tags">
                {p.techs.map((t, i) => (
                  <motion.span
                    key={t}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: 0.18 + i * 0.055 }}
                  >
                    {t}
                  </motion.span>
                ))}
              </div>
            </div>

            <a href={p.link} className="btn-demo">
              View Project
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M7 17L17 7M17 7H7M17 7v10" />
              </svg>
            </a>
          </motion.div>
        </motion.div>

        {/* ── Controls ── */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '56px' }}>

          {/* Arrows */}
          <div style={{ display: 'flex', gap: '12px' }}>
            <button onClick={prev} aria-label="Previous project" style={arrowBtn}
              onMouseEnter={e => { const b = e.currentTarget as HTMLButtonElement; b.style.borderColor='var(--gold)'; b.style.color='var(--gold)'; }}
              onMouseLeave={e => { const b = e.currentTarget as HTMLButtonElement; b.style.borderColor='var(--border-hover)'; b.style.color='var(--white-dim)'; }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M15 18l-6-6 6-6"/></svg>
            </button>
            <button onClick={next} aria-label="Next project" style={arrowBtn}
              onMouseEnter={e => { const b = e.currentTarget as HTMLButtonElement; b.style.borderColor='var(--gold)'; b.style.color='var(--gold)'; }}
              onMouseLeave={e => { const b = e.currentTarget as HTMLButtonElement; b.style.borderColor='var(--border-hover)'; b.style.color='var(--white-dim)'; }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M9 18l6-6-6-6"/></svg>
            </button>
          </div>

          {/* Dots */}
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

          {/* Auto indicator */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.65rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--white-dim)', opacity: 0.5 }}>
            <motion.span
              animate={{ scale: paused ? 1 : [1, 1.4, 1], opacity: paused ? 0.4 : 0.9 }}
              transition={{ repeat: Infinity, duration: 1.6 }}
              style={{ width: 6, height: 6, borderRadius: '50%', background: paused ? 'var(--white-dim)' : 'var(--gold)', display: 'block', boxShadow: paused ? 'none' : '0 0 8px rgba(201,169,110,0.6)' }}
            />
            {paused ? 'Paused' : 'Auto'}
          </div>
        </div>

      </div>
    </section>
  );
}
