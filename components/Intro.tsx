'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function Intro() {
  const [phase, setPhase] = useState<'loading' | 'reveal' | 'done'>('loading');
  const [count, setCount] = useState(0);

  useEffect(() => {
    let frame = 0;
    const total = 80; // ~1.3 s
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
      {/* Split panels that fly off on exit */}
      <div className={`intro-panel intro-panel-left${phase === 'reveal' ? ' intro-panel-exit' : ''}`} />
      <div className={`intro-panel intro-panel-right${phase === 'reveal' ? ' intro-panel-exit' : ''}`} />

      {/* Center content */}
      <div className={`intro-content${phase === 'reveal' ? ' intro-content-exit' : ''}`}>

        {/* Real PL logo */}
        <div className="intro-mark">
          <Image
            src="/images/logo.png"
            alt="Prisca Larisse Logo"
            width={100}
            height={100}
            priority
            style={{
              objectFit: 'contain',
              borderRadius: '50%',
              filter: 'drop-shadow(0 0 18px rgba(201,169,110,0.55))',
            }}
          />
        </div>

        {/* Name */}
        <div className="intro-name">
          <span className="intro-name-word">Prisca</span>
          <span className="intro-name-sep">·</span>
          <span className="intro-name-word intro-name-italic">Larisse</span>
        </div>

        {/* Role */}
        <div className="intro-role">Software &amp; Embedded Systems Developer</div>

        {/* Progress bar */}
        <div className="intro-bar-wrap">
          <div className="intro-bar-fill" style={{ width: `${count}%` }} />
        </div>
        <div className="intro-counter">{String(count).padStart(3, '0')}</div>
      </div>
    </div>
  );
}
