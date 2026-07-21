"use client";
import Link from 'next/link';
import Image from 'next/image';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const formFields = [
  { id: 'cf-name',    label: 'Full Name',     type: 'text',  ph: 'Your name',                          required: true  },
  { id: 'cf-email',   label: 'Email Address', type: 'email', ph: 'you@example.com',                    required: true  },
  { id: 'cf-org',     label: 'Organisation',  type: 'text',  ph: 'Company, university, NGO…',          required: false },
  { id: 'cf-subject', label: 'Subject',       type: 'text',  ph: 'Internship, collaboration, project…',required: true  },
];

const infoItems = [
  { label: 'Email',         value: 'iyonezalarissaprisca@gmail.com' },
  { label: 'Based in',      value: 'Rwanda, Africa' },
  { label: 'Looking for',   value: 'Internships · Grad programmes · Collaboration' },
  { label: 'Response time', value: 'Within 24 hours' },
];

export default function ContactFooterPage() {
  const headerRef  = useRef(null);
  const formRef    = useRef(null);
  const infoRef    = useRef(null);
  const footerRef  = useRef(null);

  const headerInView  = useInView(headerRef,  { once: true, margin: '-60px' });
  const formInView    = useInView(formRef,    { once: true, margin: '-60px' });
  const infoInView    = useInView(infoRef,    { once: true, margin: '-60px' });
  const footerInView  = useInView(footerRef,  { once: true, margin: '-60px' });

  return (
    <>
      {/* ── Contact Section ── */}
      <section id="contact" className="contact-section">
        <div className="contact-inner">

          {/* Header — Down #1 fade up */}
          <motion.div
            ref={headerRef}
            className="contact-header"
            initial={{ opacity: 0, y: 44 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="section-label">
              <span className="section-label-line" />
              <span className="section-label-text">Get in touch</span>
            </div>
            <h2 className="section-heading">Let&apos;s <em>connect</em></h2>
            <p className="contact-headline">&ldquo;Not a quitter — just a doer.&rdquo;</p>
          </motion.div>

          <div className="contact-grid">

            {/* Form — Down #5 slide from left */}
            <motion.form
              ref={formRef}
              onSubmit={e => e.preventDefault()}
              initial={{ opacity: 0, x: -60 }}
              animate={formInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="contact-form-heading">Reach out — I&apos;d love to hear from you</p>

              {formFields.map((f, i) => (
                <motion.div
                  key={f.id}
                  className="form-field"
                  initial={{ opacity: 0, y: 18 }}
                  animate={formInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.1 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                >
                  <label htmlFor={f.id}>{f.label}</label>
                  <input type={f.type} id={f.id} placeholder={f.ph} required={f.required} />
                </motion.div>
              ))}

              <motion.div
                className="form-field"
                initial={{ opacity: 0, y: 18 }}
                animate={formInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <label htmlFor="cf-message">Message</label>
                <textarea id="cf-message" rows={5}
                  placeholder="Tell me about an internship, collaboration, or project opportunity…"
                  required />
              </motion.div>

              <motion.button
                type="submit"
                className="contact-submit"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={formInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.62, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ scale: 1.02, backgroundColor: 'var(--gold)' }}
                whileTap={{ scale: 0.98 }}
              >
                Send Message
              </motion.button>
            </motion.form>

            {/* Info — Down #5 slide from right */}
            <motion.div
              ref={infoRef}
              className="contact-info"
              initial={{ opacity: 0, x: 60 }}
              animate={infoInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.85, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              {infoItems.map((item, i) => (
                <div key={item.label} style={{ display: 'contents' }}>
                  <motion.div
                    className="contact-info-item"
                    initial={{ opacity: 0, x: 24 }}
                    animate={infoInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.55, delay: 0.2 + i * 0.09, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <span className="contact-info-label">{item.label}</span>
                    <span className="contact-info-value">{item.value}</span>
                  </motion.div>
                  {i < infoItems.length - 1 && <div className="contact-info-divider" />}
                </div>
              ))}

              {/* Availability callout — Down #3 scale reveal */}
              <motion.div
                initial={{ opacity: 0, scale: 0.92 }}
                animate={infoInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.65, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  marginTop: '8px', padding: '18px 20px',
                  background: 'var(--gold-faint)', border: '1px solid var(--gold-dim)',
                  borderRadius: 'var(--radius-md)',
                }}
              >
                <div style={{ fontSize: '0.62rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--gold)', fontWeight: 600, marginBottom: '8px' }}>
                  🎓 Currently
                </div>
                <p style={{ fontSize: '0.88rem', color: 'var(--white-dim)', lineHeight: 1.65 }}>
                  Student at <strong style={{ color: 'var(--white)' }}>Rwanda Coding Academy</strong> —
                  open to internships, graduate programmes, and meaningful collaborative projects.
                </p>
              </motion.div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── Footer — Down #1 fade up ── */}
      <motion.footer
        ref={footerRef}
        className="footer"
        initial={{ opacity: 0, y: 40 }}
        animate={footerInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
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
      </motion.footer>
    </>
  );
}
