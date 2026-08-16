'use client';

import { GraduationCap, Sprout, Globe, Zap } from 'lucide-react';

const experiences = [
  {
    id: '01',
    company: 'Rwanda Coding Academy',
    role: 'Software Programming & Embedded Systems Student',
    period: '2023 — Present',
    type: 'Education',
    description: "Studying software engineering and embedded systems at one of Rwanda's top academies. Building real-world projects spanning web apps, desktop software, IoT devices, and AI-assisted systems.",
    Icon: GraduationCap,
  },
  {
    id: '02',
    company: 'UmuhinziLink',
    role: 'Founder & Lead Developer',
    period: '2024 — Present',
    type: 'Project',
    description: 'Designed and built a full-stack AgriTech platform connecting Rwandan farmers with buyers. Integrated AI farming advice, live market pricing, and digital payments using Next.js, Node.js, and PostgreSQL.',
    Icon: Sprout,
  },
  {
    id: '03',
    company: 'YNT Rwanda',
    role: 'Frontend Developer',
    period: '2024',
    type: 'Project',
    description: 'Developed a modern NGO website with multi-language support (i18next), membership registration, donation handling, and events management using React and Tailwind CSS.',
    Icon: Globe,
  },
  {
    id: '04',
    company: 'Independent Projects',
    role: 'Self-directed Developer',
    period: '2023 — Present',
    type: 'Personal',
    description: 'Built 10+ projects across web (React, Spring Boot), desktop (Java Swing), and hardware (Arduino, ESP8266). Topics include traffic education, library management, IoT smart gardens, and personal safety apps.',
    Icon: Zap,
  },
];

const typeColor: Record<string, string> = {
  Education: '#6ee7b7',
  Project:   'var(--gold)',
  Personal:  'rgba(245,240,235,0.45)',
};

export default function Experience() {
  return (
    <section id="experience" className="experience-section">
      <div className="experience-inner">

        <div className="experience-header reveal">
          <div className="section-label">
            <span className="section-label-line" />
            <span className="section-label-text">Education &amp; Experience</span>
          </div>
          <div className="clip-wrap">
            <h2 className="section-heading reveal-clip">My <em>Journey</em></h2>
          </div>
          <div className="line-draw reveal-line" style={{ marginTop: '24px' }} />
        </div>

        {/* Stacked cards */}
        <div className="stack-timeline">
          {experiences.map(({ id, company, role, period, type, description, Icon }, i) => (
            <div
              key={id}
              className="stack-card reveal"
              style={{
                transitionDelay: `${i * 80}ms`,
                top: `${80 + i * 18}px`,
                zIndex: i + 1,
              }}
            >
              <div className="stack-card-stripe" style={{ background: typeColor[type] }} />
              <div className="stack-card-body">
                <div className="stack-card-header">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <div style={{
                      width: '44px', height: '44px', borderRadius: '12px',
                      background: 'var(--gold-faint)', border: '1px solid var(--gold-dim)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      flexShrink: 0,
                    }}>
                      <Icon size={20} color="var(--gold)" strokeWidth={1.5} />
                    </div>
                    <div>
                      <div className="clip-wrap">
                        <h3 className="timeline-company reveal-clip"
                          style={{ transitionDelay: `${i * 80 + 60}ms` }}>
                          {company}
                        </h3>
                      </div>
                      <p className="timeline-role" style={{ marginTop: '2px' }}>{role}</p>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right', flexShrink: 0 }}>
                    <div className="timeline-period">{period}</div>
                    <div className="stack-card-type" style={{ color: typeColor[type] }}>{type}</div>
                  </div>
                </div>
                <p className="timeline-desc">{description}</p>
                <div className="stack-card-index">{id}</div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
