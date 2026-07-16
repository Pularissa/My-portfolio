'use client';
import { useEffect, useRef } from 'react';

export default function MagneticCursor() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let tx = 0, ty = 0, cx = 0, cy = 0;
    let raf: number;

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const loop = () => {
      cx = lerp(cx, tx, 0.12);
      cy = lerp(cy, ty, 0.12);
      el.style.left = `${cx}px`;
      el.style.top  = `${cy}px`;
      raf = requestAnimationFrame(loop);
    };

    const onMove = (e: MouseEvent) => {
      tx = e.clientX; ty = e.clientY;
      el.classList.add('visible');
    };

    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (t.closest('a,button,.sk-card,.testimonial-card,.timeline-card,.hscroll-card')) {
        el.classList.add('hover');
      }
    };
    const onOut = () => el.classList.remove('hover');

    window.addEventListener('mousemove', onMove);
    document.addEventListener('mouseover', onOver);
    document.addEventListener('mouseout', onOut);
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseout', onOut);
      cancelAnimationFrame(raf);
    };
  }, []);

  return <div ref={ref} className="magnetic-cursor" aria-hidden="true" />;
}
