'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const words = ['Developer', 'Builder', 'Problem Solver', 'Student'];
const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function Hero() {
  const [wordIdx, setWordIdx]         = useState(0);
  const [wordVisible, setWordVisible] = useState(true);
  const [entered, setEntered]         = useState(false);
  const containerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end start'] });

  // Parallax values
  const rawGlowY  = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const rawOp     = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const rawScale  = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const rawTextY  = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);
  const rawPhotoY = useTransform(scrollYProgress, [0, 1], ['0%', '9%']);
  const rawSkew   = useTransform(scrollYProgress, [0, 1], [0, -2]);

  const glowY  = useSpring(rawGlowY,  { stiffness: 60, damping: 20 });
  const fadeOp = useSpring(rawOp,     { stiffness: 60, damping: 20 });

  // Mount entry
  useEffect(() => { const t = setTimeout(() => setEntered(true), 100); return () => clearTimeout(t); }, []);

  // Cycle words
  useEffect(() => {
    const iv = setInterval(() => {
      setWordVisible(false);
      setTimeout(() => { setWordIdx(i => (i + 1) % words.length); setWordVisible(true); }, 350);
    }, 2600);
    return () => clearInterval(iv);
  }, []);

  return (
    <motion.section ref={containerRef} className="hero-section" style={{ paddingTop: '88px', opacity: fadeOp }}>

      {/* Parallax glow */}
      <motion.div className="hero-glow" style={{ y: glowY, scale: rawScale }} />

      <div className="hero-corner hero-corner-tl" />
      <div className="hero-corner hero-corner-tr" />
      <div className="hero-corner hero-corner-bl" />

      {/* Skew on scroll exit */}
      <motion.div className="hero-body" style={{ skewY: rawSkew }}>

        {/* Text — parallax */}
        <motion.div className="hero-text" style={{ y: rawTextY }}>

          {/* Eyebrow — fade up */}
          <motion.div
            className="hero-eyebrow"
            initial={{ opacity: 0, y: 20 }}
            animate={entered ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
          >
            <span className="hero-eyebrow-line" />
            <span className="hero-eyebrow-text">
              Software&nbsp;
              <motion.span
                className="hero-eyebrow-word"
                animate={{ opacity: wordVisible ? 1 : 0, y: wordVisible ? 0 : 6 }}
                transition={{ duration: 0.3 }}
              >
                {words[wordIdx]}
              </motion.span>
            </span>
          </motion.div>

          {/* Name — clip up */}
          <div style={{ overflow: 'hidden' }}>
            <motion.h1
              className="hero-name"
              initial={{ y: '105%' }}
              animate={entered ? { y: '0%' } : {}}
              transition={{ duration: 0.9, delay: 0.2, ease: EASE }}
            >
              <span className="hero-name-first">Prisca</span>
              <motion.em
                className="hero-name-last"
                initial={{ opacity: 0 }}
                animate={entered ? { opacity: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.55 }}
              >
                Larissa.
              </motion.em>
            </motion.h1>
          </div>

          {/* Tagline */}
          <motion.p
            className="hero-tagline"
            initial={{ opacity: 0, y: 28 }}
            animate={entered ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.45, ease: EASE }}
          >
            Software Programming &amp; Embedded Systems student at Rwanda Coding
            Academy — building real solutions for real problems across web, mobile,
            and hardware.
          </motion.p>

          {/* Available */}
          <motion.div
            className="hero-available"
            initial={{ opacity: 0 }}
            animate={entered ? { opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.6 }}
          >
            <span className="hero-available-dot" />
            Open to internships &amp; collaborative opportunities
          </motion.div>

          {/* CTAs — scale reveal */}
          <motion.div
            className="hero-actions"
            initial={{ opacity: 0, scale: 0.88 }}
            animate={entered ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.72, ease: EASE }}
          >
            <a href="#projects" className="hero-btn-primary">View my projects</a>
            <a href="#contact" className="hero-btn-secondary">
              Get in touch
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M7 17L17 7M17 7H7M17 7v10" />
              </svg>
            </a>
          </motion.div>
        </motion.div>

        {/* Photo — parallax + blur reveal */}
        <motion.div
          className="hero-visual"
          style={{ y: rawPhotoY }}
          initial={{ opacity: 0, filter: 'blur(14px)', scale: 0.9 }}
          animate={entered ? { opacity: 1, filter: 'blur(0px)', scale: 1 } : {}}
          transition={{ duration: 1.1, delay: 0.4, ease: EASE }}
        >
          <div className="hero-ring" />
          <div className="hero-image-frame">
            <div className="hero-deco-dot" />
            <div className="hero-deco-dot" />
            <Image src="/images/me.png" alt="Prisca Larissa" fill className="object-cover" priority />
            <div className="hero-image-overlay" />
            <div className="hero-image-badge">
              <div>
                <div className="hero-badge-name">Prisca Larissa</div>
                <div className="hero-badge-role">RCA · Software &amp; Embedded Systems</div>
              </div>
              <div className="hero-badge-icon">✦</div>
            </div>
          </div>

          {/* Float card — rotation reveal */}
          <motion.div
            className="hero-float-card"
            initial={{ opacity: 0, rotate: -12, scale: 0.85 }}
            animate={entered ? { opacity: 1, rotate: 0, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.9, ease: EASE }}
          >
            <div className="hero-float-label">Currently building</div>
            <div className="hero-float-chips">
              {['UmuhinziLink', 'Next.js', 'IoT'].map(t => (
                <span key={t} className="hero-float-chip">{t}</span>
              ))}
            </div>
          </motion.div>
        </motion.div>

      </motion.div>

      {/* Bottom stats */}
      <motion.div
        className="hero-bottom"
        initial={{ opacity: 0 }}
        animate={entered ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.9 }}
      >
        <div className="hero-scroll">
          <span className="hero-scroll-line" />
          <span className="hero-scroll-text">Scroll to explore</span>
        </div>
        <div className="hero-stats">
          {[['10+','Projects'],['6+','Languages'],['RCA','Student']].map(([n, l], i) => (
            <div key={n} style={{ display: 'flex', alignItems: 'center' }}>
              {i > 0 && <div className="hero-stat-sep" />}
              <div className="hero-stat-item">
                <div className="hero-stat-number">{n}</div>
                <div className="hero-stat-label">{l}</div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

    </motion.section>
  );
}
