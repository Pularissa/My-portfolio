'use client';
import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const slides = [
  {
    label: 'Who I am',
    title: ['A student who', 'builds real things'],
    goldWord: 'real things',
    body: "I'm Prisca Larissa — a Software Programming & Embedded Systems student at Rwanda Coding Academy. I care deeply about using technology to solve problems that matter in my community.",
    number: '01',
  },
  {
    label: 'What I do',
    title: ['From web apps', 'to IoT systems'],
    goldWord: 'IoT systems',
    body: "I work across the full stack — Next.js and React on the frontend, Node.js and Spring Boot on the backend, PostgreSQL for data, and Arduino & ESP8266 for embedded hardware projects.",
    number: '02',
  },
  {
    label: 'What I want',
    title: ['Internships,', 'collaboration, growth'],
    goldWord: 'collaboration',
    body: "I'm actively looking for internships, graduate programmes, and opportunities to collaborate. Passionate about AgriTech, civic tech, and building tools that uplift communities in Rwanda and beyond.",
    number: '03',
  },
];

export default function StickyAbout() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = sectionRef.current;
      if (!el) return;
      const rect     = el.getBoundingClientRect();
      const total    = el.offsetHeight - window.innerHeight;
      const scrolled = Math.max(0, -rect.top);
      const progress = Math.min(scrolled / total, 0.999);
      setActiveIdx(Math.min(Math.floor(progress * slides.length), slides.length - 1));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const slide = slides[activeIdx];

  return (
    <div ref={sectionRef} className="sticky-section" style={{ height: `${slides.length * 100}vh` }}>
      <div className="sticky-pin">

        {/* Down #6 sticky + Down #8 blur cross-fade between slides */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIdx}
            className="sticky-slide active"
            initial={{ opacity: 0, filter: 'blur(10px)', y: 32 }}
            animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
            exit={{ opacity: 0, filter: 'blur(10px)', y: -24 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Watermark number */}
            <div className="sticky-slide-number">{slide.number}</div>

            <div className="sticky-slide-inner">
              <motion.p
                className="sticky-slide-label"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                {slide.label}
              </motion.p>

              {/* Title — Down #4 text split word by word */}
              <h2 className="sticky-slide-title">
                {slide.title.map((line, li) => (
                  <span key={li} style={{ display: 'block' }}>
                    {line.split(' ').map((word, wi) => (
                      <motion.span
                        key={wi}
                        style={{
                          display: 'inline-block',
                          marginRight: '0.3em',
                          color: word === slide.goldWord.split(' ')[0] || line.includes(slide.goldWord) && line.split(' ')[wi] === slide.goldWord.split(' ')[wi - (line.split(' ').length - slide.goldWord.split(' ').length)]
                            ? undefined : undefined,
                        }}
                        className={slide.goldWord.includes(word) ? 'sticky-gold-word' : ''}
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.15 + (li * 4 + wi) * 0.06 }}
                      >
                        {word}
                      </motion.span>
                    ))}
                  </span>
                ))}
              </h2>

              {/* Body */}
              <motion.p
                className="sticky-slide-body"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.45 }}
              >
                {slide.body}
              </motion.p>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Progress dots — Up #7 reverse on scroll up */}
        <div className="sticky-dots">
          {slides.map((_, i) => (
            <motion.div
              key={i}
              className={`sticky-dot${activeIdx === i ? ' active' : ''}`}
              animate={{ height: activeIdx === i ? 20 : 6, opacity: activeIdx === i ? 1 : 0.4 }}
              transition={{ duration: 0.35 }}
            />
          ))}
        </div>

      </div>
    </div>
  );
}
