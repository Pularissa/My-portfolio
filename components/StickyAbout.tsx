'use client';

import { useState, useEffect } from 'react';
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
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const slide = slides[active];
  const Icon = slide.Icon;

  return (
    <section id="about" className="about-section">
      <div className="about-bg-glow" />

      <div className="about-inner">
        <div className="section-label">
          <span className="section-label-line" />
          <span className="section-label-text">About Me</span>
        </div>

        <div className="about-layout">
          <nav className="about-nav" aria-label="About sections">
            {slides.map(({ label, Icon: StepIcon }, i) => (
              <button
                key={label}
                type="button"
                className={`about-tab${active === i ? ' about-tab--active' : ''}`}
                onClick={() => setActive(i)}
                aria-current={active === i ? 'true' : undefined}
              >
                <span className="about-tab-icon">
                  <StepIcon size={18} strokeWidth={1.5} />
                </span>
                <span className="about-tab-label">{label}</span>
              </button>
            ))}
          </nav>

          <div className="about-panel" key={active}>
            <div className="about-panel-num">0{active + 1}</div>
            <div className="about-panel-icon">
              <Icon size={26} strokeWidth={1.5} color="var(--gold)" />
            </div>
            <p className="about-panel-tag">{slide.label}</p>
            <h2 className="about-panel-title">
              {slide.title}{' '}
              <span className="about-panel-accent">{slide.titleAccent}</span>
            </h2>
            <p className="about-panel-body">{slide.body}</p>

            <div className="about-dots" role="tablist" aria-label="About slide indicators">
              {slides.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  role="tab"
                  aria-selected={active === i}
                  aria-label={`Go to section ${i + 1}`}
                  className={`about-dot${active === i ? ' about-dot--active' : ''}`}
                  onClick={() => setActive(i)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
