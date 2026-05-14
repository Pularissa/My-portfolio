// components/Projects.tsx
'use client';

import Image from 'next/image';
import { useState } from 'react';

const projects = [
  {
    id: 1,
    title: "Project 1",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    techs: ["Next.js", "Java", "Python", "Solidity", "ML"],
    bgImage: "/images/bus.png",
    fgImage: "/images/vr.png",
  },
  {
    id: 2,
    title: "Project 2",
    description: "Another amazing project with cutting-edge technologies and innovative solutions.",
    techs: ["React", "TypeScript", "Tailwind", "Node.js"],
    bgImage: "/images/vr.png",
    fgImage: "/images/vr.png",
  },
  {
    id: 3,
    title: "Project 3",
    description: "A groundbreaking project that revolutionizes the way we interact with technology.",
    techs: ["Next.js", "Java", "Python", "Solidity", "ML"],
    bgImage: "/images/bus.png",
    fgImage: "/images/vr.png",
  }
  // Add more projects as needed
];

export default function ProjectsPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentProject = projects[currentIndex];

  return (
    <div className="projects-page min-h-screen bg-black text-white overflow-hidden">
      <main>
        {/* Section Header */}
        <div className="section-header flex justify-center mb-16">
          <div className="flex items-center gap-3">
            <div className="header-line h-px w-8 bg-white/60" />
            <h1 className="text-4xl md:text-5xl font-light tracking-tight">Projects</h1>
            <div className="header-line h-px w-8 bg-white/60" />
          </div>
        </div>

        {/* Project Showcase */}
        <div className="project-grid grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Overlapping Images */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="images-wrapper relative w-full max-w-[520px] aspect-[4/3.1]">
              
              {/* Background Image */}
              <div className="tech-bg absolute left-0 top-8 w-[70%] aspect-square rounded-3xl overflow-hidden border border-white/10 shadow-2xl rotate-[-8deg] z-10">
                <Image
                  src={currentProject.bgImage}
                  alt={currentProject.title}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, 520px"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/30 to-transparent" />
              </div>

              {/* Foreground Image */}
              <div className="vr-photo absolute right-0 bottom-0 w-[68%] rounded-3xl overflow-hidden border border-white/10 shadow-2xl rotate-[6deg] z-20">
                <Image
                  src={currentProject.fgImage}
                  alt={`${currentProject.title} demo`}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, 520px"
                />
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="project-content space-y-8">
            <div>
              <h2 className="text-3xl font-semibold mb-2">{currentProject.title}</h2>
              <p className="text-lg text-gray-400 leading-relaxed">
                {currentProject.description}
              </p>
            </div>

            {/* Technologies */}
            <div>
              <p className="tech-label uppercase text-xs tracking-widest text-gray-500 mb-4">
                Technologies applied
              </p>
              <div className="tech-tags flex flex-wrap gap-3">
                {currentProject.techs.map((tech) => (
                  <span key={tech}>{tech}</span>
                ))}
              </div>
            </div>

            {/* Demo Button */}
            <a href="#" className="demo-button inline-flex items-center gap-2 group mt-4 text-sm font-medium text-white/90 hover:text-white transition">
              Demo
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 group-hover:translate-x-0.5 transition" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>

        {/* Pagination Dots */}
        <div className="pagination flex justify-center mt-20">
          {projects.map((_, i) => (
            <div
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`dot w-3 h-3 rounded-full transition-all cursor-pointer ${
                i === currentIndex ? 'active' : ''
              }`}
            />
          ))}
        </div>
      </main>
    </div>
  );
}