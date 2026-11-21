'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { Sparkles } from 'lucide-react';
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
} from 'framer-motion';

const words = ['Developer', 'Builder', 'Problem Solver', 'Student'];

/* ── Magnetic button hook ──────────────────────────────────────────── */
function useMagnetic(strength = 6) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useSpring(0, { stiffness: 300, damping: 25 });
  const y = useSpring(0, { stiffness: 300, damping: 25 });

  const onMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set(((e.clientX - cx) / rect.width) * strength * 2);
    y.set(((e.clientY - cy) / rect.height) * strength * 2);
  };

  const onMouseLeave = () => { x.set(0); y.set(0); };

  return { ref, x, y, onMouseMove, onMouseLeave };
}

export default function Hero() {
  const [wordIdx, setWordIdx]         = useState(0);
  const [wordVisible, setWordVisible] = useState(true);

  /* word cycling */
  useEffect(() => {
    const iv = setInterval(() => {
      setWordVisible(false);
      setTimeout(() => { setWordIdx(i => (i + 1) % words.length); setWordVisible(true); }, 350);
    }, 2600);
    return () => clearInterval(iv);
  }, []);

  /* ── 8. Text Parallax Exit ─────────────────────────────────────── */
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '-30%']);

  /* ── 5. Mouse Parallax ─────────────────────────────────────────── */
  const frameRef = useRef<HTMLDivElement>(null);
  const ringRef  = useRef<HTMLDivElement>(null);
  const rafId    = useRef<number>(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      cancelAnimationFrame(rafId.current);
      rafId.current = requestAnimationFrame(() => {
        const cx = window.innerWidth  / 2;
        const cy = window.innerHeight / 2;
        const dx = ((e.clientX - cx) / cx) * -12;
        const dy = ((e.clientY - cy) / cy) * -12;
        if (frameRef.current) {
          frameRef.current.style.transform = `translate(${dx}px, ${dy}px)`;
        }
        if (ringRef.current) {
          ringRef.current.style.transform = `translate(${dx * 0.6}px, ${dy * 0.6}px)`;
        }
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(rafId.current);
    };
  }, []);

  /* ── 6. Magnetic Buttons ───────────────────────────────────────── */
  const primary   = useMagnetic(6);
  const secondary = useMagnetic(6);

  /* ── Stagger delays (3) ────────────────────────────────────────── */
  const E = [0.22, 1, 0.36, 1] as const;
  const fadeUp = (delay: number) => ({
    initial:    { opacity: 0, y: 24 },
    animate:    { opacity: 1, y: 0  },
    transition: { duration: 0.6, ease: E, delay },
  });

  return (
    /* wrap section for useScroll target */
    <motion.section className="hero-section" ref={sectionRef}>
      <div className="hero-glow" />
      <div className="hero-corner hero-corner-tl" />
      <div className="hero-corner hero-corner-tr" />
      <div className="hero-corner hero-corner-bl" />

      <nav className="navbar">
        <Link href="/" className="logo" style={{ display: 'flex', alignItems: 'center', position: 'relative', textDecoration: 'none' }}>
          <div style={{ width: '46px', height: '46px', backgroundColor: 'white', borderRadius: '50%', position: 'absolute', left: '-6px', top: '50%', transform: 'translateY(-50%)', zIndex: 0 }} />
          <span className="kolker-font blend-difference" style={{ color: 'white', fontSize: '64px', position: 'relative', zIndex: 10, paddingLeft: '4px', lineHeight: 1 }}>Prisca</span>
        </Link>
        <ul className="nav-links">
          <li><Link href="/">Home</Link></li>
          <li><Link href="#skills">Skills</Link></li>
          <li><Link href="#projects">Projects</Link></li>
          <li><Link href="#experience">Education</Link></li>
          <li><Link href="#contact">Contact</Link></li>
        </ul>
        <a href="#contact" className="nav-cta">Let&apos;s talk</a>
      </nav>

      <div className="hero-body">

        {/* ── 8. Text parallax exit ───────────────────────────────── */}
        <motion.div className="hero-text reveal-left" style={{ y: textY }}>

          {/* ── 3. Staggered entrance: eyebrow @ 100ms ─────────────── */}
          <motion.div className="hero-eyebrow reveal" style={{ transitionDelay: '100ms' }} {...fadeUp(0.1)}>
            <span className="hero-eyebrow-line" />
            <span className="hero-eyebrow-text">
              Software&nbsp;
              <span
                className="hero-eyebrow-word"
                style={{
                  opacity:    wordVisible ? 1 : 0,
                  transform:  wordVisible ? 'translateY(0)' : 'translateY(6px)',
                  transition: 'opacity 0.3s ease, transform 0.3s ease',
                }}
              >
                {words[wordIdx]}
              </span>
            </span>
          </motion.div>

          {/* ── 1. Split text reveal for name @ 200ms ──────────────── */}
          <div className="clip-wrap" style={{ overflow: 'hidden' }}>
            <h1 className="hero-name reveal-clip">
              <motion.span
                className="hero-name-first"
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0  }}
                transition={{ duration: 0.7, ease: E, delay: 0.2 }}
                style={{ display: 'inline-block' }}
              >
                Prisca
              </motion.span>
              {' '}
              <motion.em
                className="hero-name-last"
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0  }}
                transition={{ duration: 0.7, ease: E, delay: 0.32 }}
                style={{ display: 'inline-block' }}
              >
                Larissa.
              </motion.em>
            </h1>
          </div>

          {/* ── 2. Blur-to-focus tagline @ 400ms ───────────────────── */}
          <motion.p
            className="hero-tagline reveal"
            style={{ transitionDelay: '200ms' }}
            initial={{ opacity: 0, filter: 'blur(8px)' }}
            animate={{ opacity: 1, filter: 'blur(0px)' }}
            transition={{ duration: 0.9, ease: 'easeOut', delay: 0.4 }}
          >
            Software Programming &amp; Embedded Systems student at Rwanda Coding Academy — building real solutions for real problems across web, mobile, and hardware.
          </motion.p>

          {/* ── 3. Staggered entrance: badge @ 600ms ───────────────── */}
          <motion.div className="hero-available reveal" style={{ transitionDelay: '300ms' }} {...fadeUp(0.6)}>
            <span className="hero-available-dot" />
            Open to internships &amp; collaborative opportunities
          </motion.div>

          {/* ── 3. Staggered entrance: buttons @ 800ms ─────────────── */}
          <motion.div className="hero-actions reveal" style={{ transitionDelay: '400ms' }} {...fadeUp(0.8)}>

            {/* ── 6. Magnetic primary button ─────────────────────────── */}
            <motion.a
              href="#projects"
              className="hero-btn-primary"
              ref={primary.ref}
              style={{ x: primary.x, y: primary.y }}
              onMouseMove={primary.onMouseMove}
              onMouseLeave={primary.onMouseLeave}
            >
              View my projects
            </motion.a>

            {/* ── 6. Magnetic secondary button ───────────────────────── */}
            <motion.a
              href="#contact"
              className="hero-btn-secondary"
              ref={secondary.ref}
              style={{ x: secondary.x, y: secondary.y }}
              onMouseMove={secondary.onMouseMove}
              onMouseLeave={secondary.onMouseLeave}
            >
              Get in touch
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M7 17L17 7M17 7H7M17 7v10" />
              </svg>
            </motion.a>

          </motion.div>
        </motion.div>

        {/* ── 4. 3D Image Float + 5. Mouse Parallax ──────────────────── */}
        <div className="hero-visual reveal-right">

          {/* parallax ring */}
          <div className="hero-ring" ref={ringRef} style={{ transition: 'transform 0.1s linear' }} />

          {/* parallax + float frame */}
          <motion.div
            className="hero-image-frame reveal-blur"
            style={{ transitionDelay: '100ms' }}
            ref={frameRef}
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          >
            <div className="hero-deco-dot" />
            <div className="hero-deco-dot" />
            <Image src="/images/me.png" alt="Prisca Larissa" fill className="object-cover" priority />
            <div className="hero-image-overlay" />
            <div className="hero-image-badge">
              <div>
                <div className="hero-badge-name">Prisca Larissa</div>
                <div className="hero-badge-role">RCA · Software &amp; Embedded Systems</div>
              </div>
              <div className="hero-badge-icon"><Sparkles size={16} strokeWidth={1.5} /></div>
            </div>
          </motion.div>

          <div className="hero-float-card reveal-rotate" style={{ transitionDelay: '300ms' }}>
            <div className="hero-float-label">Currently building</div>
            <div className="hero-float-chips">
              {['UmuhinziLink', 'Next.js', 'IoT'].map(t => (
                <span key={t} className="hero-float-chip">{t}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── 7. Animated Scroll Indicator ─────────────────────────────── */}
      <div className="hero-bottom reveal" style={{ transitionDelay: '500ms' }}>
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
      </div>
    </motion.section>
  );
}
