"use client";
import Link from 'next/link';
import { useScrollReveal } from './useScrollReveal';

export default function ContactFooterPage() {
  const [headerRef, headerVisible] = useScrollReveal<HTMLDivElement>();
  const [formRef, formVisible] = useScrollReveal<HTMLFormElement>({ threshold: 0.1 });
  const [infoRef, infoVisible] = useScrollReveal<HTMLDivElement>({ threshold: 0.1 });
  const [footerRef, footerVisible] = useScrollReveal<HTMLElement>({ threshold: 0.1 });

  return (
    <>
      <section id="contact" className="contact-section">
        <div className="contact-inner">

          {/* Header — clip reveal */}
          <div
            ref={headerRef}
            className="contact-header"
            style={{
              opacity: headerVisible ? 1 : 0,
              transform: headerVisible ? 'translateY(0)' : 'translateY(40px)',
              transition: 'opacity 0.8s ease, transform 0.8s cubic-bezier(0.25,1,0.5,1)',
            }}
          >
            <div className="section-label">
              <span className="section-label-line" />
              <span className="section-label-text">Get in touch</span>
            </div>
            <h2 className="section-heading">Let&apos;s work <em>together</em></h2>
            <p className="contact-headline">&ldquo;Not a quitter — just a doer.&rdquo;</p>
          </div>

          <div className="contact-grid">

            {/* Form — slide from left */}
            <form
              ref={formRef}
              onSubmit={(e) => e.preventDefault()}
              style={{
                opacity: formVisible ? 1 : 0,
                transform: formVisible ? 'translateX(0)' : 'translateX(-48px)',
                transition: 'opacity 0.8s ease 0.15s, transform 0.8s cubic-bezier(0.25,1,0.5,1) 0.15s',
              }}
            >
              <p className="contact-form-heading">Tell me about your project</p>

              {[
                { id: 'cf-name',    label: 'Full Name',      type: 'text',  ph: 'Your name',               required: true  },
                { id: 'cf-email',   label: 'Email Address',  type: 'email', ph: 'you@example.com',          required: true  },
                { id: 'cf-company', label: 'Company',        type: 'text',  ph: 'Your company (optional)',  required: false },
                { id: 'cf-budget',  label: 'Budget Range',   type: 'text',  ph: 'e.g. $2,000 — $5,000',    required: false },
              ].map((f, i) => (
                <div
                  key={f.id}
                  className="form-field"
                  style={{
                    opacity: formVisible ? 1 : 0,
                    transform: formVisible ? 'translateY(0)' : 'translateY(16px)',
                    transition: `opacity 0.6s ease ${0.2 + i * 0.08}s, transform 0.6s ease ${0.2 + i * 0.08}s`,
                  }}
                >
                  <label htmlFor={f.id}>{f.label}</label>
                  <input type={f.type} id={f.id} placeholder={f.ph} required={f.required} />
                </div>
              ))}

              <div
                className="form-field"
                style={{
                  opacity: formVisible ? 1 : 0,
                  transform: formVisible ? 'translateY(0)' : 'translateY(16px)',
                  transition: 'opacity 0.6s ease 0.56s, transform 0.6s ease 0.56s',
                }}
              >
                <label htmlFor="cf-message">Message</label>
                <textarea id="cf-message" rows={4}
                  placeholder="Describe your project or idea…" required />
              </div>

              <button
                type="submit"
                className="contact-submit"
                style={{
                  opacity: formVisible ? 1 : 0,
                  transform: formVisible ? 'translateY(0)' : 'translateY(16px)',
                  transition: 'opacity 0.6s ease 0.64s, transform 0.6s ease 0.64s',
                }}
              >
                Send Message
              </button>
            </form>

            {/* Info — slide from right */}
            <div
              ref={infoRef}
              className="contact-info"
              style={{
                opacity: infoVisible ? 1 : 0,
                transform: infoVisible ? 'translateX(0)' : 'translateX(48px)',
                transition: 'opacity 0.8s ease 0.25s, transform 0.8s cubic-bezier(0.25,1,0.5,1) 0.25s',
              }}
            >
              {[
                { label: 'Email',         value: 'iyonezalarissaprisca@gmail.com' },
                { label: 'Based in',      value: 'Africa' },
                { label: 'Availability',  value: 'Open to freelance & full-time roles' },
                { label: 'Response time', value: 'Within 24 hours' },
              ].map((item, i) => (
                <div key={item.label} style={{ display: 'contents' }}>
                  <div
                    className="contact-info-item"
                    style={{
                      opacity: infoVisible ? 1 : 0,
                      transform: infoVisible ? 'translateX(0)' : 'translateX(24px)',
                      transition: `opacity 0.6s ease ${0.3 + i * 0.1}s, transform 0.6s ease ${0.3 + i * 0.1}s`,
                    }}
                  >
                    <span className="contact-info-label">{item.label}</span>
                    <span className="contact-info-value">{item.value}</span>
                  </div>
                  {i < 3 && <div className="contact-info-divider" />}
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        ref={footerRef}
        className="footer"
        style={{
          opacity: footerVisible ? 1 : 0,
          transform: footerVisible ? 'translateY(0)' : 'translateY(32px)',
          transition: 'opacity 0.8s ease, transform 0.8s cubic-bezier(0.25,1,0.5,1)',
        }}
      >
        <div className="footer-top">
          <div className="footer-brand">
            <div className="footer-logo"><span>P</span>risca Larisse</div>
            <p className="footer-tagline">Software developer crafting purposeful digital experiences.</p>
          </div>

          <div>
            <p className="footer-nav-title">Navigation</p>
            <ul className="footer-nav-links">
              <li><Link href="/">Home</Link></li>
              <li><Link href="#skills">Skills</Link></li>
              <li><Link href="#projects">Projects</Link></li>
              <li><Link href="#experience">Experience</Link></li>
              <li><Link href="#contact">Contact</Link></li>
            </ul>
          </div>

          <div>
            <p className="footer-nav-title">Find me on</p>
            <div className="footer-socials">
              <a href="mailto:iyonezalarissaprisca@gmail.com" className="social-pill">✉ Email</a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="social-pill">in LinkedIn</a>
              <a href="https://github.com" target="_blank" rel="noreferrer" className="social-pill">⌥ GitHub</a>
            </div>
          </div>
        </div>

        <div className="footer-divider" />

        <div className="footer-bottom">
          <p className="footer-copy">© 2026 <span>Prisca Larisse</span>. All rights reserved.</p>
          <p className="footer-copy">Built with <span>Next.js</span> &amp; care.</p>
        </div>
      </footer>
    </>
  );
}
