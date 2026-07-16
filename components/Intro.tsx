'use client';

import { useEffect, useState } from 'react';

export default function Intro() {
  const [phase, setPhase] = useState<'loading' | 'reveal' | 'done'>('loading');
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Count up 0 → 100
    let frame = 0;
    const total = 80; // ~1.6 s at 20 ms per frame
    const timer = setInterval(() => {
      frame++;
      setCount(Math.min(Math.round((frame / total) * 100), 100));
      if (frame >= total) {
        clearInterval(timer);
        setPhase('reveal');
        setTimeout(() => setPhase('done'), 900);
      }
    }, 16);
    return () => clearInterval(timer);
  }, []);

  if (phase === 'done') return null;

  return (
    <div className={`intro-overlay${phase === 'reveal' ? ' intro-exit' : ''}`}>
      {/* Left panel */}
      <div className={`intro-panel intro-panel-left${phase === 'reveal' ? ' intro-panel-exit' : ''}`} />
      {/* Right panel */}
      <div className={`intro-panel intro-panel-right${phase === 'reveal' ? ' intro-panel-exit' : ''}`} />

      {/* Content */}
      <div className={`intro-content${phase === 'reveal' ? ' intro-content-exit' : ''}`}>
        {/* Animated logo mark */}
        <div className="intro-mark">
          <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="40" cy="40" r="38" stroke="#c9a96e" strokeWidth="1"
              strokeDasharray="240" strokeDashoffset="240"
              style={{ animation: 'intro-ring 1s 0.1s cubic-bezier(0.25,1,0.5,1) forwards' }} />
            <text x="40" y="47" textAnchor="middle"
              fill="#c9a96e" fontSize="28" fontFamily="Georgia, serif" fontWeight="400">
              P
            </text>
          </svg>
        </div>

        {/* Name */}
        <div className="intro-name">
          <span className="intro-name-word">Prisca</span>
          <span className="intro-name-sep">·</span>
          <span className="intro-name-word intro-name-italic">Larisse</span>
        </div>

        {/* Role */}
        <div className="intro-role">Software Developer</div>

        {/* Progress bar */}
        <div className="intro-bar-wrap">
          <div className="intro-bar-fill" style={{ width: `${count}%` }} />
        </div>
        <div className="intro-counter">{String(count).padStart(3, '0')}</div>
      </div>
    </div>
  );
}
