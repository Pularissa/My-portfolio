'use client';

import React from 'react';

const skillData = [
  { name: 'HTML', percent: 95 },
  { name: 'CSS', percent: 90 },
  { name: 'JavaScript', percent: 88 },
  { name: 'React', percent: 92 },
  { name: 'Next.js', percent: 85 },
  { name: 'TypeScript', percent: 82 },
  { name: 'Tailwind', percent: 90 },
  { name: 'Git', percent: 85 },
  { name: 'GitHub', percent: 88 },
  { name: 'Responsive Design', percent: 90 },
  { name: 'REST APIs', percent: 84 },
  { name: 'Figma', percent: 78 },
  { name: 'UI/UX', percent: 80 },
];

export default function SkillsSection() {
  return (
    <section className="skills-section">
      <div className="banner">

        {/* 3D SLIDER */}
        <div
          className="slider"
          style={
            {
              '--quantity': skillData.length,
            } as React.CSSProperties
          }
        >
          {skillData.map((skill, index) => (
            <div
              key={skill.name}
              className="item"
              style={
                {
                  '--position': index + 1,
                } as React.CSSProperties
              }
            >
              <div className="skill-card">
                <div className="bar-container">
                  <span className="skill-name">{skill.name}</span>

                  <div className="progress-bar-bg">
                    <div
                      className="progress-bar"
                      style={{ width: `${skill.percent}%` }}
                    />
                  </div>

                  <span className="percent-right">
                    {skill.percent}%
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* MODEL / ROBOT IMAGE LAYER (IMPORTANT FOR YOUR CSS) */}
        <div className="content">
          <div className="model" />
        </div>

      </div>
    </section>
  );
}