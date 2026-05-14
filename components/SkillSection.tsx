'use client';

import React from 'react';

const skillData = [
  { name: "HTML", percent: 95 },
  { name: "CSS", percent: 90 },
  { name: "JavaScript", percent: 88 },
  { name: "React", percent: 92 },
  { name: "Next.js", percent: 85 },
  { name: "TypeScript", percent: 82 },
];

export default function SkillsSection() {
  return (
    <section className="skills-section">
      <div className="skills-container">
        {/* Top Row - 4 cards with staggered heights */}
        <div className="top-row">
          <div className="skill-card" style={{ marginTop: '20px' }}>
            <span className="percent-left">95%</span>
            <div className="bar-container">
              <span className="skill-name">HTML</span>
              <div className="progress-bar-bg">
                <div className="progress-bar" style={{ width: '95%' }}></div>
              </div>
              <span className="percent-right">95%</span>
            </div>
          </div>

          <div className="skill-card" style={{ marginTop: '20px' }}>
            <div className="bar-container">
              <span className="skill-name">CSS</span>
              <div className="progress-bar-bg">
                <div className="progress-bar" style={{ width: '90%' }}></div>
              </div>
              <span className="percent-right">90%</span>
            </div>
          </div>

          <div className="skill-card" style={{ marginTop: '20px'}}>
            <div className="bar-container">
              <span className="skill-name">JavaScript</span>
              <div className="progress-bar-bg">
                <div className="progress-bar" style={{ width: '88%' }}></div>
              </div>
              <span className="percent-right">88%</span>
            </div>
          </div>

          <div className="skill-card" style={{ marginTop: '20px' }}>
            <div className="bar-container">
              <span className="skill-name">React</span>
              <div className="progress-bar-bg">
                <div className="progress-bar" style={{ width: '92%' }}></div>
              </div>
              <span className="percent-right">92%</span>
            </div>
          </div>
        </div>

        {/* Bottom Row - 3 cards */}
        <div className="bottom-row">
          <div className="skill-card">
            <div className="bar-container">
              <span className="skill-name">Next.js</span>
              <div className="progress-bar-bg">
                <div className="progress-bar" style={{ width: '85%' }}></div>
              </div>
              <span className="percent-right">85%</span>
            </div>
          </div>

          <div className="skill-card">
            <div className="bar-container">
              <span className="skill-name">TypeScript</span>
              <div className="progress-bar-bg">
                <div className="progress-bar" style={{ width: '82%' }}></div>
              </div>
              <span className="percent-right">82%</span>
            </div>
          </div>

          <div className="skill-card">
            <div className="bar-container">
              <span className="skill-name">Tailwind</span>
              <div className="progress-bar-bg">
                <div className="progress-bar" style={{ width: '90%' }}></div>
              </div>
              <span className="percent-right">90%</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}