'use client';
import { useScrollReveal } from './useScrollReveal';

const testimonials = [
  {
    id: 1,
    name: "Sarah Müller",
    role: "Product Lead, KW Enterprise",
    initials: "SM",
    text: "Prisca delivered far beyond expectations. Her ability to translate complex requirements into a beautiful, intuitive interface is genuinely rare.",
    stars: 5,
  },
  {
    id: 2,
    name: "Daniel Osei",
    role: "CTO, LogiTech Solutions",
    initials: "DO",
    text: "Working with Prisca was a pleasure. She communicates clearly, writes clean maintainable code, and always ships on time. Highly recommend.",
    stars: 5,
  },
  {
    id: 3,
    name: "Amara Diallo",
    role: "Co-founder, EduBridge",
    initials: "AD",
    text: "Prisca built our entire front-end from scratch. The result is polished, accessible, and fast — plus she brought great UX ideas that improved the product.",
    stars: 5,
  },
];

function TestimonialCard({
  item,
  index,
}: {
  item: (typeof testimonials)[0];
  index: number;
}) {
  const [ref, visible] = useScrollReveal<HTMLDivElement>({ threshold: 0.15 });

  return (
    <div
      ref={ref}
      className="testimonial-card"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0) scale(1)' : 'translateY(50px) scale(0.96)',
        transition: `opacity 0.7s ease ${index * 140}ms, transform 0.7s cubic-bezier(0.25,1,0.5,1) ${index * 140}ms`,
      }}
    >
      <div className="testimonial-avatar">{item.initials}</div>
      <div className="testimonial-name">{item.name}</div>
      <div className="testimonial-role">{item.role}</div>
      <div className="testimonial-divider" />
      <p className="testimonial-text">&ldquo;{item.text}&rdquo;</p>
      <div className="testimonial-stars">
        {Array.from({ length: item.stars }).map((_, i) => (
          <span
            key={i}
            style={{
              opacity: visible ? 1 : 0,
              transition: `opacity 0.4s ease ${index * 140 + 300 + i * 60}ms`,
            }}
          >★</span>
        ))}
      </div>
    </div>
  );
}

export default function Testimonials() {
  const [headerRef, headerVisible] = useScrollReveal<HTMLDivElement>();

  return (
    <section className="testimonials-section">
      <div className="testimonials-inner">

        <div
          ref={headerRef}
          className="testimonials-header"
          style={{
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? 'translateY(0)' : 'translateY(32px)',
            transition: 'opacity 0.8s ease, transform 0.8s cubic-bezier(0.25,1,0.5,1)',
          }}
        >
          <div className="section-label">
            <span className="section-label-line" />
            <span className="section-label-text">Testimonials</span>
          </div>
          <h2 className="section-heading">What people <em>say</em></h2>
        </div>

        <div className="testimonials-grid">
          {testimonials.map((item, i) => (
            <TestimonialCard key={item.id} item={item} index={i} />
          ))}
        </div>

      </div>
    </section>
  );
}
