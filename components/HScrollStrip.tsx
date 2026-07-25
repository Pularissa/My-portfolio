'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const cards = [
  { tag: 'Frontend',    title: 'React & Next.js',        icon: '⬡' },
  { tag: 'Styling',     title: 'Tailwind & CSS3',         icon: '◈' },
  { tag: 'Language',    title: 'Java & JavaScript',       icon: '◎' },
  { tag: 'Backend',     title: 'Spring Boot & Node.js',   icon: '◆' },
  { tag: 'Database',    title: 'PostgreSQL & MySQL',      icon: '◇' },
  { tag: 'Embedded',    title: 'Arduino & ESP8266',       icon: '⬟' },
  { tag: 'IoT Sensors', title: 'DHT11, LM35, I2C',       icon: '◉' },
  { tag: 'Tooling',     title: 'Git, Postman, Figma',    icon: '⬢' },
  { tag: 'Other',       title: 'Python & C++',            icon: '◫' },
  { tag: 'Practice',    title: 'Agile & Clean Code',      icon: '◭' },
];

export default function HScrollStrip() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track   = trackRef.current;
    if (!section || !track) return;

    /* ↓5 / ↑5 — Horizontal scroll driven by vertical scroll via GSAP ScrollTrigger */
    const totalShift = track.scrollWidth - section.clientWidth;

    const tween = gsap.to(track, {
      x: -totalShift,
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: () => `+=${totalShift * 1.2}`,
        pin: true,
        scrub: 1.2,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });

    /* ↓5 — Staggered card reveal as they enter horizontal view */
    const cardEls = track.querySelectorAll<HTMLElement>('.hscroll-card');
    const cardTweens: gsap.core.Tween[] = [];
    cardEls.forEach((card, i) => {
      const t = gsap.fromTo(
        card,
        { opacity: 0, y: 32, scale: 0.88 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: `top+=${i * 60} top`,
            end:   `top+=${i * 60 + 200} top`,
            scrub: 0.8,
          },
        }
      );
      cardTweens.push(t);
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
      cardTweens.forEach((t) => {
        t.scrollTrigger?.kill();
        t.kill();
      });
      ScrollTrigger.refresh();
    };
  }, []);

  return (
    /* ↓5 — Horizontal scroll section */
    <div ref={sectionRef} className="hscroll-section" aria-label="Technology strip">
      {/* Section label */}
      <div className="hscroll-label">
        <span className="hscroll-label-line" />
        <span className="hscroll-label-text">Tech Stack</span>
        <span className="hscroll-label-hint">→ scroll to explore</span>
      </div>

      <div ref={trackRef} className="hscroll-track">
        {cards.map((c, i) => (
          <div key={i} className="hscroll-card" style={{ opacity: 0 }}>
            <div className="hscroll-card-glow" />
            <div className="hscroll-card-icon">{c.icon}</div>
            <p className="hscroll-card-tag">{c.tag}</p>
            <p className="hscroll-card-title">{c.title}</p>
            <div className="hscroll-card-num">{String(i + 1).padStart(2, '0')}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
