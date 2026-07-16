'use client';
import { useEffect, useRef } from 'react';

const cards = [
  { tag: 'Frontend',   title: 'React & Next.js' },
  { tag: 'Styling',    title: 'Tailwind & CSS' },
  { tag: 'Language',   title: 'TypeScript' },
  { tag: 'Backend',    title: 'Node & REST APIs' },
  { tag: 'Design',     title: 'Figma & UI/UX' },
  { tag: 'Versioning', title: 'Git & GitHub' },
  { tag: 'Other',      title: 'Python & ML basics' },
  { tag: 'Practice',   title: 'Clean Architecture' },
];

export default function HScrollStrip() {
  const trackRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const sec = sectionRef.current;
      const track = trackRef.current;
      if (!sec || !track) return;

      const rect = sec.getBoundingClientRect();
      const vh = window.innerHeight;
      // progress 0→1 as section moves through viewport
      const progress = 1 - (rect.top + rect.height) / (vh + rect.height);
      const clampedP = Math.min(Math.max(progress, 0), 1);

      const maxShift = track.scrollWidth - sec.offsetWidth;
      track.style.transform = `translateX(-${clampedP * maxShift * 0.6}px)`;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div ref={sectionRef} className="hscroll-section">
      <div ref={trackRef} className="hscroll-track">
        {cards.map((c, i) => (
          <div key={i} className="hscroll-card">
            <div className="hscroll-card-glow" />
            <p className="hscroll-card-tag">{c.tag}</p>
            <p className="hscroll-card-title">{c.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
