'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { User, Code2, Rocket } from 'lucide-react';
import { getLenis } from '../lib/lenisInstance';

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

function viewportHeight() {
  return window.visualViewport?.height ?? window.innerHeight;
}

function WordStagger({
  text,
  active,
  slideIndex,
  className,
}: {
  text: string;
  active: number;
  slideIndex: number;
  className?: string;
}) {
  const [inView, setInView] = useState(active === slideIndex);

  useEffect(() => {
    if (active !== slideIndex) {
      setInView(false);
      return;
    }
    setInView(false);
    const id = requestAnimationFrame(() => setInView(true));
    return () => cancelAnimationFrame(id);
  }, [active, slideIndex, text]);

  return (
    <span className={`word-stagger${inView ? ' in' : ''}${className ? ` ${className}` : ''}`}>
      {text.split(' ').map((word, i) => (
        <span key={`${word}-${i}`} style={{ transitionDelay: `${i * 45}ms` }}>
          {word}{'\u00a0'}
        </span>
      ))}
    </span>
  );
}

function ProgressRing({ progress }: { progress: number }) {
  const r = 52;
  const size = 120;
  const circ = 2 * Math.PI * r;
  const dash = Math.min(Math.max(progress, 0), 1) * circ;

  return (
    <svg
      className="sa-progress-ring"
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      aria-hidden
    >
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke="rgba(255,255,255,0.06)"
        strokeWidth="1.5"
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke="var(--gold)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeDasharray={`${dash} ${circ - dash}`}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
      />
    </svg>
  );
}

export default function StickyAbout() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [slideProgress, setSlideProgress] = useState(0);
  const [pinned, setPinned] = useState(false);
  const activeRef = useRef(0);

  const scrollToSlide = useCallback((i: number) => {
    const el = sectionRef.current;
    if (!el) return;
    const total = el.offsetHeight - viewportHeight();
    const targetScroll = el.offsetTop + (i / slides.length) * total;
    const lenis = getLenis();
    if (lenis) lenis.scrollTo(targetScroll, { duration: 1.1 });
    else window.scrollTo({ top: targetScroll, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    activeRef.current = active;
  }, [active]);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const compute = () => {
      const rect = el.getBoundingClientRect();
      const vh = viewportHeight();
      const total = el.offsetHeight - vh;
      if (total <= 0) return;

      const scrolled = Math.max(0, -rect.top);
      const p = Math.min(scrolled / total, 0.999);
      const raw = p * slides.length;
      const idx = Math.min(Math.floor(raw), slides.length - 1);
      const frac = raw - idx;

      setActive(idx);
      setSlideProgress(frac);
      setPinned(rect.top <= 0 && rect.bottom >= vh);
    };

    const onScroll = () => compute();

    window.addEventListener('lenis:scroll', onScroll);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    window.visualViewport?.addEventListener('resize', onScroll);

    let lenisCleanup: (() => void) | undefined;
    const attachLenis = () => {
      const lenis = getLenis();
      if (!lenis) return false;
      lenis.on('scroll', onScroll);
      lenisCleanup = () => lenis.off('scroll', onScroll);
      return true;
    };

    let pollId: ReturnType<typeof setInterval> | undefined;
    if (!attachLenis()) {
      pollId = setInterval(() => {
        if (attachLenis()) clearInterval(pollId);
      }, 50);
      setTimeout(() => clearInterval(pollId), 3000);
    }

    compute();

    return () => {
      clearInterval(pollId);
      window.removeEventListener('lenis:scroll', onScroll);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      window.visualViewport?.removeEventListener('resize', onScroll);
      lenisCleanup?.();
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!pinned) return;
      const tag = (e.target as HTMLElement).tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA') return;

      let next: number | null = null;
      if (e.key === 'ArrowDown' || e.key === 'j' || e.key === 'J') next = activeRef.current + 1;
      if (e.key === 'ArrowUp' || e.key === 'k' || e.key === 'K') next = activeRef.current - 1;

      if (next === null) return;
      next = Math.max(0, Math.min(slides.length - 1, next));
      if (next === activeRef.current) return;

      e.preventDefault();
      scrollToSlide(next);
    };

    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [pinned, scrollToSlide]);

  const iconY = (1 - slideProgress) * -20;
  const ghostY = slideProgress * 28;

  return (
    <div
      ref={sectionRef}
      id="about"
      className="sa-section"
      style={{ height: `${slides.length * 100}vh` }}
    >
      <div className="sa-pin">
        <div className="sa-bg-glow" />

        <div className="sa-eyebrow">
          <span className="sa-eyebrow-line" />
          <span className="sa-eyebrow-text">About Me</span>
        </div>

        <div className="sa-grid">
          <div className="sa-left">
            {slides.map(({ Icon, label }, i) => (
              <button
                key={label}
                type="button"
                className={`sa-step${active === i ? ' sa-step--active' : ''}`}
                onClick={() => scrollToSlide(i)}
                aria-current={active === i ? 'step' : undefined}
              >
                <span className="sa-step-ring">
                  <Icon size={18} strokeWidth={1.5} />
                </span>
                <span className="sa-step-label">{label}</span>
              </button>
            ))}
          </div>

          <div className="sa-right">
            {slides.map(({ Icon, label, title, titleAccent, body }, i) => {
              const isActive = active === i;
              return (
                <div
                  key={label}
                  className={`sa-slide${isActive ? ' sa-slide--active' : ''}`}
                  aria-hidden={!isActive}
                >
                  <div className="sa-ghost-wrap">
                    {isActive && <ProgressRing progress={slideProgress} />}
                    <div
                      className="sa-ghost-num"
                      style={{ transform: isActive ? `translateY(${ghostY}px)` : undefined }}
                    >
                      0{i + 1}
                    </div>
                  </div>

                  <div
                    className="sa-icon-wrap"
                    style={{ transform: isActive ? `translateY(${iconY}px)` : undefined }}
                  >
                    <Icon size={28} strokeWidth={1.5} color="var(--gold)" />
                  </div>

                  <div className="sa-step-tag">{label}</div>

                  <h2 className="sa-title">
                    <WordStagger text={title} active={active} slideIndex={i} />
                    {' '}
                    <span className="sa-title-accent">
                      <WordStagger text={titleAccent} active={active} slideIndex={i} />
                    </span>
                  </h2>

                  <p className="sa-body">
                    <WordStagger text={body} active={active} slideIndex={i} />
                  </p>

                  <div className="sa-progress">
                    {slides.map((_, j) => (
                      <div
                        key={j}
                        className={`sa-prog-dot${active === j ? ' sa-prog-dot--active' : ''}`}
                        style={
                          active === j
                            ? { width: `${6 + slideProgress * 22}px` }
                            : undefined
                        }
                      />
                    ))}
                  </div>

                  <div
                    className="sa-slide-bar"
                    style={{ transform: `scaleX(${isActive ? slideProgress : 0})` }}
                  />
                </div>
              );
            })}
          </div>
        </div>

        {active < slides.length - 1 && (
          <div className="sa-hint">
            <span className="sa-hint-line" />
            <span className="sa-hint-text">Scroll to continue</span>
            <span className="sa-hint-keys">↑↓ or J K</span>
          </div>
        )}
      </div>
    </div>
  );
}
