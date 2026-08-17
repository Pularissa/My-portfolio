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

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const compute = (scroll: number) => {
      const top    = el.offsetTop;
      const total  = el.offsetHeight - window.innerHeight;
      if (total <= 0) return;
      const scrolled = Math.max(0, scroll - top);
      const p   = Math.min(scrolled / total, 0.999);
      const idx = Math.min(Math.floor(p * slides.length), slides.length - 1);
      setActive(idx);
    };

    /* Listen to lenis:scroll — dispatched by LenisProvider on every Lenis tick.
       This works regardless of React effect execution order (child before parent). */
    const onLenisScroll = (e: Event) => compute((e as CustomEvent<{ scroll: number }>).detail.scroll);
    window.addEventListener('lenis:scroll', onLenisScroll);

    /* Native scroll fallback (also fires initial call for current position) */
    const onNativeScroll = () => compute(window.scrollY);
    window.addEventListener('scroll', onNativeScroll, { passive: true });
    onNativeScroll();

    return () => {
      window.removeEventListener('lenis:scroll', onLenisScroll);
      window.removeEventListener('scroll', onNativeScroll);
    };
  }, []);

  return (
    <div ref={sectionRef} className="sa-section" style={{ height: `${slides.length * 100}vh` }}>
      <div className="sa-pin">

        {/* Background glow */}
        <div className="sa-bg-glow" />

        {/* Eyebrow */}
        <div className="sa-eyebrow">
          <span className="sa-eyebrow-line" />
          <span className="sa-eyebrow-text">About Me</span>
        </div>

        {/* Main grid */}
        <div className="sa-grid">

          {/* LEFT — nav steps */}
          <div className="sa-left">
            {slides.map(({ Icon, label }, i) => (
              <button
                key={i}
                className={`sa-step${active === i ? ' sa-step--active' : ''}`}
                onClick={() => {
                  const el = sectionRef.current;
                  if (!el) return;
                  const total = el.offsetHeight - window.innerHeight;
                  const targetScroll = el.offsetTop + (i / slides.length) * total;
                  /* Use Lenis scroll if available, otherwise native */
                  const lenis = getLenis();
                  if (lenis) lenis.scrollTo(targetScroll, { duration: 1.2 });
                  else window.scrollTo({ top: targetScroll, behavior: 'smooth' });
                }}
              >
                <span className="sa-step-ring">
                  <Icon size={18} strokeWidth={1.5} />
                </span>
                <span className="sa-step-label">{label}</span>
              </button>
            ))}
          </div>

          {/* RIGHT — all slides stacked, active one visible */}
          <div className="sa-right">
            {slides.map(({ Icon, label, title, titleAccent, body }, i) => (
              <div
                key={i}
                className={`sa-slide${active === i ? ' sa-slide--active' : ''}`}
                aria-hidden={active !== i}
              >
                <div className="sa-ghost-num">0{i + 1}</div>
                <div className="sa-icon-wrap">
                  <Icon size={28} strokeWidth={1.5} color="var(--gold)" />
                </div>
                <div className="sa-step-tag">{label}</div>
                <h2 className="sa-title">
                  {title}{' '}
                  <span className="sa-title-accent">{titleAccent}</span>
                </h2>
                <p className="sa-body">{body}</p>

                {/* Progress bar */}
                <div className="sa-progress">
                  {slides.map((_, j) => (
                    <div
                      key={j}
                      className={`sa-prog-dot${active === j ? ' sa-prog-dot--active' : ''}`}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll hint */}
        {active < slides.length - 1 && (
          <div className="sa-hint">
            <span className="sa-hint-line" />
            <span className="sa-hint-text">Scroll to continue</span>
          </div>
        )}

      </div>
    </div>
  );
}
