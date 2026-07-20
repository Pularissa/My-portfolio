'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useScrollReveal, useCountUp } from './useScrollReveal';

const skillCategories = [
  {
    id: 'frontend',
    label: 'Frontend',
    icon: '◈',
    skills: [
      { name: 'React.js',    percent: 88 },
      { name: 'Next.js',     percent: 84 },
      { name: 'JavaScript',  percent: 90 },
      { name: 'Tailwind CSS',percent: 88 },
      { name: 'HTML & CSS',  percent: 95 },
    ],
  },
  {
    id: 'backend',
    label: 'Backend',
    icon: '◎',
    skills: [
      { name: 'Java / Spring Boot', percent: 80 },
      { name: 'Node.js',            percent: 78 },
      { name: 'PostgreSQL',         percent: 82 },
      { name: 'REST APIs',          percent: 86 },
      { name: 'Hibernate / JDBC',   percent: 74 },
    ],
  },
  {
    id: 'embedded',
    label: 'Embedded & IoT',
    icon: '◆',
    skills: [
      { name: 'Arduino / C++', percent: 80 },
      { name: 'ESP8266',       percent: 74 },
      { name: 'DHT11 / LM35',  percent: 78 },
      { name: 'LCD I2C',       percent: 76 },
      { name: 'Sensor Systems',percent: 75 },
    ],
  },
  {
    id: 'tools',
    label: 'Tools & Design',
    icon: '◇',
    skills: [
      { name: 'Git & GitHub', percent: 88 },
      { name: 'Figma',        percent: 76 },
      { name: 'TypeScript',   percent: 78 },
      { name: 'Postman',      percent: 80 },
      { name: 'VS Code',      percent: 95 },
    ],
  },
];

function SkillArc({ percent, animate }: { percent: number; animate: boolean }) {
  const r = 26;
  const circ = 2 * Math.PI * r;
  const dash = animate ? (percent / 100) * circ : 0;
  const gap  = circ - dash;
  return (
    <svg width="68" height="68" viewBox="0 0 68 68" className="skill-arc-svg">
      <circle cx="34" cy="34" r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="3" />
      <circle cx="34" cy="34" r={r} fill="none"
        stroke="url(#arcGrad)" strokeWidth="3" strokeLinecap="round"
        strokeDasharray={`${dash} ${gap}`}
        strokeDashoffset={circ * 0.25}
        style={{ transition: 'stroke-dasharray 1.2s cubic-bezier(0.25,1,0.5,1)' }}
      />
      <defs>
        <linearGradient id="arcGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%"   stopColor="#c9a96e" />
          <stop offset="100%" stopColor="#f0d89c" />
        </linearGradient>
      </defs>
      <text x="34" y="38" textAnchor="middle" fill="#c9a96e"
        fontSize="11" fontWeight="500" fontFamily="system-ui, sans-serif">
        {animate ? `${percent}%` : '0%'}
      </text>
    </svg>
  );
}

function StatCounter({ target, suffix = '+', label }: { target: number; suffix?: string; label: string }) {
  const [ref, visible] = useScrollReveal<HTMLDivElement>({ threshold: 0.5 });
  const count = useCountUp(target, visible);
  return (
    <div ref={ref} className="sk-stat">
      <span className="sk-stat-num">{count}{suffix}</span>
      <span className="sk-stat-label">{label}</span>
    </div>
  );
}

export default function SkillsSection() {
  const [activeTab, setActiveTab] = useState('frontend');
  const [animate, setAnimate]     = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const [headerRef, headerVisible] = useScrollReveal<HTMLDivElement>({ threshold: 0.3 });
  const [tabsRef,   tabsVisible]   = useScrollReveal<HTMLDivElement>({ threshold: 0.3 });
  const [gridRef,   gridVisible]   = useScrollReveal<HTMLDivElement>({ threshold: 0.1 });

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setAnimate(true); },
      { threshold: 0.2 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    setAnimate(false);
    const t = setTimeout(() => setAnimate(true), 60);
    return () => clearTimeout(t);
  }, [activeTab]);

  const activeCategory = skillCategories.find(c => c.id === activeTab)!;

  return (
    <section id="skills" className="sk-section" ref={sectionRef}>
      <div className="sk-bg-glow" />
      <div className="sk-bg-grid" />

      <div className="sk-inner">

        {/* Header */}
        <div ref={headerRef} className="sk-header" style={{
          opacity: headerVisible ? 1 : 0,
          transform: headerVisible ? 'translateY(0)' : 'translateY(-32px)',
          transition: 'opacity 0.8s ease, transform 0.8s cubic-bezier(0.25,1,0.5,1)',
        }}>
          <div className="sk-eyebrow">
            <span className="sk-eyebrow-line" />
            <span className="sk-eyebrow-text">Technical Skills</span>
            <span className="sk-eyebrow-line" />
          </div>
          <h2 className="sk-title">Skills &amp; <em>Proficiency</em></h2>
          <p className="sk-subtitle">
            Built across web, backend, and embedded systems — from React to Arduino.
          </p>
        </div>

        {/* Tabs */}
        <div ref={tabsRef} className="sk-tabs" role="tablist" style={{
          opacity: tabsVisible ? 1 : 0,
          transform: tabsVisible ? 'scale(1)' : 'scale(0.94)',
          transition: 'opacity 0.7s ease 0.1s, transform 0.7s cubic-bezier(0.25,1,0.5,1) 0.1s',
        }}>
          {skillCategories.map(cat => (
            <button key={cat.id} role="tab"
              aria-selected={activeTab === cat.id}
              className={`sk-tab${activeTab === cat.id ? ' sk-tab--active' : ''}`}
              onClick={() => setActiveTab(cat.id)}>
              <span className="sk-tab-icon">{cat.icon}</span>
              {cat.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div ref={gridRef} className="sk-grid" role="tabpanel">
          {activeCategory.skills.map((skill, i) => (
            <div key={skill.name} className="sk-card" style={{
              opacity: gridVisible ? 1 : 0,
              transform: gridVisible ? 'translateY(0) scale(1)' : 'translateY(40px) scale(0.95)',
              transition: `opacity 0.6s ease ${i * 90}ms, transform 0.6s cubic-bezier(0.25,1,0.5,1) ${i * 90}ms`,
            }}>
              <div className="sk-arc-wrap">
                <SkillArc percent={skill.percent} animate={animate} />
              </div>
              <div className="sk-card-info">
                <span className="sk-card-name">{skill.name}</span>
                <div className="sk-bar-track">
                  <div className="sk-bar-fill" style={{ width: animate ? `${skill.percent}%` : '0%' }} />
                </div>
              </div>
              <div className="sk-card-glow" />
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="sk-stats">
          <StatCounter target={10} label="Projects built" />
          <div className="sk-stat-divider" />
          <StatCounter target={6}  label="Languages used" />
          <div className="sk-stat-divider" />
          <StatCounter target={20} label="Technologies" />
        </div>

      </div>
    </section>
  );
}
