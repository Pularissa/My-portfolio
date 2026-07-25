'use client';

import { useRef } from 'react';
import { useScroll, useTransform, motion, MotionValue } from 'framer-motion';

const slides = [
  {
    label: 'Who I am',
    title: ['A student who builds', 'real things'],
    titleGold: 1,
    body: "I'm Prisca Larissa — a Software Programming & Embedded Systems student at Rwanda Coding Academy. I care deeply about using technology to solve problems that matter in my community.",
    number: '01',
    icon: '◈',
  },
  {
    label: 'What I do',
    title: ['From web apps to', 'IoT systems'],
    titleGold: 1,
    body: "I work across the full stack — Next.js and React on the frontend, Node.js and Spring Boot on the backend, PostgreSQL for data, and Arduino & ESP8266 for embedded hardware projects.",
    number: '02',
    icon: '◎',
  },
  {
    label: 'What I want',
    title: ['Internships,', 'collaboration, growth'],
    titleGold: 0,
    body: "I'm actively looking for internships, graduate programmes, and opportunities to collaborate. Passionate about AgriTech, civic tech, and building tools that uplift communities in Rwanda and beyond.",
    number: '03',
    icon: '◆',
  },
];

/* ─── Per-slide animated panel ─── */
function SlideContent({
  slide,
  scrollYProgress,
  index,
  total,
}: {
  slide: typeof slides[0];
  scrollYProgress: MotionValue<number>;
  index: number;
  total: number;
}) {
  const segSize  = 1 / total;
  const segStart = index * segSize;
  const segMid   = segStart + segSize * 0.15;
  const segEnd   = segStart + segSize * 0.85;
  const segFull  = segStart + segSize;

  /* ↓6 Enter: fade+rise; ↑6 Exit: fade+fall (both directions) */
  const opacity = useTransform(
    scrollYProgress,
    [segStart, segMid, segEnd, segFull],
    [0, 1, 1, 0]
  );
  const y = useTransform(
    scrollYProgress,
    [segStart, segMid, segEnd, segFull],
    [48, 0, 0, -48]
  );
  const scale = useTransform(
    scrollYProgress,
    [segStart, segMid, segEnd, segFull],
    [0.94, 1, 1, 0.94]
  );

  return (
    <motion.div className="sticky-slide-fm" style={{ opacity, y, scale }}>
      {slide.title.map((line, li) => (
        <h2
          key={li}
          className="sticky-slide-title"
          style={{ color: li === slide.titleGold ? 'var(--gold)' : 'var(--white)' }}
        >
          {line}
        </h2>
      ))}
      <p className="sticky-slide-body">{slide.body}</p>
    </motion.div>
  );
}

/* ─── Per-slide left panel item ─── */
function LeftItem({
  slide,
  scrollYProgress,
  index,
  total,
}: {
  slide: typeof slides[0];
  scrollYProgress: MotionValue<number>;
  index: number;
  total: number;
}) {
  const segSize  = 1 / total;
  const segStart = index * segSize;
  const segMid   = segStart + segSize * 0.15;
  const segEnd   = segStart + segSize * 0.85;
  const segFull  = segStart + segSize;

  const opacity = useTransform(
    scrollYProgress,
    [segStart, segMid, segEnd, segFull],
    [0, 1, 1, 0]
  );
  const scale = useTransform(
    scrollYProgress,
    [segStart, segMid, segEnd, segFull],
    [0.85, 1, 1, 0.85]
  );

  return (
    <motion.div className="sticky-left-item" style={{ opacity, scale }}>
      <div className="sticky-slide-icon">{slide.icon}</div>
      <div className="sticky-slide-number">{slide.number}</div>
      <p className="sticky-slide-label">{slide.label}</p>
    </motion.div>
  );
}

/* ─── Per-dot indicator ─── */
function DotIndicator({
  scrollYProgress,
  index,
  total,
}: {
  scrollYProgress: MotionValue<number>;
  index: number;
  total: number;
}) {
  const segSize  = 1 / total;
  const segStart = index * segSize;
  const segMid   = segStart + segSize * 0.15;
  const segEnd   = segStart + segSize * 0.85;
  const segFull  = segStart + segSize;

  const dotScale = useTransform(
    scrollYProgress,
    [segStart, segMid, segEnd, segFull],
    [1, 1.8, 1.8, 1]
  );
  const dotOp = useTransform(
    scrollYProgress,
    [segStart, segMid, segEnd, segFull],
    [0.25, 1, 1, 0.25]
  );

  return (
    <motion.div className="sticky-dot" style={{ scale: dotScale, opacity: dotOp }} />
  );
}

/* ─── Main component ─── */
export default function StickyAbout() {
  const sectionRef = useRef<HTMLDivElement>(null);

  /* ↓6 — useScroll tracks progress within this section */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  return (
    <div
      ref={sectionRef}
      className="sticky-section"
      style={{ height: `${slides.length * 100}vh` }}
    >
      <div className="sticky-pin">

        {/* ── Left side: icon + number + label ── */}
        <div className="sticky-left">
          {slides.map((slide, i) => (
            <LeftItem
              key={slide.number}
              slide={slide}
              scrollYProgress={scrollYProgress}
              index={i}
              total={slides.length}
            />
          ))}
        </div>

        {/* ── Right side: content panels ── */}
        <div className="sticky-right">
          {slides.map((slide, i) => (
            <SlideContent
              key={slide.number}
              slide={slide}
              scrollYProgress={scrollYProgress}
              index={i}
              total={slides.length}
            />
          ))}
        </div>

        {/* ── Progress dots ── */}
        <div className="sticky-dots">
          {slides.map((_, i) => (
            <DotIndicator
              key={i}
              scrollYProgress={scrollYProgress}
              index={i}
              total={slides.length}
            />
          ))}
        </div>

      </div>
    </div>
  );
}
