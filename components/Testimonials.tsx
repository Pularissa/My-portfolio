'use client';
import { useScrollReveal } from './useScrollReveal';

// Honest section — peer recognition and project context rather than invented company reviews
const highlights = [
  {
    id: 1,
    initials: "RCA",
    name: "Rwanda Coding Academy",
    role: "Student · Software & Embedded Systems",
    text: "Enrolled in one of Rwanda's most rigorous technical programmes, studying software engineering and embedded systems, building 10+ real projects that solve community problems.",
    tag: "Education",
  },
  {
    id: 2,
    initials: "UL",
    name: "UmuhinziLink",
    role: "Founder & Lead Developer",
    text: "Built a full AgriTech platform from scratch — connecting Rwandan smallholder farmers directly to buyers, with AI-powered advice and digital payment integration.",
    tag: "Featured Project",
  },
  {
    id: 3,
    initials: "YNT",
    name: "Youth for National Transformation",
    role: "Frontend Developer · NGO Website",
    text: "Delivered a complete organisational website with multi-language support, membership registration, events management, and a donation system.",
    tag: "Civic Tech",
  },
];

function HighlightCard({ item, index }: { item: typeof highlights[0]; index: number }) {
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
      <div style={{
        display: 'inline-block', marginBottom: '20px',
        padding: '3px 12px',
        background: 'var(--gold-faint)',
        border: '1px solid var(--gold-dim)',
        borderRadius: '50px',
        fontSize: '0.62rem',
        fontWeight: 600,
        letterSpacing: '0.14em',
        textTransform: 'uppercase' as const,
        color: 'var(--gold)',
        opacity: visible ? 1 : 0,
        transition: `opacity 0.5s ease ${index * 140 + 200}ms`,
      }}>
        {item.tag}
      </div>
      <div className="testimonial-divider" />
      <p className="testimonial-text">{item.text}</p>
    </div>
  );
}

export default function Testimonials() {
  const [headerRef, headerVisible] = useScrollReveal<HTMLDivElement>();

  return (
    <section className="testimonials-section">
      <div className="testimonials-inner">

        <div ref={headerRef} className="testimonials-header" style={{
          opacity: headerVisible ? 1 : 0,
          transform: headerVisible ? 'translateY(0)' : 'translateY(32px)',
          transition: 'opacity 0.8s ease, transform 0.8s cubic-bezier(0.25,1,0.5,1)',
        }}>
          <div className="section-label">
            <span className="section-label-line" />
            <span className="section-label-text">Highlights</span>
          </div>
          <h2 className="section-heading">
            Where I&apos;ve <em>been</em>
          </h2>
          <p style={{
            marginTop: '12px', fontSize: '0.95rem',
            color: 'var(--white-dim)', maxWidth: '480px', lineHeight: 1.7,
          }}>
            Passionate about solving real-world problems with technology — from smart agriculture to civic tools and embedded systems.
          </p>
        </div>

        <div className="testimonials-grid">
          {highlights.map((item, i) => (
            <HighlightCard key={item.id} item={item} index={i} />
          ))}
        </div>

      </div>
    </section>
  );
}
