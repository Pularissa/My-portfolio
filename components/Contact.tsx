"use client";
import Link from 'next/link';
import Image from 'next/image';
import { useScrollReveal } from './useScrollReveal';

const formFields = [
  { id: 'cf-name',    label: 'Full Name',     type: 'text',  ph: 'Your name',              required: true  },
  { id: 'cf-email',   label: 'Email Address', type: 'email', ph: 'you@example.com',         required: true  },
  { id: 'cf-org',     label: 'Organisation',  type: 'text',  ph: 'Company, university, NGO…', required: false },
  { id: 'cf-subject', label: 'Subject',       type: 'text',  ph: 'Internship, collaboration, project…', required: true  },
];

const infoItems = [
  { label: 'Email',        value: 'iyonezalarissaprisca@gmail.com' },
  { label: 'Based in',     value: 'Rwanda, Africa' },
  { label: 'Looking for',  value: 'Internships · Grad programmes · Collaboration' },
  { label: 'Response time',value: 'Within 24 hours' },
];

export default function ContactFooterPage() {
  const [headerRef,  headerVisible]  = useScrollReveal<HTMLDivElement>();
  const [formRef,    formVisible]    = useScrollReveal<HTMLFormElement>({ threshold: 0.1 });
  const [infoRef,    infoVisible]    = useScrollReveal<HTMLDivElement>({ threshold: 0.1 });
  const [footerRef,  footerVisible]  = useScrollReveal<HTMLElement>({ threshold: 0.1 });

  return (
    <>
      <section id="contact" className="contact-section">
        <div className="contact-inner">

          {/* Header */}
          <div ref={headerRef} className="contact-header" style={{
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? 'translateY(0)' : 'translateY(40px)',
            transition: 'opacity 0.8s ease, transform 0.8s cubic-bezier(0.25,1,0.5,1)',
          }}>
            <div className="section-label">
              <span className="section-label-line" />
              <span className="section-label-text">Get in touch</span>
            </div>
            <h2 className="section-heading">Let&apos;s <em>connect</em></h2>
            <p className="contact-headline">
              &ldquo;Not a quitter — just a doer.&rdquo;
            </p>
          </div>

          <div className="contact-grid">

            {/* Form */}
            <form ref={formRef} onSubmit={e => e.preventDefault()} style={{
              opacity: formVisible ? 1 : 0,
              transform: formVisible ? 'translateX(0)' : 'translateX(-48px)',
              transition: 'opacity 0.8s ease 0.15s, transform 0.8s cubic-bezier(0.25,1,0.5,1) 0.15s',
            }}>
              <p className="contact-form-heading">Reach out — I&apos;d love to hear from you</p>

              {formFields.map((f, i) => (
                <div key={f.id} className="form-field" style={{
                  opacity: formVisible ? 1 : 0,
                  transform: formVisible ? 'translateY(0)' : 'translateY(16px)',
                  transition: `opacity 0.6s ease ${0.2 + i * 0.08}s, transform 0.6s ease ${0.2 + i * 0.08}s`,
                }}>
                  <label htmlFor={f.id}>{f.label}</label>
                  <input type={f.type} id={f.id} placeholder={f.ph} required={f.required} />
                </div>
              ))}

              <div className="form-field" style={{
                opacity: formVisible ? 1 : 0,
                transform: formVisible ? 'translateY(0)' : 'translateY(16px)',
                transition: 'opacity 0.6s ease 0.52s, transform 0.6s ease 0.52s',
              }}>
                <label htmlFor="cf-message">Message</label>
                <textarea id="cf-message" rows={5}
                  placeholder="Tell me about an internship, collaboration, or project opportunity…"
                  required />
              </div>

              <button type="submit" className="contact-submit" style={{
                opacity: formVisible ? 1 : 0,
                transform: formVisible ? 'translateY(0)' : 'translateY(16px)',
                transition: 'opacity 0.6s ease 0.6s, transform 0.6s ease 0.6s',
              }}>
                Send Message
              </button>
            </form>

            {/* Info panel */}
            <div ref={infoRef} className="contact-info" style={{
              opacity: infoVisible ? 1 : 0,
              transform: infoVisible ? 'translateX(0)' : 'translateX(48px)',
              transition: 'opacity 0.8s ease 0.25s, transform 0.8s cubic-bezier(0.25,1,0.5,1) 0.25s',
            }}>
              {infoItems.map((item, i) => (
                <div key={item.label} style={{ display: 'contents' }}>
                  <div className="contact-info-item" style={{
                    opacity: infoVisible ? 1 : 0,
                    transform: infoVisible ? 'translateX(0)' : 'translateX(24px)',
                    transition: `opacity 0.6s ease ${0.3 + i * 0.1}s, transform 0.6s ease ${0.3 + i * 0.1}s`,
                  }}>
                    <span className="contact-info-label">{item.label}</span>
                    <span className="contact-info-value">{item.value}</span>
                  </div>
                  {i < infoItems.length - 1 && <div className="contact-info-divider" />}
                </div>
              ))}

              {/* Availability callout */}
              <div style={{
                marginTop: '8px', padding: '18px 20px',
                background: 'var(--gold-faint)', border: '1px solid var(--gold-dim)',
                borderRadius: 'var(--radius-md)',
                opacity: infoVisible ? 1 : 0,
                transition: 'opacity 0.7s ease 0.7s',
              }}>
                <div style={{
                  fontSize: '0.62rem', letterSpacing: '0.18em', textTransform: 'uppercase',
                  color: 'var(--gold)', fontWeight: 600, marginBottom: '8px',
                }}>
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

      {/* Footer */}
      <footer ref={footerRef} className="footer" style={{
        opacity: footerVisible ? 1 : 0,
        transform: footerVisible ? 'translateY(0)' : 'translateY(32px)',
        transition: 'opacity 0.8s ease, transform 0.8s cubic-bezier(0.25,1,0.5,1)',
      }}>
        <div className="footer-top">
          <div className="footer-brand">
            <div className="footer-logo">
              <Image src="/images/logo.png" alt="PL Logo" width={44} height={44}
                style={{ objectFit: 'contain', borderRadius: '50%', filter: 'drop-shadow(0 0 6px rgba(201,169,110,0.3))' }} />
            </div>
            <p style={{ marginTop: '4px', fontFamily: 'var(--font-serif)', fontSize: '1rem', color: 'var(--white)', letterSpacing: '0.04em' }}>Prisca Larisse</p>
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
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="social-pill">in LinkedIn</a>
              <a href="https://github.com" target="_blank" rel="noreferrer" className="social-pill">⌥ GitHub</a>
            </div>
          </div>
        </div>

        <div className="footer-divider" />

        <div className="footer-bottom">
          <p className="footer-copy">© 2026 <span>Prisca Larisse</span>. All rights reserved.</p>
          <p className="footer-copy">🎓 Rwanda Coding Academy · Built with <span>Next.js</span></p>
        </div>
      </footer>
    </>
  );
}
