'use client';
import { useEffect, useRef, useState } from 'react';

interface Options { threshold?: number; once?: boolean; }

export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(opts: Options = {}) {
  const { threshold = 0.12, once = true } = opts;
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) { setVisible(true); if (once) obs.disconnect(); }
        else if (!once) setVisible(false);
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold, once]);

  return [ref, visible] as const;
}

/** Eased count-up from 0 → target when trigger=true */
export function useCountUp(target: number, trigger: boolean, duration = 1400) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!trigger) return;
    let start: number | null = null;
    const step = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      setValue(Math.round((1 - Math.pow(1 - p, 3)) * target));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [trigger, target, duration]);
  return value;
}

/** Returns current scroll progress 0–1 within an element */
export function useElementScrollProgress<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // 0 when top hits bottom of viewport, 1 when bottom hits top
      const p = Math.min(Math.max((vh - rect.top) / (vh + rect.height), 0), 1);
      setProgress(p);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return [ref, progress] as const;
}
