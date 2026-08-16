'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Sparkles } from 'lucide-react';

const words = ['Developer', 'Builder', 'Problem Solver', 'Student'];

export default function Hero() {
  const [wordIdx, setWordIdx]         = useState(0);
  const [wordVisible, setWordVisible] = useState(true);

  useEffect(() => {
    const iv = setInterval(() => {
      setWordVisible(false);
      setTimeout(() => { setWordIdx(i => (i + 1) % words.length); setWordVisible(true); }, 350);
    }, 2600);
    return () => clearInterval(iv);
  }, []);

  return (
    <section className="hero-section">
      <div className="hero-glow" />
      <div className="hero-corner hero-corner-tl" />
      <div className="hero-corner hero-corner-tr" />
      <div className="hero-corner hero-corner-bl" />

      <nav className="navbar">
        <div className="logo">
          <Image src="/images/logo.png" alt="Prisca Larissa Logo" width={52} height={52} className="logo-img" priority />
        </div>
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
        <div className="hero-text reveal-left">
          <div className="hero-eyebrow reveal" style={{ transitionDelay: '100ms' }}>
            <span className="hero-eyebrow-line" />
            <span className="hero-eyebrow-text">
              Software&nbsp;
              <span className="hero-eyebrow-word" style={{ opacity: wordVisible ? 1 : 0, transform: wordVisible ? 'translateY(0)' : 'translateY(6px)', transition: 'opacity 0.3s ease, transform 0.3s ease' }}>
                {words[wordIdx]}
              </span>
            </span>
          </div>

          <div className="clip-wrap">
            <h1 className="hero-name reveal-clip">
            <span className="hero-name-first">Prisca</span>
            <em className="hero-name-last">Larissa.</em>
            </h1>
          </div>

          <p className="hero-tagline reveal" style={{ transitionDelay: '200ms' }}>
            Software Programming &amp; Embedded Systems student at Rwanda Coding Academy — building real solutions for real problems across web, mobile, and hardware.
          </p>

          <div className="hero-available reveal" style={{ transitionDelay: '300ms' }}>
            <span className="hero-available-dot" />
            Open to internships &amp; collaborative opportunities
          </div>

          <div className="hero-actions reveal" style={{ transitionDelay: '400ms' }}>
            <a href="#projects" className="hero-btn-primary">View my projects</a>
            <a href="#contact" className="hero-btn-secondary">
              Get in touch
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M7 17L17 7M17 7H7M17 7v10" />
              </svg>
            </a>
          </div>
        </div>

        {/* #8 Blur reveal + #9 rotation on float card */}
        <div className="hero-visual reveal-right">
          <div className="hero-ring" />
          <div className="hero-image-frame reveal-blur" style={{ transitionDelay: '100ms' }}>
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
          </div>
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

      {/* Stats stagger reveal */}
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
    </section>
  );
}
