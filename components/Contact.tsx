"use client";
import Link from 'next/link';
import Image from 'next/image';
import { Mail, GraduationCap } from 'lucide-react';
import { FaInstagram, FaLinkedin, FaGithub, FaTwitter } from 'react-icons/fa';

const formFields = [
  { id: 'cf-name', name: 'name', label: 'Name', type: 'text', ph: 'Name', required: true },
  { id: 'cf-org', name: 'org', label: 'Company', type: 'text', ph: 'Company', required: false },
  { id: 'cf-message', name: 'message', label: 'Description', type: 'text', ph: 'Description', required: true },
  { id: 'cf-budget', name: 'budget', label: 'Budget', type: 'text', ph: 'Budget', required: false },
];

export default function ContactFooterPage() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const company = formData.get('org') as string;
    const message = formData.get('message') as string;
    const budget = formData.get('budget') as string;

    const mailtoLink = `mailto:iyonezalarissaprisca@gmail.com?subject=New Contact from ${name}&body=${encodeURIComponent(`Name: ${name}\nCompany: ${company}\nBudget: ${budget}\n\nDescription:\n${message}`)}`;
    window.location.href = mailtoLink;

    (e.target as HTMLFormElement).reset();
  };

  return (
    <>
      <section id="contact" className="contact-section">
        <div className="contact-inner">

          <div className="contact-header reveal">
            <h2 className="contact-headline">"Not a quitter just a doer"</h2>
          </div>

          <div className="contact-card reveal">
            <div className="contact-form-side">
              <h3 className="contact-form-heading">What's your deal</h3>

              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                <div style={{ flex: 1 }}>
                  {formFields.map(f => (
                    <div key={f.id} className="form-field">
                      <label htmlFor={f.id}>{f.label}</label>
                      <input type={f.type} id={f.id} name={f.name} placeholder={f.label} required={f.required} />
                    </div>
                  ))}
                </div>

                <button type="submit" className="contact-submit">Connect</button>
              </form>
            </div>

            <div className="contact-image-side">
              <Image
                src="/images/port.png"
                alt="Mockup Placeholder"
                fill
                style={{ objectFit: 'cover', opacity: 0.8 }}
              />
            </div>
          </div>

          <div className="contact-socials-row reveal">
            <a href="mailto:iyonezalarissaprisca@gmail.com" className="social-pill-btn">
              <Mail size={14} /> Email
            </a>
            <a href="https://www.linkedin.com/in/larissa-prisca-18496a330/" target="_blank" rel="noreferrer" className="social-pill-btn">
              <FaLinkedin size={14} /> LinkedIn
            </a>
            <a href="https://github.com/Pularissa" target="_blank" rel="noreferrer" className="social-pill-btn">
              <FaGithub size={14} /> Github
            </a>
            <a href="https://www.thecn.com/PL762" className="social-pill-btn">
              <GraduationCap size={14} /> CN
            </a>
            <a href="#" className="social-pill-btn">
              <FaTwitter size={14} /> Twitter
            </a>
            <a href="https://www.instagram.com/p.u_l.a/" className="social-pill-btn">
              <FaInstagram size={14} /> Instagram
            </a>
          </div>

          <div className="footer-bottom">
            <p className="footer-copy">@copyright| portfolii.com|</p>
            <p className="footer-copy">Made with unity</p>
          </div>

        </div>

        <div className="find-me-bg">Find me on</div>
      </section>
    </>
  );
}
