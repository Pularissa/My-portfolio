'use client';
import { useEffect, useRef } from 'react';
import { Monitor, Palette, Code, Server, Database, Cpu, Wifi, Wrench, Terminal, CheckSquare } from 'lucide-react';

const cards = [
  { tag: 'Frontend',    title: 'React & Next.js',      Icon: Monitor },
  { tag: 'Styling',     title: 'Tailwind & CSS3',       Icon: Palette },
  { tag: 'Language',    title: 'Java & JavaScript',     Icon: Code },
  { tag: 'Backend',     title: 'Spring Boot & Node.js', Icon: Server },
  { tag: 'Database',    title: 'PostgreSQL & MySQL',    Icon: Database },
  { tag: 'Embedded',    title: 'Arduino & ESP8266',     Icon: Cpu },
  { tag: 'IoT Sensors', title: 'DHT11, LM35, I2C',     Icon: Wifi },
  { tag: 'Tooling',     title: 'Git, Postman, Figma',  Icon: Wrench },
  { tag: 'Other',       title: 'Python & C++',          Icon: Terminal },
  { tag: 'Practice',    title: 'Agile & Clean Code',    Icon: CheckSquare },
];

export default function HScrollStrip() {
  const trackRef   = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const compute = (scroll: number) => {
      const sec   = sectionRef.current;
      const track = trackRef.current;
      if (!sec || !track) return;
      const top      = sec.offsetTop;
      const secH     = sec.offsetHeight;
      const vh       = window.innerHeight;
      const progress = (scroll - top + vh) / (secH + vh);
      const clamped  = Math.min(Math.max(progress, 0), 1);
      const maxShift = track.scrollWidth - sec.offsetWidth;
      track.style.transform = `translateX(-${clamped * maxShift * 0.65}px)`;
    };

    const onLenisScroll = (e: Event) => compute((e as CustomEvent<{ scroll: number }>).detail.scroll);
    window.addEventListener('lenis:scroll', onLenisScroll);

    const onNativeScroll = () => compute(window.scrollY);
    window.addEventListener('scroll', onNativeScroll, { passive: true });

    return () => {
      window.removeEventListener('lenis:scroll', onLenisScroll);
      window.removeEventListener('scroll', onNativeScroll);
    };
  }, []);

  return (
    <div ref={sectionRef} className="hscroll-section">
      <div className="hscroll-label">
        <span className="hscroll-label-line" />
        <span className="hscroll-label-text">Tech Stack</span>
        <span className="hscroll-label-hint">— scroll to explore</span>
      </div>
      <div ref={trackRef} className="hscroll-track" style={{ transition: 'transform 0.12s linear' }}>
        {cards.map(({ tag, title, Icon }, i) => (
          <div key={i} className="hscroll-card">
            <div className="hscroll-card-glow" />
            <div className="hscroll-card-icon">
              <Icon size={24} strokeWidth={1.5} color="var(--gold)" />
            </div>
            <p className="hscroll-card-tag">{tag}</p>
            <p className="hscroll-card-title">{title}</p>
            <div className="hscroll-card-num">{String(i + 1).padStart(2, '0')}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
