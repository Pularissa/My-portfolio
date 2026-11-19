'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';

const projects = [
  {
    number: '01',
    category: 'Main',
    title: 'UmuhinziLink',
    subtitle: 'AgriTech Platform',
    description:
      'A digital platform connecting Rwandan smallholder farmers directly with buyers — improving market access with AI-powered farming advice, live market prices, and digital payment support.',
    techs: ['Next.js', 'React', 'Node.js', 'PostgreSQL', 'Tailwind CSS'],
    image: '/images/umuhinzilink.png',
    link: 'https://github.com/Pularissa',
  },
  {
    number: '02',
    category: 'Main',
    title: 'YNT Rwanda',
    subtitle: 'NGO Website',
    description:
      "A modern website for Youth for National Transformation Rwanda, supporting memberships, donations, events, and a multilingual audience.",
    techs: ['React.js', 'Tailwind CSS', 'React Router', 'i18next'],
    image: '/images/ynt.png',
    link: 'https://github.com/Pularissa/YNT',
  },
  {
    number: '03',
    category: 'Main',
    title: 'Hotel & Flight Booking',
    subtitle: 'Full-Stack App',
    description:
      'A full-stack booking application for searching, booking, and managing hotel and flight reservations with secure authentication and booking history.',
    techs: ['Spring Boot', 'Java', 'PostgreSQL', 'Hibernate'],
    image: '/images/hotelandflight.png',
    link: 'https://github.com/Pularissa/BookingApp',
  },
  {
    number: '04',
    category: 'School',
    title: 'Smart Garden Monitor',
    subtitle: 'IoT Project',
    description:
      'An embedded smart-farming solution that monitors temperature, humidity, and soil conditions, with an LCD display and Wi-Fi connectivity.',
    techs: ['Arduino', 'C++', 'DHT11', 'LCD', 'ESP8266'],
    image: '/images/smartgarden.png',
    link: 'https://github.com/Pularissa',
  },
  {
    number: '05',
    category: 'School',
    title: 'Rwanda Traffic Signs',
    subtitle: 'Learning Platform',
    description:
      'An interactive learning platform helping learner drivers prepare for Rwanda driving theory exams with practice and quiz modes.',
    techs: ['React', 'JavaScript', 'CSS'],
    image: '/images/traffic.png',
    link: 'https://github.com/Pularissa',
  },
  {
    number: '06',
    category: 'School',
    title: 'Library Management System',
    subtitle: 'Desktop App',
    description:
      'A desktop application for managing books, borrowing, returns, and student records, with search and report generation.',
    techs: ['Java', 'Java Swing', 'JDBC', 'PostgreSQL'],
    image: '/images/library.png',
    link: 'https://github.com/Pularissa/LibrarySystem',
  },
  {
    number: '07',
    category: 'Main',
    title: 'BeFree',
    subtitle: 'Drug Prevention App',
    description:
      'A youth-focused platform for drug-prevention education, peer support, AI-powered counseling, and access to healthy activities.',
    techs: ['React.js', 'Node.js', 'MongoDB', 'Firebase'],
    image: '/images/Befree.png',
    link: 'https://github.com/Pularissa/BeFree-React',
  },
  {
    number: '08',
    category: 'Main',
    title: 'Rwanda E-Pharmacy',
    subtitle: 'Healthcare Platform',
    description:
      'A digital pharmacy platform for ordering medication online, consulting pharmacists, and securely managing prescriptions.',
    techs: ['React', 'Next.js', 'Node.js', 'Tailwind CSS'],
    image: '/images/rwandaepharmacy.png',
    link: 'https://github.com/Pularissa/E-pharmacy',
  },
  {
    number: '09',
    category: 'Main',
    title: 'Car Renting',
    subtitle: 'Vehicle Rental Platform',
    description:
      'An application for browsing available vehicles, booking them for specific dates, and managing reservations.',
    techs: ['JavaScript'],
    image: '/images/bus.png',
    link: 'https://github.com/Pularissa/car-renting',
  },
];

type Project = (typeof projects)[number];

export default function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  return (
    <section id="projects" className="projects-section">
      {/* Header sits above the scroll container */}
      <div className="projects-inner">
        <div className="projects-header reveal">
          <div className="section-label">
            <span className="section-label-line" />
            <span className="section-label-text">My Work</span>
          </div>
          <div className="clip-wrap">
            <h2 className="section-heading reveal-clip">
              Real <em>Projects</em>
            </h2>
          </div>
          <p className="projects-intro">
            A selection of personal and academic work built to solve real problems.
          </p>
        </div>
      </div>

      {/* The scroll track — tall enough for all cards */}
      <div ref={containerRef} className="projects-scroll-track">
        {projects.map((project, index) => {
          const targetScale = 1 - (projects.length - 1 - index) * 0.04;
          const rangeStart = index / projects.length;
          const rangeEnd = (index + 1) / projects.length;

          return (
            <StackCard
              key={project.number}
              project={project}
              index={index}
              total={projects.length}
              progress={scrollYProgress}
              range={[rangeStart, rangeEnd]}
              targetScale={targetScale}
            />
          );
        })}
      </div>
    </section>
  );
}

function StackCard({
  project,
  index,
  total,
  progress,
  range,
  targetScale,
}: {
  project: Project;
  index: number;
  total: number;
  progress: MotionValue<number>;
  range: [number, number];
  targetScale: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  const scale = useTransform(progress, range, [1, targetScale]);

  // Slight brightness dim as cards stack behind
  const opacity = useTransform(progress, range, [1, index === total - 1 ? 1 : 0.75]);

  return (
    <div
      className="projects-card-wrapper"
      style={{ top: `calc(80px + ${index * 20}px)` }}
    >
      <motion.article
        ref={cardRef}
        className="project-card"
        style={{
          scale,
          opacity,
          transformOrigin: 'top center',
        }}
      >
        {/* Left: text content */}
        <div className="project-card-content">
          <div className="project-card-top">
            <span className="project-card-num" aria-label={`Project ${project.number}`}>
              {project.number}
            </span>
            <span className="project-card-category">{project.category} project</span>
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

        {/* Right: project image */}
        <div className="project-card-image-wrap">
          <Image
            src={project.image}
            alt={`${project.title} project`}
            fill
            sizes="(max-width: 960px) 100vw, 55vw"
            className="project-card-image-img"
          />
        </div>
      </motion.article>
    </div>
  );
}
