"use client";
import React from 'react';
import Link from 'next/link';

export default function ContactFooterPage() {
  return (
    <>
      {/* ── Contact ── */}
      <section id="contact" className="contact-section">
        <div className="contact-inner">

          <div className="contact-header">
            <div className="section-label">
              <span className="section-label-line" />
              <span className="section-label-text">Get in touch</span>
            </div>
            <h2 className="section-heading">
              Let&apos;s work <em>together</em>
            </h2>
            <p className="contact-headline">&ldquo;Not a quitter — just a doer.&rdquo;</p>
          </div>

          <div className="contact-grid">

            {/* Form */}
            <form onSubmit={(e) => e.preventDefault()}>
              <p className="contact-form-heading">Tell me about your project</p>

              <div className="form-field">
                <label htmlFor="cf-name">Full Name</label>
                <input type="text" id="cf-name" placeholder="Your name" required />
              </div>

              <div className="form-field">
                <label htmlFor="cf-email">Email Address</label>
                <input type="email" id="cf-email" placeholder="you@example.com" required />
              </div>

              <div className="form-field">
                <label htmlFor="cf-company">Company</label>
                <input type="text" id="cf-company" placeholder="Your company (optional)" />
              </div>

              <div className="form-field">
                <label htmlFor="cf-message">Message</label>
                <textarea id="cf-message" rows={4}
                  placeholder="Describe your project or idea…" required />
              </div>

              <div className="form-field">
                <label htmlFor="cf-budget">Budget Range</label>
                <input type="text" id="cf-budget" placeholder="e.g. $2,000 — $5,000" />
              </div>

              <button type="submit" className="contact-submit">Send Message</button>
            </form>

            {/* Info panel */}
            <div className="contact-info">
              <div className="contact-info-item">
                <span className="contact-info-label">Email</span>
                <span className="contact-info-value">iyonezalarissaprisca@gmail.com</span>
              </div>
              <div className="contact-info-divider" />
              <div className="contact-info-item">
                <span className="contact-info-label">Based in</span>
                <span className="contact-info-value">Africa</span>
              </div>
              <div className="contact-info-divider" />
              <div className="contact-info-item">
                <span className="contact-info-label">Availability</span>
                <span className="contact-info-value">Open to freelance & full-time roles</span>
              </div>
              <div className="contact-info-divider" />
              <div className="contact-info-item">
                <span className="contact-info-label">Response time</span>
                <span className="contact-info-value">Within 24 hours</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="footer">
        <div className="footer-top">

          <div className="footer-brand">
            <div className="footer-logo"><span>P</span>risca Larissa</div>
            <p className="footer-tagline">
              Software developer crafting purposeful digital experiences.
            </p>
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
              <a href="mailto:iyonezalarissaprisca@gmail.com" className="social-pill">
                ✉ Email
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer"
                className="social-pill">in LinkedIn</a>
              <a href="https://github.com" target="_blank" rel="noreferrer"
                className="social-pill">⌥ GitHub</a>
            </div>
          </div>

        </div>

        <div className="footer-divider" />

        <div className="footer-bottom">
          <p className="footer-copy">
            © 2026 <span>Prisca Larissa</span>. All rights reserved.
          </p>
          <p className="footer-copy">
            Built with <span>Next.js</span> & care.
          </p>
        </div>
      </footer>
    </>
  );
}
