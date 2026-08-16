import { Sparkles } from 'lucide-react';

export default function Marquee() {
  const items = [
    "React", "Next.js", "Java", "Spring Boot", "PostgreSQL",
    "Node.js", "Arduino", "ESP8266", "Tailwind CSS",
    "MongoDB", "OpenAI API", "Firebase", "Google Maps API",
    "Git & GitHub", "Figma", "REST APIs",
    "Python", "C++", "i18next", "Open to Internships",
  ];

  const doubled = [...items, ...items];

  return (
    <div className="marquee-section">
      <div className="marquee-track">
        {doubled.map((item, i) => (
          <span key={i} className="marquee-item">
            <span className="marquee-dot"><Sparkles size={9} strokeWidth={1.5} /></span>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
