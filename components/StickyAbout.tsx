'use client';
import { useEffect, useRef, useState } from 'react';

const slides = [
  {
    label: 'Who I am',
    title: 'A student who\nbuilds <em>real things</em>',
    body: "I'm Prisca Larisse — a Software Programming & Embedded Systems student at Rwanda Coding Academy. I care deeply about using technology to solve problems that matter in my community.",
    number: '01',
  },
  {
    label: 'What I do',
    title: 'From web apps\nto <em>IoT systems</em>',
    body: "I work across the full stack — Next.js and React on the frontend, Node.js and Spring Boot on the backend, PostgreSQL for data, and Arduino & ESP8266 for embedded hardware projects.",
    number: '02',
  },
  {
    label: 'What I want',
    title: 'Internships,\n<em>collaboration</em>, growth',
    body: "I'm actively looking for internships, graduate programmes, and opportunities to collaborate. I'm passionate about AgriTech, civic tech, and building tools that uplift communities in Rwanda and beyond.",
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
      const rect  = el.getBoundingClientRect();
      const total = el.offsetHeight - window.innerHeight;
      const scrolled = Math.max(0, -rect.top);
      const progress = Math.min(scrolled / total, 0.999);
      setActiveIdx(Math.min(Math.floor(progress * slides.length), slides.length - 1));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div ref={sectionRef} className="sticky-section" style={{ height: `${slides.length * 100}vh` }}>
      <div className="sticky-pin">
        {slides.map((slide, i) => (
          <div key={i} className={`sticky-slide${activeIdx === i ? ' active' : ''}`}>
            <div className="sticky-slide-number">{slide.number}</div>
            <div className="sticky-slide-inner">
              <p className="sticky-slide-label">{slide.label}</p>
              <h2
                className="sticky-slide-title"
                dangerouslySetInnerHTML={{ __html: slide.title.replace(/\n/g, '<br/>') }}
              />
              <p className="sticky-slide-body">{slide.body}</p>
            </div>
          </div>
        ))}
        <div className="sticky-dots">
          {slides.map((_, i) => (
            <div key={i} className={`sticky-dot${activeIdx === i ? ' active' : ''}`} />
          ))}
        </div>
      </div>
    </div>
  );
}
