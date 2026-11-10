'use client';

import Image from 'next/image';
import { useScrollReveal } from './useScrollReveal';

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
    title: 'pBeFree',
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

        <div className="projects-list">
          {projects.map((project) => (
            <ProjectCard key={project.number} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}

type Project = (typeof projects)[number];

function ProjectCard({ project }: { project: Project }) {
  const [ref, isVisible] = useScrollReveal<HTMLElement>({ threshold: 0.12 });
  return (
    <article ref={ref} className={`project-card${isVisible ? ' is-visible' : ''}`}>
      <span className="project-index" aria-label={`Project ${project.number}`}>
        {project.number}
      </span>
      <div className="project-card-content">
        <p className="project-category">{project.category} project</p>
        <h3 className="project-card-heading">
          <span>{project.title}</span>
          <em>{project.subtitle}</em>
        </h3>
        <p className="project-card-description">{project.description}</p>
        <div className="project-card-meta">
          <span>{project.techs.slice(0, 3).join(' · ')}</span>
          <a className="project-card-link" href={project.link} target="_blank" rel="noreferrer">
            View project
            <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 17 17 7M7 7h10v10" />
            </svg>
          </a>
        </div>
      </div>
      <div className="project-card-image">
        <Image
          src={project.image}
          alt={`${project.title} project`}
          fill
          sizes="(max-width: 760px) 100vw, 48vw"
        />
      </div>
    </article>
  );
}
