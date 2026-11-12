const recommendations = [
  {
    name: "Twarimitswe Aaron",
    initials: "TA",
    text: "Prisca is a hardworking and dedicated person. She enjoys learning new technologies and solving real-world problems. She likes working on useful projects that make a real difference. She is always ready to learn new skills and improve herself. I highly recommend Prisca because she works hard, learns quickly, and always does her best. She would be a valuable member of any team.",
  },
  {
    name: "Impano Christella",
    initials: "IC",
    text: "Prisca is a very dedicated and determined person to work with. From understanding requirements up to the final product delivery, she handles everything flawlessly. She really understands her material.",
  },
  {
    name: "Igihozo Belise",
    initials: "IB",
    text: "Prisca is a skilled frontend developer who consistently delivers clean, responsive, and user-friendly interfaces. She has a strong eye for detail, writes maintainable code, and is a great addition to any development team.",
  },
  {
    name: "Ishema S. Shoulamite",
    initials: "IS",
    text: "I've had the chance to see Prisca grow as a frontend developer, and one thing stands out — she genuinely cares about building good experiences. She's reliable, quick to learn, and writes clean, thoughtful code. Any team looking for someone who combines skill with consistency will be lucky to have her.",
  },
  {
    name: "Ganwa A. Laure",
    initials: "GL",
    text: "I strongly recommend Prisca for software-related opportunities. She possesses excellent programming skills, a strong work ethic, and a passion for creating innovative software solutions. Her ability to learn quickly, solve complex problems, and collaborate effectively makes her an outstanding candidate for any software development role.",
  },
];

export default function Testimonials() {
  return (
    <section className="testimonials-section">
      <div className="testimonials-inner">
        <div className="testimonials-header reveal">
          <div className="section-label">
            <span className="section-label-line" />
            <span className="section-label-text">Recommendations</span>
          </div>
          <div className="clip-wrap">
            <h2 className="section-heading reveal-clip">What peers <em>say</em></h2>
          </div>
          <p className="recommendations-intro">
            Words from classmates and collaborators at Rwanda Coding Academy.
          </p>
        </div>

        <div className="recommendations-grid reveal-scale">
          {recommendations.map((recommendation, index) => (
            <article className="recommendation-card" key={recommendation.initials}>
              <div className="recommendation-meta">
                <span>NO. {String(index + 1).padStart(2, "0")}</span>
                <span>PEER RECOMMENDATION</span>
              </div>
              <span className="recommendation-quote-mark" aria-hidden="true">&ldquo;</span>
              <blockquote className="recommendation-quote">
                {recommendation.text}
              </blockquote>
              <div className="recommendation-divider" />
              <div className="recommendation-author">
                <div className="recommendation-avatar" aria-hidden="true">
                  {recommendation.initials}
                </div>
                <div>
                  <p className="recommendation-name">{recommendation.name}</p>
                  <p className="recommendation-role">Rwanda Coding Academy</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
