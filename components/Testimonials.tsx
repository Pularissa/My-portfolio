import React from 'react';

const testimonials = [
  {
    id: 1,
    name: "John Kate",
    role: "Co-worker at KW",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut"
  },
  {
    id: 2,
    name: "John Kate",
    role: "Co-worker at KW",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut"
  },
  {
    id: 3,
    name: "John Kate",
    role: "Co-worker at KW",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut"
  }
];

export default function Testimonials() {
  return (
    <section className="ts-container">
      {/* Section Title */}
      <div className="ts-header">
        <div className="ts-indicator-lines">
          <span className="ts-line-short"></span>
          <span className="ts-line-long"></span>
        </div>
        <h2>Testimonies</h2>
      </div>

      {/* Grid Layout Container */}
      <div className="ts-grid">
        {testimonials.map((item) => (
          <div key={item.id} className="ts-card">
            <h3 className="ts-name">{item.name}</h3>
            
            <div className="ts-subheader">
              <div className="ts-indicator-lines">
                <span className="ts-line-short"></span>
                <span className="ts-line-long"></span>
              </div>
              <p className="ts-role">{item.role}</p>
            </div>

            {/* Quote with Nested UI Frame Lines */}
            <div className="ts-quote-body">
              <div className="ts-corner-tr"></div>
              <p className="ts-text">{item.text}</p>
              <div className="ts-corner-bl"></div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}