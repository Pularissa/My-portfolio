'use client';

import React, { useEffect, useRef, useState } from 'react';

const skillCategories = [
  {
    id: 'frontend',
    label: 'Frontend',
    icon: '◈',
    skills: [
      { name: 'React', percent: 92 },
      { name: 'Next.js', percent: 85 },
      { name: 'TypeScript', percent: 82 },
      { name: 'Tailwind CSS', percent: 90 },
      { name: 'HTML & CSS', percent: 95 },
    ],
  },
  {
    id: 'tools',
    label: 'Tools & Dev',
    icon: '◎',
    skills: [
      { name: 'Git & GitHub', percent: 88 },
      { name: 'Figma', percent: 78 },
      { name: 'REST APIs', percent: 84 },
      { name: 'Node.js', percent: 76 },
      { name: 'VS Code', percent: 95 },
    ],
  },
  {
    id: 'design',
    label: 'Design & UX',
    icon: '◇',
    skills: [
      { name: 'UI/UX Design', percent: 80 },
      { name: 'Responsive Design', percent: 90 },
      { name: 'Accessibility', percent: 82 },
      { name: 'Prototyping', percent: 75 },
      { name: 'Design Systems', percent: 78 },
    ],
  },
];

function SkillArc({ percent, animate }: { percent: number; animate: boolean }) {
  const r = 26;
  const circ = 2 * Math.PI * r;
  const dash = animate ? (percent / 100) * circ : 0;
  const gap = circ - dash;

  return (
    <svg width="68" height="68" viewBox="0 0 68 68" className="skill-arc-svg">
      <circle cx="34" cy="34" r={r} fill="none"
        stroke="rgba(255,255,255,0.06)" strokeWidth="3" />
      <circle cx="34" cy="34" r={r} fill="none"
        stroke="url(#arcGrad)" strokeWidth="3" strokeLinecap="round"
        strokeDasharray={`${dash} ${gap}`}
        strokeDashoffset={circ * 0.25}
        style={{ transition: 'stroke-dasharray 1.2s cubic-bezier(0.25,1,0.5,1)' }}
      />
      <defs>
        <linearGradient id="arcGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#c9a96e" />
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

export default function SkillsSection() {
  const [activeTab, setActiveTab] = useState('frontend');
  const [animate, setAnimate] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setAnimate(true); },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    setAnimate(false);
    const t = setTimeout(() => setAnimate(true), 60);
    return () => clearTimeout(t);
  }, [activeTab]);

  const activeCategory = skillCategories.find((c) => c.id === activeTab)!;

  return (
    <section id="skills" className="sk-section" ref={sectionRef}>
      <div className="sk-bg-glow" />
      <div className="sk-bg-grid" />

      <div className="sk-inner">
        {/* Header */}
        <div className="sk-header">
          <div className="sk-eyebrow">
            <span className="sk-eyebrow-line" />
            <span className="sk-eyebrow-text">Expertise</span>
            <span className="sk-eyebrow-line" />
          </div>
          <h2 className="sk-title">Skills &amp; <em>Proficiency</em></h2>
          <p className="sk-subtitle">
            A curated set of tools and technologies I work with daily.
          </p>
        </div>

        {/* Tabs */}
        <div className="sk-tabs" role="tablist">
          {skillCategories.map((cat) => (
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
        <div className="sk-grid" role="tabpanel">
          {activeCategory.skills.map((skill, i) => (
            <div key={skill.name} className="sk-card"
              style={{ animationDelay: `${i * 80}ms` }}>
              <div className="sk-arc-wrap">
                <SkillArc percent={skill.percent} animate={animate} />
              </div>
              <div className="sk-card-info">
                <span className="sk-card-name">{skill.name}</span>
                <div className="sk-bar-track">
                  <div className="sk-bar-fill"
                    style={{ width: animate ? `${skill.percent}%` : '0%' }} />
                </div>
              </div>
              <div className="sk-card-glow" />
            </div>
          ))}
        </div>

        {/* Stats row */}
        <div className="sk-stats">
          <div className="sk-stat">
            <span className="sk-stat-num">13+</span>
            <span className="sk-stat-label">Technologies</span>
          </div>
          <div className="sk-stat-divider" />
          <div className="sk-stat">
            <span className="sk-stat-num">3+</span>
            <span className="sk-stat-label">Years of practice</span>
          </div>
          <div className="sk-stat-divider" />
          <div className="sk-stat">
            <span className="sk-stat-num">12+</span>
            <span className="sk-stat-label">Projects shipped</span>
          </div>
        </div>
      </div>
    </section>
  );
}
