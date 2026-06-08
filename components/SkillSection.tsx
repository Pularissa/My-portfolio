'use client';

import React, { useEffect, useState } from 'react';

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
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // normalize scroll (0 → 1)
  const progress = Math.min(scrollY / 800, 1);

  const rotate = progress * 360;
  const modelIndex = Math.floor(progress * 3); // image switch (0–2)

  const models = [
    '/images/robot1.png',
    '/images/robot2.png',
    '/images/robot3.png',
  ];

  return (
    <section className="skills-section">
      <div className="banner">

        {/* 3D SLIDER CONTROLLED BY SCROLL */}
        <div
          className="slider"
          style={{
            transform: `perspective(1000px) rotateX(-15deg) rotateY(${rotate}deg)`,
            '--quantity': skillData.length,
          } as React.CSSProperties}
        >
          {skillData.map((skill, index) => (
            <div
              key={skill.name}
              className="item"
              style={{
                '--position': index + 1,
              } as React.CSSProperties}
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

                  <span className="percent-right">{skill.percent}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* MODEL CHANGES ON SCROLL */}
        <div className="content">
          <div
            className="model"
            style={{
              backgroundImage: `url(${models[modelIndex]})`,
              transform: `translateY(${progress * -50}px) scale(${1 + progress * 0.1})`,
            }}
          />
        </div>

      </div>
    </section>
  );
}