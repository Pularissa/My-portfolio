import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="hero-section">
      <div className="hero-glow" />

      {/* ── Navbar ── */}
      <nav className="navbar">
        <div className="logo">
          <span>P</span>risca
        </div>

        <ul className="nav-links">
          <li><Link href="/">Home</Link></li>
          <li><Link href="#skills">Skills</Link></li>
          <li><Link href="#projects">Projects</Link></li>
          <li><Link href="#experience">Experience</Link></li>
          <li><Link href="#contact">Contact</Link></li>
        </ul>

        <a href="#contact" className="nav-cta">Let&apos;s talk</a>
      </nav>

      {/* ── Hero Body ── */}
      <div className="hero-body">

        {/* Left — Text */}
        <div className="hero-text">
          <div className="hero-eyebrow">
            <span className="hero-eyebrow-line" />
            <span className="hero-eyebrow-text">Software Developer</span>
          </div>

          <h1 className="hero-name">
            Prisca
            <em>Larissa.</em>
          </h1>

          <p className="hero-tagline">
            I craft thoughtful digital experiences — from elegant interfaces
            to robust, scalable systems. Every line of code is purposeful.
          </p>

          <div className="hero-actions">
            <a href="#projects" className="hero-btn-primary">View my work</a>
            <a href="#contact" className="hero-btn-secondary">
              Get in touch
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M7 17L17 7M17 7H7M17 7v10" />
              </svg>
            </a>
          </div>
        </div>

        {/* Right — Photo */}
        <div className="hero-visual">
          <div className="hero-image-frame">
            <div className="hero-deco-dot" />
            <div className="hero-deco-dot" />
            <Image
              src="/images/me.png"
              alt="Prisca Larissa"
              fill
              className="object-cover"
              priority
            />
            <div className="hero-image-overlay" />
            <div className="hero-image-badge">
              <div>
                <div className="hero-badge-name">Prisca Larissa</div>
                <div className="hero-badge-role">Software Developer</div>
              </div>
              <div style={{ color: "#c9a96e", fontSize: "1.3rem" }}>✦</div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <div className="hero-scroll">
        <span className="hero-scroll-line" />
        <span className="hero-scroll-text">Scroll to explore</span>
      </div>

      {/* ── Stats ── */}
      <div className="hero-stats">
        <div className="hero-stat-item">
          <div className="hero-stat-number">3+</div>
          <div className="hero-stat-label">Years exp.</div>
        </div>
        <div className="hero-stat-item">
          <div className="hero-stat-number">12+</div>
          <div className="hero-stat-label">Projects</div>
        </div>
      </div>
    </section>
  );
}
