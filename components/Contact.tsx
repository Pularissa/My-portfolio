"use client";
import Link from 'next/link';
import Image from 'next/image';

const formFields = [
  { id: 'cf-name',    label: 'Full Name',     type: 'text',  ph: 'Your name',                           required: true  },
  { id: 'cf-email',   label: 'Email Address', type: 'email', ph: 'you@example.com',                     required: true  },
  { id: 'cf-org',     label: 'Organisation',  type: 'text',  ph: 'Company, university, NGO…',           required: false },
  { id: 'cf-subject', label: 'Subject',       type: 'text',  ph: 'Internship, collaboration, project…', required: true  },
];

const infoItems = [
  { label: 'Email',         value: 'iyonezalarissaprisca@gmail.com' },
  { label: 'Based in',      value: 'Rwanda, Africa' },
  { label: 'Looking for',   value: 'Internships · Grad programmes · Collaboration' },
  { label: 'Response time', value: 'Within 24 hours' },
];

export default function ContactFooterPage() {
  return (
    <>
      <section id="contact" className="contact-section">
        <div className="contact-inner">

          {/* #1 Fade up header */}
          <div className="contact-header reveal">
            <div className="section-label">
              <span className="section-label-line" />
              <span className="section-label-text">Get in touch</span>
            </div>
            <div className="clip-wrap">
              <h2 className="section-heading reveal-clip">Let&apos;s <em>connect</em></h2>
            </div>
            <p className="contact-headline">&ldquo;Not a quitter — just a doer.&rdquo;</p>
          </div>

          <div className="contact-grid">

            {/* #5 Slide from left */}
            <form onSubmit={e => e.preventDefault()} className="reveal-left" style={{ transitionDelay: '100ms' }}>
              <p className="contact-form-heading">Reach out — I&apos;d love to hear from you</p>
              {formFields.map(f => (
                <div key={f.id} className="form-field">
                  <label htmlFor={f.id}>{f.label}</label>
                  <input type={f.type} id={f.id} placeholder={f.ph} required={f.required} />
                </div>
              ))}
              <div className="form-field">
                <label htmlFor="cf-message">Message</label>
                <textarea id="cf-message" rows={5}
                  placeholder="Tell me about an internship, collaboration, or project opportunity…"
                  required />
              </div>
              <button type="submit" className="contact-submit">Send Message</button>
            </form>

            {/* #5 Slide from right */}
            <div className="contact-info reveal-right" style={{ transitionDelay: '200ms' }}>
              {infoItems.map((item, i) => (
                <div key={item.label} style={{ display: 'contents' }}>
                  <div className="contact-info-item">
                    <span className="contact-info-label">{item.label}</span>
                    <span className="contact-info-value">{item.value}</span>
                  </div>
                  {i < infoItems.length - 1 && <div className="contact-info-divider" />}
                </div>
              ))}
              <div style={{
                marginTop: '8px', padding: '18px 20px',
                background: 'var(--gold-faint)', border: '1px solid var(--gold-dim)',
                borderRadius: 'var(--radius-md)',
              }}>
                <div style={{ fontSize: '0.62rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--gold)', fontWeight: 600, marginBottom: '8px' }}>
                  🎓 Currently
                </div>
                <p style={{ fontSize: '0.88rem', color: 'var(--white-dim)', lineHeight: 1.65 }}>
                  Student at <strong style={{ color: 'var(--white)' }}>Rwanda Coding Academy</strong> —
                  open to internships, graduate programmes, and meaningful collaborative projects.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* #1 Fade up footer */}
      <footer className="footer reveal">
        <div className="footer-top">
          <div className="footer-brand">
            <div className="footer-logo">
              <Image src="/images/logo.png" alt="PL Logo" width={44} height={44}
                style={{ objectFit: 'contain', borderRadius: '50%', filter: 'drop-shadow(0 0 6px rgba(201,169,110,0.3))' }} />
            </div>
            <p style={{ marginTop: '4px', fontFamily: 'var(--font-serif)', fontSize: '1rem', color: 'var(--white)', letterSpacing: '0.04em' }}>
              Prisca Larissa
            </p>
            <p className="footer-tagline">
              Software &amp; Embedded Systems student at RCA — building real things for real people.
            </p>
          </div>

          <div>
            <p className="footer-nav-title">Navigation</p>
            <ul className="footer-nav-links">
              <li><Link href="/">Home</Link></li>
              <li><Link href="#skills">Skills</Link></li>
              <li><Link href="#projects">Projects</Link></li>
              <li><Link href="#experience">Journey</Link></li>
              <li><Link href="#contact">Contact</Link></li>
            </ul>
          </div>

          <div>
            <p className="footer-nav-title">Find me on</p>
            <div className="footer-socials">
              <a href="mailto:iyonezalarissaprisca@gmail.com" className="social-pill">✉ Email</a>
              <a href="https://www.linkedin.com/in/larissa-prisca-18496a330/" target="_blank" rel="noreferrer" className="social-pill">in LinkedIn</a>
              <a href="https://github.com/Pularissa" target="_blank" rel="noreferrer" className="social-pill">⌥ GitHub</a>
            </div>
          </div>
        </div>

        <div className="footer-divider" />

        <div className="footer-bottom">
          <p className="footer-copy">© 2026 <span>Prisca Larissa</span>. All rights reserved.</p>
          <p className="footer-copy">🎓 Rwanda Coding Academy · Built with <span>Next.js</span></p>
        </div>
      </footer>
    </>
  );
}
