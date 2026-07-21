'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FadeUp, LineDraw } from './ScrollAnimations';

const experiences = [
  {
    id: "01",
    company: "Rwanda Coding Academy",
    role: "Software Programming & Embedded Systems Student",
    period: "2023 — Present",
    type: "Education",
    description: "Studying software engineering and embedded systems at one of Rwanda's top academies. Building real-world projects spanning web apps, desktop software, IoT devices, and AI-assisted systems.",
  },
  {
    id: "02",
    company: "UmuhinziLink",
    role: "Founder & Lead Developer",
    period: "2024 — Present",
    type: "Project",
    description: "Designed and built a full-stack AgriTech platform connecting Rwandan farmers with buyers. Integrated AI farming advice, live market pricing, and digital payments.",
  },
  {
    id: "03",
    company: "YNT Rwanda",
    role: "Frontend Developer",
    period: "2024",
    type: "Project",
    description: "Developed a modern NGO website with multi-language support (i18next), membership registration, donation handling, and events management.",
  },
  {
    id: "04",
    company: "Independent Projects",
    role: "Self-directed Developer",
    period: "2023 — Present",
    type: "Personal",
    description: "Built 10+ projects across web (React, Spring Boot), desktop (Java Swing), and hardware (Arduino, ESP8266) — spanning traffic education, library management, IoT, and personal safety.",
  },
];

const typeColor: Record<string, string> = {
  Education: '#6ee7b7',
  Project:   'var(--gold)',
  Personal:  'rgba(245,240,235,0.45)',
};

function TimelineCard({ exp, index }: { exp: typeof experiences[0]; index: number }) {
  const ref  = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      className="timeline-item"
      initial={{ opacity: 0, x: isEven ? -60 : 60, filter: 'blur(6px)' }}
      animate={inView ? { opacity: 1, x: 0, filter: 'blur(0px)' } : {}}
      transition={{ duration: 0.85, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.div
        className="timeline-node"
        initial={{ scale: 0, rotate: -90 }}
        animate={inView ? { scale: 1, rotate: 0 } : {}}
        transition={{ duration: 0.6, delay: index * 0.12 + 0.2, ease: [0.16, 1, 0.3, 1] }}
      >
        {exp.id}
      </motion.div>

      <div className="timeline-card">
        <div className="timeline-card-header">
          <div style={{ overflow: 'hidden' }}>
            <motion.h3
              className="timeline-company"
              initial={{ y: '110%' }}
              animate={inView ? { y: '0%' } : {}}
              transition={{ duration: 0.65, delay: index * 0.12 + 0.15, ease: [0.16, 1, 0.3, 1] }}
            >
              {exp.company}
            </motion.h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px' }}>
            <motion.span
              className="timeline-period"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: index * 0.12 + 0.3 }}
            >
              {exp.period}
            </motion.span>
            <motion.span
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 0.9 } : {}}
              transition={{ duration: 0.5, delay: index * 0.12 + 0.38 }}
              style={{ fontSize: '0.62rem', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: typeColor[exp.type] }}
            >
              {exp.type}
            </motion.span>
          </div>
        </div>

        <motion.p
          className="timeline-role"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 0.75 } : {}}
          transition={{ duration: 0.5, delay: index * 0.12 + 0.42 }}
        >
          {exp.role}
        </motion.p>

        {/* Word-stagger description */}
        <p className="timeline-desc" aria-label={exp.description}>
          {exp.description.split(' ').map((word, wi) => (
            <motion.span
              key={wi}
              style={{ display: 'inline-block', marginRight: '0.28em' }}
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.35, delay: index * 0.12 + 0.5 + wi * 0.016, ease: 'easeOut' }}
            >
              {word}
            </motion.span>
          ))}
        </p>
      </div>
    </motion.div>
  );
}

export default function Experience() {
  return (
    <section id="experience" className="experience-section">
      <div className="experience-inner">

        {/* Header */}
        <FadeUp className="experience-header">
          <div className="section-label">
            <span className="section-label-line" />
            <span className="section-label-text">Education & Experience</span>
          </div>
          <h2 className="section-heading">My <em>Journey</em></h2>
          <div style={{ marginTop: '24px' }}>
            <LineDraw />
          </div>
        </FadeUp>

        {/* Timeline cards */}
        <div className="timeline">
          {experiences.map((exp, i) => (
            <TimelineCard key={exp.id} exp={exp} index={i} />
          ))}
        </div>

      </div>
    </section>
  );
}
