'use client';

import { useEffect, useRef, useState } from 'react';

export default function ScrollProgress() {
  const [pct, setPct] = useState(0);
  const rafRef = useRef<number>(0);
  const targetRef = useRef(0);
  const currentRef = useRef(0);

  useEffect(() => {
    const onScroll = ({ scroll }: { scroll: number }) => {
      const el = document.documentElement;
      const total = el.scrollHeight - el.clientHeight;
      targetRef.current = total > 0 ? (scroll / total) * 100 : 0;
    };

    /* Smooth lerp animation for progress bar — buttery independent of Lenis */
    const animate = () => {
      const diff = targetRef.current - currentRef.current;
      if (Math.abs(diff) > 0.01) {
        currentRef.current += diff * 0.08;
        setPct(currentRef.current);
      }
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    const onLenisScroll = (e: Event) => onScroll((e as CustomEvent<{ scroll: number }>).detail.scroll);
    window.addEventListener('lenis:scroll', onLenisScroll);

    const nativeScroll = () => onScroll(window.scrollY);
    window.addEventListener('scroll', nativeScroll, { passive: true });

    return () => {
      window.removeEventListener('lenis:scroll', onLenisScroll);
      window.removeEventListener('scroll', nativeScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const displayPct = Math.round(pct);
  const isNearEnd = pct > 94;

  return (
    <>
      {/* ↓10 / ↑10 — Scroll Progress Bar with gradient glow */}
      <div className="scroll-progress-track" aria-hidden="true">
        <div
          className="scroll-progress-fill"
          style={{ width: `${pct}%` }}
        />
        {/* Glow tip */}
        <div
          className="scroll-progress-tip"
          style={{ left: `${pct}%` }}
        />
      </div>

      {/* Floating percentage label */}
      <div
        className="scroll-progress-label"
        style={{
          opacity: pct > 2 ? 1 : 0,
          transform: pct > 2 ? 'translateY(0)' : 'translateY(-6px)',
        }}
        aria-label={`Page scroll progress: ${displayPct}%`}
      >
        <span className="scroll-progress-pct">{displayPct}</span>
        <span className="scroll-progress-sym">%</span>
        {isNearEnd && <span className="scroll-progress-end">↓</span>}
      </div>
    </>
  );
}
