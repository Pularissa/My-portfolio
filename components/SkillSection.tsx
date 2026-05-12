'use client';

import React from 'react';

const skillData = [
  { name: "Skill", percent: 80 },
  { name: "Skill", percent: 80 },
  { name: "Skill", percent: 80 },
  { name: "Skill", percent: 80 },
  { name: "Skill", percent: 80 },
  { name: "Skill", percent: 80 },
];

export default function SkillsSection() {
  return (
    <section className="skills-section">
      <div className="skills-container">
        {/* Top Row */}
        <div className="top-row">
          <div className="skill-card top-left-extra">
            <span className="percent-left">80%</span>
            <div className="bar-container">
              <span className="skill-name">Skill</span>
              <div className="progress-bar-bg">
                <div className="progress-bar" style={{ width: '80%' }}></div>
              </div>
              <span className="percent-right">80%</span>
            </div>
          </div>

          <div className="skill-card">
            <div className="bar-container">
              <span className="skill-name">Skill</span>
              <div className="progress-bar-bg">
                <div className="progress-bar" style={{ width: '80%' }}></div>
              </div>
              <span className="percent-right">80%</span>
            </div>
          </div>

          <div className="skill-card">
            <div className="bar-container">
              <span className="skill-name">Skill</span>
              <div className="progress-bar-bg">
                <div className="progress-bar" style={{ width: '80%' }}></div>
              </div>
              <span className="percent-right">80%</span>
            </div>
          </div>

          <div className="skill-card top-right">
            <div className="bar-container">
              <span className="skill-name">Skill</span>
              <div className="progress-bar-bg">
                <div className="progress-bar" style={{ width: '80%' }}></div>
              </div>
              <span className="percent-right">80%</span>
            </div>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="bottom-row">
          <div className="skill-card">
            <div className="bar-container">
              <span className="skill-name">Skill</span>
              <div className="progress-bar-bg">
                <div className="progress-bar" style={{ width: '80%' }}></div>
              </div>
              <span className="percent-right">80%</span>
            </div>
          </div>

          <div className="skill-card">
            <div className="bar-container">
              <span className="skill-name">Skill</span>
              <div className="progress-bar-bg">
                <div className="progress-bar" style={{ width: '80%' }}></div>
              </div>
              <span className="percent-right">80%</span>
            </div>
          </div>

          <div className="skill-card">
            <div className="bar-container">
              <span className="skill-name">Skill</span>
              <div className="progress-bar-bg">
                <div className="progress-bar" style={{ width: '80%' }}></div>
              </div>
              <span className="percent-right">80%</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}