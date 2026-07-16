export default function Marquee() {
  const items = [
    "React", "Next.js", "TypeScript", "Tailwind CSS",
    "Node.js", "Figma", "UI/UX", "REST APIs",
    "Git", "Accessibility", "Clean Code", "Open to Work",
  ];

  // Double the list so it loops seamlessly
  const doubled = [...items, ...items];

  return (
    <div className="marquee-section">
      <div className="marquee-track">
        {doubled.map((item, i) => (
          <span key={i} className="marquee-item">
            <span className="marquee-dot">✦</span>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
