'use client';
import { useEffect, useRef } from 'react';

const cards = [
  { tag: 'Frontend',      title: 'React & Next.js' },
  { tag: 'Styling',       title: 'Tailwind & CSS3' },
  { tag: 'Language',      title: 'Java & JavaScript' },
  { tag: 'Backend',       title: 'Spring Boot & Node.js' },
  { tag: 'Database',      title: 'PostgreSQL & MySQL' },
  { tag: 'Embedded',      title: 'Arduino & ESP8266' },
  { tag: 'IoT Sensors',   title: 'DHT11, LM35, I2C' },
  { tag: 'Tooling',       title: 'Git, Postman, Figma' },
  { tag: 'Other',         title: 'Python & C++' },
  { tag: 'Practice',      title: 'Agile & Clean Code' },
];

export default function HScrollStrip() {
  const trackRef   = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const sec   = sectionRef.current;
      const track = trackRef.current;
      if (!sec || !track) return;

      const rect     = sec.getBoundingClientRect();
      const vh       = window.innerHeight;
      const progress = 1 - (rect.top + rect.height) / (vh + rect.height);
      const clamped  = Math.min(Math.max(progress, 0), 1);
      const maxShift = track.scrollWidth - sec.offsetWidth;
      track.style.transform = `translateX(-${clamped * maxShift * 0.6}px)`;
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
