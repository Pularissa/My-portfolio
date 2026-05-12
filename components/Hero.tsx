import  Link  from "next/link";

export default function Hero() {
  return (
    <section className="hero-section">
      {/* Border */}

      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">Portfolio</div>

        <ul className="nav-links">
          <li><Link href="/">Home</Link></li>
          <li><Link href="/about">About me</Link></li>
          <li><Link href="/blog">Blog</Link></li>
          <li><Link href="/work">Work</Link></li>
          <li><Link href="/find-me">Find me on</Link></li>
        </ul>
      </nav>

      {/* Background Glow */}
      <div className="hero-glow"></div>

      {/* Decorative Lines */}
      <div className="line line1"></div>
      <div className="line line2"></div>
      <div className="line line3"></div>

      {/* Floating Balls */}
      <div className="ball ball1"></div>
      <div className="ball ball2"></div>

      {/* Hero Content */}
      <div className="hero-content">
        <h1>
          Hello, I am Prisca
          <br />
          Larisse
        </h1>

        <p>
          A committed and skilled software
          <br />
          developer
        </p>

        <button>Let&apos;s talk</button>
      </div>

      {/* Bottom Text */}
      <div className="bottom-about">
        <span className="dash"></span>
        <span>About me</span>
      </div>
    </section>
  );
}