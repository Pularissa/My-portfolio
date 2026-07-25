'use client';

import { useEffect, useRef, useState } from 'react';

const skillCategories = [
  {
    id: 'frontend', label: 'Frontend', icon: '◈',
    skills: [
      { name: 'React.js',     percent: 88 },
      { name: 'Next.js',      percent: 84 },
      { name: 'JavaScript',   percent: 90 },
      { name: 'Tailwind CSS', percent: 88 },
      { name: 'HTML & CSS',   percent: 95 },
    ],
  },
  {
    id: 'backend', label: 'Backend', icon: '◎',
    skills: [
      { name: 'Java / Spring Boot', percent: 80 },
      { name: 'Node.js',            percent: 78 },
      { name: 'PostgreSQL',         percent: 82 },
      { name: 'REST APIs',          percent: 86 },
      { name: 'Hibernate / JDBC',   percent: 74 },
    ],
  },
  {
    id: 'embedded', label: 'Embedded & IoT', icon: '◆',
    skills: [
      { name: 'Arduino / C++', percent: 80 },
      { name: 'ESP8266',       percent: 74 },
      { name: 'DHT11 / LM35',  percent: 78 },
      { name: 'LCD I2C',       percent: 76 },
      { name: 'Sensor Systems',percent: 75 },
    ],
  },
  {
    id: 'tools', label: 'Tools & Design', icon: '◇',
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
  const r = 26, circ = 2 * Math.PI * r;
  const dash = animate ? (percent / 100) * circ : 0;
  return (
    <svg width="68" height="68" viewBox="0 0 68 68" className="skill-arc-svg">
      <circle cx="34" cy="34" r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="3" />
      <circle cx="34" cy="34" r={r} fill="none" stroke="url(#arcGrad)" strokeWidth="3"
        strokeLinecap="round" strokeDasharray={`${dash} ${circ - dash}`}
        strokeDashoffset={circ * 0.25}
        style={{ transition: 'stroke-dasharray 1.3s cubic-bezier(0.16,1,0.3,1)' }} />
      <defs>
        <linearGradient id="arcGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#c9a96e" />
          <stop offset="100%" stopColor="#f0d89c" />
        </linearGradient>
      </defs>
      <text x="34" y="38" textAnchor="middle" fill="#c9a96e" fontSize="11" fontWeight="500" fontFamily="system-ui">
        {animate ? `${percent}%` : '0%'}
      </text>
    </svg>
  );
}

export default function SkillsSection() {
  const [activeTab, setActiveTab] = useState('frontend');
  const [animate,   setAnimate]   = useState(false);
  const sectionRef  = useRef<HTMLElement>(null);

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

        {/* #8 Blur reveal for header */}
        <div className="sk-header reveal-blur">
          <div className="sk-eyebrow">
            <span className="sk-eyebrow-line" />
            <span className="sk-eyebrow-text">Technical Skills</span>
            <span className="sk-eyebrow-line" />
          </div>
          <div className="clip-wrap">
            <h2 className="sk-title reveal-clip">Skills &amp; <em>Proficiency</em></h2>
          </div>
          <p className="sk-subtitle">Built across web, backend, and embedded systems — from React to Arduino.</p>
        </div>

        {/* #3 Scale up for tabs */}
        <div className="sk-tabs reveal-scale" role="tablist" style={{ transitionDelay: '100ms' }}>
          {skillCategories.map(cat => (
            <button key={cat.id} role="tab"
              aria-selected={activeTab === cat.id}
              className={`sk-tab${activeTab === cat.id ? ' sk-tab--active' : ''}`}
              onClick={() => setActiveTab(cat.id)}>
              <span className="sk-tab-icon">{cat.icon}</span>{cat.label}
            </button>
          ))}
        </div>

        {/* #1 Staggered fade-up for skill cards */}
        <div className="sk-grid stagger" role="tabpanel">
          {activeCategory.skills.map(skill => (
            <div key={skill.name} className="sk-card reveal-scale">
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

        {/* #1 Staggered stats */}
        <div className="sk-stats stagger">
          <div className="sk-stat reveal">
            <span className="sk-stat-num">10+</span>
            <span className="sk-stat-label">Projects built</span>
          </div>
          <div className="sk-stat-divider" />
          <div className="sk-stat reveal">
            <span className="sk-stat-num">6+</span>
            <span className="sk-stat-label">Languages used</span>
          </div>
          <div className="sk-stat-divider" />
          <div className="sk-stat reveal">
            <span className="sk-stat-num">20+</span>
            <span className="sk-stat-label">Technologies</span>
          </div>
        </div>

      </div>
    </section>
  );
}
