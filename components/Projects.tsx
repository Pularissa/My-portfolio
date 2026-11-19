'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

const projects = [
  {
    number: '01',
    category: 'Main',
    title: 'UmuhinziLink',
    subtitle: 'AgriTech Platform',
    description: 'A digital platform connecting Rwandan smallholder farmers directly with buyers — improving market access with AI-powered farming advice, live market prices, and digital payment support.',
    techs: ['Next.js', 'React', 'Node.js', 'PostgreSQL', 'Tailwind CSS'],
    image: '/images/umuhinzilink.png',
    link: 'https://github.com/Pularissa',
  },
  {
    number: '02',
    category: 'Main',
    title: 'YNT Rwanda',
    subtitle: 'NGO Website',
    description: "A modern website for Youth for National Transformation Rwanda, supporting memberships, donations, events, and a multilingual audience.",
    techs: ['React.js', 'Tailwind CSS', 'React Router', 'i18next'],
    image: '/images/ynt.png',
    link: 'https://github.com/Pularissa/YNT',
  },
  {
    number: '03',
    category: 'Main',
    title: 'Hotel & Flight Booking',
    subtitle: 'Full-Stack App',
    description: 'A full-stack booking application for searching, booking, and managing hotel and flight reservations with secure authentication and booking history.',
    techs: ['Spring Boot', 'Java', 'PostgreSQL', 'Hibernate'],
    image: '/images/hotelandflight.png',
    link: 'https://github.com/Pularissa/BookingApp',
  },
  {
    number: '04',
    category: 'School',
    title: 'Smart Garden Monitor',
    subtitle: 'IoT Project',
    description: 'An embedded smart-farming solution that monitors temperature, humidity, and soil conditions, with an LCD display and Wi-Fi connectivity.',
    techs: ['Arduino', 'C++', 'DHT11', 'LCD', 'ESP8266'],
    image: '/images/smartgarden.png',
    link: 'https://github.com/Pularissa',
  },
  {
    number: '05',
    category: 'School',
    title: 'Rwanda Traffic Signs',
    subtitle: 'Learning Platform',
    description: 'An interactive learning platform helping learner drivers prepare for Rwanda driving theory exams with practice and quiz modes.',
    techs: ['React', 'JavaScript', 'CSS'],
    image: '/images/traffic.png',
    link: 'https://github.com/Pularissa',
  },
  {
    number: '06',
    category: 'School',
    title: 'Library Management System',
    subtitle: 'Desktop App',
    description: 'A desktop application for managing books, borrowing, returns, and student records, with search and report generation.',
    techs: ['Java', 'Java Swing', 'JDBC', 'PostgreSQL'],
    image: '/images/library.png',
    link: 'https://github.com/Pularissa/LibrarySystem',
  },
  {
    number: '07',
    category: 'Main',
    title: 'BeFree',
    subtitle: 'Drug Prevention App',
    description: 'A youth-focused platform for drug-prevention education, peer support, AI-powered counseling, and access to healthy activities.',
    techs: ['React.js', 'Node.js', 'MongoDB', 'Firebase'],
    image: '/images/Befree.png',
    link: 'https://github.com/Pularissa/BeFree-React',
  },
  {
    number: '08',
    category: 'Main',
    title: 'Rwanda E-Pharmacy',
    subtitle: 'Healthcare Platform',
    description: 'A digital pharmacy platform for ordering medication online, consulting pharmacists, and securely managing prescriptions.',
    techs: ['React', 'Next.js', 'Node.js', 'Tailwind CSS'],
    image: '/images/rwandaepharmacy.png',
    link: 'https://github.com/Pularissa/E-pharmacy',
  },
  {
    number: '09',
    category: 'Main',
    title: 'Car Renting',
    subtitle: 'Vehicle Rental Platform',
    description: 'An application for browsing available vehicles, booking them for specific dates, and managing reservations.',
    techs: ['JavaScript'],
    image: '/images/bus.png',
    link: 'https://github.com/Pularissa/car-renting',
  },
];

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const updateCards = () => {
      const sec = sectionRef.current;
      if (!sec) return;

      const rect = sec.getBoundingClientRect();
      const vh = window.innerHeight;
      const totalDist = sec.offsetHeight - vh;
      if (totalDist <= 0) return;

      // When rect.top <= 0, the section is pinned at viewport top
      const scrolled = -rect.top;
      const progress = Math.min(Math.max(scrolled / totalDist, 0), 1);

      const total = projects.length;
      const numTransitions = total - 1;

      const currentIdx = Math.min(Math.floor(progress * total), total - 1);
      setActiveIndex(currentIdx);

      const isMobile = window.innerWidth <= 768;
      const stepOffset = isMobile ? 14 : 24;

      cardRefs.current.forEach((cardEl, i) => {
        if (!cardEl) return;

        if (i === 0) {
          const nextStart = 0;
          const nextEnd = 1 / numTransitions;
          const p = Math.min(Math.max((progress - nextStart) / (nextEnd - nextStart), 0), 1);
          const scale = 1 - p * 0.05 - (progress > nextEnd ? (progress - nextEnd) * 0.04 : 0);
          const brightness = 1 - p * 0.2 - (progress > nextEnd ? (progress - nextEnd) * 0.12 : 0);

          cardEl.style.transform = `translate3d(0, 0px, 0) scale(${Math.max(scale, 0.88).toFixed(4)})`;
          cardEl.style.filter = `brightness(${Math.max(brightness, 0.65).toFixed(3)})`;
          cardEl.style.opacity = '1';
          return;
        }

        const start = (i - 1) / numTransitions;
        const end = i / numTransitions;
        const finalY = i * stepOffset;

        if (progress <= start) {
          cardEl.style.transform = `translate3d(0, ${vh}px, 0) scale(1)`;
          cardEl.style.filter = 'brightness(1)';
          cardEl.style.opacity = '0';
        } else if (progress < end) {
          const t = (progress - start) / (end - start);
          const ease = 1 - Math.pow(1 - t, 3);
          const y = (1 - ease) * vh * 0.95 + ease * finalY;

          cardEl.style.transform = `translate3d(0, ${y.toFixed(1)}px, 0) scale(1)`;
          cardEl.style.filter = 'brightness(1)';
          cardEl.style.opacity = '1';
        } else {
          const futureP = (progress - end) / (1 - end || 1);
          const scale = 1 - futureP * 0.05;
          const brightness = 1 - futureP * 0.2;

          cardEl.style.transform = `translate3d(0, ${finalY}px, 0) scale(${Math.max(scale, 0.88).toFixed(4)})`;
          cardEl.style.filter = `brightness(${Math.max(brightness, 0.65).toFixed(3)})`;
          cardEl.style.opacity = '1';
        }
      });
    };

    updateCards();

    const onLenis = () => updateCards();
    window.addEventListener('lenis:scroll', onLenis);
    window.addEventListener('scroll', updateCards, { passive: true });
    window.addEventListener('resize', updateCards);

    return () => {
      window.removeEventListener('lenis:scroll', onLenis);
      window.removeEventListener('scroll', updateCards);
      window.removeEventListener('resize', updateCards);
    };
  }, []);

  return (
    <section id="projects" ref={sectionRef} className="projects-section">
      <div className="projects-sticky-viewport">
        <div className="projects-inner">
          <div className="projects-header">
            <div className="section-label">
              <span className="section-label-line" />
              <span className="section-label-text">My Work</span>
            </div>
            <div className="projects-header-main">
              <div className="clip-wrap">
                <h2 className="section-heading reveal-clip">Real <em>Projects</em></h2>
              </div>
              <div className="projects-counter">
                <span className="projects-counter-current">
                  {String(activeIndex + 1).padStart(2, '0')}
                </span>
                <span className="projects-counter-divider">/</span>
                <span className="projects-counter-total">
                  {String(projects.length).padStart(2, '0')}
                </span>
              </div>
            </div>
          </div>

          <div className="projects-stage">
            {projects.map((project, index) => (
              <div
                key={project.number}
                ref={(el) => {
                  cardRefs.current[index] = el;
                }}
                className={`project-card-wrapper project-card-layer-${project.number}`}
                style={{
                  zIndex: index + 1,
                }}
              >
                <article className="project-card">
                  <div className="project-card-content">
                    <div className="project-card-top">
                      <span className="project-card-num" aria-label={`Project ${project.number}`}>
                        {project.number}
                      </span>
                      <span className="project-card-category">
                        {project.category} project
                      </span>
                    </div>

                    <div className="project-card-bottom">
                      <h3 className="project-card-title">{project.title}</h3>
                      <p className="project-card-subtitle">{project.subtitle}</p>
                      <p className="project-card-desc">{project.description}</p>

                      <div className="project-card-footer">
                        <div className="project-card-techs">
                          {project.techs.slice(0, 3).map((tech) => (
                            <span key={tech} className="project-card-tech-tag">
                              {tech}
                            </span>
                          ))}
                        </div>
                        {project.link !== '#' && (
                          <a
                            className="project-card-link"
                            href={project.link}
                            target="_blank"
                            rel="noreferrer"
                          >
                            <span>View project</span>
                            <svg
                              aria-hidden="true"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M7 17 17 7M7 7h10v10" />
                            </svg>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="project-card-image-wrap">
                    <Image
                      src={project.image}
                      alt={`${project.title} project`}
                      fill
                      sizes="(max-width: 960px) 100vw, 55vw"
                      className="project-card-image-img"
                    />
                  </div>
                </article>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
