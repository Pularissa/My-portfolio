import React from 'react';

const testimonials = [
  {
    id: 1,
    name: "Sarah Müller",
    role: "Product Lead, KW Enterprise",
    initials: "SM",
    text: "Prisca delivered far beyond expectations. Her ability to translate complex requirements into a beautiful, intuitive interface is genuinely rare. The team was blown away.",
    stars: 5,
  },
  {
    id: 2,
    name: "Daniel Osei",
    role: "CTO, LogiTech Solutions",
    initials: "DO",
    text: "Working with Prisca was a pleasure from start to finish. She communicates clearly, writes clean maintainable code, and always ships on time. Highly recommend.",
    stars: 5,
  },
  {
    id: 3,
    name: "Amara Diallo",
    role: "Co-founder, EduBridge",
    initials: "AD",
    text: "Prisca built our entire front-end from scratch. The result is polished, accessible, and fast. She also brought thoughtful UX suggestions that improved the product greatly.",
    stars: 5,
  },
];

export default function Testimonials() {
  return (
    <section className="testimonials-section">
      <div className="testimonials-inner">

        {/* Header */}
        <div className="testimonials-header">
          <div className="section-label">
            <span className="section-label-line" />
            <span className="section-label-text">Testimonials</span>
          </div>
          <h2 className="section-heading">
            What people <em>say</em>
          </h2>
        </div>

        {/* Grid */}
        <div className="testimonials-grid">
          {testimonials.map((item) => (
            <div key={item.id} className="testimonial-card">
              <div className="testimonial-avatar">{item.initials}</div>
              <div className="testimonial-name">{item.name}</div>
              <div className="testimonial-role">{item.role}</div>
              <div className="testimonial-divider" />
              <p className="testimonial-text">&ldquo;{item.text}&rdquo;</p>
              <div className="testimonial-stars">
                {Array.from({ length: item.stars }).map((_, i) => (
                  <span key={i}>★</span>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
