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
        <div className="intro-mark" style={{ display: 'flex', alignItems: 'center', position: 'relative', justifyContent: 'center', marginBottom: '20px' }}>
          <span className="kolker-font blend-difference" style={{ color: 'white', fontSize: '80px', position: 'relative', zIndex: 10, paddingLeft: '8px', lineHeight: 1 }}>
            <span style={{ position: 'relative', display: 'inline-block' }}>
              <span style={{ display: 'block', width: '40px', height: '40px', backgroundColor: 'white', borderRadius: '50%', position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -45%)', zIndex: -1 }} />
              P
            </span>
            risca
          </span>
          <div style={{ position: 'absolute', bottom: '22px', left: '-4px', right: '-4px', height: '3px', backgroundColor: '#0ea5e9', zIndex: 20 }} />
        </div>

        {/* Name */}
        <div className="intro-name">
          <span className="intro-name-word">Prisca</span>
          <span className="intro-name-sep">·</span>
          <span className="intro-name-word intro-name-italic">Larissa</span>
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
