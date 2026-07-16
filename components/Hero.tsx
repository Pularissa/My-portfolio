'use client';

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const words = ["Developer", "Designer", "Builder", "Creator"];

export default function Hero() {
  const [wordIdx, setWordIdx] = useState(0);
  const [wordVisible, setWordVisible] = useState(true);
  const [scrollY, setScrollY] = useState(0);
  const [entered, setEntered] = useState(false);

  // Entry animation — mount then reveal
  useEffect(() => { const t = setTimeout(() => setEntered(true), 80); return () => clearTimeout(t); }, []);

  // Cycle words
  useEffect(() => {
    const iv = setInterval(() => {
      setWordVisible(false);
      setTimeout(() => { setWordIdx(i => (i + 1) % words.length); setWordVisible(true); }, 350);
    }, 2600);
    return () => clearInterval(iv);
  }, []);

  // Parallax + skew on scroll
  useEffect(() => {
    const fn = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const pText   = scrollY * 0.18;
  const pPhoto  = scrollY * 0.09;
  const pGlow   = scrollY * 0.28;
  const opacity = Math.max(0, 1 - scrollY / 550);
  const skewDeg = Math.min(scrollY * 0.008, 2); // gentle skew as you leave hero

  return (
    <section className="hero-section" style={{ opacity }}>
      <div className="hero-glow" style={{ transform: `translateY(${pGlow}px)` }} />

      {/* Corner marks */}
      <div className="hero-corner hero-corner-tl" />
      <div className="hero-corner hero-corner-tr" />
      <div className="hero-corner hero-corner-bl" />

      {/* Nav */}
      <nav className="navbar">
        <div className="logo"><span>P</span>risca</div>
        <ul className="nav-links">
          <li><Link href="/">Home</Link></li>
          <li><Link href="#skills">Skills</Link></li>
          <li><Link href="#projects">Projects</Link></li>
          <li><Link href="#experience">Experience</Link></li>
          <li><Link href="#contact">Contact</Link></li>
        </ul>
        <a href="#contact" className="nav-cta">Let&apos;s talk</a>
      </nav>

      {/* Body */}
      <div className="hero-body" style={{ transform: `skewY(${-skewDeg}deg)` }}>

        {/* Text — clip reveal lines on mount */}
        <div className="hero-text" style={{ transform: `translateY(${pText}px)` }}>

          <div className="hero-eyebrow"
            style={{
              opacity: entered ? 1 : 0,
              transform: entered ? 'translateY(0)' : 'translateY(12px)',
              transition: 'opacity 0.7s ease 0.1s, transform 0.7s cubic-bezier(0.25,1,0.5,1) 0.1s',
            }}
          >
            <span className="hero-eyebrow-line" />
            <span className="hero-eyebrow-text">
              Software&nbsp;
              <span className="hero-eyebrow-word"
                style={{ opacity: wordVisible ? 1 : 0, transform: wordVisible ? 'translateY(0)' : 'translateY(6px)' }}>
                {words[wordIdx]}
              </span>
            </span>
          </div>

          {/* Name — each line clips up from below */}
          <div style={{ overflow: 'hidden' }}>
            <h1 className="hero-name"
              style={{
                transform: entered ? 'translateY(0)' : 'translateY(100%)',
                transition: 'transform 0.9s cubic-bezier(0.16,1,0.3,1) 0.2s',
              }}
            >
              <span className="hero-name-first">Prisca</span>
              <em className="hero-name-last">Larisse.</em>
            </h1>
          </div>

          <p className="hero-tagline"
            style={{
              opacity: entered ? 1 : 0,
              transform: entered ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.8s ease 0.45s, transform 0.8s cubic-bezier(0.25,1,0.5,1) 0.45s',
            }}
          >
            I turn ideas into refined digital products — elegant interfaces,
            robust code, and experiences people actually enjoy using.
          </p>

          <div className="hero-available"
            style={{
              opacity: entered ? 1 : 0,
              transition: 'opacity 0.7s ease 0.6s',
            }}
          >
            <span className="hero-available-dot" />
            Available for new opportunities
          </div>

          <div className="hero-actions"
            style={{
              opacity: entered ? 1 : 0,
              transform: entered ? 'translateY(0)' : 'translateY(16px)',
              transition: 'opacity 0.7s ease 0.7s, transform 0.7s ease 0.7s',
            }}
          >
            <a href="#projects" className="hero-btn-primary">View my work</a>
            <a href="#contact" className="hero-btn-secondary">
              Get in touch
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M7 17L17 7M17 7H7M17 7v10" />
              </svg>
            </a>
          </div>
        </div>

        {/* Photo */}
        <div className="hero-visual"
          style={{
            transform: `translateY(${pPhoto}px)`,
            opacity: entered ? 1 : 0,
            transition: 'opacity 1s ease 0.4s',
          }}
        >
          <div className="hero-ring" />
          <div className="hero-image-frame">
            <div className="hero-deco-dot" />
            <div className="hero-deco-dot" />
            <Image src="/images/me.png" alt="Prisca Larisse" fill className="object-cover" priority />
            <div className="hero-image-overlay" />
            <div className="hero-image-badge">
              <div>
                <div className="hero-badge-name">Prisca Larisse</div>
                <div className="hero-badge-role">Software Developer</div>
              </div>
              <div className="hero-badge-icon">✦</div>
            </div>
          </div>
          <div className="hero-float-card">
            <div className="hero-float-label">Tech stack</div>
            <div className="hero-float-chips">
              {["React", "Next.js", "TypeScript"].map(t => (
                <span key={t} className="hero-float-chip">{t}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="hero-bottom"
        style={{
          opacity: entered ? 1 : 0,
          transition: 'opacity 0.8s ease 0.9s',
        }}
      >
        <div className="hero-scroll">
          <span className="hero-scroll-line" />
          <span className="hero-scroll-text">Scroll to explore</span>
        </div>
        <div className="hero-stats">
          {[['3+','Years'],['12+','Projects'],['100%','Committed']].map(([n,l], i) => (
            <>
              {i > 0 && <div key={`sep-${i}`} className="hero-stat-sep" />}
              <div key={n} className="hero-stat-item">
                <div className="hero-stat-number">{n}</div>
                <div className="hero-stat-label">{l}</div>
              </div>
            </>
          ))}
        </div>
      </div>
    </section>
  );
}
