'use client';

import { useEffect, useRef } from 'react';
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
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      const cards = cardRefs.current;
      const total = cards.length;
      if (!total) return;

      const isMobile = window.innerWidth <= 768;
      const baseTop = isMobile ? 70 : 88;
      const stepTop = isMobile ? 16 : 28;

      cards.forEach((card, i) => {
        if (!card) return;

        if (i < total - 1) {
          const nextCard = cards[i + 1];
          if (!nextCard) return;

          const nextRect = nextCard.getBoundingClientRect();
          const targetTop = baseTop + (i + 1) * stepTop;
          const travelDist = Math.max(window.innerHeight * 0.55, 340);

          const distFromTarget = nextRect.top - targetTop;
          const progress = Math.min(Math.max((travelDist - distFromTarget) / travelDist, 0), 1);

          const scale = 1 - progress * 0.05;
          const brightness = 1 - progress * 0.22;

          card.style.transform = `scale(${scale.toFixed(4)})`;
          card.style.filter = `brightness(${brightness.toFixed(3)})`;
        } else {
          card.style.transform = 'scale(1)';
          card.style.filter = 'brightness(1)';
        }
      });
    };

    handleScroll();

    const onLenisScroll = () => handleScroll();
    window.addEventListener('lenis:scroll', onLenisScroll);
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);

    return () => {
      window.removeEventListener('lenis:scroll', onLenisScroll);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return (
    <section id="projects" className="projects-section">
      <div className="projects-inner">
        <div className="projects-header reveal">
          <div className="section-label">
            <span className="section-label-line" />
            <span className="section-label-text">My Work</span>
          </div>
          <div className="clip-wrap">
            <h2 className="section-heading reveal-clip">Real <em>Projects</em></h2>
          </div>
          <p className="projects-intro">
            A selection of personal and academic work built to solve real problems.
          </p>
        </div>

        <div className="projects-stack">
          {projects.map((project, index) => (
            <div
              key={project.number}
              className="project-card-slot"
              style={{
                zIndex: index + 1,
              }}
            >
              <div
                ref={(el) => {
                  cardRefs.current[index] = el;
                }}
                className={`project-card-sticky project-card-sticky-${project.number}`}
                style={{
                  top: `calc(${88 + index * 28}px)`,
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
