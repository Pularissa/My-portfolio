'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    id: '01',
    company: 'Rwanda Coding Academy',
    role: 'Software Programming & Embedded Systems Student',
    period: '2023 — Present',
    type: 'Education',
    description:
      'Studying software engineering and embedded systems at one of Rwanda\'s top academies. Building real-world projects spanning web apps, desktop software, IoT devices, and AI-assisted systems.',
    icon: '🎓',
  },
  {
    id: '02',
    company: 'UmuhinziLink',
    role: 'Founder & Lead Developer',
    period: '2024 — Present',
    type: 'Project',
    description:
      'Designed and built a full-stack AgriTech platform connecting Rwandan farmers with buyers. Integrated AI farming advice, live market pricing, and digital payments using Next.js, Node.js, and PostgreSQL.',
    icon: '🌾',
  },
  {
    id: '03',
    company: 'YNT Rwanda',
    role: 'Frontend Developer',
    period: '2024',
    type: 'Project',
    description:
      'Developed a modern NGO website with multi-language support (i18next), membership registration, donation handling, and events management using React and Tailwind CSS.',
    icon: '🌍',
  },
  {
    id: '04',
    company: 'Independent Projects',
    role: 'Self-directed Developer',
    period: '2023 — Present',
    type: 'Personal',
    description:
      'Built 10+ projects across web (React, Spring Boot), desktop (Java Swing), and hardware (Arduino, ESP8266). Topics include traffic education, library management, IoT smart gardens, and personal safety apps.',
    icon: '⚡',
  },
];

const typeColor: Record<string, string> = {
  Education: '#6ee7b7',
  Project: 'var(--gold)',
  Personal: 'rgba(245,240,235,0.45)',
};

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const cards = gsap.utils.toArray<HTMLElement>('.stack-card');
    if (!cards.length) return;

    /* ↓7 / ↑7 — Card stacking: each card pushes the previous one up and shrinks it */
    cards.forEach((card, i) => {
      if (i === 0) return; // first card doesn't push anything

      ScrollTrigger.create({
        trigger: card,
        start: 'top 80%',
        end: 'top 20%',
        scrub: true,
        onUpdate: (self) => {
          const prev = cards[i - 1];
          const p = self.progress;
          // Previous card scales slightly down and moves up slightly
          gsap.set(prev, {
            scale: 1 - p * 0.04,
            y: -p * 24,
            filter: `brightness(${1 - p * 0.18})`,
          });
        },
        onLeaveBack: () => {
          // ↑7 — Reverse: restore previous card
          const prev = cards[i - 1];
          gsap.to(prev, { scale: 1, y: 0, filter: 'brightness(1)', duration: 0.4 });
        },
      });
    });

    return () => ScrollTrigger.getAll().forEach((st) => st.kill());
  }, []);

  return (
    <section id="experience" className="experience-section" ref={sectionRef}>
      <div className="experience-inner">

        {/* ↓1 Fade up header */}
        <div className="experience-header reveal">
          <div className="section-label">
            <span className="section-label-line" />
            <span className="section-label-text">Education & Experience</span>
          </div>
          {/* ↓4 Clip reveal heading */}
          <div className="clip-wrap">
            <h2 className="section-heading reveal-clip">My <em>Journey</em></h2>
          </div>
          {/* ↓10 Line draw */}
          <div className="line-draw reveal-line" style={{ marginTop: '24px' }} />
        </div>

        {/* ↓7 Card stacking timeline */}
        <div className="stack-timeline">
          {experiences.map((exp, i) => (
            <div
              key={exp.id}
              className="stack-card reveal"
              style={{
                transitionDelay: `${i * 80}ms`,
                top: `${80 + i * 20}px`,   /* stacking offset for sticky behavior */
                zIndex: i + 1,
              }}
            >
              {/* Left stripe accent */}
              <div
                className="stack-card-stripe"
                style={{ background: typeColor[exp.type] }}
              />

              <div className="stack-card-body">
                {/* Header */}
                <div className="stack-card-header">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <span className="stack-card-icon">{exp.icon}</span>
                    <div>
                      <div className="clip-wrap">
                        <h3 className="timeline-company reveal-clip" style={{ transitionDelay: `${i * 80 + 60}ms` }}>
                          {exp.company}
                        </h3>
                      </div>
                      <p className="timeline-role" style={{ marginTop: '2px' }}>{exp.role}</p>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right', flexShrink: 0 }}>
                    <div className="timeline-period">{exp.period}</div>
                    <div
                      className="stack-card-type"
                      style={{ color: typeColor[exp.type] }}
                    >
                      {exp.type}
                    </div>
                  </div>
                </div>

                <p className="timeline-desc">{exp.description}</p>

                {/* Index indicator */}
                <div className="stack-card-index">{exp.id}</div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
