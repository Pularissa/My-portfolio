'use client';

const experiences = [
  {
    id: "01",
    company: "KW Enterprise",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: "02",
    company: "KW Enterprise",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: "03",
    company: "KW Enterprise",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: "04",
    company: "KW Enterprise",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
];

export default function Experience() {
  return (
    <div className="experience-section">
      <div className="max-w-5xl mx-auto px-6">
        {/* Header */}
        <div className="section-header flex justify-center mb-20">
          <div className="flex items-center gap-3">
            <div className="header-line h-px w-8 bg-white/60" />
            <h1 className="text-4xl md:text-5xl font-light tracking-tight">Experience</h1>
            <div className="header-line h-px w-8 bg-white/60" />
          </div>
        </div>

        {/* Timeline */}
        <div className="timeline-container">
          {experiences.map((exp) => (
            <div key={exp.id} className="experience-item">
              {/* Number Circle */}
              <div className="number-circle">{exp.id}</div>

              {/* Card */}
              <div className="experience-card">
                <div className="company-title">
                  <div className="short-line" />
                  <h3>{exp.company}</h3>
                </div>
                <p>{exp.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}