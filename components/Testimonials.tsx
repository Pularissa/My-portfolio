'use client';
import { useState, useEffect, useCallback } from 'react';
import { useScrollReveal } from './useScrollReveal';

const recommendations = [
  {
    id: 1,
    name: "Twarimitswe Aaron",
    initials: "TA",
    text: "Prisca is a hardworking and dedicated person. She enjoys learning new technologies and solving real-world problems. She likes working on useful projects that make a real difference. She is always ready to learn new skills and improve herself. I highly recommend Prisca because she works hard, learns quickly, and always does her best. She would be a valuable member of any team.",
  },
  {
    id: 2,
    name: "Impano Christella",
    initials: "IC",
    text: "Prisca is a very dedicated and determined person to work with. From understanding requirements up to the final product delivery, she handles everything flawlessly. She really understands her material.",
  },
  {
    id: 3,
    name: "Igihozo Belise",
    initials: "IB",
    text: "Prisca is a skilled frontend developer who consistently delivers clean, responsive, and user-friendly interfaces. She has a strong eye for detail, writes maintainable code, and is a great addition to any development team.",
  },
  {
    id: 4,
    name: "Ishema S. Shoulamite",
    initials: "IS",
    text: "I've had the chance to see Prisca grow as a frontend developer, and one thing stands out — she genuinely cares about building good experiences. She's reliable, quick to learn, and writes clean, thoughtful code. Any team looking for someone who combines skill with consistency will be lucky to have her.",
  },
  {
    id: 5,
    name: "Ganwa A. Laure",
    initials: "GL",
    text: "I strongly recommend Prisca for software-related opportunities. She possesses excellent programming skills, a strong work ethic, and a passion for creating innovative software solutions. Her ability to learn quickly, solve complex problems, and collaborate effectively makes her an outstanding candidate for any software development role.",
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused]   = useState(false);
  const [animating, setAnimating] = useState(false);

  const [headerRef, headerVisible] = useScrollReveal<HTMLDivElement>();
  const [bodyRef,   bodyVisible]   = useScrollReveal<HTMLDivElement>({ threshold: 0.1 });

  const goTo = useCallback((idx: number) => {
    if (animating) return;
    setAnimating(true);
    setTimeout(() => {
      setCurrent(idx);
      setAnimating(false);
    }, 380);
  }, [animating]);

  const next = useCallback(() => goTo((current + 1) % recommendations.length), [current, goTo]);
  const prev = useCallback(() => goTo((current - 1 + recommendations.length) % recommendations.length), [current, goTo]);

  // Auto-advance every 4 s, pause on hover
  useEffect(() => {
    if (paused) return;
    const t = setInterval(next, 4000);
    return () => clearInterval(t);
  }, [paused, next]);

  const item = recommendations[current];

  return (
    <section className="testimonials-section">
      <div className="testimonials-inner">

        {/* Header */}
        <div ref={headerRef} className="testimonials-header" style={{
          opacity: headerVisible ? 1 : 0,
          transform: headerVisible ? 'translateY(0)' : 'translateY(32px)',
          transition: 'opacity 0.8s ease, transform 0.8s cubic-bezier(0.25,1,0.5,1)',
        }}>
          <div className="section-label">
            <span className="section-label-line" />
            <span className="section-label-text">Recommendations</span>
          </div>
          <h2 className="section-heading">What peers <em>say</em></h2>
          <p style={{ marginTop: '12px', fontSize: '0.9rem', color: 'var(--white-dim)', maxWidth: '500px', lineHeight: 1.75 }}>
            Words from classmates and collaborators at Rwanda Coding Academy.
          </p>
        </div>

        {/* Carousel */}
        <div
          ref={bodyRef}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          style={{
            opacity: bodyVisible ? 1 : 0,
            transform: bodyVisible ? 'translateY(0)' : 'translateY(40px)',
            transition: 'opacity 0.8s ease 0.15s, transform 0.8s cubic-bezier(0.25,1,0.5,1) 0.15s',
          }}
        >
          {/* Card */}
          <div style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-lg)',
            padding: '52px 56px',
            maxWidth: '760px',
            margin: '0 auto',
            position: 'relative',
            overflow: 'hidden',
            opacity: animating ? 0 : 1,
            transform: animating ? 'translateY(16px) scale(0.98)' : 'translateY(0) scale(1)',
            transition: 'opacity 0.35s ease, transform 0.35s ease',
          }}>
            {/* Big decorative quote */}
            <span style={{
              position: 'absolute', top: '20px', right: '32px',
              fontFamily: 'var(--font-serif)', fontSize: '7rem',
              color: 'var(--gold)', opacity: 0.07, lineHeight: 1,
              pointerEvents: 'none', userSelect: 'none',
            }}>"</span>

            {/* Avatar + name row */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '18px', marginBottom: '28px' }}>
              <div className="testimonial-avatar" style={{ flexShrink: 0 }}>{item.initials}</div>
              <div>
                <div className="testimonial-name">{item.name}</div>
                <div style={{ width: '28px', height: '1px', background: 'var(--gold)', marginTop: '6px' }} />
              </div>
            </div>

            {/* Quote */}
            <p className="testimonial-text" style={{ fontSize: '1rem', lineHeight: 1.85 }}>
              &ldquo;{item.text}&rdquo;
            </p>

            {/* Stars */}
            <div className="testimonial-stars" style={{ marginTop: '28px' }}>
              {[1,2,3,4,5].map(s => <span key={s}>★</span>)}
            </div>
          </div>

          {/* Controls */}
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            gap: '20px', marginTop: '36px',
          }}>
            {/* Prev */}
            <button onClick={prev} aria-label="Previous"
              style={{
                width: '40px', height: '40px', borderRadius: '50%',
                border: '1px solid var(--border-hover)', background: 'transparent',
                color: 'var(--white-dim)', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor='var(--gold)'; (e.currentTarget as HTMLButtonElement).style.color='var(--gold)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor='var(--border-hover)'; (e.currentTarget as HTMLButtonElement).style.color='var(--white-dim)'; }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M15 18l-6-6 6-6"/></svg>
            </button>

            {/* Dots */}
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              {recommendations.map((_, i) => (
                <button key={i} onClick={() => goTo(i)} aria-label={`Go to ${recommendations[i].name}`}
                  style={{
                    width: i === current ? '24px' : '7px',
                    height: '7px',
                    borderRadius: '4px',
                    background: i === current ? 'var(--gold)' : 'var(--border-hover)',
                    border: 'none', cursor: 'pointer', padding: 0,
                    transition: 'all 0.35s ease',
                  }}
                />
              ))}
            </div>

            {/* Next */}
            <button onClick={next} aria-label="Next"
              style={{
                width: '40px', height: '40px', borderRadius: '50%',
                border: '1px solid var(--border-hover)', background: 'transparent',
                color: 'var(--white-dim)', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor='var(--gold)'; (e.currentTarget as HTMLButtonElement).style.color='var(--gold)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor='var(--border-hover)'; (e.currentTarget as HTMLButtonElement).style.color='var(--white-dim)'; }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M9 18l6-6-6-6"/></svg>
            </button>
          </div>

          {/* Auto/paused indicator */}
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            gap: '6px', marginTop: '14px',
            fontSize: '0.62rem', letterSpacing: '0.14em', textTransform: 'uppercase',
            color: 'var(--white-dim)', opacity: 0.45,
          }}>
            <span style={{
              width: '5px', height: '5px', borderRadius: '50%',
              background: paused ? 'var(--white-dim)' : 'var(--gold)',
              boxShadow: paused ? 'none' : '0 0 6px rgba(201,169,110,0.6)',
              transition: 'all 0.3s ease',
            }} />
            {paused ? 'Paused' : 'Auto · 4s'}
          </div>
        </div>

      </div>
    </section>
  );
}
