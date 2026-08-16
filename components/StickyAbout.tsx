'use client';
import { useEffect, useRef, useState } from 'react';
import { User, Code2, Rocket } from 'lucide-react';

const slides = [
  {
    label: '01 — WHO I AM',
    title: 'A student who builds',
    titleAccent: 'real things',
    body: "I'm Prisca Larissa — a Software Programming & Embedded Systems student at Rwanda Coding Academy. I care deeply about using technology to solve problems that matter in my community.",
    Icon: User,
  },
  {
    label: '02 — WHAT I DO',
    title: 'From web apps to',
    titleAccent: 'IoT systems',
    body: "I work across the full stack — Next.js and React on the frontend, Node.js and Spring Boot on the backend, PostgreSQL for data, and Arduino & ESP8266 for embedded hardware projects.",
    Icon: Code2,
  },
  {
    label: '03 — WHAT I WANT',
    title: 'Internships,',
    titleAccent: 'collaboration, growth',
    body: "I'm actively looking for internships, graduate programmes, and opportunities to collaborate. Passionate about AgriTech, civic tech, and building tools that uplift communities in Rwanda and beyond.",
    Icon: Rocket,
  },
];

export default function StickyAbout() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const el = sectionRef.current;
      if (!el) return;
      const rect     = el.getBoundingClientRect();
      const total    = el.offsetHeight - window.innerHeight;
      if (total <= 0) return;
      const scrolled = Math.max(0, -rect.top);

      // Mark as entered when section is in view
      if (scrolled > 0) setEntered(true);

      const p = Math.min(scrolled / total, 0.999);
      setActive(Math.min(Math.floor(p * slides.length), slides.length - 1));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div ref={sectionRef} className="sticky-section" style={{ height: `${slides.length * 100}vh` }}>
      <div className="sticky-pin">

        {/* Ambient background glow */}
        <div className="sticky-bg-glow" />

        {/* Section label — top left */}
        <div className="sticky-eyebrow">
          <span className="sticky-eyebrow-line" />
          <span className="sticky-eyebrow-text">About Me</span>
        </div>

        {/* Left panel — step indicators */}
        <div className="sticky-left">
          {slides.map(({ Icon, label }, i) => (
            <div key={i} className="sticky-left-item" style={{
              opacity:   active === i ? 1 : 0.15,
              transform: active === i ? 'translateX(0)' : 'translateX(-12px)',
              transition: 'opacity 0.55s ease, transform 0.55s ease',
            }}>
              <div className="sticky-icon-ring" style={{
                background: active === i ? 'var(--gold-faint)' : 'transparent',
                borderColor: active === i ? 'var(--gold-dim)' : 'rgba(255,255,255,0.08)',
                transition: 'background 0.4s ease, border-color 0.4s ease',
              }}>
                <Icon size={22} color="var(--gold)" strokeWidth={1.5} />
              </div>
              <div className="sticky-slide-label">{label}</div>
            </div>
          ))}
        </div>

        {/* Right panel — content */}
        <div className="sticky-right">
          {slides.map(({ title, titleAccent, body }, i) => (
            <div key={i} className="sticky-slide-fm" style={{
              opacity:       active === i ? 1 : 0,
              transform:     active === i ? 'translateY(0) scale(1)' : 'translateY(28px) scale(0.97)',
              filter:        active === i ? 'blur(0px)' : 'blur(8px)',
              transition:    'opacity 0.6s ease, transform 0.6s cubic-bezier(0.16,1,0.3,1), filter 0.6s ease',
              pointerEvents: active === i ? 'auto' : 'none',
            }}>
              {/* Large ghost number */}
              <div className="sticky-ghost-num">0{i + 1}</div>
              <h2 className="sticky-slide-title">
                {title} <span style={{ color: 'var(--gold)' }}>{titleAccent}</span>
              </h2>
              <p className="sticky-slide-body">{body}</p>
            </div>
          ))}
        </div>

        {/* Progress dots */}
        <div className="sticky-dots">
          {slides.map((_, i) => (
            <div key={i} className="sticky-dot" style={{
              height:     active === i ? '22px' : '6px',
              opacity:    active === i ? 1 : 0.28,
              background: 'var(--gold)',
              transition: 'height 0.4s cubic-bezier(0.16,1,0.3,1), opacity 0.4s ease',
            }} />
          ))}
        </div>

        {/* Scroll hint — fade out after entering */}
        <div className="sticky-scroll-hint" style={{
          opacity: active === 0 && !entered ? 0.5 : active === 0 ? 0.35 : 0,
          transition: 'opacity 0.5s ease',
        }}>
          <span className="sticky-hint-line" />
          <span className="sticky-hint-text">Scroll to explore</span>
        </div>

      </div>
    </div>
  );
}
