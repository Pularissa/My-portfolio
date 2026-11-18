interface RecommendationItem {
  number: string;
  org: string;
  re: string;
  name: string;
  role: string;
  initials: string;
  avatarUrl?: string;
  text: string;
}

const recommendations: RecommendationItem[] = [
  {
    number: "01",
    org: "RWANDA CODING ACADEMY",
    re: "PRISCA",
    name: "Twarimitswe Aaron",
    role: "SOFTWARE PEER · RCA",
    initials: "TA",
    text: "Prisca is a hardworking and dedicated person. She enjoys learning new technologies and solving real-world problems. She likes working on useful projects that make a real difference. She is always ready to learn new skills and improve herself. I highly recommend Prisca because she works hard, learns quickly, and always does her best. She would be a valuable member of any team.",
  },
  {
    number: "02",
    org: "RCA INNOVATIONS",
    re: "COLLAB",
    name: "Impano Christella",
    role: "FRONTEND PEER · RCA",
    initials: "IC",
    text: "Prisca is a very dedicated and determined person to work with. From understanding requirements up to the final product delivery, she handles everything flawlessly. She really understands her material.",
  },
  {
    number: "03",
    org: "DEV COMMUNITY",
    re: "UI/UX",
    name: "Igihozo Belise",
    role: "UI/UX & DEV PEER · RCA",
    initials: "IB",
    text: "Prisca is a skilled frontend developer who consistently delivers clean, responsive, and user-friendly interfaces. She has a strong eye for detail, writes maintainable code, and is a great addition to any development team.",
  },
  {
    number: "04",
    org: "PROJECT ALLIANCE",
    re: "SYSTEMS",
    name: "Ishema S. Shoulamite",
    role: "ENGINEERING PEER · RCA",
    initials: "IS",
    text: "I've had the chance to see Prisca grow as a frontend developer, and one thing stands out — she genuinely cares about building good experiences. She's reliable, quick to learn, and writes clean, thoughtful code. Any team looking for someone who combines skill with consistency will be lucky to have her.",
  },
  {
    number: "05",
    org: "CODE FELLOWS",
    re: "ETHIC",
    name: "Ganwa A. Laure",
    role: "COLLABORATOR · RCA",
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
            <div className="recommendation-card-wrapper" key={recommendation.number}>
              <div
                className={`recommendation-tape recommendation-tape-${index + 1}`}
                aria-hidden="true"
              />
              <article className={`recommendation-card recommendation-card-${index + 1}`}>
                <div className="recommendation-meta">
                  <span className="recommendation-no">NO.  {recommendation.number}</span>
                  <span className="recommendation-tag">
                    {recommendation.org}  ·  RE: {recommendation.re}
                  </span>
                </div>

                <div className="recommendation-body">
                  <svg
                    className="recommendation-quote-mark"
                    viewBox="0 0 28 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M0 12.5C0 5.6 4.2 1.4 10.5 0l1.4 2.6C7.7 3.6 5.8 6.2 5.6 8.8c.7-.2 1.5-.3 2.2-.3 3.3 0 5.4 2.1 5.4 5.2 0 3.5-2.6 6.1-6.1 6.1C3.1 19.8 0 16.7 0 12.5zm13.8 0c0-6.9 4.2-11.1 10.5-12.5l1.4 2.6c-4.2 1-6.1 3.6-6.3 6.2.7-.2 1.5-.3 2.2-.3 3.3 0 5.4 2.1 5.4 5.2 0 3.5-2.6 6.1-6.1 6.1-4 0-7.1-3.1-7.1-7.3z" />
                  </svg>
                  <blockquote className="recommendation-quote">
                    {recommendation.text}
                  </blockquote>
                </div>

                <div className="recommendation-divider" />

                <div className="recommendation-author">
                  <div className="recommendation-avatar" aria-hidden="true">
                    {recommendation.avatarUrl ? (
                      <img
                        src={recommendation.avatarUrl}
                        alt={recommendation.name}
                        className="recommendation-avatar-img"
                      />
                    ) : (
                      <span className="recommendation-avatar-initials">
                        {recommendation.initials}
                      </span>
                    )}
                  </div>
                  <div className="recommendation-author-info">
                    <p className="recommendation-name">{recommendation.name}</p>
                    <p className="recommendation-role">{recommendation.role}</p>
                  </div>
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
