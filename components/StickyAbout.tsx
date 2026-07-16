'use client';
import { useEffect, useRef, useState } from 'react';

const slides = [
  {
    label: 'Who I am',
    title: 'A developer who\ncares about <em>craft</em>',
    body: "I'm Prisca Larisse — a software developer who believes that great code and great design are inseparable. I write clean, purposeful software that solves real problems.",
    number: '01',
  },
  {
    label: 'What I do',
    title: 'From concept\nto <em>polished product</em>',
    body: "I take ideas from wireframe to production — building responsive interfaces, robust APIs, and everything in between. Full-stack, end-to-end, no shortcuts.",
    number: '02',
  },
  {
    label: 'How I work',
    title: 'Thoughtful,\n<em>iterative</em>, precise',
    body: "I work closely with teams and clients, listen first, then build. Every decision is intentional — from the font choice to the database schema.",
    number: '03',
  },
];

export default function StickyAbout() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = el.offsetHeight - window.innerHeight;
      const scrolled = Math.max(0, -rect.top);
      const progress = Math.min(scrolled / total, 0.999);
      const idx = Math.floor(progress * slides.length);
      setActiveIdx(Math.min(idx, slides.length - 1));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    // height = 100vh per slide so there's room to scroll through each
    <div
      ref={sectionRef}
      className="sticky-section"
      style={{ height: `${slides.length * 100}vh` }}
    >
      <div className="sticky-pin">
        {slides.map((slide, i) => (
          <div key={i} className={`sticky-slide${activeIdx === i ? ' active' : ''}`}>
            <div className="sticky-slide-number">{slide.number}</div>
            <div className="sticky-slide-inner">
              <p className="sticky-slide-label">{slide.label}</p>
              <h2
                className="sticky-slide-title"
                dangerouslySetInnerHTML={{
                  __html: slide.title.replace(/\n/g, '<br/>'),
                }}
              />
              <p className="sticky-slide-body">{slide.body}</p>
            </div>
          </div>
        ))}

        {/* Progress dots */}
        <div className="sticky-dots">
          {slides.map((_, i) => (
            <div key={i} className={`sticky-dot${activeIdx === i ? ' active' : ''}`} />
          ))}
        </div>
      </div>
    </div>
  );
}
