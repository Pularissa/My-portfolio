"use client";
import React from 'react';

export default function ContactFooterPage() {
  return (
    <div className="contact-page">
      {/* 1. Main Headline */}
      <h1 className="contact-headline">“Not a quitter just a doer”</h1>

      {/* 2. Central Main Interface Box */}
      <div className="contact-card">
        <div className="contact-grid">
          
          {/* Form Side */}
          <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
            <h3>What is your deal</h3>
            
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input type="text" id="name" required />
            </div>

            <div className="form-group">
              <label htmlFor="company">Company</label>
              <input type="text" id="company" />
            </div>

            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input type="text" id="description" required />
            </div>

            <div className="form-group">
              <label htmlFor="budget">Budget</label>
              <input type="text" id="budget" />
            </div>
          </form>

          {/* Device Mockup Graphic Side */}
          <div className="mockup-showcase">
            {/* Replace src with your uploaded composite or images map assets */}
            <img 
              src="../public/images/me.png" 
              alt="Prisca Larisse Portfolio Devices" 
              className="mockup-placeholder"
            />
          </div>
        </div>

        {/* Big Connect Solid Action CTA */}
        <button type="submit" className="connect-btn">Connect</button>
      </div>

      {/* 3. Footer Links Container */}
      <footer className="footer-section">
        {/* Giant Watermark background text element */}
        <div className="footer-watermark">Find me on</div>

        {/* Interactive Overlay Layer Grid Buttons */}
        <div className="social-links-row">
          <a href="mailto:your-email@example.com" className="social-pill">
            <span className="social-icon">✉</span> Email
          </a>
          
          <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="social-pill">
            <span className="social-icon">Linked</span> Linkedin
          </a>

          <a href="https://github.com" target="_blank" rel="noreferrer" className="social-pill">
            <span className="social-icon">Git</span> Github
          </a>

          <a href="#" className="social-pill">
            <span className="social-icon">cu</span> Course Networking
          </a>
        </div>

        {/* Lower System Metadata Credits Info */}
        <div className="copyright-bar">
          @copyright| portfolii.com | Made with unity
        </div>
      </footer>
    </div>
  );
}